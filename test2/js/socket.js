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
    const image = context.getImageData(0, 0, e.canvas.width, e.canvas.height);
    //const image = context.getImageData(0, 0, 109, 150);
    console.log(image.data.length)
    const binary = Uint8Array.from(image.data);
    console.log('binary.length', binary.length)
    const step = binary.length / 32;
    const buff = [];
    for (let i = 0; i < 32; i++) {
        buff.push(binary.slice(i * step, (i + 1) * step));
    }
    Promise.all(buff.map(item => ws.send(item)))
        .then(results => {
            console.log('promise res', results);
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