# Websocket-2

This is a simple voting system built with WebSockets.

## Folder Structure

websocket-2/
├── server/
│ ├── index.js
│ ├── models/
│ │ ├── candidate.js
│ │ └── vote.js
│ ├── routes/
│ │ ├── candidates.js
│ │ └── votes.js
│ ├── utils/
│ │ ├── database.js
│ │ └── websocket.js
│ ├── package.json
│ └── README.md
└── client/
├── public/
│ ├── index.html
│ ├── js/
│ │ └── app.js
│ └── css/
│ └── styles.css
├── package.json
└── README.md


## Installation

To install and run the server:

1. Clone this repository: `git clone https://github.com/your-username/websocket-2.git`
2. Navigate to the server folder: `cd websocket-2/server`
3. Install the dependencies: `npm install`
4. Start the server: `npm start`

To install and run the client:

1. Navigate to the client folder: `cd websocket-2/client`
2. Install the dependencies: `npm install`
3. Start the client: `npm start`

The client should be accessible at `http://localhost:3000`.
