import { BookFilter } from "../cmps/BookFilter.jsx"
import { BookList } from "../cmps/BookList.jsx"
import { BookService } from "../services/book.service.js"

const { Link } = ReactRouterDOM

const { useEffect, useState } = React


export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(BookService.getDefaultFilter())

    useEffect(() => {
        loadBooks()
    }, [filterBy])

    function loadBooks() {
        BookService.query(filterBy)
            .then(setBooks)
            .catch(err => {
                console.log('Problems getting book:', err)
            })
    }

    function onRemoveBook(bookId) {
        BookService.remove(bookId)
            .then(() => {
                setBooks(books => books.filter(book => book.id !== bookId))
            })
            .catch(err => {
                console.log('Problems removing book:', err)
            })
    }

    function onSetFilter(filterBy) {
        // console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    // console.log('index render');
    
    if (!books) return <div>Loading...</div>
    return (
        <section className="book-index">
            
            <section className="add-book">
                <Link to="/book/edit" className="text-dark">Add Book</Link>
            </section>

            <BookFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />

            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )

}