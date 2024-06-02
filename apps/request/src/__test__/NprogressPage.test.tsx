import { GlobalPortal } from "@/GlobalPortal";
import NprogressPage from "@pages/NprogressPage";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { afterEach, describe, expect, test, vi } from "vitest";
import * as usePosts from "@pages/NprogressPage/usePosts";
import userEvent from "@testing-library/user-event";

const mockPush = vi.fn();

vi.mock("@hooks/useNav", () => {
  return {
    default: () => ({
      push: mockPush,
    }),
  };
});

function init() {
  const { unmount } = render(<NprogressPage />, {
    wrapper: ({ children }) => (
      <GlobalPortal.Provider>
        <MemoryRouter initialEntries={["/nprogress"]}>{children}</MemoryRouter>
      </GlobalPortal.Provider>
    ),
  });
  return { unmount };
}

describe("NprogressPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
    vi.clearAllTimers();
  });
  test("should render the posts list", async () => {
    vi.spyOn(usePosts, "default").mockReturnValue({
      posts: [{ id: 1, userId: 33, title: "title1", body: "body1" }],
      isLoading: false,
      isError: false,
      error: undefined,
    });
    const { unmount } = init();
    const title = screen.getAllByTestId("post_title")[0];
    expect(title.innerHTML).toStrictEqual("title1");
    const body = screen.getAllByTestId("post_body")[0];
    expect(body.innerHTML).toStrictEqual("body1");
    unmount();
  });
  test("should render a loading UI when loading", async () => {
    vi.spyOn(usePosts, "default").mockReturnValue({
      posts: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
    });
    const { unmount } = init();
    const loading = screen.getAllByTestId("loading");
    expect(loading).toHaveLength(1);
    unmount();
  });
  test("should render an error UI when error", async () => {
    vi.spyOn(usePosts, "default").mockReturnValue({
      posts: undefined,
      isLoading: false,
      isError: true,
      error: { message: "error message" },
    });
    const { unmount } = init();
    const refreshButton = screen.getAllByTestId("refresh_button");
    expect(refreshButton).toHaveLength(1);
    const errorMessage = screen.getAllByTestId("error_message");
    expect(errorMessage[0].innerHTML).toStrictEqual("error message");
    unmount();
  });
  test("should call push when clicking the post box", async () => {
    vi.spyOn(usePosts, "default").mockReturnValue({
      posts: [{ id: 1, userId: 33, title: "title1", body: "body1" }],
      isLoading: false,
      isError: false,
      error: undefined,
    });
    const { unmount } = init();
    const postBox = screen.getByTestId("post_container");
    await userEvent.click(postBox);
    await waitFor(async () => {
      expect(mockPush.mock.calls[0][0]).toStrictEqual("/nprogress/1");
    });
    unmount();
  });
});
