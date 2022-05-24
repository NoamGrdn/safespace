<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <router-view/>
    <!-- eslint-disable -->
    <tbody>
      <tr v-for="user in usersData">
        <td>{{user.name}}</td>
        <td>{{user.family_name}}</td>
      </tr>
      <tr v-for="pro in professions">
        <td>{{pro.name}}</td>
        <td>{{pro.id}}</td>
      </tr>
    </tbody>
  </div>
</template>

<script>
import {getUsers, getProfessions} from "./firebaseInit";
export default {
  name: 'app',
  data() {
    return {
      usersData: [],
      professions: []
    };
  },
  async mounted() {
    this.usersData = await getUsers();
    this.professions = await getProfessions();
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>