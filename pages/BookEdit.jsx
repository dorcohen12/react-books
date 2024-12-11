
import { BookService } from "../services/book.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function BookEdit() {

    const [bookToEdit, setBookToEdit] = useState(BookService.getEmptyBook())
    const navigate = useNavigate()
    const { bookId } = useParams()

    const { title, listPrice: { amount } } = bookToEdit

    useEffect(() => {
        if (bookId) loadBook()
    }, [])

    function loadBook() {
        BookService.get(bookId)
            .then(setBookToEdit)
            .catch(err => {
                console.log('Problem getting book', err);
                showErrorMsg('Problem getting book');
            })
    }

    function handleChange({ target }) {
        let { value, name: field } = target
        console.log(target.value)
        switch (field) {
            case 'title':
                setBookToEdit((prevBook) => ({ ...prevBook, ['title']: target.value }))
                break;
            case 'amount':
                setBookToEdit((prevBook) => ({ ...prevBook, listPrice: {...prevBook.listPrice, amount: +target.value}}))
                break;
            /*case 'range':
            case 'number':
                value = +target.value
                setCurrAmount(value)
                break
            case 'checkbox':
                value = target.checked
                break*/
        }

    }

    function onSaveBook(ev) {
        ev.preventDefault()
        BookService.save(bookToEdit)
            .then(() => {
                showErrorMsg(`Book saved successfully!`);
                navigate('/book')
            })
            .catch(err => {
                console.log('Cannot save!', err)
            })

    }

    return (
        <section className="book-edit">
            <h1>{bookId ? 'Edit' : 'Add'} Book</h1>
            <form onSubmit={onSaveBook}>
                <label htmlFor="title">Title</label>
                <input onChange={handleChange} value={title} type="text" name="title" id="title" />

                <label htmlFor="amount">Price</label>
                <input onChange={handleChange} value={amount} type="number" name="amount" id="amount" />
                <button>Save</button>
            </form>
        </section>
    )

}