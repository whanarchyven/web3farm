import React, {useEffect, useState} from 'react';
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import SelectOptionsList from "@/components/SelectOption";
import {classList} from "@/helpers/classList";
import ContractConnector from "@/contract/contract";
import BnBContractConnector from "@/contract/bnbContractPool"
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
    type:'test'|'bnb'
}

const Deposit = ({
                     firstCoinIcon,
                     boosters, setUserData,
                     secondCoinIcon,
                     secondCoinName,
                     firstCoinName,
                     account,
                     userData, type
                 }: Interface) => {

    const [enteredValue, setEnteredValue] = useState('')
    const [depositedValue, setDepositedValue] = useState(0)

    const [booster, setBooster] = useState(boosters ? boosters[0] : 'You have not boosters')


    const [timeTillEnd, setTimeTillEnd] = useState(0)

    const [maxAllowToken, setMaxAllowToken] = useState(0)

    const [minAllowToken, setMinAllowToken] = useState(0)

    const [rewardPerBlock, setRewardPerBlock] = useState(0)

    const [profit, setProfit] = useState(1)


    const contract = type=='test'?new ContractConnector():new BnBContractConnector()


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

    useEffect(() => {
        const func = async () => {
            try {
                const endTime=await contract.endTime()
                console.log('TIME')
                console.log(endTime)
                setTimeTillEnd(Number(endTime))
                const maxAllow=await contract.allowance()
                setMaxAllowToken(maxAllow)
                const minStacking=await contract.minStakingAmount()
                setMinAllowToken(minStacking)
                const reward=await contract.rewardPerSecond()
                setRewardPerBlock(reward)
                const prof = await contract.viewUnpaid()
                setProfit(prof)
            } catch (e) {
                console.log(e)
            }
        }
        if(account){
            func()
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
                    <p className={'font-bold text-2xl text-orange uppercase'}>{firstCoinName} <span className={'text-xs'}>{type}</span></p>
                    <img className={'w-6 ml-2 aspect-square'} src={firstCoinIcon}/>
                </div>
                <div className={'w-12 h-12 relative'}>
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
                                const test = type=="test"?contract.stakeTokens(total_amount, chosenBooster.boost>0?true:false, chosenBooster.id,{value:total_amount}):contract.stakeTokens(total_amount, chosenBooster.boost>0?true:false, chosenBooster.id,{value:total_amount})
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
                            className={classList('sm:w-40 mt-4 sm:mt-0  uppercase p-2 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm sm:ml-2',!userData?.hasBooster||booster=='NO BOOSTER'?'opacity-50':'cursor-pointer')}
                            onClick={async () => {
                                if(!userData?.hasBooster||booster=='NO BOOSTER'){
                                    await contract.setApprovalForAll()
                                }
                            }
                            }>
                            Approve booster
                        </div>
                        <div
                            className={classList('sm:w-40 mt-4 sm:mt-0 uppercase p-2 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm sm:ml-2',booster=='NO BOOSTER'?'opacity-50':'cursor-pointer')}
                        onClick={()=>{
                            if(booster!='NO BOOSTER'||!userData?.hasBooster){
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
                                    if(setUserData){
                                        await setUserData();
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