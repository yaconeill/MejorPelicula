$(document).ready(function () {
    var filmCatalog = [];
    var $catalog = $('#catalog')
    Film = function (name, id, img, rate) {
        this.name = name;
        this.id = id;
        this.img = img;
        this.rate = rate
    }
    isLogin();

    filmCatalog = JSON.parse(localStorage.getItem('tazas'));
    if (filmCatalog == null) {
        transferData();
    } else if (filmCatalog.length == 0) {
        transferData();
    } else {
        for (var i in films) {
            let film = new Film(films[i].name, films[i].id, films[i].img, films[i].rate);
            filmCatalog.push(film);
        };
    }

    for (let i = 0; i < filmCatalog.length; i++) {
        $catalog.append($('<div class="film">'));
        $catalog.children('div').eq(i).append(
            $(`<img src="${filmCatalog[i].img}" 
            id="${filmCatalog[i].id}" alt="${filmCatalog[i].name}" 
            title="${filmCatalog[i].name}" role="button" class="rate" tabindex="0" />`));
        // $catalog.children('div').eq(i).append($(`<input type="button"
        // value="Votar" class="btn btn-secondary rate"/>`));
    }

    var filmClickId;
    $rate = $('.rate');

    $rate.click(function () {
        openDetails($(this).attr('id'));
    });
    $rate.keyup(function (e) {
        if ($(".rate:focus") && e.keyCode == 13) {
            openDetails($(this).attr('id'));
        }
    });

    function openDetails(id) {
        localStorage.setItem('selectedFilm', id);
        window.location.replace("../pages/movieDetails.html");
    }
    localStorage.setItem('rating', JSON.stringify(filmCatalog));

    function transferData() {
        filmCatalog = [];
        films.forEach(function (e) {
            filmCatalog.push(e);
        });
    }
    $('#logout').click(function () {
        localStorage.removeItem('currentUser');
        location.reload();
    });
    
    // $('img').hover(function () {
    //     $(`img:not(#${$(this).attr('id')})`).css("filter", "blur(2px)");
    // },
    //     function () {
    //         $(`#catalog *:not(#${$(this).attr('id')})`).css("filter", "blur(0px)");
    //     });
});