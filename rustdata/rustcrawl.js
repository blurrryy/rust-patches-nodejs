module.exports.crawlData = (callback) => {
    const spawn = require('child_process').spawn
    py = spawn('python3', ['crawler.py']);
      
    let dataString = [];
        
    py.stdout.on('data', (data) => {
        dataString.push(data.toString());
    })
        
    py.stdout.on('end', () => {
        console.log('Patch-Notes up to date.');
        callback(true);
    })
}