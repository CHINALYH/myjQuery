(function ( window ) {




function jQuery( selector ) {
    return new jQuery.fn.init( selector );
}

jQuery.fn = jQuery.prototype = {
    constructor: jQuery,
    length: 0,
    init: function ( selector ) {

        // 如果传入的是 null, undefined 则 不处理
        if ( !selector ) return this;

        // 如果传入的是字符串
        if ( typeof selector === 'string' ) {

            // 判断是否为 HTML 的字符串
            if ( selector.charAt( 0 ) === '<' ) {

                [].push.apply( this, parseHTML( selector ) );
                return this;

            } else { // 这里就是选择器
                [].push.apply( this, document.querySelectorAll( selector ) );
                return this;
            }
    
        }

        // 如果是 DOM 对象的情况
        if ( selector.nodeType ) {
            // 传入的一定是一个 DOM 元素
            this[ 0 ] = selector;
            this.length = 1;
            return this;
        }

        // 如果是 jQuery 对象
        if ( selector.constructor.name === 'jQuery' ) {
            return selector;

        }

        // 如果是函数
        if ( typeof selector === 'function' ) {
            
            loads.push( selector );
        } 



        // 如果传入的都不是, 则进行数组处理
        if ( selector.length >= 0 ) {
            [].push.apply( this, selector ); // 数组
        } else {
            this[ 0 ] = selector;  // {}, {name:'jim'}, /./, 1, 2, 3, true...
            this.length = 1;
        }
        
    }
}

jQuery.fn.init.prototype = jQuery.fn;


// extend 用于功能扩展的方法
jQuery.extend = jQuery.fn.extend = function ( obj ) {
    var k;
    for ( k in obj ) {
        this[ k ] = obj[ k ];
    }
}



jQuery.fn.extend({
    each: function ( callback ) {
        return jQuery.each( this, callback );
    },
    map: function ( callback ) {
        return jQuery.map( this, callback );
    }
});

jQuery.extend({
    each: function ( array, callback ) {
        var i = 0,
            k,
            isArray = array.length >= 0;
        if ( isArray ) {
            for ( ; i < array.length; i++ ) {
                if ( callback.call( array[ i ], i, array[ i ] ) === false ) break;
            }
        } else {
            for ( k in array ) {
                if ( callback.call( array[ k ], k, array[ k ] ) === false ) break;
            }
        }
        return array;
    },
    map: function( array, callback ) {
        var i = 0,
            k,
            isArray = array.length >= 0,
            rect = [],
            result;
        if ( isArray ) {
            for ( ; i < array.length; i++ ) {
                result = callback( array[ i ], i );
                if ( result != null ) {
                    rect.push( result );
                }
            }
        } else {
            for ( k in array ) {
                result = callback( array[ k ], k );
                if ( result != null ) {
                    rect.push( result );
                }
            }
        }
        return rect;
    }
});




// 核心功能
jQuery.fn.extend({
    toArray: function () {
        return [].slice.call( this );
    }, 
    get: function ( index ) {
        if ( index === undefined ) {
            return this.toArray();
        }
        return this[ index >= 0? index : this.length + index ];
    },
    pushStack: function ( ret ) {
        // 使用传入的数组创建新的 jQuery 对象, 并存储原始的 jQuery 对象 返回
        var newIObj = jQuery( ret );
        newIObj.prevObj = this;
        return newIObj;
    }
});


// DOM 操作模块

function parseHTML ( str ) {
    var div = document.createElement( 'div' );
    
    div.innerHTML = str;

    var arr = [];
    for ( var i = 0; i < div.childNodes.length; i++ ) {
        arr.push( div.childNodes[ i ] );
    }
    return arr;
}


// 这里的所有方法都是工具方法, 仅仅是对 DOM 方法的扩展
// 因此所有的返回值应该是 DOM 对象
jQuery.extend({
    append: function ( parentNode, childNode ) {
    },
    insertBefore: function ( parentNode, childNode, oldChildNode ) {
    },
    insertAfter: function ( parentNode, childNode, oldChildNode ) {
    },
    next: function ( node ) {
        var tmpNode = node;
        while ( tmpNode = tmpNode.nextSibling ) {
            if ( tmpNode.nodeType === 1 ) {
                // return tmpNode;
                break;
            }
        }
        return tmpNode;
    },
    nextAll: function ( node ) {
        var tmpNode = node, 
            ret = [];
        while ( tmpNode = tmpNode.nextSibling ) {
            if ( tmpNode.nodeType === 1 ) {
                ret.push( tmpNode );
            }
        }
        return ret;
    },
    prev: function ( node ) {
        var tmpNode = node, 
            ret = [];
        while ( tmpNode = tmpNode.previousSibling ) {
            if ( tmpNode.nodeType === 1 ) {
                ret.push( tmpNode );
            }
        }
        return ret;
    },
    prevAll: function ( node ) {
        var tmpNode = node, 
            ret = [];
        while ( tmpNode = tmpNode.previousSibling ) {
            if ( tmpNode.nodeType === 1 ) {
                ret.push( tmpNode );
            }
        }
        return ret;
    }
});


jQuery.fn.extend({
    appendTo: function ( selector ) {
        // 将参数 划归为 jQuery 对象, 那么任何参数都可以解决了
        var iObj = jQuery( selector ),
            tmpIObj,
            ret = [],
            i, j;
        // 将 this[ i ] 添加到 selector[ j ] 上
        for ( i = 0; i < this.length; i++ ) {
            for ( j = 0; j < iObj.length; j++ ) {
                tmpIObj = j == iObj.length - 1 ? this[ i ] : this[ i ].cloneNode( true );
                ret.push( tmpIObj );
                iObj[ j ].appendChild( tmpIObj );
            }
        }
        
        // 返回新对象, 但是必须存储旧对象
        return this.pushStack( ret );
    },
    append: function ( selector ) {
        jQuery( selector ).appendTo( this );
        return this;
    },
    prependTo: function ( selector ) {
        // 将参数 划归为 jQuery 对象, 那么任何参数都可以解决了
        var iObj = jQuery( selector ),
            tmpIObj,
            ret = [],
            i, j;
        // 将 this[ i ] 添加到 selector[ j ] 上
        for ( i = 0; i < this.length; i++ ) {
            for ( j = 0; j < iObj.length; j++ ) {
                tmpIObj = j == iObj.length - 1 ? this[ i ] : this[ i ].cloneNode( true );
                ret.push( tmpIObj );
                // iObj[ j ].appendChild( tmpIObj );
                iObj[ j ].insertBefore( tmpIObj, iObj[ j ].firstChild );
                // 最好自己封装一套 工具方法
            }
        }
        
        // 返回新对象, 但是必须存储旧对象
        return this.pushStack( ret );
    },
    prepend: function ( selector ) {
        jQuery( selector ).prependTo( this );
        return this;
    },
    next: function ( selector ) {
        return this.pushStack( this.map( function ( v ) {
            return jQuery.next( v );
        }));
    },
    prev: function ( selector ) {
        return this.pushStack( this.map( function ( v ) {
            return jQuery.prev( v );
        }));
    },
    nextAll: function () {

    },
    prevAll: function () {

    },
    siblings: function () {

    },
    remove: function () {
        this.each(function () {
            this.parentNode.removeChild( this );
        });
    }
});


// 事件操作
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

    
// CSS
jQuery.fn.extend({
    css: function ( name, value ) {
        if ( value == undefined ) { // 一个参数
            if ( typeof name === 'string' ) { // 返回数据
                return this.get( 0 ).style[ name ] || 
                        window.getComputedStyle( this.get( 0 ) )[ name ];
            } else { // 设置多个样式
                return this.each( function () {
                    var that = this;
                    jQuery.each( name, function ( k, v ) {
                        that.style[ k ] = v;
                    });
                });
            }
        } else { // 两个参数
            return this.each(function () {
                this.style[ name ] = value;
            });
        }
    },
    hasClass: function ( className ) {
        return this.toArray().some(function ( v, i ) {
            // v 这个 DOM 对象是否含有 className 这个类样式
            return v.className.split( ' ' ).indexOf( className ) >= 0
        });
    },
    addClass: function ( className ) {
        return this.each( function () {
            var classNameValues = this.className.trim().split( ' ' );

            if ( classNameValues.indexOf( className ) == -1 ) {
                classNameValues.push( className );
            }

            this.className = classNameValues.join( ' ' );
        });
    },
    removeClass: function ( className ) {
        return this.each(function () {
            // 将 this 中的 类样式 className 去掉
            this.className = (' ' + this.className.replace( /\s/g, '  ' ) + ' ')
                            .replace( new RegExp( ' ' + className.trim() + ' ', 'g' ), ' ')
                            .trim();
        });
    },
    toggleClass: function ( className ) {
        if ( this.hasClass( className ) ) {
            this.removeClass( className );
        } else {
            this.addClass( className );
        }
        return this;
    } 
});


// 属性操作
jQuery.fn.extend({
    attr: function ( name, value ) {
        if ( value ) {
            // 传入, 需设置
            return this.each(function () {
                this.setAttribute( name, value );
            });
        } else {
            // 未传入, 需返回
            return this.get( 0 ).getAttribute( name );
        }
    },
    prop: function ( name, value ) {
        if ( value !== undefined ) {
            // 传入, 需设置
            return this.each(function () {
                this[ name ] = value;
            });
        } else {
            // 未传入, 需返回
            return this.get( 0 )[ name ];
        }
    },
});

jQuery.each( { val: 'value', html: 'innerHTML', text: 'innerText' }, function ( k, v ) {
    jQuery.fn[ k ] = function ( value ) {
        
        if ( value ) {
            return this.each(function () {
                this[ v ] = value;
            });
        } else {
            return this.get( 0 )[ v ];
        }

    }
});



// 其他全局数据与函数等
var loads = [];

window.onload = function () {
    // 将数组中的 每一个 函数取出来执行
    jQuery.each( loads, function ( i, v ) {
        this();
    });
};


window.jQuery = window.$ = jQuery;

})( window );

