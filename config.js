module.exports = {
  // *Required* Prefix for commands.
  PREFIX: '!',
  PORT: 5000,

  // *Required* Bot token. Can be found in your bots application page.
  // https://discordapp.com/developers/applications/me
  TOKEN: 'MjIzNTk4NjIwNTk3ODEzMjQ4.CrOSRg.syWoPAXmIByAXYlcYTxeJOlJw1o',

  // *Required* Bot client ID. Can be found in your bots application page.
  // https://discordapp.com/developers/applications/me
  CLIENT_ID: '223598620597813248',

  // *Required* Redis URL
  // Learn more here. http://redis.io/topics/quickstart
  REDIS_URL: '',

  // Time to wait between commands per user in seconds. Default is 1.
  MESSAGE_TTL: '2',

  // Carbon and Discord Bots key, used for displaying server count on specific websites.
  // More information here. https://www.carbonitex.net/discord/bots & https://bots.discord.pw/api
  CARBON_KEY: '',
  DBOTS_KEY: '',

  // Feedback Channel ID, used for storing feedback with `!feedback`.
  FEEDBACK_CHANNEL_ID: ''
};
