// JavaScript Document
/*
Codes: Anamul Noyen
Memory game.
*/
var canvas;
var stage;
var proT;
var loader;
// each of the below var/holder contains start,game and end part of the game
var startCont,gameCont,endCont,buttonCont;
// store the cards
var cardHolder;
//main time tracker
var trackTime;
// the sprite sheet data for the Frog
var frogSpriteSheet;
//frog sprite or movie/animation
var frogSprite;
var score =0;
var errors =0;

// label text to the left of the game to display button option
var labelText;
// start button
var startBt,exitBt,optionBt,thumbsBt;
//cognitive and level drop down holder
var cogCont,levelCont,noiseCont;
///cognitive and level choice button
var btCog,btLevel,btNoise;
// card variable when the user clicks to select
var fCard,sCard;
var configData;
var level ="";
var cardurls;
var totalCards=20;
var totalCol=5;
var totalRow=4;
var totalTry=0;
var allCards;
var noise = 0;
var noiseH=0,noiseV=0;
var trackTime2;
var sec =0;
//width and height of the cards
var cardWidth = 80;
var cardHeight = 70;
// card sel boolean
var cardSel = false;
var cognitive = true;
// contains the id of the audio
var allAudio;
//indicates where the game is in
var gameStep = 1;
// variable for language
var language = "En";
function Main(){
	
	canvas = document.getElementById("gamew");
	stage = new createjs.Stage(canvas);
	optimizeForTouchAndScreens ();
	stage.enableMouseOver(10);
	//lists and loads assets

  	var query = window.location.search.substring(1);
	var sLan = (query.split("="));
	language = String(sLan[1]);
	if(language == null || language == "undefined"){
		
		language = "En";
	}
	var xmlName = String("lan"+language+".xml");
	loadGameXML(xmlName);
	loadManifestg();
	
}

