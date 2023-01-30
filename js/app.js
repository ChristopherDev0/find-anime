const selectBtn = document.querySelectorAll('.select-btn');

addClick();
function addClick () {
    selectBtn.forEach( element => {
        element.addEventListener('click', ()=> {
            let desplegar = element.parentElement;
            desplegar.classList.toggle('active');
            mostrarText(desplegar);
        })
      });
}

function mostrarText(desplegar) {
    const options = desplegar.querySelectorAll('.option');
    const txtClase = desplegar.querySelector('.sBtn-text');
    options.forEach(textElement => {
        textElement.addEventListener('click', () => {
            let selectOption = textElement.querySelector('.option-text').innerText;
            txtClase.innerText = selectOption;
            filterSelect(selectOption); 
            desplegar.classList.remove('active');
        })
    })
} 

const genre = document.querySelector('#genre');
const episodes = document.querySelector('#episodes');
const year = document.querySelector('#year');
const animeFound = document.querySelector('#animeFound');
const showAll = document.querySelector('#show-all');
const dataSelect = {
    year: '',
    episodes: '',
    genre: '',
}
document.addEventListener('DOMContentLoaded', () => {
    showAll.addEventListener('click', () => {
        showAnime(animes);
    })
});

//funtions
function showAnime(animes) {
    cleanTHML();

    animes.forEach( anime => {
        const divHtml = document.createElement('div');
        animeFound.appendChild(divHtml);
        divHtml.classList.add('dataAnime');

        const {img, name, year, episodes} = anime;
        const textAnime = document.createElement('p');
        const textAnime2 = document.createElement('p');
        const imgAnime = document.createElement('img');
        textAnime.textContent = `${name} | Year: ${year}`;
        textAnime2.textContent = `Episodes: ${episodes}`;
        imgAnime.src = `${img}`;

        divHtml.appendChild(imgAnime);
        divHtml.appendChild(textAnime);
        divHtml.appendChild(textAnime2);
    })
}

function cleanTHML() {
    while(animeFound.firstChild){
        animeFound.removeChild(animeFound.firstChild);
    }
}

function filterSelect(select) {
    if(select === 'Action' || select === 'Romance' || select === 'Comedy'){
        dataSelect.genre = select;
        filterAnime();
    }
    if(select === '01 - 12' || select === '12 - 24' || select === '+ 24'){
        dataSelect.episodes = select;
        filterAnime();
    }
    if(select === '1980 - 1990' || select === '1990 - 2005' || select === '2005 - 2023'){
        dataSelect.year = select;
        filterAnime();
    }
}

function filterAnime(){
    const result = animes.filter( filterGenre ).filter( filterEpisodes ).filter( filterYear );

   if(result.length){
    showAnime(result);
   }else{
    noResult();
   }
}

function filterGenre(anime) {
    if(dataSelect.genre){
        return anime.genre === dataSelect.genre;
    }
    return anime;
}
function filterEpisodes(anime){
    if(dataSelect.episodes){
        return anime.episodes === dataSelect.episodes;
    }
    return anime;
}
function filterYear(anime){
    if(dataSelect.year){
        return anime.year === dataSelect.year;
    }
    return anime;
}

function noResult() {
    cleanTHML();
    const noResult = document.createElement('div');
    noResult.classList.add('noResult');
    noResult.textContent = 'SORRY THERE ARE NOT RESULTS';
    animeFound.appendChild(noResult);
}