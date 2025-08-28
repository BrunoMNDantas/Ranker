# Ranker 🎯

Ranker is a web application that allows users to **create rankings** and **vote on rankings made by others**.The project is built with a **Java + Spring Boot backend** and a **React + TypeScript frontend**.

---

## 📑 Index

- [🚀 Features](#-features)
- [🛠️ Tech Stack](#-tech-stack)
- [📂 Project Structure](#-project-structure)
- [⚙️ Getting Started](#-getting-started)
- [🧪 Running Tests](#-running-tests)
- [📌 Roadmap](#-roadmap)
- [⚙️ Technical Documentation](#-technical-documentation)
  - [📌 Domain Model](#-domain-model)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## 🚀 Features

- Create custom rankings on any topic
- Vote on rankings created by other users

---

## 🛠️ Tech Stack

### Backend

- Java (Spring Boot)
- JUnit (testing)

### Frontend

- React
- TypeScript

---

## 📂 Project Structure

- `/backend` — Java Spring Boot API
- `/frontend` — React + TypeScript frontend
- `/docs` — Documentation and guides

---

## ⚙️ Getting Started

### Prerequisites

- Java 17+
- Node.js (v18+)

### Backend Setup

```bash
cd backend
./gradlew clean build
./gradlew bootRun
```

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run by default on `http://localhost:3000` and the backend on `http://localhost:8080`.

---

## 🧪 Running Tests

### Backend (JUnit)

```bash
cd backend
./gradlew test
```

### Frontend (Jest)

```bash
cd frontend
npm test
```

---

## 📌 Roadmap

### Version 0.0.1 — Foundations

The first release focuses on delivering the **core experience** with a minimal but functional interface.

- **UI Features**: Create, edit, delete, and list ranks. Enter a rank to vote. List all votes of a ranking.
- **Entities**: Define the basic hierarchy of Rank → Tier → Option, each with a title.
- **Repository**: Use a simple in-memory repository for quick testing and prototyping.

### Version 0.0.2 — User Management

- **Vote Comparison**: Allow users to compare two votes of a rank to analyze differences.

Introduce the **concept of users** and enforce ownership rules.

- **User Ownership**: Every rank has an owner. Only the owner can edit or delete it.
- **Authentication**: Add login support via Google or Facebook.
- **Guest Mode**: Guests can browse and vote, but cannot create or edit ranks.

### Version 0.0.3 — Entity Expansion & Persistence

Entities gain more depth, and data moves from memory to persistent storage.

- **Extended Entities**:
  - Rank: Title, optional description, optional image.
  - Tier: Title, optional description, optional image.
  - Option: Title, optional description, optional image.
- **Persistence**: Replace in-memory repository with a permanent solution (database, disk storage, or S3).

### Version 0.0.4 — UI & Customization Enhancements

This version improves the user experience and backend observability.

- **UI Enhancements**: More appealing design and better usability.
- **Customization Options**: Entities can have custom colors and background configurations.
- **Logging Improvements**: Add structured and detailed logs for better debugging.

### Version 0.0.5 — Responsive Experience

The goal here is to make Ranker accessible across devices.

- **Responsive Design**: Ensure layouts and components adapt to desktop, tablet, and mobile screens.
- **Real-Time Updates**: Implement real-time updates of votes for a dynamic experience.
- **Animations**: Add smooth animations throughout the app to enhance user experience.

---

## ⚙️ Technical Documentation

### 📌 Domain Model

The core entities of the Ranker app are designed to capture how users create and interact with rankings.

![Domain Entities](https://raw.githubusercontent.com/BrunoMNDantas/Ranker/main/docs/DomainEntities.png)

#### **Rank**
A `Rank` is the definition of a ranking.  
- Contains the set of **Tiers** (the levels/categories available for classification).  
- Contains the set of **Options** (the items that can be ranked).  
- Holds no inherent ordering of Options.  

---

#### **Tier**
A `Tier` represents a level within a Rank.  
- Defines the structure of how Options can be grouped.  
- Examples: `S-Tier`, `A-Tier`, `Bronze`, `Silver`, `Gold`.  
- Belongs to one **Rank**.  

---

#### **Option**
An `Option` is an item that users can place into a Tier.  
- Represents the content of the Rank.  
- Examples: Movies, games, songs, or programming languages.  
- Belongs to one **Rank**.  

---

#### **Vote**
A `Vote` is a user’s submission for a Rank.  
- Contains a collection of **Assignments** (Option → Tier mappings).  
- Belongs to one **Rank**.  
- Each Vote reflects a user’s personal classification of the Options.  

---

#### **Assignment**
An `Assignment` links a specific **Option** to a **Tier** within a Vote.  
- Represents one `(Option, Tier)` pair.  
- Belongs to one **Vote**.  
- Connects one **Option** with one **Tier**.  

---

✅ **Example**  

- **Rank:** "Best Programming Languages"  
  - **Tiers:** S, A, B  
  - **Options:** Java, Python, JavaScript  

- **User Vote:**  
  - Assignment: (Python → S)  
  - Assignment: (Java → A)  
  - Assignment: (JavaScript → B)  

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

