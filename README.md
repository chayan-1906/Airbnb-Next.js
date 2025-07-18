# 🏠 Airbnb Clone - Full-Stack Property Rental Platform

[![Next.js](https://img.shields.io/badge/Next.js-14.2.4-000000.svg)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-5.x-47A248.svg)](https://www.mongodb.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5.15.1-2D3748.svg)](https://www.prisma.io/)
[![NextAuth](https://img.shields.io/badge/NextAuth-4.24.7-purple.svg)](https://next-auth.js.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4.1-38B2AC.svg)](https://tailwindcss.com/)

> Full-stack Airbnb clone built with Next.js 14, featuring property listings, booking system, user authentication, search filters, favorites, and interactive maps. 🔐 NextAuth • 🗄️ MongoDB • 🎨 Tailwind CSS • 📱 Responsive Design

![logo](https://raw.githubusercontent.com/chayan-1906/Airbnb-Next.js/master/public/images/logo.png)

## ✨ Features

- 🏠 **Property Listings** - Create, view, and manage property listings 📝
- 🔍 **Advanced Search** - Filter by location, dates, guests, and categories 🎯
- 📅 **Booking System** - Complete reservation management with calendar 📆
- 💖 **Favorites** - Save and manage favorite properties ❤️
- 🔐 **Authentication** - NextAuth with Google, GitHub, and email login 🔒
- 🗺️ **Interactive Maps** - Leaflet integration for property locations 📍
- 👤 **User Dashboard** - Manage trips, properties, and reservations 🏢
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS 📲
- 🎨 **Modern UI** - Clean, intuitive interface with smooth animations ✨
- 🌐 **Multi-Provider Auth** - Social login integration 🔗

## [Live Site (Vercel)](https://airbnb-nextt.vercel.app/)

## 📱 Screenshots

<table>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/6f6a7a86-f010-44cf-9cb0-b5cb085135eb" alt="Login Modal" width="480px"/></td>
        <td><img src="https://github.com/user-attachments/assets/4217fb92-48e0-4266-9ff0-de0b6f9dfc0f" alt="Listings" width="480px"/></td>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/48ce99ad-088c-4735-8921-1f2132e211ee" alt="Listing Details" width="480px"/></td>
        <td><img src="https://github.com/user-attachments/assets/975e5c11-053c-4358-aa98-99d76ff1135b" alt="Trips" width="480px"/></td>
    </tr>
    <tr>
        <td><img src="https://github.com/user-attachments/assets/db0a1e60-906f-4d96-9846-72fea8ad916e" alt="Favorites" width="480px"/></td>
        <td><img src="https://github.com/user-attachments/assets/af15051c-1625-433c-8c4c-1c309e7ee848" alt="Airbnb Your Home" width="480px"/></td>
    </tr>
</table>

## 🏗️ Tech Stack

### 🖥️ Frontend
- ⚛️ **Next.js** 14.2.4 - React framework 🚀
- 📘 **React** 18 - UI library 🎨
- 🎯 **Tailwind CSS** 3.4.1 - Utility-first CSS 💅
- 🎭 **React Icons** 5.2.1 - Icon library 🌟

### 🗄️ Backend & Database
- 🔗 **Prisma** 5.15.1 - Database ORM 🛠️
- 📊 **MongoDB** - NoSQL database 🍃
- 🔐 **NextAuth** 4.24.7 - Authentication 👤
- 🔒 **bcrypt** 5.1.1 - Password hashing 🔐

### 🌍 Maps & Location
- 🗺️ **Leaflet** 1.9.4 - Interactive maps 📍
- ⚛️ **React Leaflet** 4.2.1 - React wrapper 🗺️
- 🌎 **World Countries** 5.0.0 - Country data 🌍

### 🎨 UI Components
- 📝 **React Hook Form** 7.52.0 - Form management 📋
- 📅 **React Date Range** 2.0.1 - Date picker 📆
- 🎨 **React Select** 5.8.0 - Select components 🎯
- 🔥 **React Hot Toast** 2.4.1 - Toast notifications 🍞
- 🌀 **React Spinners** 0.14.1 - Loading indicators ⏳

### 📦 Utilities
- 🔄 **Axios** 1.7.2 - HTTP client 🌐
- 📅 **Date-fns** 3.6.0 - Date utilities 🕰️
- 🔍 **Query String** 9.0.0 - URL parsing 🔗
- 🏪 **Zustand** 4.5.2 - State management 📦
- ☁️ **Cloudinary** 6.6.2 - Image hosting 📸

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 🟢
- MongoDB database 🗄️
- Cloudinary account ☁️
- NextAuth providers (Google, GitHub) 🔐

### Installation

1. **Clone repository** 📥
   ```bash
   git clone https://github.com/chayan-1906/Airbnb-Next.js.git
   cd Airbnb-Next.js
   ```

2. **Install dependencies** 📦
   ```bash
   npm install
   ```

3. **Environment setup** ⚙️
   ```bash
   cp .env.example .env
   ```

4. **Configure environment** 🔧
   ```env
   DATABASE_URL="mongodb+srv://..."
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   GITHUB_ID="your-github-id"
   GITHUB_SECRET="your-github-secret"
   
   GOOGLE_CLIENT_ID="your-google-client-id"
   GOOGLE_CLIENT_SECRET="your-google-client-secret"
   
   NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
   NEXT_PUBLIC_CLOUDINARY_API_KEY="your-cloudinary-api-key"
   CLOUDINARY_API_SECRET="your-cloudinary-api-secret"
   ```

5. **Database setup** 🗄️
   ```bash
   npx prisma db push
   ```

6. **Start development server** 🚀
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
app/
├── api/                 # API routes
│   ├── auth/           # NextAuth configuration
│   ├── listings/       # Property CRUD operations
│   ├── reservations/   # Booking management
│   └── favorites/      # Favorites management
├── components/         # Reusable components
│   ├── inputs/         # Form components
│   ├── listings/       # Property components
│   ├── modals/         # Modal components
│   └── navbar/         # Navigation components
├── hooks/              # Custom React hooks
├── libs/               # Utility libraries
├── providers/          # Context providers
├── favorites/          # Favorites page
├── trips/              # User trips
├── properties/         # User properties
└── reservations/       # User reservations
```

## 🔧 Core Features

### 🏠 Property Management
- **Create Listing** - Multi-step form with image upload 📸
- **Category Selection** - Beach, mountain, city, etc. 🏖️
- **Location Picker** - Interactive map integration 🗺️
- **Pricing & Details** - Room count, amenities, description 💰

### 🔍 Search & Filtering
- **Location Search** - Country/city selection 🌍
- **Date Range** - Check-in/out calendar 📅
- **Guest Count** - Adults, children, infants 👥
- **Category Filter** - Property type filtering 🏠

### 📅 Booking System
- **Calendar Integration** - Available dates display 📆
- **Price Calculation** - Dynamic pricing with fees 💵
- **Reservation Management** - Book, cancel, view trips 🎫
- **Conflict Prevention** - Prevent double bookings ⚠️

### 🔐 Authentication
- **NextAuth Integration** - Multiple providers 🔗
- **User Sessions** - Secure session management 🔒
- **Protected Routes** - Authentication guards 🛡️
- **User Profiles** - Profile management 👤

## 🗄️ Database Schema

### User Model
```typescript
{
  id: String            // MongoDB ObjectId
  name: String?         // User display name
  email: String         // Unique email
  image: String?        // Profile picture URL
  hashedPassword: String? // Encrypted password
  favoriteIds: String[] // Favorite property IDs
  createdAt: DateTime   // Account creation
  updatedAt: DateTime   // Last update
}
```

### Listing Model
```typescript
{
  id: String            // MongoDB ObjectId
  title: String         // Property title
  description: String   // Property description
  imageSrc: String      // Main image URL
  category: String      // Property category
  roomCount: Int        // Number of rooms
  bathroomCount: Int    // Number of bathrooms
  guestCount: Int       // Max guests
  locationValue: String // Country/location
  price: Int           // Price per night
  userId: String       // Owner ID
  createdAt: DateTime  // Creation date
}
```

### Reservation Model
```typescript
{
  id: String           // MongoDB ObjectId
  userId: String       // Guest ID
  listingId: String    // Property ID
  startDate: DateTime  // Check-in date
  endDate: DateTime    // Check-out date
  totalPrice: Int      // Total cost
  createdAt: DateTime  // Booking date
}
```

## 🛠️ API Endpoints

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| `GET` | `/api/listings` | Get all listings | ❌ |
| `POST` | `/api/listings` | Create new listing | ✅ |
| `DELETE` | `/api/listings/[id]` | Delete listing | ✅ |
| `GET` | `/api/reservations` | Get user reservations | ✅ |
| `POST` | `/api/reservations` | Create reservation | ✅ |
| `DELETE` | `/api/reservations/[id]` | Cancel reservation | ✅ |
| `POST` | `/api/favorites/[id]` | Add to favorites | ✅ |
| `DELETE` | `/api/favorites/[id]` | Remove from favorites | ✅ |
| `POST` | `/api/register` | User registration | ❌ |

## 🎨 UI Components

### 🏠 Listing Components
- **ListingCard** - Property card with image, price, location 🏡
- **ListingHead** - Property header with title, location, actions 📋
- **ListingInfo** - Property details, host info, amenities 📝
- **ListingReservation** - Booking form with calendar 📅

### 🔧 Input Components
- **Input** - Styled form inputs with validation 📝
- **Counter** - Number input with increment/decrement 🔢
- **ImageUpload** - Cloudinary image upload 📸
- **Calendar** - Date range picker 📅
- **CategoryInput** - Category selection 🏷️

### 🎭 Modal Components
- **LoginModal** - User authentication 🔐
- **RegisterModal** - User registration 📝
- **RentModal** - Property creation wizard 🏠
- **SearchModal** - Advanced search filters 🔍

## 📱 Responsive Design

### 📲 Mobile Features
- **Touch-friendly** interface 👆
- **Collapsible** navigation 📱
- **Optimized** images 🖼️
- **Swipe** gestures 👋

### 🖥️ Desktop Features
- **Hover** effects 🖱️
- **Keyboard** navigation ⌨️
- **Multi-column** layouts 📊
- **Sidebar** navigation 📋

## 🔒 Security Features

- **Password hashing** with bcrypt 🔐
- **CSRF protection** via NextAuth 🛡️
- **Input validation** and sanitization 🔍
- **Rate limiting** on API endpoints ⚡
- **Secure headers** configuration 🔒

## 📈 Performance

- **Server-side rendering** for SEO 🚀
- **Image optimization** with Next.js 🖼️
- **Code splitting** for faster loads 📦
- **Caching** strategies 💾
- **Lazy loading** components ⏳

## 🔧 Development Scripts

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Generate Prisma client
npm run prisma:generate

# Run on custom port
npm run serve
```

## 🚀 Deployment

### Vercel Deployment
1. **Connect** GitHub repository 🔗
2. **Configure** environment variables ⚙️
3. **Deploy** automatically on push 🚀

### Environment Variables
- `DATABASE_URL` - MongoDB connection string
- `NEXTAUTH_SECRET` - NextAuth secret key
- `NEXTAUTH_URL` - Application URL
- `GITHUB_ID` - GitHub OAuth app ID
- `GITHUB_SECRET` - GitHub OAuth secret
- `GOOGLE_CLIENT_ID` - Google OAuth client ID
- `GOOGLE_CLIENT_SECRET` - Google OAuth secret
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` - Cloudinary cloud name
- `NEXT_PUBLIC_CLOUDINARY_API_KEY` - Cloudinary API Key
- `CLOUDINARY_API_SECRET` - Cloudinary API Secret

## 📋 Requirements

- **Node.js:** ≥18.0.0 🟢
- **MongoDB:** ≥5.0 🗄️
- **Memory:** 1GB RAM minimum 💾
- **Storage:** 2GB disk space 💿

## 🤝 Contributing

1. Fork repository 🍴
2. Create feature branch (`git checkout -b feature/amazing-feature`) 🌟
3. Commit changes (`git commit -m 'Add amazing feature'`) 💾
4. Push branch (`git push origin feature/amazing-feature`) 🚀
5. Open Pull Request 📝

## 🐛 Known Issues

- Map rendering on mobile devices may be slow 🗺️
- Image upload requires stable internet connection 📸

## 👨‍💻 Author

**Padmanabha Das**

- GitHub: [@chayan-1906](https://github.com/chayan-1906) 🐙
- LinkedIn: [Padmanabha Das](https://www.linkedin.com/in/padmanabha-das-59bb2019b/) 💼
- Email: padmanabhadas9647@gmail.com 📧

## 🌟 Show Your Support

Give a ⭐️ if this project helped you! 🙏

---

<div align="center">
  <p>Made with ❤️ by Padmanabha Das</p>
  <p>⭐ Star this repo if you found it helpful!</p>
</div>
