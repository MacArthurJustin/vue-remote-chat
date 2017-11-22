# Vue-remote Chat Example

> A progressive web app example for using vue-remote and quasar

## Build Setup

``` bash
# install dependencies
$ npm install

# start websocket server to handle chat passthrough
$ node server.js

# serve with hot reload at localhost:8080
$ npm run dev
```

## Remote Test

If you are looking to test on a remote system you just need to run the server.js on your remote system and change main.js from

``` bash
Vue.use(VueRemote,
  {
    secure: false,
    host: 'localhost',
    port: 8081
  }
)
```

to reflect the target system. Finally run the dev on multiple systems or build and distribute.

## Usage

Navigate to `http://localhost:8080` type in a username and begin chatting.
There is not any form of username security as this is an example.