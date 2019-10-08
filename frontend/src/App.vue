<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-toolbar-title
        class="headline text-uppercase"
      >
        <a href="/" style="text-decoration: none; color: black;">WebMail</a>
        <span class="font-weight-light">Powered by vuejs</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu
        open-on-hover
        close-on-content-click
        offset-y
      >
        <template v-slot:activator="{ on }">
          <v-btn
            text
            icon
            v-on="on"
          >
            <v-icon>mdi-account</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item
            href="/changePassword"
            @click=""
          >
            <v-list-item-title>change password</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
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
      <router-view></router-view>
    </v-content>
  </v-app>

</template>

<script>
import getUserId from './utils/session';

export default {
  name: 'App',
  data: () => ({
    userId: getUserId(),
  }),
};
</script>

<style scoped lang="less">
.font-weight-light {
  padding-left: 20px;
}
</style>
