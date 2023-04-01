import React, {useState} from 'react';
import Image from "next/image";
import CountdownTimer from "@/components/CountdownTimer";
import SelectOptionsList from "@/components/SelectOption";

interface Interface {
    firstCoinName:string,
    firstCoinIcon:string,
    secondCoinName:string,
    secondCoinIcon:string,
    rewardPerBlock:number,
    timeTillEnd:number,
    boosters?:string[]
}

const Deposit = ({firstCoinIcon, boosters, secondCoinIcon, secondCoinName, firstCoinName, timeTillEnd, rewardPerBlock}:Interface) => {

    const [enteredValue,setEnteredValue]=useState('')
    const [depositedValue,setDepositedValue]=useState(0)

    const [booster,setBooster]=useState(boosters?boosters[0]:'You have not boosters')

    return (
        <div className={'w-full rounded-xl border-violet border-4 bg-blue p-4'}>
            <div className={'w-full flex sm:flex-nowrap flex-wrap items-center justify-between'}>
                <div className={'flex items-center'}>
                    <p className={'font-bold text-3xl text-violet uppercase'}>{firstCoinName}</p>
                    <img className={'w-8 ml-2 aspect-square'} src={firstCoinIcon}/>
                </div>
                <div className={'w-20 h-12 relative'}>
                    <Image src={'/images/arrow.svg'} alt={'air'} layout={'fill'}></Image>
                </div>
                <div className={'flex items-center'}>
                    <p className={'font-bold text-3xl text-violet uppercase'}>{secondCoinName}</p>
                    <img  className={'w-8 ml-2 aspect-square'} src={secondCoinIcon}/>
                </div>
            </div>
            <div className={'flex justify-center sm:flex-nowrap flex-wrap items-end'}>
                <div className={'sm:w-auto w-full flex flex-col justify-start'}>
                    <p className={'text-violet font-medium'}>Enter deposit</p>
                    <input value={enteredValue} type={'number'} onChange={(event)=>{setEnteredValue(event.target.value)}} className={'h-9 w-full sm:w-48 rounded-full text-violet font-bold border-2 border-violet placeholder:text-violet placeholder:opacity-50 p-2'} placeholder={`Enter ${firstCoinName} value`}/>
                </div>
                <div className={'w-full sm:w-32 cursor-pointer uppercase p-2 text-sm bg-violet flex items-center text-white font-bold justify-center h-9 rounded-full my-3 sm:my-0 sm:ml-2'}>
                    Approve
                </div>
                <div className={'w-full sm:w-32 cursor-pointer uppercase p-2 text-sm bg-violet flex items-center text-white font-bold justify-center h-9 rounded-full my-3 sm:my-0 sm:ml-2'}
                onClick={()=>{
                    setDepositedValue(depositedValue+Number(enteredValue))
                }}>
                    Deposit +
                </div>
            </div>
            {depositedValue>0?<div className={'mt-3'}>
                <div className={'sm:flex justify-between items-start'}>
                    <p className={'text-violet font-medium text-xl'}>Deposited: {depositedValue} {firstCoinName}</p>
                    <p className={'text-violet sm:text-right font-normal text-sm'}>Reward per block: <br/> <span className={'text-2xl font-medium'}>{rewardPerBlock}</span></p>
                </div>
                <div className={'sm:flex justify-between items-center mt-4'}>
                    <p className={'text-violet font-medium text-xl'}>EARNED: <br/> <span className={'text-2xl font-black'}>{depositedValue*3.12415} {secondCoinName}</span></p>
                    <p className={'text-violet text-right font-normal text-sm'}>Time till block end: <br/> <span className={'text-2xl font-medium'}><CountdownTimer timeLimits={"seconds"} time={timeTillEnd}/></span></p>
                </div>
                <div className={'mt-5'}>
                    <div className={'sm:flex justify-between items-top'}>
                        <div>
                            <p className={'font-medium text-violet'}>Select Booster:</p>
                            <SelectOptionsList currentValue={booster} variants={boosters?boosters:['X1 ATOM BOOSTER']} setCurrentValue={setBooster}></SelectOptionsList>
                        </div>
                        <div>
                            <div className={'mb-3 mt-3 sm:mt-0 sm:w-40 sm:mb-2 cursor-pointer uppercase p-2 text-xs bg-violet flex items-center text-white font-bold justify-center h-9 rounded-full sm:ml-2'}>
                                Approve booster
                            </div>
                            <div className={'mb-3 sm:w-40 sm:mb-2 cursor-pointer uppercase p-2 text-xs bg-violet flex items-center text-white font-bold justify-center h-9 rounded-full sm:ml-2'}>
                                Apply booster
                            </div>
                        </div>
                    </div>
                </div>
                <div className={'my-5 flex w-full justify-center'}>
                    <div className={'w-60 mb-2 cursor-pointer uppercase p-2 text-2xl bg-violet flex items-center text-white font-bold justify-center h-12 rounded-full mx-2'}>
                        COLLECT
                    </div>
                </div>
            </div>:null}
        </div>
    );
};

export default Deposit;