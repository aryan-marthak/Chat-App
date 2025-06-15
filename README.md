# Real-Time Chat Application

A modern real-time chat application built with React, Node.js, Express, MongoDB, and Socket.IO. This application allows users to chat in real-time with features like user authentication, message history, and online status indicators.

## Features

- 🔐 User Authentication (Signup/Login)
- 💬 Real-time messaging using Socket.IO
- 👥 User list with online status
- 📱 Responsive design
- 🔔 Message notifications
- 💾 Message history persistence
- 🔄 Real-time message updates
- 🎨 Modern UI with Tailwind CSS

## Tech Stack

### Frontend
- React.js
- Vite
- Tailwind CSS
- Socket.IO Client
- React Router
- Zustand (State Management)
- Axios
- React Hot Toast

### Backend
- Node.js
- Express.js
- MongoDB
- Socket.IO
- JWT Authentication
- Bcrypt for password hashing

## Prerequisites

- Node.js (v14 or higher)
- MongoDB
- npm or yarn

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd Chat-App
```

2. Install dependencies for both frontend and backend:
```bash
# Install backend dependencies
cd Backend
npm install

# Install frontend dependencies
cd ../Frontend
npm install
```

3. Create a `.env` file in the Backend directory with the following variables:
```env
PORT=4001
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Running the Application

1. Start the backend server:
```bash
cd Backend
npm start
```

2. Start the frontend development server:
```bash
cd Frontend
npm run dev
```

The application will be available at:
- Frontend: http://localhost:5173
- Backend: http://localhost:4001

## Project Structure

```
Chat-App/
├── Backend/
│   ├── route/
│   │   ├── user.route.js
│   │   └── message.route.js
│   ├── SocketIO/
│   │   └── server.js
│   ├── model/
│   │   ├── user.model.js
│   │   └── message.model.js
│   └── index.js
└── Frontend/
    ├── src/
    │   ├── components/
    │   ├── context/
    │   ├── home/
    │   ├── statemanage/
    │   └── assets/
    └── vite.config.js
```

## API Endpoints

### Authentication
- POST `/api/user/signup` - Register a new user
- POST `/api/user/login` - Login user
- GET `/api/user/logout` - Logout user

### Messages
- GET `/api/message/get/:conversationId` - Get messages for a conversation
- POST `/api/message/send` - Send a new message

## Socket.IO Events

### Client to Server
- `newMessage` - Send a new message

### Server to Client
- `newMessage` - Receive a new message
- `getOnlineUsers` - Get list of online users

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Socket.IO for real-time communication
- Tailwind CSS for styling
- React for the frontend framework
- MongoDB for database 