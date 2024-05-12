# react-simple-animation-viewer

The very simple animation viewer in React.

![demo](./assets/demo.gif?raw=true)

## Installation

```bash
npm install react-simple-animation-viewer
```

## Usage

All you have to do is eclose `<AnimationViewProvider>`, `<AnimationViews>`, `<AnimationView>`!

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