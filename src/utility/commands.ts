import type { ExtendedClient } from '../classes/base/client';
import type { Command } from '../classes/base/command';
import { getFilesFrom } from './files';

/**
 * Loads commands into the client.
 *
 * @param client - The ExtendedClient instance to load commands into.
 */
export async function loadCommands(client: ExtendedClient) {
  const filePaths = await getFilesFrom('src/interactions/commands');

  await Promise.all(
    filePaths.map(async (filePath) => {
      const command = (await import(`${filePath}?update=${Date.now()}`)).default;

      if (isValidCommand(command)) {
        client.commands.set(command.options.data.name, command);
      }
    }),
  );
}

function isValidCommand(command: Command): command is Command {
  return (
    typeof command === 'object' &&
    command !== null &&
    typeof command.options === 'object' &&
    command.options !== null &&
    'data' in command.options &&
    'execute' in command.options
  );
}
