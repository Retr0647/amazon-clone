import {products, getProduct, loadProductsFetch} from "../data/products.js";
import {orders, getOrder} from "../data/orders.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

export async function loadTrackingPage() {
    await loadProductsFetch();

    const url = new URL(window.location.href);
    const orderId = url.searchParams.get('orderId');
    const productId = url.searchParams.get('productId');

    const order = getOrder(orderId);
    const product = getProduct(productId);

    let productDetails;
    order.products.forEach((details) => {
        if (details.productId === product.id) {
            productDetails = details;
        }
    })  

    const deliveryTimeString = dayjs(productDetails.estimatedDeliveryTime).format('dddd, MMMM D');

    const trackingPageHTML = `
        <div class="order-tracking">
            <a class="back-to-orders-link link-primary" href="orders.html">
                View all orders
            </a>

            <div class="delivery-date">
                Arriving on ${deliveryTimeString}
            </div>

            <div class="product-info">
                ${product.name}
            </div>

            <div class="product-info">
                Quantity: ${productDetails.quantity}
            </div>

            <img class="product-image" src="${product.image}">

            <div class="progress-labels-container">
                <div class="progress-label ${
                    calculateProgress(order, productDetails) < 50 ? 'current-status' : ''
                }">
                    Preparing
                </div>
                <div class="progress-label ${
                    calculateProgress(order, productDetails) >= 50 && calculateProgress(order, productDetails) < 100 ?'current-status' : ''
                }">
                    Shipped
                </div>
                <div class="progress-label ${
                    calculateProgress(order, productDetails) >= 100 ? 'current-status' : ''
                }">
                    Delivered
                </div>
            </div>

            <div class="progress-bar-container">
                <div class="progress-bar js-progress-bar" style="width: ${calculateProgress(order, productDetails)}%"></div>
            </div>
        </div>
    `;

    document.querySelector('.js-main').innerHTML = trackingPageHTML;
}

loadTrackingPage();

function calculateProgress(order, productDetails) {
    const currentTime = dayjs();
    const orderTime = dayjs(order.orderTime);
    const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);

    const deliveryProgress = ((currentTime - orderTime) / (deliveryTime - orderTime)) * 100;

    return deliveryProgress;
}