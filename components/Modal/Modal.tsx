"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";
import css from "./Modal.module.css";

interface NoteModalProps { children: ReactNode; onClose: () => void; }

export default function NoteModal({ children, onClose }: NoteModalProps) {
    useEffect(() => {
        const originalBodyOverflow = document.body.style.overflow;
        
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = originalBodyOverflow;
        };
    }, []);
    
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === "Escape") { onClose(); }
        };
        
        window.addEventListener("keydown", handleEsc);

        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [onClose]);
    
    return createPortal(
        <div className={css.backdrop} onClick={onClose}>
            <div className={css.modal} onClick={(event) => event.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
}