import { carService } from "../services/car.service.js"

const { useEffect, useState } = React
const { useParams, useNavigate, Link } = ReactRouterDOM


export function CarDetails() {
    const [car, setCar] = useState(null)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        loadCar()
    }, [params.carId])

    function loadCar() {
        carService.get(params.carId)
            .then(setCar)
            .catch(err => {
                console.log('Problem getting car', err);
            })
    }

    function onBack() {
        navigate('/car')
        // navigate(-1)
    }

    // console.log('car:', car)
    console.log('Render');

    if (!car) return <div>Details Loading...</div>
    return (
        <section className="car-details">
            <h1>Car Vendor: {car.vendor}</h1>
            <h1>Car Speed: {car.speed}</h1>
            <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Facilis quae fuga eveniet, quisquam ducimus modi optio in alias accusantium corrupti veritatis commodi tenetur voluptate deserunt nihil quibusdam. Expedita, architecto omnis?</p>
            <img src={`../assets/img/${car.vendor}.png`} alt="car-image" />
            <button onClick={onBack}>Back</button>
            <section>
                <button><Link to={`/car/${car.prevCarId}`}>Prev Car</Link></button>
                <button><Link to={`/car/${car.nextCarId}`}>Next Car</Link></button>
            </section>
        </section>
    )
}