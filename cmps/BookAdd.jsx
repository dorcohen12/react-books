import { debounce } from "../services/util.service.js"
import { GoogleService } from "../services/google.service.js"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { BookService } from "../services/book.service.js"

const { useState, useEffect, useRef } = React

export function BookAdd({books, onSearchResults}) {

    const [bookTitle, setBookTitle] = useState('')
    const [bookSearchResults, setBookSearchResults] = useState([])

    useEffect(() => {
        if(bookTitle) loadBooks()
    }, [bookTitle])

    function loadBooks() {
        GoogleService.getBooks(bookTitle)
            .then(setBookSearchResults)
            .catch(err => {
                console.log('No results found', err)
                showErrorMsg('No results found.')
            })
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        switch (target.type) {
            case 'range':
            case 'number':
                value = +target.value
                break
            case 'checkbox':
                value = target.checked
                break
        }
        setBookTitle(target.value);
    }

    function onAddBook(book) {
        if (
			books.some(
				(localBook) =>
					localBook.title === book.volumeInfo.title
			)
		) {
            return showErrorMsg("This book is already in our database!")
        }
        BookService.addGoogleBook(book)
				.then(onSearchResults())
				.then(
                    showSuccessMsg("Book added successfully"))
				.catch((err) => {
					showErrorMsg("Unable to add book from google API")
					console.error(err)
				})
    }

    if(bookSearchResults) {
        console.log(bookSearchResults)
    }

    return (
        <section className="book-add">
            <h3>Add via Google API</h3>
            <form>
                <div className="input-group">
                    <label htmlFor="title">Title</label>
                    <input onChange={handleChange} type="text" name="title" id="title" />
                </div>
            </form>
            {bookSearchResults.length > 0 && (
                <ul className="search-results">
                    {bookSearchResults.map((book) => (
                       <li key={book.id}>
                            <span>{book.volumeInfo.title}</span>
                            <button className="button" onClick={() => onAddBook(book)}>+</button>
                       </li>
                    ))}
                </ul>
            )}
        </section>
    )
}