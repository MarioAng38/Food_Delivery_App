export type Order = {
	id: number;
	name: string;
	delivered: boolean;
	payment_method: string;
	restaurant: string;
};

export default function OrderCard({ comanda }: { comanda: Order }) {
	return (
		<li className={comanda.delivered ? "order done" : "order"}>
			<span className="name">{comanda.name}</span>
			<span className="tag">
				{comanda.delivered ? "Livrată" : "În livrare"}
			</span>
			<span className="restaurant">{comanda.restaurant}</span>
			<span className="tag">{comanda.payment_method}</span>
		</li>
	);
}
