# Demo Editor by Vishal

## Description

This is a simple text editor built using React and Draft.js that supports custom inline formatting, such as:

- Heading formatting with `# `
- Bold text with `* `
- Red-colored text with `** `
- Underlined text with `*** `
- The app allows saving content to local storage.

## Installation

1. Clone this repository (or open it directly in CodeSandbox).
2. Run `npm install` to install the necessary dependencies.
3. Use `npm run dev` to run the app locally (if running outside CodeSandbox).

### Live Demo

You can find the live demo of the app running on CodeSandbox here: [Demo Editor](https://codesandbox.io/p/github/Vishu663/vishal-draftjs-editor/main?import=true)

## Usage

1. Open the editor.
2. To apply heading formatting, type `# ` at the start of a line, followed by your text.
3. To make the text bold, type `* ` followed by your text.
4. To change the text color to red, type `** ` before your text.
5. To underline the text, type `*** ` before your text.
6. You can save the editor content to your browser's localStorage by clicking the "Save" button.

Note: When moving to the next line please ensure that you first disable the formatting by typing the necessary. For example if you have typed heading and moved to the next line, please type '#' again and hit space to get back to default and then type the next i.e '\*' and hit space to type in bold and vice versa.

## Technologies Used

- React
- Draft.js
- LocalStorage for persistence
- CSS (for styling)

## License

This project is open-source and available under the MIT License.
