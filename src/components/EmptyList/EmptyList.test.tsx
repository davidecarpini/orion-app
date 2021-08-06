import { render, screen } from "@testing-library/react";
import { EmptyList } from "./EmptyList";

test("renders empty list text", () => {
  render(<EmptyList />);
  const text = screen.getByText(/No items found 😢/i);
  expect(text).toBeInTheDocument();
});
