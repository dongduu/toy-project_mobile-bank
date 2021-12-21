const ul_history = document.querySelector('.contents__history__days');

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