//pre load assets
function loadManifestg(mArray){
	//initial card picture address to pre load the card pictures
	 cardurls = new Array(
		{src: "pictures/asterias.png", id: "Gcard1a"},
		{src: "pictures/ball1.png", id: "Gcard2a"},
		{src: "pictures/ball2.png", id: "Gcard2b"},
		{src: "pictures/baloon1.png", id: "Gcard3a"},
		{src: "pictures/baloon2.png", id: "Gcard3b"},
		{src: "pictures/bike1.png", id: "Gcard4a"},
		{src: "pictures/bike2.png", id: "Gcard4b"},
		{src: "pictures/bird1.png", id: "Gcard5a"},
		{src: "pictures/bird2.png", id: "Gcard5b"},
		{src: "pictures/car.png", id: "Gcard6a"},
		{src: "pictures/clock1.png", id: "Gcard7a"},
		{src: "pictures/clock2.png", id: "Gcard7b"},
		{src: "pictures/cloud1.png", id: "Gcard8a"},
		{src: "pictures/cloud2.png", id: "Gcard8b"},
		{src: "pictures/clown1.png", id: "Gcard9a"},
		{src: "pictures/clown2.png", id: "Gcard9b"},
		{src: "pictures/cup.png", id: "Gcard10a"},
		{src: "pictures/doggy.png", id: "Gcard11a"},
		{src: "pictures/fish1.png", id: "Gcard12a"},
		{src: "pictures/fish2.png", id: "Gcard12b"},
		{src: "pictures/flower1.png", id: "Gcard13a"},
		{src: "pictures/flower2.png", id: "Gcard13b"},
		{src: "pictures/flower1.png", id: "Gcard13a"},
		{src: "pictures/flower2.png", id: "Gcard13b"},
		{src: "pictures/flower3.png", id: "Gcard13c"},
		{src: "pictures/fruit1.png", id: "Gcard14a"},
		{src: "pictures/fruit2.png", id: "Gcard14b"},
		{src: "pictures/fruit3.png", id: "Gcard14c"},
		{src: "pictures/glass1.png", id: "Gcard15a"},
		{src: "pictures/glass2.png", id: "Gcard15b"},
		{src: "pictures/insect1.png", id: "Gcard16a"},
		{src: "pictures/insect2.png", id: "Gcard16b"},
		{src: "pictures/milkshake.png", id: "Gcard17a"},
		{src: "pictures/mushr1.png", id: "Gcard18a"},
		{src: "pictures/mushr2.png", id: "Gcard18b"},
		{src: "pictures/pencil1.png", id: "Gcard19a"},
		{src: "pictures/pencil2.png", id: "Gcard19b"},
		{src: "pictures/plane.png", id: "Gcard20a"},
		{src: "pictures/shoes1.png", id: "Gcard21a"},
		{src: "pictures/shoes2.png", id: "Gcard21b"},
		{src: "pictures/swim1.png", id: "Gcard22a"},
		{src: "pictures/swim2.png", id: "Gcard22b"},
		{src: "pictures/tie1.png", id: "Gcard23a"},
		{src: "pictures/tie2.png", id: "Gcard23b"}
	
	
);

	var commonAssets = new Array(
		
		{src: "images/frogtalk.png", id: "Gfrog"},
		{src: "images/background.png", id: "GBack"},
		{src: "images/on.png", id: "ButtonOn"},
		{src: "images/off.png", id: "ButtonOff"},
		{src: "images/nextoff.png", id: "NextOff"},
		{src: "images/nexton.png", id: "NextOn"},
		{src: "images/thumbson.png", id: "ThumbsOn"},
		{src: "images/thumbsoff.png", id: "ThumbsOff"},
		{src: "images/cardback.png", id: "CardBack"}
		
		
	
	);
	
	commonAssets = commonAssets.concat(allAudio);
	
	manifest = commonAssets.concat(cardurls);
	
	
	proT = new createjs.Text("Loading....","20px Arial","#000");
	proT.y = 250;
	proT.x = 400;
	proT.textAlign  = "center";
	//stage.addChild(proT);

	loader = new createjs.LoadQueue(false);
	loader.installPlugin(createjs.Sound);
//	createjs.Sound.initializeDefaultPlugins();
	createjs.Sound.alternateExtensions = ["mp3","ogg"];
	loader.addEventListener("progress", handleProgress);
	loader.addEventListener("complete", handleComplete);
	loader.loadManifest(manifest,true);
	
}
function handleProgress(e){
	var progresPrecentage = Math.round(loader.progress*100);
	proT.text = String("Loaded "+progresPrecentage+" %.");
	if(progresPrecentage >= 100){
		e.target.removeEventListener("progress", handleProgress);
	}
	stage.update();
	
}
function optimizeForTouchAndScreens () {
	if (createjs.Touch.isSupported()) {
		createjs.Touch.enable(stage,false,true);
		stage.preventSelection = false;
	}
}
function handleComplete(e){
	e.target.removeEventListener("complete", handleComplete);
//	stage.removeChild(proT);
	resetCardUrls();
	// the sprite sheet or animation sequence for frog
	frogTalkSpriteSheet();
	
	//make base screen for start
	makeStartScreen();
	
	startGame();
	
	
	stage.update();
	
}
//convert the card url object address to string
function resetCardUrls(){
for(var i =0; i<cardurls.length;i++){
	var ids = String(cardurls[i].id);
	cardurls[i] = ids;
	
}
	
}
function makeStartScreen(){
	
	startCont = new createjs.Container();
	var background = addBmp("GBack",0,0,false);
	stage.addChild(background);
	stage.addChild(startCont);
	// the game setting menu
	makeDropDownMenu();
	
	// the bottom menu
	makeButtonMenu();
	
	// frog animation file
	frogSprite = new createjs.Sprite(frogSpriteSheet,"talk");
	stage.addChild(frogSprite);
	// frog x or horizontal location
	frogSprite.x = 630;
	// frog y or vertical location
	frogSprite.y = 520;
	frogSprite.gotoAndStop("stop");
	stage.setChildIndex(buttonCont,stage.numChildren-1);
//	button menu label
	labelText = new createjs.Text("","bold 20px Arial","#000");
	labelText.x = 100;
	labelText.y = 550;
	labelText.textAlign = "center";
	stage.addChild(labelText);
}
// bottom menu 
function makeButtonMenu(){
	// bottom menu container or rectangle, window
	buttonCont = new createjs.Container();
	//location x or horizontal place for bottom menu
	buttonCont.x = 0;
	//location y or vertical place for bottom menu
	buttonCont.y = 500;
	//to change width and height of the menu window, type
	// buttonCont.scaleX = (value from .1 to 1);
	// buttonCont.scaleY = (value from .1 to 1);
	
	exitBt = makeBtImage("NextOn","NextOff",true);
	buttonCont.addChild(exitBt);
	exitBt.x = 300;
	exitBt.y = 60;
	exitBt.name = "exit";
	exitBt.label = "exit";
	exitBt.addEventListener("click",bottomMenu);
	
	thumbsBt = makeBtImage("ThumbsOn","ThumbsOff",true);
	buttonCont.addChild(thumbsBt);
	thumbsBt.x = 355;
	thumbsBt.y = 60;
	thumbsBt.name = "thumbs";
	thumbsBt.label = "";
	thumbsBt.addEventListener("click",bottomMenu);
	
	optionBt = makeBtImage("ButtonOn","ButtonOff",true);
	buttonCont.addChild(optionBt);
	optionBt.x = 415;
	optionBt.y = 60;
	optionBt.name = "options";
	optionBt.label = "options";
	optionBt.addEventListener("click",bottomMenu);
	
	startBt = makeBtImage("NextOn","NextOff",true);
	buttonCont.addChild(startBt);
	startBt.x = 470;
	startBt.y = 60;
	startBt.scaleX = -1;
	startBt.name = "start";
	startBt.label = "Start the test";
	startBt.addEventListener("click",bottomMenu);
	
	stage.addChild(buttonCont);
	
}
function bottomMenu(e){
	var selBt = e.target;
	var sName = String(selBt.name);
	switch(sName){
		case "start":
			prepareGameScr();
		break;
		
		
	}
}
// settings drop down menu
// for noise, difficulty, cognitive menu
function makeDropDownMenu(){
	var setingText = new createjs.Text("Settings","bold 30px Arial","#000");
	startCont.addChild(setingText);
	setingText.x = 400;
	setingText.y = 200;
	setingText.textAlign = "center";
	// cognitive drop down menu
	var x = configData.getElementsByTagName('cognitive');
	var wWord = String(x[0].childNodes[0].nodeValue);
	var sName = String(x[0].getAttribute('name'));
	
	var label1 = new createjs.Text(sName+":","20px Arial","#000");
	startCont.addChild(label1);
	label1.x =  130;
	label1.y = 272;
	

	var mArray = wWord.split(",");
	cogCont = menuMain(120,mArray,"#fff","cognitive");
	cogCont.visible = false;
	cogCont.x = 230;
	cogCont.y = 264;
	startCont.addChild(cogCont);
	
	
	btCog = makeButton(mArray[0],120,40,"#fff");
	
	startCont.addChild(btCog);
	btCog.x = 230;
	btCog.y = 264;
	btCog.name = "cognitive";
	btCog.cursor = "pointer";
	btCog.mouseChildren = false;
	cognitive = false;
	btCog.addEventListener("click",showDropDown);
	
	// level drop down menu
	 x = configData.getElementsByTagName('difficulty');
	 wWord = String(x[0].childNodes[0].nodeValue);
	 sName = String(x[0].getAttribute('name'));
	var label2 = new createjs.Text(sName+":","20px Arial","#000");
	startCont.addChild(label2);
	label2.x =  420;
	label2.y = 272;
	mArray = wWord.split(",");
	levelCont = menuMain(120,mArray,"#fff","level");
	levelCont.visible = false;
	levelCont.x = 560;
	levelCont.y = 264;
	startCont.addChild(levelCont);
	
	
	btLevel = makeButton(mArray[0],120,40,"#fff");
	
	startCont.addChild(btLevel);
	btLevel.x = 560;
	btLevel.y = 264;
	btLevel.name = "level";
	btLevel.cursor = "pointer";
	btLevel.mouseChildren = false;
	level=String(mArray[0]);
	totalCards = 20;
	btLevel.addEventListener("click",showDropDown);
	
	
	// noise drop down menu
	x = configData.getElementsByTagName('noise');
	wWord = String(x[0].childNodes[0].nodeValue);
	sName = String(x[0].getAttribute('name'));
	
	var label3 = new createjs.Text(sName+":","20px Arial","#000");
	startCont.addChild(label3);
	label3.x =  130;
	label3.y = 340;
	

	mArray = wWord.split(",");
	noiseCont = menuMain(120,mArray,"#fff","noise");
	noiseCont.visible = false;
	noiseCont.x = 230;
	noiseCont.y = 330;
	startCont.addChild(noiseCont);
	
	
	btNoise = makeButton(mArray[0],120,40,"#fff");
	
	startCont.addChild(btNoise);
	btNoise.x = 230;
	btNoise.y = 330;
	btNoise.name = "noise";
	btNoise.cursor = "pointer";
	btNoise.mouseChildren = false;
	noise = 0;
	btNoise.addEventListener("click",showDropDown);
	
	
}
//shows the drop down menu for noise, difficulty and cognitive
function showDropDown(e){
	
	var cName = String(e.target.name);
	switch(cName){
		case "cognitive":
		
			cogCont.visible = true;
			noiseCont.visible = false;
			levelCont.visible = false;
			startCont.setChildIndex(cogCont,startCont.numChildren-1);
			
		break;
		case "level":
			cogCont.visible = false;
			levelCont.visible = true;
			noiseCont.visible = false;
			startCont.setChildIndex(levelCont,startCont.numChildren-1);
			
		break;
		case "noise":
		
			noiseCont.visible = true;
			cogCont.visible = false;
			levelCont.visible = false;
			startCont.setChildIndex(noiseCont,startCont.numChildren-1);
			
		break;
	
		
	}
	
}
// when the menu item is clicked
function selectMenuItem(e){
	var type = String(e.target.type);
	switch(type){
		case "cognitive":
		
		var sName = String(e.target.name);
		cogCont.visible = false;
		
		btCog.getChildByName("btext").text = String(sName);
		if(sName == "true"){
			cognitive = true;
		}else{
			cognitive = false;
		}
		
		break;
		case "level":
		
		var cName = String(e.target.name);
		level = cName;
		levelCont.visible = false;
		
		btLevel.getChildByName("btext").text = String(cName);
		selectRowCol();
		break;
		
		case "noise":
		
		cName = String(e.target.name);
		noise = parseInt(cName);
		noiseCont.visible = false;
		
		btNoise.getChildByName("btext").text = String(cName);
		
		noiseSetup();
		break;
		
	}
	
}
// decide vertical and horizontal noise
function noiseSetup(){
	if(noise == 0){
		noiseH = 0;
		noiseV = 0;
		
	}
	if(noise == 1){
		noiseH = 3;
		noiseV = 0;
		
	}
	if(noise == 2){
		noiseH = 0;
		noiseV = 3;
		
	}
	if(noise == 3){
		noiseH = 3;
		noiseV = 3;
		
	}
	
}
//determine total row and column in the grid
function selectRowCol(){
			switch(level){
				case "4x5":
				
				totalCol  =5;
				totalRow = 4;
				totalCards=20;
				break;
				case "4x6":
				totalCol  =6;
				totalRow = 4;
				totalCards=24;
				
				break;
				case "5x6":
				totalCol  =6;
				totalRow = 5;
				totalCards=30;
				break;
				
			}
			
	}

