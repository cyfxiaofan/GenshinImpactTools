<template>
  <div class="time-box">
    <div class="section" v-for="(item, index) in cardData">
      <span> {{ utils.formatTime(item.time, false) }}</span>
      <div class="card-li">
        <div class="card" v-for="(itm, idx) in item.data">
          <img :src="itm.link" alt="" />
          <div class="right-box">
            <span>{{ itm.name }}</span>
            <span>【{{ itm.gacha_type === '200' ? '常规池' : itm.gacha_type === '301' ? '角色UP池' : '武器UP池' }}】</span>
          </div>

          <div class="val">
            <span>{{ itm.value }}</span>
            <p>抽</p>
          </div>

          <div class="icon">
            <IconFont.Ice v-if="itm.attribute === '冰'" color="#00dede" :width="state.size" />
            <IconFont.Water v-if="itm.attribute === '水'" color="#33CCFF" :width="state.size" />
            <IconFont.Fire v-if="itm.attribute === '火'" color="#FCB43B" :width="state.size" />
            <IconFont.Rock v-if="itm.attribute === '岩'" color="#C4A94C" :width="state.size" />
            <IconFont.Electro v-if="itm.attribute === '雷'" color="#E19BFF" :width="state.size" />
            <IconFont.Wind v-if="itm.attribute === '风'" color="#5DC9A7" :width="state.size" />
            <IconFont.Grass v-if="itm.attribute === '草'" color="#589D26" :width="state.size" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
Z
<script setup lang="tsx">
import utils from '@/utils';
import IconFont from '@/components/icon/icon';
import { computed, reactive } from 'vue';

const props = defineProps<{
  cardData: any[];
}>();

const state = reactive({
  size: 80,
});
</script>

<style lang="scss" scoped>
.time-box {
  width: 100%;
  margin-top: 20px;
}

.section {
  width: 100%;
  margin-bottom: 25px;
  span {
    font-size: 15px;
    font-weight: bold;
  }

  .card-li {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;

    .card {
      min-width: 335px;
      height: 120px;
      background: #fff;
      @extend %dark-flash;
      margin-right: 20px;
      box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      padding-left: 10px;
      border-radius: 8px;
      position: relative;

      img {
        width: 80px;
        height: 80px;
      }

      .right-box {
        height: 80%;
        display: flex;
        margin-left: 15px;
        span:first-child {
          font-size: 17px;
        }
        span:last-child {
          font-size: 14px;
          font-weight: 300;
          color: #777;
          margin-left: 2px;
        }
      }

      .val {
        position: absolute;
        left: 100px;
        height: 60%;
        display: flex;
        align-items: flex-end;

        span {
          display: block;
          font-weight: 400;
          font-size: 40px;
          color: #777;
          line-height: 40px;
        }
        p {
          margin-left: 5px;
          font-size: 20px;
        }
      }

      .icon {
        position: absolute;
        right: 10px;
        bottom: 10px;
        opacity: 1;
      }
    }
  }
}
</style>
