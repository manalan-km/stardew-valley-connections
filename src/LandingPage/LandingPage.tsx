import './LandingPage.css'
import image from '../assets/stardew-connexions-landing-page.png'
import Button from '../Button/Button'
import { useNavigate } from 'react-router'
import { format } from 'date-fns'
const LandingPage = () => {
    const navigator = useNavigate()

    const currentDate: Date = new Date()
    const month_and_date = format(currentDate, 'MMMM dd')
    const year = format(currentDate, 'yyyy')

    return (
        <>
            <div className="bg-[#f99602] flex flex-col justify-center items-center h-200">
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
                    <Button
                        className="mx-2 px-5 border-1 border-black-200 p-1 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
                          text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base rounded-full py-3"
                        content="Login"
                        contentClassName="px-15"
                        callbackFunction={() => {
                            navigator('/login')
                        }}
                    ></Button>
                </div>
                <div className=" my-5">
                    <p className="font">{`${month_and_date}, ${year}`}</p>
                </div>
                {/* TODO: Loading screen when API is called */}
                {/* <div className="">
                    <p className="font">No. 1</p>
                </div> */}
            </div>
        </>
    )
}

export default LandingPage
