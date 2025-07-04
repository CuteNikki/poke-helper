import { Events } from 'discord.js';
import { Event } from '../classes/base/event';
import { getCounting, incrementCountingCount, resetCountingCount } from '../database/counting';

export default new Event({
  name: Events.MessageCreate,
  once: false,
  async execute(_, message) {
    // Ignore bot messages and non-guild messages
    if (message.author.bot || !message.inGuild()) return;

    const counting = await getCounting(message.guildId);
    // Check if counting is set up and in the correct channel
    if (!counting || message.channelId !== counting.channelId) return;

    // Check if the author is the same as the last user who counted
    if (counting.currentNumberByUserId === message.author.id) {
      const warnMessage = await message
        .reply({
          content: `You cannot count twice in a row! Please wait for someone else to count.`,
        })
        .catch(console.error);
      // Delete the warning after 3 seconds
      setTimeout(() => {
        message.delete().catch(console.error);
        warnMessage?.delete().catch(console.error);
      }, 3000);
      return;
    }

    // Check if the message content is a valid number
    const count = parseInt(message.content, 10);

    if (isNaN(count) || count !== counting.currentNumber + 1) {
      // If the count is invalid, reset the counting configuration if resetOnFail is true
      if (counting.resetOnFail) {
        await resetCountingCount(message.guildId);
        await message.reply({
          content: `Wrong number! The counting has been reset to 0. Please start over by sending the number 1.`,
        });
      } else {
        await message.delete().catch(console.error);
      }
      return;
    }

    // Increment the counting number
    await incrementCountingCount(message.guildId, message.author.id);
  },
});
