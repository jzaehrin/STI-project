<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-toolbar-title class="headline text-uppercase">
        <span>WebMail</span>
        <span class="font-weight-light">Powered by vuejs</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn
        text
        href="/profile"
      >
        <span class="mr-2">Profile</span>
      </v-btn>
    </v-app-bar>
    <v-navigation-drawer app absolute clipped>
      <v-list dense nav>
        <v-subheader>Navigation</v-subheader>
        <v-list-item href="/inbox" link>
          <v-list-item-icon>
            <v-icon>mdi-inbox-arrow-down</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Inbox</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item href="/outbox" link>
          <v-list-item-icon>
            <v-icon>mdi-inbox-arrow-up</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Outbox</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-link />
    </v-content>
  </v-app>

</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>

<style scoped lang="less">
.font-weight-light {
  padding-left: 20px;
}
</style>
