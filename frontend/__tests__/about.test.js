/**
 * @jest-environment jsdom
 */
import {expect, it, describe, afterEach} from "@jest/globals";
import {cleanup, render, screen} from "@testing-library/react";
import About from "../src/components/about.jsx";
import React from "react";

describe(About, () => {
  afterEach(() => cleanup);

  it("should show authors name", () => {
    render(<About />);

    const name = screen.getByText(/mitchell johnson/);
    expect(name).toBeDefined();
  });

  it("should have the correct links", () => {
    render(<About />);
    const linkedin = screen.getByTestId("linkedin");
    const github = screen.getByTestId("github");

    expect(linkedin.getAttribute("href")).toBe("https://www.linkedin.com/in/mitchell-j/");
    expect(github.getAttribute("href")).toBe("https://github.com/boring-jpg");
  });
});
