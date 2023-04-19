import React, {useEffect, useState} from 'react';
import ContractConnector from "@/contract/contract";
import {classList} from "@/helpers/classList";

interface FarmBoosterInterface {
    boostIncrease: number,
    boostPercent: number,
    boostImage: string,
    price: number,
    id: number,
    account?:string,
    maxSupply:number
}

const FarmBooster = ({boostIncrease, maxSupply, account, boostPercent, boostImage, price, id}: FarmBoosterInterface) => {

    const contract = new ContractConnector()

    const [supply, setSupply] = useState<any>(null)

    const fetchSupply = async () => {
        const minted = await contract.boosterTotalSupply(id)
        // console.log(minted)
        const all = await contract.boosterMaxSupply(id)
        // console.log(all)
        setSupply(all - minted)
    }

    useEffect(() => {
        // contract.mintPrice(id)
        fetchSupply();
    }, [account])

    const translateRarity=(rar:number)=>{
        switch (rar){
            case 0: return'Bronze'
            case 1: return 'Silver'
            case 2: return 'Gold'
            case 3: return 'Diamond'
            default: return 'X3'
        }
    }

    return (
        <div
            className={'deposit-bg w-full flex flex-col items-center rounded-xl p-4 justify-center border-4 relative border-[#A600E3]'}>
            <p className={'text-3xl mt-5 text-white text-center font-black'}>{translateRarity(id)} Farm booster</p>
            <div className={'w-full flex items-center'}>
                <div>
                    <div className={'w-full aspect-square flex items-center justify-center relative'}>
                        <img className={'w-3/4 h-3/4'} src={boostImage}/>
                    </div>
                </div>
                <div>
                    <p className={'text-left text-2xl uppercase font-black text-white'}>supply <span
                        className={'font-museo font-bold text-orange'}>{supply ? supply : '0'} / {maxSupply}</span></p>
                    <p className={'text-left text-2xl uppercase font-black text-white'}>farm boost <span
                        className={'font-museo font-bold text-orange'}>+{boostPercent}%</span></p>

                </div>

            </div>
            <p className={'text-2xl sm:text-3xl my-6 text-white text-center font-black leading-[70%]'}>Price: <span
                className={'text-orange font-bold font-museo uppercase'}>{price} bnb</span></p>
            <div
                className={classList('w-60 bg-orange h-12 rounded-sm uppercase text-white font-black flex items-center justify-center',account?'text-2xl cursor-pointer':'text-sm text-center opacity-50')}
                onClick={async () => {
                    if(account){
                        await contract.mintBooster(id, 1)
                        await fetchSupply();
                    }
                }}>
                {account?'MINT':'Connect wallet to mint'}
            </div>
        </div>
    );
};

export default FarmBooster;