// 입출금 내역 불러오기
fetch("https://gyoheonlee.github.io/mobile-bank/data/bank.json")
    .then(res => res.json())
    .then(myjson => {printContents(myjson)});


function printContents (myjson) {
    const ulElem = document.querySelector('.contents__history__days');
    const bankLi = myjson.bankList.reverse();
    let totalSum = 0;
    let listIndex = 0;

    for (let i = 0; i < bankLi.length; i++) {
        const liElem = document.createElement('li');
        const day_spanElem = document.createElement('span');
        const sum_spanElem = document.createElement('span');
        const history_spanElem = document.createElement('span');
        const price_spanElem = document.createElement('span');
        const divElem = document.createElement('div');
        const divElem2 = document.createElement('div');

        if(i === 0 || bankLi[i - 1].date !== bankLi[i].date) {
            totalSum += bankLi[i]['price'];

            day_spanElem.innerHTML = bankLi[i]['date'];
            sum_spanElem.innerHTML = `${totalSum}원 지출`;
            day_spanElem.className = 'contents_day';
            sum_spanElem.className = 'contents_sum';

            divElem.appendChild(day_spanElem);
            divElem.appendChild(sum_spanElem);
            divElem.className = "title";

            history_spanElem.innerHTML = bankLi[i]['history'];
            price_spanElem.innerHTML = bankLi[i]['price'];
            history_spanElem.className = 'history_contents';
            price_spanElem.className = 'price_contents';

            divElem2.appendChild(history_spanElem);
            divElem2.appendChild(price_spanElem);
            divElem2.className = "history_content";

            liElem.appendChild(divElem);
            liElem.appendChild(divElem2);
            ulElem.appendChild(liElem);

            listIndex += 1;
        } else {
            const nextLiElem = document.querySelector(`.contents__history__days li:nth-child(${listIndex})`);

            day_spanElem.innerHTML = bankLi[i]['history'];
            day_spanElem.className = 'history_contents';
            sum_spanElem.innerHTML = bankLi[i]['price'];
            sum_spanElem.className = 'price_contents';
            totalSum += bankLi[i]['price'];
            divElem.appendChild(day_spanElem);
            divElem.appendChild(sum_spanElem);
            divElem.className = "history_content";
            nextLiElem.appendChild(divElem);

            nextLiElem.childNodes[0].children[1].innerHTML = `${totalSum} 원 지출`;
            totalSum = 0;
        }
    }
}

// 슬라이더
new Swiper('.wrap .swiper-container', {
    direction: 'vertical',
    slidePerView: 2
});

// 올림 버튼
let _slide = document.getElementById("account_");
function slide_btn() {
    if(_slide.style.display == 'block') {
        _slide.style.display = 'none';
    } else {
        _slide.style.display = 'block';
    }
}

// 화면 슬라이드
const kindWrap = document.querySelector('.wrap');
const slider = kindWrap.querySelector('.swiper-container');
const slideLis = slider.querySelector('.swiper-wrapper');
const moveBtn = document.querySelector('.arrow_btn');
let moveDist = 0; // 움직일 거리를 숫자로 보관함
let currentNum = 0; // 현재 슬라이드 번호를 기록함.

const liWidth = slideLis.clientWidth;
const sliderWidth = liWidth * slideLis.length;
slider.style.width = sliderWidth + 'px'; 

slider.style.left = '0';

moveBtn.addEventListener('click', moveSlide);

function moveSlide (e) {
    e.preventDefault();
    slider.style.transition = 'all 500ms ease';
    console.log(e.target.className);
    if (e.target.className === 'next') {
        if (currentNum === slideLis.length - 1) {
            currentNum = 0;
            moveDist = 0;
            slider.style.left = moveDist + 'px';
        } else {
            currentNum++;
            moveDist += -liWidth;
            slider.style.left = moveDist + 'px';
        }
    } else {
        if (currentNum === 0) { // 처음이면
            currentNum = slideLis.length - 1; // 마지막번호
            moveDist = - (liWidth * currentNum); // 마지막위치
            slider.style.left = moveDist + 'px';
            console.log(currentNum);
        } else {
            currentNum--; // 숫자를 업데이트 한다.
            moveDist += liWidth;
            slider.style.left = moveDist + 'px';
            console.log(currentNum);
        }
    }
}