import React from 'react';

export const AnimationViewProviderContainer = (
  props: AnimationViewProviderContainerProps,
) => {
  return <>{props.children}</>;
};

export interface AnimationViewProviderContainerContainerProps {
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AnimationViewProviderContainerProps
  extends AnimationViewProviderContainerContainerProps {}
