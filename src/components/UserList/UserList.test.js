import { render, screen } from "@testing-library/react";
import UserList from "./UserList";
import "@testing-library/jest-dom";
import { logRoles } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";

describe("UI testing", () => {
  it("renders the component properly", () => {
    const { container } = render(<UserList />);
    logRoles(container);
    const component = render(<UserList />);
    expect(component).toBeTruthy();
  });
  it("has a heading", () => {
    render(<UserList />);
    const heading = screen.getByRole("heading", { name: /Users/i });
    expect(heading).toBeInTheDocument();
  });

  it("has a dropdown", async () => {
    render(<UserList />);
    const dropDown = screen.getByRole("combobox");
    expect(dropDown).toBeInTheDocument();
      await userEvent.click(dropDown)
      const options = screen.getByText(/User Name/i)
      expect(options).toBeInTheDocument()
  });
});
