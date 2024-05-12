# react-simple-animation-viewer

The very simple animation viewer in React.

![demo](./assets/demo.gif?raw=true)

## Installation

```bash
npm install react-simple-animation-viewer
```

## Example

All you have to do is enclose `<AnimationViewProvider>`, `<AnimationViews>`, `<AnimationView>`!

```typescript
import React from 'react';
import {
  AnimationViewProvider,
  AnimationViews,
  AnimationView,
  useAnimationViewer,
} from 'react-simple-animation-viewer'

const Component = (props) => {
  return (
    <AnimationViewProvider>
      <AnimationViews {...props} value="sample">
        <AnimationView
          isRoot
          value={'top'}
          containerStyle={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'green',
          }}
        >
          <Top />
        </AnimationView>
        <AnimationView
          value={'second'}
          containerStyle={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'blue',
          }}
        >
          <Second />
        </AnimationView>
        <AnimationView
          value={'third'}
          containerStyle={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'red',
          }}
        >
          <Third />
        </AnimationView>
        <AnimationView
          value={'fourth'}
          containerStyle={{
            width: '100vw',
            height: '100vh',
            backgroundColor: 'black',
          }}
        >
          <Fourth />
        </AnimationView>
      </AnimationViews>
    </AnimationViewProvider>
  );
};

const Top = () => {
  const { forwardView } = useAnimationViewer();
  return (
    <Button primary onClick={() => forwardView('second')}>
      second
    </Button>
  );
};
const Second = () => {
  const { forwardView, backwardView } = useAnimationViewer();
  return (
    <>
      <Button primary onClick={() => backwardView()}>
        back
      </Button>
      <Button primary onClick={() => forwardView('third')}>
        third
      </Button>
    </>
  );
};
const Third = () => {
  const { forwardView, backwardView } = useAnimationViewer();
  return (
    <>
      <div style={{ height: '50vh' }} />
      <Button primary onClick={() => backwardView()}>
        back
      </Button>
      <Button primary onClick={() => forwardView('fourth')}>
        fourth
      </Button>
      <div style={{ height: '100vh' }} />
    </>
  );
};
const Fourth = () => {
  const { backwardView } = useAnimationViewer();
  return (
    <Button primary onClick={() => backwardView()}>
      back
    </Button>
  );
};

```

## Props

### `AnimationViews`

`*` is required.

| props                | type                                                                                        | description                                            |
| :------------------- | :------------------------------------------------------------------------------------------ | :----------------------------------------------------- |
| \*`children`         | `Array<React.ReactElement<AnimationViewProps>>` or `React.ReactElement<AnimationViewProps>` | The Animation View component(s)                        |
| \*`value`            | `string`                                                                                    | The unique value to manage the another animation views |
| `inContainerStyle`   | `React.CSSProperties`                                                                       | The style to be applied to the inComponent             |
| `outContainerStyle`  | `React.CSSProperties`                                                                       | The style to be applied to the outComponent            |
| `timeout`            | `number`                                                                                    | The time for animation (ms). Default to 300            |
| `onChangeViewValues` | `(_value: string \| null) => void`                                                          | The event handler on changing the view                 |

### `AnimationView`

`*` is required.

| props            | type                  | description                                                                         |
| :--------------- | :-------------------- | :---------------------------------------------------------------------------------- |
| \*`children`     | `React.ReactNode`     | The component to be shown                                                           |
| \*`value`        | `string`              | The unique value to manage the view                                                 |
| `isRoot`         | `boolean`             | Whether to be root (top) view or not. This parameter must be true in only one view. |
| `containerStyle` | `React.CSSProperties` | The style of div                                                                    |

### `useAnimationViewer`

**Note: You should enclose `<AnimationViewProvider>` at the top components to use `useAnimationViewer`**

| props          | type                              | description                                       |
| :------------- | :-------------------------------- | :------------------------------------------------ |
| `viewValue`    | `string \| null`                  | The current view's value                          |
| `forwardView`  | `(_newViewValue: string) => void` | The function to forward (left to right) the view  |
| `backwardView` | `() => void`                      | The function to backward (right to left) the view |
| `closeView`    | `() => void`                      | The function to close the view                    |
