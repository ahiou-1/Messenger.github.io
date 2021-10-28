const chatForm = document.querySelector('.chat-form');
const userMessage = document.querySelector('#msg');
const chatContainer = document.querySelector('.chat-container');

let messageId = 0;
let chatHistory = [];

chatForm.addEventListener('submit', (event) => {
    getMessage(event);
    updateScroll();
    console.log(chatHistory)
    
})

function displayMessage() {
    chatContainer.textContent = '';
    for(let i = 0; i < chatHistory.length; i++){
        const chatDiv = document.createElement('div');
        chatDiv.innerHTML = returnMessage(chatHistory[i]);
        chatContainer.appendChild(chatDiv);
    
    }
}

function returnMessage(chatObj) {
    return `
        
            <p>${chatObj.createdAt}</p>
            <p>${chatObj.content}</p>
        
    `
}

function prettifyTime() {
    //2021. 10. 28. 오후 2:31:03
    let time = new Date().toLocaleString();
    return `${time.slice(-8, -6)}시 ${time.slice(-5, -3)}분`
}

function getMessage(event) {
    event.preventDefault();
    let message = msg.value;

    if(message.includes('http://') || message.includes('https://')) {
        const linkFrontIndex = message.indexOf('http');
        let linkRearIndex;

        // http 이후 첫 띄어쓰기가 없다면, url의 끝자리는 message의 끝자리다.
        if(message.indexOf(' ', linkFrontIndex) === -1) {
            linkRearIndex = message.lastIndexOf('');
        // http 이후 띄어쓰기가 있다면, 그 위치가 url 의 끝자리다.
        } else {
            linkRearIndex = message.indexOf(' ', linkFrontIndex);
        }
        const hyperlink = message.substring(linkFrontIndex, linkRearIndex);
        const frontText = message.slice(0, linkFrontIndex);
        const rearText = message.slice(linkRearIndex);

        message = `${frontText} <a href=${hyperlink}>${hyperlink}</a> ${rearText}`
    }

    createChatObj(message);
    msg.value = '';
}

function createChatObj(message) {
    const chatObj = {
        type: 'text',
        content: message,
        createdAt: prettifyTime()
    }
    chatHistory.unshift(chatObj);
    displayMessage();
} 



function updateScroll() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}
