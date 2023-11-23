# Build Status App

## Overview

This React Native app allows users to check the build status of their repositories on various version control platforms with updates every 30 seconds. Stay informed about the health of your projects by easily monitoring their build statuses in one place.

## Features

- **Cross-platform Compatibility:** Built with React Native for flexibility and future multi-platform support only Github.
- **User-friendly Interface:** Intuitive design for a seamless user experience.
- **Periodic Updates:** Receive build status updates every 30 seconds using Socket.IO.
  
## Future Plans

We have plans to extend support to multiple platforms, including GitLab, and Bitbucket. Stay tuned for updates!

## Getting Started

Follow these steps to get the app up and running on your local machine.

### Prerequisites

- Node.js and npm installed
- React Native development environment set up
- Github Token for Bypassing the 60 limit API
- Expo Go Application

### Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/repo-build-checker.git
cd repo-build-checker
```

2. Install dependencies:

```bash
npm install
```

3. Login With Expo

```bash
npx expo login
```

4. Run The app:

```bash
npx expo --tunnel # if running on a codespace
npx expo start
```

## Usage

1. Open the app on your device or emulator
1. Add your repositories in settings along with your github username

## Contributing

If you'd like to contribute to the development of this app, please follow these guidelines:
Fork the repository.
Create a new branch for your feature or bug fix.
Make your changes and submit a pull request.

## License

This project is licensed under the **MIT License**.

## Acknowledgments

Thanks to github rest api for providing the build status information.
