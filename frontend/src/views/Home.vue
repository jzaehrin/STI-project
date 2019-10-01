<template>
  <InboxPreview :user_id="user_id" />
</template>

<script>
import InboxPreview from '../components/InboxPreview.vue';

export default {
  components: {
    InboxPreview,
  },
};
</script>
