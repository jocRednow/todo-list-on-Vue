<template>
    <form class="form mt-2" @submit.prevent="setTask()">
      <div class="form-group mb-3">
        <strong><label for="taskName">Название задачи</label></strong>
        <input type="text" class="form-control" 
          v-model="task.name" id="taskName"
          placeholder="Выберите название задачи" required>
      </div>
      <div class="form-group mb-3">
        <strong><label for="taskTags">Теги</label></strong>
        <input-tag class="form-control" v-model="task.tags" id="taskTags"></input-tag>
      </div>
      <div class="form-group mb-3">
        <strong><label for="taskDescription">Описание задачи</label></strong>
        <textarea class="form-control" maxlength="2048" 
          v-model="task.description" id="taskDescription"
          placeholder="Опишите задачу" rows="4" required></textarea>
      </div>
      <div class="row">
        <div class="col-md-4">
          <div class="form-group mb-3">
            <strong><label for="taskDate">Срок выполнения</label></strong>
            <date-picker v-model="task.date" :config="options" id="taskDate"
              required placeholder="Выберите крайний срок выполнения"></date-picker>
          </div>
        </div>
        <div v-if="this.formType === 'editOld'" class="col-md-4 offset-md-4">
          <div class="form-group mb-3">
            <div><strong><label>Статус задачи</label></strong></div>
            <div class="custom-control custom-radio custom-control-inline">
              <input type="radio" id="one" class="custom-control-input" value="в работе" v-model="task.status">
              <label class="custom-control-label" for="one">В работе</label>
            </div>
            <div class="custom-control custom-radio custom-control-inline">
              <input type="radio" id="two" class="custom-control-input" value="завершено" v-model="task.status">
              <label class="custom-control-label" for="two">Завершено</label>
            </div>
          </div>
        </div>
      </div>
      <button class="btn btn-primary btn-sm" type="submit" :disabled="isDisabled">{{ formType === 'addNew' ? 'Добавить задачу' : 'Изменить задачу' }}</button>
    </form>
</template>    

<script>
  export default {
    name: 'createEditForm',
    props: {
        task: Object,
        formType: String
    },
    data () {
      return {
        options: {
            format: 'DD.MM.YYYY',
            locale: 'ru',
            useCurrent: true,
            showClear: true,
            showClose: true
        }
      }
    },
    computed: {
      /* Можно было подключить vee-validate/vuelidate, но тут три поля... */ 
      isDisabled() {
          return !this.task.name || !this.task.description || !this.task.date;
      }
    },
    methods: {
      setTask () {
        if (this.formType === 'addNew') this.$store.commit('ADD_NEW_TASK', this.task);
        else if (this.formType === 'editOld') {
          this.$store.commit('EDIT_OLD_TASK', this.task);
          this.$router.push({name: 'todo'});
        }
      }
    }
  }
</script>