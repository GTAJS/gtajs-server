export default class PhoneContact {
	constructor(session, phoneContact) {
		this._session = session;
		this._phoneContact = phoneContact;
	}

	async getDialTimeout() {
		return await this._session.command('PhoneContactGetDialTimeout', this._phoneContact.id);
	}

	async setDialTimeout(value) {
		return await this._session.command('PhoneContactSetDialTimeout', this._phoneContact.id, value);
	}
}
