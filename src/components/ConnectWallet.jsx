import React, { useState } from 'react'
import Web3 from 'web3'

const ConnectWallet = () => {
    const [web3, setWeb3] = useState(null)
    const [account, setAccount] = useState(null)

    const connectToMetaMask = async () => {
        try {
            // Проверяем, установлен ли MetaMask в браузере
            if (typeof window.ethereum !== 'undefined') {
                // Подключаемся к MetaMask
                const ethereum = window.ethereum
                await ethereum.request({ method: 'eth_requestAccounts' })
                // Создаем экземпляр объекта Web3 и получаем адрес аккаунта
                const web3 = new Web3(ethereum)
                const accounts = await web3.eth.getAccounts()
                setWeb3(web3)
                setAccount(accounts[0])
            } else {
                // MetaMask не установлен, выводим сообщение
                alert('Please install MetaMask to connect to the blockchain.')
            }
        } catch (err) {
            console.log(err)
        }
    }

    const translateAddress=(address)=>{
        let result='';
        for(let i=0;i<10;i++){
            result+=address[i]
        }
        result+='...';
        for(let i=address.length-1;i>address.length-3;i--){
            result+=address[i]
        }
        return result
    }

    return (
        <div className={'w-full'}>
            {account?<p  className={'text-xs leading-[80%] sm:text-sm'}>{translateAddress(account)}</p>:<button className={'text-xs leading-[80%] sm:text-sm'} onClick={connectToMetaMask}>Connect MetaMask</button>}
        </div>
    )
}

export default ConnectWallet