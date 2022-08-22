<template>
  <div>
    <ul>
      <li v-for="item in tableData" :key="item.id">
        <input type="checkbox" />
        {{ item.title }}
        <div class="11" @click="close">❎</div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'
const data: { id: number; title: string }[] = (() => {
  const d: { id: number; title: string }[] = []
  for (let i = 0; i < 10000; i++) {
    d.push({
      id: i,
      title: '撒飒飒所撒飒飒飒飒今天' + i + 10 + '岁啦'
    })
  }

  return d
})()
const tableData = ref([])
const count = ref(0)
const close = function (e) {
  console.log(e)
}
function loop() {
  if (count.value > data.length) return
  updateList(count.value)
  setTimeout(() => {
    loop()
  }, 0)
}
function updateList(start: number) {
  for (let i = start; i < start + 20; i++) {
    tableData.value.push(data[i])
  }
  count.value += 20
}
onMounted(() => {
  loop()
})
</script>

<style lang="less" scoped></style>
