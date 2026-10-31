# Video Game Discovery – React

A responsive React application for discovering, searching, and exploring video games using the RAWG Video Games Database API.

This project focuses on reusable component architecture, strongly typed API integration, server-state management, infinite scrolling, responsive UI design, and secure API communication through Vercel serverless functions.

---

## 🌐 Live Website

[VideoGameHub](https://video-game-discovery-app-wine.vercel.app/)

---

## ✨ Features

- Search for video games using the RAWG API
- Filter games by genre
- Filter games by gaming platform
- Sort games by relevance, date added, name, release date, popularity, and average rating
- Infinite scrolling to progressively load additional games
- Dedicated game detail pages
- Expandable game descriptions
- Display Metacritic scores
- Display supported gaming platform icons
- Visual rating indicators based on game ratings
- Game metadata including platforms, genres, and publishers
- Game screenshots and trailers
- Responsive game grid across desktop, tablet, and mobile layouts
- Light and dark colour modes
- Loading skeletons while game data is being retrieved
- Loading indicators for subsequent pagination requests
- API error handling
- Responsive navigation and search interface
- Cropped API images with local placeholder fallback
- Cached API responses using TanStack React Query
- Protected RAWG API key using Vercel environment variables and serverless functions

---

## 🔌 API & Data Flow

The application retrieves game information from the **RAWG Video Games Database API** through a consolidated Vercel serverless function.

Rather than exposing the RAWG API key in the frontend, all API requests are routed through the application's own backend endpoint.

### API Endpoints

| Application Endpoint                | Description                                                                      |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| `/api/rawg/games`                   | Retrieves games with search, genre, platform, sorting, and pagination parameters |
| `/api/rawg/games/:slug`             | Retrieves individual game details                                                |
| `/api/rawg/games/:id/screenshots`   | Retrieves screenshots for a specific game                                        |
| `/api/rawg/games/:id/movies`        | Retrieves available game trailers                                                |
| `/api/rawg/genres`                  | Retrieves available game genres                                                  |
| `/api/rawg/platforms/lists/parents` | Retrieves parent gaming platforms                                                |

All requests are routed through a single Vercel serverless function, `api/rawg.ts`, using URL rewrites configured in `vercel.json`.

### Request Flow

```text
React Application
       │
       ▼
TanStack React Query
       │
       ▼
   Axios API Client
       │
       ▼
 /api/rawg/*
       │
       ▼
  Vercel Rewrites
       │
       ▼
  api/rawg.ts
       │
       ├── Endpoint validation
       ├── Query parameter validation
       ├── Environment variable lookup
       └── RAWG API request
               │
               ▼
            RAWG API
               │
               ▼
       JSON Response
               │
               ▼
       React Application
```

The RAWG API key is stored as a Vercel environment variable and accessed server-side through:

```typescript
process.env.RAWG_API_KEY;
```

The API key is never included in the client-side React bundle or exposed through frontend API requests.

The serverless function also restricts access to approved RAWG endpoints and query parameters rather than acting as an unrestricted API proxy.

---

## 🧠 Design & Engineering Decisions

- **Generic Axios API client**

    A reusable generic `APIClient<T>` class centralizes API communication. It provides methods for retrieving collections and individual resources while maintaining typed responses through TypeScript generics.

- **Centralized API communication**

    API requests are handled through a shared Axios instance. The frontend communicates with the application's `/api/rawg` endpoint rather than communicating directly with RAWG.

- **Dynamic Vercel serverless routing**

    A single serverless function handles multiple RAWG resources, including games, genres, platforms, screenshots, and movies. URL rewrites direct incoming requests to the appropriate RAWG endpoint.

- **Server-side API key protection**

    The RAWG API key is stored in Vercel environment variables and accessed exclusively within the serverless function. This prevents credentials from being embedded in frontend source code or production JavaScript bundles.

- **Endpoint and query parameter validation**

    The serverless function uses an endpoint allowlist and an approved query parameter list. This restricts which RAWG resources can be accessed through the backend and prevents clients from overriding the private API key.

- **Infinite scrolling with TanStack React Query**

    `useInfiniteQuery` manages paginated game requests. The application initially retrieves the first page of results and progressively loads additional games as the user scrolls.

- **Automatic pagination**

    Pagination is driven by the RAWG API response metadata. The `getNextPageParam` configuration determines whether additional results are available and calculates the next page to retrieve.

    The `react-infinite-scroll-component` library monitors scrolling and triggers `fetchNextPage` when the user approaches the bottom of the game grid.

- **Server-state caching**

    TanStack React Query manages API response caching, loading states, request errors, and data freshness.

    Game, genre, and platform queries use a 24-hour `staleTime`, reducing unnecessary network requests when revisiting previously retrieved data.

- **Global client state with Zustand**

    Zustand manages shared game query preferences through a centralized `GameQuery` interface. This includes search text, selected genre, selected platform, and sorting preferences.

    Components access and update these values through a shared store without requiring prop drilling or additional context providers.

- **Separation of server state and client state**

    TanStack React Query manages server state, including retrieved game data, pagination, loading states, and API errors.

    Zustand manages client-side query preferences and filter selections.

    Keeping these responsibilities separate prevents API response data from being unnecessarily duplicated in the global client-side store.

- **Query-based cache management**

    React Query query keys incorporate the active game query state, including search text, selected genre, selected platform, and sorting preferences.

    When Zustand updates these values, the query key changes and React Query retrieves the corresponding results. Each filter combination maintains its own cache.

- **Pagination reset on filter changes**

    Changes to search text, genre, platform, or sorting preferences create a new query. Infinite scrolling starts from the first page of the updated result set rather than mixing previously loaded pages with new results.

- **Pagination-aware loading and error handling**

    Initial loading and subsequent page loading are handled separately. Skeleton components provide feedback while the first batch of games loads, while additional pages display a loading indicator without removing existing game cards.

- **Component reuse**

    UI responsibilities are divided across focused, reusable components, including game cards, platform selectors, genre lists, search inputs, sorting controls, loading skeletons, platform indicators, and game detail components.

- **Responsive layout**

    Chakra UI responsive properties adapt the application layout and game grid to different viewport sizes without maintaining separate desktop and mobile implementations.

- **Image processing**

    RAWG image URLs are transformed through a shared image utility to request appropriately cropped images. A local placeholder image is used when an API image is unavailable.

- **Static initial data**

    Local genre and platform datasets provide initial query data through React Query's `initialData` option. This allows these resources to be available immediately while their API queries are refreshed.

- **Expandable game descriptions**

    Game descriptions are initially displayed in a shortened format, with the option to expand or collapse the full description when additional information is needed.

- **TypeScript data models**

    API responses, game entities, genres, platforms, screenshots, trailers, and query parameters are represented through TypeScript interfaces and generic types, providing type safety throughout the application.

---

## 🧱 Tech Stack

- **React 19** – Frontend component architecture
- **TypeScript** – Static typing and application data models
- **Vite** – Development server and production build tooling
- **TanStack React Query** – Server-state management, caching, and infinite queries
- **Zustand** – Global client-side state management
- **Chakra UI 3** – Responsive component system and UI styling
- **Axios** – HTTP requests and API communication
- **React Router** – Client-side routing and game detail navigation
- **React Icons** – Gaming platform and interface icons
- **react-infinite-scroll-component** – Infinite scrolling
- **next-themes** – Light and dark colour mode support
- **Vercel Serverless Functions** – Backend API layer and secure environment variables
- **RAWG Video Games Database API** – Game information and metadata
- **ESLint** – Code quality and linting

Chakra UI provides the application's responsive component system and layout primitives. TanStack React Query manages server state, caching, and paginated data fetching, while Zustand maintains shared client-side query preferences.

API communication is implemented through Axios and a reusable generic API client. Vercel serverless functions provide a backend layer between the React application and RAWG, keeping API credentials server-side.

React Router manages navigation between the main discovery page and individual game detail pages. TypeScript is used throughout the application to improve type safety and maintainability.

---

## 📁 Project Structure

```text
Final-Project/
│
├── api/
│   └── rawg.ts                  # Consolidated RAWG serverless function
│
├── src/
│   ├── assets/
│   │   ├── emojis/              # Game rating indicator images
│   │   ├── logo.webp
│   │   └── no-image-placeholder.webp
│   │
│   ├── components/
│   │   ├── DefinitionItem.tsx
│   │   ├── Emoji.tsx
│   │   ├── ExpandableText.tsx
│   │   ├── GameAttributes.tsx
│   │   ├── GameCard.tsx
│   │   ├── GameCardContainer.tsx
│   │   ├── GameCardSkeleton.tsx
│   │   ├── GameGrid.tsx
│   │   ├── GameHeading.tsx
│   │   ├── GameScreenshots.tsx
│   │   ├── GameTrailer.tsx
│   │   ├── GenreList.tsx
│   │   ├── GenreListSkeleton.tsx
│   │   ├── MetaCritic.tsx
│   │   ├── NavBar.tsx
│   │   ├── PlatformIconList.tsx
│   │   ├── PlatformSelector.tsx
│   │   ├── SearchInput.tsx
│   │   ├── SortSelector.tsx
│   │   │
│   │   ├── services/
│   │   │   ├── api-client.ts    # Generic Axios API client
│   │   │   └── image-url.ts     # Image URL processing utility
│   │   │
│   │   └── ui/
│   │       ├── color-mode.tsx
│   │       ├── provider.tsx
│   │       ├── toaster.tsx
│   │       └── tooltip.tsx
│   │
│   ├── data/
│   │   ├── genres.ts            # Initial genre dataset
│   │   └── platforms.ts         # Initial platform dataset
│   │
│   ├── entities/
│   │   ├── Game.ts
│   │   ├── Genre.ts
│   │   ├── Platform.ts
│   │   ├── Publisher.ts
│   │   ├── Screenshot.ts
│   │   └── Trailer.ts
│   │
│   ├── hooks/
│   │   ├── useGame.ts           # Individual game query
│   │   ├── useGames.ts          # Infinite game query
│   │   ├── useGenre.ts          # Selected genre lookup
│   │   ├── useGenres.ts         # Genre query
│   │   ├── usePlatform.ts       # Selected platform lookup
│   │   ├── usePlatforms.ts      # Platform query
│   │   ├── useScreenshots.ts    # Game screenshots query
│   │   └── useTrailers.ts       # Game trailers query
│   │
│   ├── pages/
│   │   ├── ErrorPage.tsx
│   │   ├── GameDetailPage.tsx
│   │   ├── HomePage.tsx
│   │   └── Layout.tsx
│   │
│   ├── index.css
│   ├── main.tsx
│   ├── routes.tsx
│   └── store.ts                 # Zustand game query store
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vercel.json                 # API URL rewrite configuration
└── vite.config.ts
```

Components are separated by responsibility, while API communication, data models, and data-fetching logic are maintained in dedicated services, entities, and hooks.

The `/api` directory contains the serverless backend responsible for communicating with RAWG. The `/src/data` directory contains local initial datasets, while `/src/entities` defines the application's TypeScript data models.

---

## 🚧 Project Status

This project represents a completed and deployed video game discovery application.

The core functionality includes game discovery, search, filtering, sorting, infinite scrolling, individual game details, screenshots, trailers, and a server-side API integration.

Potential future enhancements include:

- Favourite games or a personal game library
- Persistent user preferences
- Improved accessibility
- Automated unit and integration testing
- Additional game metadata and discovery filters
- Further performance optimization and code splitting
- API rate limiting and response caching

---

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- A RAWG API key
- A Vercel account for environment variables and serverless function deployment

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

cd Final-Project

npm install
```

### Environment Variables

The application requires a RAWG API key for its Vercel serverless function.

Create a local `.env.local` file in the project root:

```env
RAWG_API_KEY=your_api_key_here
```

For production deployments, configure the same `RAWG_API_KEY` variable through:

**Vercel Dashboard → Project Settings → Environment Variables**

Do not use a `VITE_` prefix. The API key must remain server-side and must never be exposed through frontend environment variables.

The `.env.local` file is excluded from Git through `.gitignore` and should never be committed to the repository.

### Local Development

Link the local project to your Vercel project:

```bash
vercel link
```

Pull the configured development environment variables:

```bash
vercel env pull .env.local --environment=development
```

Start the local development environment:

```bash
vercel dev
```

This starts the Vite frontend together with the Vercel serverless functions, allowing the application's `/api/rawg/*` requests to work locally.

**Note:** `npm run dev` starts the Vite frontend only. Use `vercel dev` when testing the complete application with its serverless API routes.

### Production Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

### Deployment

The project is configured for deployment through Vercel.

Connect the GitHub repository to your Vercel project. Subsequent pushes to the configured deployment branch trigger automatic deployments.

Ensure `RAWG_API_KEY` is configured for the Production environment before deploying.

---

## 🔐 Security

The RAWG API key is kept server-side through Vercel environment variables.

The frontend communicates with the application's serverless endpoint rather than directly with RAWG. The serverless function retrieves the private key, validates incoming endpoint paths and query parameters, and forwards approved requests to RAWG.

Environment files and local Vercel configuration are excluded from Git through `.gitignore`.

Never commit API keys, authentication tokens, or other credentials to the repository.
