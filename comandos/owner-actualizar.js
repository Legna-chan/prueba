const { exec } = require('child_process');
const { ownerID } = require('../config.js');

module.exports = {
name: 'update',
description: 'Actualiza el bot a su última versión desde GitHub',
execute(message, args) {
if (message.author.id !== ownerID) {
return message.reply('❌ Solo el creador puede usar este comando.');
}

message.reply('🌸 Actualizando la bot...');  

const update = exec('git reset --hard && git clean -f && git pull');  

let output = '';  

update.stdout.on('data', data => {  
  output += data;  
  process.stdout.write(data); // Muestra todo en consola  
});  

update.stderr.on('data', data => process.stderr.write(data));  

update.on('close', code => {  
  // Detecta si la bot ya estaba actualizada  
  if (output.includes('Already up to date.') || output.includes('Already up-to-date.')) {  
    message.reply('🌸 La bot ya está actualizada!');  
  } else {  
    message.reply('🌺 Actualización realizada con éxito. Revisa la consola para detalles.');  
  }  
});

},
};

