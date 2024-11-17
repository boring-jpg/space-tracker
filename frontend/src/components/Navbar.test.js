/**
 * @jest-environment jsdom
 */
import {expect, it, describe} from "@jest/globals";
import {render, screen, fireEvent} from "@testing-library/react";
import {MemoryRouter} from "react-router-dom";
import Navbar from "./Navbar.jsx";
import React from "react";

describe(Navbar, () => {
  it("should render navbar with correct links for logged out user", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar loggedIn={false} />
      </MemoryRouter>
    );

    // Verify that the "Login" link is rendered for a logged-out user
    expect(screen.getByText("Login")).toBeDefined();
    expect(screen.getByText("About")).toBeDefined();
  });

  it("should render navbar with correct links for logged-in user", () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar loggedIn={true} />
      </MemoryRouter>
    );

    expect(screen.getByText("Favorites")).toBeDefined();
    expect(screen.getByText("About")).toBeDefined();
  });

  it("should toggle hamburger menu on click for mobile view", () => {
    window.global.innerWidth = 400;

    render(
      <MemoryRouter initialEntries={["/"]}>
        <Navbar loggedIn={false} />
      </MemoryRouter>
    );

    const hamburgerButton = screen.getByRole("button");
    const navList = screen.getByRole("list");

    expect(navList.classList.contains("isOpen")).toBeFalsy();

    fireEvent.click(hamburgerButton);

    expect(navList.classList.contains("isOpen")).toBeTruthy();

    fireEvent.click(hamburgerButton);

    expect(navList.classList.contains("isOpen")).toBeFalsy();
  });
});
