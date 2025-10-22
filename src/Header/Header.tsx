import { format } from 'date-fns'
import './Header.css'

import { BsQuestionCircle } from 'react-icons/bs'
import { MdOutlineLeaderboard } from 'react-icons/md'
import { useState } from 'react'
import Modal from '../Modal/Modal'
const Header = () => {
    const currentDate: Date = new Date()
    const month_and_date = format(currentDate, 'MMMM dd')

    const year = format(currentDate, 'yyyy')

    const [openHowToPlay, setOpenHowToPlay] = useState<boolean>(false)
    const [openStats, setOpenStats] = useState<boolean>(false)

    return (
        <>
            <div className="text-center md:text-left border-b-1 border-gray-200">
                <h2 className="header mx-5 my-1">Stardew Valley Connexions</h2>
            </div>

            <div className="mx-20 my-10 ">
                <span className="libre-franklin-thin">{`${month_and_date}, ${year}`}</span>
            </div>
            <div className="border-b-1 border-gray-200"></div>
            <div className="container">
                <div className=" flex justify-end mx-5 my-3 ">
                    <button
                        className="mx-4"
                        onClick={() => setOpenStats(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        <MdOutlineLeaderboard size={30} />
                    </button>

                    <button
                        className="mx-2"
                        onClick={() => setOpenHowToPlay(true)}
                        style={{ cursor: 'pointer' }}
                    >
                        <BsQuestionCircle size={30} />
                    </button>

                    <Modal
                        open={openHowToPlay}
                        onClose={() => setOpenHowToPlay(false)}
                    >
                        <div className="w-full max-w-md mx-auto">
                            <div className="my-2 sm:my-3">
                                <h3 className="text-sm sm:text-base md:text-lg sub-header-font font-black text-black-800">
                                    How To Play
                                </h3>
                            </div>
                            <div className="my-5 sm:my-2 libre-franklin-thin text-xs sm:text-sm md:text-base">
                                <p>
                                    Discover sets of four items with a shared
                                    connection.
                                </p>
                            </div>
                            <div className="my-1.5 sm:my-2 libre-franklin-thin text-xs sm:text-sm md:text-base">
                                <ul className="list-disc list-inside space-y-0.5 sm:space-y-1">
                                    <li>
                                        Highlight four items and hit{' '}
                                        <span className="font-bold">
                                            'Submit'
                                        </span>{' '}
                                        to test your guess.
                                    </li>
                                    <li>
                                        Crack the puzzle without 4 failed
                                        attempts!
                                    </li>
                                </ul>
                            </div>
                            <div className="my-2 sm:my-2 libre-franklin-thin">
                                <h4 className="text-xs sm:text-sm md:text-md font-black text-black-800">
                                    Category Example
                                </h4>
                                <ul className="list-disc libre-franklin-thin list-inside text-xs sm:text-sm md:text-base space-y-0.5 sm:space-y-1">
                                    <li>
                                        VILLAGERS: Penny, Linus, Pierre, Wizard
                                    </li>
                                    <li>Fall Fish: Carp, Chub, Crab, Bream</li>
                                </ul>
                            </div>
                            <div className="my-2 sm:my-3 libre-franklin-thin text-xs sm:text-sm md:text-base">
                                <p>
                                    Categories will sometimes be more specific
                                    than 'CROPS,' 'VILLAGERS' or 'ITEMS."
                                </p>
                            </div>
                            <div className="my-2 sm:my-3 libre-franklin-thin text-xs sm:text-sm md:text-base">
                                <p>
                                    Each puzzle has exactly one solution. Beware
                                    of items that could fit in multiple groups!
                                </p>
                            </div>
                            <div className="my-2 sm:my-3 libre-franklin-thin text-xs sm:text-sm md:text-base">
                                <p>
                                    Colors are assigned to each group and
                                    revealed upon solving.
                                </p>
                            </div>
                        </div>
                    </Modal>
                    <Modal open={openStats} onClose={() => setOpenStats(false)}>
                        <div className="w-full max-w-md mx-auto">
                            <h3 className="text-sm text-center sm:text-base md:text-lg sub-header-font font-black text-black-800">
                                User Stats
                            </h3>
                            <p className="libre-franklin-thin text-center my-2">
                                Coming Soon!
                            </p>
                        </div>
                    </Modal>
                </div>
            </div>
            <div className="border-b-1 border-gray-200"></div>
        </>
    )
}

export default Header
