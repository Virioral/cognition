let __data = {'time' : {'etape1' : '','etape2' : '','etape3' : '','etape4' : '','etape5' : '','etape6' : ''}};
let timer = setInterval(function() { time++ }, 1000);
let time = 0;
let objectToFind = ['Poire','poire','poire','poire','poire','poire'];

function submitForm(){
    $('form').on('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.forEach((value, key) => __data[key] = value);
        nextStep('card_formulaire','card_presentation');
        beforeStart();
    });
}

function beforeStart(){
    $('.before_start').on('click', function() {
        nextStep('card_presentation','card_before_start');
        startGame();
    });
}

function startGame(){
    $('.start_game').on('click', function() {
        nextStep('card_before_start','etape1');
        time = 0;
    })   
}

function nextStep(oldstep,newstep){
    $('.' + oldstep).addClass('d-none');
    $('.' + newstep).removeClass('d-none');
}

function initTimer(){
    timer = setInterval(function() {
        time++;    
    }, 1000);
}

function saveTimer(name){
    console.log("saveTimer = "+ timer + "secondes" );
    __data['time'][name]=timer;
    console.log(timer);
    clearInterval(timer);
    time = 0;
}

function checkclick(elem){    
    if(objectToFind[0] == elem.text()){
        saveTimer(elem.closest("section").attr('class'));
        objectToFind.shift();
    }
}


$('document').ready(function() {
    submitForm();
    $('section nav a').on('click', function(){
        checkclick($(this));

    });
})