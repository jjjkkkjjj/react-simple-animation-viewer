import React from 'react';

import { AnimationViews, AnimationViewsContainerProps } from './presenter';
import { useAnimationViewsAdmin } from './hooks';

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
    transition,
  } = useAnimationViewsAdmin(value, props.children);

  // 管理値が変更された場合
  React.useEffect(() => {
    onChangeViewValues?.(viewValue);
  }, [onChangeViewValues, viewValue]);

  return (
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
  );
};

export default AnimationViewsContainer;
