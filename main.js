let __data = {'time' : {'etape1' : '','etape2' : '','etape3' : '','etape4' : '','etape5' : '','etape6' : '','global' : ''}};
let timer = null
let seconde = 0;
let minute = 0;
let objectToFind = ['Poire','poire','poire','poire','poire','poire'];
let etapes = ['etape1','etape2','etape3','etape4','etape5','etape6'];

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
        displayObjectToFind();
        startGame();
    });
}

function startGame(){
    $('.start_game').on('click', function() {
        console.log(etapes[0]);
        nextStep('card_before_start',etapes[0]);
        seconde = 0;
        initTimer();
    })   
}

function nextStep(oldstep,newstep){
    $('.' + oldstep).addClass('d-none');
    $('.' + newstep).removeClass('d-none');
}

function initTimer(){
    timer = setInterval(function() { 
        seconde++;
        if(seconde == 60){
            minute++;
            seconde = 0;
        }
        $('.minute').text(minute + ' min');
        $('.seconde').text(seconde + ' s');
     }, 1000);
}

function saveTimer(name){
    console.log("saveTimer = "+ seconde + "secondes" );
    __data['time'][name]=time;
    clearInterval(timer);
    seconde = 0;
    console.log(__data);
}

function checkclick(elem){    
    if(objectToFind[0] == elem.text()){
        saveTimer(elem.closest("section").attr('class'));
        objectToFind.shift();
        etapes.shift();
        if($(objectToFind).empty()){
            displayObjectToFind();
            nextStep('etape1','card_before_start');
        }
        else{
            displayEnd();
        }
    }
}

function displayObjectToFind(){
    $('.objectToFind').text(objectToFind[0])
}


$('document').ready(function() {
    submitForm();
    $('section nav a').on('click', function(){
        checkclick($(this));
    });
})