# mernMovie

Movie Search and Playlist Management App

This project is a web application that allows users to search for movies using the OMDB API and manage their playlist of favorite movies. Users can add movies to their playlist, view details about each movie, and manage their account.
Table of Contents

    Technologies Used
    Features
    Getting Started
        Prerequisites
        Installation
        Running the Application
    Project Structure
    Usage
    Screenshots
    Contributing
    
Technologies Used

    React: Frontend library for building user interfaces.
    Material-UI: React components for faster and easier web development.
    React Router: Declarative routing for React applications.
    Node.js: JavaScript runtime.
    Express.js: Web framework for Node.js.
    MongoDB: NoSQL database.
    Mongoose: MongoDB object modeling for Node.js.
    Axios: Promise-based HTTP client for the browser and Node.js.
    JWT (JSON Web Tokens): Authentication mechanism.
    OMDB API: Open Movie Database API for fetching movie details.
    Emotion: Library for writing CSS styles with JavaScript.

Features

    Search: Search for movies by title.
    View Details: View detailed information about a selected movie.
    Add to Playlist: Add movies to the user's playlist.
    Playlist: View and manage the user's playlist of favorite movies.
    Authentication: User authentication with JWT tokens.
    Authorization: Protect routes and API endpoints with authentication.

Getting Started
Prerequisites

    Node.js (version >= 12.0.0)
    npm (version >= 6.0.0)
    MongoDB

Installation

    Clone the repository:

    bash

git clone <repository-url>
cd <repository-folder>

Install dependencies:

bash

    npm install

Running the Application

    Make sure MongoDB is running on your local machine or update the connection string in server.js to your MongoDB instance.

    Start the backend server:

    bash

npm run server

Start the frontend development server:

bash

    npm start

    Open your browser and visit http://localhost:3000 to view the application.
    
              # Project README

Usage

    Search for movies using the search bar at the top.
    Click on a movie to view more details.
    Add movies to your playlist by clicking "Add to Playlist".
    Navigate to the "Playlist" page to view and manage your playlist.
    Click on "Logout" to log out from the application.


