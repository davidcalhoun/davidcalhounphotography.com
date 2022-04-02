"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[686],{5686:function(e,t,n){n.d(t,{xh:function(){return K}});var r=n(7294),i=n(5697),o=n.n(i);function a(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}function s(){return s=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},s.apply(this,arguments)}function l(e,t){return l=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},l(e,t)}function c(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,l(e,t)}var d=r.createContext(null);function u(e,t){var n=Object.create(null);return e&&r.Children.map(e,(function(e){return e})).forEach((function(e){n[e.key]=function(e){return t&&(0,r.isValidElement)(e)?t(e):e}(e)})),n}function p(e,t,n){return null!=n[t]?n[t]:e.props[t]}function h(e,t,n){var i=u(e.children),o=function(e,t){function n(n){return n in t?t[n]:e[n]}e=e||{},t=t||{};var r,i=Object.create(null),o=[];for(var a in e)a in t?o.length&&(i[a]=o,o=[]):o.push(a);var s={};for(var l in t){if(i[l])for(r=0;r<i[l].length;r++){var c=i[l][r];s[i[l][r]]=n(c)}s[l]=n(l)}for(r=0;r<o.length;r++)s[o[r]]=n(o[r]);return s}(t,i);return Object.keys(o).forEach((function(a){var s=o[a];if((0,r.isValidElement)(s)){var l=a in t,c=a in i,d=t[a],u=(0,r.isValidElement)(d)&&!d.props.in;!c||l&&!u?c||!l||u?c&&l&&(0,r.isValidElement)(d)&&(o[a]=(0,r.cloneElement)(s,{onExited:n.bind(null,s),in:d.props.in,exit:p(s,"exit",e),enter:p(s,"enter",e)})):o[a]=(0,r.cloneElement)(s,{in:!1}):o[a]=(0,r.cloneElement)(s,{onExited:n.bind(null,s),in:!0,exit:p(s,"exit",e),enter:p(s,"enter",e)})}})),o}var m=Object.values||function(e){return Object.keys(e).map((function(t){return e[t]}))},f=function(e){function t(t,n){var r,i=(r=e.call(this,t,n)||this).handleExited.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(r));return r.state={contextValue:{isMounting:!0},handleExited:i,firstRender:!0},r}c(t,e);var n=t.prototype;return n.componentDidMount=function(){this.mounted=!0,this.setState({contextValue:{isMounting:!1}})},n.componentWillUnmount=function(){this.mounted=!1},t.getDerivedStateFromProps=function(e,t){var n,i,o=t.children,a=t.handleExited;return{children:t.firstRender?(n=e,i=a,u(n.children,(function(e){return(0,r.cloneElement)(e,{onExited:i.bind(null,e),in:!0,appear:p(e,"appear",n),enter:p(e,"enter",n),exit:p(e,"exit",n)})}))):h(e,o,a),firstRender:!1}},n.handleExited=function(e,t){var n=u(this.props.children);e.key in n||(e.props.onExited&&e.props.onExited(t),this.mounted&&this.setState((function(t){var n=s({},t.children);return delete n[e.key],{children:n}})))},n.render=function(){var e=this.props,t=e.component,n=e.childFactory,i=a(e,["component","childFactory"]),o=this.state.contextValue,s=m(this.state.children).map(n);return delete i.appear,delete i.enter,delete i.exit,null===t?r.createElement(d.Provider,{value:o},s):r.createElement(d.Provider,{value:o},r.createElement(t,i,s))},t}(r.Component);f.propTypes={},f.defaultProps={component:"div",childFactory:function(e){return e}};var v=f;function g(e,t){return e.replace(new RegExp("(^|\\s)"+t+"(?:\\s|$)","g"),"$1").replace(/\s+/g," ").replace(/^\s*|\s*$/g,"")}var x=n(3935),E=!1,y="unmounted",b="exited",_="entering",w="entered",S="exiting",C=function(e){function t(t,n){var r;r=e.call(this,t,n)||this;var i,o=n&&!n.isMounting?t.enter:t.appear;return r.appearStatus=null,t.in?o?(i=b,r.appearStatus=_):i=w:i=t.unmountOnExit||t.mountOnEnter?y:b,r.state={status:i},r.nextCallback=null,r}c(t,e),t.getDerivedStateFromProps=function(e,t){return e.in&&t.status===y?{status:b}:null};var n=t.prototype;return n.componentDidMount=function(){this.updateStatus(!0,this.appearStatus)},n.componentDidUpdate=function(e){var t=null;if(e!==this.props){var n=this.state.status;this.props.in?n!==_&&n!==w&&(t=_):n!==_&&n!==w||(t=S)}this.updateStatus(!1,t)},n.componentWillUnmount=function(){this.cancelNextCallback()},n.getTimeouts=function(){var e,t,n,r=this.props.timeout;return e=t=n=r,null!=r&&"number"!==typeof r&&(e=r.exit,t=r.enter,n=void 0!==r.appear?r.appear:t),{exit:e,enter:t,appear:n}},n.updateStatus=function(e,t){void 0===e&&(e=!1),null!==t?(this.cancelNextCallback(),t===_?this.performEnter(e):this.performExit()):this.props.unmountOnExit&&this.state.status===b&&this.setState({status:y})},n.performEnter=function(e){var t=this,n=this.props.enter,r=this.context?this.context.isMounting:e,i=this.props.nodeRef?[r]:[x.findDOMNode(this),r],o=i[0],a=i[1],s=this.getTimeouts(),l=r?s.appear:s.enter;!e&&!n||E?this.safeSetState({status:w},(function(){t.props.onEntered(o)})):(this.props.onEnter(o,a),this.safeSetState({status:_},(function(){t.props.onEntering(o,a),t.onTransitionEnd(l,(function(){t.safeSetState({status:w},(function(){t.props.onEntered(o,a)}))}))})))},n.performExit=function(){var e=this,t=this.props.exit,n=this.getTimeouts(),r=this.props.nodeRef?void 0:x.findDOMNode(this);t&&!E?(this.props.onExit(r),this.safeSetState({status:S},(function(){e.props.onExiting(r),e.onTransitionEnd(n.exit,(function(){e.safeSetState({status:b},(function(){e.props.onExited(r)}))}))}))):this.safeSetState({status:b},(function(){e.props.onExited(r)}))},n.cancelNextCallback=function(){null!==this.nextCallback&&(this.nextCallback.cancel(),this.nextCallback=null)},n.safeSetState=function(e,t){t=this.setNextCallback(t),this.setState(e,t)},n.setNextCallback=function(e){var t=this,n=!0;return this.nextCallback=function(r){n&&(n=!1,t.nextCallback=null,e(r))},this.nextCallback.cancel=function(){n=!1},this.nextCallback},n.onTransitionEnd=function(e,t){this.setNextCallback(t);var n=this.props.nodeRef?this.props.nodeRef.current:x.findDOMNode(this),r=null==e&&!this.props.addEndListener;if(n&&!r){if(this.props.addEndListener){var i=this.props.nodeRef?[this.nextCallback]:[n,this.nextCallback],o=i[0],a=i[1];this.props.addEndListener(o,a)}null!=e&&setTimeout(this.nextCallback,e)}else setTimeout(this.nextCallback,0)},n.render=function(){var e=this.state.status;if(e===y)return null;var t=this.props,n=t.children,i=(t.in,t.mountOnEnter,t.unmountOnExit,t.appear,t.enter,t.exit,t.timeout,t.addEndListener,t.onEnter,t.onEntering,t.onEntered,t.onExit,t.onExiting,t.onExited,t.nodeRef,a(t,["children","in","mountOnEnter","unmountOnExit","appear","enter","exit","timeout","addEndListener","onEnter","onEntering","onEntered","onExit","onExiting","onExited","nodeRef"]));return r.createElement(d.Provider,{value:null},"function"===typeof n?n(e,i):r.cloneElement(r.Children.only(n),i))},t}(r.Component);function O(){}C.contextType=d,C.propTypes={},C.defaultProps={in:!1,mountOnEnter:!1,unmountOnExit:!1,appear:!1,enter:!0,exit:!0,onEnter:O,onEntering:O,onEntered:O,onExit:O,onExiting:O,onExited:O},C.UNMOUNTED=y,C.EXITED=b,C.ENTERING=_,C.ENTERED=w,C.EXITING=S;var N=C,I=function(e,t){return e&&t&&t.split(" ").forEach((function(t){return r=t,void((n=e).classList?n.classList.remove(r):"string"===typeof n.className?n.className=g(n.className,r):n.setAttribute("class",g(n.className&&n.className.baseVal||"",r)));var n,r}))},k=function(e){function t(){for(var t,n=arguments.length,r=new Array(n),i=0;i<n;i++)r[i]=arguments[i];return(t=e.call.apply(e,[this].concat(r))||this).appliedClasses={appear:{},enter:{},exit:{}},t.onEnter=function(e,n){var r=t.resolveArguments(e,n),i=r[0],o=r[1];t.removeClasses(i,"exit"),t.addClass(i,o?"appear":"enter","base"),t.props.onEnter&&t.props.onEnter(e,n)},t.onEntering=function(e,n){var r=t.resolveArguments(e,n),i=r[0],o=r[1]?"appear":"enter";t.addClass(i,o,"active"),t.props.onEntering&&t.props.onEntering(e,n)},t.onEntered=function(e,n){var r=t.resolveArguments(e,n),i=r[0],o=r[1]?"appear":"enter";t.removeClasses(i,o),t.addClass(i,o,"done"),t.props.onEntered&&t.props.onEntered(e,n)},t.onExit=function(e){var n=t.resolveArguments(e)[0];t.removeClasses(n,"appear"),t.removeClasses(n,"enter"),t.addClass(n,"exit","base"),t.props.onExit&&t.props.onExit(e)},t.onExiting=function(e){var n=t.resolveArguments(e)[0];t.addClass(n,"exit","active"),t.props.onExiting&&t.props.onExiting(e)},t.onExited=function(e){var n=t.resolveArguments(e)[0];t.removeClasses(n,"exit"),t.addClass(n,"exit","done"),t.props.onExited&&t.props.onExited(e)},t.resolveArguments=function(e,n){return t.props.nodeRef?[t.props.nodeRef.current,e]:[e,n]},t.getClassNames=function(e){var n=t.props.classNames,r="string"===typeof n,i=r?""+(r&&n?n+"-":"")+e:n[e];return{baseClassName:i,activeClassName:r?i+"-active":n[e+"Active"],doneClassName:r?i+"-done":n[e+"Done"]}},t}c(t,e);var n=t.prototype;return n.addClass=function(e,t,n){var r=this.getClassNames(t)[n+"ClassName"],i=this.getClassNames("enter").doneClassName;"appear"===t&&"done"===n&&i&&(r+=" "+i),"active"===n&&e&&e.scrollTop,r&&(this.appliedClasses[t][n]=r,function(e,t){e&&t&&t.split(" ").forEach((function(t){return r=t,void((n=e).classList?n.classList.add(r):function(e,t){return e.classList?!!t&&e.classList.contains(t):-1!==(" "+(e.className.baseVal||e.className)+" ").indexOf(" "+t+" ")}(n,r)||("string"===typeof n.className?n.className=n.className+" "+r:n.setAttribute("class",(n.className&&n.className.baseVal||"")+" "+r)));var n,r}))}(e,r))},n.removeClasses=function(e,t){var n=this.appliedClasses[t],r=n.base,i=n.active,o=n.done;this.appliedClasses[t]={},r&&I(e,r),i&&I(e,i),o&&I(e,o)},n.render=function(){var e=this.props,t=(e.classNames,a(e,["classNames"]));return r.createElement(N,s({},t,{onEnter:this.onEnter,onEntered:this.onEntered,onEntering:this.onEntering,onExit:this.onExit,onExiting:this.onExiting,onExited:this.onExited}))},t}(r.Component);k.defaultProps={classNames:""},k.propTypes={};var P=k;function A(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function H(){return H=Object.assign||function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},H.apply(this,arguments)}function T(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function j(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?T(Object(n),!0).forEach((function(t){A(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):T(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function L(e,t){if(null==e)return{};var n,r,i=function(e,t){if(null==e)return{};var n,r,i={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(i[n]=e[n]);return i}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(i[n]=e[n])}return i}const D=(e,t)=>t<=0?0:Math.floor(e/t*100),R=(e,t)=>{let n=Math.ceil(t*(e/100));n>t&&(n=t);return 0!==n?n-1:n},M=["mousemove","touchmove","touchstart"],z=(e,t,n)=>{const r=e.touches&&e.touches[0]?e.touches[0]:e,{clientX:i,clientY:o}=r;return"y"===t?D(o-n.y,n.height):D(i-n.x,n.width)};function V(e,t="horizontal"){const n={currentImage:e[0],previousImage:null,currentImageIndex:0,previousImageIndex:null},[{currentImage:i,previousImage:o,currentImageIndex:a,previousImageIndex:s,currentImageEventId:l},c]=(0,r.useState)(n),[d,u]=function(){let[{xProgress:e,yProgress:t,boundingClientRect:n},i]=(0,r.useState)({xProgress:0,yProgress:0,boundingClientRect:null});return[[e,t],function(e){if(e.touches&&e.preventDefault&&e.preventDefault(),!e||!M.includes(e.type))return;const t=e.currentTarget.getBoundingClientRect();i({xProgress:z(e,"x",t),yProgress:z(e,"y",t),boundingClientRect:t})}]}();let[p,h]=d;function m(n=!1){let r=0;n||(r=R("horizontal"===t?p:h,e.length));r!==a&&c({currentImageIndex:r,currentImage:e[r],currentImageEventId:window.crypto?([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g,(e=>(e^crypto.getRandomValues(new Uint8Array(1))[0]&15>>e/4).toString(16))):"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(function(e){const t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})),previousImageIndex:a,previousImage:null!==s?e[a]:null,previousImageEventId:l})}return(0,r.useEffect)((()=>{m()}),[p,h]),[{currentImage:i,currentImageIndex:a,previousImage:o,previousImageIndex:s,currentImageEventId:l},{updateHoverSlideshow:u,resetHoverSlideshow:()=>m(!0)}]}function F(e,t){void 0===t&&(t={});var n=t.insertAt;if(e&&"undefined"!==typeof document){var r=document.head||document.getElementsByTagName("head")[0],i=document.createElement("style");i.type="text/css","top"===n&&r.firstChild?r.insertBefore(i,r.firstChild):r.appendChild(i),i.styleSheet?i.styleSheet.cssText=e:i.appendChild(document.createTextNode(e))}}var X="HoverSlideshow_container__3k7xc",G="HoverSlideshow_innerContainer__3-jH3",$="HoverSlideshow_img__3cXoo";function U(e){const[t,n]=(0,r.useState)({percent:0,totalLoaded:0,imagesLoaded:[]});return[t,function(r){n({percent:parseInt((t.totalLoaded+1)/e*100),totalLoaded:t.totalLoaded+1,imagesLoaded:[...t.imagesLoaded,r],isLoading:t.totalLoaded+1<e})}]}function Z(e){const{axis:t,images:n,width:i,height:o,style:a,className:s,LoadingPlaceholder:l}=e,c=L(e,["axis","images","width","height","style","className","LoadingPlaceholder"]);let[{currentImage:d,currentImageIndex:u},{updateHoverSlideshow:p,resetHoverSlideshow:h}]=V(n,t);const[m,f]=U(n.length),v=m.isLoading&&l;function g(e){e.preventDefault(),p(e)}return r.createElement("div",H({onMouseLeave:h,onMouseMove:p,onTouchStart:g,onTouchMove:g,onTouchEnd:h,className:`${X} ${s}`,style:j({width:i,height:o},a)},c),v&&r.createElement(l,{progressPercent:m.percent}),r.createElement("div",{className:G,style:{transform:`translateX(-${parseInt(i)*u}px)`}},n.map((e=>{const t=l?{visibility:v?"hidden":"visible"}:{};return r.createElement("img",{src:e,key:e,className:$,onLoad:f.bind(null,e),style:t,loading:"eager"})}))))}F(".HoverSlideshow_container__3k7xc {\n\ttouch-action: none;\n\tdisplay: inline-flex;\n\tbackground-repeat: no-repeat;\n\t-webkit-touch-callout: none;\n\t-webkit-user-select: none;\n\toverflow: hidden;\n\tposition: relative;\n}\n\n.HoverSlideshow_innerContainer__3-jH3 {\n\tposition: relative;\n\twhite-space: nowrap;\n\twidth: 100%;\n\theight: 100%;\n\tbackface-visibility: hidden;\n\tperspective: 1000px;\n\twill-change: transform;\n}\n\n/* FF hacks */\n@-moz-document url-prefix() {\n\t.HoverSlideshow_innerContainer__3-jH3 {\n\t\tfilter: blur(0.1px); /* Fixes initial flickering. */\n\t}\n}\n\n.HoverSlideshow_img__3cXoo {\n\twidth: 100%;\n\tvertical-align: top;\n\t-webkit-touch-callout: none;\n\t-webkit-user-select: none;\n\n\t/*\n\t * Mobile.  Important: need to move image to background so touch events occur on parent container,\n     * not inner changing imgs.\n\t */\n\tz-index: -1;\n}\n"),Z.propTypes={"aria-label":o().string,axis:o().oneOf(["horizontal","vertical"]),children:o().any,className:o().string,height:o().string,images:o().arrayOf(o().string),LoadingPlaceholder:o().elementType,role:o().string,style:o().object,width:o().string},Z.defaultProps={"aria-label":"Image slideshow",axis:"horizontal",className:"",images:[],role:"img",style:{}};var B={container:"HoverSlideshowAnimated_container__3-pZk",imageContainer:"HoverSlideshowAnimated_imageContainer__DI5bz","crossfade-appear":"HoverSlideshowAnimated_crossfade-appear__38xZV","crossfade-appear-active":"HoverSlideshowAnimated_crossfade-appear-active__16FGs","crossfade-enter":"HoverSlideshowAnimated_crossfade-enter__XbGby","crossfade-enter-active":"HoverSlideshowAnimated_crossfade-enter-active__2bRYX","crossfade-enter-done":"HoverSlideshowAnimated_crossfade-enter-done__2dmOf","crossfade-exit":"HoverSlideshowAnimated_crossfade-exit__3pAzZ","crossfade-exit-active":"HoverSlideshowAnimated_crossfade-exit-active__10DD0",img:"HoverSlideshowAnimated_img__3KgGz",hiddenPreloadedImages:"HoverSlideshowAnimated_hiddenPreloadedImages__3tauT"};function Y(e){var t;const n=(0,r.useRef)(null),{eventId:i,src:o,children:a}=e;return null===n||void 0===n||null===(t=n.current)||void 0===t||t.focus(),r.createElement(r.Fragment,null,r.createElement("picture",null,r.createElement(v,null,r.createElement(P,{timeout:150,in:!0,appear:!0,classNames:{appear:B["crossfade-appear"],appearActive:B["crossfade-appear-active"],enter:B["crossfade-enter"],enterActive:B["crossfade-enter-active"],enterDone:B["crossfade-enter-done"],exit:B["crossfade-exit"],exitActive:B["crossfade-exit-active"],exitDone:B["crossfade-exit-done"]},key:i,nodeRef:n},r.createElement("div",{className:B.imageContainer,ref:n},r.createElement("img",{src:o,className:B.img}))))),a)}function K(e){const{images:t,style:n,className:i,width:o,height:a,children:s,LoadingPlaceholder:l}=e,c=L(e,["images","style","className","width","height","children","LoadingPlaceholder"]);let[{currentImage:d,currentImageEventId:u},{updateHoverSlideshow:p,resetHoverSlideshow:h}]=V(t);const m=(0,r.useRef)(null),[f,v]=U(t.length),g=f.isLoading&&l;function x(e){e.preventDefault(),p(e)}return r.createElement("div",H({onMouseLeave:h,onMouseMove:p,onTouchStart:x,onTouchMove:x,onTouchEnd:h,ref:m,style:j({width:o,height:a},n),className:`${B.container} ${i}`},c),r.createElement("div",{className:B.hiddenPreloadedImages},t.map((e=>r.createElement("img",{key:e,src:e,onLoad:v.bind(null,e)})))),g&&r.createElement(l,{progressPercent:f.percent}),!g&&r.createElement(Y,{children:s,eventId:u,src:d}))}F(".HoverSlideshowAnimated_container__3-pZk {\n\tposition: relative;\n\tdisplay: inline-block;\n}\n\n.HoverSlideshowAnimated_imageContainer__DI5bz {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\tdisplay: flex;\n\twidth: 100%;\n\theight: 100%;\n\n\t/*\n\t * Mobile.  Important: need to move image to background so touch events occur on parent container,\n     * not inner changing imgs.\n\t */\n\tz-index: -1;\n}\n\n.HoverSlideshowAnimated_crossfade-appear__38xZV {\n\topacity: 0;\n}\n\n.HoverSlideshowAnimated_crossfade-appear-active__16FGs {\n\topacity: 1;\n\ttransition: opacity 100ms;\n}\n\n.HoverSlideshowAnimated_crossfade-enter__XbGby {\n\topacity: 0;\n}\n\n.HoverSlideshowAnimated_crossfade-enter-active__2bRYX {\n\topacity: 1;\n\ttransition: opacity 200ms ease-in-out;\n}\n\n.HoverSlideshowAnimated_crossfade-enter-done__2dmOf {\n\topacity: 1;\n}\n\n.HoverSlideshowAnimated_crossfade-exit__3pAzZ {\n\topacity: 1;\n}\n\n.HoverSlideshowAnimated_crossfade-exit-active__10DD0 {\n\topacity: 0;\n\ttransition: opacity 200ms ease-in-out;\n}\n\n.HoverSlideshowAnimated_img__3KgGz {\n\twidth: 100%;\n\tvertical-align: top;\n}\n\n.HoverSlideshowAnimated_hiddenPreloadedImages__3tauT {\n\tvisibility: hidden;\n\twidth: 0;\n\theight: 0;\n\toverflow: hidden;\n}\n"),K.propTypes={children:o().any,className:o().string,height:o().string,href:o().string,images:o().arrayOf(o().string),LoadingPlaceholder:o().elementType,style:o().object,width:o().string},K.defaultProps={className:"",images:[],style:{}}}}]);