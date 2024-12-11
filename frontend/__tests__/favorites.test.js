/**
 * @jest-environment jsdom
 */
import {describe, expect, it, jest, beforeEach} from "@jest/globals";
import {MemoryRouter} from "react-router-dom";
import {render, screen, waitFor} from "@testing-library/react";
import {getUsersFavLaunch} from "../src/api/backend_calls.js";
import Favorites from "../src/components/favorites.jsx";
import React from "react";

jest.mock("../src/api/backend_calls.js", () => ({
  getUsersFavLaunch: jest.fn(),
}));

describe("Favorites component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("displays loading state while fetching data", () => {
    getUsersFavLaunch.mockResolvedValueOnce([]);

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    const main = screen.getByRole("main");
    expect(main.classList.contains("loading-page")).toBeTruthy();
  });

  it('displays "No Favorites Found" if there are no favorites', async () => {
    getUsersFavLaunch.mockResolvedValueOnce({results: []});

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("No Favorites Found"));
    expect(screen.getByText("No Favorites Found")).toBeTruthy();
  });

  it("displays favorite launches after data is fetched", async () => {
    const mockLaunchData = [
      {
        id: 1,
        rocket: {configuration: {full_name: "Rocket X"}},
        name: "Launch 1",
        image: {thumbnail_url: "http://example.com/image.jpg"},
        launch_service_provider: {name: "Provider 1"},
        net: "2024-01-01T00:00:00Z",
        pad: {location: {name: "Launch Pad A"}, wiki_url: "http://example.com/pad"},
      },
    ];

    getUsersFavLaunch.mockResolvedValueOnce({results: mockLaunchData});

    render(
      <MemoryRouter>
        <Favorites />
      </MemoryRouter>
    );

    await waitFor(() => screen.getByText("Rocket X"));

    expect(screen.getByText("Rocket X")).toBeTruthy();
    expect(screen.getByText("Provider 1")).toBeTruthy();
    expect(screen.getByAltText("Launch 1").getAttribute("src")).toBe(
      "http://example.com/image.jpg"
    );
    expect(screen.getByText("Launch Pad A")).toBeTruthy();
  });
});
