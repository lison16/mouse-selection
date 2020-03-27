import { isDOM, on, off } from '../util';
import './index.less';

function isDOMType(
  value: DOMType | FrameSelectionOptions | undefined,
): value is DOMType {
  return isDOM(value);
}

function isDocument(value: DOMType): value is HTMLDocument {
  return value?.nodeName === '#document';
}

const rectangleElementInlineStyle = 'position: fixed;pointer-events: none';

class FrameSelection {
  // 矩形框选元素
  public RectangleElement!: HTMLElement;
  public domRect: DocumentPositionSizeRect | DOMRect = {
    left: 0,
    top: 0,
    width: 0,
    height: 0,
    right: 0,
    bottom: 0,
  };
  // 用于标记鼠标点下时的坐标
  private startX: number = 0;
  private startY: number = 0;
  // 当前是否在框选
  private moving: boolean = false;
  // 矩形框选元素类名
  private readonly RectangleElementClassName =
    'frame-selection-rectangle-element';
  // 在内部绑定的事件列表，通过config.on传进来的非以下事件会直接绑定到传进来的dom上
  private readonly ProxyEventList = ['mousedown', 'mousemove', 'mouseup'];
  constructor(
    domOrConfig?: DOMType | FrameSelectionOptions,
    public config?: FrameSelectionOptions,
  ) {
    let dom: DOMType = document;
    if (isDOMType(domOrConfig)) {
      dom = domOrConfig;
    }
    this.RectangleElement = this._createRectangleElement();
    this._addEvent(dom);
    this._addMousedownListener(dom);
  }
  /**
   * @description 初始化事件
   * @param dom 要作用于的DOM元素
   */
  private _addEvent(dom: DOMType) {
    this._removeEvent(dom);
    if (this.config && typeof this.config.on === 'object') {
      for (const eventName of Object.keys(this.config.on) as EventNames[]) {
        if (this.ProxyEventList.includes(eventName)) {
          continue;
        }
        const eventHandler = this.config.on[eventName];
        if (eventHandler) {
          on(dom, eventName, eventHandler as any); // @TODO: 优化类型定义
        }
      }
    }
  }
  /**
   * @description 解绑事件
   * @param dom 要作用于的DOM元素
   */
  private _removeEvent(dom: DOMType): void {
    if (this.config && typeof this.config.on === 'object') {
      for (const eventName of Object.keys(this.config.on) as EventNames[]) {
        if (this.ProxyEventList.includes(eventName)) {
          continue;
        }
        const eventHandler = this.config.on[eventName];
        if (eventHandler) {
          off(dom, eventName, eventHandler as any); // @TODO: 优化类型定义
        }
      }
    }
  }
  /**
   * @description 在document.body中创建矩形框选元素
   *              不管事件绑定到哪个DOM，矩形框选元素都添加到document.body
   * @returns 矩形框选元素
   */
  private _createRectangleElement(): HTMLElement {
    let ele = document.querySelector(
      `.${this.RectangleElementClassName}`,
    ) as HTMLElement;
    if (!ele) {
      ele = document.createElement('div');
      ele.className = this.RectangleElementClassName;
      ele.style.cssText = rectangleElementInlineStyle;
      document.body.appendChild(ele);
    }
    return ele;
  }
  /**
   * @description 判断是否配置了指定事件
   * @param name 事件名
   */
  private _hasConfigEvent(name: EventNames): boolean {
    return !!(this.config && this.config.on && this.config.on[name]);
  }
  /**
   * @description 代理内部处理事件
   * @param dom 要绑定事件的元素dom
   * @param eventName 事件名或多个事件名数组
   * @param callback 绑定的函数
   */
  private _proxyInsideEvent(
    dom: DOMType,
    eventName: EventNames | EventNames[],
    callback?: (event: any) => void,
  ) {
    if (typeof eventName === 'string') {
      on(dom, eventName, (event: any) => {
        if (this._hasConfigEvent(eventName)) {
          (this as any).config.on[eventName](event); // @TODO: 优化类型定义
        }
        callback && callback(event);
      });
    } else {
      eventName.forEach((name) => {
        on(dom, name, (event: any) => {
          if (this._hasConfigEvent(name)) {
            (this as any).config.on[name](event); // @TODO: 优化类型定义
          }
          callback && callback(event);
        });
      });
    }
  }
  /**
   * @description 设置鼠标按下时起始坐标
   * @param x
   * @param y
   */
  private _setStartPosition(x: number, y: number) {
    this.startX = x;
    this.startY = y;
  }
  /**
   * @description 绑定mousedown事件
   * @param dom 要绑定事件的dom
   */
  private _addMousedownListener(dom: DOMType) {
    this._proxyInsideEvent(dom, 'mousedown', (event) => {
      on(document, 'mouseup', this._selectEnd(dom));
      on(document, 'mousemove', this._selecting(dom));
      this.moving = true;
      // 设置所作用的DOM的定位及尺寸信息
      this.domRect = this._setDOMRect(dom);
      // 显示矩形框选元素
      this._setRectangleElementStyle('display', 'block');
      // 设置起始点坐标
      this._setStartPosition(event.pageX - 2, event.pageY - 2);
      // 更新矩形框选元素
      this._updateRectangleElementStyle(dom, event.pageX, event.pageY);
    });
  }
  private _setDOMRect(dom: DOMType): DOMRect | DocumentPositionSizeRect {
    const domRect = isDocument(dom)
      ? {
          left: 0,
          top: 0,
          width: window.innerWidth,
          height: window.innerHeight,
          right: window.innerWidth,
          bottom: window.innerHeight,
        }
      : dom!.getBoundingClientRect();
    return domRect;
  }
  /**
   * @description 绑定mousemove事件
   * @param dom 要绑定事件的dom
   */
  private _selecting(this: FrameSelection, dom: DOMType) {
    this._proxyInsideEvent(document, 'mousemove', (event) => {
      if (this.moving) {
        this._updateRectangleElementStyle(dom, event.pageX, event.pageY);
      }
    });
  }
  /**
   * @description 绑定mouseup事件
   * @param dom 要绑定事件的dom
   */
  private _selectEnd(this: FrameSelection, dom: DOMType) {
    this._proxyInsideEvent(document, 'mouseup', (event) => {
      off(document, 'mousemove', this._selecting);
      off(document, 'mouseup', this._selectEnd);
      this._setRectangleElementStyle('display', 'none');
      this.moving = false;
    });
  }
  private _setRectangleElementStyle(props: string, value: string) {
    this.RectangleElement.style[props as any] = value;
  }
  /**
   * @description 更新矩形框选元素样式
   * @param currentX 当前鼠标event.pageX值
   * @param currentY 当前鼠标event.pageY值
   */
  private _updateRectangleElementStyle(
    dom: DOMType,
    currentX: number,
    currentY: number,
  ) {
    currentX = currentX - 2;
    currentY = currentY - 2;
    const domRect = this.domRect;
    const left = Math.max(domRect.left, Math.min(this.startX, currentX));
    const top = Math.max(domRect.top, Math.min(this.startY, currentY));
    const width =
      Math.max(this.startX, Math.min(currentX, domRect.right - 2)) - left;
    const height =
      Math.max(this.startY, Math.min(currentY, domRect.bottom - 2)) - top;
    this._setRectangleElementStyle('left', `${left}px`);
    this._setRectangleElementStyle('top', `${top}px`);
    this._setRectangleElementStyle('width', `${width}px`);
    this._setRectangleElementStyle('height', `${height}px`);
  }
}

export default FrameSelection;
