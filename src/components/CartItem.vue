<template>
    <div class="CartAtom" :id="atom.cardid">
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
        <div>
            <img class="atomImg" :src="'/api' + atom.thumbnail" />
            <p class="atomName" :wareid="atom.goodsId">{{ atom.name }}</p>
            <p class="atomPrice" :price="atom.price">￥{{ atom.price }}</p>
        </div>
        <div class="CartAtomCountSeries">
            <input type="button" class="MinusCount" value="-" @click="goToMinusCount($event)">
            <input type="text" class="CartAtomCount" :value="atom.num">
            <input type="button" class="PlusCount" value="+" @click="goToPlusCount($event)">
        </div>
        <div class="removeFromCartBtnContainer">
            <a type="button" class="removeFromCart" @click="removeFromMyCart($event)">
                <font-awesome-icon icon="cart-plus" />
                移出购物车
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
    name: "CartItem",
    props: ['atom'],
    // data() {
    //     return {
    //         checkedCartID: []
    //     }
    // },
    methods: {
        setValue(e, { emit }){
            this.checkedCartID = $(e.currentTarget).val();
            emit('pushIntoList', this.checkedCartID);
            console.log("setValue: ", this.checkedCartID);
        },
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
    // setup (props, { emit }) {
    //     console.log("props: ", props);
    //     console.log("props.checkedCartID: ", props.checkedCartID);
    //     if (props.checkedCartID){
    //         emit('pushIntoList', this.checkedCartID);
    //     }
    // }
}
</script>
<style lang="stylus">
.CartAtom
    width: 300px
    height: 400px
    border: 2px
    border-style: solid
    border-color: grey
    div
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
    top: 93.75%
    right: 5px
</style>