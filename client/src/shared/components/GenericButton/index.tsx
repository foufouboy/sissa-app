import type { MouseEventHandler } from "react";
import "./index.sass";

function GenericButton({
	onClick,
	className,
	children,
	type = "button",
	disabled = false,
}: {
	onClick?: MouseEventHandler<HTMLButtonElement>;
	className: string;
	children: React.ReactNode;
	type?: "button" | "submit" | "reset";
	disabled?: boolean;
}) {
	return (
		<button
			className={`generic-button ${className}`}
			onClick={onClick}
			type={type}
			disabled={disabled}
		>
			{children}
		</button>
	);
}

export default GenericButton;
