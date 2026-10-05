const METODE_PLATA = ["CARD_ONLINE", "CASH_ON_DELIVERY", "APPLE_PAY"];
const RESTAURANTE = ["Pizza Napoli", "Sushi Zen", "Burger House"];

const comenzi = [
	{ id: 1, name: "Pizza Margherita x2", delivered: false, payment_method: "CARD_ONLINE", restaurant: "Pizza Napoli" },
	{ id: 2, name: "Sushi Platter (24 pcs)", delivered: true, payment_method: "CASH_ON_DELIVERY", restaurant: "Sushi Zen" },
	{ id: 3, name: "Double Cheeseburger + Fries", delivered: false, payment_method: "APPLE_PAY", restaurant: "Burger House" },
];

function listeazaNume(lista) {
	return lista.map((c) => c.name);
}

function numaraNelivrate(lista) {
	return lista.filter((c) => !c.delivered).length;
}

function cautaDupaNume(lista, text) {
	const cautat = text.toLowerCase();
	return lista.filter(
		(c) => c.name.toLowerCase().includes(cautat) || c.restaurant.toLowerCase().includes(cautat)
	);
}

function nextId(lista) {
	return lista.reduce((max, c) => Math.max(max, c.id), 0) + 1;
}

function adaugaComanda(lista, name, payment_method = "CARD_ONLINE", restaurant = RESTAURANTE[0]) {
	const numeCurat = name.trim();
	if (numeCurat === "") {
		console.log("Eroare: numele comenzii nu poate fi gol.");
		return lista;
	}
	if (numeCurat.length > 100) {
		console.log("Eroare: numele comenzii are peste 100 de caractere.");
		return lista;
	}
	if (!METODE_PLATA.includes(payment_method)) {
		console.log(`Eroare: metoda de plată „${payment_method}” nu există.`);
		return lista;
	}
	if (!RESTAURANTE.includes(restaurant)) {
		console.log(`Eroare: restaurantul „${restaurant}” nu există.`);
		return lista;
	}
	const noua = { id: nextId(lista), name: numeCurat, delivered: false, payment_method, restaurant };
	return [...lista, noua];
}

function comutaLivrata(lista, id) {
	return lista.map((c) => (c.id === id ? { ...c, delivered: !c.delivered } : c));
}

function stergeComanda(lista, id) {
	return lista.filter((c) => c.id !== id);
}

// Teste consola
console.log("--- Citire ---");
console.log("Comenzi:", listeazaNume(comenzi).join(", "));
console.log("Nelivrate:", numaraNelivrate(comenzi));
console.log("Căutare 'pizza':", listeazaNume(cautaDupaNume(comenzi, "pizza")).join(", "));

console.log("--- Adăugare ---");
let lista = adaugaComanda(comenzi, "Pad Thai cu pui", "APPLE_PAY", "Sushi Zen");
console.log("Lista nouă:", lista.length, "comenzi");
console.log("Originalul a rămas cu:", comenzi.length, "comenzi");

console.log("--- Modificare și ștergere ---");
lista = comutaLivrata(lista, 1);
console.log("După livrarea id 1, nelivrate:", numaraNelivrate(lista));
lista = stergeComanda(lista, 3);
console.log("După ștergerea id 3:", listeazaNume(lista).join(", "));
console.log("Id-ul următor (max + 1):", nextId(lista));

console.log("--- Validare ---");
adaugaComanda(lista, "   ");
adaugaComanda(lista, "Ceva", "BITCOIN");
