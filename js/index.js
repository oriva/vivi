'use strict';

document.addEventListener('DOMContentLoaded', () => {
    if (window.innerWidth > 768) {
        let scene = $('.parallax'), parallax = [];
        for (let i = 0; i < scene.length; i++) {
            parallax[i] = new Parallax(scene[i], {
                relativeInput: true
            });
        }
    }
});