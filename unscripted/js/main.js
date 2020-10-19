const openCards1 = (e) => {
    e.currentTarget.parentElement.querySelectorAll('li').forEach(
        e => !e.classList.contains('vision') && e.classList.toggle('no_vision')
    );
    const currnetMore = e.currentTarget.querySelector('span');
    currnetMore.innerHTML === 'Подробее' ? currnetMore.innerHTML = 'Скрыть' : currnetMore.innerHTML = 'Подробее'
}
const AllHref = document.querySelectorAll('#format_works_more1');
AllHref.forEach(function(e) {
    e.onclick = openCards1;
})
const modalOpen = () => {
    document.querySelector('.modal').classList.toggle('non_active')
    document.querySelector('body').classList.toggle('off')
    document.querySelector('.nav_992').classList.toggle('hidden_perfect')
}
const modalOpen2 = () => {
    document.querySelector('.modal_books').classList.toggle('non_active')
    document.querySelector('body').classList.toggle('off')
    document.querySelector('.nav_992').classList.toggle('hidden_perfect')
}
const successAlert = () => {
        document.querySelector('#modal_alert_2').classList.toggle('alert_off');
    }
    (function() {
        'use strict';

        function trackScroll() {
            var scrolled = window.pageYOffset;
            var coords = document.documentElement.clientHeight;

            if (scrolled > coords) {
                goTopBtn.classList.add('back_to_top-show');
            }
            if (scrolled < coords) {
                goTopBtn.classList.remove('back_to_top-show');
            }
        }

        function backToTop() {
            window.scrollTo(0, 0);
        }

        var goTopBtn = document.querySelector('.back_to_top');

        window.addEventListener('scroll', trackScroll);
        goTopBtn.addEventListener('click', backToTop);
    })();

const x = document.getElementById("contain");

x.addEventListener("click", myFunction);

function myFunction() {
    document.querySelector('body').classList.toggle('off')
    const element = document.getElementById("nav");
    document.querySelector('.dots').classList.toggle('hidden_perfect')
    element.classList.toggle("open");
    x.classList.toggle("change");
}
const aHref = () => {
    document.querySelector('#nav').classList.toggle('open')
    document.querySelector('body').classList.toggle('off')
    document.querySelector('#contain').classList.toggle("change")
    document.querySelector('.dots').classList.toggle('hidden_perfect')
}
const ar = document.querySelectorAll('#nav a')
ar.forEach(function(e) {
    e.onclick = aHref;
})