// when the start  button is presses, prepares the game window
function prepareGameScr(){
	//Export codes
	/*
	var postData = JSON.stringify({
			"score": score,
    		"level":level,
			"time":sec,
			"pairs":totalCards,
			"nbOfQuestions":10
			});
        initHeaders();
        $.ajax({
            type: "POST",
            url: "/api/Games/"+game_id+"/Start",
            data: postData,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
            },
            error: function (xhr, status, error) {
            }
        });
		*/
	startBt.removeEventListener("click",bottomMenu);
	startBt.removeEventListener('mouseover',btnMouseover);
	startBt.removeEventListener('mouseout',btnMouseout);
	exitBt.removeEventListener("click",bottomMenu);
	exitBt.removeEventListener('mouseover',btnMouseover);
	exitBt.removeEventListener('mouseout',btnMouseout);
	optionBt.removeEventListener("click",bottomMenu);
	optionBt.removeEventListener('mouseover',btnMouseover);
	optionBt.removeEventListener('mouseout',btnMouseout);
	thumbsBt.removeEventListener("click",bottomMenu);
	thumbsBt.removeEventListener('mouseover',btnMouseover);
	thumbsBt.removeEventListener('mouseout',btnMouseout);
	
	removeMenuListener();
	stage.removeChild(startCont);
	makeMainGame();
}

