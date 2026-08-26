import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

const { pushMock } = vi.hoisted(() => ({
  pushMock: vi.fn(),
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({ push: pushMock }),
}));

describe("RoomPageHeader", () => {
  beforeEach(() => {
    pushMock.mockReset();
  });

  it("exposes a native link when the back arrow is clicked", async () => {
    const user = userEvent.setup();
    const { RoomPageHeader } = await import("./RoomPageHeader");

    render(
      <RoomPageHeader
        title="Recommendations"
        subtitle="FoodFight status"
        backHref="/room/room-1"
      />,
    );

    await user.click(screen.getByRole("link", { name: "Back" }));

    expect(screen.getByRole("link", { name: "Back" })).toHaveAttribute(
      "href",
      "/room/room-1",
    );
    expect(pushMock).not.toHaveBeenCalled();
  });
});
