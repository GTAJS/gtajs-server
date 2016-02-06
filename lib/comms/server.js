import EventEmitter from 'events';
import SocketIO from 'socket.io';
import Client from './client';

export default class Server extends EventEmitter {
	_clients = [];

	constructor(httpServer) {
		super();

		this._server = SocketIO(httpServer);

		this._server.on('connection', s => this._handleConnection(s));
	}

	get clients() {
		return this._clients;
	}

	_handleConnection(socket) {
		const client = new Client(socket);

		this._clients.push(client);
		this.emit('connection', client);

		client.on('disconnect', () => {
			this._clients.splice(this._clients.indexOf(client), 1);
		});
	}
}
