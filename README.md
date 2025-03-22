# Frontend Folder Structure
The organizational structure of the frontend project, designed to separate concerns and improve code maintainability. Each folder and file serves a specific purpose, such as testing, styling, routing, or implementing business logic. This structure ensures scalability and ease of collaboration for frontend development.

## cypress 
Contains all the configuration and helper files for end-to-end testing with Cypress, ensuring the app works as intended.

- ### Fixtures
Stores mock data files (e.g., JSON) that can be used to simulate API responses during tests.
- ### support
Holds custom commands and other configurations to extend and customize Cypress tests.

## figma-design
Organizes exported Figma design files for different device layouts to guide UI development.

- ### mobile
- ### tablet

## public
Contains static files such as images, icons, and the `index.html`, which are directly served by the application.

## src
The main source code folder housing the app’s components, pages, state management, and other core files.

- ### components
Includes reusable UI components providing modularity and consistency.
    
    Common-media
    Content
    LandingPage
    Loading
    Navbar
    Trending
    TV
    Layout
    Search
    ToastContext

- ### pages
Defines the top-level views or routes in the application, each corresponding to a unique screen.

    Bookmarks
    HomePage
    Login
    Logout
    Signup
    Movie
    TrendingMovies
    TVSeries
    NotFound
    UnAuthorizedPages


- ### store
Manages the application’s global state using Redux and related utilities.

    Redux
    auth.js
    localstorage
    store.jsx


- ### App.js
The main application component that handles routing and layout.
- ### App.css
- ### index.js
The entry point file that initializes the app and renders it into the DOM.

- ### index.css
- ### constants
Holds static values, such as API URLs or application-wide configuration constants.



## gitignore
Lists files and directories that should be excluded from version control, such as `node_modules`.

## cypress.config.js
The main configuration file for Cypress, defining test settings and options.

## package.json
Specifies project metadata, dependencies, scripts, and versioning for the application.

## tailwind.config.js
Configuration file for Tailwind CSS, allowing customization of utility classes and themes.

