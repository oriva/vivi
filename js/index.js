$(document).ready(function ($) {
    $.iMissYou({
        title: "ViVi ждет тебя!"
        , favicon: {
            enabled: true
            , src: '/faviconGrey.png?'
        }
    });
});

let sbmt = (e,_this)=>{
    e.preventDefault();
    let butClick = _this.find('.reg-form__button');
    let dataInfo = _this.serialize();
    let phone = _this.find('input[name=phone]');
    if (phone.val().length !== 16) {
        alert('Введите номер телефона полностью');
    } else {
        butClick.html('Отправка...');
        butClick.addClass('load');
        $.ajax({
            type: "POST", //Метод отправки
            url: "/forms/send.php", //путь до php фаила отправителя
            data: dataInfo
            , success: () => {
                console.log(phone);
                if($('.form-modal').length>0) {
                    let divClose = $('.form-modal')[0];
                    divClose.classList.remove('show');
                    setTimeout(() => {
                        divClose.addEventListener('transitionend', () => divClose.parentNode.removeChild(divClose));
                    }, 10);
                }
                let valName = _this.find('input[name="site"]');
                switch(valName) {
                    case 'Главная страница':
                        ym(53563249, 'reachGoal', 'form-index');
                        break;
                    case 'Мастер':
                        ym(53563249, 'reachGoal', 'form-master');
                        break;
                    case 'Салон':
                        ym(53563249, 'reachGoal', 'form-salon');
                        break;
                    case 'Клиент':
                        ym(53563249, 'reachGoal', 'form-client');
                        break;
                    case 'Политика конфиденциальности':
                        ym(53563249, 'reachGoal', 'form-legal');
                        break;
                    case 'Страница 404':
                        ym(53563249, 'reachGoal', 'form-404');
                        break;
                    default:
                        console.log('Немного не так идет');
                        break;
                }
                _this.trigger('reset');
                butClick.html('Отправлено');
                butClick.removeClass('load');
                let div = document.createElement('div');
                div.className = 'modal-send';
                div.innerHTML = '\t<div class="modal-send__bg"></div>\n' + '\t<div class="modal-send__content">\n' + '\t\t<div class="close">\n' + '\t\t\t<img src="/img/close.svg" alt="">\n' + '\t\t</div>\n' + '\t\t<span class="text-middle text-orange padding-bottom-small">Благодарим за оставленную заявку!</span>\n' + '\t\t<span>Проверьте свою почту для получения дополнительной информации.</span>\n' + '\t</div>';
                let body = document.querySelector('body');
                body.appendChild(div);
                setTimeout(() => {
                    div.classList.add('show');
                }, 10);
                setTimeout(() => {
                    div.classList.remove('show');
                    setTimeout(() => {
                        div.addEventListener('transitionend', () => div.parentNode.removeChild(div));
                    }, 10);
                    butClick.html('Отправить');
                }, 3000);
                div.addEventListener('click', (e) => {
                    if (e.target.closest('.close') || e.target.classList.contains('modal-send__bg')) {
                        div.classList.remove('show');
                        setTimeout(() => {
                            div.addEventListener('transitionend', () => div.parentNode.removeChild(div));
                        }, 10);
                    }
                });
            }
            ,
        });
    }

};

let maskPhone = () => {
    let tel = $('input[name=phone]');
    tel.mask('+7(999)999-99-99');

    tel.on('focus', function () {
        if ($(this).val().length === 0) {
            $(this).val('+7(');
        }
    });
    tel.on('focusout', function () {
        if ($(this).val().length <= 4) {
            $(this).val('');
        }
    });

    tel.keydown(function (e) {
        if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 110, 190]) !== -1 ||
            (e.keyCode === 65 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 67 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode === 88 && (e.ctrlKey === true || e.metaKey === true)) ||
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            return;
        }

        if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
            e.preventDefault();
        }
    });
};
maskPhone();

$(document).on('click', '.js-modal-form', e => {
    e.preventDefault();
    let dataType = e.target.closest('a').dataset.page;
    let div = document.createElement('div');
    div.className = 'modal-send form-modal';
    div.innerHTML = ' <div class="modal-send__bg"></div>\n' +
        '    <div class="modal-send__content">\n' +
        '        <div class="close">\n' +
        '            <img src="/img/close.svg" alt="">\n' +
        '        </div>\n' +
        '        <div class="text-center padding-bottom-large">\n' +
        '            <span class="text-large d-block padding-bottom-small">Регистрация займёт <span class="text-orange">2 минуты</span></span>\n' +
        '            <span>Станьте одним из первых, кто установит приложение!</span>\n' +
        '        </div>\n' +
        '        <div class="container-fluid">\n' +
        '            <div class="row align-items-center">\n' +
        '                <div class="col-md-6 col-12">\n' +
        '                    <span class="form__text-info">Заполните форму и мы вышлем вам индивидуальную ссылку на скачивание к самому старту выхода приложения.</span>\n' +
        '                </div>\n' +
        '                <div class="col-md-6 col-12">\n' +
        '                    <form action="" class="reg-form form-modal__form">\n' +
        '                        <input type="text" hidden name="about-form" value="Всплывающая форма">\n' +
        '                        <input type="text" hidden name="site" value="' + dataType + '">\n' +
        '                        <label>Ваше имя</label>\n' +
        '                        <input type="text" placeholder="Анастасия" class="reg-form__input" name="name" required>\n' +
        '                        <label>Ваш телефон</label>\n' +
        '                        <input type="tel" placeholder="+7 999 888 77 66" class="reg-form__input" name="phone" required>\n' +
        '                        <button class="reg-form__button good-button">Отправить</button>\n' +
        '                        <div class="political">\n' +
        '                            <div class=\'checkbox-ios\'>\n' +
        '                                <input class=\'checkbox-ios__toggle\' id=\'checkboxQuestion\' name=\'checkboxQuestion\' type=\'checkbox\' required checked>\n' +
        '                                <label class=\'checkbox-ios__label\' for=\'checkboxQuestion\'></label>\n' +
        '                            </div> <span class="political__text">Я согласен с условиями политики\n' +
        '\t\t\t\t\t\t\t\t\t<br>конфиденциальности</span> </div>\n' +
        '                    </form>\n' +
        '                </div>\n' +
        '            </div>\n' +
        '        </div>\n' +
        '    </div>';
    let body = document.querySelector('body');
    body.appendChild(div);
    setTimeout(() => {
        div.classList.add('show');
    }, 10);
    maskPhone();
    div.addEventListener('click', (e) => {
        if (e.target.closest('.close') || e.target.classList.contains('modal-send__bg')) {
            div.classList.remove('show');
            setTimeout(() => {
                div.addEventListener('transitionend', () => div.parentNode.removeChild(div));
            }, 10);
        }
    });
    $('.form-modal__form').on('submit', function (e) {
        sbmt(e, $(this));
    });
});

