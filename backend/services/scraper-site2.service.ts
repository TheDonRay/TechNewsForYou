// second site to scrape data from is going to be the techcrunch.com 

import puppeteer from 'puppeteer'; 

const secondsitescrape = async () : Promise<any> =>  {
    // initialize try and catch case here as such 
    try { 
        const browser = await puppeteer.launch(); 
        const page = await browser.newPage(); 

        await page.goto('https://techcrunch.com/');  

        // scroll down  
        const scrolltoarticle = await page.$('.loop-card__title');  
        if  (scrolltoarticle) { 
            await scrolltoarticle.evaluate(el => el.scrollIntoView({ behavior: 'smooth', block: 'center'})); 
            console.log('Successfully scrolled into view'); 
        } else { 
            console.log('element not found'); 
        } 

        //get title real quick 
        const titleofPage = await page.title(); 

        //click on the specific content 
        await Promise.all([ 
            page.waitForNavigation(), 
            page.click('a.loop-card__title-link'),
        ]);  
        console.log('successfully clicked link'); 

        //get article title 
        const articleTitle = await page.title(); 
        // now retrieve the text here as such 
        const sitetext = await page.$$eval(
            '.entry-content p.wp-block-paragraph',
            elements => elements.map(el => el.innerText).join('\n')
        );
        console.log(sitetext); 

        await browser.close(); 

        // return object data here 
        return {titleofPage, articleTitle, sitetext}; 

    } catch (error) { 
        console.error('There was error visiting site', error); 
    }
}
