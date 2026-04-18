import express from 'express'; 
const getPuppeter = express.Router();    

import puppeteerController from '../controllers/puppeteercall.controller'; 


getPuppeter.get('/launchtool', puppeteerController); 

export default getPuppeter; 