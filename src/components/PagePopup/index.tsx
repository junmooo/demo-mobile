import { useUpdateEffect } from 'ahooks';
import React, { useCallback, useState } from 'react';
import { genPopupState } from '../utils';
import { Portal } from './Portal';
import './style.css';

type PagePopupProps = {
  visible?: boolean;
  onClose?: () => void;
  children?: React.ReactNode;
};

export const PagePopup = React.memo(function Popup(props: PagePopupProps) {
  const [popupState] = useState(genPopupState());
  const { visible = false, onClose, children } = props;

  // 点击后退按钮时关闭当前弹框
  const popStateListener = useCallback((event: PopStateEvent) => {
    // console.log('尝试后退触发隐藏弹框', popupState, event.state);
    // 弹框可能会多层嵌套
    if (!event.state || popupState !== event.state.popupState) {
      window.removeEventListener('popstate', popStateListener);

      onClose?.();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // `visible` 变化时执行
  useUpdateEffect(() => {
    if (visible) {
      // console.log('显示弹框 visible = true：', popupState);
      // 由 false 变为 true
      // 向历史中插入一项
      window.history.pushState(popupState, '');
      window.addEventListener('popstate', popStateListener);
    } else {
      // console.log('隐藏弹框 visible = false：', visible);
      window.removeEventListener('popstate', popStateListener);
    }
  }, [visible]);

  return (
    <>
      <Portal visible={visible}>{children}</Portal>
    </>
  );
});
