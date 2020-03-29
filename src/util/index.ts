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
