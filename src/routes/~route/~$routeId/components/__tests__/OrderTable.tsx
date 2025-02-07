import { render } from "@testing-library/react";
import { OrderTable } from "../OrderTable";

const columnTitles: string[] = ["product name", "quantity", "unit price", "total price"];
test("display table columns", () => {
  const { getByText } = render(<OrderTable />);

  columnTitles.forEach((title) => getByText(title, { exact: false }));
});
