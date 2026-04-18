//TODO:Import the service all which will hold the puppeteer call which we can export and call inside this controller from the services folder.  

import {Request, Response} from 'express';   
// call the services folder to get the puppeteer function 


const puppeteerControllerCall = async (req: Request, res: Response) => { 
    return res.send('Route is Running successfully'); 
}; 

export default puppeteerControllerCall; 