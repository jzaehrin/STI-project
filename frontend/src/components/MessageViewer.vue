<template>
  <div class="message_viewer">
    <v-card>
      <v-card-actions
        v-if="reply"
        style="float: right; margin: 10px 10px 0"
      >
        <v-btn
          icon
          @click="clickReply(message)"
        >
          <v-icon>
            mdi-reply
          </v-icon>
        </v-btn>
      </v-card-actions>
      <v-card-title>{{ message.subject }}</v-card-title>
      <v-card-text>
        <span class="from">From : {{ message.fromName }}</span>
        <br />
        <span class="to">To : {{ message.toName }}</span>
        <br />
        <span>{{ moment().unix(message.timestamp).format('LLLL') }}</span>
      </v-card-text>
      <v-card-text id="content">
        <pre>{{ message.message }}</pre>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  name: 'MessageViewer',
  props: {
    messageId: Number,
    reply: {
      type: Boolean,
      default: false,
    },
    clickReply: {
      type: Function,
      default: () => false,
    },
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
          console.error(error);

          if (error.response.status === 401) {
            this.$router.replace('/login');
          }
        });
    },
    moment() {
      return moment;
    },
  },
};
</script>

<style lang="less" scoped>
#content {
  border-top: grey 1px solid;
}
#content pre{
  max-height: 300px;
  overflow-y: scroll;
}
#content pre {
  overflow-wrap: break-word;
  white-space: pre-wrap;
  font-style: inherit;
  font-family: inherit;
}
</style>
