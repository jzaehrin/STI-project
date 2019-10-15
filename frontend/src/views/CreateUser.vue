<template>
  <div id="create_user">
    <h2>Create User</h2>
    <v-form
      v-model="valid"
      :lazy-validation="lazy"
    >
      <v-text-field
        v-model="username"
        :rules="usernameRules"
        label="Username"
        required
      ></v-text-field>

      <v-text-field
        v-model="firstname"
        :rules="nameRules"
        label="First Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="lastname"
        :rules="nameRules"
        label="Last Name"
        required
      ></v-text-field>

      <v-text-field
        v-model="password"
        :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
        :type="visible ? 'text' : 'password'"
        :rules="passwordRules"
        label="Password"
        hint="At least 8 characters"
        required
      ></v-text-field>

      <v-select
        v-model="level"
        :items="levels"
        item-text="name"
        item-value="value"
        label="User Level"
        required
      ></v-select>

      <v-switch
        v-model="active"
        label="Active"
      ></v-switch>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="createUser"
      >
        Create
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      valid: true,
      lazy: false,
      username: '',
      usernameRules: [
        v => !!v || 'Username is required',
      ],
      firstname: '',
      lastname: '',
      nameRules: [
        v => !!v || 'Name is required',
      ],
      visible: false,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
      level: undefined,
      levels: [
        {
          name: 'User',
          value: 0,
        },
        {
          name: 'Admin',
          value: 1,
        },
      ],
      active: false,
    };
  },
  methods: {
    createUser() {
      axios.post('/user',
        {
          username: this.username,
          first_name: this.firstname,
          last_name: this.lastname,
          password: this.password,
          level: this.level,
          active: (this.active) ? 1 : 0,
        })
        .then((response) => {
          console.log(response);
          this.$router.replace('/users');
        })
        .catch((error) => {
          console.error(error);

          if (error.response.status === 401) {
            this.$router.replace('/login');
          }
        });
    },
  },
};
</script>

<style lang="less" scoped >
  #create_user {
    width: 70%;
    margin: 30px auto 0 auto;
  }
</style>
