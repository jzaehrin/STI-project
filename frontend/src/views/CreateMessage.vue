<template>
  <div id="create_message">
    <MessageCreator
      :onSuccess="() => { this.$router.push('/'); }"
    >
    </MessageCreator>
  </div>
</template>

<script>
import MessageCreator from '../components/MessageCreator.vue';

export default {
  name: 'CreateMessage',
  data() {
    return {
    };
  },
  components: {
    MessageCreator,
  },
};
</script>

<style lang="less" scoped>
#create_message {
  width: 70%;
  margin: 30px auto 0 auto;
}
</style>
