# Express Backend for GPI (Gestión de Proyectos Informáticos)

This repository contains the code for the backend of a project developed as part of the "Gestión de Proyectos Informáticos I" course at UPNA. The backend is built using Express.js and MongoDB, following the MVC (Model-View-Controller) pattern.

## Introduction

This Express.js backend serves as the server-side component for the project. It follows the MVC pattern to organize the code into separate modules, making it more maintainable and extensible.

## Project Structure

The project is organized with the following directory structure:

- **config:** Contains configuration files, including `db.js` for database connection setup.
- **controllers:** Contains controller modules for different entities like projects, sprints, users, and user stories.
- **docs:** Holds documentation files, including API specifications and examples.
- **index.js:** The main entry point of the application.
- **middleware:** Contains middleware modules, especially designed for securing the application.
- **models:** Defines MongoDB models for the entities used in the application.
- **routes:** Contains route modules that define the API endpoints for different entities.

## Features

- Express.js server with RESTful API endpoints.
- MongoDB integration for data storage.
- Authentication and authorization mechanisms using tokens as cookies.
- Separate controllers for managing project data.
- Modular and organized project structure following the MVC pattern.
- Documentation files for API specifications and examples.

## Getting Started

### Prerequisites

Before you begin, ensure you have met the following requirements:

- Node.js and npm (Node Package Manager) installed.
- MongoDB installed and running locally or provide the appropriate connection details in your configuration file.

### Installation

1. Clone this repository to your local machine:

   ```bash
    git clone https://github.com/itogaston/ExpressBackenGPI.git
   ```

2. Change into the project directory:

   ```bash
   cd ExpressBackendGPI
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

### Configuration

1. Create a `.env` file in the root directory of the project to store environment-specific configuration variables such as database connection details, API keys, or secrets:

   ```
   NODE_ENV=development
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/gpi
   SECRET_KEY=your-secret-key
   JWT_SECRET="SeedForTheUserTokensCreated"
   ```

   Update the values according to your setup.

## Usage

To start the Express.js server, run the following command:

```bash
npm start
```

You can then access the API endpoints using a tool like Postman or integrate them into your frontend application.

## API Documentation

Detailed API documentation and specifications can be found in the `docs` directory. Here are some of the key documentation files:

- [Sprint2API.md](docs/Sprint2API.md): API documentation for Sprint 2.
- [TODO.md](docs/TODO.md): A list of tasks and features to be implemented.
- [postmanAPIspecs.json](docs/postmanAPIspecs.json): Postman collection with API examples.

## Contributing

Contributions are welcome! If you would like to contribute to this project, please open an issue or create a pull request with your changes.

## License

This project is licensed under the [MIT License](LICENSE).
