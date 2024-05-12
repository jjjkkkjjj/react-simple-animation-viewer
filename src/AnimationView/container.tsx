import React from 'react';
import { AnimationView, AnimationViewContainerProps } from './presenter';
import { useAnimationView } from './hooks';

/**
 * Use this component when you want to animate view
 */
const AnimationViewContainer = (props: AnimationViewContainerProps) => {
  useAnimationView();

  return <AnimationView {...props} />;
};

export default AnimationViewContainer;
