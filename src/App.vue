<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app" class="fullscreen">
    <q-layout>
      <q-toolbar slot="header">
        <q-toolbar-title>
          Vue-remote Chat
        </q-toolbar-title>
      </q-toolbar>

      <q-card class="absolute-center" v-if="username === ''">
        <q-card-title class="bg-primary">
          Login
        </q-card-title>
        <q-card-main>
          <q-input
            class="full-width"
            type="text"
            stack-label="Username"
            v-model="user"
          ></q-input>
        </q-card-main>
        <q-card-actions class="bg-primary">
          <q-btn flat class="bg-positive" @click="setUserName">Login</q-btn>
        </q-card-actions>
      </q-card>

      <div class="row absolute full-width full-height" v-if="username !== ''">
        <q-scroll-area
          ref="scrollArea"
          class="col-sm-12 col-md-10"
          :thumb-style="{
            right: '4px',
            borderRadius: '5px',
            background: 'red',
            width: '10px',
            opacity: 1
          }"
          :delay="1500"
        >
          <q-list dense no-border>
            <q-item
              v-for="(data, index) in processedMessages"
              :key="index"
            >
              <q-item-main>
                <q-item-tile label style="display: flex">
                  {{ data.user }}: <div style="display: inline-block" v-html="data.messages.join('<br/>')"></div>
                </q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-scroll-area>
        <q-list dense class="col-md-2 desktop-only no-margin">
          <q-list-header>
            Users
          </q-list-header>
          <q-item
            v-for="user in users"
            :key="user"
          >
            <q-item-main>
              <q-item-tile label>
                {{ user }}
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </div>

      <q-toolbar class="bg-white" slot="footer" v-if="username !== ''">
        <q-input
          class="col-12"
          type="text"
          v-model="message"
          stack-label="Message"
          @keydown.13="sendMessage"

          :after="[{
            icon: 'mail',
            handler: sendMessage
          }]"
        ></q-input>
      </q-toolbar>
    </q-layout>
  </div>
</template>

<script>
  import {
    QBtn, QCard, QCardTitle, QCardSeparator, QCardMain, QCardActions, QField, QInput,
    QItem, QItemMain, QItemTile, QLayout, QList, QListHeader, QModal, QModalLayout,
    QScrollArea, QToolbar, QToolbarTitle
  } from 'quasar'

  export default {
    components: {
      QBtn,
      QCard,
      QCardTitle,
      QCardSeparator,
      QCardMain,
      QCardActions,
      QField,
      QInput,
      QItem,
      QItemMain,
      QItemTile,
      QLayout,
      QList,
      QListHeader,
      QModal,
      QModalLayout,
      QScrollArea,
      QToolbar,
      QToolbarTitle
    },
    computed: {
      processedMessages () {
        let messageArray = []
        this.messages.forEach(
          (message) => {
            if (messageArray.length === 0 || messageArray[messageArray.length - 1].user !== message.user) {
              messageArray.push({user: message.user, messages: []})
            }

            messageArray[messageArray.length - 1].messages.push(message.message)
          }
        )

        return messageArray
      }
    },
    data () {
      return {
        message: '',
        messages: [],
        user: '',
        username: '',
        users: []
      }
    },
    remote: {
      setUsers (data) {
        this.users = data.users
      },
      userSet (data) {
        this.username = data.username
      },
      messageSend (data) {
        this.messages.push(data)
        this.$nextTick(
          () => {
            this.$refs.scrollArea.setScrollPosition(this.$refs.scrollArea.scrollHeight + 1000)
          }
        )
      }
    },
    methods: {
      sendMessage () {
        if (this.message) {
          this.$remote.$emit('send-message', {username: this.username, message: this.message})
          this.message = ''
        }
      },
      setUserName () {
        this.$remote.$emit('set-user', {username: this.user})
      }
    },
    mounted () {
    }
  }
</script>

<style lang="stylus">
</style>
