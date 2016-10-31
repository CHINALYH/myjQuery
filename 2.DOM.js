/**
 * Created by liyinghao on 2016/10/30.
 */
//*******************DOM操作******************************
// 这里的所有方法都是工具方法, 仅仅是对 DOM 方法的扩展
// 因此所有的返回值应该是 DOM 对象
//*************************************************
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