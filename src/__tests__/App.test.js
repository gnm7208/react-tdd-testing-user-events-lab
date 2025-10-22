import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import '@testing-library/jest-dom';

import App from "../App";

// Portfolio Elements
test("displays a top-level heading with the text `Hi, I'm _______`", () => {
  render(<App />);

  const topLevelHeading = screen.getByRole("heading", {
    name: /hi, i'm/i,
    exact: false,
    level: 1,
  });

  expect(topLevelHeading).toBeInTheDocument();
});

test("displays an image of yourself", () => {
  render(<App />);

  const image = screen.getByAltText("My profile pic");

  expect(image).toHaveAttribute("src", "https://via.placeholder.com/350");
});

test("displays second-level heading with the text `About Me`", () => {
  render(<App />);

  const secondLevelHeading = screen.getByRole("heading", {
    name: /about me/i,
    level: 2,
  });

  expect(secondLevelHeading).toBeInTheDocument();
});

test("displays a paragraph for your biography", () => {
  render(<App />);

  const bio = screen.getByText(/lorem ipsum/i);

  expect(bio).toBeInTheDocument();
});

test("displays the correct links", () => {
  render(<App />);

  const githubLink = screen.getByRole("link", {
    name: /github/i,
  });
  const linkedinLink = screen.getByRole("link", {
    name: /linkedin/i,
  });

  expect(githubLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://github.com")
  );

  expect(linkedinLink).toHaveAttribute(
    "href",
    expect.stringContaining("https://linkedin.com")
  );
});

// Newsletter Form - Initial State
test("the form includes text inputs for name and email address", () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  expect(nameInput).toBeInTheDocument();
  expect(emailInput).toBeInTheDocument();
});

test("the form includes three checkboxes to select areas of interest", () => {
  render(<App />);

  const interest1 = screen.getByRole("checkbox", { name: /interest 1/i });
  const interest2 = screen.getByRole("checkbox", { name: /interest 2/i });
  const interest3 = screen.getByRole("checkbox", { name: /interest 3/i });

  expect(interest1).toBeInTheDocument();
  expect(interest2).toBeInTheDocument();
  expect(interest3).toBeInTheDocument();
});

test("the checkboxes are initially unchecked", () => {
  render(<App />);

  const interest1 = screen.getByRole("checkbox", { name: /interest 1/i });
  const interest2 = screen.getByRole("checkbox", { name: /interest 2/i });
  const interest3 = screen.getByRole("checkbox", { name: /interest 3/i });

  expect(interest1).not.toBeChecked();
  expect(interest2).not.toBeChecked();
  expect(interest3).not.toBeChecked();
});

// Newsletter Form - Adding Responses
test("the page shows information the user types into the name and email address form fields", () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });

  userEvent.type(nameInput, "John Doe");
  userEvent.type(emailInput, "john@example.com");

  expect(nameInput).toHaveValue("John Doe");
  expect(emailInput).toHaveValue("john@example.com");
});

test("checked status of checkboxes changes when user clicks them", () => {
  render(<App />);

  const interest1 = screen.getByRole("checkbox", { name: /interest 1/i });
  const interest2 = screen.getByRole("checkbox", { name: /interest 2/i });

  userEvent.click(interest1);
  userEvent.click(interest2);

  expect(interest1).toBeChecked();
  expect(interest2).toBeChecked();
});

test("a message is displayed when the user clicks the Submit button", () => {
  render(<App />);

  const nameInput = screen.getByRole("textbox", { name: /name/i });
  const emailInput = screen.getByRole("textbox", { name: /email/i });
  const interest1 = screen.getByRole("checkbox", { name: /interest 1/i });
  const submitButton = screen.getByRole("button", { name: /submit/i });

  userEvent.type(nameInput, "John Doe");
  userEvent.type(emailInput, "john@example.com");
  userEvent.click(interest1);
  userEvent.click(submitButton);

  const successMessage = screen.getByText(/thank you for signing up, john doe!/i);
  expect(successMessage).toBeInTheDocument();
});
