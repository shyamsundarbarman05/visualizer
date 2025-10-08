# Sorting Visualizer

This project is a web-based sorting algorithm visualizer built with a React frontend and a Python (Flask) backend.

## Features

- Visualize various sorting algorithms: Bubble, Insertion, Merge, Quick, and Heap Sort.
- Control array size and visualization speed.
- Dark mode support.

## Project Structure

```
sorting-visualizer/
├── backend/
│   ├── app.py
│   ├── requirements.txt
│   └── algorithms/
└── frontend/
    ├── package.json
    ├── public/
    └── src/
```

## Setup and Installation

### Backend (Python)

1.  Navigate to the `backend` directory:
    ```bash
    cd backend
    ```
2.  Create a virtual environment and activate it:
    ```bash
    python -m venv venv
    # On Windows
    venv\Scripts\activate
    # On macOS/Linux
    source venv/bin/activate
    ```
3.  Install the required packages:
    ```bash
    pip install -r requirements.txt
    ```
4.  Run the Flask server:
    ```bash
    flask run
    ```
    The backend will be running on `http://127.0.0.1:5000`.

#### Deployment Notes

- The production deployment on Vercel now pins compatible versions of Flask, Flask-Cors, and Werkzeug. The runtime is set to Python 3.11 via `vercel.json` to avoid version mismatches during the build.
- If you deploy the backend separately from the frontend, expose the API base URL to the React app by setting `REACT_APP_API_BASE_URL` (for example, `https://your-backend-domain/api`).

### Frontend (React)

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Start the React development server:
    ```bash
    npm start
    ```
    The frontend will be accessible at `http://localhost:3000`.

## Usage

1.  Open your browser and go to `http://localhost:3000`.
2.  Use the controls to:
    - Generate a new random array.
    - Select a sorting algorithm.
    - Adjust the size of the array.
    - Adjust the speed of the visualization.
3.  Click the "Sort!" button to start the visualization.
4.  Toggle dark mode using the icon in the navbar.
