import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import userRoutes from './handlers/userHandlers';
import cors from 'cors';

// Create a new express server
const app: express.Application = express();
const address: string = '0.0.0.0:3000'; 

// CORS configuration 
const corsOptions = {
  origin: '*', // Name of the domain - "for all requests" (can be changed in the future)
  optionsSuccessStatus: 200, 
};

app.use(cors(corsOptions)); 
app.use(bodyParser.json()); 

// Define a route handler for the default home page
app.get('/', (req: Request, res: Response) => {
  res.send('This is API');
});

// Start the Express server
app.listen(3000, () => {
  console.log(`starting app on: ${address}`);
});

// Define routes for the app
userRoutes(app);

export default app;
