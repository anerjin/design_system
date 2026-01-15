import React, { useState, useRef, useEffect, useCallback, ReactNode } from 'react';

export interface TooltipProps {
  children: ReactNode;
  content?: string | ReactNode;
  placement?: 'top' | 'bottom' | 'left' | 'right';
  theme?: 'dark' | 'light';
  className?: string;
  disabled?: boolean;
  delay?: number;
  interactive?: boolean;
  onShow?: () => void;
  onHide?: () => void;
}

const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  placement = 'top',
  theme = 'dark',
  className = '',
  disabled = false,
  delay = 0,
  interactive = false,
  onShow,
  onHide,
}) => {
  const [visible, setVisible] = useState(false);
  const [position, setPosition] = useState({ left: '50%', top: '0' });
  const triggerRef = useRef<HTMLSpanElement>(null);
  const bubbleRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLSpanElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [tooltipId] = useState(() => `tooltip-${Math.random().toString(36).substring(2, 11)}`);

  const calculatePosition = useCallback(() => {
    if (!triggerRef.current || !wrapperRef.current || !bubbleRef.current) return;

    const triggerRect = triggerRef.current.getBoundingClientRect();
    const wrapperRect = wrapperRef.current.getBoundingClientRect();

    const centerX = triggerRect.left + triggerRect.width / 2 - wrapperRect.left;
    const centerY = triggerRect.top + triggerRect.height / 2 - wrapperRect.top;

    let newPosition = { left: '50%', top: '0' };

    switch (placement) {
      case 'bottom':
        newPosition = {
          left: `${centerX}px`,
          top: `${triggerRect.bottom - wrapperRect.top}px`,
        };
        break;
      case 'left':
        newPosition = {
          left: `${triggerRect.left - wrapperRect.left}px`,
          top: `${centerY}px`,
        };
        break;
      case 'right':
        newPosition = {
          left: `${triggerRect.right - wrapperRect.left}px`,
          top: `${centerY}px`,
        };
        break;
      case 'top':
      default:
        newPosition = {
          left: `${centerX}px`,
          top: `${triggerRect.top - wrapperRect.top}px`,
        };
        break;
    }

    setPosition(newPosition);
  }, [placement]);

  const showTooltip = useCallback(() => {
    if (disabled || !content) return;

    if (delay > 0) {
      timeoutRef.current = setTimeout(() => {
        setVisible(true);
        onShow?.();
      }, delay);
    } else {
      setVisible(true);
      onShow?.();
    }
  }, [disabled, content, delay, onShow]);

  const hideTooltip = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!interactive) {
      setVisible(false);
      onHide?.();
    }
  }, [interactive, onHide]);

  const handleMouseEnter = () => showTooltip();
  const handleMouseLeave = () => hideTooltip();
  const handleFocus = () => showTooltip();
  const handleBlur = () => hideTooltip();

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Escape' && visible) {
      setVisible(false);
      onHide?.();
      if (triggerRef.current) {
        (triggerRef.current.firstElementChild as HTMLElement)?.blur();
      }
    }
  };

  useEffect(() => {
    if (visible) {
      calculatePosition();
      const handleReposition = () => {
        if (visible) {
          calculatePosition();
        }
      };

      window.addEventListener('scroll', handleReposition, true);
      window.addEventListener('resize', handleReposition);

      return () => {
        window.removeEventListener('scroll', handleReposition, true);
        window.removeEventListener('resize', handleReposition);
      };
    }
    return undefined;
  }, [visible, calculatePosition]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  if (!content) {
    return <>{children}</>;
  }

  const wrapperClassName = `tooltip ${theme === 'light' ? 'tooltip--light' : ''} ${className}`.trim();

  return (
    <span ref={wrapperRef} className={wrapperClassName}>
      <span
        ref={triggerRef}
        className="tooltip__trigger"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        aria-describedby={visible ? tooltipId : undefined}
      >
        {children}
      </span>
      {content && (
        <div
          ref={bubbleRef}
          className="tooltip__bubble"
          role="tooltip"
          id={tooltipId}
          aria-hidden={!visible}
          data-placement={placement}
          style={{
            left: position.left,
            top: position.top,
          }}
          onMouseEnter={interactive ? handleMouseEnter : undefined}
          onMouseLeave={interactive ? handleMouseLeave : undefined}
        >
          {content}
        </div>
      )}
    </span>
  );
};

export interface TooltipShortcutProps {
  label: string;
  keys: string[];
}

export const TooltipShortcut: React.FC<TooltipShortcutProps> = ({ label, keys }) => {
  return (
    <div className="tooltip__shortcut">
      {label}{' '}
      {keys.map((key, index) => (
        <kbd key={index}>{key}</kbd>
      ))}
    </div>
  );
};

export default Tooltip;