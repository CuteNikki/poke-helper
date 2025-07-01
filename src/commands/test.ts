import { ApplicationIntegrationType, InteractionContextType, MessageFlags, SlashCommandBuilder } from 'discord.js';

import { Command } from '../classes/base/command';

export default new Command({
  data: new SlashCommandBuilder()
    .setContexts(InteractionContextType.Guild, InteractionContextType.BotDM, InteractionContextType.PrivateChannel)
    .setIntegrationTypes(ApplicationIntegrationType.GuildInstall, ApplicationIntegrationType.UserInstall)
    .setName('test')
    .setDescription('A test command to check if the bot is working'),
  execute: async (interaction) => {
    await interaction.reply({
      content: 'This is a test command. If you see this, the bot is working!',
      flags: [MessageFlags.Ephemeral],
    });
  },
});
