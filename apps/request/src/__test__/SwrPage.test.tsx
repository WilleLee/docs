import * as usePosts from "@libs/swr/usePosts";
import SwrPage from "@pages/SwrPage";
import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, test, vi } from "vitest";
import { wrapper } from "./libs/renderUI";

function init() {
  const { unmount } = render(<SwrPage />, {
    wrapper: (props) => wrapper(props, "/swr"),
  });
  return { unmount };
}

describe("SwrPage", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });
  test("should do the initial render", async () => {
    const { unmount } = init();

    const heading = screen.getAllByText("swr page");
    expect(heading).toHaveLength(1);

    unmount();
  });

  test("should render the page with posts", async () => {
    vi.spyOn(usePosts, "default").mockReturnValue({
      posts: [
        { id: 1, userId: 333, title: "title1", body: "body1" },
        { id: 2, userId: 333, title: "title2", body: "body2" },
      ],
      loading: false,
      isValidating: false,
    });
    const { unmount } = init();

    const title1 = screen.getAllByText("title1");
    const title2 = screen.getAllByText("title2");

    expect(title1).toHaveLength(1);
    expect(title2).toHaveLength(1);

    unmount();
  });

  test("should render a loading indicator when loading", async () => {
    vi.spyOn(usePosts, "default").mockReturnValue({
      posts: undefined,
      loading: true,
      isValidating: false,
    });

    const { unmount } = init();

    const loadingIndicator = screen.getAllByTestId(
      "posts_loading_indicator",
    )[0];
    expect(loadingIndicator).toBeDefined();

    unmount();
  });
});
