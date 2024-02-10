const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7f9bbe9b5ed99f038c60db0813faa5e4&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w300_and_h450_bestv2';
const SEARCHAPI = "https://api.themoviedb.org/3/search/movie?&api_key=7f9bbe9b5ed99f038c60db0813faa5e4&query=";

const main = document.getElementById("section");
const form = document.getElementById("form");
const search = document.getElementById("query");

returnMovies(APILINK);

function returnMovies(url) {
    fetch(url).then(res => res.json())
    .then(function(data){
        console.log(data.results);
        data.results.forEach(element => {
            const div_card = document.createElement('div');
            div_card.setAttribute('class','card');
            const div_row = document.createElement('div');
            div_row.setAttribute('class','row');
            const div_column = document.createElement('div');
            div_column.setAttribute('class','column');
            const image = document.createElement('img');
            image.setAttribute('class','thumbnail');
            image.setAttribute('id','image');
            const title = document.createElement('h3');
            title.setAttribute('id','title');
            const center = document.createElement('center');

            title.innerHTML = `${element.title}`;
            image.src = IMG_PATH + element.poster_path;
            center.appendChild(image);
            div_card.appendChild(center);
            div_card.appendChild(title);
            div_column.appendChild(div_card);
            div_row.appendChild(div_column);
            main.appendChild(div_row);

        });
    });
}

form.addEventListener('submit',(e)=>{
    e.preventDefault();
    main.innerHTML= '';
    const searchItem = search.value;
    if(searchItem){
        returnMovies(SEARCHAPI + searchItem);
        search.value='';
    }
});
