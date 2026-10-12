"use client";
import { useEffect, useRef, type ReactNode } from "react";
import { X } from "lucide-react";

export function Dialog({ children, onClose, labelledBy, className = "" }: { children: ReactNode; onClose: () => void; labelledBy: string; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  const closeRef = useRef(onClose);
  useEffect(() => { closeRef.current = onClose; }, [onClose]);
  useEffect(() => {
    const dialog = ref.current;
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = "hidden";
    return () => { dialog?.close(); document.body.style.overflow = overflow; previous?.focus(); };
  }, []);
  return <dialog ref={ref} className={`dialog ${className}`} aria-labelledby={labelledBy} onCancel={event => { event.preventDefault(); closeRef.current(); }} onClick={event => {
    if (event.target === event.currentTarget) {
      const box = event.currentTarget.getBoundingClientRect();
      if (event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom) onClose();
    }
  }}>
    <button className="icon-button dialog-close" onClick={onClose} aria-label="Fechar janela"><X size={21} /></button>
    {children}
  </dialog>;
}
