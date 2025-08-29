# Ranker 🎯

Ranker is a web application that allows users to **create rankings** and **vote on rankings made by others**. For now, the project will focus only on the **Frontend** part, while the backend may be introduced in future versions.

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

### Frontend

- React
- TypeScript

### Backend

- No backend for now (planned for future versions)

---

## 📂 Project Structure

- `/frontend` — React + TypeScript frontend
- `/docs` — Documentation and guides

---

## ⚙️ Getting Started

### Prerequisites

- Node.js (v18+)

### Frontend Setup

```bash
cd frontend
npm install
npm start
```

The frontend will run by default on `http://localhost:3000`.

---

## 🧪 Running Tests

### Frontend (Jest)

```bash
cd frontend
npm test
```

---

## 📌 Roadmap

### Version 0.0.1 — Data Foundations
The first step is to build a **data management interface** to visualize and manipulate the core entities.
- **UI Features**: View, create, edit, and delete entities (Rank, Tier, Option, Vote, Assignment).
- **Data Storage**: Use local storage to persist data between sessions.
- **Goal**: Ensure all entities can be created and managed manually through the UI.

### Version 0.0.2 — Data + Users
Introduce a **basic user concept** to associate entities with users, still within the context of data management.
- **User Ownership**: Ranks and Votes belong to a user. Only the user can edit their own Ranks and Votes.
- **Guest Mode**: Guests can view data but cannot create or edit entities.
- **Goal**: Simulate multi-user data management within the frontend.

### Version 0.0.3 — Towards the Real App
Transition from pure data management to the early structure of the final app.
- **UI Features**: Begin implementing the real ranking interactions (assigning Options to Tiers within Votes).
- **Entity Expansion**: Add optional descriptions and images to Ranks, Tiers, and Options.
- **Goal**: Bridge the gap between raw entity management and the ranking experience.

### Version 0.0.4 — UI & Customization Enhancements
Focus on making the experience more appealing and flexible.
- **UI Enhancements**: Improve layouts, design, and usability.
- **Customization Options**: Entities can have colors and configurable backgrounds.
- **Goal**: Move towards a polished user interface.

### Version 0.0.5 — Responsive Experience + External Storage
Prepare the app for broader use.
- **Responsive Design**: Ensure layouts and components adapt to desktop, tablet, and mobile.
- **External Storage**: Introduce integration with external storage (e.g., Firebase) for persistence.
- **Goal**: Deliver a usable app that stores and syncs data beyond the local browser.

---

## ⚙️ Technical Documentation

### 📌 Domain Model

The core entities of the Ranker app are designed to capture how users create and interact with rankings.

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

