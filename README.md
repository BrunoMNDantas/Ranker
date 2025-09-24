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

### Version 0.0.6 – AI-Powered Rank Creation
Leverage artificial intelligence to assist users in building richer Ranks.
- **AI-Generated Tiers & Options**: Automatically propose tiers and options based on the Rank’s title and description.
- **Smart Suggestions**: Offer AI-driven recommendations while editing or refining Ranks.
- **Goal**: Simplify the Rank creation process and inspire users with intelligent defaults.

---

## ⚙️ Technical Documentation

## 📌 Domain Model (Updated)

This section reflects the latest entity diagram and should replace the current **Domain Model** subsection in the README.

> High‑level relations: **Rank** has many **Tiers**, **Options**, and **Votes**. A **Vote** includes many **Assignments**. Each **Assignment** maps one **Option** to one **Tier** within that **Vote**.

---

### Rank

Represents a ranking definition.

**Attributes**

- `id: string`
- `creationDate: Date`
- `title: string`
- `description: string`
- `imageUrl: string`
- `color: string`

**Relationships**

- **has many** `Tier`
- **has many** `Option`
- **has many** `Vote`

**Example**: Rank = "Best Programming Languages"

---

### Tier

Defines a level/category inside a Rank.

**Attributes**

- `id: string`
- `rankId: string` (FK → Rank)
- `creationDate: Date`
- `order: number`
- `title: string`
- `description: string`
- `imageUrl: string`
- `color: string`

**Relationships**

- **belongs to** `Rank`
- **used by** `Assignment` to map `Option → Tier` within a `Vote`

**Example**: Tiers = `S`, `A`, `B`, `C` (with `order` controlling vertical position)

---

### Option

An item that can be classified into a Tier.

**Attributes**

- `id: string`
- `rankId: string` (FK → Rank)
- `creationDate: Date`
- `order: number`
- `title: string`
- `description: string`
- `imageUrl: string`
- `color: string`

**Relationships**

- **belongs to** `Rank`
- **used by** `Assignment` to map `Option → Tier` within a `Vote`

**Example**: Options = `Java`, `Python`, `JavaScript` (with `order` supporting custom listing)

---

### Vote

A user's submission for a Rank (one completed arrangement of Options into Tiers).

**Attributes**

- `id: string`
- `rankId: string` (FK → Rank)
- `creationDate: Date`

**Relationships**

- **belongs to** `Rank`
- **includes many** `Assignment`

**Example**: A user’s vote for "Best Programming Languages".

---

### Assignment

Links an `Option` to a `Tier` **within a particular **``.

**Attributes**

- `id: string`
- `voteId: string` (FK → Vote)
- `tierId: string` (FK → Tier)
- `optionId: string` (FK → Option)
- `creationDate: Date`
- `order: number`

**Relationships**

- **belongs to** `Vote`
- **belongs to** `Tier`
- **belongs to** `Option`
- **maps** `Option → Tier` in the context of a single `Vote`

**Example**: Assignments: `(Python → S)`, `(Java → A)`, `(JavaScript → B)` where the `order` can preserve the left-to-right placement within the Tier.

## 🤝 Contributing

Contributions are welcome! Please open an issue or submit a pull request.

---

## 📄 License

This project is licensed under the MIT License.

