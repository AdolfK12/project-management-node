# Project Management API

This API allows users to manage projects and their associated tasks, including scheduling and searching for tasks efficiently. The API supports CRUD operations for both projects and tasks, and ensures no two tasks overlap in time for the same project. Additionally, the API includes features to mark tasks as completed and fetch all incomplete tasks for a project.

## Development Environment

- **Server**: Node.js and Express.js
- **Database**: MongoDB
- **ORM**: Mongoose

## Getting Started

### Clone the Repository

```json
cd project-management-node
npm install
```

### Set Up Environment Variables

Create a .env file in the root directory and add the following:

```json
MONGO_URI=<your_mongodb_connection_string>
```

### Run the Server

```json
npm start
```

The server should be running on http://localhost:8000.

## Endpoints

### Projects

#### Create a Project

- **Method**: POST
- **Endpoint**: `/projects`
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response**:

  ```json
  {
    "message": "Project created successfully",
    "data": {
      "_id": "string",
      "name": "string",
      "description": "string"
    }
  }
  ```

#### Get All Projects

- **Method**: GET
- **Endpoint**: `/projects`
- **Response**:

  ```json
  {
    "message": "Successfully fetched all projects",
    "data": {
      "_id": "string",
      "name": "string",
      "description": "string"
    }
  }
  ```

#### Get Project by ID

- **Method**: GET
- **Endpoint**: `/projects/:id`
- **Response**:

  ```json
  {
    "message": "Successfully fetched project with ID: :id",
    "data": {
      "_id": "string",
      "name": "string",
      "description": "string"
    }
  }
  ```

#### Update a Project

- **Method**: PUT
- **Endpoint**: `/projects/:id`
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string"
  }
  ```
- **Response**:

  ```json
  {
    "message": "Project updated successfully",
    "data": {
      "_id": "string",
      "name": "string",
      "description": "string"
    }
  }
  ```

#### Delete a Project

- **Method**: DELETE
- **Endpoint**: `/projects/:id`
- **Response**:

  ```json
  {
    "message": "Project with ID: :id deleted successfully"
  }
  ```

### Task

#### Create a Task for a Project

- **Method**: POST
- **Endpoint**: `/projects/:projectId/tasks`
- **Request Body**:

  ```json
  {
    "title": "string",
    "description": "string",
    "startTime": "ISO 8601 string",
    "endTime": "ISO 8601 string"
  }
  ```

- **Response**:

  ```json
  {
    "message": "Task created successfully",
    "data": {
      "_id": "string",
      "projectId": "string",
      "title": "string",
      "description": "string",
      "startTime": "ISO 8601 string",
      "endTime": "ISO 8601 string",
      "completed": false
    }
  }
  ```

#### Get All Tasks for a Project

- **Method**: GET
- **Endpoint**: `/projects/:projectId/tasks`

- **Response**:

  ```json
  {
    "message": "Tasks fetched successfully",
    "data": [
      {
        "_id": "string",
        "projectId": "string",
        "title": "string",
        "description": "string",
        "startTime": "ISO 8601 string",
        "endTime": "ISO 8601 string",
        "completed": false
      }
    ]
  }
  ```

#### Get Task by ID

- **Method**: GET
- **Endpoint**: `/tasks/:id`
- **Response**:

  ```json
  {
    "message": "Task fetched successfully",
    "data": {
      "_id": "string",
      "projectId": "string",
      "title": "string",
      "description": "string",
      "startTime": "ISO 8601 string",
      "endTime": "ISO 8601 string",
      "completed": false
    }
  }
  ```

#### Update a Task

- **Method**: PUT
- **Endpoint**: `/tasks/:id`
- **Request Body**:

  ```json
  {
  "title": "string",
  "description": "string",
  "startTime": "ISO 8601 string",
  "endTime": "ISO 8601 string",
  "completed": true/false
  }

  ```

- **Response**:

  ```json
  {
  "message": "Task updated successfully",
  "data": {
    "_id": "string",
    "projectId": "string",
    "title": "string",
    "description": "string",
    "startTime": "ISO 8601 string",
    "endTime": "ISO 8601 string",
    "completed": true/false
  }
  }

  ```

#### Delete a Project

- **Method**: DELETE
- **Endpoint**: `/tasks/:id`
- **Response**:

  ```json
  {
    "message": "Task with ID: :id deleted successfully"
  }
  ```

#### Search Tasks by Keyword

- **Method**: GET
- **Endpoint**: `/tasks/search`
- **Query Parameter**: q (string)
- **Response**:

  ```json
  {
    "message": "Tasks fetched successfully",
    "data": [
      {
        "_id": "string",
        "projectId": "string",
        "title": "string",
        "description": "string",
        "startTime": "ISO 8601 string",
        "endTime": "ISO 8601 string",
        "completed": false
      }
    ]
  }
  ```

#### Mark Task as Completed

- **Method**: PUT
- **Endpoint**: `/tasks/:id/complete`
- **Response**:

  ```json
  {
    "message": "Task marked as completed",
    "data": {
      "_id": "string",
      "projectId": "string",
      "title": "string",
      "description": "string",
      "startTime": "ISO 8601 string",
      "endTime": "ISO 8601 string",
      "completed": true
    }
  }
  ```

#### Get Incomplete Tasks for a Project

- **Method**: GET
- **Endpoint**: `/tasks/projects/:projectId/incomplete`
- **Response**:

  ```json
  {
    "message": "Incomplete tasks fetched successfully",
    "data": [
      {
        "_id": "string",
        "projectId": "string",
        "title": "string",
        "description": "string",
        "startTime": "ISO 8601 string",
        "endTime": "ISO 8601 string",
        "completed": false
      }
    ]
  }
  ```

## Postman Collection

To test the API endpoints, you can use the following Postman collection:
https://www.postman.com/warped-satellite-3227/workspace/project-management-node/collection/27413656-1d6e61c0-56e4-40e6-b290-b12bb413f5d4?action=share&creator=27413656
