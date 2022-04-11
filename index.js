const resultsNav = document.getElementById('resultsNav');
const favoritesNav = document.getElementById('favoritesNav');
const imagesContainer = document.querySelector('.images-container');
const saveConfirmed = document.querySelector('.save-confirmed');
const loader = document.querySelector('.loader');

// NASA api
const count = 10;
const apikey = 'DEMO_KEY';
const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&count=${count}`;

let resultsArray = [];
let favorites = {};

// scroll to top rmove loader show content
function showContent(page) {
    window.scrollTo({top: 0, behavior: 'instant'});
    loader.classList.add(`hidden`);
    if(page === 'results'){
        resultsNav.classList.remove('hidden');
        favoritesNav.classList.add('hidden');
    }else{
        resultsNav.classList.add('hidden');
        favoritesNav.classList.remove('hidden');
    }
}

function createDOMNodes(pages){
    // load resultsArray or favorites
    const currentArray = page==='results'?resultsArray:Object.values(favorites);
    currentArray.forEach((result)=> {
        // card container
        const card=document.createElement('div');
        card.classList.add('card');
        // link
        const link = document.createElement('a');
        link.href = result.hdurl;
        link.title = 'View Full Image';
        link.target = '_blank';

        // image
        const image = document.createElement('img');
        image.src = result.url;
        image.alt = 'NASA Picture of the Day';
        image.loading = 'lazy';
        image.classList.add('card-img-top');

        // card body
        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        // card title
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = result.title;

        // save text
        const saveText = document.createElement('p');
        saveText.classList.add('clickable');
        if(page==='results'){
            saveText.textContent = 'Add To Favorites';
            saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);
        }else{
            saveText.textContent = 'Remove Favorite';
            saveText.setAttribute('onclick', `removeFavorite('${result.url}')`);

        }
        // card text
        const cardText = document.createElement('p');
        cardText.textContent = result.explanation;
        // footer container
        const footer=document.createElement('small');
        footer.classList.add('text-muted');
        // date
        const date = document.createElement('strong');
        date.textContent=result.date;
        // copyright
        const copyrightResult=result.copyright===undefined ? '':result.copyright;
        const copyright=document.createElement('strong');
        date.textContent=result.date;

        // append
        footer.append(date, copyright);
        cardBody.append(cardTitle, saveText, cardText, footer);
        link.appendChild(image);
        card.append(link, cardBody);
        imagesContainer.appendChild(card);
    });
}

