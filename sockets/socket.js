const { io } = require('../index');
const Band = require('../models/band');
const Bands = require('../models/bands');

const bands = new Bands();

bands.addBand(new Band('Qeen'));
bands.addBand(new Band('The Rasmus'));
bands.addBand(new Band('Fall Out Boy'));
bands.addBand(new Band('Imagine Dragons'));

// Mensajes de Sockerts
io.on('connection', client => {
    console.log('Ciente conectado');

    client.emit('active-bands', bands.getBands());

    client.on('disconnect', () => {
        console.log('Ciente desconectado');
    });

    client.on('mensaje', (payload) => {
        console.log('Mensaje!!!', payload.nombre);
        io.emit('mensaje', { admin: 'Nuevo mensaje' });
    });

    client.on('vote-band', (payload) => {
        bands.voteBand(payload.id);
        io.emit('active-bands', bands.getBands());
    });

    client.on('add-band', (payload) => {
        bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });

    client.on('delete-band', (payload) => {
        bands.deleteBand(payload.id);
        // bands.addBand(new Band(payload.name));
        io.emit('active-bands', bands.getBands());
    });
});