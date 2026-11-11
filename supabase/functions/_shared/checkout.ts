export type CheckoutItemInput = {
  productId: string;
  quantity: number;
  selectedSize: string;
};

export type CatalogProduct = {
  id: string;
  name: string;
  description: string | null;
  category: string | null;
  price: number;
  in_stock: boolean | null;
  stripe_product_id: string | null;
  stripe_price_id: string | null;
  stripe_price_amount: number | null;
};

export type ValidatedCheckoutLine = {
  product: CatalogProduct;
  quantity: number;
  selectedSize: string;
  unitAmount: number;
};

const validSizes = new Set(['S', 'M', 'L', 'XL', 'XXL', 'One Size']);

export function validateCheckoutItems(
  items: unknown,
  products: CatalogProduct[],
): ValidatedCheckoutLine[] {
  if (!Array.isArray(items) || items.length < 1 || items.length > 50) {
    throw new Error('Your bag is empty or too large.');
  }

  const productMap = new Map(products.map((product) => [product.id, product]));
  const seen = new Set<string>();
  return items.map((value) => {
    if (!value || typeof value !== 'object') throw new Error('One or more cart items are invalid.');
    const item = value as Partial<CheckoutItemInput>;
    if (
      typeof item.productId !== 'string' ||
      !/^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(item.productId) ||
      !Number.isInteger(item.quantity) || item.quantity! < 1 || item.quantity! > 20 ||
      typeof item.selectedSize !== 'string' || !validSizes.has(item.selectedSize)
    ) {
      throw new Error('One or more cart items are invalid.');
    }

    const key = `${item.productId}:${item.selectedSize}`;
    if (seen.has(key)) throw new Error('Duplicate cart items are not allowed.');
    seen.add(key);

    const product = productMap.get(item.productId);
    if (!product || product.in_stock !== true) {
      throw new Error('One or more products are unavailable. Please refresh your bag.');
    }
    if (item.selectedSize === 'One Size' && !product.category?.toLowerCase().includes('access')) {
      throw new Error('That size is not available for this product.');
    }
    if (item.selectedSize !== 'One Size' && product.category?.toLowerCase().includes('access')) {
      throw new Error('That size is not available for this product.');
    }

    const price = Number(product.price);
    const unitAmount = Math.round(price * 100);
    if (!Number.isFinite(price) || unitAmount < 1) throw new Error('A product has an invalid price.');
    return { product, quantity: item.quantity, selectedSize: item.selectedSize, unitAmount };
  });
}

export function totalInCents(lines: ValidatedCheckoutLine[]): number {
  return lines.reduce((sum, line) => sum + line.unitAmount * line.quantity, 0);
}