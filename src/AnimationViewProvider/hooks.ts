import React from 'react';

import { AnimationViewProps } from '../AnimationView';
import {
  ShownComponentManagementType,
  ShownComponentType,
} from '../AnimationViews/presenter';

export const styleList = {
  show: {
    transform: 'translateX(0%)',
    position: 'fixed',
    display: 'unset',
  },
  notshow: {
    transform: 'translateX(-100%)',
    position: 'fixed',
    display: 'none',
  },
  // Transit
  forwardTransitLeft: {
    display: 'unset',
    opacity: '1',
    position: 'fixed',
    width: '100%',
    transform: 'translateX(0%)',
  } as React.CSSProperties,
  forwardTransitRight: {
    display: 'unset',
    opacity: '1',
    position: 'fixed',
    width: '100%',
    transform: 'translateX(100%)',
  } as React.CSSProperties,

  // Transiting
  forwardTransitingLeft: {
    opacity: '1',
    width: '100%',
    position: 'fixed',
    transform: 'translateX(-100%)',
    transition: '.3s linear',
  } as React.CSSProperties,
  forwardTransitingRight: {
    opacity: '1',
    width: '100%',
    position: 'fixed',
    transform: 'translateX(0%)',
    transition: '.3s linear',
  } as React.CSSProperties,

  // Transited
  forwardTransitedLeft: {
    opacity: '1',
    width: '100%',
    position: 'fixed',
    display: 'none',
  } as React.CSSProperties,
  forwardTransitedRight: {
    opacity: '1',
    width: '100%',
    position: 'fixed',
  } as React.CSSProperties,

  // Transit
  backwardTransitLeft: {
    display: 'unset',
    position: 'fixed',
    opacity: '1',
    width: '100%',
    transform: 'translateX(-100%)',
  } as React.CSSProperties,
  backwardTransitRight: {
    display: 'unset',
    position: 'fixed',
    opacity: '1',
    width: '100%',
    transform: 'translateX(0%)',
  } as React.CSSProperties,

  // Transiting
  backwardTransitingLeft: {
    opacity: '1',
    position: 'fixed',
    width: '100%',
    transform: 'translateX(0%)',
    transition: '.3s ease-in',
  } as React.CSSProperties,
  backwardTransitingRight: {
    opacity: '1',
    position: 'fixed',
    width: '100%',
    transform: 'translateX(100%)',
    transition: '.3s ease-in',
  } as React.CSSProperties,

  // Transited
  backwardTransitedLeft: {
    opacity: '1',
    position: 'fixed',
    width: '100%',
  } as React.CSSProperties,
  backwardTransitedRight: {
    opacity: '1',
    position: 'fixed',
    width: '100%',
    display: 'none',
  } as React.CSSProperties,
};

export const AnimationViewProviderContainerContext = React.createContext(
  {} as AnimationViewProviderContainerContextProps,
);

export interface AnimationViewProviderContainerContextProps {
  /** 表示コンポーネントをセットする関数 */
  setShownComponents: (
    _value: string,
    _newComponents: {
      [k: string]: React.ReactElement<
        AnimationViewProps,
        string | React.JSXElementConstructor<any>
      >;
    },
    _top_component: ShownComponentType,
  ) => void;
  /** 表示画面を変更する際に値が切り替わることで，副作用が効く */
  switcher: boolean;
  /** 表示画面の管理値 */
  viewValue: string | null;
  /** 管理下にある表示コンポーネント */
  shownComponents: Array<ShownComponentManagementType>;
  /** Animationで入ってくるコンポーネント */
  inComponent: ShownComponentType | null;
  /** Animationで入ってくるコンポーネントのスタイル */
  inStyle: React.CSSProperties;
  /** Animationで出ていくコンポーネント */
  outComponent: ShownComponentType | null;
  /** Animationで出ていくコンポーネントのスタイル */
  outStyle: React.CSSProperties;
  /** 現在のスタイル */
  styleType: string;
  /** スクロール管理用のRef．ただし，現状うまくいっていない． */
  centerRef: React.RefObject<HTMLDivElement>;
  /** 画面を新たに追加．左から右へアニメーション． */
  forwardView: (_newViewValue: string) => void;
  /** 画面を前のものに戻す．右から左へアニメーション． */
  backwardView: () => void;
  /** 画面を閉じる */
  closeView: () => void;
  /** 画面遷移処理関数． */
  transition: (_type: string) => void;
}

/**
 * AnimationViewのHooks．
 */
export const useAnimationViewProvider = () => {
  return React.useContext(AnimationViewProviderContainerContext);
};

/**
 * AnimationViewの管理用Hooks．
 */
