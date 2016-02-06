import Phone from './phone';
import Gun from './gun';

export default class Player {
	constructor(session, player) {
		this._session = session;
		this._player = player;
	}

	async getPhone() {
		const phone = await this._session.command('PlayerGetPhone', this._player.id);
		return new Phone(this._session, this._player, phone);
	}

	async getCurrentGun() {
		const gun = await this._session.command('PlayerGetCurrentGun', this._player.id);
		return new Gun(this._session, gun);
	}

	async getGuns() {
		const guns = await this._session.command('PlayerGetGuns', this._player.id);
		return guns.map(g => new Gun(this._session, g));
	}

	async getPosition() {
		return await this._session.command('PlayerGetPosition', this._player.id);
	}
}
