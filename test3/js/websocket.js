'use strict';
const wss = new WebSocket('wss://neto-api.herokuapp.com/comet/websocket');
const wsDivs = Array.from(document.querySelectorAll('.websocket div'));
wss.addEventListener('message', handleMsg);

function handleMsg(e) {
    //flip-it
    if (e.data && e.data <= wsDivs.length) {
        wsDivs.forEach(item => item.classList.remove('flip-it'));
    }
    wsDivs[e.data - 1].classList.add('flip-it');
}