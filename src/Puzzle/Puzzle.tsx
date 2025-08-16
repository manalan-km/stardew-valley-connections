import './Puzzle.css'

import { format } from 'date-fns'

const Puzzle = () => {
    const current_date = new Date()
    const month_and_date = format(current_date, 'MMMM dd')
    const year = format(current_date, 'yyyy')
    return (
        <>
            <div className="mx-20 my-10 ">
                <span className="Date">{`${month_and_date}, ${year}`}</span>
            </div>
            <div className="border-b-1 border-gray-200"></div>
        </>
    )
}

export default Puzzle
