const rust = require('./rustdata');

rust.emit('check');

rust.on('finishedWithUpdate', (d) => {
    console.log(d);
})

rust.on('finishedWithoutUpdate', () => {
    console.log('No new Rust Update!')
})