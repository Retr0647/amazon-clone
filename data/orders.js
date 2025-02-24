export const orders = JSON.parse(localStorage.getItem('orders')) || [
    {
        id: "e1643716-37d3-49ae-97ee-65d5034f87ca",
        orderTime: "2025-02-24T15:41:59.643Z",
        totalCostCents: 5251,
        products: [
            {
                productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                quantity: 2,
                estimatedDeliveryTime: "2025-03-03T15:41:59.643Z","variation":null
            },
            {
                productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                quantity: 1,
                estimatedDeliveryTime: "2025-03-03T15:41:59.643Z","variation":null
            }
            ]
    }
];

export function addOrder(orderObject) {
    orders.unshift(orderObject);
    saveToStorage();
}

export function getOrder(orderId) {
    let matchingOrder;
    
    orders.forEach((order) => {
        if (order.id === orderId) {
            matchingOrder = order;
        }
    });

    return matchingOrder;
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}