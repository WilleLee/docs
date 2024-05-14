import { beforeEach, describe, expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import StartPage from "@/pages";
import { MemoryRouter } from "react-router-dom";

describe("test start page", () => {
  beforeEach(() => {
    render(<StartPage />, {
      wrapper: (props) => (
        <MemoryRouter initialEntries={["/"]}>{props.children}</MemoryRouter>
      ),
    });
  });

  test("should render the page", () => {
    const heading = screen.getByText(/start page/gi);
    expect(heading).toBeDefined();
  });
});
