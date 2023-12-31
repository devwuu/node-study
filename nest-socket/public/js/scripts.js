const socket = io('/chatting'); // 파라미터로 네임스페이스를 넣어준다
// socket io 라이브러리는 Polling 방식으로 1차 시도를 해보고
// websocket을 지원하는 브라우저면 websocket으로 통신한다
// 즉, socket io 라이브러리는 브라우저 환경에 따라 실시간 통신을 할 수 있게 해주는 라이브러리
const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function init() {
  helloUser();
  formElement.addEventListener('submit', handleSubmit);
}

function helloUser() {
  let username = prompt('What is ur name?');
  socket.emit('new_user', username, (data) => {
    // console.log(`username is... ${data}`); // server에서 return 한 메세지를 받을 수 있다
    drawWelcomeBox(data);
  }); // 이벤트 발생 시켜서 server로 데이터 전송

  // socket.on('hello_user', (data) => {
  //   console.log(data);
  // }); // 서버에서 발생시킨 hello_user 이벤트를 catch 할 수 있다
}

function drawWelcomeBox(username) {
  helloStrangerElement.innerText = `Hello, ${username}`;
}

function drawChatBox(message) {
  const wrapper = document.createElement('div');
  const chatBox = `
   <div class='bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix break-all'>
    ${message}
  </div>`;
  wrapper.innerHTML = chatBox;
  chattingBoxElement.append(wrapper);
}

// global socket handler
socket.on('user_connected', (username) => {
  drawChatBox(`${username} connected...`);
});

socket.on('user_disconnected', (username) => {
  drawChatBox(`${username} disconnected...`);
});

socket.on('new_chat', (data) => {
  const { username, chat } = data;
  drawChatBox(`${username} : ${chat}`);
});

// global event handler
const handleSubmit = (event) => {
  event.preventDefault();
  let inputValue = event.target.elements[0].value;
  if (inputValue !== '') {
    socket.emit('submit_chat', inputValue);
    drawChatBox(`me : ${inputValue}`);
    event.target.elements[0].value = '';
  }
};

init();
