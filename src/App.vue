<template>
  <nav-bar></nav-bar>
  <router-view />
</template>

<script>
import NavBar from './components/NavBar.vue'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

library.add(faShoppingCart)

export default {
  name: 'App',
  components: {
    NavBar,
  },
}
</script>

<style lang="stylus">
#app
  background-color: #e3f9fd

.GoodsList
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-style: solid
  border-color: grey
  border: 1px
  position: fixed
  top: 7%
  left: 5%
  width: 90%
  height: 60%
  overflow: auto

.JumptoShoppingCart
  text-decoration-line: none
  position absolute
  top: 70%
  width: 100%
  text-align: center
  font-size: 50px
</style>
