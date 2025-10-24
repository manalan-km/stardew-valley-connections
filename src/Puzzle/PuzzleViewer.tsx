import type { ProcessedData, PuzzleViewProps } from '../utils/models/Data'
import Cell from './Board/Board'
import MistakesIndicator from './MistakesIndicator/MistakesIndicator'
import Button from '../Button/Button'
import SolvedItems from './solvedItems/solvedItems'
import { checkIfCellExist } from '../utils/functions/utilFunctions'
import { MAX_ITEMS_IN_A_CATEGORY } from '../utils/constants/constants'
import './PuzzleViewer.css'
import Confetti from './Confetti/Confetti'
const PuzzleView = ({
    mistakesLeft,
    selectedCells,
    solvedCategories,
    isGameSolved,
    disableButton,
    data,
    gameState,
    onCellClick,
    onShuffleClick,
    onSubmitClick,
    onDeselectAll,
}: PuzzleViewProps) => {
    return (
        <div>
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

            {isGameSolved && !gameState.hasNoMistakesLeft && (
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
                    <div className="flex justify-center px-2 w-full">
                        <Button
                            className="mx-1 sm:mx-2 border-1 border-black-200 disabled:opacity-25 p-1 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
              text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base rounded-full"
                            content="Shuffle"
                            contentClassName="px-3 sm:px-6 py-2"
                            callbackFunction={onShuffleClick}
                        ></Button>
                        <Button
                            className="mx-1 sm:mx-2 border-1 border-black-200 disabled:opacity-25 p-1 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
              text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base rounded-full"
                            content="Deselect All"
                            contentClassName="px-2 sm:px-6 py-2"
                            callbackFunction={onDeselectAll}
                            disabled={!gameState.canDeselect}
                        ></Button>
                        <Button
                            className="mx-1 sm:mx-2 border-1 bg-black text-white border-white-200 disabled:opacity-25 p-1 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
              text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base rounded-full"
                            content="Submit"
                            contentClassName="px-3 sm:px-6 py-2"
                            callbackFunction={onSubmitClick}
                            disabled={!gameState.canSubmit}
                        ></Button>
                    </div>
                </>
            )}
        </div>
    )
}

export default PuzzleView
