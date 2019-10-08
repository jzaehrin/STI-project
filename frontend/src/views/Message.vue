<template>
  <div id="message">
    <MessageViewer
      :id="id"
    />
  </div>
</template>

<script>
import MessageViewer from '../components/MessageViewer.vue';

export default {
  data() {
    return {
      message: {
        id: this.$route.params.id,
      },
    };
  },
  components: {
    MessageViewer,
  },
};
</script>

<style scoped lang="less">
#message {
  width: 80%;
  margin: 30px auto 0 auto;
}
</style>
