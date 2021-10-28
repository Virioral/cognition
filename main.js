let __data = {};

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
    });
    startGame();
}

function startGame(){
    $('.start_game').on('click', function() {
        nextStep('card_before_start','etape1');
    })
}

function nextStep(oldstep,newstep){
    $('.' + oldstep).addClass('d-none');
    $('.' + newstep).removeClass('d-none');
}


function initTimer(){
}

function saveTimer(){
}


$('document').ready(function() {
    submitForm();
    console.log(__data);
      
})