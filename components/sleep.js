const { sleep } = require('../functions.js');  // Si tu as déjà cette fonction dans functions.js

module.exports = {
  pattern: /^!sleep (\d+)$/,  // On utilise un regex pour détecter la commande !sleep et l'argument (le nombre d'heures, minutes, secondes)
  on: 'text',  // Cette commande est de type texte
  function: async ({ chats, msg, conn, args, isGroupAdmins, isBotGroupAdmins }) => {
    try {
      const duration = parseInt(args[0]) * 1000;  // Convertir l'argument en millisecondes
      if (isNaN(duration) || duration <= 0) {
        return conn.sendMessage(msg.key.remoteJid, { text: 'Please provide a valid duration in seconds.' }, { quoted: msg });
      }
      
      // Réponse avant le "sleep"
      conn.sendMessage(msg.key.remoteJid, { text: `Bot will sleep for ${args[0]} seconds...` }, { quoted: msg });
      
      // Attendre (mettre le bot en pause) pendant le nombre de secondes spécifié
      await sleep(duration); // sleep(duration) va attendre en fonction du temps donné en millisecondes

      // Réponse après "sleep"
      conn.sendMessage(msg.key.remoteJid, { text: 'Bot has woken up!' }, { quoted: msg });
    } catch (error) {
      console.error(error);
      conn.sendMessage(msg.key.remoteJid, { text: 'Something went wrong while processing the sleep command.' }, { quoted: msg });
    }
  }
};
