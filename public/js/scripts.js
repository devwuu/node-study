const socket = io('/');
const getElementById = (id) => document.getElementById(id) || null;

const helloStrangerElement = getElementById('hello_stranger');
const chattingBoxElement = getElementById('chatting_box');
const formElement = getElementById('chat_form');

function init() {
  let username = helloUser();
  console.log(`username is... ${username}`);
}

function helloUser() {
  return prompt('What is ur name?');
}

init();
