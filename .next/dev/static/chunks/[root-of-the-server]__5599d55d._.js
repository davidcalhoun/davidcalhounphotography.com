(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[turbopack]/browser/dev/hmr-client/hmr-client.ts [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

/// <reference path="../../../shared/runtime-types.d.ts" />
/// <reference path="../../runtime/base/dev-globals.d.ts" />
/// <reference path="../../runtime/base/dev-protocol.d.ts" />
/// <reference path="../../runtime/base/dev-extensions.ts" />
__turbopack_context__.s([
    "connect",
    ()=>connect,
    "setHooks",
    ()=>setHooks,
    "subscribeToUpdate",
    ()=>subscribeToUpdate
]);
function connect({ addMessageListener, sendMessage, onUpdateError = console.error }) {
    addMessageListener((msg)=>{
        switch(msg.type){
            case 'turbopack-connected':
                handleSocketConnected(sendMessage);
                break;
            default:
                try {
                    if (Array.isArray(msg.data)) {
                        for(let i = 0; i < msg.data.length; i++){
                            handleSocketMessage(msg.data[i]);
                        }
                    } else {
                        handleSocketMessage(msg.data);
                    }
                    applyAggregatedUpdates();
                } catch (e) {
                    console.warn('[Fast Refresh] performing full reload\n\n' + "Fast Refresh will perform a full reload when you edit a file that's imported by modules outside of the React rendering tree.\n" + 'You might have a file which exports a React component but also exports a value that is imported by a non-React component file.\n' + 'Consider migrating the non-React component export to a separate file and importing it into both files.\n\n' + 'It is also possible the parent component of the component you edited is a class component, which disables Fast Refresh.\n' + 'Fast Refresh requires at least one parent function component in your React tree.');
                    onUpdateError(e);
                    location.reload();
                }
                break;
        }
    });
    const queued = globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS;
    if (queued != null && !Array.isArray(queued)) {
        throw new Error('A separate HMR handler was already registered');
    }
    globalThis.TURBOPACK_CHUNK_UPDATE_LISTENERS = {
        push: ([chunkPath, callback])=>{
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    };
    if (Array.isArray(queued)) {
        for (const [chunkPath, callback] of queued){
            subscribeToChunkUpdate(chunkPath, sendMessage, callback);
        }
    }
}
const updateCallbackSets = new Map();
function sendJSON(sendMessage, message) {
    sendMessage(JSON.stringify(message));
}
function resourceKey(resource) {
    return JSON.stringify({
        path: resource.path,
        headers: resource.headers || null
    });
}
function subscribeToUpdates(sendMessage, resource) {
    sendJSON(sendMessage, {
        type: 'turbopack-subscribe',
        ...resource
    });
    return ()=>{
        sendJSON(sendMessage, {
            type: 'turbopack-unsubscribe',
            ...resource
        });
    };
}
function handleSocketConnected(sendMessage) {
    for (const key of updateCallbackSets.keys()){
        subscribeToUpdates(sendMessage, JSON.parse(key));
    }
}
// we aggregate all pending updates until the issues are resolved
const chunkListsWithPendingUpdates = new Map();
function aggregateUpdates(msg) {
    const key = resourceKey(msg.resource);
    let aggregated = chunkListsWithPendingUpdates.get(key);
    if (aggregated) {
        aggregated.instruction = mergeChunkListUpdates(aggregated.instruction, msg.instruction);
    } else {
        chunkListsWithPendingUpdates.set(key, msg);
    }
}
function applyAggregatedUpdates() {
    if (chunkListsWithPendingUpdates.size === 0) return;
    hooks.beforeRefresh();
    for (const msg of chunkListsWithPendingUpdates.values()){
        triggerUpdate(msg);
    }
    chunkListsWithPendingUpdates.clear();
    finalizeUpdate();
}
function mergeChunkListUpdates(updateA, updateB) {
    let chunks;
    if (updateA.chunks != null) {
        if (updateB.chunks == null) {
            chunks = updateA.chunks;
        } else {
            chunks = mergeChunkListChunks(updateA.chunks, updateB.chunks);
        }
    } else if (updateB.chunks != null) {
        chunks = updateB.chunks;
    }
    let merged;
    if (updateA.merged != null) {
        if (updateB.merged == null) {
            merged = updateA.merged;
        } else {
            // Since `merged` is an array of updates, we need to merge them all into
            // one, consistent update.
            // Since there can only be `EcmascriptMergeUpdates` in the array, there is
            // no need to key on the `type` field.
            let update = updateA.merged[0];
            for(let i = 1; i < updateA.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateA.merged[i]);
            }
            for(let i = 0; i < updateB.merged.length; i++){
                update = mergeChunkListEcmascriptMergedUpdates(update, updateB.merged[i]);
            }
            merged = [
                update
            ];
        }
    } else if (updateB.merged != null) {
        merged = updateB.merged;
    }
    return {
        type: 'ChunkListUpdate',
        chunks,
        merged
    };
}
function mergeChunkListChunks(chunksA, chunksB) {
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    return chunks;
}
function mergeChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted' || updateA.type === 'deleted' && updateB.type === 'added') {
        return undefined;
    }
    if (updateA.type === 'partial') {
        invariant(updateA.instruction, 'Partial updates are unsupported');
    }
    if (updateB.type === 'partial') {
        invariant(updateB.instruction, 'Partial updates are unsupported');
    }
    return undefined;
}
function mergeChunkListEcmascriptMergedUpdates(mergedA, mergedB) {
    const entries = mergeEcmascriptChunkEntries(mergedA.entries, mergedB.entries);
    const chunks = mergeEcmascriptChunksUpdates(mergedA.chunks, mergedB.chunks);
    return {
        type: 'EcmascriptMergedUpdate',
        entries,
        chunks
    };
}
function mergeEcmascriptChunkEntries(entriesA, entriesB) {
    return {
        ...entriesA,
        ...entriesB
    };
}
function mergeEcmascriptChunksUpdates(chunksA, chunksB) {
    if (chunksA == null) {
        return chunksB;
    }
    if (chunksB == null) {
        return chunksA;
    }
    const chunks = {};
    for (const [chunkPath, chunkUpdateA] of Object.entries(chunksA)){
        const chunkUpdateB = chunksB[chunkPath];
        if (chunkUpdateB != null) {
            const mergedUpdate = mergeEcmascriptChunkUpdates(chunkUpdateA, chunkUpdateB);
            if (mergedUpdate != null) {
                chunks[chunkPath] = mergedUpdate;
            }
        } else {
            chunks[chunkPath] = chunkUpdateA;
        }
    }
    for (const [chunkPath, chunkUpdateB] of Object.entries(chunksB)){
        if (chunks[chunkPath] == null) {
            chunks[chunkPath] = chunkUpdateB;
        }
    }
    if (Object.keys(chunks).length === 0) {
        return undefined;
    }
    return chunks;
}
function mergeEcmascriptChunkUpdates(updateA, updateB) {
    if (updateA.type === 'added' && updateB.type === 'deleted') {
        // These two completely cancel each other out.
        return undefined;
    }
    if (updateA.type === 'deleted' && updateB.type === 'added') {
        const added = [];
        const deleted = [];
        const deletedModules = new Set(updateA.modules ?? []);
        const addedModules = new Set(updateB.modules ?? []);
        for (const moduleId of addedModules){
            if (!deletedModules.has(moduleId)) {
                added.push(moduleId);
            }
        }
        for (const moduleId of deletedModules){
            if (!addedModules.has(moduleId)) {
                deleted.push(moduleId);
            }
        }
        if (added.length === 0 && deleted.length === 0) {
            return undefined;
        }
        return {
            type: 'partial',
            added,
            deleted
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'partial') {
        const added = new Set([
            ...updateA.added ?? [],
            ...updateB.added ?? []
        ]);
        const deleted = new Set([
            ...updateA.deleted ?? [],
            ...updateB.deleted ?? []
        ]);
        if (updateB.added != null) {
            for (const moduleId of updateB.added){
                deleted.delete(moduleId);
            }
        }
        if (updateB.deleted != null) {
            for (const moduleId of updateB.deleted){
                added.delete(moduleId);
            }
        }
        return {
            type: 'partial',
            added: [
                ...added
            ],
            deleted: [
                ...deleted
            ]
        };
    }
    if (updateA.type === 'added' && updateB.type === 'partial') {
        const modules = new Set([
            ...updateA.modules ?? [],
            ...updateB.added ?? []
        ]);
        for (const moduleId of updateB.deleted ?? []){
            modules.delete(moduleId);
        }
        return {
            type: 'added',
            modules: [
                ...modules
            ]
        };
    }
    if (updateA.type === 'partial' && updateB.type === 'deleted') {
        // We could eagerly return `updateB` here, but this would potentially be
        // incorrect if `updateA` has added modules.
        const modules = new Set(updateB.modules ?? []);
        if (updateA.added != null) {
            for (const moduleId of updateA.added){
                modules.delete(moduleId);
            }
        }
        return {
            type: 'deleted',
            modules: [
                ...modules
            ]
        };
    }
    // Any other update combination is invalid.
    return undefined;
}
function invariant(_, message) {
    throw new Error(`Invariant: ${message}`);
}
const CRITICAL = [
    'bug',
    'error',
    'fatal'
];
function compareByList(list, a, b) {
    const aI = list.indexOf(a) + 1 || list.length;
    const bI = list.indexOf(b) + 1 || list.length;
    return aI - bI;
}
const chunksWithIssues = new Map();
function emitIssues() {
    const issues = [];
    const deduplicationSet = new Set();
    for (const [_, chunkIssues] of chunksWithIssues){
        for (const chunkIssue of chunkIssues){
            if (deduplicationSet.has(chunkIssue.formatted)) continue;
            issues.push(chunkIssue);
            deduplicationSet.add(chunkIssue.formatted);
        }
    }
    sortIssues(issues);
    hooks.issues(issues);
}
function handleIssues(msg) {
    const key = resourceKey(msg.resource);
    let hasCriticalIssues = false;
    for (const issue of msg.issues){
        if (CRITICAL.includes(issue.severity)) {
            hasCriticalIssues = true;
        }
    }
    if (msg.issues.length > 0) {
        chunksWithIssues.set(key, msg.issues);
    } else if (chunksWithIssues.has(key)) {
        chunksWithIssues.delete(key);
    }
    emitIssues();
    return hasCriticalIssues;
}
const SEVERITY_ORDER = [
    'bug',
    'fatal',
    'error',
    'warning',
    'info',
    'log'
];
const CATEGORY_ORDER = [
    'parse',
    'resolve',
    'code generation',
    'rendering',
    'typescript',
    'other'
];
function sortIssues(issues) {
    issues.sort((a, b)=>{
        const first = compareByList(SEVERITY_ORDER, a.severity, b.severity);
        if (first !== 0) return first;
        return compareByList(CATEGORY_ORDER, a.category, b.category);
    });
}
const hooks = {
    beforeRefresh: ()=>{},
    refresh: ()=>{},
    buildOk: ()=>{},
    issues: (_issues)=>{}
};
function setHooks(newHooks) {
    Object.assign(hooks, newHooks);
}
function handleSocketMessage(msg) {
    sortIssues(msg.issues);
    handleIssues(msg);
    switch(msg.type){
        case 'issues':
            break;
        case 'partial':
            // aggregate updates
            aggregateUpdates(msg);
            break;
        default:
            // run single update
            const runHooks = chunkListsWithPendingUpdates.size === 0;
            if (runHooks) hooks.beforeRefresh();
            triggerUpdate(msg);
            if (runHooks) finalizeUpdate();
            break;
    }
}
function finalizeUpdate() {
    hooks.refresh();
    hooks.buildOk();
    // This is used by the Next.js integration test suite to notify it when HMR
    // updates have been completed.
    // TODO: Only run this in test environments (gate by `process.env.__NEXT_TEST_MODE`)
    if (globalThis.__NEXT_HMR_CB) {
        globalThis.__NEXT_HMR_CB();
        globalThis.__NEXT_HMR_CB = null;
    }
}
function subscribeToChunkUpdate(chunkListPath, sendMessage, callback) {
    return subscribeToUpdate({
        path: chunkListPath
    }, sendMessage, callback);
}
function subscribeToUpdate(resource, sendMessage, callback) {
    const key = resourceKey(resource);
    let callbackSet;
    const existingCallbackSet = updateCallbackSets.get(key);
    if (!existingCallbackSet) {
        callbackSet = {
            callbacks: new Set([
                callback
            ]),
            unsubscribe: subscribeToUpdates(sendMessage, resource)
        };
        updateCallbackSets.set(key, callbackSet);
    } else {
        existingCallbackSet.callbacks.add(callback);
        callbackSet = existingCallbackSet;
    }
    return ()=>{
        callbackSet.callbacks.delete(callback);
        if (callbackSet.callbacks.size === 0) {
            callbackSet.unsubscribe();
            updateCallbackSets.delete(key);
        }
    };
}
function triggerUpdate(msg) {
    const key = resourceKey(msg.resource);
    const callbackSet = updateCallbackSets.get(key);
    if (!callbackSet) {
        return;
    }
    for (const callback of callbackSet.callbacks){
        callback(msg);
    }
    if (msg.type === 'notFound') {
        // This indicates that the resource which we subscribed to either does not exist or
        // has been deleted. In either case, we should clear all update callbacks, so if a
        // new subscription is created for the same resource, it will send a new "subscribe"
        // message to the server.
        // No need to send an "unsubscribe" message to the server, it will have already
        // dropped the update stream before sending the "notFound" message.
        updateCallbackSets.delete(key);
    }
}
}),
"[project]/styles/Footer.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "Footer-module__bU2TmW__container",
});
}),
"[project]/components/Footer/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Footer$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/Footer.module.css [client] (css module)");
;
;
/** Site footer. */ const Footer = ()=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Footer$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: "©davidcalhounphotography.com"
            }, void 0, false, {
                fileName: "[project]/components/Footer/index.js",
                lineNumber: 7,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "Contact: "
                    }, void 0, false, {
                        fileName: "[project]/components/Footer/index.js",
                        lineNumber: 9,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: "mailto:davidcalhounphotography+web@gmail.com",
                        children: "davidcalhounphotography+web@gmail.com"
                    }, void 0, false, {
                        fileName: "[project]/components/Footer/index.js",
                        lineNumber: 10,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Footer/index.js",
                lineNumber: 8,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/Footer/index.js",
        lineNumber: 6,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Footer;
const __TURBOPACK__default__export__ = Footer;
var _c;
__turbopack_context__.k.register(_c, "Footer");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/styles/Header.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "container": "Header-module__vcZAwq__container",
  "subtitle": "Header-module__vcZAwq__subtitle",
  "title": "Header-module__vcZAwq__title",
});
}),
"[project]/components/Header/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/link.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/Header.module.css [client] (css module)");
;
;
;
const Header = ({ isMainIndex = true })=>{
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("hgroup", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$link$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                href: "/",
                children: isMainIndex ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].title,
                    children: "David Calhoun"
                }, void 0, false, {
                    fileName: "[project]/components/Header/index.js",
                    lineNumber: 10,
                    columnNumber: 32
                }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                    className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].title,
                    children: "David Calhoun"
                }, void 0, false, {
                    fileName: "[project]/components/Header/index.js",
                    lineNumber: 10,
                    columnNumber: 82
                }, ("TURBOPACK compile-time value", void 0))
            }, void 0, false, {
                fileName: "[project]/components/Header/index.js",
                lineNumber: 8,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            isMainIndex ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].subtitle,
                children: "Landscape and travel photography"
            }, void 0, false, {
                fileName: "[project]/components/Header/index.js",
                lineNumber: 13,
                columnNumber: 28
            }, ("TURBOPACK compile-time value", void 0)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Header$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].subtitle,
                children: "Landscape and travel photography"
            }, void 0, false, {
                fileName: "[project]/components/Header/index.js",
                lineNumber: 13,
                columnNumber: 100
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, void 0, true, {
        fileName: "[project]/components/Header/index.js",
        lineNumber: 7,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Header;
const __TURBOPACK__default__export__ = Header;
var _c;
__turbopack_context__.k.register(_c, "Header");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/utils/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "markdownToPlainText",
    ()=>markdownToPlainText
]);
const instanceAbles = [
    Date,
    RegExp,
    Map,
    Set
];
const copyVal = (input)=>{
    if (Array.isArray(input)) {
        // Shallow copy - nested references will still be preserved.
        return [
            ...input
        ];
    }
    if (input instanceof Date) {
        return new Date(input);
    }
    if (input instanceof RegExp) {
        return new RegExp(input);
    }
    if (input instanceof Map) {
        return new Map(input);
    }
    if (input instanceof Set) {
        return new Set(input);
    }
    if (typeof input === 'object') {
        // Shallow copy - nested references will still be preserved.
        return {
            ...input
        };
    }
    if (typeof input === 'function') {
        // Copy function.
        let clonedFn = input.bind(("TURBOPACK compile-time value", void 0));
        // Copy function properties.
        return {
            ...clonedFn,
            ...input
        };
    }
    // Primitive types are already immutable, so no-op - just pass it through.
    return input;
};
const chain = (rawInput, ...fns)=>{
    return fns.reduce((accum, fn)=>fn(accum), copyVal(rawInput));
};
const markdownLinkRegExp = /(?:\[)([^\]]*)?(?:\])\(([^\)]*)?(?:\))/;
const markdownLinkRegExpGlobal = new RegExp(markdownLinkRegExp, 'gi');
const linksToPlainText = (str)=>{
    return str.replace(markdownLinkRegExpGlobal, (linkStr)=>{
        const [match, linkText, url] = linkStr.match(markdownLinkRegExp);
        return `${linkText} (${url})`;
    });
};
const stripSymbols = (str)=>str.replace(/\*|>\s|&nbsp;|#|\s_|_\s/gi, '');
const markdownToPlainText = (str)=>{
    return chain(str, stripSymbols, linksToPlainText);
};
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/styles/Image.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "captionContainer": "Image-module__h7yYiG__captionContainer",
  "captionDescription": "Image-module__h7yYiG__captionDescription",
  "captionTitle": "Image-module__h7yYiG__captionTitle",
  "container": "Image-module__h7yYiG__container",
  "image": "Image-module__h7yYiG__image",
});
}),
"[project]/components/Image/index.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>__TURBOPACK__default__export__
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$react$2d$markdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ReactMarkdown__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/react-markdown/lib/react-markdown.js [client] (ecmascript) <export ReactMarkdown as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$external$2d$links$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/remark-external-links/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/utils/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Image$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/Image.module.css [client] (css module)");
;
;
;
;
;
const imageMimeTypes = [
    'webp',
    'jpeg'
];
const imageSizes = [
    {
        size: 'sm',
        media: '(max-width: 500px)'
    },
    {
        size: 'md',
        media: '(max-width: 1000px)'
    },
    {
        size: 'lg',
        media: '(min-width: 1001px)'
    }
];
/** SEO-rich responsive image markup. */ const Image = (props)=>{
    const { path, name, alt, caption, width, height, genre, keywords, loading, children, decoding } = props;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figure", {
        itemProp: "image",
        itemScope: "",
        itemType: "https://schema.org/ImageObject",
        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Image$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("picture", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Image$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].imageContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        itemScope: "",
                        itemProp: "author",
                        itemType: "https://schema.org/Person",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                                itemProp: "name",
                                content: "David Calhoun"
                            }, void 0, false, {
                                fileName: "[project]/components/Image/index.js",
                                lineNumber: 38,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                                itemProp: "url",
                                content: "https://www.themaingate.net"
                            }, void 0, false, {
                                fileName: "[project]/components/Image/index.js",
                                lineNumber: 39,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Image/index.js",
                        lineNumber: 37,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    caption && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        itemProp: "caption",
                        content: (0, __TURBOPACK__imported__module__$5b$project$5d2f$utils$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["markdownToPlainText"])(caption)
                    }, void 0, false, {
                        fileName: "[project]/components/Image/index.js",
                        lineNumber: 41,
                        columnNumber: 29
                    }, ("TURBOPACK compile-time value", void 0)),
                    name && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        itemProp: "name",
                        content: name
                    }, void 0, false, {
                        fileName: "[project]/components/Image/index.js",
                        lineNumber: 42,
                        columnNumber: 26
                    }, ("TURBOPACK compile-time value", void 0)),
                    width && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        itemProp: "width",
                        content: width
                    }, void 0, false, {
                        fileName: "[project]/components/Image/index.js",
                        lineNumber: 43,
                        columnNumber: 27
                    }, ("TURBOPACK compile-time value", void 0)),
                    height && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        itemProp: "height",
                        content: height
                    }, void 0, false, {
                        fileName: "[project]/components/Image/index.js",
                        lineNumber: 44,
                        columnNumber: 28
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        itemScope: "",
                        itemProp: "thumbnail",
                        itemType: "https://schema.org/ImageObject",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                            itemProp: "url",
                            content: `${path}-sm-resize.jpeg`
                        }, void 0, false, {
                            fileName: "[project]/components/Image/index.js",
                            lineNumber: 46,
                            columnNumber: 21
                        }, ("TURBOPACK compile-time value", void 0))
                    }, void 0, false, {
                        fileName: "[project]/components/Image/index.js",
                        lineNumber: 45,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    keywords && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        itemProp: "keywords",
                        content: keywords
                    }, void 0, false, {
                        fileName: "[project]/components/Image/index.js",
                        lineNumber: 48,
                        columnNumber: 30
                    }, ("TURBOPACK compile-time value", void 0)),
                    genre && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        itemProp: "genre",
                        content: genre
                    }, void 0, false, {
                        fileName: "[project]/components/Image/index.js",
                        lineNumber: 49,
                        columnNumber: 27
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        itemProp: "isFamilyFriendly",
                        content: "true"
                    }, void 0, false, {
                        fileName: "[project]/components/Image/index.js",
                        lineNumber: 50,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        href: `${path}-lg-resize.jpeg`,
                        children: [
                            imageMimeTypes.map((mime)=>{
                                return imageSizes.map(({ size, media })=>{
                                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("source", {
                                        type: `image/${mime}`,
                                        media: media,
                                        srcSet: `${path}-${size}-resize.${mime}`
                                    }, `${mime}${size}`, false, {
                                        fileName: "[project]/components/Image/index.js",
                                        lineNumber: 55,
                                        columnNumber: 33
                                    }, ("TURBOPACK compile-time value", void 0));
                                });
                            }),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                itemProp: "url",
                                src: `${path}-lg-resize.jpeg`,
                                loading: loading || "lazy",
                                decoding: decoding || "async",
                                alt: alt,
                                width: width,
                                height: height,
                                className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Image$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].image
                            }, void 0, false, {
                                fileName: "[project]/components/Image/index.js",
                                lineNumber: 64,
                                columnNumber: 21
                            }, ("TURBOPACK compile-time value", void 0))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/Image/index.js",
                        lineNumber: 51,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Image/index.js",
                lineNumber: 36,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0)),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("figcaption", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Image$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].captionContainer,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$react$2d$markdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ReactMarkdown__as__default$3e$__["default"], {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Image$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].captionTitle,
                        children: name
                    }, void 0, false, {
                        fileName: "[project]/components/Image/index.js",
                        lineNumber: 77,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0)),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$markdown$2f$lib$2f$react$2d$markdown$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__ReactMarkdown__as__default$3e$__["default"], {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Image$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].captionDescription,
                        linkTarget: "_blank",
                        remarkPlugins: [
                            __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$remark$2d$external$2d$links$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
                        ],
                        children: caption
                    }, void 0, false, {
                        fileName: "[project]/components/Image/index.js",
                        lineNumber: 80,
                        columnNumber: 17
                    }, ("TURBOPACK compile-time value", void 0))
                ]
            }, void 0, true, {
                fileName: "[project]/components/Image/index.js",
                lineNumber: 76,
                columnNumber: 13
            }, ("TURBOPACK compile-time value", void 0))
        ]
    }, path, true, {
        fileName: "[project]/components/Image/index.js",
        lineNumber: 29,
        columnNumber: 9
    }, ("TURBOPACK compile-time value", void 0));
};
_c = Image;
const __TURBOPACK__default__export__ = Image;
var _c;
__turbopack_context__.k.register(_c, "Image");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/index.js [client] (ecmascript) <locals>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Footer/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Header/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Image$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Image/index.js [client] (ecmascript)");
;
;
;
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/Footer/index.js [client] (ecmascript) <export default as Footer>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Footer",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Footer/index.js [client] (ecmascript)");
}),
"[project]/components/Header/index.js [client] (ecmascript) <export default as Header>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Header",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Header/index.js [client] (ecmascript)");
}),
"[project]/components/Image/index.js [client] (ecmascript) <export default as Image>", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Image",
    ()=>__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Image$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"]
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Image$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/Image/index.js [client] (ecmascript)");
}),
"[project]/styles/Gallery.module.css [client] (css module)", ((__turbopack_context__) => {

__turbopack_context__.v({
  "title": "Gallery-module__rkF09a__title",
});
}),
"[project]/pages/gallery/japan.js [client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>Gallery
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/head.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/components/index.js [client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Footer$3e$__ = __turbopack_context__.i("[project]/components/Footer/index.js [client] (ecmascript) <export default as Footer>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Header$3e$__ = __turbopack_context__.i("[project]/components/Header/index.js [client] (ecmascript) <export default as Header>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Image$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__ = __turbopack_context__.i("[project]/components/Image/index.js [client] (ecmascript) <export default as Image>");
var __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Gallery$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__ = __turbopack_context__.i("[project]/styles/Gallery.module.css [client] (css module)");
;
;
;
;
function Gallery() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Gallery$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].container,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$head$2e$js__$5b$client$5d$__$28$ecmascript$29$__["default"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("title", {
                        children: "Japan Gallery - David Calhoun Photography"
                    }, void 0, false, {
                        fileName: "[project]/pages/gallery/japan.js",
                        lineNumber: 10,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("meta", {
                        name: "description",
                        content: "A photo gallery preserving some memories from visits to Japan."
                    }, void 0, false, {
                        fileName: "[project]/pages/gallery/japan.js",
                        lineNumber: 11,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("link", {
                        rel: "icon",
                        href: "/favicon.ico"
                    }, void 0, false, {
                        fileName: "[project]/pages/gallery/japan.js",
                        lineNumber: 12,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/gallery/japan.js",
                lineNumber: 9,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Gallery$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].main,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Header$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Header$3e$__["Header"], {
                        isMainIndex: false
                    }, void 0, false, {
                        fileName: "[project]/pages/gallery/japan.js",
                        lineNumber: 16,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Gallery$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].title,
                        children: "Japan Gallery"
                    }, void 0, false, {
                        fileName: "[project]/pages/gallery/japan.js",
                        lineNumber: 17,
                        columnNumber: 17
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: __TURBOPACK__imported__module__$5b$project$5d2f$styles$2f$Gallery$2e$module$2e$css__$5b$client$5d$__$28$css__module$29$__["default"].photos,
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Image$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                loading: "eager",
                                path: '/japan/5D__9044-hamarikyu-gardens-tokyo-japan-apr-2015',
                                name: "Framed Garden View",
                                alt: "Looking out from a covered pavillion at blossoming plum and cherry trees in a Japanese garden.",
                                caption: `In this garden pavillion I came across an elderly Japanese man who showed me a small wooden
porthole to look through to reveal the above view, perhaps a composition dreamed up through the eyes of some long gone architect.

Through the language barrier the man explained it was intended to be a place to perfectly frame the scene, and conseqently a
good spot for photographers.  Though this means my photo is one of many with this exact framing, I have still really enjoyed it.
&nbsp;\n
&nbsp;\n
*Hamarikyu Gardens, Tokyo, Japan.  April 2015.*

*浜離宮 東京 2015年4月*`,
                                width: 2000,
                                height: 1010,
                                genre: "Travel Photography",
                                keywords: "tokyo, japan, spring, hamarikyu gardens, cherry blossoms, plum blossoms, 浜離宮, 東京, 日本"
                            }, void 0, false, {
                                fileName: "[project]/pages/gallery/japan.js",
                                lineNumber: 20,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Image$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                loading: "eager",
                                path: '/japan/5D__0963-kiyomizudera-lightup-kyoto-japan-apr-2016',
                                name: "Night Glow at Kiyomizudera",
                                alt: "Night view of a large wooden temple with a tall wooden platform in front.  Trees with green foliage surround the structure, illuminated by lights.",
                                caption: `A special spring night illumination of the temple.  A beam of light is projected into the sky above
the city, guiding residents and tourists to the magical display.
&nbsp;\n
&nbsp;\n
*Kiyomizudera, Kyoto, Japan.  April 2016.*

*清水寺 京都 2016年4月*`,
                                width: 2000,
                                height: 1333,
                                genre: "Travel Photography",
                                keywords: "japan, kyoto, temple, night photography, 清水寺, 京都, 日本"
                            }, void 0, false, {
                                fileName: "[project]/pages/gallery/japan.js",
                                lineNumber: 40,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Image$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                path: '/japan/IMG_7171-kyoto-tanabata-kyoto-japan-aug-2011',
                                name: "Festival on the Kamogawa at Magic Hour",
                                alt: "Festival tents with an inner glow along the river, with the deep blue sky of the magic hour sunset in the background, and reflected on the river water.",
                                caption: `I am very grateful I spent a summer in Kyoto long ago, being aimless and thinking I was unhappy,
and only looking back I realized this was one of the happier experiences of my life.  To attempt to recapture the feeling I had there,
I returned to Kyoto a few more times, but it's impossible to relive it.

Sometimes I also think of the pretty girl in a kimono, prepping backstage for a dance with her dance troupe, who saw me taking pictures and smiled
such a great smile.  I sometimes think about that girl and how her life must have changed so much since then.  I'm probably now the
only one who remembers that moment, preserving the memory.

\n\nA [nostalgic English poem](https://en.wikipedia.org/wiki/A_Shropshire_Lad) expresses some of thee nostalgic feelings:
&nbsp;\n
&nbsp;\n
> Into my heart an air that kills\n
> From yon far country blows:\n
> What are those blue remembered hills,\n
> What spires, what farms are those?\n
> &nbsp;\n
> That is the land of lost content,\n
> I see it shining plain,\n
> The happy highways where I went\n
> And cannot come again.
&nbsp;\n
&nbsp;\n
*Kamogawa River, Kyoto, Japan. August 2011 during Tanabata (Star Festival)*

*鴨川 京都 2011年8月 七夕*`,
                                width: 2000,
                                height: 1333,
                                genre: "Travel Photography",
                                keywords: "japan, kyoto, night photography, 鴨川, 京都, 七夕, 日本, tanabata, star festival, summer"
                            }, void 0, false, {
                                fileName: "[project]/pages/gallery/japan.js",
                                lineNumber: 57,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Image$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                path: '/japan/5D__0024-bridge-to-kansai-airport-osaka-japan-mar-2016',
                                name: "Bridge to Kansai Airport",
                                alt: "View of an illuminated orange bridge over water at magic hour, leading to a floating sea of lights in the distance.",
                                caption: `Bridge to Kansai International Airport, which carries both trains and motor vehicles.                        
This airport is like a bookend - the first and last part of many peoples' journeys in Japan.

This fantastic view was a bit of a surprise for me after checking into the Star Gate Hotel.
&nbsp;\n
&nbsp;\n
*Izumisano, Osaka, Japan.  March 2016.*

*泉佐野市 大阪 2011年3月*`,
                                width: 1333,
                                height: 2000,
                                genre: "Travel Photography",
                                keywords: "osaka, japan, airport, night, 大阪, 泉佐野市, 日本"
                            }, void 0, false, {
                                fileName: "[project]/pages/gallery/japan.js",
                                lineNumber: 91,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Image$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                path: '/japan/IMG_8723-kyoto-arashiyama-bamboo-lightup-kyoto-japan-dec-2012',
                                name: "Bamboo forest night illumination",
                                alt: "Night scene of a path leading through tall bamboo trees.  The trees are illuminated and the path itself is illuminated by small lanterns.",
                                caption: `This specific area has become famous in its own rite, and is recognizable by many
people who haven't set foot in Japan.  Consequently it's usually very crowded here, especially during special
illuminations such as this.  But if you're willing to visit very early in the morning just as the light starts to
filter in, it will help ensure that at least part of your visit will be more tranquil.
&nbsp;\n
&nbsp;\n
*Arashiyama Bamboo Forest, Kyoto, December 2012*

*嵐山 京都 2012年12月*`,
                                width: 1333,
                                height: 2000,
                                genre: "Travel Photography",
                                keywords: "arashiyama, bamboo forest, kyoto, japan, 嵐山, 京都, 日本, Arashiyama Bamboo Grove, Sagano Bamboo Forest, illumination, night, lightup"
                            }, void 0, false, {
                                fileName: "[project]/pages/gallery/japan.js",
                                lineNumber: 109,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Image$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                path: '/japan/IMG_9854-bicycle-in-snow-kyoto-japan-feb-2013',
                                name: "Snow Falling On A Bike",
                                alt: "Snow piling up on a bike, starting to fill its attached basket.  In the background part of a wet street is visible, with a green traffic light visible in the distance.",
                                caption: `When I was studying Japanese in Kyoto I lived in a student dorm.  My classmate
had been eagerly anticipating snow but was disappointed by mild winter.  One day in February it finally happened -
it started snowing!  They knocked on my room's door to wake me up and let me know.  We walked outside together and
I took a few photos - before retreating back into my warm room.
&nbsp;\n
&nbsp;\n
*Sakyo Ward, Kyoto, Japan.  February 2013.*

*左京区 京都 2013年2月*`,
                                width: 1333,
                                height: 2000,
                                genre: "Travel Photography",
                                keywords: "snow, bike, kyoto, sakyo, 左京区, 京都, japan, 日本, winter, night"
                            }, void 0, false, {
                                fileName: "[project]/pages/gallery/japan.js",
                                lineNumber: 127,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Image$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                path: '/japan/IMG_5061-aoi-matsuri-kyoto-japan-may-2013',
                                name: "Traditional Japanese clothes at Aoi Matsuri",
                                alt: "A man wearing traditional Japanese clothes.  In the background out of focus is a parade procession of people in traditional styles, some mounted on horseback.",
                                caption: `It's a joy to watch a traditional parade in Kyoto, even if it's hard to understand
what's going on.  This particular festival is great because of the large amount of space, making it not as claustrophobic
as other events (like Gion Matsuri).

For this particular parade I learned a lot of great tips from [the blog of Jeffrey Friedl](http://regex.info/blog/2006-05-18/195),
who is a Kyoto resident and happened to also work at Yahoo many years ago, like myself.  I'm pretty sure I spotted him
in the crowd with a very large lens.

*Aoi Matsuri at Kyoto Imperial Palace, Kyoto, Japan.  May 2013.*

*京都 2013年5月*`,
                                width: 2000,
                                height: 1333,
                                genre: "Travel Photography",
                                keywords: "葵祭, 京都, aoi matsuri, hollyhock festival, kyoto, japan, 日本, festival, tradition, japanese clothing"
                            }, void 0, false, {
                                fileName: "[project]/pages/gallery/japan.js",
                                lineNumber: 145,
                                columnNumber: 21
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Image$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Image$3e$__["Image"], {
                                path: '/japan/5D__2135-shirakawa-doorway-gifu-japan-may-2016',
                                name: "",
                                alt: ".",
                                caption: `Gasshō-zukuri (合掌造) minka home (民家).  At this time of year the heat was still bearable,
but things were starting to warm up for sure.  I was pretty delighted to find the great symmetry and the asymmetry
in this shot.  Just imagine waking up and opening up your front door to this scene!

*Shirakawa village, Gifu Prefecture, Japan.  May 2016.*

*白川村 岐阜県 2016年5月*`,
                                width: 2000,
                                height: 1333,
                                genre: "Travel Photography",
                                keywords: "合掌造, 民家, 白川村, 岐阜県, gasshō-zukuri, minka, japan, Shirakawa village, Gifu, 日本"
                            }, void 0, false, {
                                fileName: "[project]/pages/gallery/japan.js",
                                lineNumber: 165,
                                columnNumber: 21
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/pages/gallery/japan.js",
                        lineNumber: 19,
                        columnNumber: 17
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/pages/gallery/japan.js",
                lineNumber: 15,
                columnNumber: 13
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$Footer$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Footer$3e$__["Footer"], {}, void 0, false, {
                fileName: "[project]/pages/gallery/japan.js",
                lineNumber: 184,
                columnNumber: 13
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/pages/gallery/japan.js",
        lineNumber: 8,
        columnNumber: 9
    }, this);
}
_c = Gallery;
var _c;
__turbopack_context__.k.register(_c, "Gallery");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[next]/entry/page-loader.ts { PAGE => \"[project]/pages/gallery/japan.js [client] (ecmascript)\" } [client] (ecmascript)", ((__turbopack_context__, module, exports) => {

const PAGE_PATH = "/gallery/japan";
(window.__NEXT_P = window.__NEXT_P || []).push([
    PAGE_PATH,
    ()=>{
        return __turbopack_context__.r("[project]/pages/gallery/japan.js [client] (ecmascript)");
    }
]);
// @ts-expect-error module.hot exists
if (module.hot) {
    // @ts-expect-error module.hot exists
    module.hot.dispose(function() {
        window.__NEXT_P.push([
            PAGE_PATH
        ]);
    });
}
}),
"[hmr-entry]/hmr-entry.js { ENTRY => \"[project]/pages/gallery/japan.js\" }", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.r("[next]/entry/page-loader.ts { PAGE => \"[project]/pages/gallery/japan.js [client] (ecmascript)\" } [client] (ecmascript)");
}),
]);

//# sourceMappingURL=%5Broot-of-the-server%5D__5599d55d._.js.map