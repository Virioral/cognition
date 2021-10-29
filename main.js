let __data = {'time' : {'etape1' : '','etape2' : '','etape3' : '','etape4' : '','etape5' : '','etape6' : '','global' : ''}};
let timer = null
let seconde = 0;
let minute = 0;
let objectToFind = ['Poire','poire','poire','poire','poire','poire'];
let etapes = ['etape1','etape2','etape3','etape4','etape5','etape6'];

function submitForm() {
    $('form').on('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.forEach((value, key) => __data[key] = value);
        nextStep('card_formulaire', 'card_presentation');
        beforeStart();
    });
}

function beforeStart() {
    $('.before_start').on('click', function() {
        nextStep('card_presentation','card_before_start');
        displayObjectToFind();
        startGame();
    });
}

function startGame() {
    $('.start_game').on('click', function() {
        console.log(etapes[0]);
        nextStep('card_before_start',etapes[0]);
        seconde = 0;
        initTimer();
    })   
}

function nextStep(oldstep, newstep) {
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
    __data['time'][name]=60*minute + seconde;
    clearInterval(timer);
    seconde = 0;
    console.log(__data);
}

function checkclick(elem) {
    if (objectToFind[0] == elem.text()) {
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
    $('section nav a').on('click', function() {
        checkclick($(this));
    });
})


let data = {
    'etape1': {
        'Boissons': {
            'Cafés et boissons chaudes': [
                'Cafés et boissons chaudes Bio',
                'Cafés en dosettes',
                'Cafés moulus ou en grains',
                'Cafés solubles et chicorés',
                'Poudres chocolats',
                'Thés',
                'Infusions et tisanes',
                'Thés glacés',
            ],
            'Eaux et laits': [
                'Eaux et laits',
                'Eaux plates',
                'Eaux gazeuses',
                'Eaux arômatisées',
                'Laits entiers',
                'Laits demi-écrémés',
                'Laits écrémés',
                'Laits concentrés, spéciaux et arômatisés',
                'Laits frais',
            ],
            'Jus de fruits et légumes': [
                'Jus de fruits et légumes',
                'Jus d\'orange',
                'Jus de pomme',
                'Jus de pamplemousse',
                'Jus de fruits exotiques',
                'Jus multi-fruits',
                'Autres jus de fruits',
                'Jus de fruits et légumes frais',
                'Jus de légumes',
                'Boissons soja et céréales',
                'Jus de fruits et légumes Bio',
            ],
            'Sirops et boissons aux fruits': [
                'Sirops',
                'Concentrés',
                'Eaux arômatisées',
                'Thés glacés',
                'Boissons plates aux fruits',
            ],
            'Colas et boissons gazeuses': [
                'Colas',
                'Limonades, limes et tonics',
                'Boissons gazeuses aux fruits',
                'Boissons énergisantes',
            ],
            'Alcools et apéritifs': [
                'Alcools et apéritifs',
                'Whiskies',
                'Alcools blancs et cocktails',
                'Apéritifs et anisés',
                'Liqueurs et crèmes',
                'Digestifs',
                'Apéritifs sans alcool'
            ],
            'Bières': [
                'Cave à bières',
                'Bières blondes',
                'Bières du monde et aromatisées',
                'Bières ambrées et brunes',
                'Bières d\'Abbaye et de dégustation',
                'Bières blanches et fruitées',
                'Bières sans alcool',
                'Fûts pression',
                'Panachés'
            ]

        }
    },
}

function createMenu(step = 'etape1', type = 'sidebar') {
    let str = '';
    for (let cat in data[step]) {
        let caretIcon = (type == 'sidebar') ? '<i class="fas fa-caret-right"></i>' : '<i class="fas fa-caret-down"></i>';
        str += `<li><a href="#">${cat+caretIcon}</a><ul>`;
        for (let subcat in data[step][cat]) {
            str += `<li><a href="#">${subcat}  <i class="fas fa-caret-right"></i></a><ul>`;
            for (let index in data[step][cat][subcat]) {
                let article = data[step][cat][subcat][index];
                str += `<li><a href="#">${article}</a></li>`;
            }
            str += "</ul></li>";
        }
        str += "</ul></li>";
    }

    if (type == 'sidebar') {
        $(`.${step}`).append(`<nav class="sidebar"><ul>${str}</ul></nav>`);
    } else {
        $(`.${step}`).append(`<nav class="navbar navbar-light bg-light nav-dropdown"><ul>${str}</ul></nav>`);
    }

}