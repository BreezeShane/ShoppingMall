<template>
    <div class="WareItem" :id="atom.id">
        <div>
            <img class="itemImg" :src="atom.pthumbnail" />
            <p class="itemName">{{ atom.name }}</p>
            <p class="itemPrice" :price="atom.price1">￥{{ atom.price1 }}</p>
        </div>
        <div class="addToCartBtnContainer">
            <a type="button" class="addToCart" @click="addToMyCart($event)">
                <font-awesome-icon icon="cart-plus" />
                加入购物车
            </a>
        </div>
    </div>
</template>
<script>
import $ from 'jquery'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
import axios from 'axios'

library.add(faCartPlus)

export default {
    name: "WareItem",
    props: ['atom'],
    methods: {
        addToMyCart(e){
            let userID = sessionStorage.getItem("userID");
            let itemID = $(e.currentTarget).parent().parent().attr("id");
            let count = 1;
            let price = $(e.currentTarget).parent().prev().children(".itemPrice").attr("price");
            axios.get("/api/cart/add", {
                params: {
                    "userId": userID,
                    "goodsId": itemID, 
                    "num": count, 
                    "price": price
                }
            }).then((res) => {
                console.log(res.data);
            })
        }
    },
}
</script>
<style lang="stylus">
.WareItem
    width: 300px
    height: 400px
    border: 2px
    border-style: solid
    border-color: grey
    div
        position relative

.itemImg
    width: 100%

.itemName
    text-align: center
    font-size: larger
    font-weight: bolder

.itemPrice
    color: red
    text-align: right
    font-size: larger
    font-weight: bolder
    position: absolute
    top: 93.75%
    right: 5px

.addToCartBtnContainer
    position relative
    .addToCart
        position absolute
        left: 10px
        bottom: -25px
</style>