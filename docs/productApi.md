# Product API Documentation

## Overview

The Product API provides endpoints to manage products offered by the manufacturer. It allows you to create, retrieve, update, and delete products. Products can be bicycles or components such as wheels, tires, rims, and disks.

## Base URL

Replace `<base_url>` with the base URL of your server.

## Endpoints

### Add a New Product

- **URL:** `POST /api/v1/products`
- **Description:** Add a new product to the database.
- **Request Body:**

```json
{
  "name": "Mountain Bike Example",
  "description": "A sample mountain bike",
  "price": 999,
  "quantityInStock": 10,
  "category": "Mountain Bike",
  "images": ["url1", "url2"],
  "specifications": {
    "Suspension Type": "Full Suspension",
    "Frame Material": "Aluminum",
    "Wheel Size": "29 inches",
    "Gears": "21-speed"
  },
  "minOrderQuantity": 100
}
```
- # Response:
```
{
  "status": 201,
  "data": {
    "_id": "product_id",
    "name": "Mountain Bike Example",
    "description": "A sample mountain bike",
    "price": 999,
    "quantityInStock": 10,
    "category": "Mountain Bike",
    "images": ["url1", "url2"],
    "specifications": {
      "Suspension Type": "Full Suspension",
      "Frame Material": "Aluminum",
      "Wheel Size": "29 inches",
      "Gears": "21-speed"
    },
    "minOrderQuantity": 100,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "message": "Product created successfully",
  "success": true
}
```
- # Get All Products
- **URL:** - `GET /api/v1/products`
- **Description:** - Retrieve all products available in the database.
- **Response:**
```json
{
  "status": 200,
  "data": [
    {
      "_id": "product_id",
      "name": "Mountain Bike Example",
      "description": "A sample mountain bike",
      "price": 999,
      "quantityInStock": 10,
      "category": "Mountain Bike",
      "images": ["url1", "url2"],
      "specifications": {
        "Suspension Type": "Full Suspension",
        "Frame Material": "Aluminum",
        "Wheel Size": "29 inches",
        "Gears": "21-speed"
      },
      "minOrderQuantity": 100,
      "createdAt": "timestamp",
      "updatedAt": "timestamp"
    },
  ],
  "message": "Products retrieved successfully",
  "success": true
}
```
- # Get a Product by ID:
-**URL -**   `GET /api/v1/products/:id`
- **Description:** Retrieve a specific product by its ID.
Response:
```json
{
  "status": 200,
  "data": {
    "_id": "product_id",
    "name": "Mountain Bike Example",
    "description": "A sample mountain bike",
    "price": 999,
    "quantityInStock": 10,
    "category": "Mountain Bike",
    "images": ["url1", "url2"],
    "specifications": {
      "Suspension Type": "Full Suspension",
      "Frame Material": "Aluminum",
      "Wheel Size": "29 inches",
      "Gears": "21-speed"
    },
    "minOrderQuantity": 100,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "message": "Product retrieved successfully",
  "success": true
}
```
- # Update a Product
- **URL:** PUT /api/v1/products/:id
- **Description:** Update an existing product by its ID.
- **Request Body:**
```json
{
  "price": 899,
  "quantityInStock": 15
}
Save to grepper
Response:
json
Copy code
{
  "status": 200,
  "data": {
    "_id": "product_id",
    "name": "Mountain Bike Example",
    "description": "A sample mountain bike",
    "price": 899,
    "quantityInStock": 15,
    "category": "Mountain Bike",
    "images": ["url1", "url2"],
    "specifications": {
      "Suspension Type": "Full Suspension",
      "Frame Material": "Aluminum",
      "Wheel Size": "29 inches",
      "Gears": "21-speed"
    },
    "minOrderQuantity": 100,
    "createdAt": "timestamp",
    "updatedAt": "timestamp"
  },
  "message": "Product updated successfully",
  "success": true
}
```
- # Delete a Product
- **URL:** DELETE /api/v1/products/:id
- **Description:** Delete an existing product by its ID.
Response:
```json
{
  "status": 200,
  "data": null,
  "message": "Product deleted successfully",
  "success": true
}
```
- # Error Handling
If there's an error in the request, the server will respond with an error status code (4xx or 5xx) and an error message in the response body.