let Vue
//自定义forEach方法，使用的时候更加语义化
let forEach = (obj, callback) => {
    Object.keys(obj).forEach(key => {
        callback(key, obj[key])
    })
}

class Store {
    constructor(options) {
        //state的实现
        //创建vue实例，响应式变化
        this.vm = new Vue({
            data() {
                return {
                    state: options.state
                }
            }
        });

        //getters的实现
        let getters = options.getters; //获取用户传入的getters
        this.getters = {};
        //遍历对象
        // Object.keys(getters).forEach(getterName => {
        //     //自定义属性
        //     Object.defineProperty(this.getters,getterName,{
        //         get:() => {
        //             return getters[getterName](this.state)
        //         }
        //     })
        // });
        forEach(getters, (getterName, value) => {
            //自定义属性
            Object.defineProperty(this.getters,getterName,{
                get:() => {
                    return value(this.state)
                }
            })
        });

        //mutations的实现
        //发布订阅。订阅：将函数订阅到数组中。 发布：将数组中的函数依次执行
        let mutations = options.mutations;
        this.mutations = {}
        forEach(mutations, (mutationName, value) => {
            //订阅
            this.mutations[mutationName] = (payload) => {
                value(this.state, payload);
            }
        })

        //action的实现
        //还未实现监控使异步操作均在action中执行
        let actions = options.actions;
        this.actions = {};
        forEach(actions, (actionName, value) => {
            this.actions[actionName] = (payload) => {
                value(this, payload)
            }
        })
    }
    //使用箭头函数确保this永远指向实例
    commit = (mutationName, payload) => {
        //发布
        this.mutations[mutationName](payload)
    }
    dispatch = (actionName, payload) => {
        this.actions[actionName](payload)
    }

    get state() { //获取实例上的state属性就会执行次方法
        //返回vue中的state
        return this.vm.state
    }
}
//Vue的构造函数
const install = (_Vue) => {
   Vue = _Vue;
   //所有根实例的子组件都有$store方法

    //在Vue中混入方法
    Vue.mixin({
        beforeCreate() {
            // console.log('hello')
            //向Vue实例所有的组件中添加$store
            if (this.$options.store) {
                this.$store = this.$options.store
            } else {
                this.$store = this.$parent && this.$parent.$store
            }

        }
    })
}

export default {
    Store,
    install
}