// load and makes game assets
function makeMainGame(){
	frogSprite.gotoAndPlay("talk");
	labelText.text = "";
	var sName= "Sspeech";
	if(language == "Gre"){
		if(cognitive == false){
			sName= "Sspeech";
		}else{
			sName="SspeechCog";
		}
	}else{
		sName= "Sspeech";
	}
	var instance = createjs.Sound.play(sName);
	instance.on("complete", this.EndSpeech, this);
	selectCardUrls();
	sec =0;
	trackTime = setInterval(countTime,1000);
	errors =0;

	
	gameCont = new createjs.Container();
	// cardHolders or the card container or the cards window
	// cardHolders is where all the cards or memory images are 
	// to change the location or size of the card window,
	// adjust cardHolders position and size
	// addCards is the function that load and adds the cards
	// in the cardHolder
	cardHolder = addCards();
	// vertical or y position of the card window
	cardHolder.y = 150;
	gameCont.addChild(cardHolder);
	stage.addChild(gameCont);
}
// when the intro or instruction speech is done
function EndSpeech(){
	frogSprite.gotoAndStop("talk");
}

//selects the card picture based of cognitive
function selectCardUrls(){
	var selectedCardsId = new Array();
	var firstUrls = new Array();
	var secUrls = new Array();
	if(cognitive){
		for(var i =0; i<cardurls.length;i++){
			var cName = String("Gcard"+(i+1)+"b");
			if(cardurls.indexOf(cName) >= 0){
				var validId = String("Gcard"+(i+1));
				
				selectedCardsId.push(validId);
			}
		}
		var isDone = false;
		
		while(!isDone){
			var r = Math.floor(Math.random()*selectedCardsId.length);
			
			cName = String(selectedCardsId[r]);
			cName += "a";
			
			if(firstUrls.indexOf(cName) == -1){
				firstUrls.push(cName);
				//alert(cName);
			}
			if(firstUrls.length >= totalCards/2){
				isDone = true;
				
			}
			
		}
		for(i =0; i<firstUrls.length;i++){
			cName = String(firstUrls[i]);
			cName =(cName.substr(0,cName.length-1));
			cName += "b";
			secUrls.push(cName);
		}
		
		
	}else{
		
		isDone = false;
		
		while(!isDone){
			r = Math.floor(Math.random()*cardurls.length);
			cName = String(cardurls[r]);
			if(firstUrls.indexOf(cName) == -1){
				firstUrls.push(cName);
			}
			
			if(firstUrls.length >= totalCards/2){
				isDone = true;
			}
			
		}
		
		secUrls = firstUrls;
		
	}
	
	allCards = new Array();
	for(i =0; i<firstUrls.length;i++){
		var card= new createjs.Container();
		var surl = String(firstUrls[i]);
		var cFront = addBmp(surl,0,0,false);
		card.addChild(cFront);
		cFront.name = "cFront";
		var cback = addBmp("CardBack",0,0,false);
		card.addChild(cback);
		cback.name = "cBack";
		card.cIndex = i;
		card.aurl =String(firstUrls[i]); 
		allCards.push(card);
	}
	
for(i =0; i<secUrls.length;i++){
		card= new createjs.Container();
		var surl = String(secUrls[i]);
		var cFront = addBmp(surl,0,0,false);
		card.addChild(cFront);
		cFront.name = "cFront";
		cback = addBmp("CardBack",0,0,false);
		card.addChild(cback);
		cback.name = "cBack";
		card.cIndex = i;
		card.aurl =String(secUrls[i]); 
		allCards.push(card);
	}
allCards = shuffleArray(allCards);
}
function countTime(){
	
		sec++;
		var mint = Math.round(sec/60);
		var dsec= Math.round(sec%60);
	
	
}


