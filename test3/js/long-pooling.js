'use strict';
const longPoolDivs = Array.from(document.querySelectorAll('.long-pooling div'));
const url = 'https://neto-api.herokuapp.com/comet/long-pooling';
fetch(url)
    .then(res => res.json())
    .then(handleServerReply);

function handleServerReply(data) {
    if (data && data <= longPoolDivs.length) {
        longPoolDivs.forEach(item => item.classList.remove('flip-it'));
    }
    longPoolDivs[data - 1].classList.add('flip-it');
    fetch(url)
        .then(res => res.json())
        .then(handleServerReply);
}