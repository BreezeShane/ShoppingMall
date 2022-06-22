<template>
    <router-view>
        <div class="Register">
            <div id="userName">
                <va-input
                    id="inputUserName"
                    class="mb-4"
                    v-model="userName"
                    label="用户名"
                    placeholder="用户名"
                />
                <span class="dumpedError" id="userNameError" style="display: none;">请输入用户名！</span>
            </div>
            <div id="userPassword">
                <va-input
                    id="inputUserPassword"
                    class="mb-4"
                    v-model="userPassword"
                    label="密码"
                    placeholder="密码"
                    type="password"
                />
                <span class="dumpedError" id="userPasswordError" style="display: none;">请输入密码！</span>
            </div>
            <div id="userDuplicatedPassword">
                <va-input
                    id="inputDuplicatedUserPassword"
                    class="mb-4"
                    v-model="userDuplicatedPassword"
                    label="重复密码"
                    placeholder="重复密码"
                    type="password"
                />
                <span class="dumpedError" id="userDuplicatedPasswordError" style="display: none;">请输入密码！</span>
            </div>
            <va-alert
                id="registerError"
                color="danger"
                center
                style="display: none;"
                :description="'两次输入的密码不一致！'"
            ></va-alert>
            <div id="registerSubmit">
                <va-button gradient size="large" @click="toRegister">
                    <span>
                        注 册
                    </span>
                </va-button>
            </div>
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
    data() {
        return {
            userName: '',
            userPassword: '',
            userDuplicatedPassword: '',
        }
    },
    methods: {
        toRegister(){
            $("#userNameError").css("display", "none");
            $("#userPasswordError").css("display", "none");
            $("#userDuplicatedPasswordError").css("display", "none");
            $("#registerError").css("display", "none");

            if (this.userName == ''){
                $("#userNameError").css("display", "block");
            }
            if (this.userPassword == ''){
                $("#userPasswordError").css("display", "block");
            }
            if (this.userDuplicatedPassword == ''){
                $("#userDuplicatedPasswordError").css("display", "block");
            }
            if (this.userPassword == this.userDuplicatedPassword){
                if (this.userName && this.userPassword){
                    axios.get('/api/user/register', {
                        params: {
                            "name": this.userName,
                            "password": this.userPassword
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
        .va-input
            left: 25%
            width: 50%
    #userPassword
        top: 35%
        .va-input
            left: 25%
            width: 50%
    #userDuplicatedPassword
        top: 50%
        .va-input
            left: 25%
            width: 50%
    #registerSubmit
        position absolute
        top: 65%
        left: 25%
        .va-button
            width: 50%
            height: 40px
            font-size: 24px
            font-weight: bolder
            color: #f2fdff
            .va-button__content
                span
                    margin: 0 auto
.dumpedError
    position absolute
    height: 36px
    left: 76%
    line-height: 2.5rem
    font-size: large
    color: red
#registerError
    height: 10%
    width: 50%
    left: 25%
    top: 5%
    font-size: larger
    font-weight: bolder
</style>