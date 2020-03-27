type DOMType = Element | HTMLElement | HTMLDocument | null;

type EventListenerHanlder<T extends keyof GlobalEventHandlersEventMap> = (
  this: EventSource,
  event: GlobalEventHandlersEventMap[T],
) => void;

type EventMapType = {
  [eventName in keyof GlobalEventHandlersEventMap]?: EventListenerHanlder<
    eventName
  >;
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
