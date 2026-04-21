import express, { Request, Response } from 'express'; 
const app = express(); 

app.use(express.json());   

//import the routes here as such 
import getPuppeteerRoute from './routes/getpuppeteer.route.js';  

//Instantiate routes here as such
app.use('/api/v1/', getPuppeteerRoute); 

app.get('/', (req: Request, res: Response) => { 
    res.send('Server Successfully Running'); 
});  

export default app; 
 

