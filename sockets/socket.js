const { io } = require('../index');
// Mensajes de Sockerts
io.on('connection', client => {
    console.log('Ciente conectado');
    client.on('disconnect', () => {
        console.log('Ciente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload.nombre);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });
});