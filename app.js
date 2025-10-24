class Chatbox {
    constructor() {
        this.args = {
            openButton: document.querySelector('.chatbox__button'),
            chatBox: document.querySelector('.chatbox__support'),
            sendButton: document.querySelector('.send__button')
        };
        this.state = false;
        this.messages = [];
    }

    display() {
        const { openButton, chatBox, sendButton } = this.args;

        openButton.addEventListener('click', () => this.toggleState(chatBox));
        sendButton.addEventListener('click', () => this.onSendButton(chatBox));

        const inputNode = chatBox.querySelector('input');
        inputNode.addEventListener("keyup", ({ key }) => {
            if (key === "Enter") this.onSendButton(chatBox);
        });
    }

    toggleState(chatbox) {
        this.state = !this.state;
        chatbox.classList.toggle('chatbox--active', this.state);
    }

    onSendButton(chatbox) {
        const textField = chatbox.querySelector('input');
        const userText = textField.value.trim();
        if (!userText) return;

        this.messages.push({ name: "User", message: userText });
        this.updateChatText(chatbox);
        textField.value = '';

        // Replace this URL with your deployed backend
        fetch('https://your-backend-url.onrender.com/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: userText }),
            mode: 'cors'
        })
        .then(res => res.json())
        .then(data => {
            this.messages.push({ name: "Yashasvi", message: data.answer });
            this.updateChatText(chatbox);
        })
        .catch(error => {
            console.error('Error:', error);
            this.messages.push({ name: "Yashasvi", message: "Sorry, I cannot respond right now." });
            this.updateChatText(chatbox);
        });
    }

    updateChatText(chatbox) {
        const html = this.messages.slice().reverse().map(item => {
            const className = item.name === "Yashasvi" 
                ? "messages__item messages__item--visitor"
                : "messages__item messages__item--operator";
            return `<div class="${className}">${item.message}</div>`;
        }).join('');

        chatbox.querySelector('.chatbox__messages').innerHTML = html;
    }
}

const chatbox = new Chatbox();
chatbox.display();
