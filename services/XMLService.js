var eyes = require('eyes')
var https = require('https')
var fs = require('fs')
var xml2js = require('xml2js')
var parser = new xml2js.Parser()

class XMLService {
    parse(url) {
        parser.addListener('end', function(result) {
            eyes.inspect(result)
            console.log('Done.', result)
        })

        https.get(url, result => {
            result.on('data', data => {
                parser.parseString(data)
            })
            }).on('error', e => {
                console.log('Got error: ' + e.message)
            }
        );
    }
}

module.exports = new XMLService()