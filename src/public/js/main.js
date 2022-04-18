// TODO: add client side code for single page application

function main() {
    const filterBtn = document.querySelectorAll('input[type="submit"]')[0];
    filterBtn.addEventListener('click', filter);
    const addBtn = document.querySelectorAll('input[type="submit"]')[1];
    addBtn.addEventListener('click', add);
}

document.addEventListener("DOMContentLoaded", main);

function getReviews() {
    const req = new XMLHttpRequest();
    const url = 'http://localhost:3000/api/reviews/create';
    req.open('GET', url, true);
    req.addEventListener('load', function handleReviews() {
        if (req.status >= 200 && req.status < 400) {
            const div = document.querySelector('#reviews-list');
            div.innerHTML = '';
            const reviews = JSON.parse(req.responseText);
            reviews.forEach((m) => {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                tr.appendChild(td).textContent = m.title;
                const td2 = document.createElement('td');
                tr.appendChild(td2).textContent = m.director;
                const td3 = document.createElement('td');
                tr.appendChild(td3).textContent = m.year;
                div.appendChild(tr);
            });
        }
    });
    req.addEventListener('error', function() {
        console.log("ERROR");
    });
    req.send();
}

function add(evt) {
    evt.preventDefault();
    const req = new XMLHttpRequest();
    const url = 'http://localhost:3000/api/reviews/create';
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const semester = document.querySelector('#semester').value;
    const name = document.querySelector('#name').value;
    const year = document.querySelector('#year').value;
    const review = document.querySelector('#review').value;
    const data = `name=${name}&semester=${semester}&year=${year}&review=${review}`;
    req.send(data);
    req.addEventListener('load', function() {
        getReviews();
    });
}

function filter(evt) {
    evt.preventDefault();
    const req = new XMLHttpRequest();
    let url = 'http://localhost:3000/api/reviews';
    const year = document.getElementById('year').year;
    console.log(year + "FILTERREVIEWS");
    console.log(year.value, "YEARS");
    if (year.value != "") {
        console.log(url, "URL");
        url += '?year=' + year;
    }
    console.log(url, "AFTER");
    req.open('GET', url, true);
    req.addEventListener('load', function handleFilter() {
        if (req.status >= 200 && req.status < 400) {
            console.log("RESPONSE TEXT ", req.responseText);
            const data = JSON.parse(req.responseText);
            const reviewList = document.getElementById('reviews-list');
            reviewList.innerHTML = '';
            data.forEach((m) => {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                tr.appendChild(td).textContent = m.name;
                const td2 = document.createElement('td');
                tr.appendChild(td2).textContent = m.semester;
                const td3 = document.createElement('td');
                tr.appendChild(td3).textContent = m.year;
                const td4 = document.createElement('td');
                tr.appendChild(td4).textContent = m.review;
                reviewList.appendChild(tr);
            });
        }
    });
    req.send();
}