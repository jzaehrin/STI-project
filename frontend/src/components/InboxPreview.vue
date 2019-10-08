<template>
  <div class="inbox">
    <v-card
      height="100vh"
    >
      <v-card-title>Inbox</v-card-title>
      <v-card-text class="inbox-box">
        <v-list two-line>
          <v-list-item-group
            multiple
            active-class="grey--text"
          >
            <template v-for="(item, index) in items">
              <v-list-item
                :key="item.id"
                @click="onClick(item)"
              >
                <template v-slot:default="{ active, toggle }">
                  <v-list-item-content>
                    <v-list-item-title v-text="item.from"></v-list-item-title>
                    <v-list-item-subtitle class="text--primary" v-text="item.subject"></v-list-item-subtitle>
                  </v-list-item-content>

                  <v-list-item-action>
                    <v-icon
                      v-if="!item.read"
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
    onOpen: Function,
  },
  data() {
    return {
      items : [
      ],
    };
  },
  created() {
    axios.get(`/user/${this.userId}/inbox`)
      .then((response) => {
        console.log(response);
        this.items = response.data;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  methods: {
    onClick(message) {
      if (message.read !== 0) axios.put(`/message/${message.id}/read`);

      if (this.onOpen !== undefined) this.onOpen(message);
    },
  },
};
</script>

<style scoped lang="less">
#inbox {
  height: 100%;
}
</style>
