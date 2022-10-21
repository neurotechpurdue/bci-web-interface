import { describe, expect, it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

test("button can be clicked", async () => {
  render(<button data-testid="button"></button>);
  const button = getByTestId("button");
  userEvent.button(hover);
  expect(button.toHaveStyleRule("")) //idk yet
});
