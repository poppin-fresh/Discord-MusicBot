const { MessageEmbed } = require("discord.js");
const { TrackUtils } = require("erela.js");

module.exports = {
    name: "replay",
    description: "Replays the previous song in queue.",
    usage: "",
    permissions: {
        channel: ["VIEW_CHANNEL", "SEND_MESSAGES", "EMBED_LINKS"],
        member: [],
    },
    aliases: [],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
    run: async (client, message, args, { GuildDB }) => {
        let player = await client.Manager.get(message.guild.id);
        if (!player) return client.sendTime(message.channel, "❌ | **Nothing is playing right now...**");
        
        if (!player.queue.previous) return client.sendTime(message.channel, "❌ | **Nothing has played recently.**");
        const track = player.queue.previous;
        player.queue.previous = null;
        player.queue.unshift(track);
        
		client.sendTime(message.channel, "✅ | **" + track.title + "** has been moved to the front of the queue.");
    },

    SlashCommand: {
      options: [
          {
              name: "replay",
              value: "",
              type: 4,
              required: true,
              description: "Replays the previous song in queue.",
          },
      ],
    /**
     *
     * @param {import("../structures/DiscordMusicBot")} client
     * @param {import("discord.js").Message} message
     * @param {string[]} args
     * @param {*} param3
     */
        run: async (client, interaction, args, { GuildDB }) => {
            const guild = client.guilds.cache.get(interaction.guild_id);
            const member = guild.members.cache.get(interaction.member.user.id);
            
            let player = await client.Manager.get(interaction.guild.id);
            if (!player) return client.sendTime(interaction, "❌ | **Nothing is playing right now...**");
            
            if (!player.queue.previous) return client.sendTime(interaction, "❌ | **Nothing has played recently.**");
            const track = player.queue.previous;
            player.queue.previous = null;
            player.queue.unshift(track);

            client.sendTime(interaction, "✅ | **" + track.title + "** has been moved to the front of the queue.");
        },
    },
};