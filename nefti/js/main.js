$('.dropdown-toggle').dropdown();
$('body').scrollspy({
    target: '#list-example'
})
$("#inputGroupFile01").change(function(event) {
    readURL(this);
});
$("#inputGroupFile02").change(function(event) {
    readURL2(this);
});

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var filename = $("#inputGroupFile01").val();
        filename = filename.substring(filename.lastIndexOf('\\') + 1);
        reader.onload = function(e) {
            $('#blah').attr('src', e.target.result);
            $('#blah').hide();
            $('#blah').fadeIn(500);
            $('.custom-file-label').text(filename);
        }
        reader.readAsDataURL(input.files[0]);
    }
    document.querySelector('.custom-file-label').classList.toggle('file_active')
}

function readURL2(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        var filename = $("#inputGroupFile02").val();
        filename = filename.substring(filename.lastIndexOf('\\') + 1);
        reader.onload = function(e) {
            $('#blah').attr('src', e.target.result);
            $('#blah').hide();
            $('#blah').fadeIn(500);
            $('.custom-file-label_02').text(filename);
        }
        reader.readAsDataURL(input.files[0]);
    }
    document.querySelector('.custom-file-label_02').classList.toggle('file_active')
}
const openSearch = () => {
    const searchBtn = document.querySelector('#main_search');
    const allA = document.querySelectorAll('.main_nav_links a');
    const input = document.querySelector('#main_nav_links_input');
    const close_search = document.querySelector('.close_search');
    allA.forEach(e => e.classList.toggle('non_active'));
    close_search.classList.toggle('non_active')
    input.classList.toggle('non_active')
    searchBtn.classList.toggle('non_active')
}

const submenu_open = () => {
    const sub_container = document.querySelector('.sub_menu');
    const sub_menu_img = document.querySelector('#sub_menu_img');
    const sub_menu_img_2 = document.querySelector('#sub_menu_img_2');
    const modal = document.querySelector('#hidden_sub_nav');
    const body = document.querySelector('body');
    body.classList.toggle('off')
    sub_menu_img.classList.toggle('img_burger');
    sub_menu_img.classList.toggle('non_active');
    sub_menu_img_2.classList.toggle('non_active');
    modal.classList.toggle('non_active');
}
const search_1399 = () => {
    document.querySelector('.close_1399').classList.toggle('non_active')
    document.querySelector('#main_search_1399').classList.toggle('non_active')
    document.querySelector('.search_1399').classList.toggle('non_active')
}

// nav1
$(document).ready(function() {
    let h = document.querySelector('html').scrollTop;
    if (h > 60) {
        $("#main_nav").addClass("scrolled");
        $("#hidden_sub_nav").addClass("scrolled_sub");
    }
    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 60) {
            $("#main_nav").addClass("scrolled");
            $("#hidden_sub_nav").addClass("scrolled_sub");
        } else {
            $("#main_nav").removeClass("scrolled");
            $("#hidden_sub_nav").removeClass("scrolled_sub");
        }
    });
});
// nav_1 end
// maps
// slider
let clientWidth = document.documentElement.clientWidth;
let slidersForCards = document.querySelectorAll('.slider_for_cards');

