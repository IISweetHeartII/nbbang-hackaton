# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

"간단한 N빵" - A Korean bill splitting application built with Next.js 15.5.3, TypeScript, and Tailwind CSS v4. This is a 30-minute MVP for fair bill splitting with local storage persistence and KakaoTalk message generation.

## Development Commands

- `pnpm run dev` - Start development server with Turbopack
- `pnpm run build` - Build for production with Turbopack  
- `pnpm run start` - Start production server
- `pnpm run lint` - Run ESLint with Next.js TypeScript rules

## Application Architecture

**Core Domain Logic**:
- `src/hooks/useBillSplitter.ts` - Main business logic hook managing members, items, balances, and settlements
- `src/types/index.ts` - Complete TypeScript definitions for all data structures
- Uses greedy algorithm for optimal settlement calculations
- All data persisted to localStorage with automatic save/load

**Component Structure**:
- `src/app/page.tsx` - Main application with two-column layout
- `src/components/forms/` - Member and item input forms
- `src/components/ui/` - Reusable UI components (chips, balance cards)
- `src/components/settlement/` - Settlement calculation display and KakaoTalk message generation

**Data Flow**:
- Members added with unique names and color-coded chips
- Bill items track payer and beneficiaries (split among selected members)
- Real-time balance calculation showing paid/owed/net amounts
- Automatic settlement optimization using greedy debt resolution
- One-click KakaoTalk message copying for group sharing

## Key Features

**Member Management**: Add/remove members with duplicate name prevention and visual color coding using predefined Tailwind colors

**Bill Splitting Logic**: 
- Items split equally among selected beneficiaries
- Real-time balance calculation (paid - owed = net balance)
- Optimal settlement calculation minimizing number of transactions

**Korean UX**: Korean language interface with Won currency formatting, KakaoTalk integration, and cultural considerations (3+ member recommendations)

**Data Persistence**: Automatic localStorage saves with error handling and data recovery

## Technical Implementation

**State Management**: Single `useBillSplitter` hook using React state with useMemo for performance optimization of balance/settlement calculations

**TypeScript**: Comprehensive type definitions with interfaces for Member, BillItem, MemberBalance, Settlement and all component props

**Styling**: Tailwind CSS v4 with responsive grid layouts, color-coded member chips, and consistent card-based UI

**Browser Compatibility**: Clipboard API with fallback for older browsers, localStorage with error handling