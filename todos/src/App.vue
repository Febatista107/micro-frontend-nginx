<template>
  <mwc-top-app-bar-fixed>
    <div slot="title">To do list</div>
    <div id="content">
      <mwc-list>
        <mwc-list-item v-if="todos.length === 0"
          >You don't have any to do yet</mwc-list-item
        >
        <mwc-list-item
          v-for="(todo, index) in todos"
          :key="todo.title"
          v-on:click="toggleTodo(index)"
          :class="{ done: todo.done }"
          >{{ todo.title }}</mwc-list-item
        >
      </mwc-list>
      <mwc-textfield
        v-bind:value="newTodo"
        v-on:input="updateNewTodo"
        label="New to do"
        outlined
      ></mwc-textfield>
      <mwc-fab v-on:click="addTodo" icon="add"></mwc-fab>
    </div>
  </mwc-top-app-bar-fixed>
</template>

<script>
import "@material/mwc-top-app-bar-fixed";
import "@material/mwc-list/mwc-list";
import "@material/mwc-list/mwc-list-item";
import "@material/mwc-textfield";
import "@material/mwc-fab";
import "@material/mwc-icon";

export default {
  name: "App",
  data: function() {
    return {
      todos: [],
      newTodo: "",
    };
  },
  methods: {
    updateNewTodo: function(event) {
      this.newTodo = event.target.value;
    },
    addTodo: function() {
      if (this.newTodo === "") {
        alert("Add a description to your to do");
        return;
      }

      if (this.todos.includes(this.newTodo)) {
        alert("This to do already exists");
        return;
      }

      const newTodo = {
        title: this.newTodo,
        done: false,
      };

      this.todos.push(newTodo);
      this.newTodo = "";
    },
    toggleTodo: function(index) {
      this.todos[index].done = !this.todos[index].done;
    },
  },
};
</script>

<style>
html,
body {
  height: 100%;
  width: 100%;
}

mwc-list-item.done {
  text-decoration: line-through;
}

mwc-textfield {
  width: 50%;
  position: absolute;
  bottom: 16px;
  left: 16px;
}

mwc-fab {
  position: absolute;
  bottom: 16px;
  right: 16px;
}
</style>
