fetch("https://s3.us-west-2.amazonaws.com/secure.notion-static.com/f6e4d3d3-c52c-4ea8-b665-968a3b17c5ea/bank.json?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIAT73L2G45EIPT3X45%2F20211218%2Fus-west-2%2Fs3%2Faws4_request&X-Amz-Date=20211218T124755Z&X-Amz-Expires=86400&X-Amz-Signature=f2164be3832f6dd371c16ed146e021998ab63c5d64fd99490fc51e6ca5ae1990&X-Amz-SignedHeaders=host&response-content-disposition=filename%20%3D%22bank.json%22&x-id=GetObject")
    .then(res => res.json())
    .then(obj => {printContentsHistory(obj)})

function printContentsHistory (history) {
    const ulEl = document.querySelector('ul');
    for (let i = 0; i < history.length ; i++) {
        const liElem = document.createElement('li')
        const spanElem = document.createElement('span');
        spanElem.textContent = history[i].title;
        liElem.appendChild(spanElem);
        ulElem.appendChild(liElem);
    }

}