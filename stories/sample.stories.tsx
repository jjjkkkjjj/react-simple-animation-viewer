import React from 'react';
import type { Meta, StoryFn } from '@storybook/react';

import { AnimationViewProvider,  AnimationViews, AnimationView, useAnimationViewer } from '../src';
import { Button } from './Button';
import './button.css';

const meta = {
  title: 'libs/AnimationViewer',
  component: AnimationViews,
} satisfies Meta<typeof AnimationViews>;

//👇 We create a “template” of how args map to rendering
export default meta;

const Story: StoryFn<typeof AnimationViews> = (args) => {
  return (
    <AnimationViewProvider>
      <AnimationViews {...args} value="sample">
        <AnimationView isRoot value={'top'}>
          <Top />
        </AnimationView>
        <AnimationView value={'second'}>
          <Second />
        </AnimationView>
        <AnimationView value={'third'}>
          <Third />
        </AnimationView>
        <AnimationView value={'fourth'}>
          <Fourth />
        </AnimationView>
      </AnimationViews>
    </AnimationViewProvider>
    
  );
};

const Top = () => {
  const { forwardView } = useAnimationViewer();
  return <Button primary onClick={() => forwardView('second')}>second</Button>;
};
const Second = () => {
  const { forwardView, backwardView } = useAnimationViewer();
  return (
    <>
      <Button primary onClick={() => backwardView()}>back</Button>
      <Button primary onClick={() => forwardView('third')}>third</Button>
    </>
  );
};
const Third = () => {
  const { forwardView, backwardView } = useAnimationViewer();
  return (
    <>
      <div style={{ height: '50vh' }} />
      <Button primary onClick={() => backwardView()}>back</Button>
      <Button primary onClick={() => forwardView('fourth')}>fourth</Button>
      <div style={{ height: '100vh' }} />
    </>
  );
};
const Fourth = () => {
  const { backwardView } = useAnimationViewer();
  return <Button primary onClick={() => backwardView()}>back</Button>;
};

export const FirstStory = Story.bind({});

FirstStory.args = {
  /*👇 The args you need here will depend on your component */
};
