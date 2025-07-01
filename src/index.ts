import { GatewayIntentBits } from 'discord.js';

import { ExtendedClient } from './classes/base/client';
import { loadCommands } from './utility/commands';
import { loadEvents } from './utility/events';
import { measure } from './utility/measure';

const client = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds],
});

await Promise.all([measure('Events loaded', () => loadEvents(client)), measure('Commands loaded', () => loadCommands(client))]);

await client.login(process.env.DISCORD_TOKEN);
