<template>
  <div class="message">
    <MessageViewer
      v-if="isFetch"
      :from-name="fromName"
      :to-name="toName"
      :timestamp="timestamp"
      :subject="subject"
      :message="message"
    ></MessageViewer>
  </div>
</template>

<script>
import axios from 'axios';
import MessageViewer from '../components/MessageViewer.vue';

export default {
  data() {
    return {
      id: this.$route.params.id,
      fromName: 'empty',
      fromId: -1,
      toName: 'empty',
      toId: -1,
      timestamp: -1,
      subject: 'empty',
      message: 'empty',
      isFetch: false,
    };
  },
  created() {
    axios.get(`/message/${this.id}`)
      .then((response) => {
        console.log(response);
        this.isFetch = true;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  components: {
    MessageViewer,
  },
};
</script>
