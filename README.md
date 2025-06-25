# TechFix Solutions

A multi-component application for managing technical repair operations, inventory, and customer interactions.

## Overview

**TechFix Solutions** aims to streamline repair service management, inventory tracking, and customer handling. It consists of a React-based client and a .NET-based backend service.

---

## Architecture Diagram

```mermaid
graph TD
    A[User] -- interacts --> B[React Client App]
    B -- API Calls --> C[.NET InventoryService]
    C -- Data --> D[(Database)]
    C -- Sends Responses --> B
```

---
## Sequence Diagram

```mermaid
sequenceDiagram
    participant Customer
    participant ClientApp as "Client App"
    participant Backend as "InventoryService"
    participant DB as "Database"

    Customer->>ClientApp: Submit Repair Request
    ClientApp->>Backend: POST /repairs
    Backend->>DB: Save Repair Info
    DB-->>Backend: Confirmation
    Backend-->>ClientApp: Success Response
    ClientApp-->>Customer: Show Confirmation
```

---

## Getting Started

### Prerequisites

- Node.js & npm (for client)
- .NET 8.0 SDK (for backend)
- Database (SQL Server or as configured)

### Setup

```bash
# Client setup
cd techfixsolutions-client
npm install
npm start

# Backend setup
cd TechFixSolutions.InventoryService
dotnet build
dotnet run
```


## Project Structure

```
TechFix-Solutions---Overall/
│
├── techfixsolutions-client/      # React frontend
├── TechFixSolutions.InventoryService/  # .NET backend service



