# 📈 PSX – Stock Portfolio & Market Tracking App

A **real-time stock market & portfolio management mobile application** built with **React Native**, specifically tailored for the **Pakistan Stock Exchange (PSX)**. 

This app enables users to track live market indexes, manage investment portfolios, analyze real-time gains/losses, view stock fundamentals, and receive push notifications for market events.

---

## 🎥 App Demo

▶️ **Full App Walkthrough** [Watch the Demo](https://go.screenpal.com/watch/cOVj6znrZqx)

---

## 📱 App Screenshots

| 🏠 Home & News | 📊 Stock Explorer | 📈 Stock Details |
|---|---|---|
| [![home.png](https://i.postimg.cc/9fPJ1hb8/Untitled-2.png)](https://postimg.cc/c6KxWTC2) | [![stocks-list.png](https://i.postimg.cc/J4g6zKGm/Untitled.png)](https://postimg.cc/Wt4DkMzs) | [![stock-detail.png](https://i.postimg.cc/dtXHVnLM/Untitled-4.png)](https://postimg.cc/CB2wDnPc) |

| 💼 Portfolio | 🔄 Transactions | 📌 Performance |
|---|---|---|
| [![portfolio.png](https://i.postimg.cc/ZKg75jCm/Untitled-3.png)](https://postimg.cc/mznTM1Xd) | [![manage-transaction.png](https://i.postimg.cc/wv0F8QCg/Untitled-5.png)](https://postimg.cc/WFz2hwnS) | [![summary.png](https://i.postimg.cc/9QhmKPVK/summart.png)](https://postimg.cc/4mWRh9YQ) |

---

## 🚀 Key Features

* 📡 **Real-Time Index Updates**: Live market data streaming via WebSockets—no manual refresh required.
* 📰 **Financial News Feed**: Stay updated with the latest finance news directly on the home screen.
* 💼 **Advanced Portfolio Management**:
    * Track buying/selling transactions.
    * Manage and log stock dividends.
    * **Live Profit & Loss** calculations based on current market prices.
* ⭐ **Personalized Wishlist**: Save your favorite stocks for quick monitoring.
* 📊 **Deep Stock Analytics**: Interactive charts, company fundamentals, and historical dividend data.
* 🔔 **Smart Notifications**: Remote push notifications for market opening/closing (supports Foreground, Background, and Killed states).

---

## 🛠 Tech Stack

### Frontend & Core
* **React Native `0.83.1`**
* **TypeScript**
* **React Navigation v7**
* **TanStack React Query v5**

### Networking & Realtime
* **Axios**: REST API integration
* **Socket.IO Client**: Real-time market price streaming

### Notifications & Services
* **Firebase Cloud Messaging (FCM)**
* **Notifee**
* **AsyncStorage** & **JWT-Decode**

---

## ⚙️ Installation & Setup

### Prerequisites
Ensure you have completed the [Set Up Your Environment](https://reactnative.dev/docs/set-up-your-environment) guide before proceeding.

### Step 1: Clone and Install
```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project root
cd psx

# Install dependencies
npm install
```

### Step 2: iOS Setup (macOS only)
## For iOS, run the following commands to install CocoaPods dependencies:
```bash
cd ios
bundle install
bundle exec pod install
cd ..
```

### Step 3: Start Metro Bundler
## Start the Metro dev server from the root of your project:
```bash
npm start
```

### Step 4: Build and Run
## With Metro running, open a new terminal window and run:
# For Android:
```bash
npm run android
```
# For Ios:
```bash
npm run ios
```