// randomizes the cards
function shuffleArray(sArray){
	var nArray = new Array();
	var isD = false;
	while(!isD){
		var rI = Math.floor(Math.random()*sArray.length);
		var card = sArray[rI];
		if(nArray.indexOf(card) == -1){
			nArray.push(card);
			
		}
		if(nArray.length >= sArray.length){
			isD = true;
		}
		
	}
	return nArray;
}
// add cards a caontainer which is then returned to cardHolder window
function addCards(){
	var c =1;
	var r =1;
	// holds all the cards
	var cardH = new createjs.Container();
	for(var i =0; i < allCards.length;i++){
		var card = allCards[i];
		cardH.addChild(card);
		card.mouseChildren = false;
		card.cursor = "pointer";
		card.isClick = false;
		// placment or location of card based on noise 
		if(noise == 0){
			// horizontal or x location
			// cardwidth determine the overall horizontal space for a card
			var tx = (cardWidth+1)*(c-1);
			// vertical or y location
			// cardheight determine the overall vertical space for a card
			var ty = (cardHeight+1)*(r-1);
		}else{
			var noiseSign = Math.floor(Math.random()*2);
			if(noiseSign == 1){
				var noiseFactor = -1;
			}else{
				noiseFactor = 1;
			}
			// horizontal or x location
			tx = (cardWidth+1)*(c-1)+(noiseFactor*noiseH);
			// vertical or y location
			ty = (cardHeight+1)*(r-1)+(noiseFactor*noiseV);
			
		}
		//// horizontal or x location
		card.x = tx;
		// vertical or y location
		card.y = ty;
		//setting cards registration point
		card.regX = cardWidth/2;
		card.regY = cardHeight/2;
		c++;
		if(c >= totalCol+1){
			c=1;
			r++;
		}
		card.addEventListener("click",showCards);
		
	}
	
	
	var tWidth = parseInt((cardWidth+1)*totalCol);
	cardH.regX = parseInt(tWidth/2);
	
	// placement or location of the cardHolder
	// horizontal or x location
	cardH.x = (stage.canvas.width/2)+cardWidth/2;
	// vertical or y location
	cardH.y = 350-((r*cardHeight)/2);
	return cardH;
	
}
function resizeImage(sT,tW,tH){
	var sImg = addBmp(sT,0,0,false);
	
	var sWd = sImg.image.width;
	var sht = sImg.image.height;
	var wdPer = Math.round((tW/sWd)*100);
	
	var wdSc = (wdPer/100);
	var htPer = Math.round((tH/sht)*100);
	var htSc = (htPer/100);
	
	sImg.scaleX = wdSc;
	sImg.scaleY = htSc;
	return sImg;
}
//when the user clicks on a card
function showCards(e){
	if(!cardSel){
		var tCard = e.target;
		createjs.Sound.play("Skeydown");
		totalTry++;
		
	if(fCard == null && tCard.isClick == false){
		fCard = tCard;
		
		fCard.isClick = true;
		rotationT(fCard,-1);
		
	}else if(sCard == null && tCard.isClick == false){
		sCard = e.target;
		
		cardSel = true;
		trackTime2 = setInterval(pauseTime,1000);
		rotationT(sCard,-1);
	}
	
	}
	
}
// asses or check if the player got it right
function pauseTime(){
	clearInterval(trackTime2);
	var fIn = parseInt(fCard.cIndex);
	
	var sIn = parseInt(sCard.cIndex);
	
	if(fIn == sIn){
		score++;
		if(score >= parseInt(totalCards/2)){
			var i = Math.floor(Math.random()*5);
			var fSound = String("Send"+i);
			createjs.Sound.play(fSound);
			clearInterval(trackTime);
			removeAllCards();
			showEndScreen();
			stage.removeChild(gameCont);
		}else{
			createjs.Sound.play("Sright");
		}
	}else{
		
		
		errors++;
		
	
		sCard.isClick = false;
		fCard.isClick = false;
		
		var sbmp = fCard.getChildByName("cFront");
		sbmp.visible = false;
		var sbck = fCard.getChildByName("cBack");
		sbck.visible = true;
		sbmp = sCard.getChildByName("cFront");
		sbmp.visible = false;
		sbck = sCard.getChildByName("cBack");
		sbck.visible = true;
	}
	
	
	sCard = null;
	fCard = null;
	cardSel = false;
	
}

