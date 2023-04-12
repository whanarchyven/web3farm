import React, {useEffect, useState} from 'react';
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import SelectOptionsList from "@/components/SelectOption";
import {classList} from "@/helpers/classList";
import ContractConnector from "@/contract/contract";
import Web3 from "web3";

interface Interface {
    firstCoinName:string,
    firstCoinIcon:string,
    secondCoinName:string,
    secondCoinIcon:string,
    rewardPerBlock:number,
    timeTillEnd:number,
    boosters?:string[],
}

const Deposit = ({firstCoinIcon, boosters, secondCoinIcon, secondCoinName, firstCoinName}:Interface) => {

    const [enteredValue,setEnteredValue]=useState('')
    const [depositedValue,setDepositedValue]=useState(0)

    const [booster,setBooster]=useState(boosters?boosters[0]:'You have not boosters')


    const [timeTillEnd,setTimeTillEnd]=useState(0)

    const [maxAllowToken,setMaxAllowToken]=useState(0)

    const [minAllowToken,setMinAllowToken]=useState(0)

    const [rewardPerBlock,setRewardPerBlock]=useState(0)


    const contract=new ContractConnector()

    useEffect(()=>{
        const res = contract.endTime(setTimeTillEnd)
        contract.allowance(maxAllowToken,setMaxAllowToken)
        contract.minStakingAmount(setMinAllowToken)
        contract.rewardPerSecond(setRewardPerBlock)
    },[])

    const [web3, setWeb3] = useState<Web3>(null)

    const settingWeb3=async ()=>{
        if (typeof window.ethereum !== 'undefined' && window.ethereum.request) {
            // Подключаемся к MetaMask
            const ethereum = window.ethereum
            await ethereum.request({method: 'eth_requestAccounts'})
            // Создаем экземпляр объекта Web3 и получаем адрес аккаунта
            const web3 = new Web3(ethereum)
            const accounts = await web3.eth.getAccounts()
            setWeb3(web3)
        }}


    useEffect(()=>{
        settingWeb3()
    },[])



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
                    <img  className={'w-6 ml-2 aspect-square'} src={secondCoinIcon}/>
                </div>
            </div>
            <div className={'flex justify-center sm:flex-nowrap flex-wrap items-end'}>
                <div className={'sm:w-full w-full flex flex-col justify-start'}>
                    <p className={'text-orange font-medium'}>Enter deposit</p>
                    <input min={minAllowToken} max={maxAllowToken} value={enteredValue} type={'number'} onChange={(event)=>{setEnteredValue(event.target.value)}} className={'h-9 w-full placeholder:text-xs text-sm sm:w-36 rounded-sm text-black font-bold border-2 border-violet placeholder:text-black placeholder:opacity-50 p-2'} placeholder={`Enter ${firstCoinName} value`}/>
                </div>
                <div className={'w-full sm:w-full cursor-pointer uppercase p-1 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm my-3 sm:my-0 sm:ml-2'}
                     onClick={() => {
                         if(web3){
                             const total_amount = web3.utils.toWei(String(depositedValue), 'ether')
                             const test=contract.stakeTokens(total_amount,false,0)
                             console.log(test)
                         }
                     }}>
                    Approve
                </div>
                <div className={classList('w-full sm:w-full cursor-pointer uppercase p-1 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm my-3 sm:my-0 sm:ml-2',timeTillEnd>0?'opacity-50':'opacity-100')}
                onClick={()=>{
                    if(timeTillEnd==0){
                        setDepositedValue(depositedValue+Number(enteredValue))
                    }
                }}>
                    Deposit +
                </div>
            </div>
            <div className={classList('mt-3')}>
                <div className={classList('sm:flex justify-between items-start',depositedValue>0?'opacity-100':'opacity-50')}>
                    <p className={'text-white font-medium text-2xl'}>Deposited:<br/><span className={'text-orange'}> {depositedValue} {firstCoinName}</span></p>
                    <p className={'text-white sm:text-right font-normal text-sm'}>Reward per block: <br/> <span className={'text-lg text-orange font-medium'}>{rewardPerBlock}</span></p>
                </div>
                <div className={'sm:flex justify-between items-center mt-4'}>
                    <p className={classList('text-white font-medium text-2xl',depositedValue>0?'opacity-100':'opacity-50')}>EARNED:<br/><span className={'text-orange'}>{depositedValue*3.12415.toFixed(2)} {secondCoinName}</span></p>

                    <p className={'text-white text-right font-normal text-sm'}>Time till block end: <br/> <span className={'text-2xl text-orange font-medium'}><CountdownTimer timeLimits={"seconds"} time={timeTillEnd}/></span></p>
                </div>

                <div className={classList('mt-5',depositedValue>0?'opacity-100':'opacity-50')}>
                    <p className={'font-medium text-orange'}>Select Booster:</p>
                    <div className={'sm:flex justify-between items-center'}>
                        <div>
                            <SelectOptionsList currentValue={booster} variants={boosters?boosters:['X1 ATOM BOOSTER']} setCurrentValue={setBooster}></SelectOptionsList>
                        </div>
                        <div className={'sm:w-40 mt-4 sm:mt-0 cursor-pointer uppercase p-2 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm sm:ml-2'}>
                            Approve booster
                        </div>
                        <div className={'sm:w-40 mt-4 sm:mt-0 cursor-pointer uppercase p-2 text-xs bg-orange flex items-center text-white font-bold justify-center h-9 rounded-sm sm:ml-2'}>
                            Apply booster
                        </div>
                    </div>
                </div>
                <div className={classList('my-5 flex w-full justify-center',depositedValue>0?'opacity-100':'opacity-50')}>
                    <div className={'w-full sm:w-60 mb-2 cursor-pointer uppercase p-2 text-2xl bg-orange flex items-center text-white font-bold justify-center h-12 rounded-sm sm:mx-2 mx-0'}>
                        COLLECT
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Deposit;