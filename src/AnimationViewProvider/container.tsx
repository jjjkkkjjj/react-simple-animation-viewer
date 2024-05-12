import React from 'react';
import {
  AnimationViewProviderContainer,
  AnimationViewProviderContainerContainerProps,
} from './presenter';
import {
  AnimationViewProviderContainerContext,
  useAnimationViewProviderAdmin,
} from './hooks';


const AnimationViewProviderContainerContainer = (
  props: AnimationViewProviderContainerContainerProps,
) => {
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
    closeView,
    transition,
  } = useAnimationViewProviderAdmin();

  return (
    <AnimationViewProviderContainerContext.Provider
      value={{
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
        closeView,
        transition,
      }}
    >
        <AnimationViewProviderContainer {...props} />
    </AnimationViewProviderContainerContext.Provider>
  );
};

export default AnimationViewProviderContainerContainer;
