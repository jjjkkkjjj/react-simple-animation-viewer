import React from 'react';
import { CSSTransition } from 'react-transition-group';

import { AnimationViewProps } from '../AnimationView';

export const AnimationViews = (props: AnimationViewsProps) => {
  const {
    inContainerStyle,
    outContainerStyle,
    timeout,
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
        timeout={timeout ?? 300}
        //onEnter={() => onTransit?.(styleType)} // calling twice
        onEntering={() => onTransit?.(styleType)}
        onEntered={() => onTransit?.(styleType)}
        //onExit={() => onTransit?.(styleType)} // calling twice
        onExiting={() => onTransit?.(styleType)}
        onExited={() => onTransit?.(styleType)}
      >
        <div>
          <div style={inStyle}>
            <div style={inContainerStyle}>{inComponent}</div>
          </div>
          <div ref={centerRef} style={outStyle}>
            <div style={outContainerStyle}>{outComponent}</div>
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
  /** The Animation View component(s) */
  children:
    | Array<React.ReactElement<AnimationViewProps>>
    | React.ReactElement<AnimationViewProps>;
  /** The unique value to manage the another animation views */
  value: string;
  /** The style to be applied to the inComponent */
  inContainerStyle?: React.CSSProperties;
  /** The style to be applied to the outComponent */
  outContainerStyle?: React.CSSProperties;
  /** The time for animation (ms). Default to 300 */
  timeout?: number;
  /** The event handler on changing the view */
  onChangeViewValues?: (_value: string | null) => void;
}

export interface AnimationViewsProps extends AnimationViewsContainerProps {
  switcher: boolean;
  /** The component entered by animation */
  inComponent: ShownComponentType | null;
  /** The style to be applied to the inComponent */
  inStyle: React.CSSProperties;
  /** The component outed by animation */
  outComponent: ShownComponentType | null;
  /** The style to be applied to the outComponent */
  outStyle: React.CSSProperties;
  /** The current style */
  styleType: string;
  /** The ref for scroll. But not effect currently. */
  centerRef: React.RefObject<HTMLDivElement>;
  /** The event handler on transiting the view */
  onTransit?: (_type: string) => void;
}
