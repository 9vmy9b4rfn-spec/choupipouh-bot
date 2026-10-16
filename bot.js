const http = require('http');
http.createServer((req, res) => res.end('Bot actif')).listen(process.env.PORT || 3000);
const { Client, GatewayIntentBits } = require('discord.js');
const mysql = require('mysql2/promise');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

const dbConfig = {
    host: 'sql111.infinityfree.com',
    user: 'if0_43193094',
    password: 'oJXrkf44Pd',
    database: 'if0_43193094_choupipouh_db'
};

const guildId = '1147270459113607331';

const paliers = {
    125: '1560631239978000574',
    100: '1560631212530471053',
    80:  '1560631148449628291',
    65:  '1560631110231392347',
    55:  '1560631066438668309',
    45:  '1560631032779116584',
    38:  '1560630992140636280',
    30:  '1560630946372264097',
    25:  '1560630923857362945',
    20:  '1560630876365258912',
    15:  '1560630835584176278',
    12:  '1560630791908626484',
    9:   '1560630718537793706',
    6:   '1560630648320827513',
    3:   '1560630495644090378'
};

client.on('ready', async () => {
    console.log(`Bot connecté en tant que ${client.user.tag}`);
});

client.login(process.env.DISCORD_TOKEN);