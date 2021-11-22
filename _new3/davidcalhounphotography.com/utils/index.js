const instanceAbles = [Date, RegExp, Map, Set];

const copyVal = (input) => {
    if (Array.isArray(input)) {
        // Shallow copy - nested references will still be preserved.
        return [...input];
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
        return { ...input };
    }

    if (typeof input === 'function') {
        // Copy function.
        let clonedFn = input.bind(this);

        // Copy function properties.
        return { ...clonedFn, ...input };
    }

    // Primitive types are already immutable, so no-op - just pass it through.
    return input;
};

const chain = (rawInput, ...fns) => {
    return fns.reduce((accum, fn) => fn(accum), copyVal(rawInput));
};

const markdownLinkRegExp = /(?:\[)([^\]]*)?(?:\])\(([^\)]*)?(?:\))/;

const markdownLinkRegExpGlobal = new RegExp(markdownLinkRegExp, 'gi');

const linksToPlainText = (str) => {
    return str.replace(markdownLinkRegExpGlobal, (linkStr) => {
        const [match, linkText, url] = linkStr.match(markdownLinkRegExp);

        return `${linkText} (${url})`;
    });
};

const stripSymbols = (str) => str.replace(/\*|>\s|&nbsp;|#|\s_|_\s/gi, '');

export const markdownToPlainText = (str) => {
    return chain(str, stripSymbols, linksToPlainText);
};
