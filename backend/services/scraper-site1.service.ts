// First tech news site is going to be wired.com  
import puppeteer from 'puppeteer'; 

// create a function to go ahead and visit the site here as such 
const webscrapesiteOne = async () : Promise<any> => { 
    // implement try and catch here as such 
    try { 
        const browser = await puppeteer.launch(); 
        const page = await browser.newPage(); 

        await page.goto('https://www.wired.com/');  
        
        const title = await page.title()
        console.log('Successfully reached first site, Wired.com, Title is:', title); 

        await browser.close(); 
        console.log('WebScraping successfully finished'); 
    } catch(error) { 
        console.error('Error visiting site', error); 
    }
};  

export default webscrapesiteOne; 