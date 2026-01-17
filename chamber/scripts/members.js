const url = 'https://reysheypua.github.io/wdd231/chamber/data/members.json'
const display = document.querySelector('#display');

const gridButton = document.querySelector('#grid-btn');
const listButton = document.querySelector('#list-btn');

async function getMemberData() {
    const response = await fetch(url);
    const data = await response.json();
    displayMembers(data.businesses);

    display.classList.add("grid");
}

const displayMembers = (members) => {
    display.innerHTML = "";

    members.forEach((member) => {
        let section = document.createElement('section');
        let businessName = document.createElement('h2');
        let tagLine = document.createElement('p');
        let logo = document.createElement('img');
        let industry = document.createElement('p');
        let address = document.createElement('p');
        let infoContainer = document.createElement('div');
        let email = document.createElement('p');
        let phone = document.createElement('p');
        let website = document.createElement('p');

        businessName.textContent = member.name;
        tagLine.textContent = `"${member.tagline}"`;
        industry.textContent = member.industry;
        address.textContent = member.address;

        tagLine.classList.add("tagline");
        industry.classList.add('industry');
        address.classList.add('address');
        infoContainer.classList.add('contact-container');
        email.classList.add('email');
        
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
        section.appendChild(industry);
        section.appendChild(address);

        infoContainer.appendChild(email);
        infoContainer.appendChild(phone);
        infoContainer.appendChild(website);
        section.appendChild(infoContainer);

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