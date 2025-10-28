'use client';

import { createPortal } from 'react-dom';
import css from './Modal.module.css';
import { useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';

interface ModalProps {
  onClose: () => void;
  children: React.ReactNode;
}

export function Modal({ children, onClose }: ModalProps) {
  const router = useRouter();

  const closeModal = useCallback(() => {
    if (onClose) onClose();
    router.back();
  }, [onClose, router]);

  const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeModal();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    document.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [closeModal]);

  return createPortal(
    <div className={css.backdrop} onClick={handleBackdropClick} role="dialog" aria-modal="true">
      <div className={css.modal}>{children}</div>
    </div>,
    document.body
  );
}
