<template>
  <div class="container">
    <h1 class="container__header">Danh sách việc cần làm</h1>
    
    <!-- Form nhập công việc cần làm -->
    <form class="container__form">
      <input v-model="newTodo" placeholder="Thêm công việc mới..." class="container__form-input"/>
      <button @click.prevent="addTask" class="container__form-submit" value=""><i class="fas fa-plus"></i></button>
    </form>

    <!-- Hiển thị danh sách việc cần làm -->
    <ul class="container__task-list">
      <li v-for="todo in todos" :key="todo._id" class="task-list__item">
        <label class="task-list__item-label">
          <input class="task-list__item-check" type="checkbox" v-model="todo.completed" @change="updateTask(todo)" />
          <span class="task-list__item-title">{{ todo.title }}</span>
          <i class="fas fa-check" :class="{ 'checked': todo.completed }"></i>
        </label>
        <button @click="deleteTask(todo)" class="task-list__item-delete-btn"><i class="fas fa-trash"></i></button>
      </li>
    </ul>

    <!-- Nút xóa các công việc -->
    <button @click="deleteAllTask" class="container__btn-delete">Xóa tất cả</button>

    <!-- Nút xóa các công việc đã hoàn thành -->
    <button @click="deleteAllCompletedTasks" class="container__btn-delete">Xóa tất cả công việc đã hoàn thành</button>
  </div>
</template>

<script>
  import TodoService from "@/services/todo.service";
  export default {
    data() {
      return {
        todos: [],
        newTodo: ''
      };
    },
    methods: {
      // tạo một công việc
      async addTask() {
        if (this.newTodo) {
          try {
            const todo = await TodoService.createTask(JSON.stringify({title: this.newTodo}));
            this.todos.push(todo);
            this.newTodo = '';
          } catch (err) {
            console.error('Lỗi thêm công việc:', err.response.data);
          }
        }
      },
      
      // đánh dấu công việc đã hoàn thành
      async updateTask(todo) {
        try {
          await TodoService.updateTask(todo._id, JSON.stringify({ title: todo.title, completed: todo.completed }));
        } catch (error) {
          console.error('Lỗi cập nhật công việc:', error);
        }
      },

      // xóa một công việc
      async deleteTask(todo) {
        try {
          window.location.reload();
          await TodoService.deleteTask(todo._id);
          // this.getTodos();
        } catch (err) {
          console.error('Lỗi xóa công việc:', err.response.data);
        }
      },

      // xóa toàn bộ công việc
      async deleteAllTask() {
        try {
          window.location.reload();
          await TodoService.deleteAllTask();
          // this.getTodos();
        } catch (err) {
          console.error('Lỗi xóa tất cả công việc:', err.response.data);
        }
      },

      // xóa toàn bộ các công việc đã hoàn thành
      async deleteAllCompletedTasks() {
        try {
          window.location.reload();
          await TodoService.deleteAllCompleted();
          // this.getTodos();
        } catch (err) {
          console.error('Lỗi xóa tất cả công việc:', err);
        }
      },

      // lấy danh sách Todo từ database
      async getTodos() {  
        try {
          this.todos = await TodoService.getTodos();
        } catch (err) {
          console.error('Lỗi lấy danh sách công việc:', err);
        }
      }
    },
    mounted() {
      this.getTodos();
    }
  };
</script>

<style scoped>
  @import "main.css";
</style>