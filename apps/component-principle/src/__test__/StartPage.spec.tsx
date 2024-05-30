import { describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import StartPage from "@pages/index";
import { GlobalPortal } from "@/GlobalPortal";
import { MemoryRouter } from "react-router-dom";
import { afterEach } from "node:test";

function init() {
  render(<StartPage />, {
    wrapper: ({ children }) => (
      <GlobalPortal.Provider>
        <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
      </GlobalPortal.Provider>
    ),
  });
}

describe("StartPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("should do initial render", () => {
    init();
    const title = screen.getByText("home");
    expect(title).toBeDefined();
  });
});
