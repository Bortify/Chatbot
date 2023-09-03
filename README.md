# Chatbot phase-1

## Given are sagregated applications:

- Chatfront: This will be front facing application that can be embedded on user's website and visitors will chat with it.
- Dashboard: This will be only app to configure the behaviour of the chatbot and to track chatbot usage.
- Server: This will be the backend for the whole service and will have NLP engine, db etc.

## Tech Stack we will use

### for Backend:
- [Express](https://expressjs.com/) for creating APIs.
- [Postgres](https://www.postgresql.org/) for db.
- [Redis](https://redis.io/) for state management.
- [Prisma](https://prisma-client-py.readthedocs.io/en/stable/) for interacting with db via code.

### for Chatfront
- [Preact](https://preactjs.com/) for creating injectible scripts.
- ```Rest is yet to be decided```

### for Dashboard
- [ReactJs](https://react.dev/) for development of dashboard.

### Enviroment Variables

-  ```PORT``` : Port on which you want to run this server.
- ```DATABASE_URL``` : Database URL. We'rae using postgres for database so install it first, get connection url and then start server.