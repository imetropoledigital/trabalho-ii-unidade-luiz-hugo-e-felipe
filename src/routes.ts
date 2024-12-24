import express, {Request, Response} from 'express';
import { ApiController } from './apiController';
import { RequestHandler } from 'express-serve-static-core';

const router = express.Router();

router.post('/:collection', (req: Request, res: Response) => {ApiController.insertToCollection(req, res);});
router.get('/:collection', (req: Request, res: Response) => { ApiController.findFromCollection(req, res);});
router.get('/:collection/:id', (req: Request, res: Response) => { ApiController.findByIdFromCollection(req, res); })

export {router};