// second site to scrape data from is going to be the techcrunch.com 

import puppeteer from 'puppeteer'; 

const secondsitescrape = async () : Promise<any> =>  {
    // initialize try and catch case here as such 
    try { 
        const browser = await puppeteer.launch(); 
        const page = await browser.newPage(); 

        await page.goto('https://techcrunch.com/');  

        // scroll down  
        const scrolltoarticle = await page.$('loop-card__title');  
        if  (scrolltoarticle) { 
            await scrolltoarticle.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center'})); 
            console.log('Successfully scrolled into view'); 
        } else { 
            console.log('element not found'); 
        }

        //click on the specific content 
        await Promise.all([ 
            page.waitForNavigation(), 
            page.click('')
        ])
    } catch (error) { 

    }
}
