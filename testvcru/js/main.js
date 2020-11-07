// const rangeValue = document.querySelector('.range_value div');
// const rangeEdges = document.querySelector('.range_edges input');
// const range = document.querySelector('.range');
// const value__ad = document.querySelector('#value__ad');
// const first = document.querySelector('#first');
// const two = document.querySelector('#two');
// const three = document.querySelector('#three');


// rangeEdges.oninput = onda = () => {
//     let value = rangeEdges.value;
//     let max = rangeEdges.max;
//     const clientWidth = rangeEdges.clientWidth;
//     const clientWidthPlasha = document.querySelector('#plashgd')
//     const adas = clientWidthPlasha.clientWidth;
//     rangeValue.textContent = value + ' ₽';
//     rangeValue.style.left = 42 + (value / 118) + 'px';
//     let bulletPosition = value / max;
//     rangeValue.style.left = 42 + (bulletPosition * clientWidth) + 'px';
//     value >= 1 ? (rangeValue.style.marginLeft = -10 + 'px') : rangeValue.style.marginLeft = 0 + 'px';

//     let micro = clientWidth / max;
//     let tek = micro * value;
//     rangeValue.style.left = tek + 'px';
//     rangeValue.style.transform = 'translateX(' + (tek - adas <= 0 ? 0 : tek - adas) + 'px)';



//     value__ad.textContent = value;

//     first.textContent = value * 12 * 3 + ' ₽';
//     two.textContent = Math.floor((value * 12 * 3) * 0.0698) + ' ₽';
//     three.textContent = Math.floor((value * 12 * 3) * 0.7121) + ' ₽';
// }
// btn.onclick = ads = () => {
//     range.classList.toggle('hidden')
// }

const
    range = document.getElementById('range'),
    rangeV = document.getElementById('rangeV'),
    rangeV1 = document.getElementById('rangeV1'),
    setValue = () => {
        const
            newValue = Number((range.value - range.min) * 100 / (range.max - range.min)),
            newPosition = 10 - (newValue * 0.2);
        newPosition1 = 0 - (newValue * 0.2);

        rangeV.innerHTML = `<span>${range.value}</span>`;
        rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
        rangeV1.style.width = `calc(${newValue}% + (${newPosition1}px))`;
    };
document.addEventListener("DOMContentLoaded", setValue);
range.addEventListener('input', setValue);





// var newDiv = document.createElement('div');
// document.body.appendChild(newDiv);