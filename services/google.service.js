
export const GoogleService = {
    getBooks
}

async function getBooks(title) {
    if(!title) {
        return false;
    }
    title = title.trim();
    try {
        const bookRecordsAPI = await fetch(`https://www.googleapis.com/books/v1/volumes?printType=books&q=${title}`)
        console.log(bookRecordsAPI)
        if(!bookRecordsAPI || !bookRecordsAPI.ok) {
            throw new Error(`Hmm.. ${bookRecordsAPI.status}`);
        }
        const bookRecords = await bookRecordsAPI.json();
        return bookRecords.items
    } catch (error) {
        console.log('Unable to fetch data', error)
    }
}