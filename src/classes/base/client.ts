import { ApplicationCommandType, Client, Collection } from 'discord.js';

import type { Command } from './command';

/**
 * ExtendedClient is a custom Discord.js client that includes additional functionality.
 * It extends the base Client class and adds a collection for commands.
 */
export class ExtendedClient extends Client {
  /**
   * A collection of commands that the client can execute.
   * Collection<commandName, Command<ApplicationCommandType>>
   */
  commands = new Collection<string, Command<ApplicationCommandType>>();

  /**
   * This collection is used to keep track of cooldowns.
   * Collection<customId/commandName, Collection<userId, timestamp>>
   */
  cooldowns = new Collection<string, Collection<string, number>>();
}
