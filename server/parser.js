

var FeedParser = require('feedparser')
, parser = new FeedParser()
      // The following modules are used in the examples below
      , fs = require('fs')
      , request = require('request');

//parser.parseUrl('http://feeds.feedburner.com/surfline-rss-surf-report-south-san-diego');
var count = 0;
function parseSurfline (error, meta, articles){
      if (error) console.error(error);
      else {
        console.log('Feed info');
        console.log('%s - %s - %s', meta.title, meta.link, meta.xmlUrl);
        console.log('Articles');
        articles.forEach(function (article){
        	// console.log(article); 
          //console.log('%s - %s (%s)', article.date, article.title, article.link);
        	console.log('Article Title = %s', article.title); 
        });
      }
    }

// parser.parseFile('http://feeds.feedburner.com/surfline-rss-surf-report-south-san-diego', parseSurfline);

/* Pacific Northwest */
parser.parseUrl('http://feeds.feedburner.com/surfline-rss-surf-report-vancouver-island', parseSurfline);
parser.parseUrl('http://feeds.feedburner.com/surfline-rss-surf-report-alaska', parseSurfline);
// parser.parseFile('http://feeds.feedburner.com/surfline-rss-surf-report-washington', parseSurfline);
// parser.parseFile('http://feeds.feedburner.com/surfline-rss-surf-report-oregon', parseSurfline);

/* Northern California */

// parser.parseFile('http://feeds.feedburner.com/surfline-rss-surf-report-humboldt', parseSurfline);
// parser.parseFile('http://feeds.feedburner.com/surfline-rss-surf-report-mendocino', parseSurfline);
// parser.parseFile('http://feeds.feedburner.com/surfline-rss-surf-report-sonoma-county', parseSurfline);
// parser.parseFile('http://feeds.feedburner.com/surfline-rss-surf-report-marin-county', parseSurfline);
//First and foremost:

//Functions so far



//function loadURLs
//function callbackLoadURLs
//function convertToXML 
// this.hi = function(x){ console.log("hi " + x); }