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
        v-model="szx.value"
        label="收支项"
        left-icon="smile-o"
        right-icon="warning-o"
        placeholder="选择收支项"
        is-link
        :readonly="true"
        @click="handType"
      />
      <van-field
        v-model="subtotal.value"
        clearable
        label="金额"
        left-icon="music-o"
        @click="show_number_keyboard = true"
        placeholder="输入金额"
      />
      <van-field
        v-model="acc.value"
        clearable
        label="账号"
        left-icon="music-o"
        @click="show_account = true"
        placeholder="选择账号"
      />
    </van-cell-group>
    <van-popup v-model="show" position="bottom" :style="{ height: '70%' }" >
      <van-tabs v-model="active">
        <van-tab title="支出">
          <van-search v-model="value" placeholder="请输入搜索关键词" />
          <div style="height: 50px">常用</div>
          <van-sidebar  v-model="active_type" style="float:left;width: 20%">
              <van-sidebar-item v-for="ele in getParentType(type)"  :title="ele.name"  :key="ele.id" />

          </van-sidebar>
          <div style="margin-left: 15%" v-for="subEle in getTypeByParentId(type,getParentType(type)[active_type].id)">
            <van-button style="width: 24%;margin: 1px;float: left" type="info" @click="selectType(subEle)" >{{subEle.name}}</van-button>
          </div>

        </van-tab>

        <van-tab title="收入">内容 2</van-tab>
      </van-tabs>

    </van-popup>
    <van-popup v-model="show_account" position="bottom" :style="{ height: '70%' }" >
      <van-button style="width: 100%;margin: 2px"
                  type="info" v-for="ele in filterAccount(account)"
                  :key="ele.id"
                  @click="selectAccount(ele)"
      >{{ele.account_name}}</van-button>
    </van-popup>
    <!--弹出的键盘-->
    <van-number-keyboard
      :show="show_number_keyboard"
      theme="custom"
      extra-key="."
      close-button-text="完成"
      @blur="show_number_keyboard = false"
      @input="onInput"
      @delete="onDelete"
    />

  </div>
</template>

<script>
import axios from 'axios';
let tmp_type = [
  {
    "id": 1,
    "name": "伙食",
    "value": "1",
    "p_id": null,
    "type": 1
  },
  {
    "id": 2,
    "name": "早餐",
    "value": "2",
    "p_id": 1,
    "type": 1
  },
  {
    "id": 3,
    "name": "午餐",
    "value": "3",
    "p_id": 1,
    "type": 1
  },
  {
    "id": 4,
    "name": "晚餐",
    "value": "4",
    "p_id": 1,
    "type": 1
  },
  {
    "id": 5,
    "name": "宵夜",
    "value": "5",
    "p_id": 1,
    "type": 1
  },
  {
    "id": 6,
    "name": "外卖优惠券",
    "value": "6",
    "p_id": 1,
    "type": 1
  },
  {
    "id": 7,
    "name": "饮料",
    "value": "7",
    "p_id": null,
    "type": 1
  },
  {
    "id": 8,
    "name": "水",
    "value": "8",
    "p_id": 7,
    "type": 1
  },
  {
    "id": 9,
    "name": "汽水",
    "value": "9",
    "p_id": 7,
    "type": 1
  },
  {
    "id": 10,
    "name": "茶饮",
    "value": "10",
    "p_id": 7,
    "type": 1
  }
]
let tmp_account=[
  {
    "id": 1,
    "account_name": "支付宝",
    "account_type": 1,
    "balance": -8288,
    "is_cash": 1
  },
  {
    "id": 2,
    "account_name": "微信",
    "account_type": 1,
    "balance": 0,
    "is_cash": 0
  },
  {
    "id": 3,
    "account_name": "招商银行",
    "account_type": 1,
    "balance": 0,
    "is_cash": 0
  },
  {
    "id": 4,
    "account_name": null,
    "account_type": 9,
    "balance": 0,
    "is_cash": 0
  },
  {
    "id": 5,
    "account_name": null,
    "account_type": 9,
    "balance": 0,
    "is_cash": 0
  },
  {
    "id": 6,
    "account_name": "伙食-内部账号",
    "account_type": 9,
    "balance": 2072,
    "is_cash": 0
  }
]
export default {
  name: 'HelloWorld',
  data () {
    return {
      szx:{id:'',value:''},
      subtotal:{id:'',value:''},
      acc:{id:'',value:''},
      show:false,
      show_number_keyboard:false,
      show_account:false,
      active:0,
      active_type:0,
      type:tmp_type,
      account:tmp_account
    }
  },
  methods:{
    handType(){
      this.show = true
    },
    getParentType(type){
      return type.filter(ele=>{
        return ele.p_id === null
      })
    },
    getTypeByParentId(type,id){
      return type.filter(ele=>{
        return ele.p_id === id
      })
    },
    selectType(type){
      this.show = false
      this.szx.id = type.id
      this.szx.value =type.name
    },
    selectAccount(account){
      this.show_account = false
      this.acc.id = account.id
      this.acc.value = account.account_name
    },
    filterAccount(account){
      return account.filter(ele=>{
        return ele.account_type !== 9
      })
    },
    onInput(value){
      // 小数点
      if (value === '.' && this.subtotal.value.indexOf(value) !== -1) {
        return
      }
      //保留2位小数
      if (this.subtotal.value.indexOf('.') > 0 && this.subtotal.value.indexOf('.') === this.subtotal.value.length - 3) {
        return
      }
      this.subtotal.value += value
    },
    onDelete(){
      this.subtotal.value = this.subtotal.value.substr(0,this.subtotal.value.length-1)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
