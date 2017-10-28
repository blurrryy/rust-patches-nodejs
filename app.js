const rust = require('./rustdata');

rust.checkPatches((isNew, patchNotes) => {
    if(isNew) {
        console.log('Neuer Rust-Patch');
        console.log(patchNotes);
    } else {
        console.log('Kein neuer Rust-Patch');
    }
})

