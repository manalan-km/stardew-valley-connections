/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import { useRef } from 'react'
import './Board.css'

import { animate } from 'animejs'

const Cell = ({
    content,
    isSelected,
    clickCallbackFunction,
    id,
    cellDisabled = false,
}: {
    content: string
    isSelected: boolean
    clickCallbackFunction: Function
    id?: string
    cellDisabled?: boolean
}) => {
    const textRef = useRef<HTMLSpanElement>(null)

    const animateButton = (isCellSelected: boolean) => {
        if (!textRef.current) {
            return
        }

        if (!isCellSelected) {
            animate(textRef.current, {
                scale: [1, 1.1, 1],
                duration: 400,
            })
        }
    }
    const cellId = id ?? ''
    return (
        <>
            <button
                id={cellId}
                onClick={() => {
                    clickCallbackFunction()
                    animateButton(isSelected)
                }}
                type="button"
                className={`rounded-lg m-0.1 cell-content flex items-center justify-center min-h-[60px] sm:min-h-[80px] md:min-h-[100px] hover:cursor:pointer ${
                    isSelected ? 'bg-[#5A594E]' : 'bg-[#efefe6]'
                } ${isSelected ? `text-white` : `text-black`} p-1 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
                          text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base  rounded-full px-5 py-3  ${cellDisabled ? '' : 'hover:cursor-pointer'} cell`}
                disabled={cellDisabled}
            >
                <span ref={textRef} style={{ display: 'inline-block' }}>
                    <span id="cell-content">{content}</span>
                </span>
            </button>
        </>
    )
}

export default Cell
