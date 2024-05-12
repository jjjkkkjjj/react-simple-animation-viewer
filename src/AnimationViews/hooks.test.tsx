import { renderHook } from '@testing-library/react';

import { AnimationView } from '../AnimationView';
import { useAnimationViews } from './hooks';

const mockSetShownComponents = jest.fn();
jest.mock('../AnimationViewProviderContainer/hooks', () => ({
  useAnimationViewProvider: () => ({
    setShownComponents: mockSetShownComponents,
  }),
}));

describe('Hooks Test', () => {
  test('Iitial rendering', () => {
    renderHook(() =>
      useAnimationViews('test-anim-views', [
        <AnimationView key="first" value={'first'}>
          <span>first</span>
        </AnimationView>,
        <AnimationView key="second" value={'second'} isRoot>
          <span>second</span>
        </AnimationView>,
      ]),
    );
    expect(mockSetShownComponents).toHaveBeenCalledWith(
      'test-anim-views',
      expect.anything(),
      expect.anything(),
    );
  });
});
