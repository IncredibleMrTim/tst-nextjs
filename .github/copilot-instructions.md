# Copilot Instructions

## Configuration

- This project uses React.js and Next.js.
- There is no need to import the react as a UMD
- eslint should use ESNext format
- publicly hosted images and svg in the public folder in the root of the application
- NPM is used as the application package manager

## State Management

- Zustand is used for state management

## Testing

- jest along with RTL is used for unit testing
- when using renderHook use @testing-library/react instead of @testing-library/react-hooks
- use userEvent instead of fireEvent where possible
