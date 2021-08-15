<template>
  <div>
    <van-nav-bar
      title="标题"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="handType"
      @click-right="handType"
    />
    <van-cell-group>
      <van-field
        v-model="value1"
        label="收支项"
        left-icon="smile-o"
        right-icon="warning-o"
        placeholder="选择收支项"
        is-link
        readonly="true"
        @click="handType"
      />
      <van-field
        v-model="value2"
        clearable
        label="金额"
        left-icon="music-o"
        placeholder="显示清除图标"
      />
    </van-cell-group>
    <van-popup v-model="show" position="bottom" :style="{ height: '70%' }" >
      <van-tabs v-model="active">
        <van-tab title="支出">内容 1</van-tab>
        <van-tab title="收入">内容 2</van-tab>
      </van-tabs>

    </van-popup>

  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HelloWorld',
  data () {
    return {
      value1:'',
      value2:'',
      show:false,
      active:0
    }
  },
  methods:{
    handType(){
      this.show = true
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
