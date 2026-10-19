import OrderCard, { type Order } from "./OrderCard.tsx";

export default function OrderList({ comenzi }: { comenzi: Order[] }) {
	if (comenzi.length === 0) {
		return <p className="empty-state">Nu există nicio comandă.</p>;
	}

	return (
		<ul className="order-list">
			{comenzi.map((comanda) => (
				<OrderCard key={comanda.id} comanda={comanda} />
			))}
		</ul>
	);
}
