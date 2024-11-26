/**
 * @jest-environment jsdom
 */
import {expect, it, describe} from "@jest/globals";
import {render, screen} from "@testing-library/react";
import Loading from "../src/components/utility/loading.jsx";
import React from "react";

describe(Loading, () => {
  it("should render all elements", () => {
    const {container} = render(<Loading />);

    const main = screen.getByRole("main");

    expect(main).toBeDefined();
    expect(main.classList.contains("loading-page")).toBeTruthy();
    expect(container.getElementsByClassName("loading").length).toBe(1);
  });
});
