<template>
  <div id="home">
    <InboxPreview
      id="inbox"
      :userId="userId"
      :onOpen="(message) => this.messageId = message.id"
    />
    <MessageViewer
      id="message"
      v-if="messageId !== undefined"
      :messageId="messageId"
    />
  </div>
</template>

<script>
import InboxPreview from '../components/InboxPreview.vue';
import MessageViewer from '../components/MessageViewer.vue';
import { getUserId } from '../utils/session';

export default {
  data() {
    return {
      userId: getUserId(),
      messageId: undefined,
    };
  },
  components: {
    InboxPreview,
    MessageViewer,
  },
};
</script>

<style scoped lang="less">
#home {
  height: 100vh;

  #inbox {
    vertical-align: top;
    width: 30%;
    display: inline-block;
    height: 100vh;
    z-index: 1;
    position: relative;
  }

  #message {
    vertical-align: top;
    width: 70%;
    display: inline-block;

  }
}
</style>
