$(document).ready(function() {
	
	var plainText = null;
	var textLines = null;
	var typingText = null;
	var typedObj = null;
	
	var typingTextContainerID = "#app"; // for jQuery(...)
	var typingTextContainer = $(typingTextContainerID);
		
	var isTypingString = false;
	
    // holds the start time
    var clickedTime;
	
	var config = {
		fontSizeEm: 1, // em unit
		longpress: 100, // how many milliseconds is a long press?
		isBulk: false,
		isLongPressSkip: true
	}

	$.ajax({
		url: 'caption.txt',
		context: document.body,
		cache: false,
		dataType: "text"
	}).done(function(data) {
	   //startRenderSubtitle(data);
	   fetchPlainText(data);
	});
	
	function startRenderSubtitle(plainText){
		var textLines = plainText.split("\n");
		console.dir(plainText);
		console.dir(textLines);
		typedObj = new Typed(typingTextContainerID, {
			strings: textLines,
			typeSpeed: 100,
			backSpeed: 10,
			fadeOut: true,
			loop: false
		});
	}
	
	function fetchPlainText(data){
	   plainText = data;
	   textLines = plainText.split("\n");
	}
	
	function typeNewLine(text){
		typingText = text;
		typedObj = new Typed(typingTextContainerID, {
			strings: [text + "^1000"], // hold 1 second(s)
			typeSpeed: 100,
			backSpeed: 10,
			fadeOut: true,
			loop: false,
			smartBackspace: false,
			shuffle: true,
			cursorChar: '_',
			onComplete: function(self) { onCompleteListener(typedObj) },
			preStringTyped: function(arrayPos, self) { preStringTypedListener(arrayPos, self)},
			onStringTyped: function(arrayPos, self) { onStringTypedListener(arrayPos, self)},
			onReset: function(self) { onResetListener(self)},
			onStop: function(arrayPos, self) { onStopListener(arrayPos, self)},
			onStart: function(arrayPos, self) { onStartListener(arrayPos, self)}
		});
	}
		
	function fetchNextLine(_config){
		var text = textLines.shift();
		if(_config.isBulk)
			text = trimByWordEmbedBulk(text);
		
		text = text.trim();
		
		return text;
	}
	
	function trimByWordEmbedBulk(sentence) {
		var result = sentence;
		var resultArray = result.split(" ");
		result = resultArray.join("` `");
		return "`" + result + "`";
	}
	
	function onCompleteListener(instanceObj){
		//instanceObj.destroy();
		isTypingString = false;
		instanceObj.toggle();
	}
	
	// string is start typing
	function preStringTypedListener(arrayPos, self){
		isTypingString = true;
	}
	
	// string is typed
	function onStringTypedListener(arrayPos, self){
		isTypingString = false;
		typingText = null;
	}
	function onResetListener(self){
		console.log(self);
	}
	function onStopListener(arrayPos, self){
		//console.log(arrayPos);
		//console.log(self);
	}
	function onStartListener(arrayPos, self){
		console.log(arrayPos);
		console.log(self);
	}
	
	// toggle config
	function toggleIsBulk(jqDomObj){
		config.isBulk = !config.isBulk;
		$(jqDomObj).find("span").text(config.isBulk)
	}
	function toggleIsLongPressSkip(jqDomObj){
		config.isLongPressSkip = !config.isLongPressSkip;
		$(jqDomObj).find("span").text(config.isLongPressSkip)
	}
	
	// Decimals are not rounded consistently in all browsers. The best post I could find is here: Browser Rounding
	// https://stackoverflow.com/questions/27947728/is-decimal-precision-when-specifying-a-font-size-respected-by-all-browsers
	// http://cruft.io/posts/percentage-calculations-in-ie/
	function adjustSize(adjust){
		var currentSize = config.fontSizeEm;
		var futureSize = 0.0;
				
		if(adjust >= 0){
			if(currentSize == 3) // max 3em
				return;
			futureSize = currentSize + (adjust/100.0)
		}else{
			if(currentSize == 0.5) // max 0.5em
				return;
			futureSize = currentSize - ((adjust*-1)/100.0)
		}
		
		// round to 2 decimal places
		futureSize = Math.round(futureSize * 100) / 100
		typingTextContainer.css("fontSize", futureSize+"em");
		config.fontSizeEm = futureSize;
		
		var sizeInPercentage = futureSize*100;
		sizeInPercentage = Math.round(sizeInPercentage * 100) / 100
		
		$("#fontsize").text(sizeInPercentage + "%");
	}
	
	adjustSize(0);
	
	// detect click
	//$("#container").click(function(){
	//});
	
    jQuery( "#clickableArea" ).on( 'mousedown', function( e ) {
        clickedTime = new Date().getTime();
    } );

    jQuery( "#clickableArea" ).on( 'mouseleave', function( e ) {
        clickedTime = 0;
    } );

    jQuery( "#clickableArea" ).on( 'mouseup', function( e ) {
		if(config.isLongPressSkip)
			if(isTypingString)
				if ( new Date().getTime() >= ( clickedTime + config.longpress )  ) {
					console.log("long pressed, display the text at once")
					
					typedObj.stop();
					typedObj.destroy();
					
					typingTextContainer.text(typingText);
					isTypingString = false;
					typingTextContainer.append('<span class="typed-cursor typed-cursor--blink">_</span>');
					
					/*
					typedObj.destroy();
					
					typedObj = new Typed('#app', {
						strings: [typingText + "^1000"], // hold 1 second(s)
						typeSpeed: 0,
						backSpeed: 10,
						fadeOut: true,
						loop: false,
						smartBackspace: false,
						shuffle: true,
						cursorChar: '_',
						onComplete: function(self) { onCompleteListener(typedObj) },
						preStringTyped: function(arrayPos, self) { preStringTypedListener(arrayPos, self)},
						onStringTyped: function(arrayPos, self) { onStringTypedListener(arrayPos, self)},
						onReset: function(self) { onResetListener(self)},
						onStop: function(arrayPos, self) { onStopListener(arrayPos, self)},
						onStart: function(arrayPos, self) { onStartListener(arrayPos, self)}
					});
					*/	
					return;
				}
		
			if(isTypingString){
				console.log("Typing now, cannot move to the next")
				return;
			}
			
			if(textLines.length > 0){
				if(typedObj)
					typedObj.destroy();
					
				console.log("Clicked on area, fetch text line.")
				var newLine = fetchNextLine(config);
				typeNewLine(newLine);
			}
		
		
    } );
	
	$(".config").click(function(){
		var configID = $(this).attr("id");
		
		switch(configID){
			case "isBulk":
				toggleIsBulk(this)
				break;
			case "isLongPressSkip":
				toggleIsLongPressSkip(this)
				break;
		}
	});
	
	$("#play").click(function(){
		typedObj.start();
	});
	
	$("#pause").click(function(){
		typedObj.stop();
	});
	
	$("#increaseSize").click(function(){
		adjustSize(10);
	});
	$("#decreaseSize").click(function(){
		adjustSize(-10);
	});
	
	

})