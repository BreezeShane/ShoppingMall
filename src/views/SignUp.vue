<template>
    <router-view>
        <div class="Register">
            <div id="userName">
                <label>用户名：</label><input id="inputUserName" type="text">
                <span class="dumpedError" id="userNameError" style="display: none;">请输入用户名！</span>
            </div>
            <div id="userPassword">
                <label>密码：</label><input id="inputUserPassword" type="password">
                <span class="dumpedError" id="userPasswordError" style="display: none;">请输入密码！</span>
            </div>
            <div id="userDuplicatedPassword">
                <label>重复密码：</label><input id="inputDuplicatedUserPassword" type="password">
                <span class="dumpedError" id="userDuplicatedPasswordError" style="display: none;">请输入密码！</span>
            </div>
            <span class="dumpedError" id="registerError" style="display: none;">两次输入的密码不一致！</span>
            <input id="loginSubmit" type="button" @click="toRegister" value="注     册">
        </div>
    </router-view>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'

export default {
    name: "SignUp",
    props: {
        msg: String
    },
    methods: {
        toRegister(){
            $("#userNameError").css("display", "none");
            $("#userPasswordError").css("display", "none");
            $("#userDuplicatedPasswordError").css("display", "none");
            $("#registerError").css("display", "none");

            let userName = $("#inputUserName").val()
            let userPassword = $("#inputUserPassword").val()
            let userDuplicatedPassword = $("#inputDuplicatedUserPassword").val()
            9
            if (userName == ''){
                $("#userNameError").css("display", "block");
            }
            if (userPassword == ''){
                $("#userPasswordError").css("display", "block");
            }
            if (userDuplicatedPassword == ''){
                $("#userDuplicatedPasswordError").css("display", "block");
            }
            if (userPassword == userDuplicatedPassword){
                if (userName && userPassword){
                    axios.get('/api/user/register', {
                        params: {
                            "name": userName,
                            "password": userPassword
                        }
                    }).then(res => {
                        alert(res.data);
                    });
                }
            } else {
                $("#registerError").css("display", "block");
            }
        }
    },
}
</script>
<style lang="stylus">
.Register
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
            left: 18%
            width: 9%
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
        top: 20%
    #userPassword
        top: 35%
    #userDuplicatedPassword
        top: 50%
    #loginSubmit
        position absolute
        top: 75%
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
#registerError
    left: 41%
    top: 60%
    font-size: larger
    font-weight: bolder
</style>