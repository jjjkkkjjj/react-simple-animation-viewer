import { renderHook, act } from '@testing-library/react';

import { useAnimationViewProviderAdmin, styleList } from './hooks';
import { AnimationView } from '../AnimationView';

describe('Hooks Test', () => {
  test('forward/backward', () => {
    const { result } = renderHook(() => useAnimationViewProviderAdmin());
    const components = {
      first: (
        <AnimationView value={'first'}>
          <span>first</span>
        </AnimationView>
      ),
      second: (
        <AnimationView value={'second'} isRoot>
          <span>second</span>
        </AnimationView>
      ),
    };
    act(() => {
      result.current.setShownComponents(
        'test',
        components,
        components['second'],
      );
    });
    expect(result.current.viewValue).toBe('second');
    expect(result.current.styleType).toBe('default');
    expect(result.current.switcher).toBeTruthy();
    expect(result.current.inStyle).toBe(styleList['show']);
    expect(result.current.outStyle).toBe(styleList['notshow']);

    // Forward
    act(() => {
      result.current.forwardView('first');
    });
    expect(result.current.viewValue).toBe('first');
    expect(result.current.styleType).toBe('forwardTransit');
    expect(result.current.switcher).toBeFalsy();
    expect(result.current.inStyle).toBe(styleList['forwardTransitRight']);
    expect(result.current.outStyle).toBe(styleList['forwardTransitLeft']);
    act(() => {
      result.current.transition('forwardTransit');
    });
    expect(result.current.inStyle).toBe(styleList['forwardTransitingRight']);
    expect(result.current.outStyle).toBe(styleList['forwardTransitingLeft']);
    act(() => {
      result.current.transition('forwardTransiting');
    });
    expect(result.current.inStyle).toBe(styleList['forwardTransitedRight']);
    expect(result.current.outStyle).toBe(styleList['forwardTransitedLeft']);

    // Backward
    act(() => {
      result.current.backwardView();
    });
    expect(result.current.viewValue).toBe('second');
    expect(result.current.styleType).toBe('backwardTransit');
    expect(result.current.switcher).toBeTruthy();
    expect(result.current.inStyle).toBe(styleList['backwardTransitLeft']);
    expect(result.current.outStyle).toBe(styleList['backwardTransitRight']);
    act(() => {
      result.current.transition('backwardTransit');
    });
    expect(result.current.inStyle).toBe(styleList['backwardTransitingLeft']);
    expect(result.current.outStyle).toBe(styleList['backwardTransitingRight']);
    act(() => {
      result.current.transition('backwardTransiting');
    });
    expect(result.current.inStyle).toBe(styleList['backwardTransitedLeft']);
    expect(result.current.outStyle).toBe(styleList['backwardTransitedRight']);
  });
});
