export type Order = {
	id: number;
	name: string;
	delivered: boolean;
	payment_method: string;
	restaurant: string;
};

type OrderCardProps = {
	comanda: Order;
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
};

export default function OrderCard({ comanda, onToggle, onDelete }: OrderCardProps) {
	return (
		<li className={comanda.delivered ? "order done" : "order"}>
			<label className="task-main">
				<input
					type="checkbox"
					checked={comanda.delivered}
					onChange={() => onToggle(comanda.id)}
				/>
				<span className="name">{comanda.name}</span>
			</label>
			<span className="tag">
				{comanda.delivered ? "Livrată" : "În livrare"}
			</span>
			<span className="restaurant">{comanda.restaurant}</span>
			<span className="tag">{comanda.payment_method}</span>
			<button
				type="button"
				className="btn-danger"
				onClick={() => onDelete(comanda.id)}
			>
				Șterge
			</button>
		</li>
	);
}
