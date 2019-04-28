'use strict';

document.addEventListener('DOMContentLoaded', () => {
    let indexSlideNews = $('.what-is-vivi__mob-slider');
    if (window.innerWidth > 768) {
        let scene = $('.parallax'), parallax = [];
        for (let i = 0; i < scene.length; i++) {
            parallax[i] = new Parallax(scene[i], {
                relativeInput: true
            });
        }
    } else {
        let slideParam = {
            autoplay: !1,
            autoplayHoverPause: !0,
            loop: !0,
            dots: !1,
            items: 1.2,
            center: true,
            mouseDrag: !1,
            smartSpeed: 800
        };

        indexSlideNews.owlCarousel(slideParam);
    }
    $('.phone-group').addClass('show');
    let a = [];
    let winHeight = $(window).height();
    let viviPhotos = $('.what-is-vivi__mob-slider').offset().top - winHeight + $('.what-is-vivi__mob-slider').height();
    let viviPhone = $('.vivi-phone-in__display').offset().top - winHeight + $('.vivi-phone-in__display').height()/3;
    let viviFunc = [];
    viviFunc[1] = $('.about-functions__phone_1').offset().top - winHeight + $('.about-functions__phone_1').height()/2;
    viviFunc[2] = $('.about-functions__phone_2').offset().top - winHeight + $('.about-functions__phone_2').height()/2;
    viviFunc[3] = $('.about-functions__phone_3').offset().top - winHeight + $('.about-functions__phone_3').height()/2;
    viviFunc[4] = $('.about-functions__phone_4').offset().top - winHeight + $('.about-functions__phone_4').height()/2;
    viviFunc[5] = $('.about-functions__phone_5').offset().top - winHeight + $('.about-functions__phone_5').height()/2;
    if($('.about-functions__phone_6').length)
        viviFunc[6] = $('.about-functions__phone_6').offset().top - winHeight + $('.about-functions__phone_6').height()/2;

    $(window).on('scroll', ()=>{
        let pos = $(window).scrollTop();
        if (!a[viviPhotos] && pos>viviPhotos) {
            $('.what-is-vivi__mob-slider').addClass('show');
            a[viviPhotos] = true;
        }
        if(!a[viviPhone] && pos>viviPhone) {
            $('.vivi-phone-in').removeClass('sleep');
            a[viviPhone] = true;
        }
        if(!a[viviFunc[1]] && pos>viviFunc[1]) {
            $('.about-functions__phone_1').removeClass('hide');
            a[viviFunc[1]] = true;
        }
        if(!a[viviFunc[2]] && pos>viviFunc[2]) {
            $('.about-functions__phone_2').removeClass('hide');
            a[viviFunc[2]] = true;
        }
        if(!a[viviFunc[3]] && pos>viviFunc[3]) {
            $('.about-functions__phone_3').removeClass('hide');
            a[viviFunc[3]] = true;
        }
        if(!a[viviFunc[4]] && pos>viviFunc[4]) {
            $('.about-functions__phone_4').removeClass('hide');
            a[viviFunc[4]] = true;
        }
        if(!a[viviFunc[5]] && pos>viviFunc[5]) {
            $('.about-functions__phone_5').removeClass('hide');
            a[viviFunc[5]] = true;
        }
        if(!a[viviFunc[6]] && pos>viviFunc[6] && $('.about-functions__phone_6').length) {
            $('.about-functions__phone_6').removeClass('hide');
            a[viviFunc[6]] = true;
        }
    });
});