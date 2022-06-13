<template>
    <router-view>
        <div id="MultipleOperationContainer">
            <input type="button" id="MultipleOperation" value="批量管理" @click="toCheckSomeItems($event)">
        </div>
        <div class="ShoppingCart">
            <cart-item 
                v-for="atom in goodsOfCart" 
                :key="atom" 
                :atom="atom"
                @pushIntoList="pushIntoList"
            ></cart-item>
        </div>
        <div id="submitToDeleteAllContainer">
            <input type="button" id="selectAllCheckbox" value="全选" @click="selectAll($event)" style="display: none;">
            <input type="button" id="submitToDeleteAll" value="批量删除" @click="submitToDeleteAll">
        </div>
        <div>
            <span id="totalValue">￥0.00</span>
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
            allCheckedCartAtoms: []
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
        toCheckSomeItems(e){
            if (this.multipleManageCount){
                $(".cartAtomCheckbox").css("display", "none");
                $("#selectAllCheckbox").css("display", "none");
                $(e.currentTarget).attr("value", "批量管理");
                this.multipleManageCount = 0;
            } else {
                $(".cartAtomCheckbox").css("display", "block");
                $("#selectAllCheckbox").css("display", "block");
                $(e.currentTarget).attr("value", "取消");
                this.multipleManageCount = 1;
            }
        },
        submitToDeleteAll(){
            let userID = sessionStorage.getItem("userID");
            let itemID;
            for (let indexItemID in this.allCheckedCartAtoms){
                itemID = this.allCheckedCartAtoms[indexItemID];
                $('#' + this.allCheckedCartAtoms[indexItemID]).remove();
                console.log(userID, itemID, "removed! ");
                // axios.get("/api/cart/deleteById", {
                //     params: {
                //         "userId": userID,
                //         "cartId": itemID, 
                //     }
                // }).then((res) => {
                //     return res.data;
                // })
            }
        },
        selectAll(e){
            $(".cartAtomCheckbox").click();
            if (this.selectAllCount){
                this.allCheckedCartAtoms = [];
                $(e.currentTarget).attr("value", "全选");
                this.selectAllCount = 0;
            } else {
                $(e.currentTarget).attr("value", "全不选");
                this.selectAllCount = 1;
            }
        }
    },
    setup() {
        let props = getCurrentInstance();
        const pushIntoList = (CheckedAtom, toDel) => {
            if (toDel){
                props.data.allCheckedCartAtoms.splice(
                    props.data.allCheckedCartAtoms.indexOf(CheckedAtom), 1
                );
                console.log("pushIntoList Delete: ", CheckedAtom)
            } else {
                props.data.allCheckedCartAtoms.push(CheckedAtom);
                console.log("pushIntoList Insert: ", CheckedAtom)
            }
        }
        return {
            pushIntoList,
        }
    }
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
  top: 20%
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
#MultipleOperationContainer
    position absolute
    top: 15%
    left: 91.5%
#submitToDeleteAllContainer
    position absolute
    top: 80%
    left: 89%
</style>