<template>
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