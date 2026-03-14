'use client';

import { useState, useRef, useEffect, ReactNode, useCallback } from 'react';
import { ChevronRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface SlideToConfirmModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  onConfirm: () => void;
  confirmText?: string;
  warningText?: string;
  icon?: ReactNode;
  type?: 'delete' | 'confirm';
}

export function SlideToConfirmModal({
  open,
  onOpenChange,
  title = 'Konfirmasi Hapus',
  description = 'Apakah Anda yakin ingin menghapus item ini? Tindakan ini tidak dapat dibatalkan.',
  onConfirm,
  confirmText = 'Geser untuk menghapus',
  warningText = 'Tindakan ini tidak dapat dibatalkan',
  icon = <Trash2 className="w-6 h-6 text-red-500" />,
  type = 'delete',
}: SlideToConfirmModalProps) {
  const [slideProgress, setSlideProgress] = useState(0);
  const [isConfirming, setIsConfirming] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const buttonWidth = 48;

  // Reset slide progress when modal opens
  useEffect(() => {
    if (open) {
      setSlideProgress(0);
      setIsConfirming(false);
    }
  }, [open]);

  const getContainerWidth = useCallback(() => {
    if (!containerRef.current) return 300;
    return containerRef.current.offsetWidth - buttonWidth;
  }, []);

  const handleStart = useCallback(
    (clientX: number) => {
      if (!open || isConfirming) return;
      isDraggingRef.current = true;
      startXRef.current = clientX;
    },
    [open, isConfirming]
  );

  const handleMove = useCallback(
    (clientX: number) => {
      if (!isDraggingRef.current || isConfirming) return;

      const containerWidth = getContainerWidth();
      const deltaX = clientX - startXRef.current;
      const progress = Math.max(
        0,
        Math.min(100, (deltaX / containerWidth) * 100)
      );

      setSlideProgress(progress);
    },
    [isConfirming, getContainerWidth]
  );

  const handleEnd = useCallback(() => {
    if (!open || isConfirming) return;
    isDraggingRef.current = false;

    if (slideProgress >= 90) {
      // Confirmed - trigger confirmation
      setIsConfirming(true);
      setSlideProgress(100);

      setTimeout(() => {
        onConfirm();
        onOpenChange(false);
        setSlideProgress(0);
        setIsConfirming(false);
      }, 300);
    } else {
      // Reset to start
      setSlideProgress(0);
    }
  }, [open, isConfirming, slideProgress, onConfirm, onOpenChange]);

  const handleTouchStart = (e: React.TouchEvent) => {
    handleStart(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    handleEnd();
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    handleStart(e.clientX);
  };

  // Add global mouse event listeners
  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        handleMove(e.clientX);
      }
    };

    const handleGlobalMouseUp = () => {
      if (isDraggingRef.current) {
        handleEnd();
      }
    };

    if (open) {
      document.addEventListener('mousemove', handleGlobalMouseMove);
      document.addEventListener('mouseup', handleGlobalMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleGlobalMouseMove);
      document.removeEventListener('mouseup', handleGlobalMouseUp);
    };
  }, [open, handleMove, handleEnd]);

  const handleClose = () => {
    if (!isConfirming) {
      onOpenChange(false);
      setSlideProgress(0);
    }
  };

  const isDeleteType = type === 'delete';
  const bgColor = isDeleteType ? 'bg-red-500' : 'bg-blue-500';
  const textColor =
    slideProgress > 30
      ? 'text-white'
      : isDeleteType
        ? 'text-red-600'
        : 'text-blue-600';

  return (
    <AlertDialog open={open} onOpenChange={handleClose}>
      <AlertDialogContent size="default">
        <AlertDialogHeader>
          <div className="flex items-center justify-center mb-2">{icon}</div>
          <AlertDialogTitle className="text-center">{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="mt-6">
          <div className="mb-2 text-center text-xs font-medium">
            {warningText}
          </div>

          <div
            ref={containerRef}
            className="relative w-full h-14 bg-gray-100 rounded-full overflow-hidden border-2 border-gray-200 select-none"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
          >
            <div
              className={`absolute inset-0 ${bgColor} transition-all duration-75 ease-out`}
              style={{ width: `${slideProgress}%` }}
            />

            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                className={`text-sm font-semibold transition-colors ${textColor}`}
              >
                {confirmText}
              </span>
            </div>

            <div
              className="absolute top-0.5 bottom-0.5 w-12 bg-white rounded-full shadow-md flex items-center justify-center cursor-grab active:cursor-grabbing touch-none"
              style={{
                left: `${slideProgress}%`,
              }}
            >
              <ChevronRight
                className={`w-5 h-5 transition-transform ${
                  isDeleteType ? 'text-red-500' : 'text-blue-500'
                }`}
              />
            </div>
          </div>
        </div>

        <AlertDialogFooter>
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isConfirming}
            className="w-full"
          >
            Batal
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
