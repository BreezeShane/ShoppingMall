<template>
    <router-view>
        <div class="Login">
            <div id="userName">
                <label>用户名：</label><input id="inputUserName" type="text">
                <span class="dumpedError" id="userNameError" style="display: none;">请输入用户名！</span>
            </div>
            <div id="userPassword">
                <label>密码：</label><input id="inputUserPassword" type="password">
                <span class="dumpedError" id="userPasswordError" style="display: none;">请输入密码！</span>
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
        $("#userNameError").css("display", "none");
        $("#userPasswordError").css("display", "none");
        let userName = $("#inputUserName").val()
        let userPassword = $("#inputUserPassword").val()

        if (userName == ''){
            $("#userNameError").css("display", "block");
        }
        if (userPassword == ''){
            $("#userPasswordError").css("display", "block");
        }
        if (userName && userPassword){
            axios.get('/api/user/login', {
                params: {
                "name": userName,
                "password": userPassword
                }
            }).then(res => {
                return res.data
            });
        }
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
.dumpedError
    position absolute
    height: 36px
    left: 80.3%
    line-height: 2.5rem
    font-size: large
    color: red
</style>