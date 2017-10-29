const crawl = require('./rustcrawl');
const data = require('./rustdata');

module.exports.checkPatches = (callback) => {
    crawl.crawlData((ds) => {
        if(ds) {
            data.checkUpdate((isUp, patchNotes) => {
                callback(isUp, patchNotes);
            })
        }
    })
}

module.exports.getLatest = (callback) => {
    data.checkUpdate((isUp, patchNotes) => {
        callback(isUp, patchNotes);
    })
}

module.exports.getAll = (callback) => {
    data.getAll(d => callback(d));
}
