import {API_KEYS} from './weather.js';

let i=1;
let weathers;
let switchArrow;

getWhere();

var tag = document.createElement('script');

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);


let player1, player2, player3, player4;
function onYouTubeIframeAPIReady() {
  console.log(weathers);
  if(weathers === "Clear"){
  player1 = new YT.Player('players', {
    height: '270', 
    width: '480',
    videoId: '4oUVpoLsZqs',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  player2 = new YT.Player('players2', {
    height: '270',
    width: '480',
    videoId: 'HUjtLIlJ1z8',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  player3 = new YT.Player('players3', {
    height: '270',
    width: '480',
    videoId: 'Ru0GkA7-9Lk',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
  player4 = new YT.Player('players4', {
    height: '270',
    width: '480',
    videoId: 'eVAn7AaoMo0',
    events: {
      'onReady': onPlayerReady,
      'onStateChange': onPlayerStateChange
    }
  });
}
  
}

function onPlayerReady(event) {
  event.target.stopVideo();
  event.target.setPlaybackQuality('default');
}

var done = false;
function onPlayerStateChange(event) {
  if (event.data == YT.PlayerState.PLAYING && !done) {
    setTimeout(stopVideo, 6000);
    done = true;
  }
}

function stopVideo() {
  console.log(`${switchArrow} = switchArrow , ${i} = i`);
  if(switchArrow === "rightArrow"){
    if(i === 2){
      player1.stopVideo();
    }
    else if(i ===3){
      player2.stopVideo();
    }
    else if(i ===4){
      player3.stopVideo();
    }
  }
  else{
    
    if((i+1) === 2){
      player2.stopVideo();
    }
    else if((i+1) ===3){
      player3.stopVideo();
    }
    else if((i+1) ===4){
      player4.stopVideo();
    }
  }
}



async function getLocation(lat, lng){
  try{
  const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEYS}`);
  const weather_Json = await response.json();
  weathers = weather_Json.weather[0].main;
  console.log(weathers);
  onYouTubeIframeAPIReady();
  }
  catch(err){
      console.log('Weather reading Error', err);
  }
}
function handleSuccess(position){
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude
  const coordsobj = [
      latitude = latitude,
      longitude = longitude
  ];
  getLocation(latitude,longitude);
}

function handleEroor(){
  console.error('error');
}

function getWhere(){
  navigator.geolocation.getCurrentPosition(handleSuccess, handleEroor);
}

window.onload = function() {
  // 임의의 객체에 대해 이벤트 장착 가능
  let id = "playerSet" + i;
  let liveBox = document.getElementById(id);
  let nextid = "playerSet" + (i+1);
  let beforeid = "playerSet" + (i-1);

  let nextliveBox = document.getElementById(nextid);
  let beforeliveBox = document.getElementById(beforeid);
  let leftbutton = document.querySelector(".img-buttonl");
  let rightbutton = document.querySelector(".img-buttonr");

  document.getElementById("rightArrow").onclick = function() {
    let id = "playerSet" + i;
    let liveBox = document.getElementById(id);
    let nextid = "playerSet" + (i+1);
    let beforeid = "playerSet" + (i-1);
    
    let nextliveBox = document.getElementById(nextid);
    
    leftbutton.style.display = "flex";
    nextliveBox.style.display = "flex";
    liveBox.style.display = "none";
    switchArrow = "rightArrow";
    setTimeout(stopVideo, 0);
    i++;

    if(i===4){
      rightbutton.style.display = "none";
    }
    else{
      rightbutton.style.display = "flex";
      leftbutton.style.display = "flex";
    }
    console.log(`i = ${i}`);
  }
  document.getElementById("leftArrow").onclick = function(){
    let id = "playerSet" + i;
    let liveBox = document.getElementById(id);
    let beforeid = "playerSet" + (i-1);
    console.log(id);
    let beforeliveBox = document.getElementById(beforeid);

    liveBox.style.display ="none";
    beforeliveBox.style.display="flex";
    switchArrow = "leftArrow";
    setTimeout(stopVideo, 0);
    i--;
    
    if(i===1){
      leftbutton.style.display ="none"; 
      rightbutton.style.display = "flex";
    }
    else{
      leftbutton.style.display = "flex";
      rightbutton.style.display = "flex";
    }
    console.log(`i = ${i}`);
  }
}

