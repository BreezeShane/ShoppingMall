<template>
    <li>
        <label>购买时间：</label><span :id="atom.id + '-date'">{{ atom.orderTime }}</span><br>
        <label>商品名称：</label><div :id="atom.id + '-warename'">
            <p class="orderWareName" v-for="details in atom.orderDetail" :key="details.OrderDetailid">
                {{ details.goodsName }}
                <span>购买数量：{{ details.nums }}</span>
            </p>
        </div>
    </li>
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

</style>