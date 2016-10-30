/**
 * Created by liyinghao on 2016/8/25.
 * jQuery的结构
 */
(function(window){
    function jQuery(obj){
        return jQuery.prototype.init(obj);
    }
    jQuery.prototype={
        constructor:jQuery,
        length:0,
        init:function(obj){//构造函数
            if(!obj){ return this}//传入的是null 或者 undefined
            if(obj){//传入的是字符串
                if(obj.charAt(0)==="<"){//html标签
                    //暂时不做处理
                }
                else{//传入的是选择器
                    var dom= document.querySelectorAll(obj);
                    dom.each(function(i,v){
                        this[i]=v;
                    });
                    return this;
                }
            }else if(typeof obj ==='function'){//判断传入的是函数

            }else if(obj.constructor.name == 'jQuery'){//传入的是jQuery对象

            }
        }
    };

    jQuery.prototype.init.prototype=jQuery.prototype;

    //引入extend

    jQuery.prototype.extend=jQuery.extend=function(obj){
        //给
        for(var k in obj){
            this[k]=obj[k];//这个点
        }
    }

    jQuery.prototype.extend({
        map: function (callback) {
            return jQuery.map(this, callback);
        },
        each: function (callback) {
            return jQuery.each(this,callback);
        }
    });
    jQuery.extend({
        each:function(obj,callback){

        },
        map:function(obj,callback){

        }

    });


//核心功能 get  toArray
    jQuery.prototype.extend({
       toArray:function(){
        //将伪数组转化为数组返回
         return   [].slice.apply(this);
       },
        get:function(index){
            //index  为0    index>0 index<0
            if(index==0){
                return this.toArray()
            }else{
              return  this[index>0? index:this.length+index];
            }
        }

    });


})(window);