import React from 'react';

export const AnimationView = (props: AnimationViewProps) => {
  const { containerStyle, children } = props;
  return <div style={{ ...containerStyle }}>{children}</div>;
};

export interface AnimationViewContainerProps {
  /** The component to be shown */
  children: React.ReactNode;
  /** The unique value to manage the view */
  value: string;
  /** Whether to be root (top) view or not. This parameter must be true in only one view. */
  isRoot?: boolean;
  /** The style of div */
  containerStyle?: React.CSSProperties;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AnimationViewProps extends AnimationViewContainerProps {}
