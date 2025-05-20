import React, { ReactNode, useEffect, useRef } from 'react';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  actions?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  scrollLock?: boolean;
  closeOnBackdropClick?: boolean;
  scrollable?: boolean;
};

const sizeMap = {
  sm: 'max-w-sm max-h-[60vh]',
  md: 'max-w-md max-h-[75vh]',
  lg: 'max-w-4xl max-h-[90vh]',
  xl: 'max-w-7xl max-h-[100vh]',
  full: 'max-w-100 max-h-[100vh] h-[99vh]',
};

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  actions,
  size = 'md',
  scrollLock = true,
  closeOnBackdropClick = true,
  scrollable = true,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Disable body scroll when modal is open
  useEffect(() => {
    if (isOpen && scrollLock) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, scrollLock]);

  // ESC to close
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose, isOpen]);

  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (
      closeOnBackdropClick &&
      modalRef.current &&
      !modalRef.current.contains(e.target as Node)
    ) {
      onClose();
    }
  };

  return (
    <div
      className='fixed inset-0 z-50 flex items-center justify-center bg-black/20'
      onClick={handleBackdropClick}
    >
      <div
        ref={modalRef}
        className={`bg-white dark:bg-gray-100 rounded-2xl shadow-lg w-full ${
          sizeMap[size]
        } mx-4 relative flex flex-col items-center justify-center ${
          scrollable ? 'overflow-hidden' : ''
        }`}
      >
        {/* Close Button */}
        <button
          type='button'
          onClick={onClose}
          className='absolute top-4 text-2xl right-4 text-gray-500 hover:text-gray-800 dark:hover:text-gray'
        >
          &times;
        </button>

        {/* Header */}
        {title && (
          <div className='border-b px-6 py-4 text-lg font-semibold text-gray-800 dark:text-gray-100'>
            {title}
          </div>
        )}

        {/* Body */}
        <div
          className={`px-6 py-4 text-gray-700 dark:text-gray-200 ${
            scrollable ? 'overflow-y-auto flex-1' : ''
          }`}
        >
          {children}
        </div>

        {/* Footer */}
        {actions && (
          <div className='border-t px-6 py-4 flex justify-end space-x-2'>
            {actions}
          </div>
        )}
      </div>
    </div>
  );
};
