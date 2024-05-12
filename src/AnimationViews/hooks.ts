import React from 'react';

import { AnimationViewProps } from '../AnimationView';
import { useAnimationViewProvider } from '../AnimationViewProvider/hooks';

export const AnimationViewerContext = React.createContext(
  {} as AnimationViewerContextProps,
);

/**
 * AnimationViewerのHooks
 */
export const useAnimationViewer = () => {
  return React.useContext(AnimationViewerContext);
};

/**
 * AnimationViewを管理するHooks
 * @param value 管理値
 * @param children AnimationViewの配列
 */
export const useAnimationViews = (
  value: string,
  children: Array<React.ReactElement<AnimationViewProps>>,
) => {
  // Set the first component
  const top_component = children.filter(
    (c: React.ReactElement<AnimationViewProps>) => {
      return c.props.isRoot;
    },
  );
  if (top_component.length !== 1) {
    throw new Error('You should set Only one isRoot props in `Content`');
  }
  const _components = Object.fromEntries(
    children.map((c: React.ReactElement<AnimationViewProps>) => [
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
    setShownComponents(value, _components, top_component[0]);
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
  viewValue: string | null;
  forwardView: (_value: string) => void;
  backwardView: () => void;
}
