<template>
    <router-view>
        <div class="Login">
            <div id="userName">
                <label>用户名：</label><input id="inputUserName" type="text">
            </div>
            <div id="userPassword">
                <label>密码：</label><input id="inputUserPassword" type="password">
            </div>
            <input id="loginSubmit" type="button" @click="toSignIn" value="登     录">
        </div>
    </router-view>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'

export default {
  name: 'SignIn',
  props: {
    msg: String
  },
  methods: {
      toSignIn(){
          let userName = $("#inputUserName").val()
          let userPassword = $("#inputUserPassword").val()
          console.log(userName, userPassword)
          axios.get('/api/user/login', {
            params: {
              "name": userName,
              "password": userPassword
            }
          }).then(res => {
              console.log(res);
          })
      }
  },
}
</script>
<style lang="stylus">
.Login
    position absolute
    width: 50%
    height: 50%
    left: 25%
    top: 25%
    border: 2px
    border-style: solid
    border-color: grey
    border-radius: 100px 10px 100px 10px
    box-shadow: 5px 5px 10px grey
    div
        width: 100%
        position absolute
        label
            position absolute
            left: 20%
            width: 7%
            height: 36px
            text-align: right
            line-height: 2rem
            font-size: large
            font-weight: bolder
        input
            position absolute
            left: 27%
            width: 52%
            height: 30px
    #userName
        top: 30%
    #userPassword
        top: 45%
    #loginSubmit
        position absolute
        top: 60%
        left: 20%
        width: 60%
        height: 40px
        font-size: 24px
        font-weight: bolder
        border-radius: 10px
        color: #f2fdff
        background-color: #177cb0
</style>