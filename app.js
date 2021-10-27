const chatForm = document.querySelector('.chat-form');
const userMessage = document.querySelector('#msg');
const chatContainer = document.querySelector('.chat-container');

let messageId = 0;

chatForm.addEventListener('submit', (event) => {
    postText(event);
    updateScroll();
})

function postText(event) {
    event.preventDefault();
    const message = msg.value;
    if(message.includes('http://') || message.includes('https://')) {
        const linkFrontIndex = message.indexOf('http');
        let linkRearIndex;
        if(message.indexOf(' ', linkFrontIndex) === -1) {
            linkRearIndex = message.lastIndexOf('');
        } else {
            linkRearIndex = message.indexOf(' ', linkFrontIndex);
        }
        const hyperlink = message.substring(linkFrontIndex, linkRearIndex);
        const frontText = message.slice(0, linkFrontIndex);
        const rearText = message.slice(linkRearIndex);

        let messageBox = document.createElement('p');
        messageBox.setAttribute('id', `${messageId}`)

        let messageLink = document.createElement('a');
        messageLink.setAttribute('href', `${hyperlink}`)
        messageLink.innerText = `${hyperlink}`


        // messageBox.textContent = `${message.slice(0, linkFrontIndex)+message.slice(linkRearIndex)}`;
        messageBox.textContent = `${frontText}`;


        messageId++;
        chatContainer.appendChild(messageBox);
        messageBox.appendChild(messageLink);
        messageBox.textContent += `${rearText}`
        userMessage.value = '';
        return;
    }
    let messageBox = document.createElement('p');
    messageBox.setAttribute('id', `${messageId}`)
    messageBox.textContent = `${message}`;
    messageId++;
    chatContainer.appendChild(messageBox);
    userMessage.value = '';
}

function updateScroll() {
    chatContainer.scrollTop = chatContainer.scrollHeight;
}