let __data = { 'time': { 'etape1': 0, 'etape2': 0, 'etape3': 0, 'etape4': 0, 'etape5': 0, 'etape6': 0, 'global': 0 } };
let timer = null
let seconde = 0;
let minute = 0;
let etapes = ['etape1', 'etape2', 'etape3', 'etape4', 'etape5', 'etape6'];
let objectToFind = [];
let DicoObjectToFind = { 
    "etape1" : ["Pains","Chips","Huiles","Oeufs","Fûts pression","Crèmes dessert","Thés"],
    "etape2" : ["Pains","Chips","Huiles","Oeufs","Fûts pression","Crèmes dessert","Thés"],
    "etape3" : ["Crêpière","Manette PS4","Petit réfrigérateur","Expresso broyeur Krups","Karcher","Table à repasser","TV 8K","Appareil photo bridge","Plancha"],
    "etape4" : ["Crêpière","Manette PS4","Petit réfrigérateur","Expresso broyeur Krups","Karcher","Table à repasser","TV 8K","Appareil photo bridge","Plancha"],
    "etape5" : ["Jeux et balle pour chien","Climatiseur mobile","Portail","Salon de jardin","Colle","Interrupteur et prise étanche","Alarme maison","VMC","Robot de piscine"],
    "etape6" : ["Jeux et balle pour chien","Climatiseur mobile","Portail","Salon de jardin","Colle","Interrupteur et prise étanche","Alarme maison","VMC","Robot de piscine"]
};


//save taille ecran + type


function beforeStart() {
    $('.before_start').on('click', function() {
        nextStep('card_presentation', 'card_before_start');
        displayObjectToFind();
        startGame();
    });
}

function startGame() {
    $('.start_game').on('click', function() {
        nextStep('card_before_start', etapes[0]);
        seconde = 0;
        minute = 0;
        initMenu(etapes[0]);
        $('.Obj').removeClass('d-none');
        initTimer();
    })
}

function nextStep(oldstep, newstep) {
    $('.' + oldstep).addClass('d-none');
    $('.' + newstep).removeClass('d-none');
}

function initTimer() {
    timer = setInterval(function() {
        seconde++;
        if (seconde == 60) {
            minute++;
            seconde = 0;
        }
        $('.minute').text(minute + ' min');
        $('.seconde').text(seconde + ' s');
    }, 1000);
}

function saveTimer(name) {
    __data['time'][name] = 60 * minute + seconde;
    __data['time']['global'] = __data['time']['global'] + (60 * minute + seconde);
    clearInterval(timer);
    seconde = 0;
}

function checkclick(elem) {
    if (objectToFind[0] == elem.text()) {
        saveTimer(elem.closest("section").attr('class'));
        objectToFind.shift();
        var oldstep = etapes.shift();
        if ($(objectToFind).length != 0) {
            displayObjectToFind();
            $('.Obj').addClass('d-none');
            nextStep(oldstep, 'card_before_start');
        } else {
            displayEnd(oldstep);
        }
    }
}

function displayObjectToFind() {
    $('.objectToFind').text(objectToFind[0])
}

function buildObjectToFind(){
    for(var etape in DicoObjectToFind){
        var dicoObj = DicoObjectToFind[etape];
        var obj = dicoObj[Math.floor(Math.random() * dicoObj.length)];
        while(objectToFind.includes(obj)){
            var obj = dicoObj[Math.floor(Math.random() * dicoObj.length)];
        }
        objectToFind.push(obj);
    }
}

function displayEnd(oldstep) {
    $('.' + oldstep).addClass('d-none');
    $('.Obj').addClass('d-none');
    $('.card_end').removeClass('d-none');
    for (var elem in __data.time) {
        var quotient = 0;
        var remainder = 0;
        if (__data.time[elem] > 59) {
            var quotient = Math.floor(__data.time[elem] / 60);
            var remainder = __data.time[elem] % 60;
            $('.score_' + elem).text(quotient + ' minutes ' + remainder + ' seconde');

        } else {
            $('.score_' + elem).text(__data.time[elem] + ' seconde');
        }
    }
    savedata(__data);
}

function initMenu(step) {
    var typemenu = 'pulldown';
    if (Array('etape2', 'etape4', 'etape6').includes(step)) {
        typemenu = 'sidebar';
    }
    createMenu(step, typemenu, __init_data);
    $('body').on('click', 'a', function() {
        checkclick($(this));
    });
}

$('document').ready(function() {
    buildObjectToFind();
    //Validator
    checkWidthScreen();
    // configure your validation
    $("form").validate({
        rules: {
            tranche_age: { required: true },
            frequence_utilisation: { required: true },
            rgpd: { required: true }
        },
        messages: {
            tranche_age: { required: "Veuillez sélectionner votre tranche d'âge." },
            frequence_utilisation: { required: "Veuillez sélectionner votre fréquence d'utilisation." },
            rgpd: { required: "Veuillez accepter les conditions d'utilisations." },
        },
        errorPlacement: function(label, element) {
            if (element[0].type == "checkbox") {
                label.addClass('errorMsq');
                label.insertAfter(element.parent());
            } else {
                label.insertAfter(element);
            }
        },
        submitHandler: function(form) {
            const formData = new FormData(form);
            formData.forEach((value, key) => __data[key] = value);
            nextStep('card_formulaire', 'card_presentation');
            beforeStart();
        }
    });
})

function createMenu(step = 'etape1', type = 'sidebar', data) {
    let str = '';
    var title = Object.keys(data[step]);
    var title = title.sort(sortRandom);
    for (let cat of title) {
        let id = cat.replaceAll(' ', '');
        let caretIcon = (type == 'sidebar') ? '<i class="fas fa-caret-right"></i>' : '<i class="fas fa-caret-down"></i>';

        let indexPicto = cat.replaceAll(' ', '');
        let link;
        if (Array('etape3', 'etape4').includes(step)) {
            link = `<a href="#"><img src='${__init_picto[indexPicto]}'>${cat+caretIcon}</a>`;
        } else if (Array('etape5', 'etape6').includes(step)) {
            link = `<a href="#"><img src='${__init_picto[indexPicto]}'>${caretIcon}</a>`;
        } else {
            link = `<a href="#">${cat+caretIcon}</a>`
        }
        str += `<li>${link}<ul>`;


        var cate = Object.keys(data[step][cat]);
        var cate = cate.sort(sortRandom);

        for (let subcat of cate) {
            str += `<li><a href="#">${subcat}  <i class="fas fa-caret-right"></i></a><ul>`;

            var obj = Object.keys(data[step][cat][subcat]);
            var obj = obj.sort(sortRandom);

            for (let index of obj) {
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

function sortRandom(a, b) {
    return 0.5 - Math.random();
}

function savedata(data) {

    // Creating a XHR object
    let xhr = new XMLHttpRequest();
    let url = "/m1-miashs-2021-s1/aingu2Sh/savedata.php";

    // open a connection
    xhr.open("POST", url, true);

    // Set the request header i.e. which type of content you are sending
    xhr.setRequestHeader("Content-Type", "application/json");

    // Sending data with the request
    xhr.send(JSON.stringify(data));
}

function checkWidthScreen() {
    let current_width = $(window).width();
    if (current_width < 1200) {
        alert('Votre taille d\'écran n\'est pas suffisante pour effectuer l\'expérience, veuillez agrandir votre fenêtre ou changer d\'appareil si cela n\'est pas possible.')
        $('.card_formulaire').addClass('d-none');
    } else {
        __data["taille_ecran"] = current_width;
    }
}