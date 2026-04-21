<img width="1536" height="1024" alt="ChatGPT Image 24 de fev  de 2026, 01_31_52" src="https://github.com/user-attachments/assets/897e0ee2-8bf1-4e47-9576-465b774cd7fd" />

> **Privacy-first anonymous chat application powered by real-time WebSocket communication**

> **Status:** Em desenvolvimento

A modern, ephemeral messaging platform built with Angular that prioritizes user privacy by design. Closed Chat delivers real-time conversations without storing any messages in a database—because the best way to protect data is to never collect it.

---

## 🎯 Concept

Closed Chat is an **anonymous, temporary messaging application** where conversations exist only in the moment. Using WebSocket technology, messages are transmitted directly between users without persistence, ensuring complete privacy and zero digital footprint.

**Key Philosophy:**

- 🚫 **Zero Database Storage** - Messages are never saved
- 🔐 **Anonymous by Default** - No user accounts required
- ⚡ **Real-time Communication** - Powered by WebSocket
- 🧹 **Self-Destructing** - Conversations disappear when you close the tab

Perfect for sensitive discussions, temporary collaborations, or anyone who values digital privacy.

---

## ✨ Features

- **Real-time Messaging** - Instant message delivery via WebSocket
- **Ephemeral Conversations** - Messages exist only in memory
- **Anonymous Sessions** - No registration, no tracking
- **Clean Architecture** - Scalable, maintainable codebase
- **Modern UI** - Built with Tailwind CSS
- **Type-safe** - Full TypeScript implementation

---

## 🏗️ Architecture

This project follows **Clean Architecture** principles with clear separation of concerns:

```
src/
├── app/
│   ├── components/     # Presentational components
│   ├── pages/          # Route pages
│   ├── facades/        # State management & orchestration
│   ├── usecases/       # Business logic
│   ├── gateways/       # Interface contracts (Dependency Inversion)
│   └── states/         # Application state
├── domain/
│   └── entity/         # Domain entities
└── infra/
    └── repositories/   # External implementations (HTTP, WebSocket)
```

**Design Patterns Applied:**

- ✅ Dependency Inversion Principle (DIP)
- ✅ Repository Pattern
- ✅ Facade Pattern
- ✅ Observable Pattern (RxJS)
- ✅ Reactive Caching

---

## 🚀 Tech Stack

| Technology          | Purpose                               |
| ------------------- | ------------------------------------- |
| **Angular 21**      | Frontend framework with Signals & SSR |
| **TypeScript**      | Type-safe development                 |
| **Tailwind CSS v4** | Utility-first styling                 |
| **RxJS**            | Reactive programming                  |
| **WebSocket**       | Real-time bidirectional communication |
| **Faker.js**        | Mock data generation (dev mode)       |
| **Vitest**          | Unit testing                          |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 20+
- npm 11+

### Installation

```bash
# Clone the repository
git clone https://github.com/gabrielvictorweb/closed-chat-angular.git

# Navigate to project directory
cd closed-chat-angular

# Install dependencies
npm install

# Start development server
npm start
```

The application will be available at `http://localhost:4200/`

### Development Mode

In development, the app uses **Faker.js** to generate realistic mock data. The chat repository automatically detects `isDevMode()` and switches between mock data and real WebSocket connections.

### Run with Docker

The repository already ships with a production-ready `Dockerfile` that builds the Angular SSR bundle and serves it with Express.

```bash
# Build the image (run from the project root)
docker build -t closed-chat-angular:local .

# Start the container and map port 4000
docker run --rm -p 4000:4000 closed-chat-angular:local
```

Visit `http://localhost:4000/` to use the app. Rebuild the image after making code changes, since the container runs the compiled bundle rather than `ng serve`.

---

## 📦 Build

```bash
# Production build
npm run build

# Build artifacts will be stored in `dist/`
```

---

## 🧪 Testing

```bash
# Run unit tests
npm test
```

---

## 🔐 Privacy & Security

**What we DON'T do:**

- ❌ Store messages in any database
- ❌ Track user identities
- ❌ Log conversations
- ❌ Collect personal data

**What happens:**

- ✅ Messages transmitted via encrypted WebSocket
- ✅ Data exists only in browser memory
- ✅ Conversations destroyed on disconnect
- ✅ No server-side message retention

---

## 🤝 Contributing

This project demonstrates enterprise-grade Angular development practices. Contributions that maintain code quality and architectural integrity are welcome.

---

## 📄 License

MIT License - feel free to use this project for learning or as a portfolio piece.

---

## 👨‍💻 Author

Built with attention to **Clean Code**, **SOLID principles**, and modern **Angular best practices**.

_This project showcases production-ready patterns for scalable frontend architecture._
