import log from 'cuvva-log';
import Router from 'express-promise-router';

const router = Router();
export default router;

// prefix /
router.get('/', async (req, res) => {
	const server = req.app.get('server');

	const clients = server.clients.map(c => ({ id: c.id }));

	res.json(clients);
});

router.get('/:client_id', async (req, res) => {
	const server = req.app.get('server');
	const clientId = req.params.client_id;

	const client = clientId === 'first' ? server.clients[0] : server.clients.find(c => c.id === clientId);

	if (!client)
		throw log.info('not_found');

	res.json({ id: client.id });
});

router.post('/:client_id/:command', async (req, res) => {
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
