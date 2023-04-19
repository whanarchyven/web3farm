import React, {useEffect, useState} from 'react';
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import SelectOptionsList from "@/components/SelectOption";
import {classList} from "@/helpers/classList";
import ContractConnector from "@/contract/contract";
import BnbToBnbContractPool from "@/contract/BnbToBnbContractPool"
import BnbToUsdtContractPool from "@/contract/BnbToUsdtContractPool"
import BusdToBnbContractPool from '@/contract/BusdToBnbContractPool'
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
    fetchUserData?:any,
    needApprove:boolean
    type:'test'|'bnbToBnb'|'bnbToUsdt'|'busdToBnb'
}

const Deposit = ({
                     firstCoinIcon,
                     boosters, fetchUserData,
                     secondCoinIcon,
                     secondCoinName,
                     firstCoinName,
                     account,
                     userData, needApprove, type
                 }: Interface) => {

    const [enteredValue, setEnteredValue] = useState('')
    const [depositedValue, setDepositedValue] = useState(0)

    const [booster, setBooster] = useState(boosters ? boosters[0] : 'You have not boosters')


    const [timeTillEnd, setTimeTillEnd] = useState(0)

    const [maxAllowToken, setMaxAllowToken] = useState(0)

    const [minAllowToken, setMinAllowToken] = useState(0)

    const [rewardPerBlock, setRewardPerBlock] = useState(0)

    const [profit, setProfit] = useState(0)

    const [approve,setApprove]=useState(!needApprove)

    const translateToken=(token:string)=>{
        switch (token){
            case 'bnbToBnb':return new BnbToBnbContractPool()
            case 'bnbToUsdt':return new BnbToUsdtContractPool()
            case 'busdToBnb':return new BusdToBnbContractPool()
            default: return new ContractConnector()
        }
    }


    const contract = translateToken(type)


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
            const endTime=await contract.endTime()
            setTimeTillEnd(Number(endTime))
            const maxAllow=await contract.allowance()
            setMaxAllowToken(maxAllow)
            const minStacking=await contract.minStakingAmount()
            setMinAllowToken(minStacking)
            const reward=await contract.rewardPerSecond()
            setRewardPerBlock(reward)
            const prof = await contract.viewUnpaid()
            setProfit(prof)
            const allowance=await contract.allowance()
            if(allowance>0){
                setApprove(true)
            }
        } catch (e) {
            console.log(e)
        }
    }


    useEffect(() => {
        if(account){
            fetchPoolData()
        }
    }, )


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
                <div className={'w-24 h-12 relative'}>
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
                               value={enteredValue} type={'number'} disabled={approve?false:true} onChange={(event) => {
                            setEnteredValue(event.target.value)
                        }}
                               className={classList('h-9 w-full placeholder:text-xs text-sm sm:w-full rounded-sm text-black font-bold border-2 border-violet placeholder:opacity-50 p-2',approve?'placeholder:text-black':'placeholder:text-white')}
                               placeholder={approve?`Enter ${firstCoinName} value`:'Needing approve before deposit'}/>
                    </div>
                </div>
                <div className={'flex mt-2 justify-between items-center'}>
                    {needApprove?<div
                            className={classList('w-full sm:w-full uppercase p-1 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm my-3 sm:my-0 sm:mr-2',approve?'opacity-50':'cursor-pointer')}
                            onClick={async () => {
                                if (web3) {
                                    const approved = await contract.approve('115792089237316195423570985008687907853269984665640564039457584007913129639935')
                                    console.log(approved)
                                    setApprove(approved?.status)
                                }
                            }}>
                            {approve?'Approved':'Approve'}
                        </div>:null}
                    <div
                        className={classList('w-full sm:w-full uppercase p-1 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm my-3 sm:my-0 sm:ml-0',approve?'cursor-pointer':'opacity-50')}
                        onClick={async () => {
                            if (web3&&approve) {
                                const total_amount = web3.utils.toWei(enteredValue, 'ether')
                                const test = await contract.stakeTokens(total_amount, chosenBooster.boost>0?true:false, chosenBooster.id)
                                const updated= await fetchPoolData();
                                await fetchUserData();
                            }
                        }}>
                        Deposit +
                    </div>
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
                            className={classList('sm:w-40 mt-4 sm:mt-0  uppercase p-2 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm sm:ml-2',userData?.hasBooster==true||booster=='NO BOOSTER'?'opacity-50':'cursor-pointer')}
                            onClick={async () => {
                                if(userData?.hasBooster==false&&booster!='NO BOOSTER'){
                                    await contract.setApprovalForAll()
                                }
                            }
                            }>
                            Approve booster
                        </div>
                        <div
                            className={classList('sm:w-40 mt-4 sm:mt-0 uppercase p-2 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm sm:ml-2',booster=='NO BOOSTER'?'opacity-50':'cursor-pointer')}
                        onClick={()=>{
                            if(!userData?.hasBooster&&booster!='NO BOOSTER'){
                                setChosenBooster(translateBooster(booster))
                            }
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
                            className={classList('w-full sm:w-60 mb-2 uppercase p-2 text-2xl bg-orange flex items-center text-white font-bold justify-center h-12 rounded-sm sm:mx-2 mx-0',profit>0?'cursor-pointer':'opacity-50')} onClick={async ()=>{
                                if(profit>0){
                                    await contract.claim();
                                    const profitTemp =await contract.viewUnpaid();
                                    setProfit(profitTemp)
                                }
                        }}>
                            COLLECT
                        </div>
                        <div
                            className={classList('w-full sm:w-60 mb-2 uppercase p-2 text-2xl bg-orange flex items-center text-white font-bold justify-center h-12 rounded-sm sm:mx-2 mx-0',depositedValue+weiToDecimal(userData?.amount)>0?'cursor-pointer':'opacity-50')} onClick={async ()=>{
                                if(depositedValue+weiToDecimal(userData?.amount)>0){
                                    await contract.unlock();
                                    const profit =await contract.viewUnpaid();
                                    setProfit(profit)
                                    if(fetchUserData){
                                        await fetchUserData();
                                    }
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