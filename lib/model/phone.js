import PhoneContact from './phone-contact';

export default class Phone {
	constructor(session, player, phone) {
		this._session = session;
		this._player = player;
		this._phone = phone;
	}

	async getContacts() {
		const contacts = await this._session.command('PhoneGetContacts', this._phone.id);
		return contacts.map(c => new PhoneContact(this._session, c));
	}
}
