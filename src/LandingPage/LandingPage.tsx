import './LandingPage.css'
import image from '../assets/stardew-connexions-landing-page.png'
import Button from '../Button/Button'
import { useNavigate } from 'react-router'

import { useEffect } from 'react'

import { format } from 'date-fns'
import { useState } from 'react'
import Modal from '../Modal/Modal'
import Skeleton from '../Skeleton/Skeleton'
import { AnimationSequencer } from '../utils/AnimationSequencer'
const Login = ({ loading }: { loading: boolean }) => {
    const [openLogin, setOpenLogin] = useState<boolean>(false)
    return (
        <div>
            {loading ? (
                <Button
                    id="SkeletonLoginButton"
                    className="mx-2 px-5 p-1 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
                          text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base rounded-full py-3 "
                    content="Login"
                    contentClassName="px-15"
                    callbackFunction={() => {
                        setOpenLogin(true)
                    }}
                    loading={loading}
                    skeletonColor="#f4be6e"
                ></Button>
            ) : (
                <Button
                    id="loginButton"
                    className="mx-2 px-5 border-1 border-black-200 p-1 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
                          text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base rounded-full py-3 "
                    content="Login"
                    contentClassName="px-15"
                    callbackFunction={() => {
                        setOpenLogin(true)
                    }}
                ></Button>
            )}

            <Modal open={openLogin} onClose={() => setOpenLogin(false)}>
                <div className="w-full max-w-md mx-auto">
                    <h3 className="text-sm text-center sm:text-base md:text-lg sub-header-font font-black text-black-800">
                        Login
                    </h3>
                    <p className="libre-franklin-thin text-center my-2">
                        Coming Soon!
                    </p>
                </div>
            </Modal>
        </div>
    )
}

const ChallengeIDDiv = ({
    challengeID,
    loading,
}: {
    challengeID: string
    loading: boolean
}) => {
    if (loading) {
        return (
            <Skeleton
                className="mx-2 px-5 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
                  text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base rounded-full "
                color="#f4be6e"
            >
                <span className="LandingPageFont">No. 123</span>
            </Skeleton>
        )
    }

    if (challengeID !== '') {
        return (
            <div className="">
                <span id="ChallengeId" className="LandingPageFont">
                    No. {challengeID}
                </span>
            </div>
        )
    }

    return null
}

const LandingPage = ({
    isAPILoading,
    challengeID,
    isAPIError,
}: {
    isAPILoading: boolean
    challengeID: string
    isAPIError: boolean
}) => {
    const navigator = useNavigate()

    const currentDate: Date = new Date()
    const month_and_date = format(currentDate, 'MMMM dd')
    const year = format(currentDate, 'yyyy')

    const animationSequencer = new AnimationSequencer()

    useEffect(() => {
        if (!isAPILoading) {
            console.log('Animating the fade in dawg')

            const playButton = document.getElementById('playButton')
            const loginButton = document.getElementById('loginButton')
            const challengeId = document.getElementById('ChallengeId')
            animationSequencer.add({
                targets: [playButton],
                animeParams: {
                    opacity: [0, 1],
                    duration: 500,
                    easing: 'easeOutQuad',
                    delay: 500,
                },
            })

            animationSequencer.add({
                targets: [loginButton],
                animeParams: {
                    opacity: [0, 1],
                    duration: 500,
                    easing: 'easeOutQuad',
                    delay: 600,
                },
            })
            animationSequencer.add({
                targets: [challengeId],
                animeParams: {
                    opacity: [0, 1],
                    duration: 500,
                    easing: 'easeOutQuad',
                    delay: 1000,
                },
            })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAPILoading])

    if (isAPIError) {
        return (
            <div className="bg-[#f99602] flex flex-col justify-center items-center h-180">
                <p className="text-red-600 font-semibold">
                    Something went wrong!
                </p>
            </div>
        )
    }

    return (
        <div className="bg-[#f99602] flex flex-col justify-center items-center h-180">
            <div className="my-2">
                <img src={image} alt="Stardew Valley Connexions" />
            </div>
            <div className="title my-2">
                <h2>Stardew Valley Connexions</h2>
            </div>
            <div className="my-2">
                <Button
                    id="playButton"
                    className=" mx-2 border-1 border-black-200 p-1 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
                      text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base rounded-full py-3 bg-black"
                    content="Play"
                    contentClassName="px-15 text-white"
                    callbackFunction={() => {
                        navigator('/challenge')
                    }}
                    loading={isAPILoading}
                    skeletonColor="#000000"
                />
            </div>
            <div className="my-2">
                <Login loading={isAPILoading} />
            </div>
            <div className="my-5">
                <p className="LandingPageFont">{`${month_and_date}, ${year}`}</p>
            </div>
            <ChallengeIDDiv challengeID={challengeID} loading={isAPILoading} />
        </div>
    )
}

export default LandingPage
