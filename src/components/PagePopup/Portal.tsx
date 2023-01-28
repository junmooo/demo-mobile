import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import ReactDom from 'react-dom';

type PortalProps = {
  visible?: boolean;
  children?: React.ReactNode;
};

export const Portal = React.memo(function Popup(props: PortalProps) {
  const { visible, children } = props;

  const mountCountainer = useMemo(() => document.body, []);

  const containerRef = useRef<HTMLDivElement>();
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    handleAnimation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    createContainer();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleAnimation = useCallback(() => {
    if (visible) {
      if (wrapperRef.current) {
        wrapperRef.current.classList.add('popup_show');
      }
    } else {
      if (wrapperRef.current) {
        wrapperRef.current.classList.remove('popup_show');
      }
    }
  }, [visible]);

  const handleTransitionEnd = useCallback(() => {
    if (!visible) {
      // TODO: 动画结束如何删除节点
    }
  }, [visible]);

  const component = useMemo(
    () => (
      <div className="page_popup_wrapper" ref={wrapperRef} onTransitionEnd={handleTransitionEnd}>
        <div className="page_popup_content_wrapper">{children}</div>
      </div>
    ),
    [children, handleTransitionEnd],
  );

  const createContainer = useCallback(() => {
    if (!containerRef.current) {
      containerRef.current = document.createElement('div');
      containerRef.current.className = 'page_popup_container';
    }
    mountCountainer.appendChild(containerRef.current);
  }, [mountCountainer]);

  const renderPortal = useCallback(() => {
    if (containerRef.current) {
      return ReactDom.createPortal(component, containerRef.current);
    }
    return null;
  }, [component]);

  return <>{renderPortal()}</>;
});
