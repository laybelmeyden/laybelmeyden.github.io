    const
        range = document.querySelector('#range'),
        rangeValue = document.querySelector('#rangeValue'),
        rangeProgress = document.querySelector('#rangeProgress'),
        rangeValueView = document.querySelector('#counter_range .range-value'),
        btnRangeNext = document.querySelector('.btn_range'),
        firstDescktop = document.querySelector('.counter_range'),
        countMounth = document.querySelector('#count_mounth'),
        incomeMatrac = document.querySelector('#income_matrac'),
        incomeDeposite = document.querySelector('#income_deposite'),
        incomeAlpha = document.querySelector('#income_alpha'),
        finaldeskOn = document.querySelector('.final_decktop_container'),
        middleCount = document.querySelector('.middle_count'),
        middleCountNoHinned = document.querySelector('.middle_count_no_hidden'),
        middleCountHinned = document.querySelector('.middle_count_hidden'),
        tooltipBtn = document.querySelector('.tooltip_on'),
        tooltipBtnOff = document.querySelector('.tooltip_off'),
        tooltipMatrac = document.querySelector('.tooltip_matrac_info'),
        tooltipDeposite = document.querySelector('.tooltip_deposite_info'),
        tooltipAlpha = document.querySelector('.tooltip_alpha_info'),
        tooltipMatracOn = document.querySelector('.tooltip_matrac_on'),
        tooltipMatracOff = document.querySelector('.tooltip_matrac_off'),
        tooltipDepositeOn = document.querySelector('.tooltip_deposite_on'),
        tooltipDepositeOff = document.querySelector('.tooltip_deposite_off'),
        tooltipAlphaOn = document.querySelector('.tooltip_alpha_on'),
        tooltipAlphaOff = document.querySelector('.tooltip_alpha_off'),
        amountCountImg = document.querySelector('.amount_count'),
        moneyMatrac = document.querySelector('#money_counter_matrac'),
        moneyDeposite = document.querySelector('#money_counter_deposite'),
        moneyAlpha = document.querySelector('#money_counter_alpha'),

        setValue = () => {
            const
                newValue = Number((range.value - range.min) * 100 / (range.max - range.min));
            newPosition = 10 - (newValue * 0.2);
            //bugs fixed on very count value and progress clerfix
            range.value <= 100 ? newPositionProgress = 0 - (newValue * 0.2) : newPositionProgress = 5 - (newValue * 0.2);
            range.value >= 200 ? rangeValueView.style.minWidth = 75 + 'px' : rangeValueView.style.minWidth = 'auto';
            //range views span
            range.value <= 0 ? rangeValue.innerHTML = `` : rangeValue.innerHTML = `<p>${range.value} ₽</p>`;
            //range calc value
            rangeValue.style.left = `calc(${newValue}% + (${newPosition}px))`;
            //range calc progress
            rangeProgress.style.width = `calc(${newValue}% + (${newPositionProgress}px))`;

            //btn inicilization
            range.value <= 0 ? btnRangeNext.classList.add('hidden') : btnRangeNext.classList.remove('hidden');

            //final desk
            btnRangeNext.onclick = nextDesk = () => {
                firstDescktop.classList.toggle('hidden_final_desk_anim');
                setTimeout(() => finaldeskOn.classList.toggle('hidden_final_desk_on'), 1000);
                setTimeout(() => firstDescktop.classList.toggle('hidden_final_desk_anim_off'), 1000);
            };
            middleCount.onclick = openMiddleCount = () => {
                    middleCountNoHinned.classList.toggle('no_vision');
                    middleCountHinned.classList.toggle('vision');
                    middleCountHinned.classList.contains('vision') ? middleCount.style.height = middleCountHinned.clientHeight + 'px' : middleCount.style.height = 67 + 'px';
                }
                //count mounth
            countMounth.textContent = range.value + ' ₽';
            //income matrac
            const matracValue = Math.floor(range.value * 12 * 3);
            incomeMatrac.textContent = '~' + matracValue + ' ₽';
            //income deposite
            const depositeValue = Math.floor(range.value * 12 * 3 + 50000);
            incomeDeposite.textContent = '~' + depositeValue + ' ₽';
            //income alpha 
            const alphaValue = Math.floor(range.value * 12 * 3 + 150000);
            incomeAlpha.textContent = '~' + alphaValue + ' ₽';

            //max value matrax 
            const matracValueMoney = Math.ceil(matracValue / (alphaValue / 10));
            moneyMatrac.src = 'img/Money' + matracValueMoney + '.svg';

            const depositeValueMoney = Math.ceil(depositeValue / (alphaValue / 10));
            moneyDeposite.src = 'img/Money' + depositeValueMoney + '.svg';
            const alphaValueMoney = Math.ceil(alphaValue / (alphaValue / 10));
            moneyAlpha.src = 'img/Money' + alphaValueMoney + '.svg';
            //tooltip btn
            tooltipMatracOn.onclick = tooltipBtnClickmatracOn = () => {
                tooltipMatracOn.classList.toggle('tooltip_off');
                tooltipMatracOff.classList.toggle('tooltip_off');
                tooltipMatrac.classList.toggle('vision')
            }
            tooltipMatracOff.onclick = tooltipBtnClickmatracOn = () => {
                tooltipMatracOn.classList.toggle('tooltip_off');
                tooltipMatracOff.classList.toggle('tooltip_off');
                tooltipMatrac.classList.toggle('vision')
            }
            tooltipDepositeOn.onclick = tooltipBtnClickmatracOn = () => {
                tooltipDepositeOn.classList.toggle('tooltip_off');
                tooltipDepositeOff.classList.toggle('tooltip_off');
                tooltipDeposite.classList.toggle('vision')
            }
            tooltipDepositeOff.onclick = tooltipBtnClickmatracOn = () => {
                tooltipDepositeOn.classList.toggle('tooltip_off');
                tooltipDepositeOff.classList.toggle('tooltip_off');
                tooltipDeposite.classList.toggle('vision')
            }
            tooltipAlphaOn.onclick = tooltipBtnClickmatracOn = () => {
                tooltipAlphaOn.classList.toggle('tooltip_off');
                tooltipAlphaOff.classList.toggle('tooltip_off');
                tooltipAlpha.classList.toggle('vision')
            }
            tooltipAlphaOff.onclick = tooltipBtnClickmatracOn = () => {
                tooltipAlphaOn.classList.toggle('tooltip_off');
                tooltipAlphaOff.classList.toggle('tooltip_off');
                tooltipAlpha.classList.toggle('vision')
            }


            //vcru amount
            if (range.value >= 11000 && range.value <= 20000) {
                amountCountImg.src = 'img/amount2.svg'
            } else if (range.value >= 21000 && range.value <= 30000) {
                amountCountImg.src = 'img/amount3.svg'
            } else if (range.value >= 31000 && range.value <= 40000) {
                amountCountImg.src = 'img/amount4.svg'
            } else if (range.value >= 41000 && range.value <= 50000) {
                amountCountImg.src = 'img/amount5.svg'
            } else {
                amountCountImg.src = 'img/amount1.svg'
            }

            //firefox bugs 
            const ua = navigator.userAgent;
            const rangeProgressFirefox = document.querySelector('#rangeProgress');
            const rangeValueFirefox = document.querySelector('#counter_range .range-value');
            if (ua.search(/Firefox/) > 0) {
                rangeProgressFirefox.style.top = 24 + 'px';
                rangeValueFirefox.style.top = -15 + 'px';
            }

        };
    document.addEventListener("DOMContentLoaded", setValue);
    range.addEventListener('input', setValue);