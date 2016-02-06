import Router from 'express-promise-router';

const router = Router();
export default router;

// prefix /1
router.get('/', (req, res) => res.send('it works!'));
