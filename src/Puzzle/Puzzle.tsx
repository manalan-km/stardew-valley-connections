import Board from './Board/Board'
import HelperButtons from './HelperButtons/HelperButtons'
import MistakesIndicator from './MistakesIndicator/MistakesIndicator'
import './Puzzle.css'

import { format } from 'date-fns'

const Puzzle = () => {
    const current_date = new Date()
    const month_and_date = format(current_date, 'MMMM dd')
    const year = format(current_date, 'yyyy')

    const mistakesLeft: number = 4
    return (
        <>
            <div className="mx-20 my-10 ">
                <span className="libre-franklin-thin">{`${month_and_date}, ${year}`}</span>
            </div>
            <div className="border-b-1 border-gray-200"></div>
            <div className="description flex justify-center my-4">
                Create four groups of four!
            </div>
            <div className="flex justify-center">
                <Board></Board>
            </div>
            <div className="flex justify-center">
                <MistakesIndicator
                    numberOfMistakesLeft={mistakesLeft}
                ></MistakesIndicator>
            </div>
            <div className="flex justify-center">
                <HelperButtons></HelperButtons>
            </div>
        </>
    )
}

export default Puzzle
