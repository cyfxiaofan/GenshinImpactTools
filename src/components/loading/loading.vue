<script lang="tsx">
import { defineComponent, PropType } from 'vue';
import IconFont from '../icon/icon';

export default defineComponent({
  props: {
    flash: { type: Boolean as PropType<boolean>, default: false, description: '是否闪烁动画' },
    num: { type: Number as PropType<number>, default: 0, description: '加载动画的进度' },
  },

  setup(props) {
    return () => (
      <>
        <div class="top-box">
          <div class="inner-box" style={{ width: props.flash ? '400px' : props.num + 'px' }}>
            <div class={['deep-box', props.flash ? 'animate__animated, animate__flash,animate__infinite,infinite, animate__slow'.split(',') : '']}>
              <IconFont.Ice color="#00dede" width="50" />
              <IconFont.Water color="#33CCFF" width="50" />
              <IconFont.Fire color="#FCB43B" width="50" />
              <IconFont.Rock color="#C4A94C" width="50" />
              <IconFont.Electro color="#E19BFF" width="50" />
              <IconFont.Wind color="#5DC9A7" width="50" />
              <IconFont.Grass color="#589D26" width="50" />
            </div>
          </div>
        </div>
        <div class="under-box">
          <IconFont.Ice color="#E3E5E7" width="50" />
          <IconFont.Water color="#E3E5E7" width="50" />
          <IconFont.Fire color="#E3E5E7" width="50" />
          <IconFont.Rock color="#E3E5E7" width="50" />
          <IconFont.Electro color="#E3E5E7" width="50" />
          <IconFont.Wind color="#E3E5E7" width="50" />
          <IconFont.Grass color="#E3E5E7" width="50" />
        </div>
      </>
    );
  },
});
</script>

<style lang="scss" scoped>
.under-box {
  width: 400px;
  height: 50px;
  position: relative;
}

.top-box {
  width: 400px;
  height: 50px;
  position: absolute;
  z-index: 999;
  overflow: hidden;

  .inner-box {
    width: 0px;
    height: 50px;
    left: 0;
    overflow: hidden;
    position: relative;

    .deep-box {
      width: 400px;
      height: 50px;
      left: 0;
      overflow: hidden;
      position: absolute;
    }
  }
}
</style>