$('form').on('submit', function (e) {
    sbmt(e, $(this));
});

'use strict';

window.onload = () => {
    let indexSlideNews = $('.what-is-vivi__mob-slider');
    if (window.innerWidth > 768) {
        let scene = $('.parallax')
            , parallax = [];
        for (let i = 0; i < scene.length; i++) {
            parallax[i] = new Parallax(scene[i], {
                relativeInput: true
                , hoverOnly: true
            });
        }
    }
    else if (indexSlideNews.length > 0) {
        let slideParam = {
            autoplay: !1
            , autoplayHoverPause: !0
            , loop: !0
            , dots: !1
            , items: 1.3
            , center: true
            , mouseDrag: !1
            , smartSpeed: 800
            , margin: 30
        };
        indexSlideNews.owlCarousel(slideParam);
    }
    $('.phone-group').addClass('show');
    const winHeight = $(window).height();
    let viviFunc = [], viviFuncMax = [], viviGo = [], viviPhotosGo, viviPhoneGo, viviPhotoTop, viviPhone, viviPhotos;
    if ($('.what-is-vivi__mob-slider').length > 0) {
        viviPhotoTop = $('.what-is-vivi__mob-slider').offset().top;
        viviPhotos = viviPhotoTop - winHeight + 250;
    } else {
        viviPhotosGo = true;
    }
    if ($('.main-vivi-phone').length > 0)
        viviPhone = $('.main-vivi-phone').offset().top;

    for (let i = 1; i <= 6; i++) {
        let a = '.about-functions__phone_' + i;
        if ($(a).length) {
            viviFuncMax[i] = $(a).offset().top;
            viviFunc[i] = viviFuncMax[i] - winHeight + $(a).height();
        } else {
            viviGo[i] = true
        }
    }
    let position = $(window).scrollTop();
    let goShow = (pos) => {
        if (!viviGo[1] && viviFunc[1] && pos > viviFunc[1] && pos < viviFuncMax[1]) {
            $('.about-functions__phone_1').removeClass('hide');
            viviGo[1] = true;
        }
        if (!viviGo[2] && viviFunc[2] && pos > viviFunc[2] && pos < viviFuncMax[2]) {
            $('.about-functions__phone_2').removeClass('hide');
            viviGo[2] = true;
        }
        if (!viviGo[3] && viviFunc[3] && pos > viviFunc[3] && pos < viviFuncMax[3]) {
            $('.about-functions__phone_3').removeClass('hide');
            viviGo[3] = true;
        }
        if (!viviGo[4] && viviFunc[4] && pos > viviFunc[4] && pos < viviFuncMax[4]) {
            $('.about-functions__phone_4').removeClass('hide');
            viviGo[4] = true;
        }
        if (!viviGo[5] && viviFunc[5] && pos > viviFunc[5] && pos < viviFuncMax[5]) {
            $('.about-functions__phone_5').removeClass('hide');
            viviGo[5] = true;
        }
        if (!viviGo[6] && viviFunc[6] && pos > viviFunc[6] && $('.about-functions__phone_6').length && pos < viviFuncMax[6]) {
            $('.about-functions__phone_6').removeClass('hide');
            viviGo[6] = true;
        }
    };
    goShow(position);

    $(window).on('scroll', () => {
        let pos = $(window).scrollTop();
        if (!viviPhotosGo && viviPhotos !== '' && pos > viviPhotos) {
            $('.what-is-vivi__mob-slider').addClass('show');
            viviPhotosGo = true;
        }
        if ($('.vivi-phone-in__display').length)
            if (!viviPhoneGo && pos > viviPhone) {
                $('.vivi-phone-in').removeClass('sleep');
                document.querySelector('.vivi-phone-in__push').addEventListener('transitionend', (e) => {
                    $('.vivi-phone-in').addClass('double');
                    e.target.addEventListener('transitionend', () => {
                    });
                });
            }
        goShow(pos);

    });
};
