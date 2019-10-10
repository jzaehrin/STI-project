<template>
  <div class="message_viewer">
    <v-card>
      <v-card-title>{{ message.subject }}</v-card-title>
      <v-card-text>
        <span class="from">From : {{ message.fromName }}</span>
        <br />
        <span class="to">To : {{ message.toName }}</span>
      </v-card-text>
      <v-card-text>
        <p>{{ message.message }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'MessageViewer',
  props: {
    messageId: Number,
  },
  data() {
    return {
      message: {
      },
    };
  },
  created() {
    this.getMessage();
  },
  watch: {
    messageId() {
      this.getMessage();
    },
  },
  methods: {
    getMessage() {
      axios.get(`/message/${this.messageId}`)
        .then((response) => {
          this.message = response.data;
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style lang="less" scoped>
</style>
