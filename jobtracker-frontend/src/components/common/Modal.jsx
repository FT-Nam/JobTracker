import React, { useEffect } from 'react';
import { cn } from '../../utils/cn';

const Modal = ({ isOpen, onClose, children, className }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className={cn(
          "relative z-50 w-full max-w-lg mx-4 bg-background rounded-lg shadow-lg animate-bounce-in",
          className
        )}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
};

const ModalHeader = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col space-y-1.5 p-6 pb-4",
      className
    )}
    {...props}
  />
);

const ModalTitle = ({ className, ...props }) => (
  <h2
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className
    )}
    {...props}
  />
);

const ModalDescription = ({ className, ...props }) => (
  <p
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

const ModalContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
);

const ModalFooter = ({ className, ...props }) => (
  <div
    className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 p-6 pt-4",
      className
    )}
    {...props}
  />
);

export { Modal, ModalHeader, ModalTitle, ModalDescription, ModalContent, ModalFooter };

