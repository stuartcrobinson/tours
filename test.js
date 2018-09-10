const fs = require('fs')
const request = require('request')
const cheerio = require('cheerio')
const fetch = require('node-fetch')
const Entities = require('html-entities').XmlEntities
const entities = new Entities()

var venues = ["the-orange-peel", "the-national", "neighborhood-theatre"]
var years = ["2015", "2016", "2017", "2018"]
// const fetch = require("node-fetch");

//https://blog.adriaan.io/make-async-await-work-in-promises.html
// url = `https://www.jambase.com/venue/${venue}/past-shows?y=${year}`
// url = "https://www.jambase.com/venue/the-orange-peel/past-shows?y=2017";

// url2 = 'http://www.imdb.com/title/tt1229340/';


//TODO - get all venues shows lists simultaneously, then start getting tours per show

function getVenueShows(url) {
    return new Promise(async (resolve, reject) => {

        try {
            const response = await fetch(url);
            const html = await response.text();

            var $ = cheerio.load(html);

            $('script[type="application/ld+json"]').filter(function () {
                var data = $(this);

                var myjson = JSON.parse(data.html())

                console.log("---------------------------------------")
                console.log(entities.decode(myjson.name))
                console.log(myjson.startDate)

                if (myjson.performer) {

                    myjson.performer.forEach(function (obj) {
                        console.log(entities.decode(obj.name))
                        console.log(obj.url);
                    });
                }
            })
            return resolve("lalala");

        } catch (error) {
            console.log(error);
            return reject(error);

        }
    });
}

var self = this;

const main = async () => {
    console.log(venues)

    var v, y
    for (v in venues){
        for (y in years){

            url = `https://www.jambase.com/venue/${venues[v]}/past-shows?y=${years[y]}`
                        console.log("-----------------------------------------------------------------------------------------------------------")

            console.log(url)
            await getVenueShows(url);
        }
    }
}

main();