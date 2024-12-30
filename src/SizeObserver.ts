import type { Options } from "./types";

/**
 * Size Observer
 *
 * A light-weight wrapper around the native Resize Observer API
 *
 * ```typescript
 * import { SizeObserver } from "@figliolia/size-observer";
 *
 * const node = document.getElementByID("myDOMNode");
 * const observer = new SizeObserver(node, {
 *  width: true,
 *  height: true,
 *  onChange: ({ height, width }) => {}
 * });
 *
 * // Clean up
 * observer.destroy();
 * ```
 */
export class SizeObserver<T extends Element> {
  node: T;
  width = 0;
  height = 0;
  options: Options;
  observer!: ResizeObserver;
  constructor(node: T, options: Options) {
    if (!node) {
      throw new Error("Element Observer: node reference is undefined");
    }
    this.node = node;
    this.options = Object.assign(SizeObserver.defaultOptions, options);
    this.initialize();
  }

  public static defaultOptions: Omit<Options, "onChange"> = {
    type: "border-box",
  };

  private initialize() {
    this.initializeLayout();
    this.observer = new ResizeObserver(entries => {
      let emit = false;
      for (const entry of entries) {
        if (this.options.type === "border-box") {
          emit = this.parseBlock(entry.borderBoxSize);
        } else if (this.options.type === "content-box") {
          emit = this.parseBlock(entry.contentBoxSize);
        } else if (this.options.type === "device-pixel-content-box") {
          emit = this.parseBlock(entry.devicePixelContentBoxSize);
        }
      }
      if (emit) {
        this.emit();
      }
    });
    this.observer.observe(this.node, { box: this.options.type });
  }

  public destroy() {
    this.observer.disconnect();
  }

  private initializeLayout() {
    const { height, width } = this.node.getBoundingClientRect();
    this.width = width;
    this.height = height;
    this.emit();
  }

  private parseBlock(entry: Readonly<ResizeObserverSize[]>) {
    let emit = false;
    const { height, width } = this.options;
    for (const block of entry) {
      if (block.blockSize !== this.height) {
        this.height = block.blockSize;
        if (height) {
          emit = true;
        }
      }
      if (block.inlineSize !== this.width) {
        this.width = block.inlineSize;
        if (width) {
          emit = true;
        }
      }
    }
    return emit;
  }

  private emit() {
    this.options.onChange({ width: this.width, height: this.height });
  }
}
