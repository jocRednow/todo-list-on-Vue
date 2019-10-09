import Vue from 'vue'
import Router from 'vue-router'
import CreateTodo from './views/Home.vue'
import TodoList from './views/TodoList.vue';
import TodoItem from './views/TodoItem.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: CreateTodo
    },
    {
      path: '/todo-list',
      name: 'todo',
      component: TodoList
    },
    {
      path: '/todo-item/:id',
      name: 'item',
      component: TodoItem
    }
  ]
})
