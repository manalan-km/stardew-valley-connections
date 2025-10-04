// PuzzleView.tsx
import { format } from 'date-fns'
import type { ProcessedData, PuzzleViewProps } from '../utils/models/Data'
import Cell from './Board/Board'
import MistakesIndicator from './MistakesIndicator/MistakesIndicator'
import Button from './HelperButtons/Button/Button'
import SolvedItems from './solvedItems/solvedItems'
import { checkIfCellExist } from '../utils/functions/utilFunctions'
import { MAX_ITEMS_IN_A_CATEGORY } from '../utils/constants/constants'
import './PuzzleViewer.css'
import Confetti from './Confetti/Confetti'
const PuzzleView = ({
    currentDate,
    mistakesLeft,
    selectedCells,
    solvedCategories,
    isGameComplete,
    disableButton,
    data,
    gameState,
    onCellClick,
    onShuffleClick,
    onSubmitClick,
    onDeselectAll,
}: PuzzleViewProps) => {
    const month_and_date = format(currentDate, 'MMMM dd')
    const year = format(currentDate, 'yyyy')

    return (
        <>
            <div className="mx-20 my-10 ">
                <span className="libre-franklin-thin">{`${month_and_date}, ${year}`}</span>
            </div>
            <div className="border-b-1 border-gray-200"></div>
            <div className="description flex justify-center my-4">
                Create four groups of four!
            </div>

            {gameState.hasSolvedCategories && (
                <SolvedItems solvedCategories={solvedCategories}></SolvedItems>
            )}

            <div className="flex justify-center mx-2">
                <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
                    <div className="grid grid-cols-4 gap-2">
                        {data
                            .filter((item: ProcessedData) => !item.isGuessed)
                            .map((item: ProcessedData) => (
                                <Cell
                                    id={`${item.id}`}
                                    key={item.position}
                                    content={item.item.toUpperCase()}
                                    isSelected={checkIfCellExist(
                                        item,
                                        selectedCells
                                    )}
                                    clickCallbackFunction={() =>
                                        onCellClick(item)
                                    }
                                    cellDisabled={
                                        !checkIfCellExist(
                                            item,
                                            selectedCells
                                        ) &&
                                        selectedCells.length ===
                                            MAX_ITEMS_IN_A_CATEGORY &&
                                        !disableButton
                                    }
                                />
                            ))}
                    </div>
                </div>
            </div>

            {isGameComplete && (
                <div className="text-center my-8">
                    <Confetti></Confetti>
                    <h2 className="text-2xl font-bold text-green-600 announcement">
                        Congratulations! You have solved today's puzzle!
                    </h2>
                </div>
            )}

            {gameState.hasNoMistakesLeft && (
                <div className="text-center my-8">
                    <h2 className="text-2xl font-bold text-red-600 announcement">
                        No more attempts left!
                    </h2>
                </div>
            )}

            {gameState.showGameControls && (
                <>
                    <div className="flex justify-center">
                        <MistakesIndicator
                            numberOfMistakesLeft={mistakesLeft}
                        ></MistakesIndicator>
                    </div>
                    <div className="flex justify-center">
                        <Button
                            className="mx-2 border-1 border-black-200 disabled:opacity-25"
                            content="Shuffle"
                            callbackFunction={onShuffleClick}
                        ></Button>
                        <Button
                            className="mx-2 border-1 border-black-200 disabled:opacity-25"
                            content="Deselect All"
                            callbackFunction={onDeselectAll}
                            disabled={!gameState.canDeselect}
                        ></Button>
                        <Button
                            className="mx-2 border-1 bg-black text-white border-white-200 disabled:opacity-25"
                            content="Submit"
                            callbackFunction={onSubmitClick}
                            disabled={!gameState.canSubmit}
                        ></Button>
                    </div>
                </>
            )}
        </>
    )
}

export default PuzzleView
