/**
 * @description 判断一个值是否是DOM对象
 * @param object 要判断的值
 * @returns {boolean}
 */
export const isDOM = (object: any) => {
  if (typeof object !== 'object') {
    return false;
  }
  if (typeof HTMLElement === 'object') {
    return object instanceof HTMLElement;
  } else {
    return (
      object &&
      typeof object === 'object' &&
      object.nodeType === 1 &&
      typeof object.nodeName === 'string'
    );
  }
};

/**
 * @description 绑定事件
 * @param dom 要绑定事件的dom
 * @param eventName 事件名
 * @param callback 绑定的方法
 */
export const on = (
  dom: DOMType,
  eventName: EventNames,
  callback: any,
): void => {
  dom?.addEventListener(eventName, callback);
};

/**
 * @description 解绑事件
 * @param dom 要解绑事件的dom
 * @param eventName 事件名
 * @param callback 绑定的方法
 */
export const off = (
  dom: DOMType,
  eventName: EventNames,
  callback: any,
): void => {
  dom?.removeEventListener(eventName, callback);
};
