import type { MouseEventHandler } from "react";
import "./index.sass";

function GenericButton({
	onClick,
	className,
	children,
	type = "button",
	disabled = false,
	variant = "primary",
}: {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className: string;
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
	variant?: "primary" | "danger";
}) {
	return (
		<button
			className={`generic-button generic-button--${variant} ${className}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default GenericButton;
