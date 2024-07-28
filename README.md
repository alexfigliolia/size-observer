# Size Observer
Resize Observers simplified!

## Installation
```bash
npm i @figliolia/size-observer
# or
yarn add @figliolia/size-observer
```

## Vanilla
```typescript
import { SizeObserver } from "@figliolia/size-observer";

const node = document.getElementById("myNode");

const observer = new SizeObserver(node, {
  width: true // set to false to disable observing width
  height: true, // set to false to disable observing height
  type: "border-box", // (border-box, "content-box", "device-pixels")
  onChange: ({ height, width }) => {
    // your logic
  }
});

// Clean Up
observer.destroy();
```

## React
This library also exports a `useSizeObserver` hook that you can use in your react components. The Hook returns a `ref` that you can attach to any DOM node and it'll be observed as long as it's mounted to the DOM
```tsx
import { useMemo } from "react";
import { useSizeObserver } from "@figliolia/size-observer";

export const MyComponent = () => {

  // Declare your options
  const options = useMemo(() => ({
    width: true,
    height: true,
    type: "border-box",
    onChange: ({ width, height }) => {}
  }), []);

  // Create Your Ref
  const nodeRef = useResizeObserver(options);

  return (
    // Attach your ref!
    <div ref={nodeRef}>
      {/* Your Markup */}
    </div>
  );
}
```