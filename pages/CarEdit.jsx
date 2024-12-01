
import { carService } from "../services/car.service.js"

const { useState, useEffect } = React
const { useNavigate, useParams } = ReactRouterDOM

export function CarEdit() {

    const [carToEdit, setCarToEdit] = useState(carService.getEmptyCar())
    const navigate = useNavigate()
    const { carId } = useParams()

    useEffect(() => {
        if (carId) loadCar()
    }, [])

    function loadCar() {
        carService.get(carId)
            .then(setCarToEdit)
            .catch(err => {
                console.log('Problem getting car', err);
            })
    }

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
        setCarToEdit((prevCar) => ({ ...prevCar, [field]: value }))
    }

    function onSaveCar(ev) {
        ev.preventDefault()
        carService.save(carToEdit)
            .then(() => navigate('/car'))
            .catch(err => {
                console.log('Cannot save!', err)
            })

    }


    const { vendor, speed } = carToEdit
    return (
        <section className="car-edit">
            <h1>{carId ? 'Edit' : 'Add'} Car</h1>
            <form onSubmit={onSaveCar}>
                <label htmlFor="vendor">Vendor</label>
                <input onChange={handleChange} value={vendor} type="text" name="vendor" id="vendor" />

                <label htmlFor="speed">Speed</label>
                <input onChange={handleChange} value={speed} type="number" name="speed" id="speed" />
                <button>Save</button>
            </form>
        </section>
    )

}