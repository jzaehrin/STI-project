<template>
  <div id="login">
    <h2>Login</h2>
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
        v-model="password"
        :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
        :type="visible ? 'text' : 'password'"
        :rules="passwordRules"
        label="Password"
        hint="At least 8 characters"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="login"
      >
        Login
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
      visible: false,
      password: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    };
  },
  methods: {
    login() {
      console.log("ON LOGIN ACTION");
      axios.post('/login',
        {
          user: this.username,
          password: this.password,
        })
        .then((response) => {
          console.log(response);
          this.$router.push('/');
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less" scoped >
#login {
  width: 30%;
  margin: 30px auto 0 auto;
}
</style>
