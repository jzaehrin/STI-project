<template>
  <v-app>
    <v-app-bar app clipped-left>
      <v-toolbar-title
        class="headline text-uppercase"
      >
        <router-link style="text-decoration: none; color: black;" to="/">WebMail</router-link>
        <span class="font-weight-light">Powered by vuejs</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <template
        v-if="userId !== undefined"
      >
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
                to="/changePassword"
              >
                <v-list-item-title>change password</v-list-item-title>
              </v-list-item>
            </v-list>
        </v-menu>
        <v-btn
          depressed
          @click="logout()"
        >
          Logout
        </v-btn>
      </template>
    </v-app-bar>
    <v-navigation-drawer app absolute clipped>
      <v-list dense nav>
        <v-subheader>Navigation</v-subheader>
        <v-list-item to="/message/new" link>
          <v-list-item-icon>
            <v-icon>mdi-email-plus</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>New</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-list-item to="/" link>
          <v-list-item-icon>
            <v-icon>mdi-inbox-arrow-down</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Inbox</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item to="/outbox" link>
          <v-list-item-icon>
            <v-icon>mdi-inbox-arrow-up</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Outbox</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-subheader v-if="userLevel > 0" >Administration</v-subheader>
        <v-list-item v-if="userLevel > 0" to="/users" link>
          <v-list-item-icon>
            <v-icon>mdi-account-multiple</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Users</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-content>
      <router-view />
    </v-content>
  </v-app>

</template>

<script>
import cookie from 'js-cookie';
import { getUserId, getUserLevel } from './utils/session';

export default {
  name: 'App',
  data() {
    return {
      userId: getUserId(),
      userLevel: getUserLevel(),
    };
  },
  updated() {
    this.userId = getUserId();
    this.userLevel = getUserLevel();
  },
  methods: {
    logout() {
      cookie.remove('Authorization');
      this.$forceUpdate();
      this.$router.replace('/login');
    },
  },
};
</script>

<style scoped lang="less">
.font-weight-light {
  padding-left: 20px;
}
</style>
