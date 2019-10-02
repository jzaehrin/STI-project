<template>
  <div class="inbox">

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'InboxPreview',
  props: {
    userId: Number,
  },
  created() {
    axios.get(`/user/${this.userId}/inbox`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped lang="less">
</style>
