import "./index.sass";

function GenericCard({
	title,
	className,
	children,
}: {
	title: string;
	className?: string;
	children: React.ReactNode;
}) {
	return (
		<div className={`generic-card ${className}`}>
			<h3 className="generic-card-title">{title}</h3>
			{children}
		</div>
	);
}

export default GenericCard;
