import React, {useEffect, useState} from 'react';
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import SelectOptionsList from "@/components/SelectOption";
import {classList} from "@/helpers/classList";
import ContractConnector from "@/contract/contract";
import BnbToBnbContractPool from "@/contract/BnbToBnbContractPool"
import BnbToBusdContractPoll from '@/contract/BnbToBusdContractPool'
import BnbToUsdtContractPool from "@/contract/BnbToUsdtContractPool"
import BusdToBnbContractPool from '@/contract/BusdToBnbContractPool'
import Web3fToBnbContractPool from '@/contract/Web3fToBnbContractPool'
import Web3fToBusdContractPool from '@/contract/Web3fToBusdContractPool'
import Web3fToPinksaleContractPool from '@/contract/Web3fToPinksaleContractPool'

import Web3 from "web3";
import weiToDecimal from "@/helpers/weiToDecimal";

interface Interface {
    firstCoinName: string,
    firstCoinIcon: string,
    secondCoinName: string,
    secondCoinIcon: string,
    account: string,
    needApprove: boolean
    type: 'test' | 'bnbToBnb' | 'bnbToBusd' | 'web3fToBnb' | 'web3fToBusd' | 'web3fToPinksale' | 'bnbToUsdt' | 'busdToBnb',
    isDisabled?: boolean
}

