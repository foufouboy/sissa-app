import Modal from "@/shared/components/Modal";
import "./index.sass";

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	description?: string;
	children: React.ReactNode;
	className?: string;
}

function ConfirmModal({
	isOpen,
	onClose,
	title,
	description,
	children,
	className,
}: ConfirmModalProps) {
	return (
		<Modal isOpen={isOpen} onClose={onClose} title={title} className={className}>
			{description && (
				<p className="confirm-modal__description">{description}</p>
			)}
			<div className="confirm-modal__content">{children}</div>
		</Modal>
	);
}

export default ConfirmModal;
