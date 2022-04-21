// TODO: add client side code for single page application
function getReviews() {
    const url = 'http://localhost:3000/api/reviews';
    fetch(url).then(function(response) { return response.json(); })
        .then(function(data) {
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
        });
}

function add(evt) {
    evt.preventDefault();
    const url = 'http://localhost:3000/api/review/create';
    const semester = document.getElementById('semester').value;
    const name = document.getElementById('name').value;
    const year = document.getElementById('year').value;
    const review = document.getElementById('review').value;
    const data = `name=${name}&semester=${semester}&year=${year}&review=${review}`;
    fetch(url, {
        method: "POST",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
        },
        body: data
    }).then(function(response) {
        if (response.status >= 200 && response.status < 400) {
            getReviews();
        }
    });

}

function filter(evt) {
    evt.preventDefault();
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
    fetch(url).then(function(response) { return response.json(); })
        .then(function(data) {
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
        });

}

function main() {
    const filterBtn = document.querySelectorAll('input[type="submit"]')[1];
    filterBtn.addEventListener('click', filter);
    const addBtn = document.querySelectorAll('input[type="submit"]')[0];
    addBtn.addEventListener('click', add);
}

document.addEventListener("DOMContentLoaded", main);