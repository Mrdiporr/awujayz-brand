import { describe, expect, it } from 'bun:test';
import { totalInCents, validateCheckoutItems, type CatalogProduct } from './checkout';

const productId = '123e4567-e89b-42d3-a456-426614174000';
const catalog: CatalogProduct[] = [{
  id: productId,
  name: 'Potion Tee',
  description: null,
  category: 'Apparel',
  price: 24.99,
  in_stock: true,
  stripe_product_id: null,
  stripe_price_id: null,
  stripe_price_amount: null,
}];

describe('Magic Potion checkout validation', () => {
  it('prices from the catalog rather than accepting a client price', () => {
    const lines = validateCheckoutItems([{ productId, quantity: 2, selectedSize: 'M', price: 0.01 }], catalog);
    expect(lines[0]?.unitAmount).toBe(2499);
    expect(totalInCents(lines)).toBe(4998);
  });

  it('rejects quantities above the 20-per-line limit', () => {
    expect(() => validateCheckoutItems([{ productId, quantity: 21, selectedSize: 'M' }], catalog)).toThrow();
  });

  it('rejects an unavailable catalog item', () => {
    expect(() => validateCheckoutItems([{ productId, quantity: 1, selectedSize: 'M' }], [{ ...catalog[0]!, in_stock: false }])).toThrow();
  });

  it('rejects unsupported apparel sizes', () => {
    expect(() => validateCheckoutItems([{ productId, quantity: 1, selectedSize: 'XXXL' }], catalog)).toThrow();
  });
});