import { format } from 'date-fns'
import './Header.css'

const Header = () => {
    const currentDate: Date = new Date()
    const month_and_date = format(currentDate, 'MMMM dd')
    const year = format(currentDate, 'yyyy')
    return (
        <>
            <div className="text-center md:text-left border-b-1 border-gray-200">
                <h2 className="header mx-5 my-1">Stardew Valley Connexions</h2>
            </div>

            <div className="mx-20 my-10 ">
                <span className="libre-franklin-thin">{`${month_and_date}, ${year}`}</span>
            </div>
            <div className="border-b-1 border-gray-200"></div>
        </>
    )
}

export default Header
