const { Client, GatewayIntentBits } = require('discord.js');
const mysql = require('mysql2/promise');
const http = require('http');

const httpPort = process.env.PORT || 3000;
http.createServer((req, res) => res.end('Bot actif')).listen(httpPort);

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
    setInterval(verifierPaliers, 60000);
});

async function verifierPaliers() {
    try {
        const connection = await mysql.createConnection(dbConfig);
        const [rows] = await connection.execute('SELECT discord_id, points FROM choupipouh_points');
        await connection.end();

        const guild = await client.guilds.fetch(guildId);
        await guild.members.fetch();

        for (const row of rows) {
            const member = guild.members.cache.get(row.discord_id);
            if (!member) continue;

            let roleIdToAssign = null;
            const points = row.points;

            const sortedPaliers = Object.keys(paliers).map(Number).sort((a, b) => b - a);
            for (const palier of sortedPaliers) {
                if (points >= palier) {
                    roleIdToAssign = paliers[palier];
                    break;
                }
            }

            for (const [palierVal, rId] of Object.entries(paliers)) {
                if (member.roles.cache.has(rId) && rId !== roleIdToAssign) {
                    await member.roles.remove(rId).catch(console.error);
                }
            }

            if (roleIdToAssign && !member.roles.cache.has(roleIdToAssign)) {
                await member.roles.add(roleIdToAssign).catch(console.error);
            }
        }
    } catch (err) {
        console.error('Erreur SQL:', err);
    }
}

client.login(process.env.DISCORD_TOKEN);