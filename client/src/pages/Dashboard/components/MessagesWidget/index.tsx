import GenericButton from "@/shared/components/GenericButton";
import GenericCard from "@/shared/components/GenericCard";
import "./index.sass";
import { truncateString } from "@/shared/utils/utils";
import { Link } from "react-router";

function MessagesWidget({ messages }) {
	const { unreadCount, recentMessages } = messages;

	return (
		<GenericCard
			title={`Boîte de réception${unreadCount ? ` (${unreadCount})` : ""}`}
			className="inbox-widget"
		>
			<div className="generic-card-content">
				<div className="messages-list">
					{recentMessages.map((message: any) => (
						<div className="message-item" key={message.id}>
							<div className="message-item-header">
								<h4 className="message-item-title">
									{message.subject}
								</h4>
								<div className="message-item-badges">
									{message.status !== "read" && (
										<span className="message-item-status">
											Non lu
										</span>
									)}
									<span className="message-item-badge">
										{message.infoType === "info"
											? "Info"
											: message.infoType === "event"
												? "Événement"
												: message.infoType}
									</span>
								</div>
							</div>
							<p className="message-item-body">
								{truncateString(message.body, 80)}
							</p>
						</div>
					))}
				</div>
				<GenericButton className="generic-button-primary">
					<Link to="/notifications">Voir plus</Link>
				</GenericButton>
			</div>
		</GenericCard>
	);
}

export default MessagesWidget;
