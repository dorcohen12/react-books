const { useEffect, useState } = React

export function LongTxt({ txt, length = 100 }) {

    if(!txt) {
        return 'Invalid txt.'
    }

    const [showFullDescription, setFullDescription] = useState(false);

    const showFullDescriptionHandler = () => {
        setFullDescription(!showFullDescription);
    };

    const description = showFullDescription ? txt : `${txt.slice(0, length)}...`;
    
    return (
        <section className="long-txt">
            <p>{description}</p>
            <button onClick={showFullDescriptionHandler}>
                Read {showFullDescription ? "Less" : "More"}
            </button>
        </section>
    )
}