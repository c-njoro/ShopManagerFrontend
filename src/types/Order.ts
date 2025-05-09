export interface Order {
  _id: string;
  products: [
    {
      productId: string;
      productName: string;
      quantity: Number;
      unitPrice: Number;
      totalPrice: Number;
    }
  ];
  totalAmount: Number;
  seller: {
    id: string;
    name: string;
  };
  customer: {
    phone: Number;
    name: string;
  };
  orderedAt: Date;
}
