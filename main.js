const ul_history = document.querySelector('.contents__history__days');

fetch("https://gyoheonlee.github.io/mobile-bank/data/bank.json")
    .then(res => res.json())
    .then(function (myjson) {
        console.log(myjson)
        myjson.bankList.forEach((x) => {
            const liElem = document.createElement('li');
            const history = document.createTextNode(`${x.date} ${x.history} ${x.price}`);
            liElem.appendChild(history);
            ul_history.appendChild(liElem);
        });
    });