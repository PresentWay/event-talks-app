
# Web Technical Talks

A simple, single-page web application for viewing the schedule of a one-day technical conference. The application is built with Node.js and Express on the backend, and standard HTML, CSS, and JavaScript on the frontend.

## Features

- **Full-Day Schedule**: View a complete schedule for a single-track, one-day event, including talk timings and breaks.
- **Talk Details**: See detailed information for each talk, including title, speakers, description, and categories.
- **Live Search**: Instantly filter the talks by category using the search bar.
- **Clean UI**: A clean, modern, and responsive single-page design.

## Tech Stack

- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript (ES6+)

## Project Structure

```
/
|-- data/
|   `-- talks.json         # Contains the data for all talks
|-- public/
|   |-- css/
|   |   `-- style.css      # Main stylesheet
|   |-- js/
|   |   `-- script.js      # Frontend JavaScript for interactivity
|   `-- index.html         # The main HTML file
|-- .gitignore             # Specifies files for Git to ignore
|-- package.json           # Project metadata and dependencies
|-- README.md              # This file
`-- server.js              # The main Express server file
```

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (which includes npm) must be installed on your system.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/PresentWay/event-talks-app.git
    ```

2.  **Navigate to the project directory:**
    ```sh
    cd event-talks-app
    ```

3.  **Install dependencies:**
    ```sh
    npm install
    ```

4.  **Start the server:**
    ```sh
    node server.js
    ```

5.  **View the application:**
    Open your web browser and navigate to `http://localhost:3000`.

## API Endpoint

The application uses a single API endpoint to serve the talk data to the frontend.

- **Endpoint**: `GET /api/talks`
- **Description**: Retrieves a list of all talks for the event.
- **Response**: A JSON array of talk objects. Each object has the following structure:

  ```json
  {
    "title": "The Future of JavaScript Frameworks",
    "speakers": ["John Doe"],
    "category": ["JavaScript", "Web Development"],
    "duration": 60,
    "description": "An in-depth look at the trends and future of popular JavaScript frameworks..."
  }
  ```
