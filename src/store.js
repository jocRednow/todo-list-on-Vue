import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    taskList: [],
    newTask: {
      name: "",
      tags: [],
      description: "",
      date: "",
      status: "в работе"
    },
    selectedTask: null
  },
  mutations: {
    ADD_NEW_TASK (state, payload) {
      state.taskList.push(payload);
      localStorage.setItem('todos', JSON.stringify(state.taskList));
      state.newTask = {
        name: "",
        tags: [],
        description: "",
        date: "",
        status: "в работе"
      };
    },
    ADD_TASK_LIST_FROM_STORAGE (state) {
      state.taskList = JSON.parse(localStorage.getItem('todos'));
    },
    GET_TASK (state, payload) {
      state.taskList.filter((item, index) => {
        if (payload - 1 === index) state.selectedTask = item;
      })
    },
    EDIT_OLD_TASK (state, payload) {
      state.taskList.filter((item) => {
        if (payload.description === item.description) item = payload; 
      })
      localStorage.setItem('todos', JSON.stringify(state.taskList));
    }
  },
  actions: {}
})
