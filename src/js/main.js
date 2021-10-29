let __data = { 'time': { 'etape1': '', 'etape2': '', 'etape3': '', 'etape4': '', 'etape5': '', 'etape6': '', 'global': '' } };
let timer = null
let seconde = 0;
let minute = 0;
let objectToFind = ['Eaux plates', 'poire', 'poire', 'poire', 'poire', 'poire'];
let etapes = ['etape1', 'etape2', 'etape3', 'etape4', 'etape5', 'etape6'];

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
        nextStep('card_presentation', 'card_before_start');
        displayObjectToFind();
        startGame();
    });
}

function startGame() {
    $('.start_game').on('click', function() {
        console.log(etapes[0]);
        nextStep('card_before_start', etapes[0]);
        seconde = 0;
        initMenu(etapes[0]);
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
    clearInterval(timer);
    seconde = 0;
}

function checkclick(elem) {
    if (objectToFind[0] == elem.text()) {
        saveTimer(elem.closest("section").attr('class'));
        objectToFind.shift();
        etapes.shift();
        if ($(objectToFind).empty()) {
            displayObjectToFind();
            nextStep('etape1', 'card_before_start');
        } else {
            displayEnd();
        }
    }
}

function displayObjectToFind() {
    $('.objectToFind').text(objectToFind[0])
}

function displayEnd() {
    $('.etapes2').addClass('d-none');
    $('.end').removeClass('d-none');
    console.log(__data);
}

function initMenu(step) {
    createMenu(step, 'pulldown', __init_data);
    $('body').on('click', 'a', function() {
        checkclick($(this));
    });
}

$('document').ready(function() {
    submitForm();
})

function createMenu(step = 'etape1', type = 'sidebar', data) {
    let str = '';
    console.log(data);
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