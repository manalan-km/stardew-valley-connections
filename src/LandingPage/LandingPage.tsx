import './LandingPage.css'
import image from '../assets/stardew-connexions-landing-page.png'
import Button from '../Button/Button'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'
import Login from '../Login/Login'

const ChallengeIDDiv = ({ challengeID }: { challengeID: string }) => {
    if (challengeID !== '') {
        return (
            <>
                <div className="">
                    <span className="LandingPageFont">No. {challengeID}</span>
                </div>
            </>
        )
    }
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

    if (isAPIError) {
        return (
            <>
                <p>Something went wrong!</p>
            </>
        )
    } else {
        return (
            <>
                <div className="bg-[#f99602] flex flex-col justify-center items-center h-180">
                    <div className="my-2">
                        <img src={image} alt="" />
                    </div>
                    <div className="title my-2">
                        <h2>Stardew Valley Connexions</h2>
                    </div>
                    <div className="my-2">
                        <Button
                            className="mx-2 border-1 border-black-200 p-1 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
                          text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base rounded-full  py-3 bg-black"
                            content="Play"
                            contentClassName="px-15 text-white"
                            callbackFunction={() => {
                                navigator('/challenge')
                            }}
                        ></Button>
                    </div>
                    <div className="my-2">
                        <Login></Login>
                    </div>
                    <div className=" my-5">
                        <p className="LandingPageFont">{`${month_and_date}, ${year}`}</p>
                    </div>

                    <ChallengeIDDiv challengeID={challengeID}></ChallengeIDDiv>
                </div>
            </>
        )
    }
}

export default LandingPage
