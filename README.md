# Poke Helper

_A Pokémon Themed Discord Bot_

Welcome to **Poke Helper**! This project is the foundation for a feature-rich Discord bot designed for Pokémon-themed servers. While we're just getting started, our goal is to provide a suite of utilities and fun features to enhance your Pokémon community experience.

## ✨ Planned Features

- Minigames (counting and more)
- Customizable server utilities
- Moderation helpers

## 🛠️ Tech Stack

- [Bun](https://bun.sh) — Fast all-in-one JavaScript runtime
- [TypeScript](https://www.typescriptlang.org/) — Type safety and modern JS features
- [Discord.js](https://discord.js.org/) — For Discord API integration
- [Prisma](https://www.prisma.io/) — Type-safe ORM for database access
- [PostgreSQL](https://www.postgresql.org/) — Reliable open-source relational database

## 🚀 Getting Started

**1. Install dependencies:**

```bash
bun install
```

**2. Set up the Environment:**

When [creating your Discord Bot Application](https://discord.com/developers/applications), make sure to enable the privileged intents Message Content.

Creating the database:

```
postgres=# CREATE DATABASE "mydb";
postgres=# CREATE USER "myuser" WITH ENCRYPTED PASSWORD "mypass";
postgres=# GRANT ALL PRIVILEGES ON DATABASE "mydb" TO "myuser";

These might be needed if issues still occur:

postgres=# \c "mydb";
mydb=# GRANT USAGE ON SCHEMA public TO "myuser";
mydb=# GRANT CREATE ON SCHEMA public TO "myuser";
mydb=# GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO "myuser";
mydb=# GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO "myuser";
```

If your postgresql instance is running locally, your `DATABASE_URL` will look like this:

```
postgresql://myuser:mypass@localhost:5432/mydb
```

Now fill in the `.env` file. There is an example file in this project.

Creates or update tables in your database:

```bash
bunx prisma migrate dev
```

Generate the Prisma client based on the schema, enabling type-safe database access in the project:

```bash
bunx prisma generate
```

**3. Register commands:**

```bash
bun run register
```

**4. Run the bot:**

```bash
bun run dev
```

## 🤝 Contributing

We're in the early stages!  
If you'd like to contribute ideas, code, or feedback, feel free to open an issue or pull request.

## 📄 License

This project is licensed under the [MIT License](LICENSE).
