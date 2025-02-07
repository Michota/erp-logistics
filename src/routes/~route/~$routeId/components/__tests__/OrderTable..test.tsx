import { render, screen } from "@testing-library/react";
import { OrderTable } from "../OrderTable";

type Product = {
  id: string;
  name: string;
  variant?: string;
  quantity: number;
  price: number;
};

const columnTitles: string[] = ["product name", "quantity", "unit price", "total price"];
const products: Product[] = [
  { id: "water", name: "Water", price: 2, quantity: 4 },
  { id: "appleJuice", name: "Juice", variant: "apple", price: 5, quantity: 3 },
  { id: "orangeJuice", name: "Juice", variant: "orange", price: 7, quantity: 7 },
];
test("display table columns", () => {
  const { getByText } = render(<OrderTable />);

  columnTitles.forEach((title) => getByText(title, { exact: false }));
});

test("display product prices correctly", () => {
  const { getByTestId } = render(<OrderTable />);

  /* const productValues: number[] = */ products.map((product) => {
    const productElement = getByTestId(`total-${product.id}-price`);

    if (!productElement) {
      throw new Error(`There is no element that would represent ${product.name} (id: ${product.id})`);
    }

    const price = Number(productElement.textContent);

    if (isNaN(price)) {
      throw new Error(`Found ${product.name} is not a number!`);
    }

    expect(price).toBe(product.price);
  });
});
