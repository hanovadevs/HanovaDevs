# Eunoia

## App Description

Eunoia is a local-first desktop productivity companion built with Electron. It brings planning, note-taking, journaling, alarms, focus sessions, file storage, lightweight analytics, and an integrated AI assistant into one personal workspace designed for everyday life management.

The app is centered around a calm, premium-feeling interface and keeps user data on the local machine. It is designed to help users organize their day, capture thoughts quickly, reflect privately, and build more consistent routines.

## Core Product Idea

Eunoia combines the feel of a personal planner, reflective journal, alarm clock, digital notebook, and desktop assistant in one app. Instead of splitting your life across several small tools, it gives you one place to manage tasks, moods, notes, files, and focus sessions.

## Main Features

### 1. Overview Dashboard

- Daily home screen with a personalized greeting
- Snapshot of today's tasks and completion progress
- Focus timer summary
- Next upcoming alarm preview
- Quick links into Planner, Notes, Diary, and Drive
- Pinned notes and recent reflections surfaced on the home page
- Daily motivational quote rotation

### 2. Planner

- Create, edit, and delete tasks
- Assign task date, start time, end time, status, priority, and category
- Status workflow: `todo`, `progress`, `done`, `skipped`
- Day-by-day navigation for planning past and future dates
- Task search for the selected day
- Subtasks with progress tracking
- Daily habits bar with quick completion toggles
- Weekly completion percentage and simple productivity summaries

### 3. Notes

- Create, edit, duplicate, pin, copy, view, and delete notes
- Rich-text note editor using contenteditable formatting tools
- Formatting controls for bold, italic, underline, bulleted lists, and numbered lists
- Tag support with tag-based filtering
- Search across note title, body, and tags
- Color/tone selection for notes
- Pinned notes stay prioritized
- Dedicated note preview/view mode

### 4. Diary

- Private daily journal with entry archive
- Create and update dated diary entries
- Mood selection per entry
- Diary-specific font/aesthetic switching
- PIN protection for the diary
- Diary archive with entry browsing and reopening
- Separate mood tracker with quick mood logging and optional notes
- Recent mood history shown alongside journal tools

### 5. Alarms and Focus

- Create, edit, enable/disable, snooze, and delete alarms
- Alarm scheduling by time and repeat days
- Alarm types:
  - Regular
  - Math Challenge
  - Text Challenge
  - Reminder
- Custom challenge word support
- Fade-in duration and snooze duration settings
- Built-in online tone library
- Import custom audio files as alarm tones
- Tone preview before saving
- Alarm watcher that checks alarms continuously
- Desktop notifications for alarm events

### 6. Pomodoro / Focus Engine

- Start, pause, and reset focus sessions
- Focus, short break, and long break modes
- Preset durations tied to focus mode
- Session count tracking
- Ambient sound playback during focus sessions
- Built-in ambient sound choices like rain, brown noise, cafe, and forest
- Focus logging used later inside Insights

### 7. Drive / Local Vault

- Local file vault inside the app's user data workspace
- Import files into the app-managed vault
- Remove and export stored files
- Create folders inside the vault
- Open folders and navigate back out
- Export individual files, all files, or a folder's files
- Storage usage display
- Optional PIN lock for vault access

Note: the current implementation is local storage with PIN-gated access and safe file handling. It is not true encrypted cloud storage.

### 8. Insights

- Weekly productivity overview
- Productivity score
- Weekly task completion metrics
- Focus time summaries
- 7-day activity heatmap
- Task status breakdown
- Mood distribution view
- Reflection depth stats from diary and mood logs
- Focus intensity chart across the week
- AI-style suggestion panel based on current usage

### 9. AI Assistant

- Built-in conversational assistant called Eunoia
- Text chat UI with persistent chat history
- Voice input via microphone
- Offline speech transcription using `@xenova/transformers` and Whisper Tiny English
- Browser speech synthesis for spoken responses
- Local intent handling for app actions
- Optional Gemini API key support for richer conversational responses
- AI can perform app actions such as:
  - add tasks
  - add notes
  - log moods
  - navigate between views
  - start focus sessions
  - change theme/font/settings
  - create diary entries
  - create folders
  - manage alarms and habits
- Stores lightweight learned observations about the user
- Proactive prompts based on time of day, current workload, and usage patterns
- Recurring-task suggestion logic based on historical planner behavior

### 10. Onboarding, Tips, and UX Polish

- Animated splash screen
- First-run onboarding flow
- Contextual help hotspots across key features
- Toast feedback system
- Custom frameless desktop window with custom titlebar controls
- Sidebar collapse support
- Multiple visual themes, including light, dark, and blossom/pink
- Adjustable accent color, font size, and UI density

## Data and Storage Model

Eunoia is built as a local-first app.

- App state is saved to a JSON file inside Electron user data
- Vault files are copied into a dedicated local vault directory
- Custom tones are copied into a local tones directory
- Browser preview mode falls back to `localStorage`
- The app exposes file and state operations through Electron IPC

## Desktop/Platform Behavior

- Built as an Electron desktop app
- Uses a secure preload bridge with `contextIsolation`
- Disables Node integration in the renderer
- Supports Windows packaging through `electron-builder` and NSIS
- Includes custom app icons and installer assets

## Codebase Structure

### `electron/`

- `main.js`: Electron main process, window creation, IPC handlers, local persistence, vault import/export, audio file selection, and offline transcription pipeline
- `preload.js`: safe API bridge exposed to the renderer

### `src/`

- `app.js`: main renderer application, UI rendering, state management, feature logic, timers, alarms, AI chat, onboarding, and interactions
- `eunoia-brain.js`: assistant brain, local command parsing, Gemini integration, context building, and action generation
- `index.html`: desktop shell and splash screen mount point
- `styles.css`: full visual system, themes, layouts, animations, and component styling

### `assets/`

- App icons, logo, and installer graphics

## Tech Stack

- Electron
- Vanilla JavaScript
- HTML/CSS
- Electron IPC for renderer-main communication
- `@xenova/transformers` for offline speech transcription
- Optional Gemini API integration for cloud-enhanced assistant responses
- `electron-builder` for packaging/distribution

## Summary

Eunoia is a polished personal productivity desktop app that combines task planning, journaling, notes, alarms, focus tools, file storage, insights, and an AI assistant inside a single local workspace. Its strongest differentiators are the all-in-one personal organization experience, local-first storage model, rich desktop feel, and the assistant layer that can both converse and take actions inside the app.
