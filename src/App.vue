<template>
  <div id="app">
    <div class="options">
      <span>左侧容器内框选</span>
      <input type="radio" id="disabled" value="disabled" v-model="usable" />
      <label for="disabled">不可用</label>
      <input type="radio" id="able" value="able" v-model="usable" />
      <label for="able">可用</label>
    </div>
    <div class="box">
      <div v-if="mode === 'wrapper'" class="test-box test-inner-wrapper">
        <div class="wrapper left-wrapper">
          <div
            class="inner-box"
            :class="{ 'selected-box': isInTheBoxList[i - 1] }"
            v-for="i in 8"
            :id="`left_inner_box_${i}`"
            :key="`left_${i}`"
          ></div>
        </div>
        <div class="wrapper right-wrapper"></div>
      </div>
      <div v-else class="test-box test-full-page"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import FrameSelection from "./lib/index";

@Component({
  data() {
    return {
      mode: "wrapper"
    };
  }
})
export default class App extends Vue {
  public wrapperFrameSelection!: FrameSelection;
  public selectionPageRect!: object;
  public isInTheBoxList: boolean[] = [];
  public innerBoxRectList: DOMRect[] = [];
  public usable = "able";
  public isInnerSelection() {}
  protected mounted() {
    this.wrapperFrameSelection = new FrameSelection(
      document.querySelector(".left-wrapper"),
      {
        onMousedown: () => {
          this.innerBoxRectList = Array.from(
            document.querySelectorAll(".inner-box")
          ).map(item => item.getBoundingClientRect());
        },
        onMousemove: () => {
          this.isInTheBoxList = this.innerBoxRectList.map(rect => {
            return this.wrapperFrameSelection.isInTheSelection(rect);
          });
        },
        onMouseup: () => {
          this.isInTheBoxList = [];
        },
        disabled: () => this.usable === "disabled"
      }
    );
    const rightWrapperFrameSelection = new FrameSelection(
      document.querySelector(".right-wrapper"),
      {
        className: "right-wrapper-selection"
      }
    );
  }
}
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
  .options {
    padding: 16px;
  }
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
          background: rgba(255, 192, 203, 0.3);
          display: inline-block;
          margin-left: 20px;
          margin-top: 20px;
          &.selected-box {
            background: rgba(255, 192, 203, 1);
          }
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
.right-wrapper-selection {
  border-style: dashed;
}
</style>
