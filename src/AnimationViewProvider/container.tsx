import React from 'react';
import {
  AnimationViewProviderContainer,
  AnimationViewProviderContainerContainerProps,
} from './presenter';
import {
  AnimationViewProviderAdminContext,
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
    <AnimationViewProviderAdminContext.Provider
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
    </AnimationViewProviderAdminContext.Provider>
  );
};

export default AnimationViewProviderContainerContainer;
