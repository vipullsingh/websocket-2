# websocket-2
├── server
│   ├── index.js         // server entry point
│   ├── models           // database models
│   │   ├── candidate.js // candidate schema
│   │   └── vote.js      // vote schema
│   ├── routes           // API routes
│   │   ├── candidates.js // candidate endpoints
│   │   └── votes.js      // vote endpoints
│   ├── utils            // utility functions
│   │   ├── database.js  // database connection setup
│   │   └── websocket.js // WebSocket setup
│   ├── package.json     // server dependencies
│   └── README.md
└── client
    ├── public
    │   ├── index.html    // main HTML file
    │   ├── js
    │   │   └── app.js    // client-side logic
    │   └── css
    │       └── styles.css // stylesheets
    ├── package.json      // client dependencies
    └── README.md
