import "./index.sass";

function GenericCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="generic-card">
      <h3 className="generic-card-title">{title}</h3>
      {children}
    </div>
  );
}

export default GenericCard;
