/**
 * Created by liyinghao on 2016/10/29.
 */
/*扩展原型的实例方法*/
jQuery.fn.extend({
    each: function ( callback ) {
        /*调用jQuery原型对象方法*/
        return jQuery.each( this, callback );
    },
    map: function ( callback ) {
        return jQuery.map( this, callback );
    }
});
/*扩展的jQuery原型对象方法*/
jQuery.extend({
    each: function ( array, callback ) {
        var i = 0,
            k,
        /*判断是否是数组或者伪数组*/
            isArray = array.length >= 0;
        if ( isArray ) {
            /*如果数组或者是伪数组就使用for循环遍历*/
            for ( ; i < array.length; i++ ) {
                /*each方法在调用的时候内部的this要指向当前遍历的对象,所以使用call*/
                /*each方法在调用的时候默认返回this,*/
                if ( callback.call( array[ i ], i, array[ i ] ) === false ) break;
            }
        } else {
            /*不是伪数组就使用for in进行遍历*/
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