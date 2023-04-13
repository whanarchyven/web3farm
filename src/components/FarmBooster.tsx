import React, {useEffect, useState} from 'react';
import ContractConnector from "@/contract/contract";

interface FarmBoosterInterface {
    boostIncrease: number,
    boostPercent: number,
    boostImage: string,
    price: number,
    id: number
}

const FarmBooster = ({boostIncrease, boostPercent, boostImage, price, id}: FarmBoosterInterface) => {

    const contract = new ContractConnector()

    const [supply, setSupply] = useState<any>(null)

    const fetchSupply = async () => {
        if (window.ethereum.networkVersion == 97) {
            const minted = await contract.boosterTotalSupply(id)
            console.log(minted)
            const all = await contract.boosterMaxSupply(id)
            console.log(all)
            setSupply(all - minted)
        }
    }

    useEffect(() => {
        // contract.mintPrice(id)
        fetchSupply();
    }, [])


    return (
        <div
            className={'deposit-bg w-full flex flex-col items-center rounded-xl p-4 justify-center border-4 relative border-[#A600E3]'}>
            <p className={'text-4xl mt-5 text-white text-center font-black'}>X{boostIncrease} Farm booster</p>
            <div className={'w-full flex items-center'}>
                <div>
                    <div className={'w-full aspect-square relative'}>
                        <img className={'w-full h-full'} src={boostImage}/>
                    </div>
                </div>
                <div>
                    <p className={'text-left text-2xl uppercase font-black text-white'}>supply <span
                        className={'font-museo font-bold text-orange'}>{supply ? supply : '0'}</span></p>
                    <p className={'text-left text-2xl uppercase font-black text-white'}>farm boost <span
                        className={'font-museo font-bold text-orange'}>+{boostPercent}%</span></p>

                </div>

            </div>
            <p className={'text-2xl sm:text-3xl my-6 text-white text-center font-black leading-[70%]'}>Price: <span
                className={'text-orange font-bold font-museo uppercase'}>{price} bnb</span></p>
            <div
                className={'w-60 bg-orange h-12 rounded-sm uppercase text-white font-black text-2xl flex items-center justify-center'}
                onClick={async () => {
                    await contract.mintBooster(id, 1)
                    await fetchSupply();
                }}>
                MINT
            </div>
        </div>
    );
};

export default FarmBooster;