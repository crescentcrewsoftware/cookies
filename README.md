# Bob's Computing Wikipedia

A simple static website mimicking a basic version of Wikipedia, focused on computing topics.

## Features

- Main page with list of articles
- 106 sample articles on computing topics: programming, internet history, AI, hardware, software development, operating systems, and 100 additional computing topics
- Basic search functionality (filters article links)
- User account system (sign up, login, logout) using local storage
- User profiles (edit email and bio)
- Global chat (messages stored locally, shared across browser sessions)
- Responsive design

## How to Run

1. Open `index.html` in your web browser.

For a local server (optional):

- Install Python 3 from https://www.python.org/
- Run `python -m http.server 8000` in the project directory
- Open http://localhost:8000 in your browser

Or use VS Code Live Server extension (already installed):

- Right-click on `index.html` and select "Open with Live Server"

## Structure

- `index.html`: Main page
- `style.css`: Stylesheet
- `script.js`: JavaScript for search and accounts
- `article1.html` to `article106.html`: Sample articles

## Adding More Articles

Create new HTML files following the structure of the existing articles, and add links to them in `index.html`.