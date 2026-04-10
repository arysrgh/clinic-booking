# Clinic Booking App (Fullstack)

##  Overview

A simple **clinic booking system** that connects a mobile application (Flutter) with a backend API (Node.js).
Users can browse available appointment slots, create bookings, and manage their appointments.

This project demonstrates **end-to-end development**, including:

* Mobile UI (Flutter)
* Backend API (Node.js + Express)
* Database management (PostgreSQL + Prisma)
* API integration
* Booking system logic

---

## Tech Stack

### Frontend (Mobile)

-Flutter
- Dart
-HTTP package

### Backend

- Node.js
- Express.js
- Prisma ORM

### Database

- PostgreSQL

---

##  System Architecture

```
Flutter App  →  REST API (Express)  →  Prisma ORM  →  PostgreSQL
```

---

##  Features

### 🔐Authentication

* Simple/dummy login flow (no real auth for simplicity)

###  Regions

* View list of clinic regions

###  Doctors

* Filter doctors by region

###  Appointment Slots

* View available slots by:

  * Region
  * Doctor
  * Date

### Booking System (Core)

* Create booking (encounter)
* Prevent double booking
* Update slot availability automatically

###  Cancel Booking (Optional if implemented)

* Cancel booking
* Restore slot availability

---

##  Project Structure

### Backend

```
clinic-booking-backend/
 ├── src/
 │    ├── routes/
 │    │    ├── auth.js
 │    │    ├── regions.js
 │    │    ├── doctors.js
 │    │    ├── slots.js
 │    │    ├── encounters.js
 │    ├── index.js
 │
 ├── prisma/
 │    ├── schema.prisma
 │    ├── seed.js
 │
 ├── .env
 ├── package.json
```

### Frontend

```
clinic_booking_app/
 ├── lib/
 │    ├── screens/
 │    ├── services/
 │    ├── main.dart
```

---

##  Setup & Installation

---

### Backend Setup

#### 1. Install dependencies

```bash
npm install
```

---

#### 2. Setup environment

Create `.env`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/clinic_db"
```

---

#### 3. Run database migration

```bash
npx prisma migrate dev --name init
```

---

#### 4. Generate Prisma client

```bash
npx prisma generate
```

---

#### 5. Seed database

```bash
node prisma/seed.js
```

---

#### 6. Run server

```bash
npm start
```

Server runs on:

```
http://localhost:3000
```

---

### 📱 Flutter Setup

#### 1. Install dependencies

```bash
flutter pub get
```

---

#### 2. Run app

```bash
flutter run
```

---

#### ⚠️ Emulator Note

If using Android Emulator:

```dart
baseUrl = "http://10.0.2.2:3000";
```

---

## 🔌 API Endpoints

### Auth

```
POST /auth/login
POST /auth/refresh
```

---

### Regions

```
GET /regions
```

---

### Doctors

```
GET /doctors?region_id={region_id}
```

---

### Appointment Slots

```
GET /appointment-slots?region_id=&doctor_id=&date=
```

---

### Booking (Encounter)

#### Create Booking

```
POST /encounters
```

Request:

```json
{
  "user_id": "xxx",
  "doctor_id": "xxx",
  "region_id": "xxx",
  "appointment_slot_id": "xxx"
}
```

---

#### Get Bookings

```
GET /encounters
```

---

#### Cancel Booking

```
DELETE /encounters/{id}
```

---

##  Key Design Decisions

### 1. Prisma ORM

Chosen for:

* Type safety
* Fast development
* Easy schema management

---

### 2. PostgreSQL

Chosen because:

* Strong relational consistency
* Ideal for booking systems
* Supports indexing & constraints

---

### 3. Booking Transaction

Booking uses **database transaction** to:

* Prevent race condition
* Ensure slot is not double booked

---

### 4. Slot Availability Logic

* `is_available = true` → can be booked
* `is_available = false` → already booked

---

##  Testing

### Manual Testing

* Postman / Thunder Client
* Test scenarios:

  * Successful booking
  * Double booking (should fail)
  * Invalid input

---

##  Assumptions

* Authentication is simplified
* Single user role (patient)
* No timezone handling
* No real-time updates

---

##  Trade-offs

* Simplicity over complexity
* No caching implemented
* No advanced UI/UX animations

---

## Bonus (If implemented)

* Role-based access
* Cancel booking logic
* Slot rescheduling
* Basic logging

---

## Author

Developed as a take-home assignment for Fullstack Developer role.

---

## 📎 Notes

Focus was placed on:

* Clean architecture
* Reliable booking flow
* Clear API design
* End-to-end functionality
