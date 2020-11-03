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
    }
  },
  flag_rewrite: false,

});
