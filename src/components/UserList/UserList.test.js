import { render, screen } from "@testing-library/react";
import UserList from "./UserList";
import "@testing-library/jest-dom";
import { logRoles } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";
import { fetchUserList } from "../Helpers";

describe("UI testing", () => {
  it("renders the component properly", () => {
    const { container } = render(<UserList />);
    logRoles(container);
    const view = render(<UserList />);
    expect(view).toBeTruthy();
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
    await userEvent.click(dropDown);
    const userNameOption = screen.getByText(/User Name/i);
    expect(userNameOption).toBeInTheDocument();
    const emailOption = screen.getByText(/Email/i);
    expect(emailOption).toBeInTheDocument();
    const nameOption = screen.getByText("Name");
    expect(nameOption).toBeInTheDocument();
  });
});

describe("API response", () => {
  it("mock api response and render user cards properly", async () => {
    const mockResponse = [
      {
        username: "Test User",
        name: "John Doe",
        email: "john.doe@example.com",
      },
    ];

    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    // Call your API function that makes the actual API call
    const apiResponse = await fetchUserList("email");

    // Assert the expected response
    expect(apiResponse).toEqual(mockResponse);

    render(
      <BrowserRouter>
        <UserList />
      </BrowserRouter>
    );

    const userCards = await screen.findAllByTestId("user-card");
    expect(userCards.length).toBe(mockResponse.length);

    userCards.forEach((card, index) => {
      const user = mockResponse[index];
      expect(card).toHaveTextContent(user.name);
      expect(card).toHaveTextContent(user.username);

      const emailLink = screen.getByRole("link", {
        name: user.email.toLowerCase(),
      });
      expect(emailLink).toHaveAttribute("href", `mailto:${user.email}`);
    });
  });
});
