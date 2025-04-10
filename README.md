# acme ice cream shop

![postman](https://i.imgur.com/pUeRSk2.png)
![status codes](https://i.imgur.com/KtCTHRQ.png)

## Overview

A RESTful API for managing Acme Ice Cream Shop's flavor inventory using Express.js and PostgreSQL. Provides full CRUD operations for ice cream flavors with proper database persistence and error handling.

## Features

- View all ice cream flavors
- Get detailed information about a specific flavor
- Add new flavors to the database
- Update existing flavors
- Delete flavors

## Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Postman

## API Endpoints

Base URL: `http://localhost:3000/api`

| Method | Endpoint        | Description                  |
| ------ | --------------- | ---------------------------- |
| GET    | `/flavors`      | Get all ice cream flavors    |
| GET    | `/flavors/{id}` | Get single flavor details    |
| POST   | `/flavors`      | Add new flavor               |
| PUT    | `/flavors/{id}` | Update existing flavor       |
| DELETE | `/flavors/{id}` | Remove flavor from inventory |

## Contact

[![LinkedIn](https://img.shields.io/badge/LinkedIn-Connect-blue)](https://www.linkedin.com/in/elvis-espinoza/)  
✉️ elvis.espinoza.navarrete@outlook.com

## Acknowledgments

- Fullstack Academy instructors
