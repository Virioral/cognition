let __data = {};
$('document').ready(function() {
    $('form').on('submit', function(e) {
        e.preventDefault();
        const formData = new FormData(e.target);
        formData.forEach((value, key) => __data[key] = value);
        $('.card_formulaire').addClass('d-none');
        $('.card_presentation').removeClass('d-none');
    });
    $('.before_start').on('click', function() {
        $('.card_formulaire').addClass('d-none');
        $('.card_before_start').removeClass('d-none');
    });

    $('.start_game').on('click', function() {
        $('.card_before_start').addClass('d-none');
        $('.etape1').removeClass('d-none');
    })
})