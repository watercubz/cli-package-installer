# CLI Package Manager

![CLI Package Manager](https://packages.zeek.org/img/bropkgmgr.png)

## Description

CLI Package Manager is a command-line tool (CLI) for managing dependencies in Node.js projects efficiently. It allows developers to install, uninstall, and update npm packages without leaving the terminal.

## Installation

To install CLI Package Manager globally and use it across different projects, follow these steps:

1. Install CLI Package Manager globally using npm:

    ```bash
    npm install -g cli-package-manager
    ```

    This will install CLI Package Manager globally on your system, making it available for use in any project.

## Usage

1. Once CLI Package Manager is installed globally, you can run it from the terminal using the following command:

    ```bash
    cli-package-manager
    ```

    This will start the command-line interface where you can select the actions you want to perform, such as installing, uninstalling, or updating npm packages.

### Running with `.bat` File

1. You can also execute the program using the `run-cli.bat` file. Simply double-click the `run-cli.bat` file in your file explorer or run it from the command line with:

    ```bash
    .\run-cli.bat
    ```

## Available Commands

- `install`: Install one or multiple npm packages.
- `uninstall`: Uninstall one or multiple npm packages.
- `exit`: Exit the application.

## Testing

1. To run the project's unit tests, use the following command:

    ```bash
    npm test
    ```

    This will execute all tests defined in the `test` directory and provide feedback on the code quality.

## Contribution

Contributions are welcome! If you find any bugs or have ideas to improve this project, feel free to open an issue or submit a pull request.

## Author

This project was developed by [watercubz](https://github.com/watercubz).

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.
