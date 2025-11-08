# API Reference - InsightBoard

Complete API documentation for the InsightBoard backend.

**Base URL:** `http://localhost:5000/api` (development)  
**Production URL:** `https://your-api.onrender.com/api`

---

## Authentication

All authenticated endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

---

## Endpoints

### Health Check

#### GET /health

Check if the API is running.

**Authentication:** None

**Response:**

```json
{
  "status": "success",
  "message": "InsightBoard API is running",
  "timestamp": "2025-10-31T12:00:00.000Z",
  "environment": "development"
}
```

---

## Authentication Endpoints

### Register User

#### POST /api/auth/register

Register a new user account.

**Authentication:** None

**Request Body:**

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Validation Rules:**

- `name`: 2-50 characters
- `email`: Valid email format
- `password`: Min 6 characters, must contain uppercase, lowercase, and number

**Response (201):**

```json
{
  "status": "success",
  "message": "User registered successfully",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "preferences": {
        "categories": ["technology", "business", "science"],
        "theme": "light",
        "language": "en"
      }
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**

- `400`: Validation failed or email already exists
- `500`: Server error

---

### Login User

#### POST /api/auth/login

Authenticate user and receive token.

**Authentication:** None

**Request Body:**

```json
{
  "email": "john@example.com",
  "password": "SecurePass123"
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "preferences": {...},
      "lastLogin": "2025-10-31T12:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Errors:**

- `401`: Invalid email or password
- `400`: Validation failed

---

### Get Current User

#### GET /api/auth/me

Get currently authenticated user information.

**Authentication:** Required

**Response (200):**

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "preferences": {...},
      "createdAt": "2025-10-20T12:00:00.000Z"
    }
  }
}
```

---

### Update Password

#### PUT /api/auth/password

Change user password.

**Authentication:** Required

**Request Body:**

```json
{
  "currentPassword": "OldPass123",
  "newPassword": "NewPass456"
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Password updated successfully",
  "data": {
    "token": "new_jwt_token..."
  }
}
```

**Errors:**

- `401`: Current password incorrect

---

## News Endpoints

### Get News Articles

#### GET /api/news

Fetch news articles with optional filtering.

**Authentication:** None

**Query Parameters:**

- `category` (optional): Filter by category
- `page` (optional): Page number (default: 1)
- `limit` (optional): Results per page (default: 20, max: 100)

**Example:**

```
GET /api/news?category=technology&page=1&limit=20
```

**Response (200):**

```json
{
  "status": "success",
  "results": 20,
  "totalResults": 150,
  "page": 1,
  "data": {
    "articles": [
      {
        "articleId": "abc123...",
        "source": {
          "id": "techcrunch",
          "name": "TechCrunch"
        },
        "author": "Jane Smith",
        "title": "AI Breakthrough in Natural Language Processing",
        "description": "Researchers announce new AI model...",
        "url": "https://example.com/article",
        "urlToImage": "https://example.com/image.jpg",
        "publishedAt": "2025-10-31T10:00:00Z",
        "content": "Full article content...",
        "summary": "AI researchers have developed a new model that significantly improves natural language understanding..."
      }
    ]
  }
}
```

---

### Search News

#### GET /api/news/search

Search for news articles by keyword.

**Authentication:** None

**Query Parameters:**

- `q` (required): Search query
- `page` (optional): Page number
- `limit` (optional): Results per page

**Example:**

```
GET /api/news/search?q=artificial+intelligence&page=1
```

**Response:** Same format as Get News

---

### Get News by Category

#### GET /api/news/categories/:category

Get news articles from specific category.

**Authentication:** None

**Parameters:**

- `category`: One of: `technology`, `business`, `science`, `health`, `entertainment`, `sports`, `general`

**Query Parameters:**

- `page`, `limit` (same as Get News)

**Example:**

```
GET /api/news/categories/technology?page=1&limit=20
```

**Response:** Same format as Get News

**Errors:**

- `400`: Invalid category

---

### Generate Article Summary

#### POST /api/news/summary

Generate AI summary for an article.

**Authentication:** None

**Request Body:**

```json
{
  "articleId": "abc123",
  "title": "Article Title",
  "content": "Article content...",
  "description": "Article description"
}
```

**Response (200):**

```json
{
  "status": "success",
  "data": {
    "summary": "This article discusses...",
    "cached": false
  }
}
```

---

## User Endpoints

All user endpoints require authentication.

### Get Favorites

#### GET /api/user/favorites

Get user's saved articles.

**Authentication:** Required

**Response (200):**

```json
{
  "status": "success",
  "results": 5,
  "data": {
    "favorites": [
      {
        "articleId": "abc123",
        "title": "Saved Article Title",
        "url": "https://example.com/article",
        "source": "TechCrunch",
        "savedAt": "2025-10-30T15:00:00Z"
      }
    ]
  }
}
```

---

### Add Favorite

#### POST /api/user/favorites

Save an article to favorites.

**Authentication:** Required

**Request Body:**

```json
{
  "articleId": "abc123",
  "title": "Article Title",
  "url": "https://example.com/article",
  "source": "Source Name"
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Article added to favorites",
  "data": {
    "favorites": [...]
  }
}
```

**Errors:**

- `400`: Article already in favorites

---

### Remove Favorite

#### DELETE /api/user/favorites/:articleId

Remove article from favorites.

**Authentication:** Required

**Parameters:**

- `articleId`: The article ID to remove

**Response (200):**

```json
{
  "status": "success",
  "message": "Article removed from favorites",
  "data": {
    "favorites": [...]
  }
}
```

---

### Update Preferences

#### PUT /api/user/preferences

Update user preferences.

**Authentication:** Required

**Request Body:**

```json
{
  "categories": ["technology", "science"],
  "theme": "dark",
  "language": "en"
}
```

**Validation:**

- `categories`: Array of valid categories
- `theme`: "light" or "dark"
- `language`: "en", "es", "fr", or "de"

**Response (200):**

```json
{
  "status": "success",
  "message": "Preferences updated successfully",
  "data": {
    "preferences": {
      "categories": ["technology", "science"],
      "theme": "dark",
      "language": "en"
    }
  }
}
```

---

### Get User Profile

#### GET /api/user/profile

Get detailed user profile.

**Authentication:** Required

**Response (200):**

```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "name": "John Doe",
      "email": "john@example.com",
      "preferences": {...},
      "favoritesCount": 12,
      "createdAt": "2025-10-01T00:00:00Z",
      "lastLogin": "2025-10-31T12:00:00Z"
    }
  }
}
```

---

### Update Profile

#### PUT /api/user/profile

Update user profile information.

**Authentication:** Required

**Request Body:**

```json
{
  "name": "John Updated",
  "email": "newemail@example.com"
}
```

**Response (200):**

```json
{
  "status": "success",
  "message": "Profile updated successfully",
  "data": {
    "user": {...}
  }
}
```

---

## Error Responses

All errors follow this format:

```json
{
  "status": "error",
  "message": "Error description"
}
```

**Common Status Codes:**

- `200`: Success
- `201`: Created
- `400`: Bad Request (validation errors)
- `401`: Unauthorized (missing/invalid token)
- `404`: Not Found
- `429`: Too Many Requests (rate limit exceeded)
- `500`: Server Error

---

## Rate Limiting

- **Window:** 15 minutes
- **Max Requests:** 100 per window per IP
- **Response when exceeded:**

```json
{
  "status": "error",
  "message": "Too many requests from this IP, please try again later."
}
```

---

## Categories

Valid news categories:

- `technology`
- `business`
- `science`
- `health`
- `entertainment`
- `sports`
- `general`

---

## Testing with cURL

**Register:**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@test.com","password":"Test123456"}'
```

**Login:**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"Test123456"}'
```

**Get News:**

```bash
curl http://localhost:5000/api/news?category=technology&limit=5
```

**Get Favorites (with auth):**

```bash
curl http://localhost:5000/api/user/favorites \
  -H "Authorization: Bearer YOUR_TOKEN_HERE"
```

---

For more information, see the main README or contact the development team.
