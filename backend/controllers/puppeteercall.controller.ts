//TODO:Import the service all which will hold the puppeteer call which we can export and call inside this controller from the services folder.

import { Request, Response } from "express";
// call the services folder to get the puppeteer function
import OrganizedDataFunction from '../services/organizedData.service.js'; 
// set up api call here as well for instance  

const puppeteerControllerCall = async (req: Request, res: Response) => {
  // start of with try and catch here
  try { 
    
  } catch (error) { 

  }
};

export default puppeteerControllerCall;
