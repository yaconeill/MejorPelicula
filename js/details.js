$(document).ready(function () {
    User = function (name, phone, email, selectedFilmId) {
        this.name = name;
        this.phone = phone;
        this.email = email;
        this.selectedFilmId = selectedFilmId;
    }
    isLogin();
    var userName = localStorage.getItem('currentUser');
    var $section = $('#section');
    isNewUser(userName, $section);
    var userList = JSON.parse(localStorage.getItem('userList'));
    if (userList == null) {
        userList = [];
    } else if (userList.length == 0) {
        userList = [];
    }

    var selectedFilm = localStorage.getItem('selectedFilm');
    var filmCatalog = JSON.parse(localStorage.getItem('rating'));

    var $film = $(this).prev().attr('id');
    var $film = $(this).attr('id');

    var $movieDetails = $('#movieDetails');
    var tmpFilm;
    filmCatalog.find(o => {
        if (o.id === selectedFilm)
            tmpFilm = o;
    });
    $movieDetails.children().remove();
    $movieDetails.append($('<div class="film">'));
    $('.title').text(tmpFilm.name);
    $movieDetails.children('div').append(
        $(`<img src="../${tmpFilm.img}" title="${tmpFilm.name}" alt="${tmpFilm.name}" id="${tmpFilm.id}"/>`));
    $('.sinopsis').text(tmpFilm.sinopsis)

    var $form = $('#register');
    $form.submit(function () {
        $userData = $form.find('input');
        userName = $userData[0].value;
        let user = new User($userData[0].value, $userData[1].value, $userData[2].value, '');
        userList.push(user);
        localStorage.setItem('userList', JSON.stringify(userList));
        localStorage.setItem('currentUser', $userData[0].value);
        // localStorage.setItem('selectedFilm', selectedFilm);
        isLogin();
        $section.children().remove();
        isNewUser(userName, $section);
        location.reload();
    });

    $('#logout').click(function () {
        localStorage.removeItem('currentUser');
        location.reload();
    });

    $('#vote').click(function () {
        if (userList.find(o => o.selectedFilm == null) != null) {
            let filmClickId = $('img').attr('id');
            let film;
            filmCatalog.find(o => {
                if (o.id === filmClickId) {
                    o.rate += 1;
                    film = o.name;
                }
            });
            userList.find(o => {
                if (o.name === userName) {
                    o.selectedFilm = filmClickId;
                }
            });
            localStorage.setItem('rating', JSON.stringify(filmCatalog));
            localStorage.setItem('userList', JSON.stringify(userList));
            alert('Ha votado por ' + film + '. Gracias por participar. Se autoredigirirá en 3 segundos.');
            setTimeout(function () {
                window.location.replace("../pages/results.html");
            }, 3000);

        } else {
            alert('Solo se puede votar una vez');
        }

        // $('#confirmVote').modal('hide');
        // $('.rate').prop('disable', true).addClass('disabled');
    });
});

function isNewUser(userName, $section) {
    if (userName != null) {
        $section.children().remove();
        $section.append($('<div class="col-md-1 mx-auto">'));
        $section.children('div').append($(`<input type="button"
        value="Votar" id="vote" class="btn btn-success rate"/>`));
    }
}
