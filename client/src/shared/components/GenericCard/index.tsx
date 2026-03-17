import { useState } from "react";
import "./index.sass";

interface GenericCardProps {
	title: string;
	className?: string;
	children: React.ReactNode;
	collapsible?: boolean;
	defaultOpen?: boolean;
}

function GenericCard({
	title,
	className,
	children,
	collapsible = false,
	defaultOpen = true,
}: GenericCardProps) {
	const [isOpen, setIsOpen] = useState(defaultOpen);

	if (!collapsible) {
		return (
			<div className={`generic-card ${className || ""}`}>
				<h3 className="generic-card-title">{title}</h3>
				{children}
			</div>
		);
	}

	return (
		<div className={`generic-card collapsible ${className || ""}`}>
			<div
				className="generic-card-header"
				onClick={() => setIsOpen(!isOpen)}
			>
				<h3 className="generic-card-title">{title}</h3>
				<button
					className={`dropdown-toggle ${isOpen ? "open" : ""}`}
					aria-label={isOpen ? "Fermer" : "Ouvrir"}
					aria-expanded={isOpen}
				>
					▼
				</button>
			</div>
			{isOpen && <div className="generic-card-content-collapsible">{children}</div>}
		</div>
	);
}

export default GenericCard;
