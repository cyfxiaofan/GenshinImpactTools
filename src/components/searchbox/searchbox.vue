<template>
  <div class="search-box">
    <div class="search-comp">
      <el-input class="moveRight" ref="searchInputRef" @keydown.enter="enterClick" placeholder="请输入UID搜索或输入链接上传" style="width: 400px" @blur="inputBlur" v-model="store.state.inputValue">
        <template #suffix> <IconFont.SearchInfo color="#777" width="25" height="30" style="margin-top: 2px" /> </template>
      </el-input>
    </div>
    <div class="tips-wrap">
      <div class="tips-box">
        <h3>搜索历史</h3>
        <div class="tips-list">
          <div class="tips-item" v-for="item in state.historyList" @mousedown.native="historyClick(item)">
            <span class="tips-text">{{ item }}</span>
            <span class="tips-del" @mousedown.stop="delHistory(item)">
              <IconFont.Close color="#CCCCCC" width="15" height="15" />
            </span>
          </div>
        </div>
        <div class="tips-auto" @mousedown.native="autoGetLink">
          <span>自动提取链接</span>
          <span>
            <el-icon><ArrowRightBold /></el-icon>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowRightBold } from 'eleicon';
import { onMounted, reactive, ref, nextTick } from 'vue';
import IconFont from '@/components/icon/icon';
import store from '@/store';

const emit = defineEmits<{
  (event: 'setFocus', val: boolean): void;

  (event: 'searchAction'): void;
}>();

const searchInputRef = ref();

onMounted(() => {
  searchInputRef.value.focus();
  state.historyList = localStorage.getItem('searchHistory') ? JSON.parse(localStorage.getItem('searchHistory') || '[]') : [];
});

const state = reactive({
  closeable: true,
  historyList: [] as string[],
});

const inputBlur = () => {
  if (state.closeable) {
    emit('setFocus', false);
  } else {
    state.closeable = true;
    searchInputRef.value.focus();
  }
};
const historyClick = (item: string) => {
  store.commit('setInputValue', item);
  emit('searchAction');
};

const enterClick = () => {
  emit('searchAction');
  emit('setFocus', false);
};

const delHistory = (item: string) => {
  state.closeable = false;
  const index = state.historyList.indexOf(item);
  state.historyList.splice(index, 1);
  localStorage.setItem('searchHistory', JSON.stringify(state.historyList));
};

const autoGetLink = () => {
  store.dispatch('IFMSG_SEND', { type: 'openGetLink' });
};
</script>

<style lang="scss" scoped>
.search-comp {
  position: fixed;
  width: 100%;
  height: 60px;
  left: 0;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.tips-wrap {
  position: fixed;
  z-index: 9999;
  width: 100%;
  height: 300px;
  top: 65px;
  left: 0;
  display: flex;
  justify-content: center;

  .tips-box {
    height: 300px;
    width: 362px;
    padding: 20px;
    border-radius: 10px;
    background: #fff;
    border: 1px solid #f4f8f9;
    box-shadow: 0 8px 24px -2px rgb(0 0 0 / 5%);
    overflow-y: auto;
    // overflow: hidden;

    &::-webkit-scrollbar {
      width: 0;
      height: 5px;
    }

    h3 {
      color: #777;
      font-weight: 400;
      font-size: 16px;
    }

    .tips-list {
      display: flex;
      flex-wrap: wrap;
      margin-top: 10px;
      margin-bottom: 20px;
      min-height: 195px;
    }

    .tips-item {
      position: relative;
      list-style: none;
      width: 100px;
      height: 35px;
      margin-right: 20px;
      margin-bottom: 20px;
      border-radius: 5px;
      display: flex;
      align-items: center;
      text-indent: 15px;
      background: #f6f7f8;
      cursor: pointer;
      font-size: 14px;

      &:hover {
        color: $blue;

        .tips-del {
          display: flex;
        }
      }
    }

    .tips-del {
      position: absolute;
      display: none;
      right: -7px;
      top: -5px;
      width: 15px;
      height: 15px;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .tips-auto {
      display: flex;
      align-items: center;
      height: 50px;
      padding: 0 15px;
      background: #f4f8f9;
      justify-content: space-between;
    }
  }
}
</style>
