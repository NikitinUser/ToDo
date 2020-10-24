Vue.component('task-list', {
  template: '#task-list',
  props: {
    tasks: {default: []}
  },
  data() {
    return {
      newTask: ''
    };
  },
  methods: {
    addTask() {
      if (this.newTask) {
        this.tasks.push({
          title: this.newTask,
          completed: false
        });
        this.newTask = '';
        const parsed = JSON.stringify(this.tasks);
        localStorage.setItem('tasks', parsed);
      }
    },
    completeTask(task) {
      task.completed = ! task.completed;
    },
    removeTask(index) {
      this.tasks.splice(index, 1);
      const parsed = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', parsed);
    }
  }
});

Vue.component('task-item', {
  template: '#task-item',
  props: ['task'],
  computed: {
    className() {
      let classes = ['btn btn-secondary btn-sm'];
      if (this.task.completed) {
        classes.push('btn btn-success btn-sm');
      }
      return classes.join(' ');
    }
  }
});

let app = new Vue({
  el: '#app',
  data: {
    tasks: []
  },
  mounted() {
    if (localStorage.getItem('tasks')) {
      try {
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
      } catch(e) {
        localStorage.removeItem('tasks');
      }
      //this.tasks = localStorage.tasks;
    }
  },
  /*
  watch: {
    tasks(newTask) {
      localStorage.tasks.push(newTask);// = newName;
    }
  },*/
  flag_rewrite: false,

});
/*
document.addEventListener('DOMContentLoaded', function(){
  axios({
    method: 'post',
    url: '/files/todo-checklist/ajax.php',
    data: {
      action: 'get-storage'
    }
  })
  .then(function (response) {
    data = response.data;
    if (data !== 'error'){
      app.tasks = data;
    } else {
      alert('Ошибка: не удалось загрузить данные');
    }
  })
  .catch (function (){
    alert('Ошибка: не удалось загрузить данные');
  })
});
*/