//TODO:Import the service all which will hold the puppeteer call which we can export and call inside this controller from the services folder.

import { Request, Response } from "express";
// call the services folder to get the puppeteer function
import webscrapesiteOne from "../services/scraper-site1.service.js";
// import secondsitescript from "../services/scraper-site2.service.js";

const puppeteerControllerCall = async (req: Request, res: Response) => {
  // set up try and catch case
  try {
    // TODO: change this route to return json object data instead.
    // invoke the function here as such
    const retrieveScrapedData = await webscrapesiteOne();
    // handle some error handling here
    if (!retrieveScrapedData) {
      throw new Error("Error could not get data from the site");
    }
    return res.status(201).send(retrieveScrapedData);
  } catch (error) {
    return res.status(500).send(error);
  }
};

export default puppeteerControllerCall;
