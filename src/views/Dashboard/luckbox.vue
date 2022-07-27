<template>
  <li :style="{ border: '2px solid ' + state.luckMap[luckText][0] }">
    <h3 :style="{ color: state.luckMap[luckText][0] }">{{ luckText }}</h3>
    <IconFont.Icon :icon="state.luckMap[luckText][1]" :color="luckText === '非洲酋长' ? 'black' : null" :width="props.size" />
  </li>
</template>

<script setup lang="ts">
import IconFont from '@/components/icon/icon';
import { computed, reactive } from 'vue';

const props = defineProps<{
  size: number;
  num: number;
}>();

const luckText = computed(() => {
  if (0 < props.num && props.num <= 50) {
    return '鸿运当头';
  }
  if (50 < props.num && props.num <= 60) {
    return '欧气满满';
  }
  if (60 < props.num && props.num <= 70) {
    return '运气平平';
  }
  if (70 < props.num && props.num <= 80) {
    return '时运不济';
  }
  if (props.num > 80) {
    return '非洲酋长';
  } else {
    return '——';
  }
});

const state = reactive({
  luckMap: {
    '——': ['#fff'],
    鸿运当头: ['#FCB43B', 'Fire'],
    欧气满满: ['#5DC9A7', 'Wind'],
    运气平平: ['#33CCFF', 'Water'],
    时运不济: ['#E19BFF', 'Electro'],
    非洲酋长: ['black', 'Grass'],
  },
});
</script>

<style lang="scss" scoped>
li {
  @extend %dark-flash;
  position: relative;
  list-style: none;
  display: flex;
  flex-direction: column;
  min-width: 240px;
  width: 22%;
  height: 90px;
  background: #fff;
  margin-bottom: 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border-radius: 10px;
  justify-content: center;
  padding-left: 15px;

  span {
    font-size: 15px;
    font-weight: bold;
    color: #777;
  }

  p {
    font-size: 18px;
    color: #999;
  }

  h3 {
    font-size: 25px;
    // color: #777;
    font-weight: 400;
  }

  .icon {
    position: absolute;
    right: 0;
  }
}
</style>
