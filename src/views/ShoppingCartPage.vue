<template>
    <router-view>
        <div id="MultipleOperationContainer">
            <va-button color="warning" :rounded="false" id="MultipleOperation" @click="toCheckSomeItems($event)">批量管理</va-button>
        </div>
        <div class="ShoppingCart">
            <cart-item 
                v-for="atom in goodsOfCart" 
                :key="atom" 
                :atom="atom"
                @pushIntoList="pushIntoList"
                @listIntoBuy="listIntoBuy"
            ></cart-item>
        </div>
        <div id="submitToDeleteAllContainer">
            <va-button id="selectAllCheckbox" :rounded="false" @click="selectAll($event)">全选</va-button>
            <va-button color="danger" :rounded="false" id="submitToDeleteAll" @click="submitToDeleteAll">确认删除</va-button>
        </div>
        <div id="cartFooter">
            <span id="totalValue" total="0.00">￥0.00</span>
            <va-button size="large" gradient :rounded="false" id="submitToBuy" @click="submitToBuy">购买</va-button>
        </div>
    </router-view>
</template>
<script>
import axios from 'axios'
import CartItem from '../components/CartItem.vue'
import $ from 'jquery'
import { getCurrentInstance } from '@vue/runtime-core'
export default {
    name: "ShoppingCartPage",
    components: {
        CartItem,
    },
    props: {
        msg: String
    },
    emits: [
        'pushIntoList'
    ],
    data() {
        return {
            multipleManageCount: 0,
            selectAllCount: 0,
            goodsOfCart: [],
            allCheckedCartAtoms: [],
        }
    },
    mounted() {
        $("#selectAllCheckbox").css("display", "none");
        $("#submitToDeleteAll").css("display", "none");
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
        toCheckSomeItems(e){
            if (this.multipleManageCount){
                $(".atomToDel").css("display", "none");
                $(".atomToBuy").css("display", "block");
                $("#selectAllCheckbox").css("display", "none");
                $("#submitToDeleteAll").css("display", "none");
                $(e.currentTarget).html("批量管理");
                this.multipleManageCount = 0;
            } else {
                $(".atomToDel").css("display", "block");
                $(".atomToBuy").css("display", "none");
                $("#selectAllCheckbox").css("display", "block");
                $("#submitToDeleteAll").css("display", "block");
                $(e.currentTarget).html("取消");
                this.multipleManageCount = 1;
            }
        },
        submitToDeleteAll(){
            let userID = sessionStorage.getItem("userID");
            let itemID;
            for (let indexItemID in this.allCheckedCartAtoms){
                itemID = this.allCheckedCartAtoms[indexItemID];
                $('#' + itemID).remove();
                axios.get("/api/cart/deleteById", {
                    params: {
                        "userId": userID,
                        "cartId": itemID, 
                    }
                }).then((res) => {
                    return res.data;
                })
            }
            $("#totalValue").html("￥0.00");
            $("#totalValue").attr("total", "0.00");
            this.allCheckedCartAtoms = [];
        },
        selectAll(e){
            $(".cartAtomCheckbox").click();
            if (this.selectAllCount){
                this.allCheckedCartAtoms = [];
                $(e.currentTarget).html("全选");
                this.selectAllCount = 0;
            } else {
                $(e.currentTarget).html("全不选");
                this.selectAllCount = 1;
            }
        },
        submitToBuy(){
            let userID = sessionStorage.getItem("userID");
            axios.get("/api/order/addCastOrder", {
                params: {
                    "userId": userID,
                        "cartList": this.allCheckedCartAtoms.join(','), 
                    }
                }).then((res) => {
                    return res.data;
            })
            let itemID;
            for (let indexItemID in this.allCheckedCartAtoms){
                itemID = this.allCheckedCartAtoms[indexItemID];
                $('#' + itemID).remove();
            }
            $("#totalValue").html("￥0.00");
            $("#totalValue").attr("total", "0.00");
            this.allCheckedCartAtoms = [];
            alert("购买成功！");
        }
    },
    setup() {
        let props = getCurrentInstance();
        const pushIntoList = (CheckedAtom, isChecked) => {
            if (isChecked){
                props.data.allCheckedCartAtoms.splice(
                    props.data.allCheckedCartAtoms.indexOf(CheckedAtom), 1
                );
            } else {
                props.data.allCheckedCartAtoms.push(CheckedAtom);
            }
        }
        const listIntoBuy = (CheckedAtom, isChecked) => {
            if (isChecked){
                props.data.allCheckedCartAtoms.splice(
                    props.data.allCheckedCartAtoms.indexOf(CheckedAtom), 1
                );
            } else {
                props.data.allCheckedCartAtoms.push(CheckedAtom);
            }
            let totalPrice = 0;
            for(let itemIndex in props.data.allCheckedCartAtoms){
                let itemID = props.data.allCheckedCartAtoms[itemIndex];
                let itemPrice = parseFloat($("#" + itemID).find(".atomPrice").attr("price"));
                let itemCount = parseInt($("#" + itemID).find(".CartAtomCount").val());
                totalPrice += itemPrice * itemCount;
            }
            let showTotalPrice = totalPrice.toFixed(2);
            $("#totalValue").html("￥" + showTotalPrice);
            $("#totalValue").attr("total", showTotalPrice);
        }
        return {
            pushIntoList,
            listIntoBuy
        }
    }
}
</script>
<style lang="stylus">
.ShoppingCart
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-style: solid
  border-color: grey
  border: 1px
  position: fixed
  top: 20%
  left: 5%
  width: 90%
  height: 60%
  overflow: auto

#MultipleOperationContainer
    position absolute
    top: 12%
    right: 5%

#submitToDeleteAllContainer
    position absolute
    top: 80%
    left: 89%

#totalValue
    position: absolute
    top: 15%
    right: 10.5%
    font-size: 45px
    font-weight: bold
    color: red

#submitToBuy
    position: absolute
    top: 15%
    right: 5%

#cartFooter
    position: absolute
    bottom: 0
    width: 100%
    height: 10%
    background-color: #f0f0f4
</style>