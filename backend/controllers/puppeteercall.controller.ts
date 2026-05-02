//TODO:Import the service all which will hold the puppeteer call which we can export and call inside this controller from the services folder.

import { Request, Response } from "express";
// call the services folder to get the puppeteer function
import webscrapesiteOne from "../services/scraper-site1.service.js";
// import secondsitescript from "../services/scraper-site2.service.js";

const puppeteerControllerCall = async (req: Request, res: Response) => {
  // start of with try and catch here
  try {
  } catch (error) {}
};

export default puppeteerControllerCall;
