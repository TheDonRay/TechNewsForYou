// work on the puppeteer service here to get the actual data and stimulate the script to go on a specific site. 
import puppeteer from 'puppeteer';  
// launching the browswer and opening a blank new page  
const puppeteerFunction = async () => { 
    try {  
        // launching the browswer and opening a blank new page
        const browser = await puppeteer.launch();  
        const page = await browser.newPage(); 

        // navigate to the page URL  
        await page.goto('https://github.com/TheDonRay');  

        // set screen size 
        await page.setViewport({width: 1080, height: 1024}); 

        await browser.close(); 
    } catch (error) { 
        console.error('Error running script for puppeteer'); 
    }
};   
// invoke the function here 
puppeteerFunction(); 

export default puppeteerFunction; 