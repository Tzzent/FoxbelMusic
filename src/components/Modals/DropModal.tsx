import { useEffect } from 'react';

interface DropModalProps {
  parentRef: React.RefObject<HTMLDivElement>,
  isOpen: boolean,
  onHide?: () => void,
  className?: string,
  children?: React.ReactNode,
}

export default function DropModal({
  parentRef,
  isOpen,
  onHide = () => { return },
  className,
  children,
}: DropModalProps) {

  useEffect(() => {
    const handleOutsideClick = (ev: MouseEvent) => {
      const targetNode = ev?.target as Node;
      if (parentRef && parentRef.current && !parentRef.current.contains(targetNode)) {
        onHide();
      }
    };
    document.addEventListener("click", handleOutsideClick, true);
    return () => document.removeEventListener("click", handleOutsideClick, true);
  }, [parentRef, onHide]);

  return (
    <div
      className={`
      z-20
      absolute
      bg-white
      shadow-xl
      rounded-xl
      overflow-hidden
      ${isOpen ? 'h-auto' : 'h-0'}
      ${className}
      `}
    >
      {children}
    </div >
  )
}
