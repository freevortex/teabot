import Promise from 'bluebird';
import nconf from 'nconf';
import R from 'ramda';



function channelinfo(client, evt, suffix) {
  const channelinfo = [];
  if (evt.message.channel.isPrivate) {
    channelinfo.push(`\`\`\`ID: ${evt.message.channel.id}
Type: Direct Message
New Messages: ${evt.message.channel.messages.length} (since the bot was restarted)
Created At: ${evt.message.channel.createdAt}
\`\`\``);
  } else if (!suffix && evt.message.content.indexOf('<#') === -1) {
    channelinfo.push(`\`\`\`Server: ${evt.message.guild.name}
Name: ${evt.message.channel.name}
ID: ${evt.message.channel.id}
Type: ${evt.message.channel.type}
Position: ${evt.message.channel.position}
New Messages: ${evt.message.channel.messages.length} (since the bot was restarted)
Created At: ${evt.message.channel.createdAt}
Topic: ${evt.message.channel.topic}
\`\`\``);
  } else if (evt.message.content.indexOf('<#') !== -1) {
    R.forEach(suffix => {
      const channel = R.find(R.propEq('id', suffix.substring(2, suffix.length - 1)))(evt.message.guild.channels);
      if (channel.type === 'text') {
        channelinfo.push(`\`\`\`Server: ${channel.guild.name}
Name: ${channel.name}
ID: ${channel.id}
Type: ${channel.type}
Position: ${channel.position}
New Messages: ${channel.messages.length} (since the bot was restarted)
Created At: ${channel.createdAt}
Topic: ${channel.topic}
\`\`\``);
      } else {
        channelinfo.push(`\`\`\`Server: ${channel.guild.name}
Name: ${channel.name}
ID: ${channel.id}
Type: ${channel.type}
Position: ${channel.position}
Created At: ${channel.createdAt}
Bitrate: ${channel.bitrate}
User Limit: ${channel.user_limit}
\`\`\``);
      }
    }, suffix.split(' '));
  } else {
    const channel = R.find(R.propEq('name', suffix))(evt.message.guild.channels);
    if (!channel) return;
    if (channel.type === 'text') {
      channelinfo.push(`\`\`\`Server: ${channel.guild.name}
Name: ${channel.name}
ID: ${channel.id}
Type: ${channel.type}
Position: ${channel.position}
New Messages: ${channel.messages.length} (since the bot was restarted)
Created At: ${channel.createdAt}
Topic: ${channel.topic}
\`\`\``);
    } else {
      channelinfo.push(`\`\`\`Server: ${channel.guild.name}
Name: ${channel.name}
ID: ${channel.id}
Type: ${channel.type}
Position: ${channel.position}
Created At: ${channel.createdAt}
Bitrate: ${channel.bitrate}
User Limit: ${channel.user_limit}
\`\`\``);
    }
  }

  return Promise.resolve(channelinfo);
}

function serverinfo(client, evt, suffix) {
  const serverinfo = [];
  if (evt.message.channel.isPrivate) return Promise.resolve('Use this in an actual server.\nhttp://fat.gfycat.com/GranularWeeCorydorascatfish.gif');
  if (!suffix) {
    const roles = R.join(', ', R.reject(name => name === '@everyone', R.pluck('name', evt.message.guild.roles)));
    serverinfo.push(`\`\`\`Name: ${evt.message.guild.name}
ID: ${evt.message.guild.id}
Region: ${evt.message.guild.region}
Owner: ${evt.message.guild.owner.username}
Channels: ${evt.message.guild.channels.length} (${evt.message.guild.textChannels.length} text & ${evt.message.guild.voiceChannels.length} voice)
Default Channel: ${evt.message.guild.generalChannel.name}
AFK Channel: ${evt.message.guild.afk_channel ? evt.message.guild.afk_channel.name : 'None'}
AFK Timeout: ${evt.message.guild.afk_timeout / 60} minutes
Members: ${evt.message.guild.members.length}
Created At: ${evt.message.guild.createdAt}
Roles: ${roles}
Icon: ${evt.message.guild.iconURL ? `\`\`\`${evt.message.guild.iconURL}` : `None
\`\`\``}`);
  } else {
    const guild = R.find(R.propEq('name', suffix))(client.Guilds);
    if (!guild || nconf.get('SHARDING')) return;
    const roles = R.join(', ', R.remove(0, 1, R.pluck('name', guild.roles)));
    serverinfo.push(`\`\`\`Name: ${guild.name}
ID: ${guild.id}
Region: ${guild.region}
Owner: ${guild.owner.username}
Channels: ${guild.channels.length} (${guild.textChannels.length} text & ${guild.voiceChannels.length} voice)
Default Channel: ${guild.generalChannel.name}
AFK Channel: ${guild.afk_channel.name ? guild.afk_channel.name : 'None'}
AFK Timeout: ${guild.afk_timeout / 60} minutes
Members: ${guild.members.length}
Created At: ${guild.createdAt}
Roles: ${roles}
Icon: ${guild.iconURL ? `\`\`\`${guild.iconURL}` : `None
\`\`\``}`);
  }

  return Promise.resolve(serverinfo);
}


export const help = {
  channelinfo: {parameters: ['channelname']},
  serverinfo: {parameters: ['servername']},
};

export default {
  channelinfo,
  serverinfo,
};
