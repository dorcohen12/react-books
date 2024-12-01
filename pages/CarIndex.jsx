import { CarFilter } from "../cmps/CarFilter.jsx"
import { CarList } from "../cmps/CarList.jsx"
import { carService } from "../services/car.service.js"
const { Link } = ReactRouterDOM

const { useEffect, useState } = React


export function CarIndex() {
    const [cars, setCars] = useState(null)
    const [filterBy, setFilterBy] = useState(carService.getDefaultFilter())

    // console.log('cars:', cars)

    useEffect(() => {
        loadCars()
    }, [filterBy])

    function loadCars() {
        carService.query(filterBy)
            .then(setCars)
            .catch(err => {
                console.log('Problems getting cars:', err)
            })
    }

    function onRemoveCar(carId) {
        carService.remove(carId)
            .then(() => {
                setCars(cars => cars.filter(car => car.id !== carId))
            })
            .catch(err => {
                console.log('Problems removing car:', err)
            })
    }

    function onSetFilter(filterBy) {
        // console.log('filterBy:', filterBy)
        setFilterBy(prevFilter => ({ ...prevFilter, ...filterBy }))
    }
    // console.log('index render');
    
    if (!cars) return <div>Loading...</div>
    return (
        <section className="car-index">
            <CarFilter defaultFilter={filterBy} onSetFilter={onSetFilter} />

            <section>
                <Link to="/car/edit">Add Car</Link>
            </section>
            <CarList
                cars={cars}
                onRemoveCar={onRemoveCar}
            />
        </section>
    )

}