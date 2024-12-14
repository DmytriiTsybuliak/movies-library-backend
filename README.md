Movies Library Backend is a robust backend project designed to support a movie and TV show library
application. It provides secure user authentication, session handling, and comprehensive management
features for user favorites.

### Features

1. User Authentication and Authorization

- Secure authentication using sessions and JWT tokens(Access+Refresh Tokens).
- Seamless login via Google OAuth 2.0.

2. Password Recovery

- Password reset functionality via registered email addresses.
- SMTP email service integration using Brevo for sending recovery emails.

3. Token and Session Management

- Refresh tokens and session handling for secure and persistent user connections.

4. Favorite Management

- Add or remove movies and TV shows from the favorites list.
- Retrieve the complete list of saved favorites for authenticated users.

5. Data Storage

- Utilizes MongoDB as the primary database for reliable and scalable data storage.

6. API Documentation

- Explore and interact with the API using
  [Swagger documentation](https://movies-library-backend-s1fd.onrender.com/api-docs/#/).

### Deployment Note

This project is hosted on a free-tier server provided by Render. Please note:

- Free-tier servers enter a sleep mode when idle.
- The server may take 50 seconds or longer to wake up upon receiving a new request.