// End page
function showEndScreen(){	
//Export codes
/*
var postData = JSON.stringify({
    	"score": score,
		"time":sec,
		"level":level,
		"pairs":totalCards,
		"nbOfQuestions":10
	});
        initHeaders();
        $.ajax({
            type: "POST",
            url: "/api/Games/"+game_id+"/Results",
            data: postData,
            contentType: "application/json; charset=utf-8",
            success: function (data) {
            },
            error: function (xhr, status, error) {
            }
        });	
		*/			
			
	
	endCont = new createjs.Container();
	
	stage.addChild(endCont);
	var mint = Math.round(sec/60);
	var dsec= Math.round(sec%60);
	var tTime = new createjs.Text("","20px Arial","#000");
	var tStr = String(mint+" minute "+dsec+" seconds");
	tTime.text = String(tStr);
	endCont.addChild(tTime);
	tTime.textAlign = "center";
	tTime.x = 400;
	tTime.y = 250;
	
	var tTry = new createjs.Text("","20px Arial","#000");
	tStr = String("Total tries: "+totalTry);
	tTry.text = String(tStr);
	endCont.addChild(tTry);
	tTry.textAlign = "center";
	tTry.x = 400;
	tTry.y = 300;
	
	
	sec=0;
	totalTry =0;
	score =0;
	
	exitBt.addEventListener("click",playAgain);
	exitBt.addEventListener("click",bottomMenu);
	exitBt.addEventListener('mouseover',btnMouseover);
	exitBt.addEventListener('mouseover',btnMouseout);
	
}
/// the game frame per seconds refresh or update 
function startGame(){
	createjs.Ticker.setFPS(60);
	createjs.Ticker.addEventListener("tick",updateGame);
	
}
function updateGame(e){
	
	
	stage.update();
	
}

// when the game is done, the user can click on the exit button to play //again
function playAgain(e){
	
	exitBt.removeEventListener("click",playAgain);
	exitBt.removeEventListener("click",bottomMenu);
	exitBt.removeEventListener('mouseover',btnMouseover);
	stage.removeChild(endCont);
	stage.removeChild(frogSprite);
	stage.removeChild(buttonCont);
	//make base screen for start
	makeStartScreen();
	
	
	
	stage.update();
}
// tweens
function alphaTween(target,t,wts){
	createjs.Tween.get(target).wait(wts).to({alpha:t},1000,createjs.Ease.backOut);
}



function yTweenEl(target,ty){
	createjs.Tween.get(target).to({y:ty},2000,createjs.Ease.elasticOut);
}
function xTween(target,tx){
	createjs.Tween.get(target).to({x:tx},500,createjs.Ease.QuadIn);
	
}

