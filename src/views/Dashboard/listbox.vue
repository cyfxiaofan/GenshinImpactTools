<template>
  <div class="list-box">
    <div>
      <h3>汇总</h3>
      <div class="sum">
        <li style="border: 2px solid #409eff">
          <span>总抽卡数</span>
          <p>{{ props.data.num_all }}</p>
          <IconFont.Sum class="icon" color="#409EFF" :width="65" />
        </li>
        <li style="border: 2px solid #d8ac40">
          <span>总出金数</span>
          <p>{{ props.data.gnum_all }}</p>
          <IconFont.Gord class="icon" color="#D8AC40" :width="55" style="right: 10px" />
        </li>
        <li style="border: 2px solid #67c23a">
          <span>平均出金</span>
          <p>{{ allAvgNum }}</p>
          <IconFont.Avg class="icon" color="#67C23A" :width="45" style="right: 20px" />
        </li>
        <LuckBox :size="state.size" :num="allAvgNum" />
      </div>
    </div>
    <div class="cg-pool">
      <h3>常规池</h3>
      <div class="role-list">
        <div class="role-item" v-for="item in props.data.p200">
          <img :src="item.link" alt="" />
          <ul>
            <li>
              <span>{{ item.name }}</span>
            </li>
            <li>
              <el-tag size="mini" round :effect="store.state.theme">{{ item.value }}</el-tag>
            </li>
          </ul>
        </div>

        <div class="role-item">
          <img src="../../assets/question.png" alt="" />
          <ul>
            <li>
              <span>已垫</span>
            </li>
            <li>
              <el-tag size="mini" round :effect="store.state.theme">{{ padNum_200 }}</el-tag>
            </li>
          </ul>
        </div>
      </div>
      <h3>角色UP池</h3>
      <div class="role-list">
        <div class="role-item" v-for="item in props.data.p301">
          <img :src="item.link" alt="" />
          <ul>
            <li>
              <span>{{ item.name }}</span>
            </li>
            <li>
              <el-tag size="mini" round :effect="store.state.theme">{{ item.value }}</el-tag>
            </li>
          </ul>
        </div>
        <div class="role-item">
          <img src="../../assets/question.png" alt="" />
          <ul>
            <li>
              <span>已垫</span>
            </li>
            <li>
              <el-tag size="mini" round :effect="store.state.theme">{{ padNum_301 }}</el-tag>
            </li>
          </ul>
        </div>
      </div>
      <h3>武器池</h3>
      <div class="role-list">
        <div class="role-item" v-for="item in props.data.p302">
          <img :src="item.link" alt="" />
          <ul>
            <li>
              <span>{{ item.name }}</span>
            </li>
            <li>
              <el-tag size="mini" round :effect="store.state.theme">{{ item.value }}</el-tag>
            </li>
          </ul>
        </div>
        <div class="role-item">
          <img src="../../assets/question.png" alt="" />
          <ul>
            <li>
              <span>已垫</span>
            </li>
            <li>
              <el-tag size="mini" round :effect="store.state.theme">{{ padNum_302 }}</el-tag>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="tsx">
import store from '@/store';
import IconFont from '@/components/icon/icon';
import { computed, reactive } from 'vue';
import LuckBox from './luckbox.vue';
import _ from 'lodash';
const props = defineProps<{
  data: any;
}>();

const allAvgNum = computed(() => {
  return Number((props.data.num_all / props.data.gnum_all).toFixed(0));
});

const padNum_200 = computed(() => {
  return props.data.num_200 - _.sumBy(props.data.p200, 'value');
});

const padNum_301 = computed(() => {
  return props.data.num_301 - _.sumBy(props.data.p301, 'value');
});

const padNum_302 = computed(() => {
  return props.data.num_302 - _.sumBy(props.data.p302, 'value');
});

const state = reactive({
  size: 80,
});
</script>

<style lang="scss" scoped>
.list-box {
  width: 100%;
  margin-top: 20px;
}

h3 {
  color: #777;
  margin-bottom: 10px;
}

.sum {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-bottom: 20px;

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

    &:last-child {
      border: 2px solid gold;
    }

    span {
      font-size: 16px;
      font-weight: bold;
      color: #777;
    }

    p {
      font-size: 18px;
      color: #999;
    }

    h3 {
      font-size: 25px;
      color: #777;
      font-weight: 400;
    }

    .icon {
      position: absolute;
      right: 0;
    }
  }
}

.role-list {
  display: flex;
  flex-wrap: wrap;

  .role-item {
    background: #fff;
    @extend %dark-flash;
    width: 150px;
    height: 160px;
    margin-right: 14px;
    margin-bottom: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);

    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    &:hover {
      cursor: pointer;
      z-index: 2;
      -webkit-box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
      box-shadow: 0 15px 30px rgb(0 0 0 / 10%);
      -webkit-transform: translate3d(0, -2px, 0);
      transform: translate3d(0, -2px, 0);
    }

    img {
      width: 100px;
      height: 100px;
    }

    ul {
      list-style: none;
      display: flex;
      margin-top: 10px;
      li {
        font-size: 15px;
        color: #777;
      }
    }
  }
}
</style>
