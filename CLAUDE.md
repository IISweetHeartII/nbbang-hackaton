# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.3 application using the App Router architecture with TypeScript, Tailwind CSS v4, and React 19. The project was bootstrapped with create-next-app and uses Turbopack for faster builds.

## Development Commands

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production with Turbopack  
- `npm run start` - Start production server
- `npm run lint` - Run ESLint with Next.js TypeScript rules

## Architecture

**App Router Structure**: Uses Next.js App Router with files in `src/app/`
- `src/app/layout.tsx` - Root layout with Geist fonts and global styles
- `src/app/page.tsx` - Homepage component  
- `src/app/globals.css` - Global styles with Tailwind v4 and CSS custom properties

**TypeScript Configuration**: 
- Path mapping configured (`@/*` → `./src/*`)
- Strict mode enabled
- Next.js TypeScript plugin integrated

**Styling**:
- Tailwind CSS v4 with PostCSS integration
- CSS custom properties for theming (light/dark mode support)
- Geist Sans and Geist Mono fonts from Google Fonts

**ESLint Setup**: 
- Next.js core web vitals and TypeScript rules
- Flat config format with ignores for build directories

## Key Dependencies

- React 19.1.0 with React DOM
- Next.js 15.5.3 with App Router  
- TypeScript 5.x
- Tailwind CSS v4 with PostCSS plugin
- ESLint 9.x with Next.js config

## Development Notes

- Turbopack is enabled for both dev and build commands for faster compilation
- The project uses the new Tailwind v4 syntax with `@import "tailwindcss"`
- Font optimization is handled through `next/font/google` with Geist fonts
- Dark mode support is implemented via CSS custom properties and `prefers-color-scheme`