function yTween(target,ty,wts){
createjs.Tween.get(target).wait(wts).to({y:ty},1000,createjs.Ease.backOut);
	
}
// add an image based on id
function addBmp(bname,tx,ty,isR){
	var bmp = new createjs.Bitmap(loader.getResult(bname));
	if(isR){
		bmp.regX =bmp.image.width/2;
		bmp.regY = bmp.image.height/2;
	}
	bmp.y = ty;
	bmp.x = tx;
	return bmp;
	
}
///make menu
function menuMain(w,items,color,mtype){
	var tCont = new createjs.Container();
	
	for(var i =0; i<items.length;i++){
		var cCont = new createjs.Container();
		var tShape = boxMaker(w,40,color);
		cCont.addChild(tShape);
		var tStr = String(items[i]);
		var tempT = new createjs.Text(tStr,"20px Arial","#000");
		tempT.textAlign = "center";
		tempT.x = Math.round(w/2);
		tempT.y = 10;
		cCont.addChild(tempT);
		cCont.mouseChildren = false;
		cCont.name = tStr;
		cCont.type = mtype;
		cCont.index = i;
		cCont.cursor = "pointer";
		// when user clicks on a menu item
		cCont.addEventListener("click",selectMenuItem);
		tCont.addChild(cCont);
		cCont.x = 0;
		cCont.y = -41-(i*41);
	}
	
	return tCont;
	
}

function makeRoundGrad(sc1,sc2){
	
	var gradient = new createjs.Shape();
    gradient.graphics.beginLinearGradientFill([sc1,sc2], [0, 1], 0, 50, 0,   130).drawRoundRect(0,0,150,90,10);
	return gradient;	
}
function makeRoundBt(sc1,wd,ht,corner){
	
	var shape = new createjs.Shape();
 	shape.graphics.beginFill(sc1).drawRoundRect(0,0,wd,ht,corner);
	return shape;
}
function makeRoundBtS(sc1,sc2,wd,ht,corner){
	
	var shape = new createjs.Shape();
	shape.graphics.beginStroke(sc1);
	shape.graphics.setStrokeStyle(2);
 	shape.graphics.beginFill(sc2).drawRoundRect(0,0,wd,ht,corner);
	return shape;
}

function boxMakerb(wdt,h,color){
	var shape = new createjs.Shape();
 	shape.graphics.beginFill(color).drawRect(0,0,wdt,h);
	return shape;
	
}
function boxMaker(wdt,h,color){
	var shape = new createjs.Shape();
	shape.graphics.beginStroke("#000");
	shape.graphics.setStrokeStyle(2);
 	shape.graphics.beginFill(color).drawRect(0,0,wdt,h);
	
	return shape;
	
	
}
//makes button based on image loaded
function makeBtImage(Inor,Iover,isR){
	var bCont = new createjs.Container();
	var bag = addBmp(Inor,0,0,true);
	bCont.addChild(bag);
	bag.name = "mout";
	var bag2 = addBmp(Iover,0,0,true);
	bCont.addChild(bag2);
	bag2.name = "mover";
	bag2.visible = false;
	bCont.cursor = "pointer";
	if(isR){
		bCont.addEventListener('mouseover',btnMouseover);
		bCont.addEventListener('mouseout',btnMouseout);
	}
	bCont.mouseChildren = false;
	return bCont;
	
}




