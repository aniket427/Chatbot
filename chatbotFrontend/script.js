let chatbot = document.getElementById('chatbot');
let messages = document.getElementById('messages');
let userInput = document.getElementById('user-input');
let conversationHistory = [];


// function to add message to chatbot

let addMessage = (message, sender) => {
  let messageDiv = document.createElement('div');
  messageDiv.textContent = message;
  messageDiv.classList.add('message');

  //  messageDiv.setAttribute('aria-live', 'assertive');
  messageDiv.setAttribute('role', 'alert');

  const d = new Date();
  let currTimeDiv = document.createElement('div');
  currTimeDiv.textContent = "◴ "+ d.getHours()+":"+d.getMinutes();
  // console.log(d.getHours()+":"+d.getMinutes());
  

  if (sender == 'user') {
    messageDiv.classList.add('user-msg');
    currTimeDiv.classList.add('user-time');
    messageDiv.setAttribute('aria-label', 'your message is ');
    document.title = "Message sent..."
  } else {
    messageDiv.classList.add('bot-msg');
    currTimeDiv.classList.add('bot-time');
    messageDiv.setAttribute('aria-label', 'Bot says ');
    document.title = "Reply received..."
  }

  messages.appendChild(messageDiv);
  messages.appendChild(currTimeDiv);
  messages.scrollTop = messages.scrollHeight;
}


// function to get response from db

let generateResponse = async (input_message) => {
  let conversation = {
    input: input_message
  };

  conversation = JSON.stringify(conversation);

  let url = "http://localhost:8888/backend/getresponse";

  try {
    let response = await fetch(url, {

      method: "POST",

      body: conversation,

      headers: {
        "Content-Type": "application/json"
      }
    })

    let data = await response.json();
    // console.log(data.response);
    return data.response;

  } catch (error) {
    console.error(error);
  }

}



// function to handle user input
let handleUserInput = (e) => {
  e.preventDefault();

  let input = userInput.value;
  
  addMessage(input, 'user');
  
  input = input.toLowerCase();

  let response;
  generateResponse(input).then((responseData) => {

    response = responseData;
    addMessage(response, 'chatbot');

    let timestamp = new Date().toISOString().slice(0, 19);
    
    conversationHistory.push({ input, response, timestamp });

    // console.log(timestamp);
    // console.log(conversationHistory);

    userInput.value = '';

  });
}


// function to save conversation history to db
let storeConversationHistory = async (conversationHistory) => {

  conversationHistory = JSON.stringify(conversationHistory);

  let url = "http://localhost:8888/backend/saveconversation";

  try {

    let response = await fetch(url, {

      method: "POST",

      body: conversationHistory,

      headers: {
        "Content-Type": "application/json"
      }
    })
    
    let result = await response.json();
    console.log(result);

  } catch (error) {
    console.log(error);
  }

}


let resetBotData = () => {
  storeConversationHistory(conversationHistory);
  conversationHistory = [];
  messages.innerHTML = null;
}

// to save conversation if tab is closed by the user

window.addEventListener('beforeunload', function (event) {
  resetBotData();
});




// add event listener for form submission and reset
chatbot.addEventListener('submit', handleUserInput);
chatbot.addEventListener('reset', resetBotData);



// add new response on keypress ctrl+shift+enter
let keysPressed = new Set();

document.addEventListener("keydown", function (event) {
  keysPressed.add(event.key);

  if (keysPressed.has("Control") && keysPressed.has("Shift") && event.key === "Enter") {

    let userInput = prompt("Enter correct response for input: " + conversationHistory[conversationHistory.length - 1].input);

    conversationHistory[conversationHistory.length - 1].response = userInput;

  }
});

document.addEventListener("keyup", function (event) {
  keysPressed.delete(event.key);
});

