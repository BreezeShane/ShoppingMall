<template>
    <va-list-item>
        <va-card  color="primary" gradient>
            <va-card-title>订单</va-card-title>
            <va-card-content>
                <label>购买时间：</label>
                <div class="atomOrderTime">
                    <span :id="atom.id + '-date'">{{ atom.orderTime }}</span><br>
                </div>
            </va-card-content>

            <va-card-content>
                <label>已购商品：</label>
                <div :id="atom.id + '-warename'">
                    <p class="orderWareName" v-for="details in atom.orderDetail" :key="details.OrderDetailid">
                        {{ details.goodsName }}&#8195;
                        <label>购买数量：</label><span>{{ details.nums }}</span>
                    </p>
                </div>
            </va-card-content>
        </va-card>
    </va-list-item>
</template>



<script>
// import $ from 'jquery'
// import { library } from '@fortawesome/fontawesome-svg-core'
// import { faCartPlus } from '@fortawesome/free-solid-svg-icons'
// import axios from 'axios'

// library.add(faCartPlus)

export default {
    name: "OrderItem",
    props: ['atom'],
}
</script>
<style lang="stylus">
.va-card
    width: 50%
    .va-card__title
        font-size: medium

.atomOrderTime
.orderWareName 
    text-align: right

label
    font-weight: bolder
    font-size: large
</style>