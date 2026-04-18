import express, { Request, Response } from 'express'; 
const app = express(); 

app.use(express.json());   

//import the routes here as such 
 

app.get('/', (req: Request, res: Response) => { 
    res.send('Server Successfully Running'); 
});  

export default app; 
