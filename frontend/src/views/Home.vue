<template>
  <InboxPreview :userId="userId" />
</template>

<script>
import InboxPreview from '../components/InboxPreview.vue';
import getUserId from '../utils/session';

export default {
  data() {
    return {
      userId: getUserId(),
    };
  },
  components: {
    InboxPreview,
  },
};
</script>
