console.log("welcome to Spotify");


// intialize the variable
let songIndex=0;
let audioElement=new Audio('songs/1.mp3');
let masterPlay = document.getElementById("masterPlay");
let myProgressBar=document.getElementById("progressBar");
let gif=document.getElementById("gif");
let curr_time=document.getElementById("curr-time");
let tot_time=document.getElementById("tot-time");
let cards=Array.from(document.getElementsByClassName('card')) ;
let song =[
    {songName:"Song One", filePath:"songs/1.mp3" ,coverPath:"covers/1.jpg" },
    {songName:"Song Two", filePath:"songs/2.mp3" ,coverPath:"covers/2.jpg" },
    {songName:"Song Three", filePath:"songs/3.mp3" ,coverPath:"covers/3.jpg" },
    {songName:"Song Four", filePath:"songs/4.mp3" ,coverPath:"covers/4.jpg" },
    {songName:"Song Five", filePath:"songs/5.mp3" ,coverPath:"covers/5.jpg" },
    {songName:"Song Six", filePath:"songs/6.mp3" ,coverPath:"covers/6.jpg" },
    {songName:"Song Seven", filePath:"songs/7.mp3" ,coverPath:"covers/7.jpg" },
    {songName:"Song Eight", filePath:"songs/8.mp3" ,coverPath:"covers/8.jpg" },
    {songName:"Song Nine", filePath:"songs/9.mp3" ,coverPath:"covers/9.jpg" },
    {songName:"Song Ten", filePath:"songs/10.mp3" ,coverPath:"covers/10.jpg" },
]

cards.forEach((element,i) => {
    // console.log(element,i);
   element.querySelectorAll(".card img")[0].src=song[i].coverPath;
   element.getElementsByClassName("card-info")[0].innerText=song[i].songName;

});


// listen to Event

//logic for play or pause song and change their icons with gif
masterPlay.addEventListener('click',()=>{
    
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.removeAttribute('src');
        masterPlay.src="./assets/player_icon6.png"
        document.getElementById('gif').style.opactiy=1;
    }
    else{
        audioElement.pause();
        makeAllPlays();
        masterPlay.removeAttribute('src');
        masterPlay.src="./assets/player_icon3.png"
        document.getElementById('gif').removeAttribute='opacity'
    }
})

//changes in progress bar
audioElement.addEventListener('timeupdate',()=>{
    
    // update seekbar;
    progress=parseInt((audioElement.currentTime/audioElement.duration)*100);
  
    curr_time.textContent=formatTime(audioElement.currentTime);
    tot_time.textContent=formatTime(audioElement.duration);
    myProgressBar.value=progress;
})

myProgressBar.addEventListener('change',()=>{
    audioElement.currentTime=myProgressBar.value*audioElement.duration/100;
})

function formatTime(time) {
    var minutes = Math.floor(time / 60);
    var seconds = Math.floor(time % 60);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }


  const makeAllPlays = ()=>{
    Array.from(document.querySelectorAll('.player-control-iocns-i')).forEach((element)=>{
        element.removeAttribute('src');
        element.src="./assets/player_icon3.png";
    })
}

Array.from(document.querySelectorAll('.player-control-iocns-i')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        element.removeAttribute('src');
        element.src="./assets/player_icon6.png";
        audioElement.src=`songs/${songIndex+1}.mp3`;
        document.querySelector('.album-img').src = song[songIndex].coverPath;
        document.querySelector('.para p').innerText = song[songIndex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.removeAttribute('src');
        masterPlay.src="./assets/player_icon6.png"
        document.getElementById('gif').style.opactiy=1;
    })
})



document.querySelector('.player-control-iocns-next').addEventListener('click', () => {
    // console.log("Clicked on next");
    if (songIndex >= 9) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
   
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.removeAttribute('src');
    masterPlay.src="./assets/player_icon6.png"
    document.getElementById('gif').style.opactiy=1;
});


document.querySelector('.player-control-iocns-pre').addEventListener('click', ()=>{
    // console.log("clicke on prevs");
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/${songIndex+1}.mp3`;
    document.querySelector('.para p').innerText = song[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.removeAttribute('src');
    masterPlay.src="./assets/player_icon6.png"
    document.getElementById('gif').style.opactiy=1;
})


