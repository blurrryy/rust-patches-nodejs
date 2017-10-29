const mongoClient = require("mongodb").MongoClient;
const json = require('json-update');
const conf = require('../rustconf.json');
const mongoUrl = "mongodb://localhost:27017/rust";

const updateConf = function (latest) {
    return new Promise(resolve => {
        json.update('rustconf.json',{'latestVersion':latest})
            .then(dat => {
                resolve(dat);
            })
    })
}

const getData = (callback) => {
    mongoClient.connect(mongoUrl, (err, db) => {
        if(err) callback(err);
        db.collection("patchnotes").find().toArray((err, res) => {
            if(err) callback(err);
            callback(res); 
        })
    })    
}

const getLatestVersion = (callback) => {
    getData(res => callback(res[0].version))
}

const newVersion = (callback) => {
    getLatestVersion((latest) => {
        if(latest == conf.latestVersion) {
            callback(false)
        } else {
            callback(true)
        }
    })
}

module.exports.checkUpdate = (callback) => {
    newVersion(n => {
        if(n) {
            getData(p => {
                const newP = updateConf(p[0].version);
                callback(true, p[0])
            })
        } else {
            callback(false, {})
        }
    })
}

module.exports.getAll = (callback) => {
    getData(d => callback(d))
}