slidersForCards.forEach(slider => {
    let visibleWidthOfSlider = clientWidth - slider.offsetLeft;
    let rightBorderOfSlider = Math.floor(visibleWidthOfSlider / 600) - 1;
    let rightBorderOfSlider_650 = Math.floor(visibleWidthOfSlider / 325) - 1;
    let cardsContainer = slider.querySelector('.project_card_containers');
    let cards = cardsContainer.querySelectorAll('.project_card_items');
    let indexOfActiveYear = 0;
    let indexOfLeftSlide = 0;
    let marginLeftOfSlider = 0;
    let yearsBtns = slider.querySelectorAll('.link_years');
    let indexOfBeginOfCardsEachYear = [];
    let years = [];
    let currentYear = slider.querySelector('.slider_for_cards_current_year');
    // let horizontalScrollBar = slider.querySelector('.slider_for_cards_horizontal_scrollbar');
    // let horizontalScrollThumb = slider.querySelector('.slider_for_cards_horizontal_scrollthumb');
    // horizontalScrollBar.style.minWidth = `${visibleWidthOfSlider}px`;
    // horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
    yearsBtns.forEach(btn => years.push(btn.textContent));
    currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
    let j = 0;
    for (let i = 0; i < cards.length; i++) {
        if (cards[i].dataset.year === years[j]) {
            indexOfBeginOfCardsEachYear.push(i);
            j++;
        }
    }
    for (let i = 0; i < yearsBtns.length; i++) {
        yearsBtns[i].addEventListener('click', () => {
            if (i !== indexOfActiveYear) {
                indexOfLeftSlide = indexOfBeginOfCardsEachYear[i];
                // if (document.documentElement.clientHeight <= 800) 
                if (document.documentElement.clientWidth <= 650) {
                    marginLeftOfSlider = indexOfLeftSlide * 325;
                } else {
                    marginLeftOfSlider = indexOfLeftSlide * 600;
                }
                if (document.documentElement.clientWidth <= 650) {
                    if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 325) {
                        marginLeftOfSlider = cards.length * 325 - visibleWidthOfSlider + 100;
                    }
                } else {
                    if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 600) {
                        marginLeftOfSlider = cards.length * 600 - visibleWidthOfSlider + 100;
                    }
                }
                if (document.documentElement.clientWidth <= 650) {
                    if (indexOfLeftSlide >= cards.length - rightBorderOfSlider_650) {
                        indexOfLeftSlide = cards.length - rightBorderOfSlider_650 - 1;
                    }
                } else {
                    if (indexOfLeftSlide >= cards.length - rightBorderOfSlider) {
                        indexOfLeftSlide = cards.length - rightBorderOfSlider - 1;
                    }
                }
                cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
                // horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
                yearsBtns[i].classList.add('active_years');
                yearsBtns[indexOfActiveYear].classList.remove('active_years');
                indexOfActiveYear = i;
                currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                if (indexOfActiveYear === 0) {
                    arrowLeft.classList.add('swiper-button-disabled');
                } else {
                    arrowLeft.classList.remove('swiper-button-disabled');
                }
                arrowRight.classList.remove('swiper-button-disabled');
            }
        })
    }
    let arrowLeft = slider.querySelector('.btn_slider_style_prev');
    let arrowRight = slider.querySelector('.btn_slider_style_next');
    arrowLeft.addEventListener('mousedown', () => {
        if (indexOfLeftSlide === 0) {
            arrowLeft.classList.add('swiper-button-disabled');
        }
        if (!(arrowLeft.classList.contains('swiper-button-disabled'))) {
            indexOfLeftSlide--;
            if (document.documentElement.clientWidth <= 650) {
                marginLeftOfSlider = indexOfLeftSlide * 325;
            } else {
                marginLeftOfSlider = indexOfLeftSlide * 600;
            }
            if (document.documentElement.clientWidth <= 650) {
                if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 325) {
                    marginLeftOfSlider = cards.length * 325 - visibleWidthOfSlider + 100;
                }
            } else {
                if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 600) {
                    marginLeftOfSlider = cards.length * 600 - visibleWidthOfSlider + 100;
                }
            }
            cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
            // horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
            if (arrowRight.classList.contains('swiper-button-disabled')) {
                arrowRight.classList.remove('swiper-button-disabled');
            }
            if (document.documentElement.clientWidth <= 650) {
                if (marginLeftOfSlider + visibleWidthOfSlider - 1980 < indexOfBeginOfCardsEachYear[indexOfActiveYear] * 325) {
                    yearsBtns[indexOfActiveYear].classList.remove('active_years');
                    indexOfActiveYear--;
                    currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                    yearsBtns[indexOfActiveYear].classList.add('active_years');
                }
            } else {
                if (marginLeftOfSlider + visibleWidthOfSlider - 1980 < indexOfBeginOfCardsEachYear[indexOfActiveYear] * 600) {
                    yearsBtns[indexOfActiveYear].classList.remove('active_years');
                    indexOfActiveYear--;
                    currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                    yearsBtns[indexOfActiveYear].classList.add('active_years');
                }
            }
        }
    });
    arrowRight.addEventListener('mousedown', () => {
        if (indexOfLeftSlide >= cards.length - rightBorderOfSlider) {
            arrowRight.classList.add('swiper-button-disabled');
        }
        if (!(arrowRight.classList.contains('swiper-button-disabled'))) {
            indexOfLeftSlide++;
            if (document.documentElement.clientWidth <= 650) {
                marginLeftOfSlider = indexOfLeftSlide * 325;
            } else {
                marginLeftOfSlider = indexOfLeftSlide * 600;
            }
            if (document.documentElement.clientWidth <= 650) {
                if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 325) {
                    marginLeftOfSlider = cards.length * 325 - visibleWidthOfSlider + 100;
                }
            } else {
                if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 600) {
                    marginLeftOfSlider = cards.length * 600 - visibleWidthOfSlider + 100;
                }
            }

            cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
            // horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
            if (arrowLeft.classList.contains('swiper-button-disabled')) {
                arrowLeft.classList.remove('swiper-button-disabled');
            }
            if (document.documentElement.clientWidth <= 650) {
                if (marginLeftOfSlider + visibleWidthOfSlider - 300 > indexOfBeginOfCardsEachYear[indexOfActiveYear + 1] * 325) {
                    yearsBtns[indexOfActiveYear].classList.remove('active_years');
                    indexOfActiveYear++;
                    currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                    yearsBtns[indexOfActiveYear].classList.add('active_years');
                }
            } else {
                if (marginLeftOfSlider + visibleWidthOfSlider - 1000 > indexOfBeginOfCardsEachYear[indexOfActiveYear + 1] * 600) {
                    yearsBtns[indexOfActiveYear].classList.remove('active_years');
                    indexOfActiveYear++;
                    currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                    yearsBtns[indexOfActiveYear].classList.add('active_years');
                }
            }
        }
    });
    cardsContainer.addEventListener('wheel', (event) => {
        event.preventDefault();

        if (event.deltaY < 0 && indexOfLeftSlide !== 0) {
            indexOfLeftSlide--;
            if (document.documentElement.clientWidth <= 650) {
                marginLeftOfSlider = indexOfLeftSlide * 325;
            } else {
                marginLeftOfSlider = indexOfLeftSlide * 600;
            }
            if (document.documentElement.clientWidth <= 650) {
                if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 325) {
                    marginLeftOfSlider = cards.length * 325 - visibleWidthOfSlider + 100;
                }
            } else {
                if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 600) {
                    marginLeftOfSlider = cards.length * 600 - visibleWidthOfSlider + 100;
                }
            }
            cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
            // horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
            if (arrowRight.classList.contains('swiper-button-disabled')) {
                arrowRight.classList.remove('swiper-button-disabled');
            }
            if (document.documentElement.clientWidth <= 650) {
                if (marginLeftOfSlider + visibleWidthOfSlider - 80 < indexOfBeginOfCardsEachYear[indexOfActiveYear] * 325) {
                    yearsBtns[indexOfActiveYear].classList.remove('active_years');
                    indexOfActiveYear--;
                    currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                    yearsBtns[indexOfActiveYear].classList.add('active_years');
                }
            } else {
                if (marginLeftOfSlider + visibleWidthOfSlider - 80 < indexOfBeginOfCardsEachYear[indexOfActiveYear] * 600) {
                    yearsBtns[indexOfActiveYear].classList.remove('active_years');
                    indexOfActiveYear--;
                    currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                    yearsBtns[indexOfActiveYear].classList.add('active_years');
                }
            }
            if (indexOfLeftSlide === 0) {
                arrowLeft.classList.add('swiper-button-disabled');
            }
        } else if (event.deltaY > 0 && indexOfLeftSlide < cards.length - rightBorderOfSlider) {
            indexOfLeftSlide++;
            if (document.documentElement.clientWidth <= 650) {
                marginLeftOfSlider = indexOfLeftSlide * 325;
            } else {
                marginLeftOfSlider = indexOfLeftSlide * 600;
            }
            if (document.documentElement.clientWidth <= 650) {
                if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 325) {
                    marginLeftOfSlider = cards.length * 325 - visibleWidthOfSlider + 100;
                }
            } else {
                if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 600) {
                    marginLeftOfSlider = cards.length * 600 - visibleWidthOfSlider + 100;
                }
            }
            cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
            // horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
            if (arrowLeft.classList.contains('swiper-button-disabled')) {
                arrowLeft.classList.remove('swiper-button-disabled');
            }
            if (document.documentElement.clientWidth <= 650) {
                if (marginLeftOfSlider + visibleWidthOfSlider - 300 > indexOfBeginOfCardsEachYear[indexOfActiveYear + 1] * 325) {
                    yearsBtns[indexOfActiveYear].classList.remove('active_years');
                    indexOfActiveYear++;
                    currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                    yearsBtns[indexOfActiveYear].classList.add('active_years');
                }
            } else {
                if (marginLeftOfSlider + visibleWidthOfSlider - 1000 > indexOfBeginOfCardsEachYear[indexOfActiveYear + 1] * 600) {
                    yearsBtns[indexOfActiveYear].classList.remove('active_years');
                    indexOfActiveYear++;
                    currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
                    yearsBtns[indexOfActiveYear].classList.add('active_years');
                }
            }
            if (indexOfLeftSlide >= cards.length - rightBorderOfSlider) {
                arrowRight.classList.add('swiper-button-disabled');
            }
        }
    });
    // let thumbMoving = 0;
    // let elemLeft, x;
    // document.addEventListener('mousemove', (event) => {
    //     if (thumbMoving) {
    //         elemLeft = horizontalScrollBar.offsetLeft;
    //         x = event.pageX - elemLeft;
    //         if (x >= 0) {
    //             horizontalScrollThumb.style.left = `${x - 8}px`;
    //             marginLeftOfSlider = (x * (cards.length * 600 - visibleWidthOfSlider + 100) / visibleWidthOfSlider) - 8;
    //             indexOfLeftSlide = Math.round(marginLeftOfSlider / 600);
    //             cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
    //         }
    //         if (marginLeftOfSlider + visibleWidthOfSlider - 80 < indexOfBeginOfCardsEachYear[indexOfActiveYear] * 600) {
    //             yearsBtns[indexOfActiveYear].classList.remove('active_years');
    //             indexOfActiveYear--;
    //             currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
    //             yearsBtns[indexOfActiveYear].classList.add('active_years');
    //         }
    //         if (marginLeftOfSlider + visibleWidthOfSlider - 100 > indexOfBeginOfCardsEachYear[indexOfActiveYear + 1] * 600) {
    //             yearsBtns[indexOfActiveYear].classList.remove('active_years');
    //             indexOfActiveYear++;
    //             currentYear.textContent = `${yearsBtns[indexOfActiveYear].textContent}`;
    //             yearsBtns[indexOfActiveYear].classList.add('active_years');
    //         }
    //     }
    // });
    // horizontalScrollThumb.addEventListener('mousedown', (event) => {
    //     cardsContainer.style.transition = 'margin-left 0s ease-in-out';
    //     horizontalScrollThumb.style.transition = 'left 0s ease-in-out';
    //     thumbMoving = 1;
    // });

    // document.addEventListener('mouseup', (event) => {
    //     cardsContainer.style.transition = 'margin-left 0.6s ease-in-out';
    //     horizontalScrollThumb.style.transition = 'left 0.6s ease-in-out';
    //     thumbMoving = 0;
    //     marginLeftOfSlider = indexOfLeftSlide * 600;
    //     if (marginLeftOfSlider + visibleWidthOfSlider - 100 > cards.length * 600) {
    //         marginLeftOfSlider = cards.length * 600 - visibleWidthOfSlider + 100;
    //     }
    //     cardsContainer.style.marginLeft = `${-marginLeftOfSlider}px`;
    //     horizontalScrollThumb.style.left = `${marginLeftOfSlider * visibleWidthOfSlider / (cards.length * 600 - visibleWidthOfSlider + 100) - 8}px`;
    // })
});
// endslider
const vacanMainForm = () => {
    document.querySelector('#vacan_main_form_hidden').classList.toggle('non_active');
    document.querySelector('#vacan_main_form').classList.toggle('non_active')
}
const addDopEducations = () => {
    document.querySelector('.dop_edu').classList.toggle('non_active')
    document.querySelector('.add_dop_eductaions_items').classList.toggle('non_active')
}
const addDopEducations2 = () => {
    document.querySelector('.dop_work').classList.toggle('non_active')
    document.querySelector('.add_dop_work_items').classList.toggle('non_active')
}

// const openCards1 = (e) => {
//     e.currentTarget.parentElement.querySelectorAll('.maps_popup').forEach(
//         e => {
//             console.log(e.id)
//         }
//     );
// }
// const AllHref = document.querySelectorAll('.maps_popup');
// AllHref.forEach(function(e) {
//     e.onclick = openCards1;
// })

if (document.documentElement.clientHeight <= 800) {
    document.querySelector('#nav_hidden').classList.add('scroll_nav')
}