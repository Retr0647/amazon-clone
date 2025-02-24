import {renderOrderSummary} from './checkout/orderSummary.js'
import {renderPaymentSummary} from './checkout/paymentSummary.js';
import {loadProductsFetch, loadProducts} from '../data/products.js';
import {loadCart} from '../data/cart.js';
// import '../data/cart-class.js';
// import '../data/backend-practice.js';

async function loadPage() {
    try {
        // throw 'error1;

        await loadProductsFetch();

        await new Promise((resolve, reject) => {
            loadCart(() => {
                // reject('error2');
                resolve();
            });
        });
    } catch (error) {
        console.log('Unexpected error. Please try again later.');
    }
    
    renderOrderSummary();
    renderPaymentSummary();
}

loadPage();

/*
Promise.all([
    loadProductsFetch(),

    new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    })

]).then(() => {
    renderOrderSummary();
    renderPaymentSummary();   
});
*/

/*
new Promise((resolve) => {
    loadProducts(() => {
        resolve();
    });

}).then(() => {
    return new Promise((resolve) => {
        loadCart(() => {
            resolve();
        });
    });

}).then(() => {
    renderOrderSummary();
    renderPaymentSummary();   
});

loadProducts(() => {
    loadCart(() => {
        renderOrderSummary();
        renderPaymentSummary();    
    });
});
*/