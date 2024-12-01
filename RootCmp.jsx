import { Team } from "./cmps/AboutCmps/Team.jsx"
import { Vision } from "./cmps/AboutCmps/Vision.jsx"
import { AppHeader } from "./cmps/AppHeader.jsx"
import { NotFound } from "./cmps/NotFound.jsx"
import { About } from "./pages/About.jsx"
import { CarDetails } from "./pages/CarDetails.jsx"
import { CarEdit } from "./pages/CarEdit.jsx"
import { CarIndex } from "./pages/CarIndex.jsx"
import { Home } from "./pages/Home.jsx"

const Router = ReactRouterDOM.HashRouter
const { Routes, Route, Navigate } = ReactRouterDOM


export function App() {

    return (
        <Router>
            <section className="app">
                <AppHeader />
                <main className="main-layout">
                    <Routes>
                        <Route path="/" element={<Navigate to="/home" />} />
                        <Route path="/home" element={<Home />} />
                        <Route path="/about" element={<About />}>
                            <Route path="/about/team" element={<Team />} />
                            <Route path="/about/vision" element={<Vision />} />
                        </Route>
                        <Route path="/car" element={<CarIndex />} />
                        <Route path="/car/:carId" element={<CarDetails />} />
                        <Route path="/car/edit" element={<CarEdit />} />
                        <Route path="/car/edit/:carId" element={<CarEdit />} />
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </main>
            </section>
        </Router>

    )
} 