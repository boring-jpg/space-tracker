/**
 * @jest-environment jsdom
 */
import {expect, it, jest, describe, afterAll} from "@jest/globals";
import {render, screen, fireEvent, cleanup} from "@testing-library/react";
import Pagination from "./Pagination.jsx";
import React from "react";

describe(Pagination, () => {
  afterAll(() => cleanup);

  it("should display correct number of buttons", () => {
    render(<Pagination totalPosts={12} postPerPage={6} currentPage={1} />);

    let buttonsOnPage = screen.getAllByRole("button");
    expect(buttonsOnPage).toHaveLength(2);

    cleanup();

    render(<Pagination totalPosts={25} postPerPage={5} currentPage={1} />);

    buttonsOnPage = screen.getAllByRole("button");
    expect(buttonsOnPage).toHaveLength(5);
  });

  it("should have the class 'active' on correct button", () => {
    render(
      <Pagination
        totalPosts={25}
        postPerPage={5}
        setCurrentPage={jest.fn()}
        currentPage={4}
      />
    );
    let buttonsOnPage = screen.getAllByRole("button");

    expect(buttonsOnPage[0].classList.contains("active")).toBe(false);
    expect(buttonsOnPage[1].classList.contains("active")).toBe(false);
    expect(buttonsOnPage[2].classList.contains("active")).toBe(false);
    expect(buttonsOnPage[3].classList.contains("active")).toBe(true);
    expect(buttonsOnPage[4].classList.contains("active")).toBe(false);

    cleanup();

    render(
      <Pagination
        totalPosts={25}
        postPerPage={5}
        setCurrentPage={jest.fn()}
        currentPage={2}
      />
    );
    buttonsOnPage = screen.getAllByRole("button");

    expect(buttonsOnPage[0].classList.contains("active")).toBe(false);
    expect(buttonsOnPage[1].classList.contains("active")).toBe(true);
    expect(buttonsOnPage[2].classList.contains("active")).toBe(false);
    expect(buttonsOnPage[3].classList.contains("active")).toBe(false);
    expect(buttonsOnPage[4].classList.contains("active")).toBe(false);
  });

  it("should not render any page buttons if totalPosts is 0", () => {
    const totalPosts = 0;
    const postPerPage = 5;
    const currentPage = 1;

    render(
      <Pagination
        totalPosts={totalPosts}
        postPerPage={postPerPage}
        currentPage={currentPage}
      />
    );

    const pageButtons = screen.queryAllByRole("button");
    expect(pageButtons).toHaveLength(0);
  });

  it("should render one page button when totalPosts is less than or equal to postPerPage", () => {
    const totalPosts = 3;
    const postPerPage = 5;
    const currentPage = 1;

    render(
      <Pagination
        totalPosts={totalPosts}
        postPerPage={postPerPage}
        currentPage={currentPage}
      />
    );

    const pageButtons = screen.getAllByRole("button");
    expect(pageButtons).toHaveLength(1);
    expect(pageButtons[0].textContent).toBe("1");
  });

  it("should call setCurrentPage with the correct page number when a button is clicked", () => {
    const totalPosts = 25;
    const postPerPage = 5;
    const setCurrentPage = jest.fn();
    const currentPage = 1;

    render(
      <Pagination
        totalPosts={totalPosts}
        postPerPage={postPerPage}
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
      />
    );

    const pageButtons = screen.getAllByRole("button");
    fireEvent.click(pageButtons[2]);
    expect(setCurrentPage).toHaveBeenCalledWith(3);
  });
});
