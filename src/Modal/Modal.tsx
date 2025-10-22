import type { ReactNode } from 'react'
import { MdClose } from 'react-icons/md'

const Modal = ({
    open,
    onClose,
    children,
}: {
    open: boolean
    onClose: () => void
    children: ReactNode
}) => {
    return (
        // backdrop with higher opacity and z-index
        <div
            onClick={onClose}
            className={`
                fixed inset-0 flex justify-center items-center transition-colors p-4
                z-50 backdrop-blur-sm
               ${open ? 'visible bg-black/40 backdrop-blur-md' : 'invisible'}
            `}
        >
            {/* modal with z-index */}
            <div
                onClick={(e) => e.stopPropagation()}
                className={`
                    bg-white rounded-xl shadow-lg transition-all
                    w-full max-w-lg relative z-50
                    p-4 sm:p-6 md:p-8
                    ${open ? 'scale-100 opacity-100' : 'scale-125 opacity-0'}
                `}
            >
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600"
                >
                    <MdClose className="w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7" />
                </button>
                {children}
            </div>
        </div>
    )
}

export default Modal
