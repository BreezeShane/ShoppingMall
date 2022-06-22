<template>
  <router-view>
    <div class="GoodsList">
        <ware-item v-for="atom in goods" :key="atom.id" :atom="atom"></ware-item>
    </div>
    <div>
        <va-button size="large" text-color="#FFFFFF" class="mr-4 JumptoShoppingCart" @click="goToShoppingCart">
        <font-awesome-icon icon="cart-shopping" />
            我的购物车
        </va-button>
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
  name: 'MainPane',
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
      if (sessionStorage.getItem("userID")){
        router.push({
          name: "ShoppingCart",
        });
      } else {
        alert("请先登录！")
      }
    };
    return {
      goToShoppingCart,
    };
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
  top: 10%
  left: 5%
  width: 90%
  height: 60%
  overflow: auto

.JumptoShoppingCart
  height: 10%
  text-decoration-line: none
  position absolute
  top: 75%
  left: 40%
  width: 20%
  text-align: center
  font-size: 50px
</style>
