import log from 'cuvva-log';
import EventEmitter from 'events';

/*
	things to do at some point:
	- avoid needing to constantly delete from responseHooks
	- coerce unsuccessful responses into Error
	- handle disconnection, etc.
*/

export default class Client extends EventEmitter {
	_responseHooks = {};

	constructor(socket) {
		super();

		this._socket = socket;

		socket.on('disconnect', () => this.emit('disconnect'));
		socket.on('event', d => this._handleEvent(d));
		socket.on('function', d => this._handleResponse(d));
	}

	get id() {
		return this._socket.client.id;
	}

	_handleEvent(event) {
		log.debug('event_occurred', { data: event });

		this.emit(event.name, event.data);
	}

	_handleResponse(data) {
		log.debug('response_received', { data });

		if (!data.ackId) {
			log.warn('invalid_ack', { data });
			return;
		}

		const hook = this._responseHooks[data.ackId];

		if (!hook) {
			log.warn('unexpected_ack', { data });
			return;
		}

		try {
			hook(data);
		} catch (error) {
			log.warn('hook_failed', [error], { data });
		}
	}

	async command(name, params) {
		const ackId = nextAckId();

		const promise = new Promise((resolve, reject) => {
			let done = false;

			this._responseHooks[ackId] = ({ success, result }) => {
				done = true;
				delete this._responseHooks[ackId];

				if (!success)
					reject(result);
				else
					resolve(result);
			};

			setTimeout(() => {
				if (!done) {
					reject(log.warn('timeout'));
					delete this._responseHooks[ackId];
				}
			}, 1000);
		});

		this._socket.emit('function', { ackId, name, params });

		return await promise;
	}
}

const nextAckId = (() => {
	let index = 0;
	return () => (index++).toString();
})();
