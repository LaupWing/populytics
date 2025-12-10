# Populytics Shop

A modern e-commerce platform built with Laravel and React for selling educational materials and toolkits focused on civic participation and policy-making.

## Tech Stack

### Backend
- **Laravel 12** - PHP framework
- **Laravel Fortify** - Authentication with 2FA support
- **Laravel Policies** - Authorization
- **Laravel Mail** - Markdown email templates

### Frontend
- **React 19** - UI framework
- **Inertia.js** - Server-side rendering
- **Zustand** - State management (cart with localStorage persistence)
- **Tailwind CSS 4** - Styling
- **Radix UI** - Headless UI components
- **Lucide React** - Icons
- **Sonner** - Toast notifications
- **TypeScript** - Type safety
- **Vite** - Build tool

## Features

### Customer Features
- **Product Catalog** - Browse products on homepage with grid layout
- **Product Detail Pages** - View full product information at `/products/{id}`
- **Shopping Cart** - Add/remove items, adjust quantities, persistent via localStorage
- **Checkout** - Order placement with validation, shipping calculation
- **Order History** - View all orders on profile page
- **Order Details** - Full order information with status tracking
- **Order Confirmation Email** - Automatic email sent after checkout

### Admin Features
- **Orders Dashboard** (`/admin/orders`) - View all customer orders
- **Order Statistics** - Total orders, revenue, processing/accepted counts
- **Status Management** - Update order status (Processing/Accepted)

### Authentication
- User registration and login
- Password reset
- Two-factor authentication (2FA)
- Email verification
- Session management

## Database Structure

### Tables

| Table | Description |
|-------|-------------|
| `users` | User accounts with 2FA support |
| `products` | Product catalog (title, description, price, image_url) |
| `orders` | Customer orders with status enum |
| `order_products` | Pivot table with quantity and price_at_purchase |

### Relationships
- User → Orders (One-to-Many)
- Order ↔ Products (Many-to-Many via pivot)

## Project Structure

```
app/
├── Enums/
│   └── OrderStatus.php          # Processing, Accepted
├── Http/
│   └── Requests/
│       └── CheckoutRequest.php  # Order validation (quantity > 0, price > 0)
├── Mail/
│   └── OrderConfirmation.php    # Order confirmation email
├── Models/
│   ├── User.php
│   ├── Product.php
│   └── Order.php
└── Policies/
    └── OrderPolicy.php          # Order authorization

resources/
├── js/
│   ├── components/
│   │   ├── product-card.tsx     # Product display component
│   │   └── ui/                  # Shadcn/Radix components
│   ├── pages/
│   │   ├── welcome.tsx          # Homepage with product catalog
│   │   ├── cart.tsx             # Shopping cart
│   │   ├── checkout.tsx         # Order confirmation
│   │   ├── profile.tsx          # User profile & order history
│   │   ├── products/
│   │   │   └── show.tsx         # Product detail page
│   │   ├── orders/
│   │   │   └── show.tsx         # Order detail page
│   │   ├── admin/
│   │   │   └── orders.tsx       # Admin orders management
│   │   └── errors/
│   │       └── unauthorized-order.tsx
│   └── stores/
│       └── cart-store.ts        # Zustand cart with localStorage
└── views/
    └── emails/
        └── orders/
            └── confirmation.blade.php  # Order email template

routes/
├── web.php                      # Main application routes
└── settings.php                 # User settings routes
```

## Routes

### Public
| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Homepage with product catalog |
| GET | `/cart` | Shopping cart |
| GET | `/products/{product}` | Product detail page |

### Authenticated
| Method | Route | Description |
|--------|-------|-------------|
| POST | `/checkout` | Place order (validated) |
| GET | `/profile` | User order history |
| GET | `/orders/{order}` | Order details (authorized) |
| GET | `/admin/orders` | Admin orders list |
| PATCH | `/admin/orders/{order}/status` | Update order status |

## Validation

The `CheckoutRequest` validates all orders:

```php
'items' => ['required', 'array', 'min:1'],
'items.*.id' => ['required', 'integer', 'exists:products,id'],
'items.*.quantity' => ['required', 'integer', 'gt:0'],
'items.*.price' => ['required', 'numeric', 'gt:0'],
```

Invalid requests return HTTP 422 with error messages.

## Business Logic

### Shipping
- **Free shipping**: Orders €50 or above
- **Shipping cost**: €4.95 for orders under €50
- **Delivery time**: 2-4 business days

### Order Status
- `processing` - Order received, being prepared
- `accepted` - Order confirmed and shipped

## Installation

```bash
# Install dependencies
composer install
npm install

# Environment setup
cp .env.example .env
php artisan key:generate

# Database
php artisan migrate
php artisan db:seed

# Development server
npm run dev
```

## Test Credentials

```
Email: test@example.com
Password: password
```

## Seeded Products

| Product | Price |
|---------|-------|
| DIY Participation Toolkit | €89.00 |
| Policy Making Board Game | €49.00 |

## Branding

### Colors
- Primary: `#004876` (Dark Navy)
- Secondary: `#00A6D6` (Cyan)
- Accent: `#0066A2` (Medium Navy)

### Typography
- Font: NexaText (Bold, Book, Heavy)

## License

Proprietary - Populytics B.V.

## Contact

- **Address**: Strawinskylaan 339, 1077 XX Amsterdam
- **Email**: info@populytics.nl
