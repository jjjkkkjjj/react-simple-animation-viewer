import React from 'react';

import { AnimationViewProps } from '../AnimationView';
import { useAnimationViewProvider } from '../AnimationViewProvider/hooks';

export const AnimationViewerContext = React.createContext(
  {} as AnimationViewerContextProps,
);

/**
 * The hooks of AnimationViewer
 */
export const useAnimationViewer = () => {
  return React.useContext(AnimationViewerContext);
};

/**
 * AnimationViewを管理するHooks
 * @param value 管理値
 * @param children AnimationViewの配列
 */
export const useAnimationViewsAdmin = (
  value: string,
  children:
    | Array<React.ReactElement<AnimationViewProps>>
    | React.ReactElement<AnimationViewProps>,
) => {
  const _children = Array.isArray(children) ? children : [children];
  // Set the first component
  const topComponent = _children.filter(
    (c: React.ReactElement<AnimationViewProps>) => {
      return c.props.isRoot;
    },
  );
  if (topComponent.length !== 1) {
    throw new Error('You should set Only one isRoot props in `Content`');
  }
  const _components = Object.fromEntries(
    _children.map((c: React.ReactElement<AnimationViewProps>) => [
      c.props.value,
      c,
    ]),
  );

  const {
    setShownComponents,
    switcher,
    viewValue,
    shownComponents,
    inComponent,
    inStyle,
    outComponent,
    outStyle,
    styleType,
    centerRef,
    forwardView,
    backwardView,
    transition,
  } = useAnimationViewProvider();

  // 初回レンダリングでは，ルート画面を表示コンポーネントに設定
  React.useEffect(() => {
    setShownComponents(value, _components, topComponent[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    switcher,
    viewValue,
    shownComponents,
    inComponent,
    inStyle,
    outComponent,
    outStyle,
    styleType,
    centerRef,
    forwardView,
    backwardView,
    transition,
  };
};

export interface AnimationViewerContextProps {
  /** The view's unique value */
  viewValue: string | null;
  /** The function to forward (left to right) the view */
  forwardView: (_value: string) => void;
  /** The function to backward (right to left) the view */
  backwardView: () => void;
}
