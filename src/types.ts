export type Color = {
  r: number;
  g: number;
  b: number;
};

export type Camera = {
  x: number;
  y: number;
  zoom: number;
};

// Change to string enum for LSON compatibility
export enum LayerType {
  Rectangle = "rectangle",
  Ellipse = "ellipse",
  Path = "path",
  Text = "text",
}

export type RectangleLayer = {
  type: LayerType.Rectangle;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  stroke: Color;
  opacity: number;
  cornerRadius?: number;
};

export type EllipseLayer = {
  type: LayerType.Ellipse;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  stroke: Color;
  opacity: number;
};

export type PathLayer = {
  type: LayerType.Path;
  x: number;
  y: number;
  height: number;
  width: number;
  fill: Color;
  stroke: Color;
  opacity: number;
  points: number[][];
};

export type TextLayer = {
  type: LayerType.Text;
  x: number;
  y: number;
  height: number;
  width: number;
  text: string;
  fontSize: number;
  fontWeight: number;
  fontFamily: string;
  fill: Color;
  stroke: Color;
  opacity: number;
};

export type Layer = RectangleLayer | EllipseLayer | PathLayer | TextLayer;

export type Point = {
  x: number;
  y: number;
};

export type XYWH = {
  x: number;
  y: number;
  width: number;
  height: number;
};

// Change to string enum for LSON compatibility
export enum Side {
  None = 0,
  Top = 1 << 0,      // 1
  Bottom = 1 << 1,   // 2
  Left = 1 << 2,     // 4
  Right = 1 << 3,    // 8
}

export type CanvasState =
    | {
  mode: CanvasMode.None;
}
    | {
  mode: CanvasMode.RightClick;
}
    | {
  mode: CanvasMode.SelectionNet;
  origin: Point;
  current?: Point;
}
    | {
  mode: CanvasMode.Dragging;
  origin: Point | null;
}
    | {
  mode: CanvasMode.Inserting;
  layerType: LayerType.Rectangle | LayerType.Ellipse | LayerType.Text;
}
    | {
  mode: CanvasMode.Pencil;
}
    | {
  mode: CanvasMode.Resizing;
  initialBounds: XYWH;
  corner: Corner;
}
    | {
  mode: CanvasMode.Translating;
  current: Point;
}
    | {
  mode: CanvasMode.Pressing;
  origin: Point;
};
export enum Corner {
  TopLeft = "TOP_LEFT",
  TopRight = "TOP_RIGHT",
  BottomLeft = "BOTTOM_LEFT",
  BottomRight = "BOTTOM_RIGHT",
}

// Change to string enum for LSON compatibility
export enum CanvasMode {
  None = "none",
  Dragging = "dragging",
  Inserting = "inserting",
  Pencil = "pencil",
  Resizing = "resizing",
  Translating = "translating",
  SelectionNet = "selectionNet",
  Pressing = "pressing",
  RightClick = "rightClick",
}

export type Presence = {
  cursor: Point | null;
  selection: string[];
  pencilDraft: number[][] | null;
  penColor: Color | null;
};