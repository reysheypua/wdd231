const url = 'https://reysheypua.github.io/wdd231/chamber/data/members.json'
const display = document.querySelector('#display');

const gridButton = document.querySelector('#grid-btn');
const listButton = document.querySelector('#list-btn');

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.businesses);
}

const displayMembers = (members) => {
    display.innerHTML = "";

    members.forEach((member) => {
        let section = document.createElement('section');
        let businessName = document.createElement('h2');
        let tagLine = document.createElement('p');
        let logo = document.createElement('img');
        
        let email = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('p');

        businessName.textContent = member.name;
        tagLine.textContent = `"${member.tagline}"`;
        tagLine.classList.add("tagline");
        
        email.innerHTML = `<strong>EMAIL:</strong> ${member.email}`;
        phone.innerHTML = `<strong>PHONE:</strong> ${member.phone}`;
        website.innerHTML = `<strong>URL:</strong> ${member.website}`;

        logo.setAttribute('src', member.image);
        logo.setAttribute('alt', `Logo of ${member.name}`);
        logo.setAttribute('loading', 'lazy');
        logo.setAttribute('width', '225'); 
        logo.setAttribute('height', '225');

        section.appendChild(businessName);
        section.appendChild(tagLine);
        section.appendChild(logo);
        section.appendChild(email);
        section.appendChild(phone);
        section.appendChild(website);

        display.appendChild(section);
    });
}

gridButton.addEventListener("click", () => {
    display.classList.add("grid");
    display.classList.remove("list");
});

listButton.addEventListener("click", () => {
    display.classList.add("list");
    display.classList.remove("grid");
});

getMemberData();