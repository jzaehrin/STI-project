<template>
  <div id="manage_user">
    <h2>{{ `Edit user ${userId}`}}</h2>
    <PasswordChanger
      notNeedPrevious
      :userId="userId"
    ></PasswordChanger>
  </div>
</template>

<script>
import PasswordChanger from '../components/PasswordChanger.vue';

export default {
  data() {
    return {
      userId: this.$route.params.id,
    };
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
