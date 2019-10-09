<template>
  <div class="item">
    <CreateEditForm :task="selectedTask" :formType="editOld"></CreateEditForm>
  </div>
</template>

<script>
  import CreateEditForm from '@/components/CreateEditForm.vue'
  import { mapState } from 'vuex';

  export default {
    name: 'todoItem',
    components: {
      CreateEditForm
    },
    data () {
      return {
        editOld: "editOld"
      }
    },
    computed: {
      ...mapState(['selectedTask'])
    }
  }
</script>  