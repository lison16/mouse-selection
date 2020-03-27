<template>
  <div id="app">
    <div class="box">
      <div v-if="mode === 'wrapper'" class="test-box test-inner-wrapper">
        <div class="wrapper left-wrapper">
          <div class="inner-box" v-for="i in 8" :key="`left_${i}`"></div>
        </div>
        <div class="wrapper right-wrapper"></div>
      </div>
      <div v-else class="test-box test-full-page"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import FrameSelection from './lib/index';

@Component({
  data() {
    return {
      mode: 'wrapper',
    };
  },
  mounted() {
    // const documentFrameSelection = new FrameSelection(document, {
    //   on: {
    //     mousedown: (event) => {
    //       // console.log(event);
    //     },
    //     mousemove: (event) => {
    //       // console.log(event);
    //     },
    //     mouseup: (event) => {
    //       // console.log(event);
    //     },
    //     click: (event) => {
    //       // console.log('click');
    //     }
    //   }
    // });
    // console.log(documentFrameSelection);
    const wrapperFrameSelection = new FrameSelection(
      document.querySelector('.left-wrapper'),
      {
        on: {},
      },
    );
  },
})
export default class App extends Vue {}
</script>

<style lang="less">
.full-screen {
  height: 100%;
  width: 100%;
  margin: 0;
  padding: 0;
}
html,
body,
#app {
  .full-screen;
  .box {
    position: absolute;
    height: ~"calc(100% - 50px)";
    width: 100%;
    top: 50px;
    .test-box {
      .full-screen;
      .wrapper {
        width: ~"calc(50% - 15px)";
        height: ~"calc(100% - 20px)";
        position: absolute;
        top: 10px;
        background: rgba(255, 192, 203, 0.3);
        .inner-box {
          width: 100px;
          height: 100px;
          background: pink;
          display: inline-block;
          margin-left: 20px;
          margin-top: 20px;
        }
        &.left-wrapper {
          left: 10px;
        }
        &.right-wrapper {
          right: 10px;
        }
      }
    }
  }
}
</style>
