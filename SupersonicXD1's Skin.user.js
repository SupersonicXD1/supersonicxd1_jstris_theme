// ==UserScript==
// @name         SupersonicXD1's Theme
// @namespace    http://tampermonkey.net/
// @version      1.0
// @description  Tetris 99 theme + Tetris Friends theme for Jstris
// @author       SupersonicXD1
// @match        https://*.jstris.jezevec10.com/*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.addEventListener('load', function(){

        //Jstris Block Skin Change
        loadSkin("https://i.imgur.com/BFitpCQ.png",32);
        //uncomment below later, ghost skin not working?
        //loadGhostSkin("https://github.com/SupersonicXD1/supersonicxd1_jstris_theme/raw/master/ghost_skin.png",36);

        //Jstris SFX
        CustomSFXset.prototype = new BaseSFXset;
        loadSFX(new CustomSFXset);

    });
})();

function CustomSFXset(){
    this.volume=1;
    this.lock={url:"https://ecdldaiiere.github.io/Eddiez-Soundz/t99lock.wav",abs:1};
    this.ready={url:"https://ecdldaiiere.github.io/Eddiez-Soundz/t99ready.wav",abs:1,set:1};
    this.go={url:"https://ecdldaiiere.github.io/Eddiez-Soundz/t99go.wav",abs:1,set:0};
    this.died={url:"https://ecdldaiiere.github.io/Eddiez-Soundz/t99died.wav",abs:1,set:1};
    this.hold={url:"https://ecdldaiiere.github.io/Eddiez-Soundz/t99hold.wav",abs:1,set:0};
    this.move={url:"https://ecdldaiiere.github.io/Eddiez-Soundz/t99move.wav",abs:1,set:0};
    this.linefall={url:"blank.wav",abs:1,set:0};
    };

