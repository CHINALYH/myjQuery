
# jQuery框架
## 1.jQuery核心框架结构
    ```
    function jQuery () {
        return new jQuery.fn.init();
    }
    jQuery.fn = jQuery.prototype = {
        init: function () {

        }
    }
    jQuery.fn.init.prototype = jQuery.fn;
    ```
        * 构造函数
        * 原型的映射(实际上是 jQuery 提供的原型, 但是需要将该原型映射到 init 的原型上)
        * 框架的结构
## 2.方法的扩展 extend
    jQuery.extend = jQuery.fn.extend = function () { ... }

    将功能性方法挂载到 jQuery 函数中的有点
    function select ( selector ) {
        return document.querySelectorAll( selector );
    }
    例如选择函数 select
    将其挂载到 jQuery.select 上
    在整个框架中凡是使用 选择的 都调用 jQuery.select

    如果有一天, 选择算法更新, 发现了有一个 Sizzle 函数很强大
    ```
    <script src="jQuery.js"></script>
    <script src="Sizzle.js"></script>
    <script>
        jQuery.select = Sizzle;

        // 下面在使用选择, 用的是什么方法
    </script>
    ```
## 3.构造函数 init
    为什么传入数组后不能使用 each 遍历

    $( 'div' ).each(function () { ... this ... });

    $( [1,2,3] ).each(function ( k,v ) { ... });

    init: function ( selector ) {
        ....
        ....

        if ( selector.length >= 0  ) {
            // 可能是数组, 伪数组

            [].push.apply( this, selector );

        } else { // 不是伪数组, 但是可以是 对象或基本类型. 不会是 空.
            this[ 0 ] = selector;
            this.length = 1;
        }
    }
## 2.DOM操作
### 1.appendTo 方法

可以使用的参数
* DOM 元素
* DOM 数组
* jQuery 对象
* 选择器
```
function appendTo( selector ) {
    if ( selector.nodeType ) {          jQuery( DOM 对象 )
        ...
    }
    else if ( selector.length >= 0 ) {  jQuery( ... ), jQuery( ... )
        // 数组, jQuery 对象
    }
    else if ( typeof selector === 'string' ) {   jQuery( ... )

    }
}
```

### 2.end 方法

在 jq 中使用 next, parent, appendTo 等方法的时候, 会修改当前对象.
即 破坏链式编程的结构. 我们现在调用 end 方法可以恢复链, 并且每调用
一次就恢复一个结构.
```
<div></div>
<p></p>
<div></div>
<span></span>
<div></div>
<a href=""></a>

$( 'div' ).next()
```

### 3.DOM 其他方法

* appendTo
* append
* prependTo
* prepend


功能: prepend
语法: jQuery对象1.prepend( jQuery对象2 )
    将 对象2 插入到 对象1 中子元素的前面


jQuery.extend({});   工具方法都写在这里面

jQuery.extend = jQuery.fn.extend = function(){console.log()};
上面的等价写法
jQuery.extend = function(){console.log()};
jQuery.fn.extend = function(){console.log()}

核心方法:哪里都要用的方法
工具方法:只在某个方法中用

jQuery的核心方法  全部放在了原型中了 jQuery.fn=jQuery.prototype={}


in运算符
判断一个字符串描述的属性是否在某一个对象中  (length-1)  in obj
稀疏数组:无论是什么数组,数组的length-1位置的元素一定是存在的

构造函数中的this(指的是实例对象)  构造函数中又有一个函数,这个函数中的this


## 3.事件操作
   1. 用户事件
        * 事件名,用户可以注册的事件
        注册点击事件,onclick,事件名就是click,即用户事件
   2. 事件处理函数
        * 事件处理函数就是响应用户的那个函数
   3. 事件机制
        * 用户执行默认操作,浏览器会响应用户的操作,调用一个预先注册的函数
   4. 注册事件
        * 给onclick赋值,或者调用addEventListener
   5. 响应事件


## 4.样式操作

1. css
2. class
    addClass
    removeClass
    hasClass
    toggleClass
```
 hasClass
$('div').hasClass('c1')  -->Boolean
jQuery  只要有一个含有这个类名就是true
```
## class 属性的取值可以是什么形式
```
<div></div>
<div class="c1"></div>
<div class="c1 c2 c3"></div>
```

## hasClass

复习: $( 'div' ).hasClass( 'c1' ) -> Boolean
判断 元素是否 含有 c1 的类样式
```
{
    hasClass: function ( className ) {
        // 判断 this[ 0 ] 是否含有 这个 className 的类样式
        var classNameValue = this[ 0 ].className;
        var classNameValues = classNameValue.split( ' ' );
        return classNameValues.indexOf( className ) >= 0;
    }
}
```

## 5.属性操作

.attr()   添加或获取属性的值     $( '#img' ).attr( 'src', ' ... ' )
.val()    添加或获取 value 的值
.html()   添加或获取 innerHTML 的值
.text()   添加或获取 innerText 的值( 早期 FF 中不支持, 今天支持了 )
.prop()   添加或获取 值为 boolean 类型的属性值


1. val
```
val: function ( value ) {
    if ( value ) { // 设置
        return this.each( function () {
            this.value = value;
        });
    } else { // 获取
        return this.get( 0 ).value;
    }
}
```
2. prop

prop
property 的简写
attr 方法采用的是 set/get Attribute 的处理方式. 对于单属性
```
<input type="text" value="" disabled />

setAttribute( 'disabled', 'null' )
```
DOM.属性名 = true/false


## 6.load 事件

回顾 jq 中的使用方法
```
$( document ).ready( fn );

$(function () {

})
```
在 jq 中, 并不是将函数加载到 window.onload 事件上. 因为在 onload 事件中写代码一定要
保证页面中所有的元素都加载完毕. 在 jq 中认为这样的体验不好, 因此做了特殊处理. 只要是 dom
结构加载完, 就可以触发事件.

我们接下来将 行为绑定在 window.onload 中
```
init: function ( selector ) {
    ...
    ...
    if ( typeof selector == 'function' ) {
        window.onload = selector;
    }
}
```

我们需要添加多个事件, 就要调用多次, 就是调用多个函数

1. 函数技巧
    首先增加 onload 的时候 判断一下 是否已经 绑定过 load 事件了, 如果没有绑定过直接赋值
    如果绑定过, 那么就应该将已经绑定的 函数 与 新的 这个 函数组合在一起, 要求是触发的时候
    一起触发, 按照先后顺序执行即可.
```
    if ( typeof window.onload === 'function' ) {
        // 绑定过
        var fn = window.onload;
        window.onload = function () {
            fn();
            selecotr();
        };
    } else {
        // 未绑定
        window.onload = selector;
    }
```
2. 数组技巧
```
    onload = function () {
        I.each( loads, funciton () {
            this();
        });
    };
```

## 7.插件

就是 jq 本身没有这个方法, 获得实现这个功能比较麻烦, 获得根本不能实现某个
功能. 那么我们写一个 js 文件, 然后通过增加 jq 的方法, 成员属性等工能,
让jq 可以完成前面的任务, 那么这个 js 文件就是 jq 插件.


自己写插件就是让 jq 有某些以前没有的方法, 或属性等
```
jQuery.fn.extend({
    ...
});

jQuery.extend({
    ...
})

```