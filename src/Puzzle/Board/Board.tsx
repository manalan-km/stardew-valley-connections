/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import './Board.css'

const Cell = ({
    content,
    isSelected,
    clickCallbackFunction,
    cellDisabled = false,
}: {
    content: string
    isSelected: boolean
    clickCallbackFunction: Function
    cellDisabled?: boolean
}) => {

    console.log(cellDisabled)
    return (
        <>
            <button
                onClick={() => clickCallbackFunction()}
                type="button"
                className={`rounded-lg m-0.1 cell-content flex items-center justify-center min-h-[60px] sm:min-h-[80px] md:min-h-[100px] hover:cursor:pointer ${
                    isSelected ? 'bg-[#5A594E]' : 'bg-[#efefe6]'
                } ${isSelected ? `text-white` : `text-black`} p-1 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
                          text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base  rounded-full px-5 py-3  ${cellDisabled ? '' : 'hover:cursor-pointer'}`}
                disabled={cellDisabled}
            >
                {content}
            </button>
        </>
    )
}

export default Cell
