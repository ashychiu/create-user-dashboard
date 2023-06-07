import { render, screen } from "@testing-library/react";
import UserList from "./UserList";
import "@testing-library/jest-dom";
import { logRoles } from "@testing-library/dom";
import userEvent from "@testing-library/user-event";
import { BrowserRouter } from "react-router-dom/cjs/react-router-dom";
import { fetchUserList } from "../Helpers";

describe("UserList component UI", () => {
  it("renders the component without errors", () => {
    const { container } = render(<UserList />);
    logRoles(container);
    expect(container).toBeTruthy(); // Assert that the component is rendered without errors
  });

  it("displays the 'Users' heading", () => {
    render(<UserList />);
    const heading = screen.getByRole("heading", { name: "Users" });
    expect(heading).toBeInTheDocument(); // Assert that the heading element with the text "Users" is present
  });

  it("contains a search box", () => {
    render(<UserList />);
    const searchBox = screen.getByRole("textbox");
    expect(searchBox).toBeInTheDocument(); // Assert that the search box element is present
  });

  it("includes a dropdown with options", async () => {
    render(<UserList />);
    const dropDown = screen.getByRole("combobox");
    expect(dropDown).toBeInTheDocument(); // Assert that the dropdown element is present
    expect(dropDown).not.toBeDisabled();

    await userEvent.click(dropDown); // Simulate a click on the dropdown to open the options

    const userNameOption = screen.getByText("User Name");
    expect(userNameOption).toBeInTheDocument(); // Assert that the "User Name" option is present

    const emailOption = screen.getByText(/Email/i);
    expect(emailOption).toBeInTheDocument(); // Assert that the "Email" option is present

    const nameOption = screen.getByText("Name");
    expect(nameOption).toBeInTheDocument(); // Assert that the "Name" option is present
  });
});

describe("UserList component API integration", () => {
  it("fetches user data from the API and renders user cards", async () => {
    const mockResponse = [
      {
        username: "Test User",
        name: "John Doe",
        email: "john.doe@example.com",
      },
    ];

    // Mock the fetch function to return a resolved Promise with the mock response
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
    expect(userCards.length).toBe(mockResponse.length); // Assert that the correct number of user cards are rendered

    userCards.forEach((card, index) => {
      const user = mockResponse[index];

      expect(card).toHaveTextContent(user.name); // Assert that the user's name is rendered
      expect(card).toHaveTextContent(user.username); // Assert that the user's username is rendered

      const emailLink = screen.getByRole("link", {
        name: user.email.toLowerCase(),
      });
      expect(emailLink).toHaveAttribute("href", `mailto:${user.email}`); // Assert that the email link has the correct href attribute
    });
  });
});
