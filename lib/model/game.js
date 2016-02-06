import * as enums from './enums';
import Player from './player';

export default class Game {
	static WeatherTypes = enums.WeatherTypes;

	constructor(session) {
		this._session = session;
	}

	async getCurrentPlayer() {
		const player = await this._session.command('GameGetCurrentPlayer');
		return new Player(this._session, player);
	}

	async showNotification(message, options = {}) {
		const params = {
			duration: 5,
			...options,
			message,
		};

		await this._session.command('GameShowNotification', params);
	}

	async setHudVisible(visible) {
		await this._session.command('GameSetHudVisible', visible);
	}

	async setWeather(type) {
		await this._session.command('GameSetWeather', type);
	}

	async getGravity() {
		return await this._session.command('GameGetGravity');
	}

	async setGravity(value) {
		await this._session.command('GameSetGravity', value);
	}

	async spawnVehicle(type, position, options = {}) {
		const {} = options;

		await this._session.command('GameSpawnVehicle', type, position);
	}

	async spawnProp(type, position, options = {}) {
		const {} = options;

		await this._session.command('GameSpawnProp', type, position);
	}

	async spawnPickup(type, position, options = {}) {
		const {} = options;

		await this._session.command('GameSpawnPickup', type, position);
	}

	async spawnExplosion(position, options = {}) {
		const {} = options;

		await this._session.command('GameSpawnExplosion', position);
	}
}
