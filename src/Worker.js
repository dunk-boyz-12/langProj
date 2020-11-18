
onmessage = function(e) {
    let list = [];
    let number = 0;
        for(let i = 0; i < 3000000; i++) {
            number = i;
            list.push(number);
        };
        postMessage(list);
}
