<template>
    <router-view>
        <div class="Login">
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
            <div id="loginSubmit">
                <va-button gradient size="large" @click="toSignIn">
                    <span>
                        登 录
                    </span>
                </va-button>
            </div>
        </div>
    </router-view>
</template>
<script>
import $ from 'jquery'
import axios from 'axios'
import { useRouter } from "vue-router";
import bus from 'vue3-eventbus'

export default {
  name: 'SignIn',
  props: {
    msg: String
  },
  data() {
      return {
          userName: '',
          userPassword: ''
      }
  },
  setup(){
    const router = useRouter();
    const goToHome = () => {
      router.push({name: "Main",});
    };
    return {
        goToHome,
    }
  },
  methods: {
      toSignIn(){
        $("#userNameError").css("display", "none");
        $("#userPasswordError").css("display", "none");

        if (this.userName == '') $("#userNameError").css("display", "block");
        if (this.userPassword == '')
            $("#userPasswordError").css("display", "block");
        if (this.userName && this.userPassword){
            axios.get('/api/user/login', {
                params: {
                    "name": this.userName,
                    "password": this.userPassword
                }
            }).then(res => {
                if (res.data){
                    let loc = window.localStorage;
                    let ses = window.sessionStorage;
                    loc.setItem("userID", res.data);
                    ses.setItem("userID", res.data);
                    alert("登录成功！");
                    this.goToHome();
                    bus.emit("RefreshNavBar",{});
                    return res.data;
                } else {
                    alert("登录失败！账号或密码输入有误，也可能是账号不存在！");
                }
            });
        }
      },
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
        .va-input
            left: 25%
            width: 50%
    #userPassword
        top: 45%
        .va-input
            left: 25%
            width: 50%
    #loginSubmit
        position absolute
        top: 60%
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
</style>