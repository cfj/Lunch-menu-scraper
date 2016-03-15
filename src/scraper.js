import request from 'request';
import cheerio from 'cheerio';

const days = ['måndag', 'tisdag', 'onsdag', 'torsdag', 'fredag'];

function scrape(url, selector, callback) {
    let content = '';
    let week = [[], [], [], [], []];

    request(url, (err, response, html) => {
        if(!err) {
            let $ = cheerio.load(html);

            $(selector).each((index, element) => content += ' ' + $(element).text());

            content = content.replace(/\d+\/\d+/g, '');
            content = content.toLowerCase();

            for(let i = 0; i < days.length; i++) {
                content = content.replace(days[i], ' ' + days[i]);
            }

            content = content.split(/\s+/);

            for(let i = 0; i < days.length; i++) {
                week[i] = content.slice(content.indexOf(days[i]), i !== days.length - 1 ? content.indexOf(days[i+1]) : undefined);
            }

            callback(week);
        }
    });
}

module.exports = scrape;