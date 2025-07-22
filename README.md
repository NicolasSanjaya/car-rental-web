# 🚗 Elite Sports Car Rental

A modern, responsive car rental website built with Next.js, featuring premium sports cars and supercars for rental. Experience the thrill of driving the world's most prestigious vehicles with our comprehensive rental platform.

## 🌟 Live Demo

- **Website**: [https://car-rental-web-weld.vercel.app/](https://car-rental-web-weld.vercel.app/)
- **Midtrans Payment**: [https://simulator.sandbox.midtrans.com/bca/va/index](https://simulator.sandbox.midtrans.com/bca/va/index)
- **Blockchain Payment**: [https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en](https://chromewebstore.google.com/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en)

## 📸 Application Screenshots

### 🔐 Authentication Pages

#### Login Page

![Login Page](https://car-rental-web-weld.vercel.app/screenshots/login.png)
_Secure user authentication with clean, modern interface_

#### Register Page

![Register Page](https://car-rental-web-weld.vercel.app/screenshots/register.png)
![OTP](https://car-rental-web-weld.vercel.app/screenshots/otp.png)
_User registration with form validation and OTP verification_

### 🏠 Main Application Pages

#### Home Page

![Home Page](https://car-rental-web-weld.vercel.app/screenshots/home.png)
_Landing page showcasing premium sports cars with hero section and featured vehicles_

#### Cars Collection

![Cars Page](https://car-rental-web-weld.vercel.app/screenshots/cars.png)
_Browse our extensive collection of luxury sports cars with filtering options_

#### Car Details

![Car Details](https://car-rental-web-weld.vercel.app/screenshots/car-detail1.png)
![Car Payment](https://car-rental-web-weld.vercel.app/screenshots/car-detail2.png)
_Detailed car information with high-quality images, specifications, and booking options_

#### About Us

![About Page](https://car-rental-web-weld.vercel.app/screenshots/about.png)
_Company information and our commitment to premium car rental services_

#### Contact Us

![Contact Page](https://car-rental-web-weld.vercel.app/screenshots/contact.png)
_Get in touch with our customer service team through multiple channels_

#### Profile

![Profile Page](https://car-rental-web-weld.vercel.app/screenshots/profile.png)
_Manage your personal information_

#### Bookings

![Bookings Page](https://car-rental-web-weld.vercel.app/screenshots/bookings.png)
_Track your current and past rental bookings with detailed status updates_

### 💳 Payment Integration

#### MetaMask Payment (ETH Sepolia)

![MetaMask Payment Process](https://car-rental-web-weld.vercel.app/screenshots/metamask.png)
_Blockchain payment integration using Ethereum Sepolia testnet_

![MetaMask Transaction Confirmation](https://car-rental-web-weld.vercel.app/screenshots/metamask2.png)
![MetaMask Transaction Confirmation 2](https://car-rental-web-weld.vercel.app/screenshots/metamask3.png)
![MetaMask Transaction Result](https://car-rental-web-weld.vercel.app/screenshots/metamaskresult.png)
_Transaction confirmation and receipt through MetaMask wallet_

#### Midtrans Payment Gateway

![Midtrans Payment Selection](https://car-rental-web-weld.vercel.app/screenshots/midtrans.png)
![Midtrans Payment Selection 2](https://car-rental-web-weld.vercel.app/screenshots/midtrans2.png)
![Midtrans Payment Selection 3](https://car-rental-web-weld.vercel.app/screenshots/midtrans3.png)
_Multiple payment methods available through Midtrans integration_

![Midtrans Payment Process](https://car-rental-web-weld.vercel.app/screenshots/midtrans4.png)
![Midtrans Payment Process 2](https://car-rental-web-weld.vercel.app/screenshots/midtrans5.png)
![Midtrans Payment Result](https://car-rental-web-weld.vercel.app/screenshots/midtransresult.png)
_Secure payment processing with various Indonesian payment methods_

### 🛠️ Admin Panel

#### Car Management

![Car Management](https://car-rental-web-weld.vercel.app/screenshots/car-management.png)
_Admin interface for managing car inventory, pricing, and availability_

![Add/Edit Car](https://car-rental-web-weld.vercel.app/screenshots/car-management2.png)
_Form interface for adding new cars or editing existing inventory_

#### Booking Management

![Booking Dashboard](https://car-rental-web-weld.vercel.app/screenshots/dashboard.png)
![Booking Dashboard 2](https://car-rental-web-weld.vercel.app/screenshots/dashboard2.png)
_Track and manage all rental bookings with status updates_

## ⛓️ Environment Variables

Create a `.env.local` file in your root directory and add the following variables:

```env
# Backend API Configuration
NEXT_PUBLIC_API_URL=http://localhost:8000/api
# or your production API URL: https://your-backend-api.com/api

# Midtrans Payment Gateway
NEXT_PUBLIC_MIDTRANS_CLIENT_KEY=your_midtrans_client_key_here
MIDTRANS_SERVER_KEY=your_midtrans_server_key_here

# Optional: OTP Authentication Service
NEXT_PUBLIC_API_OTP_AUTH_URL=https://your-otp-service.com/api

# Environment
NODE_ENV=development
# Change to 'production' for production deployment
```

### Environment Variable Details

- **NEXT_PUBLIC_API_URL**: Public URL of your Express.js backend server. Make sure it matches the URL where your backend is hosted.
- **NEXT_PUBLIC_MIDTRANS_CLIENT_KEY**: Client-side key for Midtrans integration. Obtain it from the Midtrans Dashboard under the Settings > Access Keys section.
- **MIDTRANS_SERVER_KEY**: Server-side key for secure transactions with Midtrans. Keep this key secret and never expose it to the client.
- **NEXT_PUBLIC_API_OTP_AUTH_URL**: (Optional) Public URL for the OTP authentication service if you are using one.
- **NODE_ENV**: Set this to development during local development or production when deploying the app.

## ✨ Features

### 🎯 Core Features

- **Premium Car Collection**: Handpicked selection of the world's finest supercars and sports cars
- **Dual Payment System**: Support for both traditional (Midtrans) and blockchain (MetaMask) payments
- **Comprehensive Insurance**: Full coverage for peace of mind during rentals
- **Delivery Service**: We bring your dream car directly to your location
- **Online Booking**: Quick and easy online reservation system
- **Admin Dashboard**: Complete management system for inventory and bookings
- **Responsive Design**: Optimized for all devices (mobile, tablet, desktop)

### 🛠️ Technical Features

- **Modern UI/UX**: Clean, professional interface with smooth animations
- **Fast Performance**: Optimized with Next.js for lightning-fast loading
- **SEO Optimized**: Search engine friendly with proper meta tags
- **Mobile-First**: Responsive design that works perfectly on all screen sizes
- **Secure Authentication**: JWT-based authentication with OTP verification
- **Payment Integration**: Multiple payment gateways including blockchain support
- **Real-time Updates**: Live booking status and availability updates

## 🔧 Tech Stack

### Frontend

- **Framework**: [Next.js 14](https://nextjs.org/) - React framework for production
- **Language**: TypeScript/JavaScript
- **Styling**: Tailwind CSS - Utility-first CSS framework
- **Font**: [Geist](https://vercel.com/font) - Optimized font family by Vercel
- **State Management**: React Context API / Redux Toolkit

### Backend Integration

- **Payment Gateways**: Midtrans, MetaMask/Web3
- **Authentication**: JWT tokens with OTP verification
- **API Communication**: Axios for HTTP requests

### Deployment

- **Hosting**: [Vercel](https://vercel.com/) - Seamless deployment platform
- **CDN**: Vercel Edge Network for global performance

## 🚀 Getting Started

### Prerequisites

Make sure you have the following installed:

- Node.js (version 18 or higher)
- npm, yarn, pnpm, or bun package manager
- Git for version control

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/NicolasSanjaya/car-rental-web.git
   cd car-rental-web
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   # or
   bun install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   # Edit .env.local with your configuration
   ```

4. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   # or
   bun dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## 📱 Usage

### For Customers

1. **Browse Cars**: Explore our premium collection of sports cars and supercars
2. **Create Account**: Register and verify your account with OTP
3. **Select Vehicle**: Choose your preferred car from our curated selection
4. **Book Online**: Use our quick and easy reservation system
5. **Choose Payment**: Pay via Midtrans or MetaMask (Ethereum)
6. **Enjoy Delivery**: We'll bring your dream car directly to your location

### For Administrators

1. **Access Admin Panel**: Login with admin credentials
2. **Manage Inventory**: Add, edit, or remove cars from the collection
3. **Track Bookings**: Monitor all rentals and their status
4. **User Management**: Handle customer accounts and support
5. **Analytics**: View dashboard metrics and performance data

### For Developers

- The main page can be edited by modifying `app/page.tsx`
- The page auto-updates as you edit files during development
- All components are built with modern React patterns and Next.js best practices
- Follow the component structure in the `/components` directory

## 📁 Project Structure

```
car-rental-web/
├── app/                    # Next.js app directory
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page
│   │   └── register/      # Registration page
│   ├── (main)/            # Main application routes
│   │   ├── cars/          # Car listing and details
│   │   ├── about/         # About page
│   │   ├── contact/       # Contact page
│   │   └── booking/       # Booking process
│   ├── admin/             # Admin panel routes
│   │   ├── dashboard/     # Admin dashboard
│   │   ├── cars/          # Car management
│   │   ├── users/         # User management
│   │   └── bookings/      # Booking management
│   ├── api/               # API routes
│   ├── page.tsx           # Home page component
│   ├── layout.tsx         # Root layout
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # UI components
│   ├── auth/             # Authentication components
│   ├── car/              # Car-related components
│   └── admin/            # Admin components
├── lib/                  # Utility functions
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
├── public/               # Static assets
│   └── screenshots/      # Application screenshots
├── styles/               # Styling files
├── package.json          # Dependencies and scripts
├── next.config.js        # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
├── tsconfig.json         # TypeScript configuration
└── README.md            # Project documentation
```

## 🚀 Deployment

### Vercel (Recommended)

The easiest way to deploy this Next.js app is using the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme):

1. **Push your code to GitHub**
2. **Import your repository on Vercel**
3. **Configure environment variables**
4. **Vercel will automatically build and deploy your app**

### Other Platforms

This Next.js application can also be deployed on:

- **Netlify** - Great for static deployments
- **Railway** - Simple cloud deployment
- **Heroku** - Traditional cloud platform
- **AWS Amplify** - Amazon's web app platform
- **DigitalOcean App Platform** - Affordable cloud hosting

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 🛠️ Development

### Available Scripts

```bash
npm run dev        # Start development server
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint for code quality
npm run type-check # Run TypeScript compiler check
```

### Code Quality Standards

- **TypeScript**: Use TypeScript for type safety and better development experience
- **ESLint**: Follow Next.js and React best practices
- **Prettier**: Maintain consistent code formatting
- **Responsive Design**: Ensure all components work across devices
- **Accessibility**: Follow WCAG guidelines for inclusive design

### Development Workflow

1. **Create feature branch** from main
2. **Develop and test** your changes locally
3. **Run linting and type checking**
4. **Test responsive design** on different screen sizes
5. **Submit pull request** with detailed description

## 🤝 Contributing

We welcome contributions! Here's how you can help improve the Elite Sports Car Rental platform:

### Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/car-rental-web.git
   ```
3. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
4. **Make your changes**
5. **Commit your changes**
   ```bash
   git commit -m 'Add some amazing feature'
   ```
6. **Push to the branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Development Guidelines

- **Code Style**: Follow the existing code patterns and conventions
- **Documentation**: Add comments for complex logic and update README when needed
- **Testing**: Test your changes thoroughly across different devices and browsers
- **Screenshots**: Update screenshots if your changes affect the UI
- **Performance**: Ensure your changes don't negatively impact performance

### Areas for Contribution

- 🐛 **Bug Fixes**: Help us squash bugs and improve stability
- ✨ **New Features**: Add new functionality to enhance user experience
- 🎨 **UI/UX Improvements**: Make the interface more beautiful and user-friendly
- 📚 **Documentation**: Improve documentation and add examples
- 🧪 **Testing**: Add unit tests and integration tests
- 🌐 **Internationalization**: Add support for multiple languages

## 📞 Support & Documentation

### Getting Help

If you encounter any issues or have questions:

- **📖 Documentation**: Check the [Next.js Documentation](https://nextjs.org/docs)
- **🎓 Learning**: Visit the [Learn Next.js](https://nextjs.org/learn) tutorial
- **🐛 Issues**: Open an issue on [GitHub Issues](https://github.com/NicolasSanjaya/car-rental-web/issues)
- **💬 Discussions**: Join our community discussions

### Common Issues

- **Payment Integration**: Ensure your Midtrans keys are correctly configured
- **MetaMask Connection**: Make sure you're connected to the Sepolia testnet
- **Environment Variables**: Double-check all required environment variables are set
- **Build Errors**: Clear node_modules and reinstall dependencies

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👨‍💻 Author

**Nicolas Sanjaya**

- 🐙 GitHub: [@NicolasSanjaya](https://github.com/NicolasSanjaya)
- 🌐 Website: [Elite Sports Car Rental](https://car-rental-web-weld.vercel.app/)
- 📧 Email: [nicolas.sanjaya@example.com](mailto:nicolas.sanjaya@example.com)
- 💼 LinkedIn: [Nicolas Sanjaya](https://linkedin.com/in/nicolas-sanjaya)

## 🙏 Acknowledgments

- **Framework**: Built with [Next.js](https://nextjs.org/) by Vercel
- **Deployment**: Deployed on [Vercel Platform](https://vercel.com/)
- **Fonts**: Font optimization by [Geist](https://vercel.com/font)
- **Payments**: Powered by [Midtrans](https://midtrans.com/) and [MetaMask](https://metamask.io/)
- **Styling**: Beautiful UI with [Tailwind CSS](https://tailwindcss.com/)
- **Community**: Thanks to the open-source community for inspiration and resources

## 🔮 Future Enhancements

- **🔔 Push Notifications**: Real-time booking updates
- **🗺️ GPS Tracking**: Track rental vehicles in real-time
- **📊 Advanced Analytics**: Detailed admin analytics dashboard
- **🤖 AI Recommendations**: Personalized car recommendations
- **📱 Mobile App**: Native iOS and Android applications
- **🌐 Multi-language**: Support for multiple languages
- **🔄 Subscription Model**: Monthly and yearly rental subscriptions

---

<div align="center">
  
### 🏎️ **Experience the thrill of driving the world's most prestigious supercars!** 🏎️

[![Vercel](https://img.shields.io/badge/Deployed%20on-Vercel-black?style=for-the-badge&logo=vercel)](https://car-rental-web-weld.vercel.app/)
[![Next.js](https://img.shields.io/badge/Built%20with-Next.js-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)

**[🚀 View Live Demo](https://car-rental-web-weld.vercel.app/) | [📋 Report Bug](https://github.com/NicolasSanjaya/car-rental-web/issues) | [💡 Request Feature](https://github.com/NicolasSanjaya/car-rental-web/issues)**

</div>
