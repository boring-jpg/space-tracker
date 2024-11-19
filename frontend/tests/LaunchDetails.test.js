/**
 * @jest-environment jsdom
 */
import {expect, it, describe, jest} from "@jest/globals";
import {act, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import getLaunchData from "../src/api/lldev_calls.js";
import LaunchDetails from "../src/components/LaunchDetails.jsx";
import React from "react";

jest.mock("../src/api/lldev_calls", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockLaunchData = {
  name: "Test Launch | Rocket",
  net: "2024-01-01T12:00:00Z",
  image: {
    thumbnail_url: "http://example.com/launch-image.jpg",
    name: "Launch Image",
  },
  pad: {
    name: "Launch Pad A",
    location: {name: "Cape Canaveral"},
    map_url: "http://example.com/map",
    map_image: "http://example.com/map-image.jpg",
    wiki_url: "http://example.com/wiki",
  },
  vid_urls: [{url: "https://youtube.com/watch?v=abcd1234", title: "Launch Video"}],
  mission: {
    name: "Mission to Mars",
    description: "This mission aims to send a rover to Mars.",
    agencies: [
      {
        wiki_url: "http://example.com/agency",
        logo: {image_url: "http://example.com/logo.jpg", name: "Agency"},
      },
    ],
  },
};

describe(LaunchDetails, () => {
  it("should display loading during inital mount", () => {
    act(() => getLaunchData.mockResolvedValueOnce([]));
    act(() => render(<LaunchDetails />));

    const main = screen.getByRole("main");
    expect(main.classList.contains("loading-page")).toBeTruthy();
  });

  it("should display launch details after data is fetched", async () => {
    act(() => getLaunchData.mockResolvedValueOnce(mockLaunchData));

    await act(async () =>
      render(
        <MemoryRouter initialEntries={["/launch/1"]}>
          <LaunchDetails />
        </MemoryRouter>
      )
    );

    await waitFor(() => {
      expect(screen.getByText(/Test Launch/i).innerHTML).toBe("Test Launch ");
      expect(screen.getByText(/Mission to Mars/i).innerHTML).toBe(
        "Mission: Mission to Mars"
      );
      expect(
        screen.getByText(/This mission aims to send a rover to Mars./i).innerHTML
      ).toBe("This mission aims to send a rover to Mars.");
      expect(screen.getByAltText(/Launch Image/i).getAttribute("src")).toBe(
        "http://example.com/launch-image.jpg"
      );
      expect(screen.getByAltText(/map of Cape Canaveral/i).getAttribute("src")).toBe(
        "http://example.com/map-image.jpg"
      );
      expect(screen.getByAltText(/Agency/).getAttribute("src")).toBe(
        "http://example.com/logo.jpg"
      );
    });
  });

  it("should handle missing images", async () => {
    const dataWithNoImage = {...mockLaunchData, image: null};
    act(() => getLaunchData.mockResolvedValueOnce(dataWithNoImage));

    await act(async () =>
      render(
        <MemoryRouter initialEntries={["/launch/1"]}>
          <LaunchDetails />
        </MemoryRouter>
      )
    );

    await waitFor(() => {
      expect(screen.getByText(/No image available/i).innerHTML).toBe(
        "No image available"
      );
    });
  });

  it("should render YouTube video if URL exists", async () => {
    act(() => getLaunchData.mockResolvedValueOnce(mockLaunchData));

    act(() =>
      render(
        <MemoryRouter initialEntries={["/launch/1"]}>
          <LaunchDetails />
        </MemoryRouter>
      )
    );

    await waitFor(() => {
      expect(screen.getByTitle(/Launch Video/i)).toBeDefined();
    });
  });
});
