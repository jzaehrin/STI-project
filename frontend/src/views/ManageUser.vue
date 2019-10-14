<template>
  <div id="manage_user">
    <h2>{{ `Edit user ${userId.toString()}`}}</h2>
    <PasswordChanger
      notNeedPrevious
      :userId="userId"
    ></PasswordChanger>

    <h2 v-if="fetch">Change level</h2>
    <v-form
      v-model="valid"
      :lazy-validation="lazy"
      v-if="fetch"
    >
      <v-select
        v-model="level"
        :items="levels"
        item-text="name"
        item-value="level"
        label="User Level"
        required
      ></v-select>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="updateLevel()"
      >
        Update
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import PasswordChanger from '../components/PasswordChanger.vue';
import axios from 'axios';

export default {
  data() {
    return {
      userId: Number(this.$route.params.id),
      valid: true,
      lazy: false,
      fetch: false,
      level: undefined,
      levels: [
        {
          name: 'User',
          level: 0,
        },
        {
          name: 'Admin',
          level: 1,
        },
      ],
    };
  },
  created() {
    axios.get(`/user/${this.userId}`)
      .then((response) => {
        console.log(response);
        this.level = response.data.level;
        this.fetch = true;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    updateLevel() {
      axios.put(`/user/${this.userId}`, {
        level: this.level,
      })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  components: {
    PasswordChanger,
  },
};
</script>

<style scoped lang="less">
#manage_user {
  width: 50%;
  margin: 30px auto 0 auto;
}
</style>
