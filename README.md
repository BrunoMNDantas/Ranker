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
  - [Version 0.0.1 — Data Foundations](#version-001--data-foundations)
  - [Version 0.0.2 — Towards the Real App](#version-002--towards-the-real-app)
  - [Version 0.0.3 — Data + Users](#version-003--data--users)
  - [Version 0.0.4 — UI & Customization Enhancements](#version-004--ui--customization-enhancements)
  - [Version 0.0.5 — Responsive Experience + External Storage](#version-005--responsive-experience--external-storage)
- [⚙️ Technical Documentation](#-technical-documentation)
  - [📌 Domain Model](#-domain-model)
    - [Rank](#rank)
    - [Tier](#tier)
    - [Option](#option)
    - [Vote](#vote)
    - [Assignment](#assignment)
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
- **Data Storage**: Use in-memory storage.
- **Goal**: Ensure all entities can be created and managed manually through the UI.

### Version 0.0.2 — Towards the Real App
Transition from pure data management to the early structure of the final app.
- **UI Features**: Begin implementing the real ranking interactions (assigning Options to Tiers within Votes).
- **Entity Expansion**: Add optional descriptions and images to Ranks, Tiers, and Options.
- **Goal**: Bridge the gap between raw entity management and the ranking experience.

### Version 0.0.3 — Data + Users
Introduce a **basic user concept** to associate entities with users, still within the context of data management.
- **User Ownership**: Ranks and Votes belong to a user. Only the user can edit their own Ranks and Votes.
- **Guest Mode**: Guests can view data but cannot create or edit entities.
- **Storage**: Move from in-memory to Firebase for persistence and syncing.
- **Goal**: Simulate multi-user data management with external storage.

### Version 0.0.4 — UI & Customization Enhancements
Focus on making the experience more appealing and flexible.
- **UI Enhancements**: Improve layouts, design, and usability.
- **Customization Options**: Entities can have colors and configurable backgrounds.
- **Goal**: Move towards a polished user interface.

### Version 0.0.5 — Responsive Experience + External Storage
Prepare the app for broader use.
- **Responsive Design**: Ensure layouts and components adapt to desktop, tablet, and mobile.
- **Blind Voting Mode**: Enable users to vote **without seeing all options upfront**. Options are revealed **one by one**, and the user votes sequentially.
- **Goal**: Deliver a usable app that stores and syncs data beyond the local browser while introducing novel voting interactions.

---

## ⚙️ Technical Documentation

### 📌 Domain Model

The domain model describes the main entities of Ranker and their relationships.

![Domain Entities](https://raw.githubusercontent.com/BrunoMNDantas/Ranker/main/docs/DomainEntities.png)

#### **Rank**
Represents a ranking definition.
- **Attributes**: `id`, `creationDate`, `title`
- **Relationships**: has many `Tier`, `Option`, and `Vote`
- **Example**: Rank = "Best Programming Languages"

---

#### **Tier**
Defines a level or category inside a Rank.
- **Attributes**: `id`, `rankId`, `creationDate`, `title`
- **Relationships**: belongs to `Rank`; mapped by `Assignment`
- **Example**: Tiers = `S-Tier`, `A-Tier`, `Bronze`, `Silver`

---

#### **Option**
An item that can be classified into a Tier.
- **Attributes**: `id`, `rankId`, `creationDate`, `title`
- **Relationships**: belongs to `Rank`; mapped by `Assignment`
- **Example**: Options = `Java`, `Python`, `JavaScript`

---

#### **Vote**
A user’s submission for a Rank.
- **Attributes**: `id`, `rankId`, `creationDate`
- **Relationships**: belongs to `Rank`; includes many `Assignment`
- **Example**: A user’s Vote for "Best Programming Languages"

---

#### **Assignment**
Links an `Option` to a `Tier` within a `Vote`.
- **Attributes**: `id`, `voteId`, `tierId`, `optionId`, `creationDate`
- **Relationships**: belongs to `Vote`, `Tier`, and `Option`
- **Example**: Assignments: (Python → S), (Java → A), (JavaScript → B)

---

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

