import { useCallback, useEffect, useState } from 'react';

interface UseResizablePanelOptions {
  ref: React.RefObject<HTMLElement>;
  minWidth: number;
  maxWidth: number;
  initialWidth: number;
}

export const useResizablePanel = ({
  ref,
  minWidth,
  maxWidth,
  initialWidth,
}: UseResizablePanelOptions) => {
  const [width, setWidth] = useState(initialWidth);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();

    const startX = e.clientX;
    const startWidth = ref.current?.offsetWidth || initialWidth;

    const onMouseMove = (moveEvent: MouseEvent) => {
      const newWidth = startWidth + (moveEvent.clientX - startX);
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
    };

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
  }, [ref, minWidth, maxWidth, initialWidth]);

  useEffect(() => {
    setWidth(initialWidth);
  }, [initialWidth]);

  return { width, handleMouseDown };
};
