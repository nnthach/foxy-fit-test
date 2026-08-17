# Foxy Fit - Order & Checkout API

A RESTful Order & Checkout API built with **Express.js, TypeScript, PostgreSQL, Drizzle ORM, Zod, Docker, and Docker Compose**.

The project implements a complete checkout flow including product validation, stock checking, price calculation, stock deduction, order creation, transaction handling, and order detail retrieval.

---

## Tech Stack

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- Drizzle ORM
- Zod
- Docker
- Docker Compose

---

# Features

## Checkout

`POST /api/orders`

- Validate request body
- Validate product ID and quantity
- Check whether products exist
- Check product stock
- Calculate total amount using the price stored in the database
- Decrease product stock
- Automatically update product stock status
- Create order
- Create order items
- Use database transactions to prevent partial updates
- Use row-level locking to prevent stock race conditions

## Order Detail

`GET /api/orders/:id`

- Get order information by ID
- Return order status
- Return total amount
- Return order items
- Return product name, price, quantity and subtotal
- Return `404` when the order does not exist

---

---

# Environment Variables

Create a `.env` file in the project root:

```env
# Postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=order_checkout_db
POSTGRES_PORT=5432

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/order_checkout_db

# App
PORT=3000
```

### Environment Variables Description

| Variable            | Description               |
| ------------------- | ------------------------- |
| `POSTGRES_USER`     | PostgreSQL username       |
| `POSTGRES_PASSWORD` | PostgreSQL password       |
| `POSTGRES_DB`       | PostgreSQL database name  |
| `POSTGRES_PORT`     | PostgreSQL port           |
| `DATABASE_URL`      | PostgreSQL connection URL |
| `PORT`              | Application port          |

> When running the application with Docker Compose, the PostgreSQL host is configured as `db` inside the Docker network. If your `docker-compose.yml` overrides `DATABASE_HOST`, the application will connect to the PostgreSQL container automatically.

---

# API Documentation

## 1. Create Order

### Endpoint

`POST /api/orders`

### Request Body

```json
{
  "items": [
    {
      "productId": 1,
      "quantity": 3
    }
  ]
}
```

## 2. Get Order Detail

### Endpoint

`GET /api/orders/:id`

---

# Requirements

Make sure you have installed:

- Docker
- Docker Compose

No local PostgreSQL installation is required when running the project with Docker.

---

# Installation

## 1. Clone the repository

```bash
git clone <YOUR_REPOSITORY_URL>
cd foxy-fit-test
```

## 2. Environment Variables

Create a `.env` file in the project root:

```env
# Postgres
POSTGRES_USER=postgres
POSTGRES_PASSWORD=postgres
POSTGRES_DB=order_checkout_db
POSTGRES_PORT=5432

DATABASE_URL=postgresql://postgres:postgres@localhost:5432/order_checkout_db

# App
PORT=3000
```

## 3. Run with Docker

The project automatically runs database migrations and seeds sample products when the API container starts.

```bash
docker compose up --build
