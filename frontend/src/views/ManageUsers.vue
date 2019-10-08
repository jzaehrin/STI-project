<template>
  <div class="users">
    <v-card>
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
                      :href="`/user/${item.id}/edit`"
                    >
                      <v-icon
                        color="gray"
                      >
                        mdi-account-edit
                      </v-icon>
                    </v-btn>
                  </v-list-item-action>

                  <v-list-item-action>
                    <v-btn
                      icon
                      @click="toggleActive(item.id, item.active)"
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
      users: [
        {
          id: 1,
          username: 'admin',
          firstname: 'admin',
          lastname: 'admin',
          active: true,
          level: 1,
        },
      ],
    };
  },
  created() {
    axios.get('/users')
      .then((response) => {
        console.log(response);
        this.users = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    toggleActive(id, status) {
      console.log( { active: !status } );
      axios.put(`/user/${id}`,
        {
          active: !status,
        })
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
};
</script>

<style scoped lang="less">
</style>
