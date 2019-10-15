<template>
  <div class="inbox">
    <v-card
      height="100vh"
    >
      <v-card-title>{{ (outbox) ? 'Outbox' : 'Inbox' }}</v-card-title>
      <v-card-text class="inbox-box">
        <v-list two-line>
          <v-list-item-group
            active-class="grey--text"
          >
            <template v-for="(item, index) in items">
              <v-list-item
                :key="item.id"
                @click="onClick(item)"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-subtitle v-text="`From: ${item.fromName}`"></v-list-item-subtitle>
                    <v-list-item-title class="text--primary" v-text="item.subject"></v-list-item-title>
                  </v-list-item-content>

                  <v-list-item-action
                    v-if="!outbox"
                  >
                    <v-list-item-action-text v-text="humanDate(item.timestamp)"></v-list-item-action-text>
                    <div>
                      <v-btn
                        icon
                        @click="replyMessage($event, item)"
                      >
                        <v-icon
                          color="grey"
                        >
                          mdi-reply
                        </v-icon>
                      </v-btn>

                      <v-btn
                        icon
                        @click="deleteMessage(item)"
                      >
                        <v-icon
                          color="grey"
                        >
                          mdi-delete
                        </v-icon>
                      </v-btn>

                      <v-icon
                        v-if="!item.read"
                        color="green"
                        style="padding: 5px"
                      >
                        mdi-email
                      </v-icon>

                      <v-icon
                        v-else
                        color="grey lighten-1"
                        style="padding: 5px"
                      >
                        mdi-email-check
                      </v-icon>
                    </div>
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
import moment from 'moment';

export default {
  name: 'InboxPreview',
  props: {
    userId: Number,
    onOpen: {
      type: Function,
      default: () => false,
    },
    onReply: {
      type: Function,
      default: () => false,
    },
    outbox: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      items: [
      ],
    };
  },
  created() {
    axios.get(`/user/${this.userId}/${(this.outbox) ? 'outbox' : 'inbox'}`)
      .then((response) => {
        this.items = response.data;
      })
      .catch((error) => {
        console.error(error);

        if (error.response.status === 401) {
          this.$router.replace('/login');
        }
      });
  },
  methods: {
    humanDate(timestamp) {
      const today = moment().startOf('day');
      const week = moment().startOf('week');
      const year = moment().startOf('year');
      const date = moment.unix(timestamp);

      if (date >= today) {
        return date.fromNow();
      } else if (date >= week) {
        return date.format('llll');
      } else if (date >= year) {
        return date.format('LL');
      }

      return date.fromNow();
    },
    deleteMessage(message) {
      axios.delete(`/message/${message.id}`)
        .then(() => {
          this.items.splice(this.items.indexOf(message), 1);
        })
        .catch((error) => {
          console.error(error);

          if (error.response.status === 401) {
            this.$router.replace('/login');
          }
        });
    },
    onClick(message) {
      if (!this.outbox && message.read === 0) {
        axios.put(`/message/${message.id}/read`);
        // eslint-disable-next-line no-param-reassign
        message.read = true;
      }

      this.onOpen(message);
    },
    replyMessage(event, message) {
      event.stopPropagation();
      this.onReply(message);
    },
  },
};
</script>

<style scoped lang="less">
#inbox {
  height: 100%;
}
</style>
