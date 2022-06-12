<template>
  <router-view>
    <div class="GoodsList">
        <ware-item v-for="atom in goods" :key="atom.id" :atom="atom"></ware-item>
    </div>
    <div>
        <a class="JumptoShoppingCart" @click="goToShoppingCart">
        <font-awesome-icon icon="cart-shopping" />
            我的购物车
        </a>
    </div>
  </router-view>
</template>

<script>
import axios from 'axios';
import { useRouter } from "vue-router";
import WareItem from "../components/WareItem.vue"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

library.add(faShoppingCart)

export default {
  name: 'App',
  components: {
    WareItem,
  },
  mounted() {
    axios.get('/api/goods/list')
      .then((response) => {
          this.goods.push(...response.data);
        })
    .catch(function (error) {
        console.log(error);
    });
  },
  data() {
      return {
          goods: []
      }
  },
  setup() {
    const router = useRouter();
    const goToShoppingCart = () => {
      router.push({
        name: "ShoppingCart",
      });
    };
    return {
      goToShoppingCart,
    };
  }
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
