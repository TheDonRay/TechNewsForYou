// First tech news site is going to be wired.com  
import puppeteer from 'puppeteer'; 

// create a function to go ahead and visit the site here as such 
const webscrapesiteOne = async () : Promise<any> => { 
    // implement try and catch here as such 
    try { 
        const browser = await puppeteer.launch(); 
        const page = await browser.newPage(); 

        await page.goto('https://www.wired.com/');  
        
        const title = await page.title(); 

        await page.click('a[class*="HeadlineLink"]');  

        const articleTitle = await page.title(); 

        console.log('article was clicked, title of it is:', articleTitle); 

        await browser.close(); 
       
        return { title, articleTitle }; 
    } catch(error) {
        console.error('Error visiting site', error);
    }
};  

export default webscrapesiteOne; 