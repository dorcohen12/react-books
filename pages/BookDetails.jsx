import { LongTxt } from "../cmps/LongTxt.jsx"
import { BookService } from "../services/book.service.js"

const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function BookDetails() {
    const [book, setBook] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadBook()
    }, [params.bookId])

    function loadBook() {
        BookService.get(params.bookId)
            .then(setBook)
            .catch(err => {
                console.log('Problem getting book', err);
            })
    }

    function onBack() {
        navigate('/book')
        // navigate(-1)
    }

    function renderPageCount(pageCount) {
        if(pageCount > 500) {
            return 'Serious Reading'
        } else if(pageCount > 200) {
            return 'Descent Reading'
        } else {
            return 'Light Reading'
        }
    }
    function renderPublishedDate(publishedDate) {
        if(((new Date().getFullYear()) - publishedDate) > 10) {
            return 'Vintage';
        }
        return 'New';
    }

    // console.log('book:', book)
    console.log('Render');

    if (!book) return <div>Details Loading...</div>

    var isSaleClass = (book.listPrice.isOnSale ? 'sale' : '');
    var isExpensivePrice = (book.listPrice.amount > 150 ? 'red' : 'green');

    return (
        <section className="book-details">
            <h1>book title: {book.title}</h1>
            <h6>{book.subtitle}</h6>
            <strong>{renderPublishedDate(book.publishedDate)}</strong>
            <strong>{renderPageCount(book.pageCount)}</strong>
            <LongTxt txt={book.description} length="100" />
            <strong className={`${isSaleClass} ${isExpensivePrice}`}>{`${book.listPrice.amount} ${book.listPrice.currencyCode}`}</strong>
            <strong>Authors</strong>
            <ul>
                {book.authors.map(author =>
                    <li key={author}>{author}</li>
                )}
            </ul>
            <strong>Categories</strong>
            <ul>
                {book.categories.map(category =>
                    <li key={category}>{category}</li>
                )}
            </ul>
            <strong>Available at {book.language}</strong>
            <img src={`../assets/img/${book.thumbnail}`} alt="book-image" />
            <button onClick={onBack}>Back</button>
            <section>
                <button><Link to={`/book/${book.prevbookId}`}>Prev book</Link></button>
                <button><Link to={`/book/${book.nextbookId}`}>Next book</Link></button>
            </section>
        </section>
    )
}