function alphaTweenT(target,t,wts){
createjs.Tween.get(target).wait(wts).to({alpha:t},1000,createjs.Ease.backOut).call(alphaDone);
}
function alphaDone(){
	bravoB.visible = false;
	bravoB.alpha = 1;
	bravoB.y = 400;
}
function buttonClicked(bCont){
	
}
function btnMouseover(e){
	var bCont = e.target;
	var bmp = bCont.getChildByName("mover");
	bmp.visible = true;
	bmp = bCont.getChildByName("mout");
	bmp.visible = false;
	
	var sLabel = String(bCont.label);
	labelText.text = String(sLabel);
}
function btnMouseout(e){
	var bCont = e.target;
	var bmp = bCont.getChildByName("mover");
	bmp.visible = false;
	bmp = bCont.getChildByName("mout");
	bmp.visible = true;
	
}
function mouseOverT(e){
	var bCont = e.target;
	var ttext = bCont.getChildByName("htext");
	ttext.color = "#ff0000";
	
}
function mouseOutT(e){
	var bCont = e.target;
	var ttext = bCont.getChildByName("htext");
	ttext.color = "#000000";
	
}
function showmouseover(e){
	
	widthHeightT(e.target,1);
	
	
}
function showmouseout(e){
	
	widthHeightT(e.target,.9);
	
	
}
function widthHeightT(bmp,t){
	
createjs.Tween.get(bmp).to({scaleX:t,scaleY:t},300,createjs.Ease.backOut);
	
}
// card rotation
function rotationT(bmp,t){
	
createjs.Tween.get(bmp).to({scaleX:t},400,createjs.Ease.backOut).call(rotationDone);
	
}
// when the user clicks on a card it rotates.When rotation ends this //function is called
function rotationDone(){
	if(fCard != null){
		fCard.scaleX = 1;
		var sbmp = fCard.getChildByName("cFront");
		sbmp.visible = true;
		var sbck = fCard.getChildByName("cBack");
		sbck.visible = false;
		
	}
	if(sCard != null){
		
		sCard.scaleX = 1;
		sbmp = sCard.getChildByName("cFront");
		sbmp.visible = true;
		sbck = sCard.getChildByName("cBack");
		sbck.visible = false;
		sCard.isClick = true;
	}
}
/// button maker
function makeButton(yt,wd,h,color){
	var tCont = new createjs.Container();
	
	var ctd = new createjs.Text(yt,"20px Arial","#000");
	
	ctd.textAlign = "center";
	ctd.x = Math.round(wd/2);
	ctd.y = h/2-10;
	ctd.name = "btext";
	
	var shape = boxMaker(wd,h,color);
	
 	tCont.addChild(shape);
	tCont.addChild(ctd);
	return tCont;
	
	
}
function loadImage(uSt){
	quesImg = new createjs.Bitmap(uSt);
	quesImg.x = 180;
	quesImg.y = 180;
	gameCont.addChild(quesImg);
}
function removeMenuListener(){
	btLevel.removeEventListener("click",showDropDown);
	btCog.removeEventListener("click",showDropDown);
	for(var i = 0; i<cogCont.numChildren;i++){
		var dcont = cogCont.getChildAt(i);
		dcont.removeEventListener("click",selectMenuItem);
		
	}
	for(i = 0; i<levelCont.numChildren;i++){
		var dcont = levelCont.getChildAt(i);
		dcont.removeEventListener("click",selectMenuItem);
		
	}
	
}
function removeAllCards(){
	for(var i =0;i<allCards.length;i++){
		var card = allCards[i];
		card.removeEventListener("click",showCards);
		
	}
	allCards = [];
	gameCont.removeChild(cardHolder);
}
function loadGameXML(config){
	var Connect = new XMLHttpRequest();
	Connect.open("GET", config, false);
	//Connect.setRequestHeader("Content-Type", "text/xml");
	Connect.send();
 
	// Place the response in an XML document.
	configData = Connect.responseXML;
 
if(!configData){
	configData = (new DOMParser()).parseFromString(Connect.responseText,"text/xml");
	
}
readXML();


}
// read xml data for sound and text to be used in the game
function readXML(){
	allAudio = new Array();
	var x = configData.getElementsByTagName('speech');
	var wWord = String(x[0].childNodes[0].nodeValue);
	var soundId = String("Sspeech");
	allAudio.push({src:wWord,id:soundId});
	
	x = configData.getElementsByTagName('speechCog');
	wWord = String(x[0].childNodes[0].nodeValue);
	soundId = String("SspeechCog");
	allAudio.push({src:wWord,id:soundId});
	
	x = configData.getElementsByTagName('success');
	wWord = String(x[0].childNodes[0].nodeValue);
	soundId = String("Sright");
	allAudio.push({src:wWord,id:soundId});
	
	x = configData.getElementsByTagName('keydown');
	wWord = String(x[0].childNodes[0].nodeValue);
	soundId = String("Skeydown");
	allAudio.push({src:wWord,id:soundId});
	
	x = configData.getElementsByTagName('finish');
	for(var i =0;i < x.length;i++){
		wWord = String(x[i].childNodes[0].nodeValue);
		soundId = String("Send"+i);
		allAudio.push({src:wWord,id:soundId});
	}
	
	
}
function frogTalkSpriteSheet(){
	var data ={
"framerate":30,
"images":["images/frogtalk.png"],
"frames":[
    [2, 2, 60, 60, 0, -3, -6],
    [70, 2, 60, 60, 0, -3, -6],
    [138, 2, 60, 60, 0, -3, -6],
    [206, 2, 60, 60, 0, -3, -6],
    [274, 2, 60, 60, 0, -3, -6],
    [342, 2, 60, 60, 0, -3, -6],
    [410, 2, 60, 60, 0, -3, -6],
    [478, 2, 60, 60, 0, -3, -6],
    [546, 2, 60, 60, 0, -3, -6]
],
"animations":{
    "talk": {
       
        "frames": [
            0,
            0,
            0,
            0,
            0,
            0,
            0,
            1,
            1,
            1,
            1,
            2,
            2,
            2,
            3,
            3,
            3,
            4,
            4,
            4,
            5,
            5,
            5,
            6,
            6,
            6,
            7,
            7,
            7,
            8
        ],
        "speed": .25
    },
    "stop": {"speed": 1, "frames": [0]}
}
};
frogSpriteSheet = new createjs.SpriteSheet(data);
	
}