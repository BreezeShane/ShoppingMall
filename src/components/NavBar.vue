<template>
  <div class="navbar">
    <span class="headTitle">
      <font-awesome-icon icon="shop" />
      简易购物商城
    </span>
    <div class="actions">
      <div class="nav-item">
        <a class="user" href="/user/login">
          <font-awesome-icon icon="jet-fighter-up" />
          登录
        </a>
      </div>
      <div class="nav-item">
        <a class="user" href="/user/register">
          <font-awesome-icon icon="id-card" />
          注册
        </a>
      </div>
    </div>
  </div>
</template>

<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShop,faJetFighterUp,faIdCard } from '@fortawesome/free-solid-svg-icons'

library.add(faShop,faJetFighterUp, faIdCard);

export default {
  name: 'NavBar',
  props: {
    msg: String
  },
}
</script>

<style lang="stylus">
bgcolor-blur = #f2fdff
card-shadow-color = grey
text-color = #41555d

.navbar
  position fixed
  z-index 200
  top 0
  left 0
  right 0
  height 3.6rem
  padding 0.7rem 1.5rem
  background bgcolor-blur
  box-sizing border-box
  box-shadow 0 2px 8px card-shadow-color
  backdrop-filter saturate(200%) blur(20px)
  line-height: 2.2rem
  transition transform 0.3s ease-in-out

  a, span, img
  display inline-block

  @media (max-width $MQMobile)
    height $navbarMobileHeight
    padding $navbarMobileVerticalPadding $navbarMobileHorizontalPadding
    padding-left: $navbarMobileHorizontalPadding + 2.4rem
    line-height: $navbarMobileHeight - $navbarMobileVerticalPadding - $navbarMobileVerticalPadding

.nav-item
  padding: 0.1rem
  margin-right: 0.1rem

.headTitle
    font-weight: bolder
    font-size 2.0rem
    color text-color
    position relative

    @media (max-width $MQMobile)
      width calc(100vw - 9.4rem)
      overflow hidden
      white-space nowrap
      text-overflow ellipsis

.actions
  position absolute
  top 0.7rem
  right 1.5rem
  display flex
  box-sizing border-box
  padding-left 1.5rem
  font-size 0.9rem
  white-space nowrap
  text-align: right;

  @media (max-width $MQMobile)
    padding-left 0
    top $navbarMobileVerticalPadding
    right $navbarMobileHorizontalPadding

  .user
    text-decoration-line: none
    font-size: larger
    color: #177cb0
</style>
