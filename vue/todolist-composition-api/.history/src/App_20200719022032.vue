<template>
  <div>
    <header>
      <section>
        <label for="title">ToDoList</label>
        <input type="text" v-model="todo"  @keyup.enter="addTodo" placeholder="添加ToDoList" />
      </section>
    </header>
    <section>
      <h2>正在进行
        <span>{{todoLen}}</span>
      </h2>
      <ol class="demo-box">
        <li  v-for="(item, index) in todoList" :key="index" v-show="item.done === false">
          <input type="checkbox" @change="changeTodo(index,true)">
          <p>{{item.todo}}</p>
          <a @click="deleteTodo(index,true)">-</a>
        </li>
      </ol>
      <h2>已经完成
        <span>{{todoList.length - todoLen}}</span>
      </h2>
      <ul>
        <li v-for="(item, index) in todoList" :key="index" v-show="item.done === true">
          <input type="checkbox" @change="changeTodo(index,false)" checked='checked'>
          <p>{{item.todo}}</p>
          <a @click="deleteTodo(index,false)">-</a>
        </li>
      </ul>
    </section>
    <button class="delate" @click="initTodo">点击删除</button>
  </div>
</template>

<style>
  @media screen and (max-device-width: 620px) {
    section{
      width:96%;padding:0 2%;
    }
  }
  @media screen and (min-width: 620px) {
    section{
      width:600px;padding:0 10px;
    }
  }
  body {
    margin:0;
    padding:0;
    font-size:16px;
    background: #CDCDCD;
  }
  header {
    height:50px;
    background:#333;
    background:rgba(47,47,47,0.98);
  }
  section{
    margin:0 auto;
  }
  label{
    float:left;
    width:100px;
    line-height:50px;
    color:#DDD;
    font-size:24px;
    cursor:pointer;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
  }
  header input{
    float:right;
    width:60%;
    height:24px;
    margin-top:12px;
    text-indent:10px;
    border-radius:5px;
    box-shadow: 0 1px 0 rgba(255,255,255,0.24), 0 1px 6px rgba(0,0,0,0.45) inset;border:none
  }
  input:focus{
    outline-width:0
  }
  h2{
    position:relative;
  }
  span{
    position:absolute;
    top:2px;
    right:5px;
    display:inline-block;
    padding:0 5px;
    height:20px;
    border-radius:20px;
    background:#E6E6FA;
    line-height:22px;
    text-align:center;
    color:#666;
    font-size:14px;
  }
  ol,ul{
    padding:0;
    list-style:none;
  }
  li input{
    position:absolute;
    top:2px;
    left:10px;
    width:22px;
    height:22px;
    cursor:pointer;
  }
  p{
    margin: 0;
  }
  li p input{
    top:3px;
    left:40px;
    width:70%;
    height:20px;
    line-height:14px;
    text-indent:5px;
    font-size:14px;
  }
  li{
    height:32px;
    line-height:32px;
    background: #fff;
    position:relative;
    margin-bottom: 10px;
    padding:0 45px;
    border-radius:3px;
    border-left: 5px solid #629A9C;
    box-shadow: 0 1px 2px rgba(0,0,0,0.07);
  }
  ol li{
    cursor:move;
  }
  ul li{
    border-left: 5px solid #999;
    opacity: 0.5;
  }
  li a{
    position:absolute;
    top:2px;
    right:5px;
    display:inline-block;
    width:14px;
    height:12px;
    border-radius:14px;
    border:6px double #FFF;
    background:#CCC;
    line-height:14px;
    text-align:center;
    color:#FFF;
    font-weight:bold;
    font-size:14px;
    cursor:pointer;
  }
  footer{
    color:#666;
    font-size:14px;
    text-align:center;
  }
  footer a{
    color:#666;
    text-decoration:none;
  }
  .delate {
    display: block;
    height: 30px;
    width: 100px;
    /* margin-left: 10px; */
    margin: 0 auto;
    border-radius: 5px;
    border: none;
    background-color: #629A9C;
    outline: none;
    cous
  }

</style>

<script>
import * as Utils from '@/utils/utils'
export default {
  name: 'Todolist',
  data () {
    return {
      todo: '',
      todoList: [],
      todoLen: 0
    }
  },
  methods: {
    // initTodo () {
    //   const todoArr = Utils.getItem('todoList')
    //   if (todoArr) {
    //     for (let i = 0, len = todoArr.length; i < len; i++) {
    //       if (todoArr[i].done === false) {
    //         this.todoLen++
    //       }
    //     }
    //     this.todoList = todoArr
    //   }
    // },
    addTodo () {
      const todoObj = {
        todo: this.todo,
        done: false
      }
      const tempList = Utils.getItem('todoList')
      if (tempList) {
        tempList.push(todoObj)
        Utils.setItem('todoList', tempList)
      } else {
        const tempData = []
        tempData.push(todoObj)
        Utils.setItem('todoList', tempData)
      }
      this.todoList.push(todoObj)
      this.todoLen++
      this.todo = ''
    },
    deleteTodo (index, done) {
      if (done) {
        this.todoLen--
      }
      this.todoList.splice(index, 1)
      Utils.setItem('todoList', this.todoList)
    },
    changeTodo (index, done) {
      if (done) {
        this.todoLen--
        this.todoList[index].done = true
        Utils.setItem('todoList', this.todoList)
      } else {
        this.todoLen++
        this.todoList[index].done = false
        Utils.setItem('todoList', this.todoList)
      }
    },
    clearData () {
      localStorage.clear()
      this.todoList = []
      this.todoLen = 0
    }
  },
  mounted () {
    this.initTodo()
  }
}
</script>
