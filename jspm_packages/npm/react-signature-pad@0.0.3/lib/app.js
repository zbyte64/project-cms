/* */ 
"format cjs";
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e(require("react")):"function"==typeof define&&define.amd?define(["react"],e):"object"==typeof exports?exports.SignaturePad=e(require("react")):t.SignaturePad=e(t.react)}(this,function(t){return function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={exports:{},id:i,loaded:!1};return t[i].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){t.exports=n(2)},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=function(){function t(e,i,o,s){n(this,t),this.startPoint=e,this.control1=i,this.control2=o,this.endPoint=s}return i(t,[{key:"length",value:function e(){var t,n,i,o,s,a,r,u,h=10,e=0;for(t=0;h>=t;t++)n=t/h,i=this._point(n,this.startPoint.x,this.control1.x,this.control2.x,this.endPoint.x),o=this._point(n,this.startPoint.y,this.control1.y,this.control2.y,this.endPoint.y),t>0&&(r=i-s,u=o-a,e+=Math.sqrt(r*r+u*u)),s=i,a=o;return e}},{key:"_point",value:function(t,e,n,i,o){return e*(1-t)*(1-t)*(1-t)+3*n*(1-t)*(1-t)*t+3*i*(1-t)*t*t+o*t*t*t}}]),t}();e["default"]=o,t.exports=e["default"]},function(t,e,n){"use strict";function i(t){return t&&t.__esModule?t:{"default":t}}function o(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function s(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(t.__proto__=e)}Object.defineProperty(e,"__esModule",{value:!0});var a=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),r=function(t,e,n){for(var i=!0;i;){var o=t,s=e,a=n;r=h=u=void 0,i=!1,null===o&&(o=Function.prototype);var r=Object.getOwnPropertyDescriptor(o,s);if(void 0!==r){if("value"in r)return r.value;var u=r.get;return void 0===u?void 0:u.call(a)}var h=Object.getPrototypeOf(o);if(null===h)return void 0;t=h,e=s,n=a,i=!0}},u=n(4),h=i(u),c=n(1),l=i(c),d=n(3),v=i(d),f=function(t){function e(t){o(this,e),r(Object.getPrototypeOf(e.prototype),"constructor",this).call(this,t),this.velocityFilterWeight=this.props.velocityFilterWeight||.7,this.minWidth=this.props.minWidth||.5,this.maxWidth=this.props.maxWidth||2.5,this.dotSize=this.props.dotSize||function(){return(this.minWidth+this.maxWidth)/2},this.penColor=this.props.penColor||"black",this.backgroundColor=this.props.backgroundColor||"rgba(0,0,0,0)",this.onEnd=this.props.onEnd,this.onBegin=this.props.onBegin}return s(e,t),a(e,[{key:"componentDidMount",value:function(){this._canvas=h["default"].findDOMNode(this.refs.cv),this._ctx=this._canvas.getContext("2d"),this.clear(),this._handleMouseEvents(),this._handleTouchEvents(),this._resizeCanvas()}},{key:"componentWillUnmount",value:function(){this.off()}},{key:"clear",value:function(t){t&&t.preventDefault();var e=this._ctx,n=this._canvas;e.fillStyle=this.backgroundColor,e.clearRect(0,0,n.width,n.height),e.fillRect(0,0,n.width,n.height),this._reset()}},{key:"toDataURL",value:function(t,e){var n=this._canvas;return n.toDataURL.apply(n,arguments)}},{key:"fromDataURL",value:function(t){var e=this,n=new Image,i=window.devicePixelRatio||1,o=this._canvas.width/i,s=this._canvas.height/i;this._reset(),n.src=t,n.onload=function(){e._ctx.drawImage(n,0,0,o,s)},this._isEmpty=!1}},{key:"isEmpty",value:function(){return this._isEmpty}},{key:"_resizeCanvas",value:function(){var t=this._ctx,e=this._canvas,n=Math.max(window.devicePixelRatio||1,1);e.width=e.offsetWidth*n,e.height=e.offsetHeight*n,t.scale(n,n)}},{key:"_reset",value:function(){this.points=[],this._lastVelocity=0,this._lastWidth=(this.minWidth+this.maxWidth)/2,this._isEmpty=!0,this._ctx.fillStyle=this.penColor}},{key:"_handleMouseEvents",value:function(){this._mouseButtonDown=!1,this._canvas.addEventListener("mousedown",this._handleMouseDown.bind(this)),this._canvas.addEventListener("mousemove",this._handleMouseMove.bind(this)),document.addEventListener("mouseup",this._handleMouseUp.bind(this)),window.addEventListener("resize",this._resizeCanvas.bind(this))}},{key:"_handleTouchEvents",value:function(){this._canvas.style.msTouchAction="none",this._canvas.addEventListener("touchstart",this._handleTouchStart.bind(this)),this._canvas.addEventListener("touchmove",this._handleTouchMove.bind(this)),document.addEventListener("touchend",this._handleTouchEnd.bind(this))}},{key:"off",value:function(){this._canvas.removeEventListener("mousedown",this._handleMouseDown),this._canvas.removeEventListener("mousemove",this._handleMouseMove),document.removeEventListener("mouseup",this._handleMouseUp),this._canvas.removeEventListener("touchstart",this._handleTouchStart),this._canvas.removeEventListener("touchmove",this._handleTouchMove),document.removeEventListener("touchend",this._handleTouchEnd),window.removeEventListener("resize",this._resizeCanvas)}},{key:"_handleMouseDown",value:function(t){1===t.which&&(this._mouseButtonDown=!0,this._strokeBegin(t))}},{key:"_handleMouseMove",value:function(t){this._mouseButtonDown&&this._strokeUpdate(t)}},{key:"_handleMouseUp",value:function(t){1===t.which&&this._mouseButtonDown&&(this._mouseButtonDown=!1,this._strokeEnd(t))}},{key:"_handleTouchStart",value:function(t){var e=t.changedTouches[0];this._strokeBegin(e)}},{key:"_handleTouchMove",value:function(t){t.preventDefault();var e=t.changedTouches[0];this._strokeUpdate(e)}},{key:"_handleTouchEnd",value:function(t){var e=t.target===this._canvas;e&&this._strokeEnd(t)}},{key:"_strokeUpdate",value:function(t){var e=this._createPoint(t);this._addPoint(e)}},{key:"_strokeBegin",value:function(t){this._reset(),this._strokeUpdate(t),"function"==typeof this.onBegin&&this.onBegin(t)}},{key:"_strokeDraw",value:function(t){var e=this._ctx,n="function"==typeof this.dotSize?this.dotSize():this.dotSize;e.beginPath(),this._drawPoint(t.x,t.y,n),e.closePath(),e.fill()}},{key:"_strokeEnd",value:function(t){var e=this.points.length>2,n=this.points[0];!e&&n&&this._strokeDraw(n),"function"==typeof this.onEnd&&this.onEnd(t)}},{key:"_createPoint",value:function(t){var e=this._canvas.getBoundingClientRect();return new v["default"](t.clientX-e.left,t.clientY-e.top)}},{key:"_addPoint",value:function(t){var e,n,i,o,s=this.points;s.push(t),s.length>2&&(3===s.length&&s.unshift(s[0]),o=this._calculateCurveControlPoints(s[0],s[1],s[2]),e=o.c2,o=this._calculateCurveControlPoints(s[1],s[2],s[3]),n=o.c1,i=new l["default"](s[1],e,n,s[2]),this._addCurve(i),s.shift())}},{key:"_calculateCurveControlPoints",value:function(t,e,n){var i=t.x-e.x,o=t.y-e.y,s=e.x-n.x,a=e.y-n.y,r={x:(t.x+e.x)/2,y:(t.y+e.y)/2},u={x:(e.x+n.x)/2,y:(e.y+n.y)/2},h=Math.sqrt(i*i+o*o),c=Math.sqrt(s*s+a*a),l=r.x-u.x,d=r.y-u.y,f=c/(h+c),y={x:u.x+l*f,y:u.y+d*f},_=e.x-y.x,p=e.y-y.y;return{c1:new v["default"](r.x+_,r.y+p),c2:new v["default"](u.x+_,u.y+p)}}},{key:"_addCurve",value:function(t){var e,n,i=t.startPoint,o=t.endPoint;e=o.velocityFrom(i),e=this.velocityFilterWeight*e+(1-this.velocityFilterWeight)*this._lastVelocity,n=this._strokeWidth(e),this._drawCurve(t,this._lastWidth,n),this._lastVelocity=e,this._lastWidth=n}},{key:"_drawPoint",value:function(t,e,n){var i=this._ctx;i.moveTo(t,e),i.arc(t,e,n,0,2*Math.PI,!1),this._isEmpty=!1}},{key:"_drawCurve",value:function(t,e,n){var i,o,s,a,r,u,h,c,l,d,v,f=this._ctx,y=n-e;for(i=Math.floor(t.length()),f.beginPath(),s=0;i>s;s++)a=s/i,r=a*a,u=r*a,h=1-a,c=h*h,l=c*h,d=l*t.startPoint.x,d+=3*c*a*t.control1.x,d+=3*h*r*t.control2.x,d+=u*t.endPoint.x,v=l*t.startPoint.y,v+=3*c*a*t.control1.y,v+=3*h*r*t.control2.y,v+=u*t.endPoint.y,o=e+u*y,this._drawPoint(d,v,o);f.closePath(),f.fill()}},{key:"_strokeWidth",value:function(t){return Math.max(this.maxWidth/(t+1),this.minWidth)}},{key:"render",value:function(){return h["default"].createElement("div",{id:"signature-pad",className:"m-signature-pad"},h["default"].createElement("div",{className:"m-signature-pad--body"},h["default"].createElement("canvas",{ref:"cv"})),this.props.clearButton&&h["default"].createElement("div",{className:"m-signature-pad--footer"},h["default"].createElement("button",{className:"btn btn-default button clear",onClick:this.clear.bind(this)},"Clear")))}}]),e}(h["default"].Component);e["default"]=f,t.exports=e["default"]},function(t,e){"use strict";function n(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}(),o=function(){function t(e,i,o){n(this,t),this.x=e,this.y=i,this.time=o||(new Date).getTime()}return i(t,[{key:"velocityFrom",value:function(t){return this.time!==t.time?this.distanceTo(t)/(this.time-t.time):1}},{key:"distanceTo",value:function(t){return Math.sqrt(Math.pow(this.x-t.x,2)+Math.pow(this.y-t.y,2))}}]),t}();e["default"]=o,t.exports=e["default"]},function(e,n){e.exports=t}])});