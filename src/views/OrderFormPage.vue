<template>
    <router-view>
        <va-list id="orderContainer">
            <ul>
                <order-item v-for="atom in orderList" :key="atom.id" :id="atom.id" :atom="atom"></order-item>
            </ul>
        </va-list>
    </router-view>
</template>
<script>
import axios from 'axios'
import OrderItem from "../components/OrderItem.vue"

export default {
    components: {
        OrderItem,
    },
    data() {
        let userID = sessionStorage.getItem("userID");
        axios.get("/api/order/listByUser", {
            params: {
                "userId": userID,
            }
        }).then((res) => {
            this.orderList.push(...res.data);
            return res.data;
        })
        return {
            orderList: []
        }
    },
}
</script>
<style lang="stylus">
#orderContainer
    position absolute
    top 15%
    left 25%
    height: 70%
    overflow: auto
    overflow-x: hidden

.va-list
    width: 50%
    .va-list-item__inner
        width: 200%
</style>