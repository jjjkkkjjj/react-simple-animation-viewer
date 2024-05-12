import React from 'react';

import { AnimationViews, AnimationViewsContainerProps } from './presenter';
import { useAnimationViews, AnimationViewerContext } from './hooks';

/**
 * AnimationViewをこれで囲む
 */
const AnimationViewsContainer = (props: AnimationViewsContainerProps) => {
  const { value, onChangeViewValues } = props;
  const {
    switcher,
    viewValue,
    inComponent,
    inStyle,
    outComponent,
    outStyle,
    styleType,
    centerRef,
    forwardView,
    backwardView,
    transition,
  } = useAnimationViews(value, props.children);

  // 管理値が変更された場合
  React.useEffect(() => {
    onChangeViewValues?.(viewValue);
  }, [onChangeViewValues, viewValue]);

  return (
    <AnimationViewerContext.Provider
      value={{
        viewValue,
        forwardView,
        backwardView,
      }}
    >
      <AnimationViews
        {...props}
        switcher={switcher}
        inComponent={inComponent}
        inStyle={inStyle}
        outComponent={outComponent}
        outStyle={outStyle}
        styleType={styleType}
        centerRef={centerRef}
        onTransit={transition}
      />
    </AnimationViewerContext.Provider>
  );
};

export default AnimationViewsContainer;
