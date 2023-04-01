import React from 'react';
interface FarmBoosterInterface {
    boostIncrease:number,
    boostPercent:number,
    boostImage:string,
    supply:number,
    price:number
}

const FarmBooster = ({ boostIncrease, boostPercent, boostImage, price, supply }:FarmBoosterInterface) => {
    return (
        <div className={'w-full flex flex-col items-center rounded-xl p-4 justify-center bg-violet border-4 relative border-blue'}>
            <p className={'text-right absolute uppercase font-black text-blue right-5 top-5'}>supply <br/>{supply}</p>
            <div className={'w-3/5 my-5 aspect-square animate-spin-atom relative'}>
                <img className={'w-full h-full'} src={boostImage}/>
            </div>
            <p className={'text-4xl mt-5 uppercase text-blue text-center font-black'}>x{boostIncrease} atoms <br/>booster</p>
            <p className={'text-5xl my-8 uppercase text-blue text-center font-black leading-[70%]'}>+ {boostPercent}% <br/><span className={'margin-0 text-white text-3xl'}>farm boost</span> </p>
            <p className={'text-2xl sm:text-3xl my-6 uppercase text-blue text-center font-black leading-[70%]'}>price: {price} bnb</p>
            <div className={'w-60 bg-blue h-12 rounded-full uppercase text-violet font-black text-2xl flex items-center justify-center'}>
                MINT
            </div>
        </div>
    );
};

export default FarmBooster;