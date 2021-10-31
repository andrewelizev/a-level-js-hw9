// GitHub https://github.com/andrewelizev/a-level-js-hw9

// Lesson 09



const url = "http://students.a-level.com.ua:10012";
let nextMessageId = 0; // chat first start
let btn = document.getElementById('btnSend');
btn.addEventListener('click', () => sendAndCheck());

// Кнопка только для тестирования и проверки чтения сообщений
let btnRead = document.getElementById('btnRead');
btnRead.addEventListener('click', () => getMessages(nextMessageId));

async function sendAndCheck() {

    if (nextMessageId = 0) {
        await getMessages(nextMessageId);
        nextMessageId = await sendMessage();
    } else {
        nextMessageId = await sendMessage();
        await getMessages(nextMessageId);
    }

    checkLoop(nextMessageId);
}

async function checkLoop(id) {
    let timerId = await setInterval(() => getMessages(id), 5000);
}

async function jsonPost(url, data) {
    let request = {
            method: 'POST',
            body: JSON.stringify(data)
    };

    let response = await fetch(url, request);
    let messages = await response.json();

    return messages;
}


// function jsonPost(url, data) {
//     return new Promise((resolve, reject) => {
//         var x = new XMLHttpRequest();
//         x.onerror = () => reject(new Error('jsonPost failed'));
//         x.open("POST", url, true);
//         x.send(JSON.stringify(data));

//         x.onreadystatechange = () => {
//             if (x.readyState === XMLHttpRequest.DONE && x.status === 200){
//                 // console.log(JSON.parse(x.responseText));
//                 resolve(JSON.parse(x.responseText));
//             }
//             else if (x.status !== 200){
//                 reject(new Error('status is not 200'));
//             }
//         };
//     });
// }

function createMessage() {
    let nickName = document.getElementById('chatNick');
    let messageText = document.getElementById('chatMessageText');

    let message = {
        func: 'addMessage',
        nick: nickName.value,
        message: messageText.value,
    };

    return message;
}

async function sendMessage() {
    let messageText = document.getElementById('chatMessageText');
    let result = await jsonPost(url, createMessage());
    messageText.value = '';
    return result.nextMessageId;
}

async function getMessages(id) {
    let data = {
        func: 'getMessages',
        nextMessageId: id
    };
    let result = await jsonPost(url, data);
    renderAllMessages(result);
}

function renderAllMessages(result) {
    let allMessages = document.createElement('div');
    let currentMessage;
    let chatBody = document.getElementById('chatBody');

    for (let i in result.data) {
        currentMessage = renderMessage(result, i);
        allMessages.append(currentMessage);
    }

    // for (let i = 0; i < result.data.length; i++) {
    //     currentMessage = renderMessage(result, i);
    //     allMessages.append(currentMessage);
    // }


    if (!chatBody.firstChild) {
        chatBody.append(allMessages);
    } else {
        chatBody.firstChild.replaceWith(allMessages);
    }

    chatBody.scrollTop = chatBody.scrollHeight;
}

function renderMessage(result, index) {
    let messageBody = document.createElement('div');
    messageBody.classList.add('message');

    let messageDate = document.createElement('span');
    messageDate.classList.add('date');

    let messageNick = document.createElement('span');
    messageNick.classList.add('nick');

    let messageIndex = document.createElement('span');
    messageIndex.classList.add('index');

    let messageText = document.createElement('p');
    messageText.classList.add('message-text');

    let dateTime = new Date(result.data[index].timestamp).toLocaleString();
    messageDate.innerText = dateTime;
    messageNick.innerText = result.data[index].nick;
    messageIndex.innerText = index;
    messageText.innerText = result.data[index].message;

    messageBody.append(messageDate);
    messageBody.append(messageNick);
    messageBody.append(messageIndex);
    messageBody.append(messageText);

    return messageBody;
}