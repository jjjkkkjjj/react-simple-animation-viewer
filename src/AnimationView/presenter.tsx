import React from 'react';

export const AnimationView = (props: AnimationViewProps) => {
  const { children } = props;
  return <div style={{ width: '100vw', height: '100vh' }}>{children}</div>;
};

export interface AnimationViewContainerProps {
  /** The component to be shown */
  children: React.ReactNode;
  /** The unique value to manage the view */
  value: string;
  /** Whether to be root (top) view or not. This parameter must be true in only one view. */
  isRoot?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AnimationViewProps extends AnimationViewContainerProps {}
