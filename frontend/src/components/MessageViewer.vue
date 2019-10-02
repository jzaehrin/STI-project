<template>
  <div class="message_viewer">
    <v-card>
      <v-card-title>{{ subject }}</v-card-title>
      <v-card-text class="info">
        <span class="from">{{ fromName }}</span>
        <span class="to">{{ toName }}</span>
      </v-card-text>
      <v-card-text>
        <p>{{ message }}</p>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  name: 'MessageViewer',
  props: {
    id: Number,
    fromName: String,
    toName: String,
    timestamp: Number,
    subject: String,
    message: String,
  },
};
</script>

<style lang="less" scoped>
</style>
