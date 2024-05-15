import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StartPage from "@pages/index";
import { MemoryRouter } from "react-router-dom";

const mockPush = vi.fn();

vi.mock("hooks/useNav", () => {
  return {
    default: () => ({
      push: mockPush,
    }),
  };
});

describe("test StartPage component", () => {
  beforeEach(() => {
    render(<StartPage />, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={["/"]}>{children}</MemoryRouter>
      ),
    });
  });
  afterEach(() => {
    vi.clearAllMocks();
  });

  test("should render the page", async () => {
    const button = (await screen.findAllByRole("button"))[0];
    expect(button).toBeDefined();
  });

  test("should navigate users to the target page when clicked", async () => {
    const button1 = (
      await screen.findAllByRole("button", {
        name: /xmlhttprequest/gi,
      })
    )[0];
    expect(button1).toBeDefined();
    await userEvent.click(button1);
    expect(mockPush.mock.lastCall[0]).toEqual("/xml");

    const button2 = (
      await screen.findAllByRole("button", {
        name: /xml promise/gi,
      })
    )[0];
    expect(button2).toBeDefined();
    await userEvent.click(button2);
    expect(mockPush.mock.lastCall[0]).toEqual("/xmlpromise");

    const button3 = (
      await screen.findAllByRole("button", { name: /fetch/gi })
    )[0];
    expect(button3).toBeDefined();
    await userEvent.click(button3);
    expect(mockPush.mock.lastCall[0]).toEqual("/fetch");

    const button4 = (
      await screen.findAllByRole("button", {
        name: /fetch async/gi,
      })
    )[0];
    expect(button4).toBeDefined();
    await userEvent.click(button4);
    expect(mockPush.mock.lastCall[0]).toEqual("/fetchasync");
  });
});
