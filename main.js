// GitHub https://github.com/andrewelizev/a-level-js-hw9

// Lesson 09


// jsonPost("http://students.a-level.com.ua:10012", {func: 'addMessage', nick: "Anon", message: 'Я не умею копипастить в консоль, зато умею жать красную кнопку.'})
const url = "http://students.a-level.com.ua:10012";

let data = function makeData() {
    nickname = document.getElementById('chatNick').value;
    message = document.getElementById('chatMessageText').value;

    return data = {
        func: 'addMessage',
        nick: nickname,
        message: message
    };
};

function jsonPost(url, data) {
    return new Promise((resolve, reject) => {
        var x = new XMLHttpRequest();
        x.onerror = () => reject(new Error('jsonPost failed'));
        //x.setRequestHeader('Content-Type', 'application/json');
        x.open("POST", url, true);
        x.send(JSON.stringify(data));

        x.onreadystatechange = () => {
            if (x.readyState === XMLHttpRequest.DONE && x.status === 200){
                resolve(JSON.parse(x.responseText));
            }
            else if (x.status !== 200){
                reject(new Error('status is not 200'));
            }
        };
    });
}

function sendPost() {
    document.getElementById('btnSend').addEventListener('click', jsonPost(url, data));
}



