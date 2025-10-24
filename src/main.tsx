import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, Route, Routes } from 'react-router'
import Header from './Header/Header.tsx'
import LandingPage from './LandingPage/LandingPage.tsx'
import Footer from './Footer/Footer.tsx'

const root = document.getElementById('root')!

createRoot(root).render(
    <BrowserRouter>
        <div className="flex flex-col h-screen">
            <Header />
            <main className="flex-1 overflow-auto">
                <Routes>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/challenge" element={<App />} />
                </Routes>
            </main>
            <Footer />
        </div>
    </BrowserRouter>
)
