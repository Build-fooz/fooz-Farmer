# FoozFood



## Project Overview

This project consists of:
- **Client**: React.js frontend with Tailwind CSS
- **Server**: Node.js/Express backend with MongoDB

## Getting Started

Follow these steps to set up the project locally.

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- MongoDB (local installation or MongoDB Atlas account)
- Git

### Cloning the Repository

1. Open your terminal
2. Clone the repository:
   ```bash
   git clone https://github.com/Build-fooz/fooz-Farmer.git
   cd fooz-Farmer
   ```

### Setting Up the Backend

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   PORT=3000
   MONGODB_URI=your_mongodb_connection_string
   ```

4. Start the server:
   ```bash
   npm start
   ```
   
   For development with auto-reload:
   ```bash
   npm run dev
   ```

### Setting Up the Frontend

1. Open a new terminal window/tab
2. Navigate to the client directory:
   ```bash
   cd client
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. The application should now be running at `http://localhost:5173`

## Project Structure

- `/client` - React frontend
  - `/src` - Source code
    - `/Components` - Reusable UI components
    - `/Pages` - Page components
    - `/assets` - Static assets like images
- `/server` - Express backend
  - `/src` - Source code
    - `/controllers` - Request handlers
    - `/models` - Database models
    - `/routes` - API routes
    - `/config` - Configuration files
    - `/middleware` - Custom middleware
    - `/utils` - Utility functions

## Branch Management

When working with branches:

1. Create a new branch for your feature:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "Your descriptive commit message"
   ```

3. Push your branch to the remote repository:
   ```bash
   git push origin feature/your-feature-name
   ```

4. Create a pull request on GitHub to merge your changes into the main branch

## Resolving Merge Conflicts

If you encounter merge conflicts:

1. Check the status to see which files have conflicts:
   ```bash
   git status
   ```

2. Resolve conflicts in the affected files manually or use:
   ```bash
   git checkout --ours filename.ext  # Keep your changes
   git checkout --theirs filename.ext  # Keep their changes
   ```

3. After resolving, mark as resolved:
   ```bash
   git add filename.ext
   ```

4. Complete the merge:
   ```bash
   git commit -m "Resolve merge conflicts"
   ```

## Features

- Farmer registration and authentication
- Product listing and management
- Order tracking
- Analytics dashboard
- Delivery management

## License


## Contact
