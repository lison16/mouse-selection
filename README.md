# mouse-selection

![npm](https://img.shields.io/npm/v/mouse-selection.svg)

在线体验: https://lison16.github.io/mouse-selection/

![image](https://github.com/lison16/mouse-selection/blob/master/demo.gif)

## Project setup

```
npm install mouse-selection
```

```javascript
import MouseSelection from "mouse-selection";

this.wrapperMouseSelection = new MouseSelection(
    document.querySelector(".left-wrapper"),
    {
        onMousedown: () => {
            this.innerBoxRectList = (Array.from(
            document.querySelectorAll(".inner-box")
            ) as HTMLElement[]).map((node: HTMLElement) => {
            return {
                left: node.offsetLeft,
                top: node.offsetTop,
                width: node.offsetWidth,
                height: node.offsetHeight
            }
            });
        },
        onMousemove: () => {
            this.isInTheBoxList = this.innerBoxRectList.map(rect => {
            return this.wrapperMouseSelection.isInTheSelection(rect);
            });
        },
        onMouseup: () => {
            this.isInTheBoxList = [];
        },
        disabled: () => this.usable === "disabled",
        stopSelector: 'div.disabled',
        stopPropagation: true,
        notSetWrapPosition: false, // 设为true则不会给作用容器设置position: relative，默认为false
    }
);
new MouseSelection(
    document.querySelector(".right-wrapper"),
    {
        className: "right-wrapper-selection",
        stopPropagation: true
    }
);
// 第一个参数不传或传document，均是作用于整个页面
const documentSelection = new MouseSelection({
    onMousedown: () => {
        this.innerBoxRectList = (Array.from(
                document.querySelectorAll(".wrapper")
        ) as HTMLElement[]).map((node: HTMLElement) => {
            return node.getBoundingClientRect()
        });
    },
    onMousemove: (event) => {
        this.isInTheBoxWrapList = this.innerBoxRectList.map(rect => {
            return documentSelection.isInTheSelection(rect);
        });
    },
    onMouseup: () => {
        this.isInTheBoxWrapList = [];
    },
});
```
