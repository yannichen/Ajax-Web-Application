// TODO: add client side code for single page application
function getReviews() {
    const req = new XMLHttpRequest();
    const url = 'http://localhost:3000/api/reviews';
    req.open('GET', url, true);
    req.addEventListener('load', function handleReviews() {
        if (req.status >= 200 && req.status < 400) {
            const reviewList = document.getElementById('reviews-list');
            reviewList.innerHTML = '';
            const reviews = JSON.parse(req.responseText);
            reviews.forEach((m) => {
                const tr = document.createElement('tr');
                const td = document.createElement('td');
                tr.appendChild(td).textContent = m.name;
                const td2 = document.createElement('td');
                tr.appendChild(td2).textContent = m.semester;
                const td3 = document.createElement('td');
                tr.appendChild(td3).textContent = m.year;
                const td4 = document.createElement('td');
                tr.appendChild(td4).textContent = m.review;
                if (m.name !== null && m.year !== null && m.semester !== null && m.review !== null) {
                    reviewList.appendChild(tr);
                }
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
    const url = 'http://localhost:3000/api/review/create';
    req.open('POST', url, true);
    req.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    const semester = document.getElementById('semester').value;
    const name = document.getElementById('name').value;
    const year = document.getElementById('year').value;
    const review = document.getElementById('review').value;
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
    const year = document.getElementById('filterYear').value;
    const semester = document.getElementById('filterSemester').value;
    console.log(year + "FILTERREVIEWS");
    if (year.length > 0 && semester !== "") {
        console.log(url, "URL");
        url += '?year=' + year + '&semester=' + semester;
    } else if (semester !== "") {
        console.log(url, "URL");
        url += '?semester=' + semester;
    } else if (year.length > 0) {
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
                if (m.name !== null && m.year !== null && m.semester !== null && m.review !== null) {
                    reviewList.appendChild(tr);
                }
            });
        }
    });
    req.send();
}

function main() {
    const filterBtn = document.querySelectorAll('input[type="submit"]')[1];
    filterBtn.addEventListener('click', filter);
    const addBtn = document.querySelectorAll('input[type="submit"]')[0];
    addBtn.addEventListener('click', add);
}

document.addEventListener("DOMContentLoaded", main);