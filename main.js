// 입출금 내역 불러오기
function printContents (myjson, section) {
  const ulElem = section.querySelector('.contents__history__days');
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
new Swiper('.wrap > main > section > .swiper-container', {
    direction: 'vertical',
    slidePerView: 1
});

// 올림 버튼
const _slide = document.getElementById("account_");
function slide_btn() {
  if(_slide.style.display == 'block') {
      _slide.style.display = 'none';
  } else {
      _slide.style.display = 'block';
  }
}

// JSON section에 불러오기
let start_x, end_x; 
const sections = document.querySelectorAll('section');
let urls = ["https://gyoheonlee.github.io/mobile-bank/data/bank-me.json", "https://gyoheonlee.github.io/mobile-bank/data/bank-mom.json"]
sections.forEach((section, index)=>{
  section.children[0].addEventListener('touchstart',slide_start);
  section.children[0].addEventListener('touchend',(event)=>{ slide_end(event) });
  fetch(urls[index])
  .then(res => res.json())
  .then(myjson => {printContents(myjson, section)});
})
function slide_start(e){
  start_x = e.touches[0].pageX;
}

function slide_end(event){
  end_x=event.changedTouches[0].pageX;
  if(start_x > end_x + 100){
    slideLeft();
  } else if(start_x + 100 < end_x) {
    slideRight();
  }
}

function slideLeft(){
  sections[0].style.left = '-375px';
  sections[1].style.left = '0';
}

function slideRight(){
  sections[0].style.left = '0';
  sections[1].style.left = '+375px';
}