export const useAnimationViewProviderAdmin = () => {
  const [shownComponentsMaster, setShownComponentsMaster] = React.useState<{
    [key: string]: Array<ShownComponentManagementType>;
  }>({});

  const [currentValue, setCurrentValue] = React.useState<string | null>(null);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [componentsMaster, setComponentsMaster] = React.useState<{
    [k: string]: {
      [k: string]: React.ReactElement<
        AnimationViewProps,
        string | React.JSXElementConstructor<any>
      >;
    };
  }>({});
  const [switcher, setSwitcher] = React.useState(true);

  // Component to be shown
  const [inComponent, setInComponent] =
    React.useState<ShownComponentType | null>(null);
  const [outComponent, setOutComponent] =
    React.useState<ShownComponentType | null>(null);
  const shownComponents = React.useMemo(
    () =>
      currentValue
        ? shownComponentsMaster[currentValue]
        : ([] as Array<ShownComponentManagementType>),
    [currentValue, shownComponentsMaster],
  );
  const components = React.useMemo(
    () => (currentValue ? componentsMaster[currentValue] : []),
    [currentValue, componentsMaster],
  );

  // Style management
  const [styleType, setStyleType] = React.useState<string>('default');
  const inStyle = React.useMemo(() => {
    const side = switcher ? 'Left' : 'Right';
    switch (styleType) {
      case 'default':
        return switcher ? styleList['show'] : styleList['notshow'];
      default:
        return styleList[`${styleType}${side}`];
    }
  }, [switcher, styleType]);

  const outStyle = React.useMemo(() => {
    const side = !switcher ? 'Left' : 'Right';
    switch (styleType) {
      case 'default':
        return !switcher ? styleList['show'] : styleList['notshow'];
      default:
        return styleList[`${styleType}${side}`];
    }
  }, [switcher, styleType]);

  const viewValue = React.useMemo(
    () =>
      shownComponents.length > 0
        ? shownComponents[shownComponents.length - 1].component.props.value
        : null,
    [shownComponents],
  );

  const centerRef = React.useRef<HTMLDivElement>(null);

  //========= Handling Shown Components =========
  // Initializer
  const setShownComponents = (
    value: string,
    newComponents: {
      [k: string]: React.ReactElement<
        AnimationViewProps,
        string | React.JSXElementConstructor<any>
      >;
    },
    top_component: ShownComponentType,
  ) => {
    setSwitcher(true);
    setInComponent(top_component);
    setShownComponentsMaster({
      ...shownComponentsMaster,
      [value]: [{ component: top_component, scrollTop: 0 }],
    });
    setComponentsMaster({ ...componentsMaster, [value]: newComponents });
    setCurrentValue(value);
  };

  const forwardView = (newViewValue: string) => {
    if (currentValue === null) {
      return;
    }
    //console.log(window.pageYOffset);
    //console.log(document.documentElement.scrollTop);
    const newShownComponents = [
      ...shownComponents,
      {
        component: React.cloneElement(
          components[newViewValue],
        ) as ShownComponentType,
        //scrollTop: centerRef.current?.scrollTop ?? 0,
        // scrollTop: window.documentElement.scrollTop,
        // https://stackoverflow.com/questions/4096863/how-to-get-and-set-the-current-web-page-scroll-position
        scrollTop: 0,
      },
    ];
    // Set scroll position
    newShownComponents[newShownComponents.length - 2] = {
      ...newShownComponents[newShownComponents.length - 2],
      scrollTop: document.documentElement.scrollTop,
    };

    setStyleType('forwardTransit');
    setShownComponentsMaster({
      ...shownComponentsMaster,
      [currentValue]: newShownComponents,
    });
    // Note that newShownComponents must have more than 2 components
    if (switcher) {
      // out will be new
      setInComponent(
        newShownComponents[newShownComponents.length - 1].component,
      );
      setOutComponent(
        newShownComponents[newShownComponents.length - 2].component,
      );
    } else {
      // in will be new
      setInComponent(
        newShownComponents[newShownComponents.length - 2].component,
      );
      setOutComponent(
        newShownComponents[newShownComponents.length - 1].component,
      );
    }
    setSwitcher(() => !switcher);
  };

  const backwardView = () => {
    const newShownComponents = [...shownComponents];

    if (!currentValue || newShownComponents.length <= 1) {
      return;
    }

    // remove the currently shown component
    const newComponent =
      newShownComponents.pop() as unknown as ShownComponentManagementType;

    setStyleType('backwardTransit');
    setShownComponentsMaster({
      ...shownComponentsMaster,
      [currentValue]: newShownComponents,
    });
    if (switcher) {
      // out will be new
      setInComponent(newComponent.component);
      setOutComponent(
        newShownComponents[newShownComponents.length - 1].component,
      );
    } else {
      // in will be new
      setInComponent(
        newShownComponents[newShownComponents.length - 1].component,
      );
      setOutComponent(newComponent.component);
    }
    setSwitcher(() => !switcher);
    if (centerRef.current) {
      //console.log(newShownComponents[newShownComponents.length - 1].scrollTop);
      //centerRef.current.scrollTop = newCenterComponent.scrollTop;
      // TODO: Not updating now!!!
      document.documentElement.scrollTop =
        newShownComponents[newShownComponents.length - 1].scrollTop;
    }
  };

  const closeView = () => {
    setStyleType('default');
    if (currentValue) {
      setComponentsMaster({
        ...componentsMaster,
        [currentValue]: {} as {
          [k: string]: React.ReactElement<
            AnimationViewProps,
            string | React.JSXElementConstructor<any>
          >;
        },
      });
    }
    setSwitcher(true);
    setInComponent(null);
    setOutComponent(null);
    setCurrentValue(null);
  };

  const transition = (type: string) => {
    switch (type) {
      case 'forwardTransit':
        setStyleType('forwardTransiting');
        break;
      case 'forwardTransiting':
        setStyleType('forwardTransited');
        break;
      case 'backwardTransit':
        setStyleType('backwardTransiting');
        break;
      case 'backwardTransiting':
        setStyleType('backwardTransited');
        break;
      case 'forwardTransited':
      case 'backwardTransited':
        if (switcher) {
          setInComponent(shownComponents[shownComponents.length - 1].component);
          setOutComponent(null);
        } else {
          setInComponent(null);
          setOutComponent(
            shownComponents[shownComponents.length - 1].component,
          );
        }
        //setStyleType("default");
        break;
      default:
        break;
    }
  };

  return {
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
  };
};
