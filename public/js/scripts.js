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
