import { useCallback, useEffect, useRef, useState } from "react";
import { useFetcher, useLoaderData, useRevalidator } from "react-router";
import type { GamePageGame } from "./components/GamePageList";
import GamePageList from "./components/GamePageList";
import GamePageViewer from "./components/GamePageViewer";
import GamePGNEditor from "./components/GamePGNEditor";
import GenericButton from "@/shared/components/GenericButton";
import CreateGameModal, {
	type CreateGameData,
} from "@/shared/components/modals/CreateGameModal";
import DeleteGameModal from "@/shared/components/modals/DeleteGameModal";
import UpdatePgnModal from "@/shared/components/modals/UpdatePgnModal";
import "./style.sass";

function sortByCreatedAt(games: GamePageGame[]): GamePageGame[] {
	return [...games].sort((a, b) => {
		const dateA = a.createdAt ? new Date(a.createdAt).getTime() : 0;
		const dateB = b.createdAt ? new Date(b.createdAt).getTime() : 0;
		return dateB - dateA;
	});
}

function normalizeGames(raw: unknown): GamePageGame[] {
	if (raw == null) return [];
	if (Array.isArray(raw)) return sortByCreatedAt(raw as GamePageGame[]);
	if (typeof raw === "object" && "recentGames" in (raw as object)) {
		const r = raw as { recentGames?: GamePageGame[] };
		return Array.isArray(r.recentGames)
			? sortByCreatedAt(r.recentGames)
			: [];
	}
	return [];
}

type ModalType = "updatePgn" | "create" | "delete" | null;

function Games() {
	const { games: gamesRaw } = useLoaderData() as { games: unknown };
	const games = normalizeGames(gamesRaw);
	const fetcher = useFetcher();
	const revalidator = useRevalidator();

	const [selectedGame, setSelectedGame] = useState<GamePageGame | null>(null);
	const [pgnDraft, setPgnDraft] = useState("");
	const [viewerPgn, setViewerPgn] = useState("");
	const [activeModal, setActiveModal] = useState<ModalType>(null);

	const intentRef = useRef<ModalType>(null);
	const isSubmitting = fetcher.state !== "idle";

	useEffect(() => {
		if (!selectedGame) {
			setPgnDraft("");
			setViewerPgn("");
			return;
		}
		setPgnDraft(selectedGame.pgn ?? "");
		setViewerPgn(selectedGame.pgn ?? "");
	}, [selectedGame]);

	useEffect(() => {
		if (
			fetcher.state !== "idle" ||
			!fetcher.data?.message ||
			!intentRef.current
		)
			return;

		const intent = intentRef.current;
		setActiveModal(null);

		if (intent === "updatePgn") setViewerPgn(pgnDraft);
		if (intent === "delete") {
			setSelectedGame(null);
			revalidator.revalidate();
		}
		if (intent === "create") revalidator.revalidate();

		intentRef.current = null;
	}, [fetcher.state, fetcher.data, pgnDraft]);

	const submit = useCallback(
		(intent: ModalType, extra: Record<string, string> = {}) => {
			if (!intent) return;
			intentRef.current = intent;
			fetcher.submit(
				{ _intent: intent, ...extra },
				{ method: "post", action: "/games" },
			);
		},
		[fetcher],
	);

	const closeModal = useCallback(() => setActiveModal(null), []);

	const fetcherError = fetcher.data?.error as string | undefined;

	return (
		<div className="games">
			<div className="games-header">
				<h1 className="title">Parties</h1>
				<p className="subtitle">Gérez vos parties d'échecs ici !</p>
			</div>

			<div className="games-page-content">
				<GamePageViewer
					pgn={viewerPgn}
					gameDate={selectedGame?.gameDate}
					event={selectedGame?.event}
				/>

				<div className="games-viewer-actions">
					<GenericButton
						className="games-viewer-actions__btn"
						variant="primary"
						onClick={() => setActiveModal("create")}
					>
						Nouvelle partie
					</GenericButton>
					{selectedGame && (
						<GenericButton
							className="games-viewer-actions__btn"
							variant="danger"
							onClick={() => setActiveModal("delete")}
						>
							Supprimer la partie
						</GenericButton>
					)}
				</div>

				<GamePageList
					games={games}
					selectedGameId={selectedGame?.id ?? null}
					onSelectGame={setSelectedGame}
				/>
				{selectedGame && (
					<GamePGNEditor
						value={pgnDraft}
						onChange={setPgnDraft}
						onModify={() => setActiveModal("updatePgn")}
					/>
				)}
			</div>

			<CreateGameModal
				isOpen={activeModal === "create"}
				onClose={closeModal}
				isSubmitting={isSubmitting}
				error={activeModal === "create" ? fetcherError : undefined}
				message={
					activeModal === "create" ? fetcher.data?.message : undefined
				}
				onConfirm={(data: CreateGameData) => submit("create", data)}
			/>

			<DeleteGameModal
				isOpen={activeModal === "delete"}
				onClose={closeModal}
				selectedGame={selectedGame}
				isSubmitting={isSubmitting}
				error={activeModal === "delete" ? fetcherError : undefined}
				onConfirm={() => submit("delete", { gameId: selectedGame!.id })}
			/>

			<UpdatePgnModal
				isOpen={activeModal === "updatePgn"}
				onClose={closeModal}
				selectedGame={selectedGame}
				pgnDraft={pgnDraft}
				isSubmitting={isSubmitting}
				error={activeModal === "updatePgn" ? fetcherError : undefined}
				onConfirm={() =>
					submit("updatePgn", {
						gameId: selectedGame!.id,
						pgn: pgnDraft,
					})
				}
			/>
		</div>
	);
}

export default Games;
