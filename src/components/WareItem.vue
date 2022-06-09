<template>
    <div class="WareItem" :id="atom.id">
        <div>
            <img class="itemImg" :src="atom.pthumbnail" />
            <p class="itemName">{{ atom.name }}</p>
            <p class="itemPrice">￥{{ atom.price1 }}</p>
        </div>
        <div class="addToCartBtnContainer">
            <a type="button" class="addToCart">
                <font-awesome-icon icon="cart-plus" />
                加入购物车
            </a>
        </div>
    </div>
</template>
<script>
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCartPlus } from '@fortawesome/free-solid-svg-icons'

library.add(faCartPlus)

export default {
    name: "WareItem",
    props: ['atom'],
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