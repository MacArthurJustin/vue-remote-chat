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
        <q-list dense class="col-sm-12 col-md-10 overflow-auto">
          <q-item
            v-for="message in messages"
            :key="message"
          >
            <q-item-main>
              <q-item-tile label>
                {{ message }}
              </q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
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
    QItem, QItemMain, QItemTile, QLayout, QList, QListHeader, QModal, QModalLayout, QToolbar, QToolbarTitle
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
      QToolbar,
      QToolbarTitle
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
        this.messages.unshift(data.message)
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
