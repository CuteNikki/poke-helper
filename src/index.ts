import { GatewayIntentBits } from 'discord.js';

import { ExtendedClient } from './classes/base/client';

const client = new ExtendedClient({
  intents: [GatewayIntentBits.Guilds],
});

client.once('ready', (client) => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.DISCORD_TOKEN);
