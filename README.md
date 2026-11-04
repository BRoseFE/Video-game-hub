# Video Game Discovery - React

A responsive React application for discovering, searching, and exploring video games using the **GameBrain API**.

The project focuses on reusable component architecture, strongly typed API integration, server-state management, infinite scrolling, responsive UI design, and secure API communication through Vercel serverless functions.

---

## Live Website

[VideoGameHub](https://video-game-discovery-app-wine.vercel.app/)

---

## Features

- Search for video games using the GameBrain API
- Filter games using dynamically retrieved GameBrain filter options
- Apply multiple filter values and filter connections supplied by the API
- Sort games using the sorting options supplied by GameBrain
- Infinite scrolling with progressively loaded game results
- Dedicated game detail pages
- Expandable game descriptions
- Display GameBrain ratings and critic scores
- Display supported gaming platform icons
- Visual rating indicators based on game ratings
- Game metadata including platforms, genres, and developer
- Game screenshots and trailers when supplied with game details
- Responsive game grid across desktop, tablet, and mobile layouts
- Light and dark colour modes
- Loading skeletons while game data is being retrieved
- Loading indicators for subsequent pagination requests
- API error handling with user-friendly messages for common HTTP status codes
- Responsive navigation and search interface
- Game images with a local placeholder fallback
- Cached API responses using TanStack React Query
- Protected GameBrain API key using Vercel environment variables and serverless functions

---

## API & Data Flow

The application retrieves game information from the **GameBrain API** through a Vercel serverless function.

Rather than exposing the GameBrain API key in the frontend, requests are routed through the application's own backend endpoint. The serverless function validates the requested resource and permitted query parameters, adds the API key server-side, and forwards the request to GameBrain.

### API Integration

The frontend uses the application's `/api/gamebrain` endpoint. The backend supports the GameBrain resources used by the application, including:

| Application resource       | Purpose                                                                |
| -------------------------- | ---------------------------------------------------------------------- |
| `/api/gamebrain/games`     | Retrieves game results with search, filtering, sorting, and pagination |
| `/api/gamebrain/games/:id` | Retrieves an individual game's details                                 |

Game detail responses are also used to populate screenshots and trailers when those fields are available. Filter and sorting metadata are requested from the games endpoint rather than fetched from separate legacy RAWG genre or platform endpoints.

The backend implementation is maintained in `api/gamebrain.ts`.

### Request Flow

```text
React Application
       |
       v
TanStack React Query
       |
       v
Axios API Client
       |
       v
/api/gamebrain/*
       |
       v
Vercel Serverless Function
       |
       +--> Endpoint validation
       +--> Query parameter validation
       +--> Environment variable lookup
       +--> GameBrain API request
                    |
                    v
               GameBrain API
                    |
                    v
              JSON Response
                    |
                    v
       API client response normalization
                    |
                    v
             React Application
```

The GameBrain API key is stored as a Vercel environment variable and accessed server-side through:

```typescript
process.env.GAMEBRAIN_API_KEY;
```

The API key is never included in the client-side React bundle or exposed through frontend API requests.

The serverless function restricts requests to the resources and query parameters required by the application rather than acting as an unrestricted API proxy.

### Response Normalization

GameBrain's response format differs from the format originally used by the application. The generic Axios API client adapts the GameBrain pagination response into the application's `FetchResponse<T>` shape.

GameBrain game records are also converted through a dedicated mapper into the application's existing `Game` model. This keeps API-specific response structures separate from the components that display game information.

---

## Design & Engineering Decisions

- **Generic Axios API client**

    A reusable generic `APIClient<T>` class centralizes API communication. It provides methods for retrieving collections and individual resources while maintaining typed responses through TypeScript generics.

- **Centralized API communication**

    API requests are handled through a shared Axios instance. The frontend communicates with the application's `/api/gamebrain` endpoint rather than calling GameBrain directly.

- **Vercel serverless API layer**

    A serverless function handles the GameBrain resources used by the application. It validates endpoint paths and approved query parameters before forwarding requests to the external API.

- **Server-side API key protection**

    The GameBrain API key is stored in Vercel environment variables and accessed exclusively within the serverless function. This prevents credentials from being embedded in frontend source code or production JavaScript bundles.

- **GameBrain response normalization**

    The API client converts GameBrain's pagination metadata into the application's existing response structure. A dedicated mapper converts GameBrain game records into the application's `Game` entity, allowing UI components to work with a consistent internal model.

- **Infinite scrolling with TanStack React Query**

    `useInfiniteQuery` manages paginated game requests. The application retrieves an initial set of results and progressively loads additional games as the user scrolls.

- **Offset-based pagination**

    The API client translates GameBrain's `total_results`, `limit`, and `offset` values into the application's pagination response. The infinite query uses that information to determine whether another page is available.

- **Server-state caching**

    TanStack React Query manages API response caching, loading states, request errors, and data freshness. Game and filter metadata queries use a 24-hour `staleTime` to reduce unnecessary requests when revisiting previously retrieved data.

- **Dynamic filtering and sorting**

    Filter options, available values, and sorting options are retrieved from GameBrain. This avoids relying on the old hardcoded RAWG genre and platform datasets. Selected filters and sorting preferences are sent as API query parameters.

- **Global client state with Zustand**

    Zustand manages shared game query preferences through a centralized store. This includes search text, active filters, and sorting preferences.

    Components access and update these values through the shared store without prop drilling or additional context providers.

- **Separation of server state and client state**

    TanStack React Query manages server state, including retrieved game data, pagination, loading states, and API errors. Zustand manages client-side query preferences and filter selections.

    Keeping these responsibilities separate prevents API response data from being unnecessarily duplicated in the global client-side store.

- **Query-based cache management**

    React Query query keys incorporate the active game query state. When search text, filters, or sorting preferences change, the query key changes and React Query retrieves the corresponding result set. Different query combinations can maintain separate cached results.

- **Pagination reset on query changes**

    Changes to search text, active filters, or sorting preferences create a new query. Infinite scrolling starts from the beginning of the updated result set rather than mixing previously loaded pages with new results.

- **Pagination-aware loading and error handling**

    Initial loading and subsequent page loading are handled separately. Skeleton components provide feedback while the first batch of games loads, while additional pages display a loading indicator without removing existing game cards.

- **User-friendly API error handling**

    API errors are mapped to readable messages based on HTTP status codes. The application includes a specific message for GameBrain's daily API usage limit, as well as messages for common client, authorization, rate-limit, and server errors.

- **Component reuse**

    UI responsibilities are divided across focused, reusable components, including game cards, dynamic filter controls, search inputs, sorting controls, loading skeletons, platform indicators, and game detail components.

- **Responsive layout**

    Chakra UI responsive properties adapt the application layout and game grid to different viewport sizes without maintaining separate desktop and mobile implementations.

- **Image fallback handling**

    A shared image utility returns the supplied game image URL or a local placeholder when an image is unavailable.

- **Game detail data reuse**

    The detail page, screenshot component, and trailer component use the individual game query. Screenshots and trailers are read from the normalized game response instead of making separate requests to the old RAWG screenshot and movie endpoints.

- **TypeScript data models**

    API responses, game entities, filter options, sorting options, genres, platforms, screenshots, trailers, and query parameters are represented through TypeScript interfaces and generic types, providing type safety throughout the application.

---

## Tech Stack

- **React 19** - Frontend component architecture
- **TypeScript** - Static typing and application data models
- **Vite** - Development server and production build tooling
- **TanStack React Query** - Server-state management, caching, and infinite queries
- **Zustand** - Global client-side state management
- **Chakra UI 3** - Responsive component system and UI styling
- **Axios** - HTTP requests and API communication
- **React Router** - Client-side routing and game detail navigation
- **React Icons** - Gaming platform and interface icons
- **next-themes** - Light and dark colour mode support
- **Vercel Serverless Functions** - Backend API layer and secure environment variables
- **GameBrain API** - Game information, ratings, filter options, and sorting metadata
- **ESLint** - Code quality and linting

Chakra UI provides the application's responsive component system and layout primitives. TanStack React Query manages server state, caching, and paginated data fetching, while Zustand maintains shared client-side query preferences.

API communication is implemented through Axios and a reusable generic API client. Vercel serverless functions provide a backend layer between the React application and GameBrain, keeping API credentials server-side.

React Router manages navigation between the main discovery page and individual game detail pages. TypeScript is used throughout the application to improve type safety and maintainability.

---

## Project Structure

The main files involved in the GameBrain integration are organized as follows. Other presentation components and configuration files are omitted here for readability.

```text
Final-Project/
|
├── api/
│   └── gamebrain.ts              # GameBrain Vercel serverless function
|
├── src/
│   ├── components/
│   │   ├── GameAttributes.tsx
│   │   ├── GameBrainFilter.tsx   # Dynamic GameBrain filter controls
│   │   ├── GameBrainScore.tsx
│   │   ├── GameCard.tsx
│   │   ├── GameGrid.tsx
│   │   ├── GameHeading.tsx
│   │   ├── GameScreenshots.tsx
│   │   ├── GameTrailer.tsx
│   │   ├── SortSelector.tsx
│   │   └── services/
│   │       ├── api-client.ts     # Generic Axios client and response normalization
│   │       └── gamebrain-mapper.ts
│   │
│   ├── entities/
│   │   ├── Game.ts
│   │   ├── GameBrainFilters.ts
│   │   ├── GameBrainGame.ts
│   │   ├── Genre.ts
│   │   ├── Platform.ts
│   │   ├── Screenshot.ts
│   │   └── Trailer.ts
│   │
│   ├── hooks/
│   │   ├── useGame.ts
│   │   ├── useGameFilterOptions.ts
│   │   └── useGames.ts
│   │
│   ├── pages/
│   │   ├── ErrorPage.tsx
│   │   ├── GameDetailPage.tsx
│   │   ├── HomePage.tsx
│   │   └── Layout.tsx
│   │
│   ├── utils/
│   │   └── getErrorMessage.ts
│   │
│   ├── routes.tsx
│   └── store.ts                 # Zustand game query store
│
├── index.html
├── package.json
├── package-lock.json
├── tsconfig.json
├── vercel.json
└── vite.config.ts
```

The `/api` directory contains the serverless backend responsible for communicating with GameBrain. API-specific response types and the mapper are kept separate from the application's internal game entity. Data-fetching logic is maintained in dedicated hooks, while Zustand manages shared query preferences.

---

## Project Status

The application has been migrated from the RAWG API to the GameBrain API.

The current integration supports game discovery, search, dynamic filtering, sorting, infinite scrolling, individual game details, screenshots and trailers when provided by the game response, and server-side API communication.

The GameBrain API enforces a daily usage allowance. When that limit is reached, the application displays a corresponding API error message rather than treating the request as a successful response.

Potential future enhancements include:

- Favourite games or a personal game library
- Persistent user preferences
- Improved accessibility
- Automated unit and integration testing
- Additional game metadata and discovery filters
- Further performance optimization and code splitting
- Additional API usage monitoring and request optimization

---

## Getting Started

### Prerequisites

- Node.js
- npm
- A GameBrain API key
- A Vercel account for environment variables and serverless function deployment
- Vercel CLI for local testing of the complete application

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/YOUR_USERNAME/YOUR_REPOSITORY.git

cd Final-Project

npm install
```

### Environment Variables

The application requires a GameBrain API key for its Vercel serverless function.

Create a local `.env.local` file in the project root:

```env
GAMEBRAIN_API_KEY=your_api_key_here
```

For production deployments, configure the same `GAMEBRAIN_API_KEY` variable through:

**Vercel Dashboard → Project Settings → Environment Variables**

Do not use a `VITE_` prefix. The API key must remain server-side and must never be exposed through frontend environment variables.

The `.env.local` file should be excluded from Git through `.gitignore` and should never be committed to the repository.

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

This starts the Vite frontend together with the Vercel serverless functions, allowing the application's `/api/gamebrain/*` requests to work locally.

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

Ensure `GAMEBRAIN_API_KEY` is configured for the Production environment before deploying.

---

## Security

The GameBrain API key is kept server-side through Vercel environment variables.

The frontend communicates with the application's serverless endpoint rather than directly with GameBrain. The serverless function retrieves the private key, validates incoming endpoint paths and query parameters, and forwards approved requests to GameBrain.

Environment files and local Vercel configuration are excluded from Git through `.gitignore`.

Never commit API keys, authentication tokens, or other credentials to the repository.
