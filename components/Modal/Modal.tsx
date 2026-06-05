// "use client";

// import css from "./NoteModal.module.css";
// import { useEffect } from "react";
// import { createPortal } from "react-dom";

// interface ModalProps {
//   children: React.ReactNode;
//   onClose: () => void;
// }

// const modalRoot = document.getElementById("modal-root")!;
// export default function Modal({ children, onClose }: ModalProps) {
//     useEffect(() => {
//         const handleEsc = (event: KeyboardEvent) => {
//             if (event.key === "Escape") { onClose() }
//         };
//     window.addEventListener("keydown", handleEsc);
//     document.body.style.overflow = "hidden";
//     return () => {
//         window.removeEventListener("keydown", handleEsc);
//             document.body.style.overflow = "auto";
//         };
//     }, [onClose]);

//     const handleBackdropClick = (event: React.MouseEvent<HTMLDivElement>) => {
//         if (event.target === event.currentTarget) { onClose(); }
//     };
    
//     return createPortal(
//         <div className={css.backdrop} role="dialog" aria-modal="true" onClick={handleBackdropClick}>
//             <div className={css.modal}> {children} </div>
//         </div>,
//         modalRoot);
// }

"use client";

import { useEffect, ReactNode } from "react";
import { createPortal } from "react-dom";
import css from "./NoteModal.module.css";

interface ModalProps {
    children: ReactNode;
    onClose: () => void;
    }

    export default function NoteModal({ children, onClose,}: ModalProps) {
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
        if (event.key === "Escape") {
            onClose();
        }
        };

        window.addEventListener("keydown", handleEsc);

        return () => { window.removeEventListener("keydown", handleEsc); };
    }, [onClose]);

    if (typeof document === "undefined") {return null;}

    return createPortal(
        <div  className={css.backdrop} onClick={onClose}>
            <div className={css.modal} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>,
        document.body
    );
    }