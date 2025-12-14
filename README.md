# Ethereum TPS Dashboard

A real-time dashboard that displays Ethereum's total throughput by combining execution layer transactions with consensus layer validator attestations.

## Overview

Most blockchain metrics only count execution layer transactions when reporting TPS (Transactions Per Second). This dashboard calculates Ethereum's "real" TPS by including both:

- **Execution Layer TPS**: Actual transactions processed on Ethereum
- **Consensus Layer TPS**: Validator attestations (votes) from the beacon chain

The total throughput is calculated as: `Total TPS = Execution TPS + (Active Validators / 384 seconds)`

## Features

- 📊 **Real-time TPS Calculation**: Combines execution and consensus layer throughput
- 📈 **Interactive Visualizer**: Visual representation of TPS breakdown
- 🌓 **Dark/Light Theme**: Toggle between themes
- 💾 **Smart Caching**: Caches validator data to reduce API calls
- 🔄 **Auto-refresh**: Execution layer TPS updates every 30 seconds
- 📱 **Responsive Design**: Works on desktop and mobile devices

## Tech Stack

- **React 19** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons

## Data Sources

- **Beaconchain API**: Fetches active validator count
- **Ethereum RPC**: Retrieves execution layer block data

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd eth-tps
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Build for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

### Preview Production Build

```bash
npm run preview
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript type checking

## Project Structure

```
src/
├── components/        # React components
│   ├── Header/       # Header and theme toggle
│   ├── Stats/        # TPS display cards
│   ├── Visualizer/   # TPS visualization
│   └── Info/         # About section
├── hooks/            # Custom React hooks
│   ├── useValidatorData.ts    # Validator count fetching
│   ├── useExecutionTPS.ts     # Execution TPS calculation
│   └── useTheme.ts            # Theme management
├── types/            # TypeScript type definitions
├── utils/            # Utility functions and constants
└── App.tsx           # Main application component
```

## How It Works

1. **Consensus Layer TPS**: Calculated by dividing the active validator count by the epoch duration (384 seconds). Each validator submits one attestation per epoch.

2. **Execution Layer TPS**: Calculated by fetching the latest blocks and averaging the transaction count per block, then dividing by the block time (12 seconds).

3. **Total TPS**: The sum of both layers, representing Ethereum's complete throughput.

## License

See [LICENSE](LICENSE) file for details.
