import OrderList from "./components/OrderList.tsx";

const comenzi = [
	{ id: 1, name: "Pizza Margherita x2", delivered: false, payment_method: "CARD_ONLINE", restaurant: "Pizza Napoli" },
	{ id: 2, name: "Sushi Platter (24 pcs)", delivered: true, payment_method: "CASH_ON_DELIVERY", restaurant: "Sushi Zen" },
	{ id: 3, name: "Double Cheeseburger + Fries", delivered: false, payment_method: "APPLE_PAY", restaurant: "Burger House" },
];

export default function App() {
  const active = comenzi.filter((comanda) => !comanda.delivered).length;

  return (
    <>
      <header className="topbar">
        <h1>Food Delivery App</h1>
        <p className="user">Comenzile mele</p>
      </header>
      <main className="container">
        <section className="card">
          <div className="list-header">
            <h2>Comenzi</h2>
            <p className="summary">
              {comenzi.length} comenzi, dintre care {active} nelivrate
            </p>
          </div>
          <OrderList comenzi={comenzi} />
        </section>
      </main>
    </>
  );
}