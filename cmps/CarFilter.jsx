
import { carService } from "../services/car.service.js"
import { debounce } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function CarFilter({ defaultFilter, onSetFilter }) {

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

    // function handleTxtChange(ev) {
    //     setFilterByToEdit(filter => ({ ...filter, txt: ev.target.value }))
    // }

    // function handleMinSpeedChange(ev) {
    //     setFilterByToEdit(filter => ({ ...filter, minSpeed: +ev.target.value }))
    // }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilter(filterByToEdit)
    }

    const { txt, minSpeed } = filterByToEdit
    return (
        <section className="car-filter">
            <h2>Filter Our Cars</h2>
            <form onSubmit={onSubmitFilter}>
                <label htmlFor="txt">Vendor</label>
                <input value={txt} onChange={handleChange} type="text" name="txt" id="txt" />

                <label htmlFor="minSpeed">Min Speed</label>
                <input value={minSpeed} onChange={handleChange} type="number" name="minSpeed" id="minSpeed" />

                <button>Submit</button>
            </form>
        </section>
    )
}