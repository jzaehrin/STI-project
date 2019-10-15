<template>
  <div id="users">
    <v-card id="list_users">
      <v-btn
        primary
        to="/user/new"
      >
        Add User
      </v-btn>
      <v-card-title>Users</v-card-title>
      <v-card-text class="users-box">
        <v-list two-line>
          <v-list-item-group
            multiple
          >
            <template v-for="(item, index) in users">
              <v-list-item :key="item.id">
                <template>
                  <v-list-item-content>
                    <v-list-item-title v-text="item.username"></v-list-item-title>
                    <v-list-item-subtitle class="text--primary" v-text="item.firstname + ' ' + item.lastname"></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-btn
                      icon
                      :to="`/user/${item.id}/edit`"
                    >
                      <v-icon
                        color="grey"
                      >
                        mdi-account-edit
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-action>
                    <v-btn
                      icon
                      @click="toggleActive(item)"
                    >
                      <v-icon
                        v-if="item.active"
                        color="green"
                      >
                        mdi-account
                      </v-icon>

                      <v-icon
                        v-else
                        color="grey lighten-1"
                      >
                        mdi-account-off
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                  <v-list-item-action>
                    <v-btn
                      icon
                      @click="deleteUser(item)"
                    >
                      <v-icon
                        color="grey"
                      >
                        mdi-delete
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index + 1 < users.length"
                :key="index"
              ></v-divider>
            </template>
          </v-list-item-group>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ManageUsers',
  data() {
    return {
      users: [],
    };
  },
  created() {
    axios.get('/users')
      .then((response) => {
        console.log(response);
        this.users = response.data;
      })
      .catch((error) => {
        console.error(error);

        if (error.response.status === 401) {
          this.$router.replace('/login');
        }
      });
  },
  methods: {
    toggleActive(user) {
      axios.put(`/user/${user.id}`,
        {
          active: (user.active === 1) ? 0 : 1,
        })
        .then((response) => {
          // eslint-disable-next-line no-param-reassign
          user.active = (user.active === 1) ? 0 : 1;
          console.log(response);
        })
        .catch((error) => {
          console.error(error);

          if (error.response.status === 401) {
            this.$router.replace('/login');
          }
        });
    },
    deleteUser(user) {
      axios.delete(`/user/${user.id}`)
        .then(() => {
          this.users.splice(this.users.indexOf(user), 1);
        })
        .catch((error) => {
          console.error(error);

          if (error.response.status === 401) {
            this.$router.replace('/login');
          }
        });
    },
  },
};
</script>

<style scoped lang="less">
#users {
  width: 95%;
  margin: 30px auto 0 auto;

  #list_users {
    padding: 10px;
  }
}
</style>
