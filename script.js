            all = {
                "hello" : "Hi! ",
                "hello alexa" : "Hi! there",
                "alexa" : "Hi! ",
                "hi there" : "Hi! ",
                "what's up" : "Excellent! And you?",
                "hi" : "Hello! ",
                "how are you" : "Good! Thanks for asking! What about you?",
                "ok" : "Hm",
                "fine" : "Hm",
                "i'm fine" : "Hm", 
                "i'm good" : "Hm", 
                "good" : "Hm", 
                "i am fine" : "Hm", 
                "i am good" : "Hm", 
                "what is your name?" : "I'm Alexa",
                "what's your name" : "I'm Alexa",
                "who are you" : "I'm Alexa, always ready to help you",
                "tell me about yourself" : "I'm Alexa, always ready to help you",
                "are you a robot" : "Yes, I'm a Robot, still under development. Raunak is my developer. I will always remain indebted for him",
                "are you mad" : "I'm sorry to hear you angry ",
                "good morning" : "Good morning! Have a great day ahead!",
                "good night" : "Good night, sweet dreams! I too am feeling sleepy",
                "ok bye" : "See you soon!", 
                "bye" : "See you soon!", 
            };

function hoverin(x) {
  x.style.boxShadow = "none";
  x.style.color = "green";
  x.style.background= "white";
}

function hoverout(x) {
  x.style.boxShadow = "2px 2px 2px black";
  x.style.color = "white";
  x.style.background = "lime";
}

function check_eval(x){
  try{eval(x); return true}
  catch(err){return false}
}

let memory;
if(localStorage['ChatBot_memory']==undefined){
 memory = {
            "": "",
          };
localStorage.setItem('ChatBot_memory',JSON.stringify(memory));
}else{
 memory = JSON.parse(localStorage['ChatBot_memory'])
}

function f(t_show = document.getElementById("text").value) {

var t = t_show.toLowerCase();
let u;
  if(t == ""){} else{
  
   if(check_eval(t_show)){
     u = eval(t).toString();
   }
    
   else if (t=="what's the time now"||t=="what is the time now"){
     nd = new Date();
     h = nd.getHours();
     m = nd.getMinutes();
     if(h/12<1){meridian=' am'}else{meridian=' pm'}
     H=h%12;
     if(H<10){H='0'+H}
     if(m<10){m='0'+m}
     u = 'The time is '+H+':'+m+meridian;
   }
    
    
   else if(t.slice(0,13)=='remember that' && t.includes('is'||'are')){
  
     statement = t.slice(14,t.length);
     elems=statement.split(' is '||' are ');
     memory[elems[0]]=elems[1];

     localStorage.setItem('ChatBot_memory',JSON.stringify(memory));
     u='Got it. You can now ask me to "recall about '+elems[0]+'"';
   }
    
   else if(t.slice(0,12)=='recall about' && t.slice(13,t.length) in memory) {
         u = 'It is '+memory[t.slice(13,t.length)] ;
    }
    
   else if (t in all) {
         u = all[t] ;
    } else {
         u = "Sorry, I couldn't understand you ...";
    };
    
    
  var x1 = document.createElement("p"); x1.id = 'txt1';
//  var x2 = document.createElement("p"); x2.id = 'typing';
  var x3 = document.createElement("p"); x3.id = 'txt2';
  var y = document.createTextNode(t_show);
  var z = document.createTextNode(u);
//  var typing = document.createTextNode("Typing ...");
  x1.appendChild(y);
  document.getElementById("myList").appendChild(x1);
//  x2.appendChild(typing);
// document.getElementById("myList").appendChild(x2);
//  setTimeout(function(){document.getElementById("typing").remove(); }, 4100);
  x3.appendChild(z);
  document.getElementById("myList").appendChild(x3);

  document.getElementById("text").value = "";
  document.getElementById("but1").disabled = true;  setTimeout(function(){document.getElementById("but1").disabled = false; }, 4500);
  window.scrollTo(0, document.body.scrollHeight*2);   
    
texttospeech(u);

  }
}

const SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;
const SpeechGrammarList = window.SpeechGrammarList || webkitSpeechGrammarList;
const SpeechRecognitionEvent = window.SpeechRecognitionEvent || webkitSpeechRecognitionEvent;

started = false;

const colors = [ 'aqua', 'azure', 'beige', 'bisque', 'black', 'blue', 'brown', 'chocolate', 'coral', /* … */ ];
const grammar = `#JSGF V1.0; grammar colors; public <color> = ${colors.join(' | ')};`


const recognition = new SpeechRecognition();
const speechRecognitionList = new SpeechGrammarList();


speechRecognitionList.addFromString(grammar, 1);


recognition.grammars = speechRecognitionList;
recognition.continuous = false;
recognition.lang = 'en-US';
recognition.interimResults = false;
recognition.maxAlternatives = 1;


mic.onclick = () => {
  if(!started){recognition.start(); started=true;}
  else{recognition.stop(); started=false;}
  console.log('Ready to receive a color command.');
  mic.classList.add('live');
};



recognition.onresult = (event) => {
  const color = event.results[0][0].transcript;
  f(color);
  console.log(color);
  
  document.body.style.backgroundColor = color;
  console.log(`Confidence: ${event.results[0][0].confidence}`);
}


recognition.onspeechend = () => {
  recognition.stop(); started=false;
  mic.classList.remove('live');
}



recognition.onnomatch = (event) => {
  console.log("I didn't recognize that color.");
}

function texttospeech(txt){
utterance = new SpeechSynthesisUtterance(txt);
speechSynthesis.speak(utterance);
}
