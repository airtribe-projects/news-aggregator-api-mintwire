[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-2e0aaae1b6195c2367325f4f02e2d04e9abb55f0b24a779b69b11b9e10269abc.svg)](https://classroom.github.com/online_ide?assignment_repo_id=20166946&assignment_repo_type=AssignmentRepo)
# MintWire News Aggregator API

A Node.js REST API for user authentication, preferences management, and personalized news aggregation using external news APIs.

---

## Features

- **User Registration & Login** (JWT-based authentication)
- **User Preferences** (categories, languages)
- **Protected Endpoints** (JWT middleware)
- **Fetch News** from external APIs (e.g., NewsAPI) based on user preferences

---

## Getting Started

### Prerequisites

- Node.js (v14+)
- MongoDB
- [NewsAPI](https://newsapi.org/) API key

### Installation

```bash
git clone <repo-url>
cd news-aggregator-api-mintwire
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/newsdb
JWT_SECRET=your_jwt_secret
NEWS_API_KEY=your_newsapi_key
```

---

## Running the Server

```bash
npm start
```

Server runs at: [http://localhost:3000](http://localhost:3000)

---

## API Endpoints

### Auth

- **POST** `/users/register`  
  Register a new user  
  **Body:**  
  ```json
  {
    "username": "yourname",
    "email": "your@email.com",
    "password": "yourpassword"
  }
  ```

- **POST** `/users/login`  
  Login and receive JWT  
  **Body:**  
  ```json
  {
    "username": "yourname",
    "password": "yourpassword"
  }
  ```

---

### Preferences (Protected)

- **GET** `/users/preferences`  
  Get current user's preferences  
  **Headers:**  
  `Authorization: Bearer <jwt_token>`

- **PUT** `/users/preferences`  
  Update preferences  
  **Headers:**  
  `Authorization: Bearer <jwt_token>`  
  **Body:**  
  ```json
  {
    "preferences": {
      "categories": ["technology", "sports"],
      "languages": ["en", "hi"]
    }
  }
  ```

---

### News (Protected)

- **GET** `/news`  
  Fetch news based on user preferences  
  **Headers:**  
  `Authorization: Bearer <jwt_token>`

---

## Testing with Postman

1. Register and login to get a JWT token.
2. Use the token in the `Authorization` header for all protected routes.
3. Test `/users/preferences` and `/news` endpoints.

---

