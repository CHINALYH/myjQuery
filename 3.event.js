/**
 * Created by liyinghao on 2016/9/26.
 */
//****************************************
// 事件操作模块
//****************************************
jQuery.fn.extend({
    on: function ( types, func ) {
        return this.each(function () {
            var that = this;
            types.split( ' ' ).forEach( function ( v, i ) {
                that.addEventListener( v, func );
            });
        });
    }
});


jQuery.each( [
    "onabort", "onblur", "oncancel", "oncanplay", "oncanplaythrough", "onchange",
    "onclick", "onclose", "oncontextmenu", "oncuechange", "ondblclick", "ondrag",
    "ondragend", "ondragenter", "ondragleave", "ondragover", "ondragstart", "ondrop",
    "ondurationchange", "onemptied", "onended", "onerror", "onfocus", "oninput",
    "oninvalid", "onkeydown", "onkeypress", "onkeyup", "onload", "onloadeddata",
    "onloadedmetadata", "onloadstart", "onmousedown", "onmouseenter", "onmouseleave",
    "onmousemove", "onmouseout", "onmouseover", "onmouseup", "onmousewheel", "onpause",
    "onplay", "onplaying", "onprogress", "onratechange", "onreset", "onresize",
    "onscroll", "onseeked", "onseeking", "onselect", "onshow", "onstalled",
    "onsubmit", "onsuspend", "ontimeupdate", "ontoggle", "onvolumechange",
    "onwaiting", "onbeforecopy", "onbeforecut", "onbeforepaste", "oncopy",
    "oncut", "onpaste", "onsearch", "onselectstart", "onwheel", "onwebkitfullscreenchange",
    "onwebkitfullscreenerror"], function ( i, v ) {
    v = v.slice( 2 );

    jQuery.fn[ v ] = function ( eventFn ) {
        return this.on( v, eventFn );
    }

});
