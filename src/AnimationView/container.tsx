import React from 'react';
import { AnimationView, AnimationViewContainerProps } from './presenter';
import { useAnimationView } from './hooks';

/**
 * アニメーション管理したいDOMをこれで囲む
 */
const AnimationViewContainer = (props: AnimationViewContainerProps) => {
  useAnimationView();

  return <AnimationView {...props} />;
};

export default AnimationViewContainer;
