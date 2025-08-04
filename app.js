import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js'
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.15.0/firebase-database.js'

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
    const itemsArray = Object.values(snapshot.val())

    clearShoppingList()

    for(let i = 0; i < itemsArray.length; i++){
        addNewItem(itemsArray[i])
    }
})

function clearInputField(){
    inputField.value = ''
}

function addNewItem(itemValue){
    shoppingList.innerHTML += `<li>${itemValue}</li>`
}

function clearShoppingList(){
    shoppingList.innerHTML = ''
}