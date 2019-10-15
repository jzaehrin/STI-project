<template>
  <div id="password">
    <h2>Change password</h2>
    <v-form
      v-model="valid"
      :lazy-validation="lazy"
    >
      <v-text-field
        v-if="! notNeedPrevious"
        v-model="prevPassword"
        :append-icon="visible1 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="visible1 ? 'text' : 'password'"
        :rules="passwordRules"
        label="Previous password"
        hint="At least 8 characters"
        required
      ></v-text-field>

      <v-text-field
        v-model="newPassword"
        :append-icon="visible2 ? 'mdi-eye' : 'mdi-eye-off'"
        :type="visible2 ? 'text' : 'password'"
        :rules="passwordRules"
        label="New password"
        hint="At least 8 characters"
        required
      ></v-text-field>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="updatePassword"
      >
        Update
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    userId: Number,
    onSuccess: Function,
    notNeedPrevious: Boolean,
  },
  data() {
    return {
      valid: true,
      lazy: false,
      visible1: false,
      visible2: false,
      prevPassword: '',
      newPassword: '',
      passwordRules: [
        v => !!v || 'Password is required',
      ],
    };
  },
  methods: {
    updatePassword() {
      let payload = {
        new: this.newPassword,
      };
      if (! this.notNeedPrevious) {
        payload.prev = this.prevPassword;
      }

      axios.put(`/user/${this.userId}`, { password: payload })
        .then((response) => {
          console.log(response);

          if (this.onSuccess !== undefined) this.onSuccess(this);
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
  #login {
    width: 30%;
    margin: 30px auto 0 auto;
  }
</style>
