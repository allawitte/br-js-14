'use strict';
const ws = new WebSocket('wss://neto-api.herokuapp.com/draw');
ws.addEventListener('open', wsOpen);
ws.addEventListener('close', wsClose);
ws.addEventListener('message', wsMsg);
ws.binaryType = "arraybuffer";
init()
console.log('editor', editor);
editor.addEventListener('update', reportChanges);

function reportChanges(e) {
    e.canvas.toBlob((blob) => {
        ws.send(blob);
    });
}

function wsOpen() {
    console.log('connection is open')
}

function wsClose(res) {
    console.log('connection is CLOSED');
    console.log('res', res);
}

function wsMsg(res) {
    console.log('res', res);
}