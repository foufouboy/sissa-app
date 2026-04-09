import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import "./index.sass";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	className?: string;
}

function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
	const dialogRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		if (!isOpen) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") onClose();
		};

		document.addEventListener("keydown", handleKeyDown);
		document.body.style.overflow = "hidden";

		return () => {
			document.removeEventListener("keydown", handleKeyDown);
			document.body.style.overflow = "";
		};
	}, [isOpen, onClose]);

	useEffect(() => {
		if (isOpen) {
			dialogRef.current?.focus();
		}
	}, [isOpen]);

	if (!isOpen) return null;

	return createPortal(
		<div
			className="modal-overlay"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
			aria-hidden="true"
		>
			<div
				ref={dialogRef}
				className={["modal", className].filter(Boolean).join(" ")}
				role="dialog"
				aria-modal="true"
				aria-labelledby="modal-title"
				tabIndex={-1}
			>
				<div className="modal__header">
					<h2 id="modal-title" className="modal__title">
						{title}
					</h2>
					<button
						type="button"
						className="modal__close"
						onClick={onClose}
						aria-label="Fermer"
					>
						<X className="modal__close-icon" />
					</button>
				</div>
				<div className="modal__body">{children}</div>
			</div>
		</div>,
		document.body,
	);
}

export default Modal;
