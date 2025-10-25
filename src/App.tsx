import { BrowserRouter, Routes, Route } from 'react-router'
import './App.css'
import Footer from './Footer/Footer'
import Header from './Header/Header'
import LandingPage from './LandingPage/LandingPage'
import PuzzleHandler from './Puzzle/PuzzleHandler'
import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import type { Data } from './utils/models/Data'

const current_date = new Date()

function App() {
    const [apiData, setApiData] = useState<Data>({ categories: [], id: '' })
    const [isApiError, setIsApiError] = useState<boolean>(false)
    const [isApiLoading, setIsApiLoading] = useState<boolean>(true)

    useEffect(() => {
        setIsApiLoading(true)

        const url =
            import.meta.env.SV_API_BASE_URL +
            '/challenge/' +
            format(current_date, 'yyyy-MM-dd')
        fetch(url)
            .then((response) => response.json())
            .then((api_data: Data) => {
                setApiData(api_data)

                setIsApiError(false)

                setTimeout(() => {
                    setIsApiLoading(false)
                }, 500)
            })
            .catch((err) => {
                console.log(err.message)
                setIsApiError(true)
            })
    }, [])
    if (isApiError === true) {
        return (
            <>
                <p>Something went wrong</p>
            </>
        )
    } else {
        return (
            <BrowserRouter>
                <div className="flex flex-col h-screen">
                    <Header />
                    <main className="flex-1 overflow-auto">
                        <Routes>
                            <Route
                                path="/"
                                element={
                                    <LandingPage
                                        challengeID={apiData.id}
                                        isAPILoading={isApiLoading}
                                        isAPIError={isApiError}
                                    />
                                }
                            />
                            <Route
                                path="/challenge"
                                element={<PuzzleHandler APIData={apiData} />}
                            />
                        </Routes>
                    </main>
                    <Footer />
                </div>
            </BrowserRouter>
        )
    }
}

export default App
