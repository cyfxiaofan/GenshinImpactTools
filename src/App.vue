<template>
  <el-config-provider :locale="zhCn">
    <div class="menu">
      <div class="top-bar">
        <div class="left" @click="router.push('/')">
          <img src="./assets/logo.png" alt="" width="40" />
          <span>原神工具箱</span>
        </div>
        <div class="right">
          <el-space :spacer="spacer">
            <div v-if="!state.focus">
              <el-input :class="[state.initFlash && 'moveLeft']" v-model="store.state.inputValue" placeholder="Please input uid for search" style="width: 300px" @focus="setFocus(true)">
                <template #suffix> <IconFont.SearchInfo color="#777" width="25" height="30" style="margin-top: 2px" /> </template>
              </el-input>
            </div>
            <div v-else>
              <SearchBox @setFocus="setFocus" @searchAction="searchAction" />
            </div>
            <div class="i-row i-between i-width-13">
              <div class="item item-tosmall" @click="minimizeWin">
                <IconFont.ToSmall color="#515151" width="20" />
              </div>
              <div class="item item-tolarger" @click="maximizeWin">
                <IconFont.ToLarger color="#515151" width="20" />
              </div>
              <div class="item item-toclose" @click="closeWin">
                <IconFont.ToClose color="#515151" width="20" />
              </div>
            </div>
          </el-space>
        </div>
      </div>
      <div class="base">
        <IndexBox ref="indexBoxRef" />
      </div>
      <div class="light-dark" @click="themeChangeClick">
        <el-icon v-if="store.state.theme === 'light'"><Sunny /></el-icon>
        <el-icon v-else><Moon /></el-icon>
      </div>
    </div>
  </el-config-provider>
</template>
<script setup lang="ts">
import { ElConfigProvider, ElDivider } from 'element-plus';
import zhCn from 'element-plus/lib/locale/lang/zh-cn';
import { h, reactive, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import IconFont from './components/icon/icon';
import store from './store';
import { Sunny, Moon } from 'eleicon';
import SearchBox from './components/searchbox/searchbox.vue';
import IndexBox from './views/Dashboard/index.vue';
import { ElNotification } from 'element-plus';

const CONTENT_TYPES = {
  errorTips: 'errorTips', // 错误提示
  link: 'link', // 提取到的链接
};

const state = reactive({
  loadNum: 0,
  loading: true,
  focus: false,
  initFlash: false,
});

const indexBoxRef = ref();

const spacer = h(ElDivider, { direction: 'vertical' });

setInterval(() => {
  state.loadNum += 1;
}, 0.01);

const router = useRouter();

const minimizeWin = () => {
  store.dispatch('IFMSG_SEND', { type: 'minmize' });
};
const maximizeWin = () => {
  store.dispatch('IFMSG_SEND', { type: 'maxmize' });
};
const closeWin = () => {
  store.dispatch('IFMSG_SEND', { type: 'close' });
};

const searchAction = () => {
  indexBoxRef.value.initData();
};

const themeChangeClick = () => {
  store.commit('ChangeTheme', store.state.theme === 'dark' ? 'light' : 'dark');
  document.body.classList.toggle('dark');
  if (store.state.theme === 'light') {
    document.body.classList.add('flash-body');
  }
};

const setFocus = (val: boolean) => {
  state.focus = val;
  if (val) {
    state.initFlash = true;
  }
};

watch(
  () => store.getters.recvMessage,
  (data) => {
    if (data.contentType === CONTENT_TYPES.errorTips) {
      ElNotification({ title: '失败', message: data.message as string, type: 'error' });
    }
    if (data.contentType === CONTENT_TYPES.link) {
      store.commit('setInputValue', data.link);
      searchAction();
      ElNotification({ title: '成功', message: '链接提取成功！' as string, type: 'success' });
    }
  }
);
</script>
<style lang="scss">
#app {
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, PingFang SC, Helvetica Neue, Noto Sans, Noto Sans CJK SC, Microsoft Yahei, Arial, Hiragino Sans GB, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 0.875rem;
  font-weight: 400;
}

body {
  background: #f4f8f9;
  color: $fontColor;
}

.flash-body {
  @extend %dark-flash;
}

// 黑暗模式适配
.dark {
  background-color: $dark;
  color: $dark-font;
  @extend %dark-flash;

  .top-bar {
    background: $dark-light;
    @extend %dark-flash;
  }

  .el-input__inner {
    background: $dark-gary;
    @extend %dark-flash;
  }

  .light-dark {
    background: $dark-gary;
    @extend %dark-flash;
  }

  li {
    background: $dark-light !important;
    @extend %dark-flash;
  }

  .el-input__inner {
    background: $dark-gary !important;
    @extend %dark-flash;
  }

  .card {
    background: $dark-light !important;
    @extend %dark-flash;
  }

  .role-item {
    background: $dark-light !important;
    @extend %dark-flash;
  }

  .switch-box {
    background: $dark-gary !important;
    @extend %dark-flash;

    .active {
      background: $dark;
      @extend %dark-flash;
      color: $dark-font !important;

      .el-icon {
        @extend %dark-flash;
        color: $dark-font !important;
      }
    }
  }
}

* {
  margin: 0;
  padding: 0;

  :focus-visible {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 8px;
    height: 5px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 100px;
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: #c9cccf;

    &:hover {
      background: #bfc2c6;
    }
  }

  &::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px rgba(0, 0, 0, 0);
    border-radius: 0;
  }
}

.top-bar {
  -webkit-app-region: drag;
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: fixed;
  top: 0;
  left: 0;
  height: 60px;
  width: 100%;
  z-index: 1009;
  box-shadow: 0 8px 24px -2px rgb(0 0 0 / 5%);
  background: #fff;
  @extend %dark-flash;

  .left {
    margin-left: 20px;
    font-weight: bold;
    font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
    font-size: 18px;
    cursor: pointer;
    @extend %center;

    span {
      margin-left: 10px;
    }
  }

  .right {
    margin-right: 10px;
    @extend %center;
    justify-content: space-between;

    .item {
      -webkit-app-region: no-drag;
      height: 35px;
      width: 35px;
      @extend %center;
      cursor: pointer;

      &:hover {
        background: #e3e5e7;
      }
    }
  }
}

.base {
  margin: 60px 0 0 0;
  padding: 20px;
  height: calc(100vh - 100px);
  overflow-y: auto;
}

.light-dark {
  cursor: pointer;
  position: fixed;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  background: #fff;
  right: 20px;
  bottom: 50px;
  @extend %center;

  .el-icon {
    font-size: 22px;
  }
}

.el-input {
  -webkit-app-region: no-drag;
}

.el-input__suffix {
  top: 2px !important;
  height: calc(100% - 3px) !important;
}
</style>
