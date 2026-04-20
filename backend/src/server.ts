import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { EventController } from './controllers/EventController';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const eventController = new EventController();

// Routes
app.post('/api/events', eventController.createEvent);
app.post('/api/register', eventController.registerStudent);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Smart Campus Event API' });
});

const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
