# mouse-selection

[](https://img.shields.io/github/release/lison16/mouse-selection.svg)

![npm](https://img.shields.io/npm/v/mouse-selection.svg)

## Project setup

```
npm install mouse-selection
```

```javascript
import MouseSelection from "mouse-selection";

new MouseSelection(
    document.querySelector(".left-wrapper"), // 需要作用的DOM，如果不传则为document
    {
    onMousedown: () => {
        this.innerBoxRectList = Array.from(
        document.querySelectorAll(".inner-box")
        ).map(item => item.getBoundingClientRect());
    },
    onMousemove: () => {
        this.isInTheBoxList = this.innerBoxRectList.map(rect => {
        return this.wrapperMouseSelection.isInTheSelection(rect);
        });
    },
    onMouseup: () => {
        this.isInTheBoxList = [];
    },
    disabled: () => this.usable === "disabled"
});

new MouseSelection({
    onMousedown: (event) => {
        this.innerBoxRectList = Array.from(
        document.querySelectorAll(".inner-box")
        ).map(item => item.getBoundingClientRect());
    },
    onMousemove: (event) => {
        this.isInTheBoxList = this.innerBoxRectList.map(rect => {
        return this.wrapperMouseSelection.isInTheSelection(rect);
        });
    },
    onMouseup: (event) => {
        this.isInTheBoxList = [];
    },
    zIndex: 9999
});
```