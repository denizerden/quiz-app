function Question (text,choices,answer){
    this.text = text;
    this.choices = choices;
    this.answer = answer;
}
//prototype

Question.prototype.checkAnswer = function(answer){
    return this.answer ===answer;
}

//quiz constructor

function Quiz(questions){

    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;

}

//quiz prototype

Quiz.prototype.getQuestion = function(){
    return this.questions[this.questionIndex];
}

//quiz isFinish
Quiz.prototype.isFinish = function(){
    return this.questions.length === this.questionIndex;
}

//quiz guess
Quiz.prototype.guess = function (answer){
    let question = this.getQuestion();

    if(question.checkAnswer(answer)){
        this.score++;
    }
    this.questionIndex++;
}

let q1 = new Question(" İlk Çağ Uygarlıklarından Hangisi Yazıyı İcat Etmiştir?",["Hititler","Elamlar","Sümerler","Urartular"],"Sümerler");
let q2 = new Question(" Bir Sebepten Dolayı Tek Kulağına Küpe Takan Osmanlı Padişahı Kimdir? ",["Kanuni Sultan Süleyman","Yavuz Sultan Selim ","Orhan Bey ","Fatih Sultan Selim "],"Yavuz Sultan Selim");
let q3 = new Question(" Hangi yabancı futbolcu Fenerbahçe forması giymiştir?",["Simoviç","Schumacher","Prekazi"],"Schumacher");
let q4 = new Question("Magna Carta hangi ülkenin kralıyla yapılmış bir sözleşmedir?",["İngiltere","İspanya","Fransa"],"İngiltere");
let q5 = new Question(" Bir işin uygun ve kolay olduğunu belirtmek için hangisi söylenir?",["Burnuma göre","Kaşıma göre","Bıyığıma göre","Dişime göre"],"Dişime göre");
let q6 = new Question(" Atasözüne göre 'gönülden de ırak' olan kimdir?",["Arabası tamircide olan","Evi uzak olan","Gözden ırak olan","İş yeri karşıda olan"],"Gözden ırak olan");
let q7 = new Question(" Hangisi, bazı futbol takımlarının, taraftarları için kullandıkları bir ifadedir?",["12.Adam","Yardımcı eleman","Canlı destek","Yedek kuvvet"],"12.Adam");
let q8 = new Question("'Horozu çok olan köyde' şeklinde başlayan atasözünün devamı nasıldır?",["Sabah erken olur","Akşam geç olur","Akşam erken olur","Sabah geç olur"],"Sabah geç olur");
let q9 = new Question(" 'Gıpgıcır' ne anlama gelir?",["Yepyeni","Tozpembe","Sapsarı","Çok eski"],"Yepyeni");
let q10 = new Question(" Çubuklara geçirilmiş küçük bayraklarla işaretlenmiş bir parkurda, belli kurallara göre ve zikzaklar çizere yapılan kayak yarışı hangisidir?",["Skeleton","Pentatlon","Slalom","Maraton"],"Slalom");
let q11 = new Question("Gövdesi sarı veya kirli sarı; yelesi, kuyruğu ve bacağının alt kısmındaki kılları koyu renkte olan atlar için kullanılan ifade hangisidir?",["Doru","Kula","Yağız","Seki"],"Kula");
let q12 = new Question("Klasik bir çengel bulmacada, bir kutucukta en fazla kaç farklı soru sorulur?",["1","2","3","4"],"2");
let q13= new Question("Tarik boyunca İngiltere tahtına hangi adda bir kral çıkmamıştır?",["Arthur","Richard","Henry","George"],"Arthur");



let questions = [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10,q11,q12,q13];

//Start Quiz
$(document).ready(function(){
    let quiz = new Quiz(questions);

    loadQuestion();
    
    function loadQuestion(){
        if(quiz.isFinish()){
            showScore();
        }
        else{
            let question = quiz.getQuestion();
            let choices = question.choices;
            document.querySelector('#question').textContent = question.text;
            console.log("hello");
            $('#buttons').empty();
            for(let i =0; i<choices.length;i++){
                
                $('#buttons').append(`<button id="btn-${i}" class=" btn btn-primary m-2">
                <span id="choice-${i}">
    
    
                </span>
                
            </button>`)
                let element = document.querySelector(`#btn-${i}`);
                console.log(element);
                element.append (choices[i]);
    
                guess('btn-'+i,choices[i]);
                console.log(choices[i]);
            }
            showProgress();
        }
    }
    
    function guess(id,guess){
    let btn = document.getElementById(id);
    btn.onclick = function(){
        quiz.guess(guess);
        loadQuestion();
    }
    
    }
    
    function showScore(){
        let html = `<h2>Score</><h4>${quiz.score}</h4>`;
        document.querySelector('.card-body').innerHTML = html;
    }
    
    function showProgress(){
        let totalQuestion = quiz.questions.length;
        let questionNumber = quiz.questionIndex+1;
        document.querySelector('#progress').innerHTML= 'Question ' + questionNumber + ' of ' + totalQuestion ;
    }
});
