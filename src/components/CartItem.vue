<template>
    <div class="CartAtom" :id="atom.cardid">
        <div class="checkboxes">
            <input 
                class="cartAtomCheckbox atomToDel"
                type="checkbox"
                :value="atom.cardid"
                @change="
                    let toDel = false;
                    $emit('pushIntoList', atom.cardid, toDel);
                    if (toDel){
                        toDel = false;
                    } else {
                        toDel = true;
                    }
                "
                style="display: none;"
            >
            <input 
                class="cartAtomCheckbox atomToBuy"
                type="checkbox"
                :value="atom.cardid"
                @change="
                    let toBuy = false;
                    $emit('listIntoBuy', atom.cardid, toBuy);
                    if (toBuy){
                        toBuy = false;
                    } else {
                        toBuy = true;
                    }
                "
            >
        </div>
        <div class="itemProfile">
            <img class="atomImg" :src="'/api' + atom.thumbnail" />
            <p class="atomName" :wareid="atom.goodsId">{{ atom.name }}</p>
            <p class="atomPrice" :price="atom.price">￥{{ atom.price }}</p>
        </div>
        <div class="CartAtomCountSeries">
            <va-button size="small" outline :rounded="false" class="MinusCount" @click="goToMinusCount($event)">-</va-button>
            <input type="text" class="CartAtomCount" :value="atom.num">
            <va-button size="small" outline :rounded="false" class="PlusCount" @click="goToPlusCount($event)">+</va-button>
        </div>
        <div class="removeFromCartBtnContainer">
            <va-button flat :rounded="false" class="removeFromCart" @click="removeFromMyCart($event)">
                <font-awesome-icon icon="cart-plus" />
                移出购物车
            </va-button>
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
    name: "CartItem",
    props: ['atom'],
    methods: {

        removeFromMyCart(e){
            let userID = sessionStorage.getItem("userID");
            let itemID = $(e.currentTarget).parent().parent().attr("id");
            $(e.currentTarget).parent().parent().remove();
            console.log("deleted: ", $(e.currentTarget).parent().parent());
            axios.get("/api/cart/deleteById", {
                params: {
                    "userId": userID,
                    "cartId": itemID, 
                }
            }).then((res) => {
                return res.data;
            })
        },
        goToMinusCount(e){
            let toSetNum = parseInt($(e.currentTarget).next().val()) - 1;
            if (toSetNum == 0) toSetNum = 1;
            $(e.currentTarget).next().val(toSetNum);
        },
        goToPlusCount(e){
            let toSetNum = parseInt($(e.currentTarget).prev().val()) + 1;
            $(e.currentTarget).prev().val(toSetNum);
        }
    },
    emits: [
        'pushIntoList',
        'listIntoBuy',
    ],
}
</script>
<style lang="stylus">
.checkboxes
    position absolute
    z-index 100

.CartAtom
    position relative
    width: 300px
    height: 400px
    border: 2px
    border-style: solid
    border-color: grey

    .itemProfile
    .CartAtomCountSeries
    .removeFromCartBtnContainer
        position relative

.atomImg
    width: 100%

.atomName
    text-align: center
    font-size: larger
    font-weight: bolder

.atomPrice
    color: red
    text-align: right
    font-size: larger
    font-weight: bolder
    position: absolute
    top: 105%
    right: 5px

.CartAtomCountSeries
.removeFromCartBtnContainer
    position absolute

.CartAtomCountSeries
    top: 4%
    left: 10%

.removeFromCartBtnContainer
    top: 5%
    .va-button
        position: absolute
        right: 0

.MinusCount
.PlusCount
    width: 1%
    font-size: larger
    font-weight: bolder

.CartAtomCount
    text-align: center
    width: 20%
</style>