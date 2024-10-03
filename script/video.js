// time functions 
function getTimeString(time){
    const hour = parseInt(time / 3600);
    let remaingSecond = parseInt(time % 3600);
    const minutes = parseInt(remaingSecond / 60);
    remaingSecond = remaingSecond % 60;
    return `${hour} hour ${minutes} minute ${remaingSecond} second ago`
}
// fetch, load and show Categories html
//create loadCategories
const loadCategories = () => {
    // fetch the data
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
    .then((res ) => res.json())
    .then((data) => diplayCategories(data.categories))
    .catch((err) => console.error(err)
    )
}

// videos categoies 
const loadVideos = (search = "") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title=${search}`)
    .then((res) => res.json())
    .then((data) => displayVideos(data.videos))
    .catch((error) => console.log(error))
}

const removeActiveClass =() =>{
    const buttons = document.getElementsByClassName('category-btn');
    console.log(buttons);
    for(let btn of buttons){
        btn.classList.remove('bg-red-500');
        btn.classList.remove('text-white');
    }
}

const loadCategoryVideos = (id)=>{
    // alert(id);
    fetch(`https://openapi.programming-hero.com/api/phero-tube/category/${id}`)
    .then((res) => res.json())
    .then((data) => {
        const activeBtn = document.getElementById(`btn-${id}`);
        // class will be inactive
        removeActiveClass()
        // id will be active
        activeBtn.classList.add('bg-red-500');
        activeBtn.classList.add('text-white');
        // console.log(activeBtn)
        displayVideos(data.category)
    })
    .catch((error) => console.log(error))
}

const loadVideosDetails =async (videoId) =>{
    console.log(videoId);
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`;
    const res = await fetch(url);
    const data = await res.json();
    console.log(data)
    displayVDetails(data.video);
}
const displayVDetails = (param) => {
    console.log(param);
    const detailsContainer = document.getElementById("modal-content");
    detailsContainer.innerHTML = `
            <img
                src=${param.thumbnail} />
            <p>${param.description}</p>
    `
    // way-1
    // document.getElementById('showModalData').click();
    // way-2
    document.getElementById("customModal").showModal();
}

//craete diplayCategories
const diplayCategories = (categories) => {
    const categoriesContainer = document.getElementById('categoriess')
        categories.forEach((item) => {
            console.log(item);

            // creat a button 
            const buttonContainer = document.createElement('div');
            buttonContainer.innerHTML = `
                <button id="btn-${item.category_id}" onclick="loadCategoryVideos(${item.category_id})" class="btn category-btn">
                    ${item.category}
                </button>
            `

            // add button to categories container
            categoriesContainer.appendChild(buttonContainer)
        });
}

// create displayVideos function 
const displayVideos = (videos) =>{
    const videosContainer = document.getElementById('videoss');
    videosContainer.innerHTML = "";
    if(videos.length == 0){
        videosContainer.classList.remove('grid')
        videosContainer.innerHTML = `
            <div class="min-h-[300px] flex flex-col justify-center items-center gap-5">
                <img src="./assets/Icon.png"/>
                <h2 class="text-center font-bold text-xl">
                  No Content Here in This Category.
                </h2>
            </div>
        `;
        return
    }else{
        videosContainer.classList.add('grid')
    }
    videos.forEach((video) => {
        console.log(video);

        // create video div 
        const card = document.createElement('div');
        card.classList = "card card-compact";
        card.innerHTML = `
            <figure class="h-[200px] relative">
                <img
                src=${video.thumbnail}
                class="h-full w-full object-cover"
                alt="Shoes" />
                ${video.others.posted_date?.length == 0 ? "" : `
                    <span class="absolute text-xs right-2 bottom-2 bg-black rounded-md p-1 text-white">${getTimeString(video.others.posted_date)}</span>
                    `}
            </figure>
            <div class="px-0 py-2 flex gap-2">
                <div>
                <img class="h-10 w-10 rounded-full object-cover" src=${video.authors[0].profile_picture} />
                </div>
                <div>
                <h2 class="font-bold">${video.title}</h2>
                <div class="flex items-center gap-2">
                    <p class="text-gray-400">${video.authors[0].profile_name}</p>
                    ${video.authors[0].verified === true ?
                    `<img class="w-5" src="https://img.icons8.com/?size=100&id=D9RtvkuOe31p&format=png&color=000000"/> ` : ''}
                </div>
                <p><button onclick="loadVideosDetails('${video.video_id}')" class="btn btn-error btn-sm">Details</button></p>
                </div>
            </div>
        `
        // append video div in the display section 
        videosContainer.appendChild(card)
    })
}

document.getElementById('search-input').addEventListener('keyup',(e)=>{
   loadVideos(e.target.value) 
})

loadCategories();
loadVideos()