<template>
  <div style="margin: 5px">
    <h3>账务类型</h3>
    <van-button type="info"
                style="width: 30%;margin-top: 3px;margin-right: 3px"
                @click="classOnclick(ele)"
                :key="ele.id"
                v-for="ele in classification">
      {{ ele.name }}
    </van-button>
  </div>
</template>

<script>
let tmp_class = [
  {
    "id": 1,
    "name": "日常收支",
    "value": "1",
    "path":"/fast"
  },
  {
    "id": 3,
    "name": "借出",
    "value": "3"
  },
  {
    "id": 4,
    "name": "借入",
    "value": "4"
  },
  {
    "id": 5,
    "name": "余额调整",
    "value": "5"
  },
  {
    "id": 6,
    "name": "多项收支",
    "value": "6"
  },
  {
    "id": 7,
    "name": "垫付",
    "value": "7"
  },
  {
    "id": 8,
    "name": "报销",
    "value": "8"
  },
  {
    "id": 9,
    "name": "还款",
    "value": "9"
  },
  {
    "id": 10,
    "name": "收款",
    "value": "10"
  },
  {
    "id": 11,
    "name": "信用卡取现",
    "value": "11"
  }
]
export default {
  name: "Home",
  data() {
    return {
      classification: tmp_class
    }
  },
  methods:{
    classOnclick(ele){
      this.$router.push(ele.path)
    },
  }
}
</script>

<style scoped>

</style>
