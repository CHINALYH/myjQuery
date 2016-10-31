/**
 * Created by liyinghao on 2016/10/05.
 */
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
    }
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
