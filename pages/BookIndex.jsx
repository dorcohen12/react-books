import { BookList } from "../cmps/BookList.jsx"
import { BookService } from "../services/book.service.js"

const { Link } = ReactRouterDOM

const { useEffect, useState } = React


export function BookIndex() {
    const [books, setBooks] = useState(null)
    const [filterBy, setFilterBy] = useState(BookService.getDefaultFilter())

    // console.log('cars:', cars)

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
            
            <section>
                <Link to="/book/edit">Add Book</Link>
            </section>
            <BookList
                books={books}
                onRemoveBook={onRemoveBook}
            />
        </section>
    )

}