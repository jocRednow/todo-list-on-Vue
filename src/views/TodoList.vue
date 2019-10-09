<template>
  <div class="todo">
    <div v-if="!taskListEmpty">
      <div class="filters mb-4">
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="one" class="custom-control-input" value="в работе" v-model="filter">
          <label class="custom-control-label" for="one">В работе</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="two" class="custom-control-input" value="завершено" v-model="filter">
          <label class="custom-control-label" for="two">Завершено</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="three" class="custom-control-input" value="просрочено" v-model="filter">
          <label class="custom-control-label" for="three">Просрочено</label>
        </div>
        <div class="custom-control custom-radio custom-control-inline">
          <input type="radio" id="all" class="custom-control-input" value="все" v-model="filter">
          <label class="custom-control-label" for="all">Все</label>
        </div>
      </div>
      <ul class="list-group">
        <li class="list-group-item mb-1" @click="editItem(index)"
            v-for="(item, index) in filterTask" :key="index">
          <div class="row mb-3">
            <div class="col-md-6">
              <kbd class="list-group-item-date bg-secondary">{{ item.date }}</kbd>
            </div>
            <div class="col-md-6">
              <small class="list-group-item-status float-right" :title="item.status" 
                :class="item.status === 'в работе' ? 'bg-warning' : 'bg-success'"></small>
            </div>
          </div>
          <div class="list-group-item-name mb-3">
            <h4>{{ item.name }}</h4>
          </div>
          <div class="list-group-item-tags mb-2">
            <span class="list-group-item-tag mr-2" v-for="tag in item.tags" :key="tag">
              <kbd class="bg-primary">{{ tag }}</kbd>
            </span>
          </div>
          <div class="list-group-item-description mb-3">
            <small>{{ item.description }}</small>
          </div>  
        </li>
      </ul>
    </div>
    <h3 v-if="taskListEmpty" class="text-center mt-5">Список задач пока пуст.</h3>
  </div>
</template>

<script>
  import { mapState } from 'vuex';

  export default {
    name: 'todo',
    data () {
      return {
        filter: "все",
        taskListEmpty: false
      }
    },
    computed: {
      ...mapState(['taskList']),
      filterTask () {
        if (this.filter === 'все') {
          return this.taskList;
        } else if (this.filter === 'просрочено') {
          let nowDate = new Date().getTime();
          return this.taskList.filter((item) => {
            let taskDate = new Date(item.date).getTime();
            if (taskDate < nowDate && item.status === 'в работе') {
              return item;
            }
          })
        } else {
          return this.taskList.filter((item) => {
            if (item.status === this.filter) {
              return item;
            }
          })
        }
      }
    },
    mounted () {
      if (this.taskList.length > 0) {
        return true;
      } else if (this.taskList.length === 0 && localStorage.getItem('todos')) {
        this.$store.commit('ADD_TASK_LIST_FROM_STORAGE');
      } else {
        this.taskListEmpty = true;
      }
    },
    methods: {
      editItem (index) {
        let id = index + 1;
        this.$store.commit('GET_TASK', id);
        this.$router.push({name: 'item', params: { id }});
      }
    }
  }
</script>  

<style scoped>
  .custom-control-input {
    cursor: pointer!important;
  }
  .list-group-item {
    cursor: pointer;
  }
  .list-group-item-description {
    max-height: 3em;
    overflow: hidden;
  }
  .list-group-item-status {
    padding: 2%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%; 
    border-radius: 50%; 
  }
</style>