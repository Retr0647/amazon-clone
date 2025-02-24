export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrder(orderObject) {
    orders.unshift(orderObject);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}