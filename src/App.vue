<template>
  <nav-bar></nav-bar>
  <div class="GoodsList">
    <ware-item v-for="atom in goods" :key="atom.id" :atom="atom"></ware-item>
  </div>
</template>

<script>
import axios from 'axios';
import WareItem from "./components/WareItem.vue"
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
    WareItem,
  },
  methods: {
    pullData(){
        axios.get('/goods/list')
          .then((response) => {
              this.goods.push(...response.data);
            })
        .catch(function (error) {
            console.log(error);
        });
    },
  },
  mounted() {
    this.pullData();
  },
  data() {
      return {
          goods: []
      }
  },
}
</script>

<style lang="stylus">
#app
  background-color: #e3f9fd
.GoodsList
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  border-style: solid
  border-color: grey
  border: 1px
  position: fixed
  top: 7%
  left: 5%
  width: 90%
  height: 60%
  overflow: auto
</style>
