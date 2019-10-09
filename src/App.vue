<template>
  <div id="app">
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div id="nav">
            <router-link to="/">Создать задачу</router-link> |
            <router-link to="/todo-list">Список задач</router-link>
          </div>
          <router-view/>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#app {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  text-align: center;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #838f8f;
}

#nav a:hover,
#nav a.router-link-exact-active:hover {
  text-decoration: none;
}

.vue-input-tag-wrapper .input-tag {
  background-color: #9cd5e6!important;
  border: 1px solid #727cd3!important;
  color: #3424c5!important;
}

.vue-input-tag-wrapper .input-tag .remove {
  color: #333333!important;
}
</style>
