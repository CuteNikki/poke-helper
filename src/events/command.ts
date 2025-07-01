import { Collection, Events, MessageFlags, time, TimestampStyles } from 'discord.js';

import { Event } from '../classes/base/event';

export default new Event({
  name: Events.InteractionCreate,
  once: false,
  async execute(client, interaction) {
    if (!interaction.isCommand()) return; // Check if the interaction is a command

    const command = client.commands.get(interaction.commandName); // Retrieve the command from the client's commands collection

    // If the command is not found, log a warning and return
    if (!command) {
      console.warn(`Command not found: ${interaction.commandName}`);
      return;
    }

    // Handling cooldowns for the command
    if (command.options.cooldown && command.options.cooldown > 0) {
      const cooldowns = client.cooldowns;

      if (!cooldowns.has(command.options.data.name)) {
        cooldowns.set(command.options.data.name, new Collection());
      }

      const now = Date.now();
      const timestamps = cooldowns.get(command.options.data.name)!; // Forcing the type because we just created the collection above
      const cooldownAmount = command.options.cooldown * 1_000; // Convert cooldown from seconds to milliseconds
      const userId = interaction.user.id;

      if (timestamps.has(userId)) {
        const expirationTime = timestamps.get(userId)! + cooldownAmount; // Forcing the type because we know the userId exists in the collection

        if (now < expirationTime) {
          const expirationTimestamp = Math.round(expirationTime / 1_000); // Convert to seconds for discords timestamp format

          return interaction.reply({
            // Using a relative time format for the cooldown message, will show like "in 5 seconds"
            content: `Please wait, you are on cooldown for this command. Try again ${time(expirationTimestamp, TimestampStyles.RelativeTime)}.`,
            flags: [MessageFlags.Ephemeral],
          });
        }
      }

      // Set the timestamp for the user
      timestamps.set(userId, now);
      // Remove the userId from the cooldowns after the cooldown period
      setTimeout(() => timestamps.delete(userId), cooldownAmount);
    }

    // Trying to execute the command
    try {
      await command.options.execute(interaction);
    } catch (error) {
      console.error(`Error executing command ${interaction.commandName}:`, error);

      // If the interaction has already been replied to or deferred, follow up with an error message
      if (interaction.replied || interaction.deferred) {
        await interaction.followUp({
          content: 'There was an error while executing this command.',
          flags: [MessageFlags.Ephemeral],
        });
      } else {
        // If the interaction has not been replied to, reply with an error message
        await interaction.reply({
          content: 'There was an error while executing this command.',
          flags: [MessageFlags.Ephemeral],
        });
      }
    }
  },
});
