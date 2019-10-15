<template>
  <div id="message_creator">
    <h2>Send message</h2>
    <v-form
      v-model="valid"
      :lazy-validation="lazy"
    >
      <v-select
        v-model="toId"
        :items="users"
        item-text="username"
        item-value="id"
        label="To"
        required
      ></v-select>

      <v-text-field
        v-model="subject"
        :rules="subjectRules"
        label="Subject"
        required
      ></v-text-field>

      <v-textarea
        v-model="message"
        :rules="messageRules"
        label="Message"
        required
      ></v-textarea>

      <v-btn
        :disabled="!valid"
        color="success"
        class="mr-4"
        @click="send"
      >
        Send
      </v-btn>
    </v-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MessageCreator',
  props: {
    to: Number,
    defaultSubject: String,
    onSuccess: Function,
  },
  data() {
    return {
      valid: true,
      lazy: false,
      toId: (this.to !== undefined) ? this.to : 0,
      subject: (this.defaultSubject !== undefined) ? this.defaultSubject : '',
      subjectRules: [
        v => !!v || 'Subject is required',
      ],
      message: '',
      messageRules: [
        v => !!v || 'Password is required',
      ],
      users: [],
    };
  },
  created() {
    axios.get('/users')
      .then((response) => {
        console.log(response);
        this.users = response.data;
      })
      .catch((error) => {
        console.error(error);

        if (error.response.status === 401) {
          this.$router.replace('/login');
        }
      });
  },
  methods: {
    send() {
      axios.post('/message',
        {
          to: this.toId,
          subject: this.subject,
          message: this.message,
        })
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

<style lang="less" scoped>
#message_creator {
  padding: 10px
}
</style>
