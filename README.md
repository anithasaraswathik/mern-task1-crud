# Task 1: CRUD Operations Using Express.js and REST API

## Aim
To develop a frontend for performing CRUD (Create, Read, Update and Delete) operations on an array of items using HTML, CSS, Express.js and REST API.

## Technologies Used
- HTML
- CSS
- JavaScript
- Node.js
- Express.js
- REST API

## Features
- Add new items with name and price.
- View all items in a table.
- Edit existing item details.
- Delete items from the list.
- Validate item details before saving.
- Display success and error messages.

## Project Structure
```text
task1-crud/
├── public/
│   ├── css/
│   │   └── style.css
│   ├── index.html
│   └── script.js
├── server.js
├── package.json
├── package-lock.json
├── .gitignore
├── README.md
└── screenshots/
```

## How to Run the Project

1. Install Node.js.
2. Clone or download this repository.
3. Open the project folder in VS Code.
4. Open a terminal in the project folder.
5. Install dependencies:

   ```bash
   npm install
   ```

6. Start the server:

   ```bash
   node server.js
   ```

7. Open http://localhost:3000 in your browser.

## REST API Endpoints

| Method | Endpoint | Operation |
|---|---|---|
| GET | `/api/items` | Retrieve all items |
| POST | `/api/items` | Add a new item |
| PUT | `/api/items/:id` | Update an item |
| DELETE | `/api/items/:id` | Delete an item |

## Output Screenshots

Upload your application screenshots to the `screenshots` folder and add their image links here.

## Note
Items are stored in an in-memory array. Data resets when the Express server restarts.

## GitHub Repository
https://github.com/anithasaraswathik/mern-task1-crud
