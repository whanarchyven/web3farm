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
        <div className={'deposit-bg w-full flex flex-col items-center rounded-xl p-4 justify-center border-4 relative border-[#A600E3]'}>
            <p className={'text-4xl mt-5 text-white text-center font-black'}>X{boostIncrease} Farm booster</p>
            <div className={'w-full flex items-center'}>
                <div>
                    <div className={'w-full aspect-square relative'}>
                        <img className={'w-full h-full'} src={boostImage}/>
                    </div>
                </div>
                <div>
                    <p className={'text-left text-2xl uppercase font-black text-white'}>supply <span className={'font-museo font-bold text-orange'}>{supply}</span></p>
                    <p className={'text-left text-2xl uppercase font-black text-white'}>farm boost <span className={'font-museo font-bold text-orange'}>+{boostPercent}%</span></p>

                </div>

            </div>
            <p className={'text-2xl sm:text-3xl my-6 text-white text-center font-black leading-[70%]'}>Price: <span className={'text-orange font-bold font-museo uppercase'}>{price} bnb</span></p>
            <div className={'w-60 bg-orange h-12 rounded-sm uppercase text-white font-black text-2xl flex items-center justify-center'}>
                MINT
            </div>
        </div>
    );
};

export default FarmBooster;