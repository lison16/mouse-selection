type DOMType = Element | HTMLElement | HTMLDocument | null;

// type EventListenerHanlder<T extends keyof GlobalEventHandlersEventMap> = (
//   this: EventSource,
//   event: GlobalEventHandlersEventMap[T],
// ) => void;

type EventMapType = {
  [eventName in keyof GlobalEventHandlersEventMap]?: (
    this: EventSource,
    event: GlobalEventHandlersEventMap[eventName]
  ) => void;
};

interface FrameSelectionOptions {
  on?: EventMapType;
  userSelectNode?: boolean;
}

type EventNames = keyof GlobalEventHandlersEventMap;

interface DocumentPositionSizeRect {
  left: number;
  top: number;
  width: number;
  height: number;
  right: number;
  bottom: number;
}

type IfEquals<X, Y, A = X, B = never> = (<T>() => T extends X ? 1 : 2) extends <
  T
>() => T extends Y ? 1 : 2
  ? B
  : A;

type ReadonlyKeys<T> = {
  [P in keyof T]-?: IfEquals<
    { [Q in P]: T[P] },
    { -readonly [Q in P]: T[P] },
    never,
    P
  >;
}[keyof T];

// 非只读的CSSStyleDeclaration接口
type NotReadonlyCSSStyleDeclaration = ReadonlyKeys<CSSStyleDeclaration>;

type StringTypeNotReadonlyCSSStyleDeclaration = Exclude<
  NotReadonlyCSSStyleDeclaration,
  number | Function
>;
