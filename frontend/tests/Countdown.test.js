/**
 * @jest-environment jsdom
 */
import {expect, it, jest, describe} from "@jest/globals";
import {render, screen, act} from "@testing-library/react";
import Countdown from "../src/components/utility/Countdown.jsx";
import React from "react";

describe(Countdown, () => {
  it("should render with correct countdown time", () => {
    const now = new Date();
    // current date + 1 minute
    const net = new Date(now.getTime() + 1 * 60 * 1000).toUTCString();

    render(<Countdown net={net} />);

    const text = screen.getByText(/T-/).textContent;
    expect(text).toBe("T-00:00:59" || "T-00:00:58");
    // Takes ~ 1 second to mount
  });

  it("should update every second", () => {
    const now = new Date();

    // current date + 1 minute
    const net = new Date(now.getTime() + 1 * 60 * 1000).toUTCString();

    jest.useFakeTimers();

    render(<Countdown net={net} />);

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    const text = screen.getByText(/T-/).textContent;
    expect(text).toBe("T-00:00:58");
    // Takes ~ 1 second to mount

    jest.useRealTimers();
  });

  it("changes to 'launched on' once countdown is 0", () => {
    const now = new Date();

    // current date + 1 minute
    const net = new Date(now.getTime() + 1 * 60 * 1000).toUTCString();

    jest.useFakeTimers();

    render(<Countdown net={net} />);

    act(() => {
      jest.advanceTimersByTime(60000);
    });

    const text = screen.getByText(/Launched/).textContent;
    expect(text).toContain("Launched on");

    jest.useRealTimers();
  });

  it("should display correct launch day", () => {
    jest.useRealTimers();
    // Unix epoch
    const net = new Date(0);

    render(<Countdown net={net} />);

    const text = screen.getByText(/Launched/).textContent;
    expect(text).toBe(`Launched on ${net.toUTCString().slice(5, 16)}`);

    jest.useRealTimers();
  });
});
