# Dynamic React Form

## Overview

Dynamic Nested Form is a React-based application that allows users to create and manage hierarchical questions dynamically. The form supports nested questions and enables users to review the questions in a hierarchical format before submission.

## Features

- Add new questions.
- Support for nested child questions.
- Question types: Short Answer and True/False.
- Conditional child question addition for True/False questions when the answer is "True."
- Delete questions recursively, including all nested children.
- Persistent state using `localStorage`.
- Submission preview of questions in a hierarchical format.

## Tech Stack

- **React.js**: For building the user interface.
- **Tailwind CSS**: For styling the components.
- **localStorage**: For state persistence.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository_url>
   ```

2. Navigate to the project directory:

   ```bash
   cd dynamic-react-form
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Run the application:
   ```bash
   npm start
   ```

The application will be available at `http://localhost:5173`.

## Components

### `DynamicForm`

- Manages the state of questions and handles submission.
- Saves and retrieves questions from `localStorage`.
- Contains the main UI for adding questions and displaying the review section.

### `QuestionList`

- Recursively renders a list of questions.
- Calls QuestionItem to handle question operations (add, delete, update).

### `QuestionItem`

- Renders a single question with fields for:
  - Question text
  - Question type
  - Answer input for True/False questions
- Handles conditional rendering of the "Add Child" button.
- Supports recursive rendering of child questions.

## Usage

1. **Add a New Question**:

   - Click the "Add New Question" button.
   - Enter the question text and select a type (Short Answer or True/False).

2. **Add a Child Question**:

   - For True/False questions, set the answer to "True."
   - Click the "Add Child" button.

3. **Delete a Question**:

   - Click the "Delete" button next to the question.
   - All nested child questions will also be deleted.

4. **Submit the Form**:
   - Click the "Submit" button to preview questions in a hierarchical format.

## Styling

The application uses Tailwind CSS for consistent and responsive styling.

## Example Hierarchical Output

After submission, questions will be displayed as follows:

```
Q1: What is your name?
Q2: Is the sky blue?
  Q2.1: Why is the sky blue?
Q3: Enter your favorite color.
```

# Thanks For Visiting
