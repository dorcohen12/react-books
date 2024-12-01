
export function BookPreview({ book }) {

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

    var isSaleClass = (book.listPrice.isOnSale ? 'sale' : '');

    var isExpensivePrice = (book.listPrice.amount > 150 ? 'red' : 'green');

    return (
        <article className="book-preview">
            <img src={`/assets/img/${book.thumbnail}`} alt="thumbnail" />
            <h2>{book.title} ({renderPublishedDate(book.publishedDate)})</h2>
            <h6>{book.subtitle}</h6>
            <strong>{renderPageCount(book.pageCount)}</strong>
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
        </article>
    )
}