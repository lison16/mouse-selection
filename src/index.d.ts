type DOMType = Element | HTMLElement | HTMLDocument | null;

interface SelectionRects {
  selectionPageRect?: CustomRect;
  selectionDOMRect?: CustomRect;
}

type RefitedMouseEvent = MouseEvent & SelectionRects;

interface FrameSelectionOptions {
  onMousemove?: (event: RefitedMouseEvent) => void;
  onMousedown?: (event: MouseEvent) => void;
  onMouseup?: (event: MouseEvent) => void;
  userSelectNode?: boolean;
  className?: string;
}

type EventNames = keyof GlobalEventHandlersEventMap;

interface CustomRect {
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
  number | (() => any)
>;

interface PositionSizeMap {
  left: number;
  top: number;
  width: number;
  height: number;
}
