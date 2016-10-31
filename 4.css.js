/**
 * Created by liyinghao on 2016/9/30.
 */
//*********************************
// CSS样式操作
//*********************************
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
        //some() 方法只能由数组来调用
        //先把伪数组通过toArray转化为数组,再调用some方法判断其中是否有元素满足相应的条件,只要有一个满足就好
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
