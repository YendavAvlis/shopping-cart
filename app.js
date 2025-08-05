import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://shopping-cart-d7284-default-rtdb.europe-west1.firebasedatabase.app/'
}

const tl = gsap.timeline({defaults:{ opacity: 0, ease: 'power2'}});

function init(){
tl.from('#main', {ease:'linear', autoAlpha:0})
    .from('#input-field', {duration: .6,  y: 100})
    .from('#add-button', { scale: 0, ease:'back'}, '<')
    .from('#shopping-list', {duration: .6,  y: -100, ease:'back'}, 1)
    .from('.emoji', {duration: .6,  x: 100, ease:'back'}, 1)
}

window.addEventListener('load', function(e){
    init()
})

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")


console.log(app)

const inputField = document.querySelector('#input-field')
const addButton = document.querySelector('#add-button')
const shoppingList = document.querySelector('#shopping-list')
const main = document.querySelector('#main')
const shoppingListChild = shoppingList.children
const newDiv = document.createElement('div')
newDiv.classList.add('emoji')
newDiv.textContent = '🛒'
main.prepend(newDiv)



addButton.addEventListener('click', () => {
    let inputValue = inputField.value
    push(itemsInDB, inputValue)

    clearInputField()
    // for(let i = 0; i < shoppingListChild.length; i++){
    //     if(shoppingListChild[shoppingListChild.length -1] === true){
    //         tl.from(shoppingListChild[i], {opacity:0, scale: 0, ease: 'back'})
    //     }
    // }

})

onValue(itemsInDB, function(snapshot){

    if(snapshot.exists()){
        const itemsArray = Object.entries(snapshot.val())

        clearShoppingList()

        for(let i = 0; i < itemsArray.length; i++){
            const currentItem = itemsArray[i]

            addNewItem(currentItem)
        }
    } else {
        shoppingList.innerHTML = `
        <div id='info'><i class="fa-solid fa-basket-shopping"></i></div>
        <p>No items here yet...</p>`
    }

})

function clearInputField(){
    inputField.value = ''
}

function addNewItem(item){

    let newElement = document.createElement('li')
    let itemID = item[0]
    let itemValue = item[1]
    newElement.textContent = `${itemValue}`

    shoppingList.append(newElement)

    newElement.addEventListener('click', () => {
        let itemLocationInDB = ref(database, `items/${itemID}`)

        remove(itemLocationInDB)

    })
}

function clearShoppingList(){
    shoppingList.innerHTML = ''
}