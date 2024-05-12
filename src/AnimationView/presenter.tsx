import React from 'react';

export const AnimationView = (props: AnimationViewProps) => {
  const { children } = props;
  return <div style={{ width: '100vw', height: '100vh' }}>{children}</div>;
};

export interface AnimationViewContainerProps {
  /** 表示させるコンポーネント */
  children: React.ReactNode;
  /** 管理値 */
  value: string;
  /** ルート画面かどうか */
  isRoot?: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AnimationViewProps extends AnimationViewContainerProps {}
