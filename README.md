# DnD Horizontal Vertical Editor

DnD Horizontal Vertical Editor is a drag-and-drop editor built with React, using the `@dnd-kit` library. It allows users to create and manage HTML layouts with horizontal and vertical elements, providing a user-friendly interface for building email templates.

## Features

- **Drag and Drop**: Easily drag and drop elements to create HTML layouts.
- **Vertical Management**: Add, remove, and reorder vertical elements.
- **Horizontal Management**: Add, remove, and reorder horizontal elements within vertical ones.
- **Dimension Selection**: Select vertical dimensions from predefined layouts.
- **Save and Load**: Save your created layout to local storage and load it back later for editing.
- **HTML Output**: Generate and preview the HTML content of your layout.

## Getting Started

### Prerequisites

- Node.js
- npm (or yarn)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/andrewwolf-eu/dnd-xy-html-editor.git
cd dnd-xy-html-editor
npm install
# or
yarn install
```

### Running the Application

To start the development server, run:

```bash
npm start
# or
yarn start
```

### Building for Production

To create a production build, run:

```bash
npm run build
# or
yarn build
```

The build output will be in the `build` directory.

## Usage

- **Add vertical elements**: Use the toolbar to add new vertical elements to the layout.
- **Select Dimensions**: Choose predefined dimension layouts for vertical elements.
- **Add horizontal elements**: Drag elements from the toolbar to the vertical elements.
- **Save Layout**: Save your layout to local storage.
- **Load Layout**: Load a saved layout from local storage.
- **Generate HTML**: View the generated HTML content of your layout.

## Folder Structure

- **src/components**: Contains React components used in the application.
- **src/context**: Contains context providers for state management.
- **src/utils**: Contains utility functions.
- **src/index.tsx**: Entry point of the application.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any improvements or bug fixes.

## License

This project is licensed under the MIT License.