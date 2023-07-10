const CronJob = require('cron').CronJob;
const { MongoClient } = require('mongodb');

// Configura el CronJob para que se ejecute cada segundo
const job = new CronJob('* * * * * *', function() {
  // URL de conexión a la base de datos MongoDB
  const url = 'mongodb://localhost:27017';

  // Nombre de la base de datos
  const dbName = 'Usuarios';

  // Conexión a la base de datos
  MongoClient.connect(url, function(err, client) {
    if (err) {
      console.error('Error al conectar a la base de datos:', err);
      return;
    }

    console.log('Conexión establecida correctamente.');

    // Accede a la base de datos
    const db = client.db(dbName);

    // Obtén los usuarios existentes en la base de datos
    db.collection('usuarios').find().toArray(function(err, usuarios) {
      if (err) {
        console.error('Error al obtener los usuarios:', err);
        return;
      }

      const usuariosJSON = JSON.stringify(usuarios);
      console.log('Usuarios en formato JSON:', usuariosJSON);

      // Cierra la conexión a la base de datos
      client.close();
    });
  });
});

// Inicia el CronJob
job.start();

console.log('CronJob creado correctamente. Ejecutándose cada segundo.');

