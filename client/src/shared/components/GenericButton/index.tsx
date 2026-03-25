import "./index.sass";
function GenericButton({
	onClick,
	className,
	children,
}: {
	onClick?: () => void;
	className: string;
	children: React.ReactNode;
}) {
	return (
		<button className={`generic-button ${className}`} onClick={onClick}>
			{children}
		</button>
	);
}

export default GenericButton;
