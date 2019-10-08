<template>
  <div id="change_password">
    <PasswordChanger
      :userId="userId"
      :onSuccess="() => { this.$router.push('/'); }"
    ></PasswordChanger>
  </div>
</template>

<script>
import PasswordChanger from '../components/PasswordChanger.vue';
import getUserId from '../utils/session';

export default {
  data() {
    return {
      userId: getUserId(),
    };
  },
  components: {
    PasswordChanger,
  },
};
</script>

<style scoped lang="less">
#change_password {
  width: 30%;
  margin: 30px auto 0 auto;
}
</style>
