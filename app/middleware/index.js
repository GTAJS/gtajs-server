import {json} from 'body-parser';
import _cors from 'cors';

export const cors = _cors();
export {default as types} from './types';
export const body = json();
export {default as notFound} from './not-found';
export {default as error} from './error';
