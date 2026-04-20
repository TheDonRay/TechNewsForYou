// work on the puppeteer service here to get the actual data and stimulate the script to go on a specific site. 
import puppeteer from 'puppeteer'; 

// launching the browswer and opening a blank new page  
const puppeteerFunction = async () => { 
    try {  
        // launching the browswer and opening a blank new page
        const browswer = await puppeteer.launch();  
        const page = await browswer.newPage(); 

        // navigate to the page URL 
        await page.goto('')
    } catch (error) { 

    }
}