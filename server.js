const cheerio = require('cheerio');
const preq = require('preq');
const trim = require('trim-whitespace');

const address1 = encodeURIComponent('25 Rockledge Avenue');
const address2 = encodeURIComponent('Unit 416');
const city = encodeURIComponent('White Plains');
const state = encodeURIComponent('NY');
const zip = encodeURIComponent('10601');
const url = `https://tools.usps.com/go/ZipLookupResultsAction!input.action?address1=${address1}&address2=${address2}&city=${city}&state=${state}&zip=${zip}`;
 
preq(url).then(function(response){
    const $ = cheerio.load(response.body, {
	    xml: {
	      normalizeWhitespace: true,
	      decodeEntities: true,
	    }
	});

    const address = trim($('.address1.range').text());
    const city = trim($('.city.range').text());
    const state = $('.state.range').text();
    const zip = $('.zip').text();
    const zip4 = $('.zip4').text();
    const full_zip = zip + '-' + zip4;
    const full_address = address + ', ' + city + ', ' + state + ' ' + full_zip;

    console.log(url, full_zip);
});