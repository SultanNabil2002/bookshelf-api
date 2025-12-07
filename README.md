# Bookshelf API 📚 (Backend Service)

A robust RESTful API service built with **Node.js (Express)** to manage book records. This project demonstrates backend logic implementation, route handling, and input validation without using a database (in-memory storage).

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![API](https://img.shields.io/badge/REST_API-Backend-blue?style=for-the-badge)

## 🌟 Key Features

* **CRUD Operations:** Complete endpoints to Create, Read, Update, and Delete books.
* **Input Validation:** Ensures mandatory fields (like `title`) are present before processing data.
* **Business Logic:** Automatically determines `finished` status based on `readPage` count.
* **Error Handling:** Returns appropriate HTTP Status Codes (400 for Bad Request, 404 for Not Found).

## 🛠️ Tech Stack

* **Runtime:** Node.js
* **Framework:** Express.js
* **ID Generator:** Nanoid
* **Architecture:** Modular Routes (Single File Implementation for simplicity).

## 🔗 API Endpoints

| Method | Endpoint | Description |
| :--- | :--- | :--- |
| `POST` | `/books` | Add a new book |
| `GET` | `/books` | Get all books |
| `GET` | `/books/{bookId}` | Get book detail by ID |
| `PUT` | `/books/{bookId}` | Update book data |
| `DELETE` | `/books/{bookId}` | Delete a book |

## 🚀 How to Run

1.  **Install Dependencies:**
    ```bash
    npm install
    ```

2.  **Start Server:**
    ```bash
    npm run start
    # Server runs on http://localhost:9000
    ```

---
*Created by Sultan Nabil as part of Backend Fundamental Submission.*
