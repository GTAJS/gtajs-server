export default class Gun {
	constructor(session, gun) {
		this._session = session;
		this._gun = gun;
	}

	async getType() {
		return await this._session.command('GunGetType', this._gun.id);
	}
}
