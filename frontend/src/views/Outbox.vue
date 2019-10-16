<template>
  <div id="outbox">
    <InboxPreview
      id="preview"
      :userId="userId"
      :onOpen="onSelectMessage"
      outbox
    />
    <div id="message">
      <MessageViewer
        v-if="messageId !== undefined"
        :messageId="messageId"
        reply
        :click-reply="(message) => this.replyMessage = message"
      />
      <MessageCreator
        v-if="replyMessage !== undefined"
        :default-subject="`Rep : ${replyMessage.subject}`"
        :to="replyMessage.toId"
        :on-success="() => this.replyMessage = undefined"
      />
    </div>
  </div>
</template>

<script>
import InboxPreview from '../components/InboxPreview.vue';
import MessageViewer from '../components/MessageViewer.vue';
import MessageCreator from '../components/MessageCreator.vue';
import { getUserId } from '../utils/session';

export default {
  data() {
    return {
      userId: getUserId(),
      messageId: undefined,
      replyMessage: undefined,
    };
  },
  methods: {
    onSelectMessage(message) {
      this.messageId = message.id;
      this.replyMessage = undefined;
    },
  },
  components: {
    InboxPreview,
    MessageViewer,
    MessageCreator,
  },
};
</script>

<style scoped lang="less">
#outbox {
  height: 100vh;

  #preview {
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