/**************************
  Special Events Script
**************************/
(function() {
    window.addEventListener('load', function(){

Game['eventSounds']  = [
"https://raw.githubusercontent.com/SupersonicXD1/supersonicxd1_jstris_theme/master/t_spin_single.mp3",
"https://raw.githubusercontent.com/SupersonicXD1/supersonicxd1_jstris_theme/master/t_spin_mini.mp3",
"https://raw.githubusercontent.com/SupersonicXD1/supersonicxd1_jstris_theme/master/clear_1.mp3",
"https://raw.githubusercontent.com/SupersonicXD1/supersonicxd1_jstris_theme/master/t_spin_double.mp3",
"https://raw.githubusercontent.com/SupersonicXD1/supersonicxd1_jstris_theme/master/clear_2.mp3",
"https://raw.githubusercontent.com/SupersonicXD1/supersonicxd1_jstris_theme/master/t_spin_triple.mp3",
"https://raw.githubusercontent.com/SupersonicXD1/supersonicxd1_jstris_theme/master/clear_3.mp3",
"https://raw.githubusercontent.com/SupersonicXD1/supersonicxd1_jstris_theme/master/clear_4.mp3",
"https://raw.githubusercontent.com/SupersonicXD1/supersonicxd1_jstris_theme/master/clear_perfect.mp3",
"blank",
"https://raw.githubusercontent.com/SupersonicXD1/supersonicxd1_jstris_theme/master/t_spin_b2b.mp3",
"https://raw.githubusercontent.com/SupersonicXD1/supersonicxd1_jstris_theme/master/clear_4_b2b.mp3"
];

Game['eventVolumes']  = [1,1,1,1,1,1,1,1,1,1,1]


window.events = ["TSPIN_SINGLE","TSPIN_MINI_SINGLE","CLEAR1","TSPIN_DOUBLE","CLEAR2","TSPIN_TRIPLE","CLEAR3","CLEAR4","PERFECT_CLEAR"]
window.enableB2B = true;


Game["latestEv"]="";Game["sArray"]=[];localStorage.evVol=localStorage.evVol||"100";window.b2bBefore=false;
Game["eventSounds"].map((x,i)=>{if(Game['eventSounds'][i]){Game["sArray"].push(document.createElement("audio"));Game["sArray"][i].src=x}else{Game["sArray"].push(null)}})


var evVol = document.createElement("tr");
evVol.innerHTML = `Special Events vol:&nbsp;<input id="volControl3" oninput="localStorage.evVol=volControl3.value;volSetting3.innerHTML=volControl3.value+'%'" type="range" min="0" max="100" value="`+localStorage.evVol+`" step="1" style="width:150px;display:inline-block;padding-top:9px">&nbsp;&nbsp;<span id="volSetting3">`+localStorage.evVol+`%</span>`
tab_appear.appendChild(evVol);

if(typeof playSound != 'function') {
    window.playSound = function(S){s=Game.sArray[S];console.log(s);!s.paused&&0<s.currentTime?s.currentTime=0:(s.volume=Game['eventVolumes'][S]*localStorage.evVol/100,s.play())}
}


window.events = ["TSPIN_SINGLE","TSPIN_MINI_SINGLE","CLEAR1","TSPIN_DOUBLE","CLEAR2","TSPIN_TRIPLE","CLEAR3","CLEAR4","PERFECT_CLEAR"]

if(typeof trim != "function"){var trim=a=>{a=a.slice(0,-1);a=a.substr(a.indexOf("{")+1);return a}}
if(typeof getParams != "function"){var getParams=a=>{var params=a.slice(a.indexOf("(")+1);params=params.substr(0,params.indexOf(")")).split(",");return params}}


var clcFunc = Game['prototype']['checkLineClears'].toString()
var clcParams = getParams(clcFunc)
searchFor = clcFunc.split("switch")[1].split("=")[2]
searchFor = searchFor.substr(searchFor.indexOf("_0x"),searchFor.indexOf("]]["))

events.map((x,i)=>{
	replacement = searchFor.replace("[","[Game['btb']=this['isBack2Back'],console.log('"+x+"'),Game['latestEv']='"+x+"',")
	clcFunc=clcFunc.replace(searchFor,replacement)
})

Game['prototype']["checkLineClears"] = new Function(...clcParams, trim(clcFunc));

var psFunc = Game['prototype']['playSound'].toString()
var psParams = getParams(psFunc);
psFunc = `
if(Game["latestEv"]){
	sIndex=events.indexOf(Game["latestEv"]);
	console.log(sIndex)
	sound=sIndex;enableB2B&&Game.btb&&~[0,1,3,5,7,8].indexOf(sIndex)&&(sound=10+ +(7==sIndex));
	console.log(sound);
	Game.sArray[sound]&&playSound(sound);
	Game["latestEv"]="";
}` + trim(psFunc)

Game['prototype']['playSound'] = new Function(...psParams, psFunc);

localStorage.mainVol = localStorage.mainVol || "100"
document.getElementById("settingsSave").addEventListener("click", function(){
    localStorage.mainVol=document.getElementById('vol-control').value
}, false);

Settings['prototype']['volumeChange'](+localStorage.mainVol)

/**************************
 Remaining Players Script
**************************/

if(typeof trim != "function"){var trim=a=>{a=a.slice(0,-1);a=a.substr(a.indexOf("{")+1);return a}}
if(typeof getParams != "function"){var getParams=a=>{var params=a.slice(a.indexOf("(")+1);params=params.substr(0,params.indexOf(")")).split(",");return params}}
if(typeof Game != "undefined"){

var aliveHold=document.createElement("div");
aliveHold.id="aliveHolder";
aliveHold.style.position="absolute"
aliveHold.style.left = (myCanvas.getBoundingClientRect().left - 200) + "px";
aliveHold.style.top = (myCanvas.getBoundingClientRect().top + 400) + "px";
document.body.appendChild(aliveHold);

var f='<div id="lrem"><div id="aliveNum"></div></div><div id="sprintText"><div id="stLrem" style="display: block;">opponents remaining</div></div>'
aliveHolder.innerHTML = f
aliveHolder.style.display='none'

var printAlive = SlotView['prototype']['printSlotPlace'].toString()
var printAliveParams = getParams(printAlive);
printAlive = `aliveHolder.style.display='block';aliveNum.innerHTML=parseInt(this['slot']['gs']['p']['getPlaceColor'](${printAliveParams[0]})['str'])-1;` + trim(printAlive)
SlotView['prototype']['printSlotPlace'] = new Function(...printAliveParams, printAlive);

var readyGoAlive = Game['prototype']['restart'].toString()
readyGoAlive = "if(this['pmode']+this['isPmode'](true)+this['isPmode'](false)==0){aliveHolder.style.display='block';aliveNum.innerHTML='all'};" + trim(readyGoAlive)
Game['prototype']['restart'] = new Function(readyGoAlive);
    }


/**************************
  Rotation Sounds Script
**************************/

Game['rotationSounds']  = [
"https://ecdldaiiere.github.io/Eddiez-Soundz/t99_rotate.wav", //rotate left
"https://ecdldaiiere.github.io/Eddiez-Soundz/t99_rotate.wav", //rotate right
"https://ecdldaiiere.github.io/Eddiez-Soundz/t99_rotate.wav" //rotate 180°
];

Game['rotationVolumes'] = [1,1,1]

localStorage.evVol=localStorage.evVol||"100"

Game["rArray"]=[];
Game["rotationSounds"].map((x,i)=>{if(Game['rotationSounds'][i]){Game["rArray"].push(document.createElement("audio"));Game["rArray"][i].src=x}else{Game["rArray"].push(null)}})


window.playRotSound = function(S){s=Game.rArray[S];!s.paused&&0<s.currentTime?s.currentTime=0:(s.volume=Game['rotationVolumes'][S]*localStorage.evVol/100,s.play())}


var trim=a=>{a=a.slice(0,-1);a=a.substr(a.indexOf("{")+1);return a}
var getParams=a=>{var params=a.slice(a.indexOf("(")+1);params=params.substr(0,params.indexOf(")")).split(",");return params}

var rotFunc = Game['prototype']['rotateCurrentBlock'].toString()
var rotParams = getParams(rotFunc)

var rotInsert = 'var rotPos=[0,0,1,2]['+rotParams[0]+'+1];console.log(rotPos);Game.rArray[rotPos]&&playRotSound(rotPos);'

rotFunc = rotInsert + trim(rotFunc)

Game['prototype']['rotateCurrentBlock'] = new Function(...rotParams, rotFunc);


/**************************
       Songs Script
**************************/

var trim=a=>{a=a.slice(0,-1);a=a.substr(a.indexOf("{")+1);return a}
var getParams=a=>{var params=a.slice(a.indexOf("(")+1);params=params.substr(0,params.indexOf(")")).split(",");return params}


localStorage.musicVol = localStorage.musicVol || "100";
localStorage.SPvol = localStorage.SPvol || "100";

var musicVol = document.createElement("tr");
musicVol.innerHTML = 'Music vol (MP):&nbsp;<input id="volControl" oninput="Game.setVol(volControl.value,1)" type="range" min="0" max="100" value="'+localStorage.musicVol+'" step="1" style="width:150px;display:inline-block;padding-top:9px">&nbsp;&nbsp;<span id="volSetting">'+localStorage.musicVol+'%</span>'
tab_appear.appendChild(musicVol);

var spVol = document.createElement("tr");
spVol.innerHTML = 'Music vol (SP):&nbsp;<input id="volControl2" oninput="Game.setVol(volControl2.value,0)" type="range" min="0" max="100" value="'+localStorage.SPvol+'" step="1" style="width:150px;display:inline-block;padding-top:9px">&nbsp;&nbsp;<span id="volSetting2">'+localStorage.SPvol+'%</span>'
tab_appear.appendChild(spVol);



Game["setVol"] = function(vol,mode) {
	if(mode){
		localStorage.musicVol = vol
		volSetting.innerHTML=vol+'%';
		var musicVol=document.getElementById("volControl")
		Game["songs"].map(x=>{
			x.volume = (musicVol.value/100);
		})
	} else {
		localStorage.SPvol = vol
		volSetting2.innerHTML=vol+'%';
		var spVol=document.getElementById("volControl2")
		Game["song"].volume = spVol.value/100
	}
}


if(typeof Game != "undefined"){


var songsMP = [
"https://ecdldaiiere.github.io/Eddiez-Soundz/t99song1.mp3",
"https://ecdldaiiere.github.io/Eddiez-Soundz/t99song2.mp3",
"https://ecdldaiiere.github.io/Eddiez-Soundz/t99song3.mp3"
]

var songSP = "https://ecdldaiiere.github.io/Eddiez-Soundz/t99song1.mp3"

//Play song when only X*100% of players are left (first one is always 1)
var songThresholds = [1, 0.6, 0.2]

Game['onlySprint'] = false;


window.playSong = function(s) {
	Game["songs"].map(x=>{
		x.pause();
		x.currentTime = 0;
	})
	Game["song"].pause();
	Game["song"].currentTime = 0;

	if(s != undefined){
		!s.paused&&0<s.currentTime?s.currentTime=0:s.play()
	}
}

Game["songs"] = [];
Game["maxPlayers"] = 0
Game["songIndex"] = -1


Game["song"] = document.createElement("audio");
Game["song"].src = songSP;
Game["song"].loop = true;
Game["song"].volume = 1;

songsMP.map((x,i)=>{
    Game["songs"].push(document.createElement("audio"));
    Game["songs"][i].src = x;
    Game["songs"][i].loop = true;
    Game["songs"][i].volume = 1;
})

Game["setVol"](localStorage.musicVol,1)
Game["setVol"](localStorage.SPvol,0)


Game["updateSong"] = function(i) {

	if(i<0){
		Game["maxPlayers"] = 0
		playSong()
		Game["songIndex"] = -1
	}

	if(i==0){
		Game["maxPlayers"]= -1
		playSong(Game["songs"][0])
		Game["songIndex"] = 0
	}

	if(typeof i == "string"){
		if(Game["maxPlayers"]<0){
			Game["maxPlayers"]=parseInt(i)
		}
		var alivePercent = (parseInt(i)-1)/Game["maxPlayers"]
		if(alivePercent <= songThresholds[Game["songIndex"]+1]){
			console.log(Game["songIndex"])
			Game["songIndex"]++
			playSong(Game["songs"][Game["songIndex"]])
		}
	}

}

var gameOver99 = Game['prototype']['GameOver'].toString();
gameOver99 = "Game['updateSong'](-1);Game['song'].pause();Game['song'].currentTime=0;" + trim(gameOver99)
Game['prototype']['GameOver'] = new Function(gameOver99)

var printSlot99 = SlotView['prototype']['printSlotPlace'].toString()
var printSlotParams = getParams(printSlot99);
printSlot99 = `Game["updateSong"](this['slot']['gs']['p']['getPlaceColor'](${printSlotParams[0]})['str']);` + trim(printSlot99)
SlotView['prototype']['printSlotPlace'] = new Function(...printSlotParams, printSlot99);



var readyGo99 = Game['prototype']['restart'].toString()
readyGo99 = "if(this['pmode']+this['isPmode'](true)+this['isPmode'](false)==0){Game['updateSong'](0)}else{Game['updateSong'](-1);if(!Game['onlySprint']){playSong(Game['song'])}else{if(this['pmode']==1){playSong(Game['song'])}}};" + trim(readyGo99)
Game['prototype']['restart'] = new Function(readyGo99);

var specMode99 = Live['prototype']['spectatorMode'].toString()
var specParams = getParams(specMode99);
specMode99 = `Game['updateSong'](-1);` + trim(specMode99)
Live['prototype']['spectatorMode'] = new Function(...specParams, specMode99);

var paint99 = Game['prototype']['paintMatrixWithColor'].toString()
var paintParams = getParams(paint99);
paint99 = `Game['updateSong'](-1);` + trim(paint99)
Game['prototype']['paintMatrixWithColor'] = new Function(...paintParams, paint99);


localStorage.mainVol = localStorage.mainVol || "100"
document.getElementById("settingsSave").addEventListener("click", function(){localStorage.mainVol=document.getElementById('vol-control').value}, false);
Settings['prototype']['volumeChange'](+localStorage.mainVol)

//remove these 3 lines if you dont want the music to stop for the countdown
var readyGo992 = Game['prototype']['readyGo'].toString()
readyGo992 = "Game['updateSong'](-1);" + trim(readyGo992)
Game['prototype']['readyGo'] = new Function(readyGo992);
}

    });
})();