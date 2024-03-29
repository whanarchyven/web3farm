import React, {useState} from 'react'
import Web3 from 'web3'
import ContractConnector from "@/contract/contract";
import is from "@sindresorhus/is";
import all = is.all;

interface ConnectWalletInterface {
    account:string,
    setAccount:(item:string)=>any,
    isAllowed:boolean,
    setIsAllowed:(arg:boolean)=>any
    allowance:any,
    setAllowance:(arg:any)=>any
}

const ConnectWallet = ({account,setAccount, isAllowed, setIsAllowed, setAllowance, allowance}:ConnectWalletInterface) => {
    const [web3, setWeb3] = useState<Web3>(null)

    const [showDropMenu, setShowDropMenu] = useState(false)

    const contract = new ContractConnector()


    const connectToMetaMask = async () => {
        try {
            // Проверяем, установлен ли MetaMask в браузере
            if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
                // Подключаемся к MetaMask
                const ethereum = window.ethereum
                await ethereum.request({method: 'eth_requestAccounts'}).then((res)=>{console.log(res)},(err)=>{console.log(err)})
                // Создаем экземпляр объекта Web3 и получаем адрес аккаунта
                const web3 = new Web3(ethereum)
                const accounts = await web3.eth.getAccounts()
                setWeb3(web3)
                if (accounts) {
                    setAccount(accounts[0])
                }
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: '0x38' }], // chainId must be in hexadecimal numbers
                });
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
        <div className={'w-full h-full flex items-center justify-center relative'}>
            {account ? <p className={'text-xs w-full h-full text-center sm:text-sm'} onClick={() => {
                    setShowDropMenu(!showDropMenu)
                }}>{translateAddress(account)}</p> :
                <button className={'text-xs w-full h-full text-center sm:text-sm'} onClick={async () => {
                    await connectToMetaMask();
                }}>Connect MetaMask</button>}

        </div>
    )
}

export default ConnectWallet