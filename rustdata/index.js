const rust = require('./lib');
const events = require('events');
const eventEmitter = new events.EventEmitter();

class Change {
    constructor(c) {
        this.cType = c[0];
        this.cNote = c[1];
    } 
    
    handleTypes(t) {
        let o = "";
        if(t == "updated") { o = 'A' + t + 'A'}
        else { o = t }
        return o
    }

    output() {
        return this.handleTypes(this.cType) + ': ' +this.cNote;
    }
}

class ChangeLog {
    constructor(version, date) {
        this.version = version;
        this.date = date;
        this.changes = [];
    }

    addChange(c) {
        this.changes.push(c.output());
    }
}

eventEmitter.on('check', () => {
    rust.checkPatches((isUp, patchNotes) => {
        if(isUp) {
            let log = new ChangeLog(patchNotes.version, patchNotes.date)
            for(let change of patchNotes.changes) {
               log.addChange(new Change(change));
            }
            eventEmitter.emit('finishedWithUpdate', log);
        } else {
            eventEmitter.emit('finishedWithoutUpdate')
        }
    })
})

module.exports = eventEmitter;