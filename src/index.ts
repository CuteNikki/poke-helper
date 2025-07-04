import { GatewayIntentBits, Partials } from 'discord.js';

import { ExtendedClient } from './classes/base/client';

import { prisma } from './database';

import { loadCommands } from './utility/commands';
import { loadEvents } from './utility/events';
import { measure } from './utility/measure';

const client = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
  partials: [Partials.Message],
});

await Promise.all([
  measure('Database connected', () => prisma.$connect()),
  measure('Events loaded', () => loadEvents(client)),
  measure('Commands loaded', () => loadCommands(client)),
]);

await client.login(process.env.DISCORD_TOKEN);
