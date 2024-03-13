const groupItem = document.getElementsByClassName('group-items')[0]
const dialog = document.querySelector("dialog");
const title = document.getElementById('title')
const author = document.getElementById('author')
const page = document.getElementById('page')
const read = document.getElementById('read')

let array = [
    {
        id: 1,
        title: 'Pearls of life',
        author: 'Skwaila P. Maigoge',
        page: '64 pages',
        read: 'read'
    },
    {
        id: 2,
        title: 'You are born an original, do not die a copy',
        author: 'John Mason',
        page: '137 pages',
        read: 'read'
    },
    {
        id: 3,
        title: 'An enemy called average',
        author: 'John Mason',
        page: '189 pages',
        read: 'not read'
    },
]



const openModal = () => {
    title.value = ''
    author.value = ''
    page.value = ''
    read.value = ''
    dialog.showModal()
}

const closeModal = () => {
    dialog.close()
}

const readBook = (event) => {
    const read = document.getElementsByClassName(`read_${event.id}`)[0]
    array = array.map(element => event.id === element.id ? {...element, read: !element.read} : element)
    const item = array.find(element => event.id === element.id)
    if(item.read){
        read.classList.remove('not-read')
        read.classList.add('read')
        read.textContent = 'Read'
    }else {
        read.classList.remove('read')
        read.classList.add('not-read')
        read.textContent = 'Not read'
    }
}

const removeBook = (event) => {
    array = array.filter(element => element.id !== event.id)
    renderArray()
}

const submitInfo = (event) => {
    event.preventDefault()
    const maxValue = array.reduce((max, currentValue) => (
        max.id >= currentValue.id ? max: currentValue
    ))
    array.push({
        id: maxValue.id + 1,
        title: title.value,
        author: author.value,
        page: page.value,
        read: read.value,
    })
    title.value = ''
    author.value = ''
    page.value = ''
    read.value = ''
    renderArray()
    dialog.close()
}

const renderArray = () => {
    groupItem.textContent = ''
    for(let i of array){
        const itemContainer = document.createElement("div")
        itemContainer.classList.add('item-container')
        itemContainer.setAttribute('id',i.id);
        groupItem.appendChild(itemContainer)
        const titleDiv = document.createElement("div")
        const authorDiv = document.createElement("div")
        const pageDiv = document.createElement("div")
        const readButton = document.createElement("button")
        const removeButton = document.createElement("button")
        const item = array.find(element => i.id === element.id)

        readButton.addEventListener("click", () => readBook(i));
        removeButton.addEventListener("click", () => removeBook(i));

        titleDiv.textContent = i.title
        authorDiv.textContent = i.author
        pageDiv.textContent = i.page
        
        removeButton.textContent = 'Remove'

        titleDiv.classList.add(`title_${i.id}`)
        authorDiv.classList.add(`author_${i.id}`)
        pageDiv.classList.add(`page_${i.id}`)

        readButton.classList.add(`read_${i.id}`)
        readButton.classList.add('read')
        if(i.read){
            readButton.classList.add('read')
            readButton.textContent = 'Read'
        }else {
            readButton.classList.add('not-read')
            readButton.textContent = 'Not read'
        }
        removeButton.classList.add('remove')
        removeButton.classList.add(`remove_${i.id}`)

        itemContainer.appendChild(titleDiv)
        itemContainer.appendChild(authorDiv)
        itemContainer.appendChild(pageDiv)
        itemContainer.appendChild(readButton)
        itemContainer.appendChild(removeButton)
    }
}
renderArray()