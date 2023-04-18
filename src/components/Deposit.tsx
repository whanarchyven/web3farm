import React, {useEffect, useState} from 'react';
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import SelectOptionsList from "@/components/SelectOption";
import {classList} from "@/helpers/classList";
import ContractConnector from "@/contract/contract";
import Web3 from "web3";
import weiToDecimal from "@/helpers/weiToDecimal";

interface Interface {
    firstCoinName: string,
    firstCoinIcon: string,
    secondCoinName: string,
    secondCoinIcon: string,
    rewardPerBlock: number,
    timeTillEnd: number,
    boosters?: string[],
    account: string,
    userData: any,
    setUserData?:any,
}

const Deposit = ({
                     firstCoinIcon,
                     boosters, setUserData,
                     secondCoinIcon,
                     secondCoinName,
                     firstCoinName,
                     account,
                     userData
                 }: Interface) => {

    const [enteredValue, setEnteredValue] = useState('')
    const [depositedValue, setDepositedValue] = useState(0)

    const [booster, setBooster] = useState(boosters ? boosters[0] : 'You have not boosters')


    const [timeTillEnd, setTimeTillEnd] = useState(0)

    const [maxAllowToken, setMaxAllowToken] = useState(0)

    const [minAllowToken, setMinAllowToken] = useState(0)

    const [rewardPerBlock, setRewardPerBlock] = useState(0)

    const [profit, setProfit] = useState(1)


    const contract = new ContractConnector()


    const [web3, setWeb3] = useState<Web3>(null)

    const settingWeb3 = async () => {
        if (typeof window.ethereum !== 'undefined' && window.ethereum.request && window.ethereum.networkVersion == 97) {
            // Подключаемся к MetaMask
            const ethereum = window.ethereum
            await ethereum.request({method: 'eth_requestAccounts'})
            // Создаем экземпляр объекта Web3 и получаем адрес аккаунта
            const web3 = new Web3(ethereum)
            console.log(window.ethereum.networkVersion, 'window.ethereum.networkVersion');
            const accounts = await web3.eth.getAccounts()
            setWeb3(web3)
        }
    }

    useEffect(() => {
        const func = async () => {
            try {
                if (await window.ethereum['networkVersion'] == 97) {
                    await contract.endTime(setTimeTillEnd)
                    await contract.allowance(maxAllowToken, setMaxAllowToken)
                    await contract.minStakingAmount(setMinAllowToken)
                    await contract.rewardPerSecond(setRewardPerBlock)
                    const prof = await contract.viewUnpaid()
                    console.log(prof)
                    setProfit(prof)
                }
                else {
                    console.log(window.ethereum['networkVersion'])
                }
            } catch (e) {
                console.log(e)
            }
        }
        func()
    }, [])


    useEffect(() => {
        settingWeb3()
    }, [])

    useEffect(() => {
        if (userData?.amount) {
            setDepositedValue(weiToDecimal(userData.amount))
        }
    }, [userData])

    const [chosenBooster, setChosenBooster] = useState<any>({id:0,boost:0})

    const translateBooster = (booster: string) => {
        switch (booster) {
            case 'X2 FARM BOOSTER':
                return {id:0,boost:10}
            case 'X3 FARM BOOSTER':
                return {id:1,boost:30}
            case 'X4 FARM BOOSTER':
                return {id:2,boost:40}
            case 'X5 FARM BOOSTER':
                return {id:3,boost:50}
            default : return ''

        }
    }


    return (
        <div className={'w-full rounded-xl border-[#A600E3] border-4 deposit-bg p-4'}>
            <div className={'w-full flex sm:flex-nowrap flex-wrap items-center justify-between'}>
                <div className={'flex items-center'}>
                    <p className={'font-bold text-2xl text-orange uppercase'}>{firstCoinName}</p>
                    <img className={'w-6 ml-2 aspect-square'} src={firstCoinIcon}/>
                </div>
                <div className={'w-20 h-12 relative'}>
                    <Image src={'/images/arrow.svg'} alt={'air'} layout={'fill'}></Image>
                </div>
                <div className={'flex items-center'}>
                    <p className={'font-bold text-2xl text-orange uppercase'}>{secondCoinName}</p>
                    <img className={'w-6 ml-2 aspect-square'} src={secondCoinIcon}/>
                </div>
            </div>
            {account ? <div>
                <p className={'text-orange w-full font-medium'}>Enter deposit <span className={'text-white'}>{chosenBooster.boost!=0?`+ ${chosenBooster.boost}%`:''}</span></p>
                <div className={'flex justify-center sm:flex-nowrap flex-wrap items-end'}>

                    <div className={'sm:w-full w-full flex flex-col justify-start'}>
                        <input min={minAllowToken ? minAllowToken : 0}
                               max={maxAllowToken ? maxAllowToken : 100000000000000000}
                               value={enteredValue} type={'number'} onChange={(event) => {
                            setEnteredValue(event.target.value)
                        }}
                               className={'h-9 w-full placeholder:text-xs text-sm sm:w-full rounded-sm text-black font-bold border-2 border-violet placeholder:text-black placeholder:opacity-50 p-2'}
                               placeholder={`Enter ${firstCoinName} value`}/>
                    </div>
                    <div
                        className={'w-full sm:w-full cursor-pointer uppercase p-1 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm my-3 sm:my-0 sm:ml-2'}
                        onClick={() => {
                            if (web3) {
                                const total_amount = web3.utils.toWei(enteredValue, 'ether')
                                const test = contract.stakeTokens(total_amount, chosenBooster.boost>0?true:false, chosenBooster.id)
                            }
                        }}>
                        Deposit +
                    </div>
                    {/*<div*/}
                    {/*    className={classList('w-full sm:w-full cursor-pointer uppercase p-1 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm my-3 sm:my-0 sm:ml-2')}*/}
                    {/*    onClick={() => {*/}
                    {/*        setDepositedValue(weiToDecimal(depositedValue)+Number(enteredValue))*/}
                    {/*    }}>*/}
                    {/*    Deposit +*/}
                    {/*</div>*/}
                </div>
                <div className={classList('mt-5')}>
                    <p className={'font-medium text-orange'}>Select Booster:</p>
                    <div className={'sm:flex justify-between items-center'}>
                        <div>
                            <SelectOptionsList currentValue={booster}
                                               variants={boosters ? boosters : ['X1 ATOM BOOSTER']}
                                               setCurrentValue={setBooster}></SelectOptionsList>
                        </div>
                        <div
                            className={'sm:w-40 mt-4 sm:mt-0 cursor-pointer uppercase p-2 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm sm:ml-2'}
                            onClick={async () => {
                                await contract.setApprovalForAll()
                            }
                            }>
                            Approve booster
                        </div>
                        <div
                            className={'sm:w-40 mt-4 sm:mt-0 cursor-pointer uppercase p-2 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm sm:ml-2'}
                        onClick={()=>{
                            setChosenBooster(translateBooster(booster))
                        }}
                        >
                            Apply booster
                        </div>
                    </div>
                </div>
                <div className={classList('mt-3')}>
                    <div
                        className={classList('sm:flex justify-between items-start')}>
                        <p className={'text-white font-medium text-sm'}>Deposited:<br/><span
                            className={'text-orange'}> {userData?depositedValue+weiToDecimal(userData?.amount):''} {firstCoinName}</span></p>
                        <p className={'text-white sm:text-right font-normal text-sm'}>Reward per block: <br/> <span
                            className={'text-sm text-orange font-medium'}>{rewardPerBlock ? weiToDecimal(rewardPerBlock) : 0}</span>
                        </p>
                    </div>
                    <div className={'sm:flex justify-between items-center mt-4'}>
                        <p className={classList('text-white font-medium text-sm')}>EARNED:<br/><span
                            className={'text-orange'}>{weiToDecimal(profit)} {secondCoinName}</span></p>

                        <p className={'text-white text-right font-normal text-sm'}>Time till block end: <br/> <span
                            className={'text-2xl text-orange font-medium'}><CountdownTimer timeLimits={"seconds"}
                                                                                           time={timeTillEnd ? timeTillEnd : 0}/></span>
                        </p>
                    </div>


                    <div
                        className={classList('my-5 flex w-full justify-center')}>
                        <div
                            className={'w-full sm:w-60 mb-2 cursor-pointer uppercase p-2 text-2xl bg-orange flex items-center text-white font-bold justify-center h-12 rounded-sm sm:mx-2 mx-0'} onClick={async ()=>{
                                await contract.claim();
                                const profit =await contract.viewUnpaid();
                                setProfit(profit)
                        }}>
                            COLLECT
                        </div>
                        <div
                            className={'w-full sm:w-60 mb-2 cursor-pointer uppercase p-2 text-2xl bg-orange flex items-center text-white font-bold justify-center h-12 rounded-sm sm:mx-2 mx-0'} onClick={async ()=>{
                            await contract.unlock();
                            const profit =await contract.viewUnpaid();
                            setProfit(profit)
                            if(setUserData){
                                await setUserData();
                            }
                        }}>
                            UNLOCK
                        </div>
                    </div>
                </div>
            </div> : <div><p className={'text-white'}>To make deposit, you need to connect wallet</p></div>}
        </div>
    );
};

export default Deposit;