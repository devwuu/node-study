const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function init() {
  helloUser();
}

function helloUser() {
  let username = prompt('What is ur name?');
  socket.emit('new_user', username, (data) => {
    console.log(`server return is... ${data}`); // server에서 return 한 메세지를 받을 수 있다
  }); // 이벤트 발생 시켜서 server로 데이터 전송
  socket.on('hello_user', (data) => {
    console.log(data);
  }); // 서버에서 발생시킨 hello_user 이벤트를 catch 할 수 있다
}

init();
