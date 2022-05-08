let time = document.getElementById("timer");
let setTimeForReset = 25;

function starter(){
  let times = time.innerHTML.split(":");
  let minutes = Number(times[0]);
  let seconds = Number(times[1]);
  let cumulative = minutes*60+seconds;
  cumulative--;
  seconds = cumulative%60;
  if(seconds < 10){ seconds='0'+seconds}
  minutes = Math.floor(cumulative/60);
  time.innerHTML = minutes+":"+seconds;
  document.title = `(${time.innerHTML})TomatoTimer `;
  if (cumulative === 0) {
    let audio = new Audio("https://www.fesliyanstudios.com/play-mp3/4386");
    audio.play();
    clearInterval(interval);
    timeSetting(setTimeForReset);
  }

}

function timeSetting(timeMinutes){
  time.innerHTML = timeMinutes+":"+"00";
  setTimeForReset  = timeMinutes;
  document.title = "TomatoTimer";
  clearInterval(interval);
}

function resetTimer(reset){
  clearInterval(interval);
  timeSetting(reset);
  document.title = "TomatoTimer";
}

let interval = setInterval(null,1000);

start.addEventListener("click", ()=>{clearInterval(interval);interval = setInterval(starter, 1000);});

let stop = document.getElementById("stop");
stop.addEventListener("click", ()=>clearInterval(interval));

let reset = document.getElementById("reset");
reset.addEventListener("click", ()=>resetTimer(setTimeForReset));
  
let pomodoroBtn = document.getElementById("pomodoro");
pomodoroBtn.addEventListener("click", ()=>timeSetting(25));

let shortBreakBtn = document.getElementById("short-break");
shortBreakBtn.addEventListener("click", ()=>timeSetting(5));

let longBreak = document.getElementById("long-break");
longBreak.addEventListener("click", ()=>timeSetting(10));
