<template>
  <div class="main">
    <div v-if="state.loading" class="loading">
      <ComponmentLoading :flash="state.isFlash" :num="state.loadNum" />
    </div>
    <div v-else>
      <div class="comp-header">
        <div class="left">
          <IconFont.FlowerIcon width="28px" color="#2c3e50" />
          <h3>记录</h3>
        </div>
        <div>
          <div class="switch-box">
            <div :class="['item', state.activeKey === 1 && 'active'.split(',')]" @click="() => (state.activeKey = 1)">
              <el-icon><CopyDocument /></el-icon>
              列表
            </div>
            <div :class="['item', state.activeKey === 0 && 'active'.split(',')]" @click="() => (state.activeKey = 0)">
              <el-icon><AlarmClock /></el-icon>
              <span>时间</span>
            </div>
          </div>
        </div>
      </div>
      <div class="section">
        <TimeBox v-if="state.activeKey === 0" :cardData="state.timeList" />
        <ListBox v-else :data="state.data" />
      </div>
    </div>
  </div>
</template>
<script lang="tsx" setup>
import { AlarmClock, CopyDocument } from 'eleicon';
import { reactive, onMounted, PropType } from 'vue';
import ComponmentLoading from '@/components/loading/loading.vue';
import IconFont from '@/components/icon/icon';
import api from '@/api';
import TimeBox from './timebox.vue';
import ListBox from './listbox.vue';
import store from '@/store';

const state = reactive({
  loadNum: 0,
  loading: false,
  isFlash: false,
  activeKey: 1,
  data: {} as PropType<any>,
  timeList: [] as any[],
});

onMounted(() => {
  initData();
});

const initData = () => {
  let historyList = localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory') || '[]') : [];
  if (typeof historyList !== 'object') {
    localStorage.setItem('searchHistory', JSON.stringify([]));
  }
  if (!!!historyList[0] && !!!store.state.inputValue) {
    return;
  }
  const uid = store.state.inputValue || historyList[0];
  console.log(uid);

  if (!uid.includes('http')) {
    state.loadNum = 0;
    state.loading = true;
    setInterval(async () => {
      state.loadNum += 1;
    }, 0.01);

    if (!!!store.state.inputValue) {
      store.commit('setInputValue', uid);
    }

    api.GetInfo({ uid: uid }).then((res: any) => {
      if (historyList.indexOf(uid) === -1) {
        historyList.unshift(uid);
        localStorage.setItem('searchHistory', JSON.stringify(historyList));
      } else {
        historyList.splice(historyList.indexOf(uid), 1);
        historyList.unshift(uid);
        localStorage.setItem('searchHistory', JSON.stringify(historyList));
      }
      state.data = res.data;
      state.timeList = [...res.data.p200, ...res.data.p301, ...res.data.p302].reduce((acc: any[], cur: any) => {
        const { time, ..._ } = cur;
        if (acc.find((res: any) => res.time === time) === undefined) {
          acc.push({ time, data: [{ ...cur }] });
        } else {
          acc.find((res: any) => res.time === time).data.push({ ...cur });
        }
        return acc;
      }, []);
      state.timeList = state.timeList.sort((a: any, b: any) => {
        return new Date(a.time).valueOf() - new Date(b.time).valueOf();
      });
      state.loadNum = 400;
      setTimeout(async () => {
        state.loading = false;
      }, 200);
    });
  } else {
    state.isFlash = true;
    state.loading = true;
    api
      .UploadList({ path: uid })
      .then((res: any) => {
        state.isFlash = false;
        state.loading = false;
        store.commit('setInputValue', res.data.uid);
        initData();
      })
      .catch(() => {
        state.isFlash = false;
        state.loading = false;
      });
  }
};

defineExpose({
  initData,
});
</script>
<style lang="scss" scoped>
.main {
  .loading {
    width: 100%;
    height: calc(100vh - 100px);
    @extend %center;
  }

  .comp-header {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    h3 {
      font-weight: 400;
      font-size: 22px;
    }

    .left {
      display: flex;
      justify-content: space-between;
      width: 78px;
      align-items: center;
    }

    .switch-box {
      width: 180px;
      height: 50px;
      background: #eff4f7;
      @extend %dark-flash;
      @extend %center;

      .item {
        cursor: pointer;
        @extend %center;
        width: 84px;
        height: 38px;
        border-radius: 3px;
        color: #c7cacc;
        box-sizing: border-box;

        .el-icon {
          margin-right: 8px;
          font-size: 16px;
          margin-top: 2px;
        }
      }
    }
  }
}

.active {
  background: #fff;
  @extend %dark-flash;
  box-shadow: 0 2px 5px 0 rgba(0, 0, 0, 0.1);
  .el-icon {
    // color: $f !important;
  }

  color: $fontColor !important;
}
</style>
