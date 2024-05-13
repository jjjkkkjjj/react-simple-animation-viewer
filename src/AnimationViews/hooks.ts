import React from 'react';

import { AnimationViewProps } from '../AnimationView';
import { useAnimationViewProvider } from '../AnimationViewProvider/hooks';

/**
 * The hooks of AnimationViews
 * @param value The unique value
 * @param children The array of AnimationView component
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
