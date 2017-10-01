const ctx = document.getElementById('chart').getContext('2d');
const realtime = new Chart(ctx).Bar({
    labels: [],
    datasets: [{
        fillColor: 'rgba(0,60,100,1)',
        strokeColor: 'black',
        data: []
    }]
}, {
    responsive: true,
    barValueSpacing: 2
});

let isFirst = true;
const ws = new WebSocket('wss://neto-api.herokuapp.com/realtime');
ws.addEventListener('message', event => {
    if (isFirst) {
        JSON.parse(event.data)
            .forEach(data => {
                let keys = Object.keys(data);
                realtime.addData([Number(data[keys[1]])], data[keys[0]])
            });
        isFirst = false;
    } else {
        let data = JSON.parse(event.data);
        let keys = Object.keys(data);
        realtime.removeData();
        realtime.addData([Number(data[keys[1]])], data[keys[0]]);
    }
});