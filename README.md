# QVAC Study Buddy

A local AI study assistant powered by Tether's QVAC SDK.

## Description

QVAC Study Buddy is a web app that helps students understand programming and academic concepts. Type a question in your browser and get an AI-generated answer — all inference runs on your own device using the QVAC SDK, with no cloud API and no data leaving your machine.

## Features

- AI-generated study explanations, answered in a browser UI
- Local AI model execution (no cloud API key required)
- Simple, clean web interface — type a question, click Ask

## Technologies

- Node.js
- Express
- QVAC SDK
- HTML / CSS / JavaScript (frontend)

## QVAC SDK Version

@qvac/sdk ^0.19.1

## Installation

1. Clone this repository.
2. Open the project folder in the terminal.
3. Install dependencies:

```bash
npm install
```

## Run the App

```bash
node server.js
```

Then open `http://localhost:3000` in your browser.

## QVAC Functions

- loadModel
- completion

## License

MIT License