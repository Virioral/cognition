/**
 * Global Variables
 */
let __data = {'orderRes' : [], 'res': {'etape1': {'style' : 'T','typemenu':'pulldown'}, 'etape2': {'style' : 'T','typemenu':'sidebar'}, 'etape3': {'style' : 'TP','typemenu':'pulldown'}, 'etape4': {'style' : 'TP','typemenu':'sidebar'}, 'etape5': {'style' : 'P','typemenu':'pulldown'}, 'etape6': {'style' : 'P','typemenu':'sidebar'}, 'global': {'timer':0} } };
let timer = null
let seconde = 0;
let minute = 0;
let mili = 0;
let etapes = ['etape1', 'etape2', 'etape3', 'etape4', 'etape5', 'etape6'];
let objectToFind = [];
let DicoObjectToFind = { 
    "etape1" : ["Pains","Chips","Huiles","Oeufs","Fûts pression","Crèmes desserts","Thés"],
    "etape2" : ["Pains","Chips","Huiles","Oeufs","Fûts pression","Crèmes desserts","Thés"],
    "etape3" : ["Crêpière","Manette PS4","Petit réfrigérateur","Expresso broyeur Krups","Karcher","Table à repasser","TV 8K","Appareil photo bridge","Plancha"],
    "etape4" : ["Crêpière","Manette PS4","Petit réfrigérateur","Expresso broyeur Krups","Karcher","Table à repasser","TV 8K","Appareil photo bridge","Plancha"],
    "etape5" : ["Jeux et balle pour chien","Climatiseur mobile","Portail","Salon de jardin","Colle","Interrupteur et prise étanche","Alarme maison","VMC","Robot de piscine"],
    "etape6" : ["Jeux et balle pour chien","Climatiseur mobile","Portail","Salon de jardin","Colle","Interrupteur et prise étanche","Alarme maison","VMC","Robot de piscine"]
};

/**
 * This function will display the statement of our experience
 */
function beforeStart() {
    $('.before_start').on('click', function() {
        nextStep('card_presentation', 'card_before_start');
        displayObjectToFind();
        startGame();
    });
}

/**
 * This function will initiate the experience
 */
function startGame() {
    $('.start_game').on('click', function() {
        nextStep('card_before_start', etapes[0]);
        seconde = 0;
        minute = 0;
        console.log(etapes[0]);
        initMenu(etapes[0]);
        $('.Obj').removeClass('d-none');
        initTimer();
    })
}

/**
 * This function will hide the old step and show the next one
 * 
 * @param {String} oldstep 
 * @param {String} newstep 
 */
function nextStep(oldstep, newstep) {
    $('.' + oldstep).addClass('d-none');
    $('.' + newstep).removeClass('d-none');
}


/**
 * This function will initiate and reset the timer 
 */
function initTimer() {
    timer = setInterval(function() {
        mili++;
        if (mili == 10) {
            seconde++;
            mili = 0;
        }
        if (seconde == 60) {
            minute++;
            seconde = 0;
        }
        $('.minute').text(minute + ' min');
        $('.seconde').text(seconde + ' s');
    }, 100);
}

/**
 * This function will save the timer for each step
 * 
 * @param {String} name 
 */
function saveTimer(name) {
    __data['res'][name]['timer'] = (60 * minute) + seconde + (mili == 0 ? 0 : mili/10);
    __data['res']['global']['timer'] = __data['res']['global']['timer'] + ((60 * minute) + seconde + (mili == 0 ? 0 : mili/10));
    __data['res'][name]['etape'] = name; 
    __data['orderRes'].push(__data['res'][name]);
    clearInterval(timer);
    seconde = 0;
    mili = 0;
    minute = 0;
}


/**
 * This function will compare the object to find and the data selected by the user. Then it will initiate the next step    
 * 
 * @param {Object} elem 
 */
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

/**
 * This function will display in bottom right the object to find
 */
function displayObjectToFind() {
    $('.objectToFind').text(objectToFind[0])
}

/**
 * This function will create dynamically the list of object to find for each step 
 */
function buildObjectToFind(){
    for(var etape in etapes){
        console.log(etapes[etape]);
        var dicoObj = DicoObjectToFind[etapes[etape]];
        var obj = dicoObj[Math.floor(Math.random() * dicoObj.length)];
        while(objectToFind.includes(obj)){
            var obj = dicoObj[Math.floor(Math.random() * dicoObj.length)];
        }
        objectToFind.push(obj);
    }
}

/**
 * This function will hide the last step and show the result screen
 * 
 * @param {String} oldstep 
 */
function displayEnd(oldstep) {
    $('.' + oldstep).addClass('d-none');
    $('.Obj').addClass('d-none');
    $('.card_end').removeClass('d-none');
    for (var elem in __data.res) {
        var quotient = 0;
        var remainder = 0;
        if (__data.res[elem]['timer'] > 59) {
            var quotient = Math.floor(__data.res[elem]['timer'] / 60);
            var remainder = __data.res[elem]['timer'] % 60;
            $('.score_' + elem).text(quotient + (quotient > 1 ? ' minutes ' : ' minute ') + remainder + (remainder > 1 ? ' secondes' : ' seconde'));

        } else {
            $('.score_' + elem).text(__data.res[elem]['timer'] + ' secondes');
        }
    }
    console.log(__data);
    __data['timerGlobal'] = __data['res']['global'];
    delete __data['res'];
    savedata(__data);
}

/**
 * This function will initiate the creation of the menu with the type and style predefined
 * 
 * @param {String} step
 */
function initMenu(step) {
    createMenu(step, __data['res'][step]['typemenu'], __init_data);
    $('body').on('click', 'a', function() {
        checkclick($(this));
    });
}

$('document').ready(function() {
    etapes = etapes.sort(sortRandom);
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
            rgpd: { required: "Veuillez accepter le règlement général de protection des données." },
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

/**
 * This function will automatically generate all the menus and styles with json parameter 'data'
 * 
 * @param {String} step 
 * @param {string} type 
 * @param {JSON} data 
 */
function createMenu(step, type, data) {
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

/**
 * This function will sort a list randomly
 * 
 * @returns integer
 */
function sortRandom() {
    return 0.5 - Math.random();
}

/**
 * This function will send our data on the server
 * @param {json} data 
 */
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


/**
 * This function will check the width of the user screen and disabled the experience if it didn't respect our chart 
 */
function checkWidthScreen() {
    let current_width = $(window).width();
    if (current_width < 1000) {
        alert('Votre taille d\'écran n\'est pas suffisante pour effectuer l\'expérience, veuillez agrandir votre fenêtre ou changer d\'appareil si cela n\'est pas possible.')
        $('.card_formulaire').addClass('d-none');
    } else {
        __data["taille_ecran"] = current_width;
    }
}