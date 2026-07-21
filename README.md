# Destination Holiday - Premium Full-Stack MERN Hotel Booking & Management System

A highly polished, production-grade hotel booking and management platform built using the MERN stack (MongoDB, Express.js, React, Node.js) with TypeScript. Rebranded completely to **Destination Holiday**, this platform features an automated geocoded on-demand database ingestion pipeline, zero-lag write-replication database bypass, a failsafe in-memory seeder, strict client-side form validation, and a beautiful premium Deep Teal sea-green color aesthetic.

- **Live Demo:**
Frontend url-https://destination-holiday-hotel-booking-w.vercel.app/
Backend url-https://destination-holiday-hotel-booking-website.onrender.com
- 

---

## 🎨 Rebranding & Architectural Highlights

<img width="947" height="443" alt="image" src="https://github.com/user-attachments/assets/84ffb581-3755-487d-ab69-e9df77e79339" />
<img width="946" height="441" alt="image" src="https://github.com/user-attachments/assets/5ade36fc-7874-4e4d-a376-75bd2db53c72" />
<img width="944" height="449" alt="image" src="https://github.com/user-attachments/assets/7d7780f5-805f-40e3-b25b-dd43b61a797b" />
<img width="957" height="437" alt="image" src="https://github.com/user-attachments/assets/cb355823-7590-4fcf-8175-107a4a45ddb2" />
<img width="944" height="436" alt="image" src="https://github.com/user-attachments/assets/541b266c-0c80-447b-ae7b-7332063d2375" />
<img width="760" height="434" alt="image" src="https://github.com/user-attachments/assets/4afea0ef-beb4-4256-a055-4b1e8b1a43e3" />



## ✨ Core Features

### 🏨 Hotel Management Engine
- **Multi-Role RBAC System**: Granular access control for Guest Users, Hotel Owners, and Admins.
- **Full Property CRUD**: Complete management dashboard for hotel owners to list, edit, or delete accommodations.
- **Cloud Image Management**: Integration with Cloudinary for seamless upload, optimization, and compression of hotel interior images.
- **Detailed Profiles**: Manage hotel amenities, rules, checkout policies, and geolocation coordinates.

### 🔍 Smart Search & Filtering
- **Dynamic Ingestion**: If a searched city is not found, the ingestion engine dynamically loads 15 unique hotels (exactly 3 hotels for each star rating from 1 to 5) to guarantee balanced search results.
- **Multi-Criteria Filters**: Filter properties by Price Range (realistic Rupee points: `1000` to `15000`), Star Ratings, Hotel Types, and Key Facilities.
- **Sorting Options**: Dynamic sorting by Price (Low to High / High to Low), Star Ratings, and Relevance.
- **Database Housekeeping**: The seeder automatically deletes older cities' hotels when a third city is searched, keeping only the 2 most recently searched cities in the database to maintain a clean homepage.

### 📊 Business Insights Dashboard
- **Real-Time Revenue Metrics**: Track daily bookings, occupancy rates, and overall revenue.
- **Performance Forecasting**: Interactive trend lines showing booking velocities and predictive growth patterns using Recharts.
- **Memory & System Diagnostics**: Embedded detailed health endpoints displaying CPU, memory, and database status.

---

## 🛠️ Technical Stack

### Frontend
- **React 18.2.0** (with Functional Hooks & Context state management)
- **TypeScript 5.0.2** (for absolute type-safety)
- **Vite** (Next-generation high-speed frontend bundler)
- **React Query** (Server state synchronization and intelligent caching)
- **Tailwind CSS** (Utility-first framework customized with Teal HSL themes)
- **Lucide React** (Consistent modern icon packs)
- **React Hook Form** (Clean form handling and strict custom validations)

### Backend
- **Node.js** & **Express.js** (REST API architecture)
- **TypeScript** (compiled via `tsc` with parent-level `shared` root boundary mapping)
- **MongoDB** & **Mongoose** (Document object modeling and schema indexing)
- **JSON Web Tokens (JWT)** (Secure cookie-based and authorization header session management)
- **bcryptjs** (Enterprise-grade password hashing)
- **Stripe** (Rebranded to Indian Rupees `INR` currency checkouts)

---

## 📁 repo Layout

```bash
destination-holiday/
├── hotel-booking-frontend/          # React Vite Frontend SPA
│   ├── src/
│   │   ├── components/             # Reusable UI Components (Header, Footer, PriceFilter)
│   │   ├── forms/                  # BookingForm, GuestInfoForm, ManageHotelForm
│   │   ├── pages/                  # Search.tsx, Booking.tsx, Home.tsx, AnalyticsDashboard.tsx
│   │   ├── lib/                    # api-client.ts (custom error extractor interceptor)
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
├── hotel-booking-backend/         # Node.js Express Backend API
│   ├── src/
│   │   ├── routes/                 # hotels.ts (failsafe seeder), auth.ts, users.ts
│   │   ├── models/                 # mongoose schemas (User, Hotel, Booking)
│   │   ├── middleware/             # auth.ts (failsafe JWT token verification)
│   │   └── index.ts                # Server entry point & env validators
│   └── package.json
├── shared/                         # Shared TypeScript Interfaces (HotelType, BookingType)
│   └── types.ts
```

---

## 🚀 Installation & Local Setup

### Step 1: Install Dependencies
Install packages in both frontend and backend directories:

```bash
# In hotel-booking-backend directory
cd hotel-booking-backend
npm install --include=dev --legacy-peer-deps

# In hotel-booking-frontend directory
cd ../hotel-booking-frontend
npm install --include=dev --legacy-peer-deps
```

### Step 2: Environment Configuration

#### Backend Environment Settings (`hotel-booking-backend/.env`)
Create a `.env` file inside the backend directory:
```env
PORT=5001
NODE_ENV=development
MONGODB_CONNECTION_STRING=your_mongodb_connection_string
JWT_SECRET_KEY=your_secure_jwt_secret_key
FRONTEND_URL=http://localhost:5174
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
STRIPE_API_KEY=your_stripe_test_secret_key
```

#### Frontend Environment Settings (`hotel-booking-frontend/.env`)
Create a `.env` file inside the frontend directory:
```env
VITE_API_BASE_URL=http://localhost:5001
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_test_publishable_key
```

### Step 3: Run the Application

#### Start the Backend Server (with TypeScript live watch):
```bash
cd hotel-booking-backend
npm run dev
# Backend starts on http://localhost:5001
```

#### Start the Frontend Server:
```bash
cd hotel-booking-frontend
npm run dev
# Frontend starts on http://localhost:5174
```

---

## 📚 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` - Create a new user account with unique email checks.
- `POST /api/auth/login` - Authenticate credentials and return JWT session tokens.
- `POST /api/auth/logout` - Invalidate user session and clear authentication cookies.
- `GET /api/auth/validate-token` - Verify token validity and return active user ID.

### 🏨 Hotel Management
- `GET /api/hotels/search` - Search and filter hotels dynamically.
- `GET /api/hotels/:id` - Fetch comprehensive details of a specific hotel listing.
- `POST /api/my-hotels` - Create a new hotel listing (requires Hotel Owner or Admin role).
- `PUT /api/my-hotels/:id` - Update listed hotel specifications.
- `DELETE /api/my-hotels/:id` - Permanently remove a hotel listing.

### 📅 Booking Engine
- `POST /api/hotels/:hotelId/bookings` - Confirm stay reservations (bypasses Stripe dependency in development failsafe mode).
- `POST /api/hotels/:hotelId/bookings/payment-intent` - Create safe `INR` payment intents.
- `GET /api/my-bookings` - Retrieve current guest's complete booking history.

