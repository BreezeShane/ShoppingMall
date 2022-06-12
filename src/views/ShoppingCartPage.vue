<template>
    <router-view>
        <div>
            <input type="button" id="MultipleOperation" value="批量管理">
        </div>
        <div class="ShoppingCart">
            <cart-item v-for="atom in goodsOfCart" :key="atom" :atom="atom"></cart-item>
        </div>
        <div>
            <input type="button" id="submitToDeleteAll" value="批量删除">
        </div>
    </router-view>
</template>
<script>
import axios from 'axios'
import CartItem from '../components/CartItem.vue'
export default {
    name: "ShoppingCartPage",
    components: {
        CartItem,
    },
    props: {
        msg: String
    },
    data() {
        return {
            goodsOfCart: [],
            checkedCartAtoms: []
        }
    },
    mounted() {
        axios.get('/api/cart/listByUser', {
            params: {
                "userId": sessionStorage.getItem("userID")
            }
        }).then((response) => {
            this.goodsOfCart.push(...response.data);
        }).catch(function (error) {
            console.log(error);
        });
    },
    methods: {
        toCheckSomeItems(){

        },
        submitToDeleteAll(){

        },
    },
}
</script>
<style lang="stylus">
#app
  background-color: #e3f9fd

.ShoppingCart
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