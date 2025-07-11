export type Callback<T extends any[], V = void> = (...args: T) => V;

export interface ElementProperties {
  width?: boolean;
  height?: boolean;
}

export type Dimensions = {
  [K in Extract<keyof ElementProperties, string>]: number;
};

export interface Options<T extends Element = Element>
  extends ElementProperties {
  onChange: Callback<[dimensions: Dimensions, node: T]>;
  type?: ResizeObserverBoxOptions;
}