const Deposit = ({
                     firstCoinIcon,
                     secondCoinIcon,
                     secondCoinName,
                     firstCoinName,
                     account, isDisabled,
                     needApprove, type
                 }: Interface) => {

    const [enteredValue, setEnteredValue] = useState('')
    const [depositedValue, setDepositedValue] = useState(0)


    const [boosters, setBoosters] = useState<Array<string>>([])
    const [booster, setBooster] = useState('NO BOOSTER')


    const [timeTillEnd, setTimeTillEnd] = useState<number>(null)

    const [maxAllowToken, setMaxAllowToken] = useState(0)

    const [minAllowToken, setMinAllowToken] = useState(0)

    const [rewardPerBlock, setRewardPerBlock] = useState(0)

    const [profit, setProfit] = useState(0)

    const [approve, setApprove] = useState(!needApprove)

    const translateToken = (token: string) => {
        switch (token) {
            case 'bnbToBnb':
                return new BnbToBnbContractPool()
            case 'bnbToUsdt':
                return new BnbToUsdtContractPool()
            case 'busdToBnb':
                return new BusdToBnbContractPool()
            case 'bnbToBusd':
                return new BnbToBusdContractPoll()
            case 'web3fToBnb':
                return new Web3fToBnbContractPool()
            case 'web3fToBusd':
                return new Web3fToBusdContractPool()
            case 'web3fToPinksale':
                return new Web3fToPinksaleContractPool()
            default:
                return new ContractConnector()
        }
    }


    const contract = translateToken(type)

    const [userData, setUserData] = useState<any>(null)

    const fetchUserData = async () => {
        const result = await contract.userData();
        setUserData(result)
    }

    useEffect(() => {
        if (account) {
            fetchUserData()
        }
    }, [account])


    const [web3, setWeb3] = useState<Web3>(null)

    const settingWeb3 = async () => {
        if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
            // Подключаемся к MetaMask
            const ethereum = window.ethereum
            await ethereum.request({method: 'eth_requestAccounts'})
            // Создаем экземпляр объекта Web3 и получаем адрес аккаунта
            const web3 = new Web3(ethereum)
            setWeb3(web3)
        }
    }

    const fetchPoolData = async () => {
        try {
            console.log('FETCHING POOL DATA...')
            const endTime = await contract.endTime()
            console.log(endTime)
            if (timeTillEnd == null) {
                setTimeTillEnd(Number(endTime))
            }
            if (needApprove) {
                const maxAllow = await contract.allowance()
                setMaxAllowToken(maxAllow)
            }
            const minStacking = await contract.minStakingAmount()
            setMinAllowToken(minStacking)
            const reward = await contract.rewardPerSecond()
            setRewardPerBlock(reward)
            const prof = await contract.viewUnpaid()
            setProfit(prof)
            if (needApprove) {
                const allowance = await contract.allowance()
                if (allowance > 0) {
                    setApprove(true)
                }
            }
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        if (account) {
            fetchPoolData()
        }
    },)

    useEffect(() => {
        if (account) {
            settingWeb3()
        }
    }, [account])

    useEffect(() => {
        if (userData?.amount) {
            setDepositedValue(weiToDecimal(userData.amount))
        }
    }, [userData])

    const [chosenBooster, setChosenBooster] = useState<any>(null)

    const translateBooster = (booster: string) => {
        switch (booster) {
            case 'BRONZE FARM BOOSTER':
                return {id: 0, boost: 50}
            case 'SILVER FARM BOOSTER':
                return {id: 1, boost: 100}
            case 'GOLD FARM BOOSTER':
                return {id: 2, boost: 200}
            case 'DIAMOND FARM BOOSTER':
                return {id: 3, boost: 500}
            default :
                return {id: 0, boost: 0}

        }
    }


    const translateBoosterToText = (booster: number) => {
        switch (booster) {
            case 0:
                return 'BRONZE FARM BOOSTER'
            case 1:
                return 'SILVER FARM BOOSTER'
            case 2:
                return 'GOLD FARM BOOSTER'
            case 3:
                return 'DIAMOND FARM BOOSTER'
            default:
                return 'NO BOOSTER'
        }
    }

    const fetchUserBalance = async () => {
        if (account) {
            const balance = await contract.getUserBoosters()
            const temp = [...boosters];
            console.log(balance)
            for (let i = 0; i < 4; i++) {
                if (balance[i] != '0') {
                    temp.push(translateBoosterToText(i))
                    // setBooster([...booster,translateBoosterToText(i)])
                }
            }
            setBoosters(temp)
        }
    }

    useEffect(() => {
        fetchUserBalance()
    }, [account])

    useEffect(() => {
        if (userData?.hasBooster) {
            const booster_temp = translateBoosterToText(Number(userData?.boosterId))
            setBooster(booster_temp)
        }
    }, [userData])

    const [isBoosterApproved, setIsBoosterApproved] = useState(false)

    const approveBooster = async () => {
        if (account) {
            const approved = await contract.isBoosterApproved()
            setIsBoosterApproved(approved)
        }
    }

    useEffect(() => {
        approveBooster()
    }, [account])
    return (
        <div className={'w-full rounded-xl border-[#A600E3] relative border-4 deposit-bg p-4'}>
            <div className={'w-full flex sm:flex-nowrap flex-wrap items-center justify-between'}>
                <div className={'flex items-center'}>
                    <p className={classList('font-bold text-xl uppercase',type=='web3fToPinksale'?'text-pink':'text-orange')}>{firstCoinName}</p>
                    <img className={'w-6 ml-2 aspect-square'} src={firstCoinIcon}/>
                </div>
                <div className={'w-24 flex h-12 relative'}>
                    <Image src={'/images/arrow.svg'} alt={'air'} layout={'fill'}></Image>
                </div>
                <div className={'flex items-center'}>
                    <p className={classList('font-bold text-xl uppercase',type=='web3fToPinksale'?'text-pink':'text-orange')}>{secondCoinName}</p>
                    <img className={'w-6 ml-2 aspect-square'} src={secondCoinIcon}/>
                </div>
            </div>
            {account ? <div>
                <p className={classList('w-full font-medium',type=='web3fToPinksale'?'text-pink':'text-orange')}>Enter deposit <span
                    className={'text-white'}>{translateBooster(booster) && translateBooster(booster)?.boost != 0 ? `+ ${translateBooster(booster)?.boost}%` : ''}</span>
                </p>
                <div className={'flex justify-center sm:flex-nowrap flex-wrap items-end'}>

                    <div className={'sm:w-full w-full flex flex-col justify-start'}>
                        <input onBlur={() => {
                            if (Number(enteredValue) < weiToDecimal(minAllowToken)) {
                                setEnteredValue(String(weiToDecimal(minAllowToken)))
                            }
                        }} min={minAllowToken ? weiToDecimal(minAllowToken) : 0}
                               max={maxAllowToken ? maxAllowToken : 100000000000000000}
                               value={enteredValue} type={'number'} disabled={approve ? false : true}
                               onChange={(event) => {
                                   setEnteredValue(event.target.value)
                               }}
                               className={classList('h-9 w-full placeholder:text-xs text-sm sm:w-full rounded-sm text-black font-bold border-2 border-violet placeholder:opacity-50 p-2', approve ? 'placeholder:text-black' : 'placeholder:text-white')}
                               placeholder={approve ? `Enter ${firstCoinName} value` : 'Needing approve before deposit'}/>
                    </div>
                </div>
                <div className={'flex mt-2 justify-between items-center'}>
                    {needApprove ? <div
                        className={classList('w-full sm:w-full uppercase p-1 text-xs flex items-center text-white font-bold justify-center h-9 rounded-sm my-3 sm:my-0 sm:mr-2', approve ? 'opacity-50' : 'cursor-pointer',type=='web3fToPinksale'?'bg-pink':' bg-orange')}
                        onClick={async () => {
                            if (web3) {
                                const approved = await contract.approve('115792089237316195423570985008687907853269984665640564039457584007913129639935')
                                console.log(approved)
                                setApprove(approved?.status)
                            }
                        }}>
                        {approve ? 'Approved' : 'Approve'}
                    </div> : null}
                    <div
                        className={classList('w-full sm:w-full uppercase p-1 text-xs flex items-center text-white font-bold justify-center h-9 rounded-sm my-3 sm:my-0 sm:ml-0', approve ? 'cursor-pointer' : 'opacity-50',type=='web3fToPinksale'?'bg-pink':'bg-orange')}
                        onClick={async () => {
                            if (web3 && approve) {
                                const total_amount = web3.utils.toWei(enteredValue, 'ether')
                                const test = await contract.stakeTokens(total_amount, isBoosterApproved && chosenBooster && chosenBooster?.boost > 0 ? true : false, chosenBooster && chosenBooster.id ? chosenBooster.id : 0)
                                const updated = await fetchPoolData();
                                await fetchUserData();
                            }
                        }}>
                        Deposit +
                    </div>
                </div>
                <div className={classList('mt-5')}>
                    <p className={classList('font-medium',type=='web3fToPinksale'?'text-pink':'text-orange')}>Select
                        Booster: <br/>{userData?.hasBooster && userData?.boosterId ? translateBoosterToText(Number(userData?.boosterId)) : ''}
                    </p>
                    {userData?.hasBooster && userData?.boosterId ?
                        <p className={'text-white'}>Unlock deposit to change booster</p> :
                        <div className={'sm:flex justify-between items-center'}>
                            <div>
                                <SelectOptionsList currentValue={booster}
                                                   variants={[...boosters, 'NO BOOSTER']}
                                                   setCurrentValue={(val) => {
                                                       if (chosenBooster) {
                                                           setChosenBooster(null)
                                                       }
                                                       setBooster(val)
                                                   }}></SelectOptionsList>
                            </div>
                            <div
                                className={classList('sm:w-40 mt-4 sm:mt-0  uppercase p-2 text-xs flex items-center text-white font-bold justify-center h-9 rounded-sm sm:ml-2', userData?.hasBooster == true || booster == 'NO BOOSTER' || isBoosterApproved ? 'opacity-50' : 'cursor-pointer',type=='web3fToPinksale'?'bg-pink':'bg-orange')}
                                onClick={async () => {
                                    if (userData?.hasBooster == false && booster != 'NO BOOSTER' && isBoosterApproved == false) {
                                        await contract.setApprovalForAll()
                                        await approveBooster()
                                    }
                                }
                                }>
                                {isBoosterApproved ? 'Approved' : 'Approve booster'}
                            </div>
                            <div
                                className={classList('sm:w-40 mt-4 sm:mt-0 uppercase p-2 text-xs flex items-center text-white font-bold justify-center h-9 rounded-sm sm:ml-2', booster == 'NO BOOSTER' || isBoosterApproved == false || weiToDecimal(userData?.amount) == 0 ? 'opacity-50' : 'cursor-pointer',type=='web3fToPinksale'?'bg-pink':'bg-orange')}
                                onClick={async () => {
                                    if (!userData?.hasBooster && booster != 'NO BOOSTER' && isBoosterApproved && weiToDecimal(userData?.amount) > 0) {
                                        const temp = translateBooster(booster)
                                        setChosenBooster(temp)
                                        const boosted = await contract.stakeTokens(0, true, temp.id)
                                    }
                                }}
                            >
                                {userData?.hasBooster ? 'Unlock deposit to change booster' : 'Apply booster'}
                            </div>
                        </div>}
                </div>
                <div className={classList('mt-3')}>
                    <div
                        className={classList('sm:flex justify-between items-start')}>
                        <p className={'text-white font-medium text-sm'}>Deposited:<br/><span
                            className={classList('',type=='web3fToPinksale'?'text-pink':'text-orange')}> {userData ? weiToDecimal(userData?.amount) : ''} {firstCoinName}</span>
                        </p>
                        <p className={'text-white sm:text-right font-normal text-sm'}>Reward per second: <br/> <span
                            className={classList('text-sm  font-medium',type=='web3fToPinksale'?'text-pink':'text-orange')}>{rewardPerBlock ? weiToDecimal(rewardPerBlock) : 0}</span>
                        </p>
                    </div>
                    <div className={'sm:flex justify-between items-center mt-4'}>
                        <p className={classList('text-white font-medium text-sm')}>EARNED:<br/><span
                            className={classList('',type=='web3fToPinksale'?'text-pink':'text-orange')}>{weiToDecimal(profit)} {secondCoinName}</span></p>

                        <p className={'text-white text-right font-normal text-sm'}>Time till block end: <br/> <span
                            className={classList('text-2xl  font-medium',type=='web3fToPinksale'?'text-pink':'text-orange')}>{timeTillEnd ?
                            <CountdownTimer timeLimits={"seconds"}
                                            time={timeTillEnd}/> : '0'}</span>
                        </p>
                    </div>


                    <div
                        className={classList('my-5 flex w-full justify-center')}>
                        <div
                            className={classList('w-full sm:w-60 mb-2 uppercase p-2 text-2xl flex items-center text-white font-bold justify-center h-12 rounded-sm sm:mx-2 mx-0', profit > 0 ? 'cursor-pointer' : 'opacity-50',type=='web3fToPinksale'?'bg-pink':'bg-orange')}
                            onClick={async () => {
                                if (profit > 0) {
                                    await contract.claim();
                                    const profitTemp = await contract.viewUnpaid();
                                    setProfit(profitTemp)
                                }
                            }}>
                            COLLECT
                        </div>
                        <div
                            className={classList('w-full sm:w-60 mb-2 uppercase p-2 text-2xl flex items-center text-white font-bold justify-center h-12 rounded-sm sm:mx-2 mx-0', depositedValue + weiToDecimal(userData?.amount) > 0 ? 'cursor-pointer' : 'opacity-50',type=='web3fToPinksale'?'bg-pink':'bg-orange')}
                            onClick={async () => {
                                if (depositedValue + weiToDecimal(userData?.amount) > 0) {
                                    await contract.unlock();
                                    const profit = await contract.viewUnpaid();
                                    setProfit(profit)
                                    if (fetchUserData) {
                                        await fetchUserData();
                                    }
                                }
                            }}>
                            UNLOCK
                        </div>
                    </div>
                </div>
            </div> : <div><p className={'text-white'}>To make deposit, you need to connect wallet</p></div>}
            {isDisabled ? <div className={'left-0 top-0 bg-black bg-opacity-30 w-full h-full absolute rounded-xl flex items-center text-2xl font-bold justify-center text-white font-museo backdrop-blur-sm'}>Coming soon</div> : null}
        </div>

    );
};

export default Deposit;