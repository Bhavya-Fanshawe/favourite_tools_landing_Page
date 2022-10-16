(() => {
    const buttons = document.querySelectorAll(".button"),
        itemName = document.querySelector(".item-name"),
        itemSubtitle = document.querySelector(".item-subtitle"),
        itemDesc = document.querySelector(".item-desc"),
        itemUserText = document.querySelector(".item-user-text"),
        itemEmail = document.querySelector(".item-email"),
        closeButton = document.querySelector(".close-link-right"),
        nextItemButton = document.querySelector(".secondary-cta");

let favorites = {};
let itemList = ['figma', 'notion', 'slack'];
let currentItemIndex = 0;

function getThings(){
    fetch("./data.json")
        .then(res => res.json())
        .then(data => {
            favorites = data;})
        .catch(error => console.error(error));
    }

getThings();

function onNextClick() {
    let modal = document.querySelector(".popup-screen");
    modal.style.display = "block";

    let key = itemList[(currentItemIndex + 1) % (itemList.length)];
    currentItemIndex = currentItemIndex + 1;
    let picture = document.querySelector(".users-tag");

    picture.querySelector("img").src =`images/${favorites[key].pic}`;
    itemName.textContent = favorites[key].name;
    itemSubtitle.textContent = favorites[key].subTitle;
    itemDesc.textContent = favorites[key].description;
    itemUserText.textContent = favorites[key].userText;
    itemEmail.textContent = favorites[key].email;
}

function showData(){
    let modal = document.querySelector(".popup-screen");
    modal.style.display = "block";

    let key = this.dataset.key;
    let itemIndex = itemList.findIndex((item) => item == key);
    if (itemIndex != -1) {
        currentItemIndex = itemIndex;
    }
    let picture = document.querySelector(".users-tag");

    picture.querySelector("img").src =`images/${favorites[key].pic}`;
    itemName.textContent = favorites[key].name;
    itemSubtitle.textContent = favorites[key].subTitle;
    itemDesc.textContent = favorites[key].description;
    itemUserText.textContent = favorites[key].userText;
    itemEmail.textContent = favorites[key].email;
}

function closeModal(){
    let modal = document.querySelector(".popup-screen");
    modal.style.display = "none";
}

buttons.forEach(button => button.addEventListener("click", showData));
closeButton.addEventListener("click",closeModal);
nextItemButton.addEventListener("click", onNextClick);
})()