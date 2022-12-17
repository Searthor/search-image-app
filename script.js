const input = document.querySelector('input');
const search_btn = document.querySelector('.btn');
const showmore = document.querySelector('.showmore');
const apiKey = "563492ad6f917000010000016956b14ef24142d88349741c24266c53"

let search_text ="";
let search = false;
page_num = 1;

input.addEventListener('input',(event) =>{
    event.preventDefault();
    search_text=event.target.value;
})

search_btn.addEventListener("click",()=>{
    if (input.value===""){
        alert("please enter some text");
        return;
    }
    cleargallery();
    search = true;
    searchPhotos(search_text,page_num);
})


function cleargallery(){
    document.querySelector('.display_images').innerHTML='';
    page_num=1;
}


async function fetcPhotos(page_num){
    const data =await fetch(`https://api.pexels.com/v1/curated?page=${page_num}`,
    {
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization:apiKey
        }
    });
    const response = await data.json();
    console.log(response);
    display_images(response);
}

function display_images(response){
    response.photos.forEach((image) =>{
        const photo = document.createElement("div");
        photo.innerHTML = `<img src=${image.src.large}>
        <figcaption>Photo by:${image.photographer}</figcaption>`;
        document.querySelector(".display_images").appendChild(photo);
    })
}


async function searchPhotos(query,page_num){
    const data =await fetch(`https://api.pexels.com/v1/search?query=${query}&page=${page_num}`,
    {
        method:"GET",
        headers:{
            Accept:"application/json",
            Authorization:apiKey
        }
    });
    const response = await data.json();
    console.log(response);
    display_images(response);
}


showmore.addEventListener("click",()=>{
    if(!search){
        page_num++;
        fetcPhotos(page_num)

    }
    else{
        if(search_text.value==="")return;
        page_num++;
        searchPhotos(search_text,page_num)
        
    }
})


fetcPhotos(page_num)