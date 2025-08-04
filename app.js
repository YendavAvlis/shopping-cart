import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue, remove } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

const appSettings = {
    databaseURL: 'https://shopping-cart-d7284-default-rtdb.europe-west1.firebasedatabase.app/'
}

const app = initializeApp(appSettings)
const database = getDatabase(app)
const itemsInDB = ref(database, "items")


console.log(app)

const inputField = document.querySelector('#input-field')
const addButton = document.querySelector('#add-button')
const shoppingList = document.querySelector('#shopping-list')

addButton.addEventListener('click', () => {
    let inputValue = inputField.value
    push(itemsInDB, inputValue)

    clearInputField()

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
        shoppingList.textContent = 'No items here yet...'
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