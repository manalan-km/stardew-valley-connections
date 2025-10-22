import { useState } from 'react'
import Button from '../Button/Button'
import './Login.css'
import Modal from '../Modal/Modal'
const Login = () => {
    const [openLogin, setOpenLogin] = useState<boolean>(false)
    return (
        <div>
            <Button
                className="mx-2 px-5 border-1 border-black-200 p-1 sm:p-2 md:p-3 text-center font-semibold break-words hyphens-auto leading-tight
                          text-[10px] xs:text-[11px] sm:text-xs md:text-sm lg:text-base rounded-full py-3"
                content="Login"
                contentClassName="px-15"
                callbackFunction={() => {
                    setOpenLogin(true)
                }}
            ></Button>

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
export default Login
