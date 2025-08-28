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

### Version 0.0.1 — Foundations (Frontend Only)

- **UI Features**: Create, edit, delete, and list ranks. Enter a rank to vote. List all votes of a ranking.
- **Entities**: Define the basic hierarchy of Rank → Tier → Option, each with a title.
- **Local Storage**: Use browser local storage or an in-memory store to manage data temporarily.

### Version 0.0.2 — User Management

- **Vote Comparison**: Allow users to compare two votes of a rank to analyze differences.
- **Authentication**: Add login support via Google or Facebook.
- **User Concept**: Simulate user ownership directly in the frontend. A Rank belongs to a user, and only that user can edit the Rank. A Vote also belongs to a user, and only that user can edit their Vote.
- **Guest Mode**: Guests can browse and vote, but cannot create or edit ranks.

### Version 0.0.3 — Entity Expansion

- **Extended Entities**:
  - Rank: Title, optional description, optional image.
  - Tier: Title, optional description, optional image.
  - Option: Title, optional description, optional image.

### Version 0.0.4 — UI & Customization Enhancements

- **UI Enhancements**: More appealing design and better usability.
- **Customization Options**: Entities can have custom colors and background configurations.

### Version 0.0.5 — Responsive Experience

- **Responsive Design**: Ensure layouts and components adapt to desktop, tablet, and mobile screens.

- **Real-Time Updates (Simulated)**: Implement frontend-level simulations of vote updates.

- **External Storage**: Introduce external storage integration (e.g., Firebase) for persisting data.

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