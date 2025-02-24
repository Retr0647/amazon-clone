import  {getProduct} from "../../data/products.js";
import { loadProductsFetch } from "../../data/products.js";

describe('test suite: getProduct', () => {
const productId1 = 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6';
const productName1 = 'Black and Gray Athletic Cotton Socks - 6 Pairs';

    beforeAll(async () => {
            await loadProductsFetch();
    });

    it('gets the product from the product list', () => {
        expect(getProduct(productId1).id).toEqual(productId1);
        expect(getProduct(productId1).name).toEqual(productName1);
        expect(getProduct(productId1).rating.stars).toEqual(4.5);
        expect(getProduct(productId1).rating.count).toEqual(87);
        expect(getProduct(productId1).priceCents).toEqual(1090);
    });
})