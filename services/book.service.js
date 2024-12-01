import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const BOOK_KEY = 'booksDB'
_createBooks()

export const BookService = {
    query,
    get,
    remove,
    save,
    getEmptyBook,
    getDefaultFilter,
}

function query(filterBy = {}) {
    return storageService.query(BOOK_KEY)
        .then(books => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                books = books.filter(car => regExp.test(car.vendor))
            }
            if (filterBy.minSpeed) {
                books = books.filter(car => car.speed >= filterBy.minSpeed)
            }
            return books
        })
}

function get(carId) {
    return storageService.get(BOOK_KEY, carId)
        .then(_setNextPrevCarId)
}

function remove(carId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(BOOK_KEY, carId)
}

function save(car) {
    if (car.id) {
        return storageService.put(BOOK_KEY, car)
    } else {
        return storageService.post(BOOK_KEY, car)
    }
}

function getEmptyBook(title = '', price = '') {
    return { title, price }
}

function getDefaultFilter() {
    return { txt: '', minSpeed: '' }
}


function _setNextPrevCarId(car) {
    return query().then((books) => {
        const carIdx = books.findIndex((currCar) => currCar.id === car.id)
        const nextCar = books[carIdx + 1] ? books[carIdx + 1] : books[0]
        const prevCar = books[carIdx - 1] ? books[carIdx - 1] : books[books.length - 1]
        car.nextCarId = nextCar.id
        car.prevCarId = prevCar.id
        return car
    })
}

function _createBooks() {
    let books = loadFromStorage(BOOK_KEY)
    if (!books || !books.length) {
        books = [
            _createBook('Harry Potter', 300),
            _createBook('hidden figures', 120),
            _createBook('Bully', 50),
            _createBook('Scream', 150)
        ]
        saveToStorage(BOOK_KEY, books)
    }
}

function _createBook(title, price = 250) {
    const book = getEmptyBook(title, price)
    book.id = makeId()
    return book
}