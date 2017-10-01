'use strict';
const poolDivs = Array.from(document.querySelectorAll('.pooling div'));
setInterval(function() {
    fetch('https://neto-api.herokuapp.com/comet/pooling')
        .then(res => res.json())
        .then(data => {
            if (data && data <= poolDivs.length) {
                poolDivs.forEach(item => item.classList.remove('flip-it'));
            }
            poolDivs[data - 1].classList.add('flip-it');
        });
}, 5000)