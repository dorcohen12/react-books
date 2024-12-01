
import { BookService } from "../services/book.service.js"
import { debounce } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function BookFilter({ defaultFilter, onSetFilter }) {

    const [filterByToEdit, setFilterByToEdit] = useState(defaultFilter)
    const onSetFilterDebounce = useRef(debounce(onSetFilter)).current

    useEffect(() => {
        onSetFilterDebounce(filterByToEdit)
    }, [filterByToEdit])

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
        setFilterByToEdit((prevFilter) => ({ ...prevFilter, [field]: value }))
    }

    // function handletitleChange(ev) {
    //     setFilterByToEdit(filter => ({ ...filter, title: ev.target.value }))
    // }

    // function handlepriceChange(ev) {
    //     setFilterByToEdit(filter => ({ ...filter, price: +ev.target.value }))
    // }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { title, price } = filterByToEdit
    return (
        <section className="book-filter">
            <h2>Filter Our Books</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="title">Title</label>
                <input value={title} onChange={handleChange} type="text" name="title" id="title" />

                <label htmlFor="price">Price</label>
                <input value={price} onChange={handleChange} type="number" name="price" id="price" />

                <button>Submit</button>
            </form>
        </section>
    )
}