/**
 * @jest-environment jsdom
 */
import {describe, expect, it, jest, beforeEach} from "@jest/globals";
import {act, render, screen, waitFor} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import getLaunchData from "../api/lldev_calls.js";
import LaunchCards from "./LaunchCard.jsx";
import React from "react";

jest.mock("../api/lldev_calls", () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockLaunchData = [
  {
    id: "1",
    name: "Test Launch 1",
    rocket: {configuration: {full_name: "Rocket 1"}},
    launch_service_provider: {name: "SpaceX"},
    net: "2024-12-01T12:00:00Z",
    pad: {
      location: {name: "Cape Canaveral"},
      wiki_url: "http://example.com",
    },
    image: {thumbnail_url: "http://example.com/image1.jpg"},
  },
  {
    id: "2",
    name: "Test Launch 2",
    rocket: {configuration: {full_name: "Rocket 2"}},
    launch_service_provider: {name: "Blue Origin"},
    net: "2024-12-02T12:00:00Z",
    pad: {
      location: {name: "Vandenberg AFB"},
      wiki_url: "http://example.com",
    },
    image: {thumbnail_url: "http://example.com/image2.jpg"},
  },
];

describe(LaunchCards, () => {
  beforeEach(() => {
    getLaunchData.mockResolvedValue(mockLaunchData);
  });

  it("should display loading on mount", () => {
    getLaunchData.mockResolvedValueOnce([]);

    act(() => render(<LaunchCards />));

    const main = screen.getByRole("main");
    expect(main.classList.contains("loading-page")).toBeTruthy();
  });

  it("should call API for launch data, then render launcard page.", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LaunchCards />
        </MemoryRouter>
      );
    });

    // useEffect in strictmode calls twice / only calls once in prod.
    await waitFor(() => expect(getLaunchData).toHaveBeenCalledTimes(2));

    const main = screen.getByRole("main");
    expect(main.classList.contains("launches")).toBeTruthy();
  });

  it("should load pagination twice", async () => {
    await act(async () => {
      render(
        <MemoryRouter>
          <LaunchCards />
        </MemoryRouter>
      );
    });

    //with two test cards, there should only be two buttons total

    const paginationButtons = screen.getAllByRole("button");
    expect(paginationButtons.length).toBe(2);
  });
});
