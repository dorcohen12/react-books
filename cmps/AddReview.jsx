import { BookService } from "../services/book.service.js"

export function AddReview({bookId}) {

    const { useState, useEffect } = React

    const [reviewToAdd, setReviewToAdd] = useState({'fullName': '', 'rating': 1, 'readAt': ''})

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
        setReviewToAdd((prevReview) => ({ ...prevReview, [field]: value }))
    }

    function onAddReview(ev) {
        ev.preventDefault()
        BookService.addReview(bookId, reviewToAdd)
            .then(() => {
                showErrorMsg(`Review added successfully!`);
                navigate(`/book/${bookId}`)
            })
            .catch(err => {
                console.log('Cannot save!', err)
            })
    }

    const { fullName, rating, readAt } = reviewToAdd

    return (
        <section className="add-review">
            <h1>Add new Review</h1>
            <form onSubmit={onAddReview}>
                <div className="input-group">
                    <label htmlFor="fullName">Full Name</label>
                    <input onChange={handleChange} value={fullName} type="text" name="fullName" id="fullName" required />
                </div>

                <div className="star-wrap">
                    <input className="star" checked type="radio" value="-1" id="skip-star" name="rating" autoComplete="off" onChange={handleChange} />
                    <label className="star-label hidden"></label>
                    <input className="star" type="radio" id="st-1" value="1" name="rating" autoComplete="off" onChange={handleChange} />
                    <label className="star-label" htmlFor="st-1">
                        <div className="star-shape"></div>
                    </label>
                    <input className="star" type="radio" id="st-2" value="2" name="rating" autoComplete="off" onChange={handleChange} />
                    <label className="star-label" htmlFor="st-2">
                        <div className="star-shape"></div>
                    </label>
                    <input className="star" type="radio" id="st-3" value="3" name="rating" autoComplete="off" onChange={handleChange} />
                    <label className="star-label" htmlFor="st-3">
                        <div className="star-shape"></div>
                    </label>
                    <input className="star" type="radio" id="st-4" value="4" name="rating" autoComplete="off" onChange={handleChange} />
                    <label className="star-label" htmlFor="st-4">
                        <div className="star-shape"></div>
                    </label>
                    <input className="star" type="radio" id="st-5" value="5" name="rating" autoComplete="off" onChange={handleChange} />
                    <label className="star-label" htmlFor="st-5">
                        <div className="star-shape"></div>
                    </label>
                </div>

                <div className="input-group">
                    <label htmlFor="readAt">Completed reading at?</label>
                    <input onChange={handleChange} value={readAt} type="date" name="readAt" id="readAt" required />
                </div>
                <button>Add</button>
            </form>
        </section>
    )
}