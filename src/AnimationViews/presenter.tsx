import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { AnimationViewProps } from '../AnimationView';

export const AnimationViews = (props: AnimationViewsProps) => {
  const {
    switcher,
    inComponent,
    inStyle,
    outComponent,
    outStyle,
    styleType,
    centerRef,
    onTransit,
  } = props;
  // console.log(styleType);
  // console.log(leftStyle);
  // console.log(centerStyle);
  // console.log(rightStyle);
  return (
    <>
      <CSSTransition
        in={switcher}
        timeout={300}
        //onEnter={() => onTransit?.(styleType)} // calling twice
        onEntering={() => onTransit?.(styleType)}
        onEntered={() => onTransit?.(styleType)}
        //onExit={() => onTransit?.(styleType)} // calling twice
        onExiting={() => onTransit?.(styleType)}
        onExited={() => onTransit?.(styleType)}
      >
        <div>
          <div style={inStyle}>
            <div style={{ minWidth: '100vw' }}>{inComponent}</div>
          </div>
          <div ref={centerRef} style={outStyle}>
            <div style={{ minWidth: '100vw' }}>{outComponent}</div>
          </div>
        </div>
      </CSSTransition>
    </>
  );
};

export type ShownComponentType = React.ReactElement<AnimationViewProps>;

export interface ShownComponentManagementType {
  component: ShownComponentType;
  scrollTop: number;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface AnimationViewsContainerProps {
  children: Array<React.ReactElement<AnimationViewProps>>;
  value: string;
  onChangeViewValues?: (_value: string | null) => void;
}

export interface AnimationViewsProps extends AnimationViewsContainerProps {
  switcher: boolean;
  inComponent: ShownComponentType | null;
  inStyle: React.CSSProperties;
  outComponent: ShownComponentType | null;
  outStyle: React.CSSProperties;
  styleType: string;
  centerRef: React.RefObject<HTMLDivElement>;
  onTransit?: (_type: string) => void;
}
