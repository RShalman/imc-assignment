import React from "react";
import { cleanup, fireEvent, render, screen } from "@testing-library/react";
import Sidebar from "./index";
import { AppProvider } from "../../providers/app-provider";

const TestComponent = () => (
  <AppProvider>
    <Sidebar />
  </AppProvider>
);

describe("Sidebar", () => {
  afterAll(() => {
    cleanup();
  });
  it("should contain Logo text", () => {
    render(<TestComponent />);
    screen.getByText("Foods 'n' Goods");
  });
  it("should open menu on click on menuButtonWrapper", () => {
    const { container } = render(<TestComponent />);
    const menuBtn = screen.getByTestId("menuButton").firstChild;

    fireEvent.click(menuBtn as Element);
    expect(container.firstChild).toHaveClass("open");
  });
  it("should contain menu option buttons", () => {
    render(<TestComponent />);
    const tablesBtn = screen.getByText("Tables");
    const chartBtn = screen.getByText("Charts");

    expect(tablesBtn && chartBtn).toBeInTheDocument();
  });
});
