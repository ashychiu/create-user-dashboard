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
    
    logRoles(container)
    screen.debug(container, null)

    expect(container).toBeInTheDocument();
  });

  it("displays the 'Users' heading", () => {

    render(<UserList />);
    
    const heading = screen.getByRole("heading", { name: "Users" });
    expect(heading).toBeInTheDocument();
  });

it("contains a search box", async () => {
  // Arrange: Render the UserList component
  render(<UserList />);

  // Act: Simulate user interaction by changing the input value
  const searchBox = screen.getByRole("textbox");
  expect(searchBox).toBeInTheDocument();
  await userEvent.type(searchBox, "Hello World");

  // Assert: Assert that the search term is present and the filterUserList function is called correctly
  const searchTerm = screen.getByDisplayValue("Hello World");
  expect(searchTerm).toBeInTheDocument();
});

  

it("includes a dropdown with options", async () => {
  // Arrange: Render the UserList component
  render(<UserList />);
    
  // Act: Simulate a click on the dropdown to open the options
  const dropDown = screen.getByRole("combobox");
  expect(dropDown).not.toBeDisabled();
  const defaultSelection = screen.getByDisplayValue("Name");
  expect(defaultSelection).toBeInTheDocument();
  await userEvent.click(dropDown);

  // Assert: Assert that the dropdown and options are present
  const userNameOption = screen.getByText("User Name");
  expect(userNameOption).toBeInTheDocument();
  const emailOption = screen.getByText(/Email/i);
  expect(emailOption).toBeInTheDocument();
  const nameOption = screen.getByText("Name");
  expect(nameOption).toBeInTheDocument();
});


});

describe("UserList component API integration", () => {
  it("fetches user data from the API and renders user cards", async () => {
    const mockResponse = [
      {
        id: 1,
        username: "Test User",
        name: "John Doe",
        email: "john.doe@example.com",
      },
    ];

    // Arrange: Mock the fetch function to return a resolved Promise with the mock response
    jest.spyOn(global, "fetch").mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockResponse),
    });

    // Act: Call the API function to fetch user data
    const apiResponse = await fetchUserList("email");

    // Assert: Assert the expected response
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
