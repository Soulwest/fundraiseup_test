import * as express from "express";
import {Router, Request, Response} from "express";
import Event, {IEvent, validEvent} from "../model/event.model";

const router: Router = express.Router();
router.use(express.json());
router.use(express.text());

router.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // Here we may add list allowed domains
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

router.get('/tracker', (req: Request, res: Response) => {
  res.sendFile('tracker.js', {root: __dirname + '/../public'});
});
router.post('/track', (req: Request, res: Response) => {
  let tracks: Array<IEvent> = (typeof req.body === 'string')
      ? JSON.parse(req.body)
      : req.body || [];

  for (const track of tracks) {
    if (!validEvent(track))
      return res.status(422).send();
  }

  Event.insertMany(tracks, () => console.log("Data inserted"));

  res.status(200).json('OK');
});

export default router;
