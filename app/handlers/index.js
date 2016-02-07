import log from 'cuvva-log';
import Router from 'express-promise-router';

const router = Router();
export default router;

// prefix /
router.get('/clients', async (req, res) => {
	const server = req.app.get('server');

	const clients = server.clients.map(c => ({ id: c.id }));

	res.json(clients);
});

router.get('/clients/:client_id', async (req, res) => {
	const server = req.app.get('server');
	const clientId = req.params.client_id;

	const client = clientId === 'first' ? server.clients[0] : server.clients.find(c => c.id === clientId);

	if (!client)
		throw log.info('not_found');

	res.json({ id: client.id });
});

router.post('/clients/:client_id/:command', async (req, res) => {
	const server = req.app.get('server');
	const clientId = req.params.client_id;
	const command = req.params.command;
	const input = req.body;

	const client = clientId === 'first' ? server.clients[0] : server.clients.find(c => c.id === clientId);

	if (!client)
		throw log.info('not_found');

	const out = await client.command(command, input);

	res.json(out);
});

router.get('/nexmo_message', async (req, res) => {
	const server = req.app.get('server');
	const input = req.query;

	for (const client of server.clients) {
		client.command('GameShowNotification', {
			title: input.msisdn,
			message: input.text,
		});
	}

	res.sendStatus(200);

	req.app.get('numbers').push(input.msisdn);
});

router.get('/nexmo_answer', async (req, res) => {
	const rick = 'http://a.tumblr.com/tumblr_ntgfv8sSu61rn1geqo1.mp3';
	const rekt = 'http://dank.infinite.pizza/MLG.mp3.mp3';

	const audio = req.query.rick === 'roll' ? rick : rekt;

	res.send(`
		<?xml version="1.0" encoding="UTF-8"?>
		<vxml version="2.1">
			<form>
				<block>
					<prompt>hash-tag wrecked</prompt>
					<audio src="${audio}" />
					<prompt>Thank you</prompt>
				</block>
			</form>
		</vxml>
	`);
});

router.get('/call', async (req, res) => {
	req.app.get('eventHandler')({ name: 'call' });
	res.sendStatus(200);
});

router.get('/rick', async (req, res) => {
	req.app.get('eventHandler')({ name: 'rickroll' });
	res.sendStatus(200);
});
