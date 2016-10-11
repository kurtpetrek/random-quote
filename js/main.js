var start = true,
    previousBackground,
    backgroundArray = [],
    numOfImg = 15;

for (var x = 0; x < numOfImg; x++ ){
    backgroundArray.push("url\(images/bg" + x + ".jpg\)")
  }

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getQuote() {
  var requestURL = 'http://api.forismatic.com/api/1.0/=?';
  $.getJSON(requestURL, {
    'method': 'getQuote',
    'format': 'jsonp',
    'key': 40582,
    'lang': 'en',
    'jsonp': 'displayData'
  });
  return true;
}

function findWikiLink(data) {
  var str = "https://en.wikipedia.org/wiki/";
  var name = data.quoteAuthor;
  if(name === "") {
    return "";
  }
  name = name.replace(/\s/g, "_");
  str += name;
  return str;
}

function setTweetButton(data) {
  var str = "http://twitter.com/home/?status=",
      name = data.quoteAuthor,
      quote = data.quoteText;
  if(name === "") {
    name = "Unkown"
  }
  name = name.replace(" ", "_");
  quote = quote.replace(" ", "_");
  str += quote + name;
  $("#tweetQuote").attr("href",str);
  return str;
}

function displayData(data) {
  var htmlOutput = "",
    quoteOpen = '<i class="fa fa-quote-left" aria-hidden="true"></i>',
    quoteClose = '<i class="fa fa-quote-right" aria-hidden="true"></i>';
  
  setTweetButton(data);
  
  if (data.quoteAuthor === "") {
    data.quoteAuthor = "Unkown";
  }
  htmlOutput += "<h1 class='font-effect-3d'>" + quoteOpen + data.quoteText + quoteClose + "</h1>";
  htmlOutput += "<h3 class='font-effect-3d'>- <a href='" + findWikiLink(data);
  htmlOutput += "' target='_blank'>" + data.quoteAuthor + "</a></h3>";
  if(!start){
    $("#quoteContainer").fadeOut(500, function(){
      $('#quote').html(htmlOutput);
    }).fadeIn(1500);
  } else {$('#quote').html(htmlOutput);}
  
  return htmlOutput;
}

function getBackgroundImage() {
  var backgroundString = "",
      chosenBackground = getRandomInt(0, numOfImg);
  while (chosenBackground === previousBackground){
    chosenBackground = getRandomInt(0, numOfImg);
  }
  previousBackground = chosenBackground;
  
  backgroundString = backgroundArray[chosenBackground];
  return backgroundString;
}

function setBackgroundImage(start) {
  $("body").css({
    background: getBackgroundImage(),
    backgroundSize: 'cover',
    backgroundPosition: 'center center',
   backgroundAttachment: 'fixed'
  });
  return true;
}


/* Document Ready 
================================ */
$(function () {
  getQuote();
  setBackgroundImage(true);
  $("#newQuote").click(function () {
    start = false;
    setBackgroundImage(false);
    getQuote();
  });


});