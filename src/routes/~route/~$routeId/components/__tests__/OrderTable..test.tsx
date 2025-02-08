import { render } from "@testing-library/react";
import { OrderTable } from "../OrderTable";
import { Skip } from "@/types/utils";

interface WarehouseItem {
  id: string;
  name: string;
  variant?: string;
  quantity: number;
}

interface Product extends Skip<WarehouseItem, "quantity"> {
  price: number;
}

const columnTitles: string[] = ["product name", "quantity", "unit price", "total price"];

const warehouse: WarehouseItem[] = [
  { id: "water", name: "Water", quantity: 4 },
  { id: "appleJuice", name: "Juice", variant: "apple", quantity: 3 },
  { id: "orangeJuice", name: "Juice", variant: "orange", quantity: 7 },
];

const products: Product[] = [
  { id: "water", name: "Water", price: 2 },
  { id: "appleJuice", name: "Juice", variant: "apple", price: 5 },
  { id: "orangeJuice", name: "Juice", variant: "orange", price: 7 },
];

test("display table columns", () => {
  const { getByText } = render(<OrderTable />);

  columnTitles.forEach((title) => getByText(title, { exact: false }));
});

test("display product prices", () => {
  const { getByTestId } = render(<OrderTable />);

  products.forEach((product) => {
    const productElement = getByTestId(`total-${product.id}-price`);

    const price = Number(productElement.textContent);

    if (isNaN(price)) {
      throw new Error(`Found ${product.name} is not a number!`);
    }

    expect(price).toBe(product.price);
  });
});

test("display product names", () => {
  const { getByText } = render(<OrderTable />);

  products.forEach((product) => getByText(product.name));
});

test("display sum of products", () => {
  const { getByDisplayValue } = render(<OrderTable />);

  getByDisplayValue(
    products.reduce((acc, curr) => {
      return acc + curr.price;
    }, 0),
  );
});

test("display storage amount", () => {
  const { getByTestId } = render(<OrderTable />);

  products.forEach((product) => {
    const storageAmountElement = getByTestId(`storage-amount-${product.id}`);

    const productInWarehouse = warehouse.find((item) => item.id === product.id);

    if (!productInWarehouse) {
      throw new Error("There has to be the same product in warehouse!");
    }

    expect(Number(storageAmountElement.textContent)).toBe(productInWarehouse.quantity);
  });
});
