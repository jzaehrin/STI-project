<template>
  <div class="inbox">
    <v-card>
      <v-card-title>Inbox</v-card-title>
      <v-card-text class="inbox-box">
        <v-list two-line>
          <v-list-item-group
            v-model="selected"
            multiple
            active-class="grey--text"
          >
            <template v-for="(item, index) in items">
              <v-list-item
                :key="item.id"
                :href="`/message/${item.id}`"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.from"></v-list-item-title>
                    <v-list-item-subtitle class="text--primary" v-text="item.subject"></v-list-item-subtitle>
                    <v-list-item-subtitle v-text="item.message.substring(0, 100)"></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-icon
                      v-if="!read"
                      color="green"
                    >
                      mdi-email
                    </v-icon>

                    <v-icon
                      v-else
                      color="grey lighten-1"
                    >
                      mdi-email-check
                    </v-icon>
                  </v-list-item-action>
                </template>
              </v-list-item>

              <v-divider
                v-if="index + 1 < items.length"
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
  name: 'InboxPreview',
  props: {
    userId: Number,
  },
  data() {
    return {
      items : [
        {
          id: 1,
          timestamp: Math.floor(Date.now() / 1000),
          fromName: 'toto',
          toName: 'tata',
          subject: 'test 1',
          message: '',
          read: false,
        },
      ],
    };
  },
  created() {
    axios.get(`/user/${this.userId}/inbox`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};
</script>

<style scoped lang="less">
</style>
