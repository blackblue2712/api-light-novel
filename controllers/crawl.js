const puppeteer = require('puppeteer');

module.exports.crawlChapter = async (req, res) => {
    console.log(req.body)
   const getCrawlLinks = async (url) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto(url);
    
        const crawlLinks = await page.evaluate(() => {
            const chapterLinks = Array.from(document.querySelectorAll('div.chapter-name a'));
            return chapterLinks.map( link => {
                return link.href
            })
        })
    
        const crawlTitles = await page.evaluate(() => {
            const chapterLinks = Array.from(document.querySelectorAll('div.chapter-name'));
            return chapterLinks.map( tt => {
                return tt.innerText.trim().replace(/[\r\n]/g, '</br>')
            })
        })
        
        await browser.close();
        return {
            links: crawlLinks.slice(req.body.sliceNumber.crawlNumbersFrom, req.body.sliceNumber.crawlNumbersTo),
            titles: crawlTitles.slice(req.body.sliceNumber.crawlNumbersFrom, req.body.sliceNumber.crawlNumbersTo)
        }
    }
    
    

    const links = await getCrawlLinks(req.body.url);

    return res.json(links)
    
    
}

module.exports.getContentFromCrawlLink = async (req, res) => {
    const getContentFromCrawlLink = async (url) => {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.setDefaultNavigationTimeout(0);
        await page.goto(url);
    
    
        const crawlData = await page.evaluate(() => {
            const chapterContent = Array.from(document.querySelectorAll('div#chapter-content'));
            return chapterContent.map( element => {
                return {
                    content: element.outerHTML.replace(/[\r\n]/g, '</br>')
                }
            })
        });
        await browser.close();
        return crawlData;
    }

    const fetchContent = async () => {
        return await Promise.all(
            req.body.links.map( async lk => {
                return await getContentFromCrawlLink(lk)
            })
        )
    } 

    const chapterContents = await fetchContent(req.body.links);
    return res.json(chapterContents)
}