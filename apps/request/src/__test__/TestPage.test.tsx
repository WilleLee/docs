import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import * as handlers from "@server/handlers";
import TestPage from "@pages/TestPage";
import { MemoryRouter } from "react-router-dom";

describe("test testpage component", () => {
  beforeEach(() => {
    vi.spyOn(handlers, "getPosts").mockReturnValue(
      new Promise((resolve) =>
        resolve({
          ok: true,
          data: [
            { id: 0, title: "hihi", body: "hihihi", userId: 322 },
            {
              id: 1,
              title: "byebye",
              body: "byebyebye",
              userId: 221,
            },
          ],
        }),
      ),
    );
    vi.spyOn(handlers, "getTodos").mockReturnValue(
      new Promise((resolve) =>
        resolve({
          ok: true,
          data: [
            {
              id: 0,
              userId: 3339,
              title: "tododo",
              completed: false,
            },
          ],
        }),
      ),
    );
    render(<TestPage />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/test"]}>{children}</MemoryRouter>
      ),
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("should render page with post items", async () => {
    const title1 = (await screen.findAllByText(/hihi/gi))[0];
    expect(title1).toBeDefined();
    const title2 = (await screen.findAllByText(/byebye/gi))[0];
    expect(title2).toBeDefined();
  });
  test("should render page with todo items", async () => {
    const todoTitle = (await screen.findAllByText(/tododo/gi))[0];
    expect(todoTitle).toBeDefined();
  });
});
