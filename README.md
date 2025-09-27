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
  - [Version 0.0.1 — Data Management](#-version-001--data-management-released)
  - [Version 0.0.2 — App with UI](#-version-002--app-with-ui-released)
  - [Version 0.0.3 — GraphQL & Validation](#-version-003--graphql--validation-in-progress)
  - [Version 0.0.4 — Users](#-version-004--users-future)
  - [Version 0.0.5 — App Flow & User Experience](#-version-005--app-flow--user-experience-future)
  - [Version 0.0.6 — User Options & Analytics](#-version-006--user-options--analytics-future)
  - [Version 0.0.7 — Mobile](#-version-007--mobile-future)
  - [Version 0.0.8 — AI Assistance](#-version-008--ai-assistance-future)
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

- Create custom rankings on any topic.
- Vote on rankings created by other users.
- Manage entities (Ranks, Tiers, Options, Votes, Assignments).
- Associate Ranks and Votes with users (future release).
- Responsive UI optimized for desktop and mobile (future release).
- Customization options for colors and voting rules (future release).
- Side-by-side vote comparison and rank statistics (future release).
- AI-powered rank creation and suggestions (future release).

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

### ✅ Version 0.0.1 — Data Management (Released)
- Build a **data management interface** to visualize and manipulate core entities (Rank, Tier, Option, Vote, Assignment).
- Use in-memory storage.
- Ensure entities can be created and managed manually through the UI.

### ✅ Version 0.0.2 — App with UI (Released)
- Transition from raw data management to early app structure.
- Implement basic ranking interactions (assign Options to Tiers within Votes).
- Add optional descriptions and images to entities.

### ✅ Version 0.0.3 — GraphQL & Validation (Released)
- Introduce **GraphQL** as the main API layer.
- Refactor data flow to support queries and mutations.
- Implement **validation logic** at the services layer.

### 🚧 Version 0.0.4 — Users (In Progress)
- Add a **login screen**.
- Associate **Ranks and Votes with users**.
- Restrict editing so only the owner can modify their entities.
- Clean UI separation between **Edit** and **View** modes.

### 🔮 Version 0.0.5 — App Flow & User Experience (Future)
- Improve **VoteCard** and **AssignmentCard**. (Place text on the card with the name of the entity?)
- Handle missing images more clearly (better option/tier representation).
- Add a more engaging **vote button**.
- On the voting page (Assignments tab), show the **voting board**.
- Introduce **Redux** for state management.
- Improve the error handling

### 🔮 Version 0.0.6 — User Options & Analytics (Future)
- Implement **user customization choices**:
  - Range of colors to derive colors for all options and tiers.
  - Option to enforce only one tier per rank.
- Add ability to **compare two votes side by side** for the same rank.
- Provide **statistics on votes** for each rank.

### 🔮 Version 0.0.7 — Mobile (Future)
- Build a fully **responsive mobile experience**.
- Optimize layouts and components for small screens.

### 🔮 Version 0.0.8 — AI Assistance (Future)
- Create a **Rank based on a description**.
- Automatically generate **tiers** for a Rank based on its description.
- Automatically generate **options** for a Rank based on its description.

---

## ⚙️ Technical Documentation

## 📌 Domain Model

High‑level relations: **Rank** has many **Tiers**, **Options**, and **Votes**. A **Vote** includes many **Assignments**. Each **Assignment** maps one **Option** to one **Tier** within that **Vote**.

![Domain Entities](https://raw.githubusercontent.com/BrunoMNDantas/Ranker/main/docs/DomainEntities.png)

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

