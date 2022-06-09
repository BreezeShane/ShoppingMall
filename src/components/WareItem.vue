<template>
    <div class="WareItem" :id="atom.id">
        <img class="itemImg" :src="atom.pthumbnail" />
        <p class="itemName">{{ atom.name }}</p>
        <p class="itemPrice">￥{{ atom.price1 }}</p>
    </div>
</template>
<script>
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
</style>