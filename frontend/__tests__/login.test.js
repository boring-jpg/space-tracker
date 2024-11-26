/**
 * @jest-environment jsdom
 */
import {expect, it, describe, jest, beforeEach} from "@jest/globals";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Login } from "../src/components/login.jsx"; 
import * as backendCalls from "../src/api/backend_calls.js";
import { useNavigate } from "react-router-dom";
import React from "react";

jest.mock("../src/api/backend_calls.js");
jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("Login component", () => {
  let setIsLoggedInMock;

  beforeEach(() => {
    setIsLoggedInMock = jest.fn();
    useNavigate.mockReturnValue(jest.fn());
  });

  it("renders login form by default", () => {
    render(<Login setIsLoggedIn={setIsLoggedInMock} />);
    
    expect(screen.getByText("Log into Account")).toBeTruthy();
    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByText("Log In")).toBeTruthy();
  });

  it("renders registration form when 'Register' link is clicked", () => {
    render(<Login setIsLoggedIn={setIsLoggedInMock} />);

    fireEvent.click(screen.getByText("Register"));

    expect(screen.getByText("Register an Account")).toBeTruthy();
    expect(screen.getByPlaceholderText("Name")).toBeTruthy();
    expect(screen.getByPlaceholderText("Email")).toBeTruthy();
    expect(screen.getByPlaceholderText("Password")).toBeTruthy();
    expect(screen.getByText("Register")).toBeTruthy();
  });

  it("handles form submission for login", async () => {
    render(<Login setIsLoggedIn={setIsLoggedInMock} />);

    backendCalls.login.mockResolvedValue({ success: true });

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "it@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByText("Log In"));

    await waitFor(() => expect(backendCalls.login).toHaveBeenCalledWith("it@example.com", "password123", undefined));

    expect(useNavigate()).toHaveBeenCalledWith("/");
    expect(setIsLoggedInMock).toHaveBeenCalledWith(true);
  });

  it("handles form submission for registration", async () => {
    render(<Login setIsLoggedIn={setIsLoggedInMock} />);

    fireEvent.click(screen.getByText("Register"));

    // Mock successful registration response
    backendCalls.register.mockResolvedValue({ success: true });

    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "John Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "john.doe@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByRole("button", { name: "Register" }));

    await waitFor(() =>
      expect(backendCalls.register).toHaveBeenCalledWith(
        "John Doe",
        "john.doe@example.com",
        "password123"
      )
    );

    // Check if page reloads
    expect(useNavigate()).toHaveBeenCalledWith(0);
  });

  it("displays error message when authentication fails", async () => {
    render(<Login setIsLoggedIn={setIsLoggedInMock} />);

    // Mock failed login response
    backendCalls.login.mockResolvedValue({ success: false, error: "Invalid credentials" });

    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "invalid@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "wrongpassword" } });

    fireEvent.click(screen.getByText("Log In"));

    // Wait for error message to appear
    await waitFor(() =>
      expect(screen.getByText("Invalid credentials")).toBeTruthy()
    );
  });

  it("displays error message when registration fails", async () => {
    render(<Login setIsLoggedIn={setIsLoggedInMock} />);

    // Toggle to registration form
    fireEvent.click(screen.getByText("Register"));

    // Mock failed registration response
    backendCalls.register.mockResolvedValue({ success: false, error: "Email already in use" });

    fireEvent.change(screen.getByPlaceholderText("Name"), { target: { value: "Jane Doe" } });
    fireEvent.change(screen.getByPlaceholderText("Email"), { target: { value: "jane.doe@example.com" } });
    fireEvent.change(screen.getByPlaceholderText("Password"), { target: { value: "password123" } });

    fireEvent.click(screen.getByText("Register"));

    // Wait for error message to appear
    await waitFor(() =>
      expect(screen.getByText("Email already in use")).toBeTruthy()
    );
  });
});
