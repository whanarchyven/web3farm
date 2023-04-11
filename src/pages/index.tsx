import Head from 'next/head'
import Image from 'next/image'
import {Inter} from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Navbar from "@/components/Navbar";
import React, {useCallback, useEffect, useState} from "react";
import CountdownTimer from "@/components/CountdownTimer";
import Marquee from "react-fast-marquee";
import Deposit from "@/components/Deposit";
import FarmBooster from "@/components/FarmBooster";
import Web3 from 'web3';


const inter = Inter({subsets: ['latin']})

export default function Home() {


    const [navbarHidden, setNavbarHidden] = useState(true)


    const boosters = [
        'X2 ATOM BOOSTER',
        'X3 ATOM BOOSTER',
        'X4 ATOM BOOSTER',
        'X5 ATOM BOOSTER',
    ]

    return (
        <>
            <Head>
                <title>WEB3 FARM</title>
                <meta name="description" content="Web3 Farm is a
                                    decentralized cryptoproject that allows users to deposit their funds into farming
                                    pools and receive rewards in cryptocurrency"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={'min-h-screen overflow-x-hidden font-pluto '}>
                <Navbar setIsHidden={setNavbarHidden} isHidden={navbarHidden}></Navbar>
                <div className={'p-2 sm:p-14 pt-16 sm:pt-20 main-bg h-[986px]'}>
                    <div className={'grid mt-5 sm:mt-10 grid-cols-1 gap-8 w-full sm:grid-cols-6'}>
                        <div className={'sm:col-span-3'}>
                            <img className={'w-full'} src={'/images/logo.svg'}>
                            </img>
                            <div className={'w-full'}>
                                <p className={'text-white mt-2 font-museo font-normal sm:text-xl'}>Web3 Farm is a
                                    decentralized cryptoproject that allows users to deposit their funds into farming
                                    pools and receive rewards in cryptocurrency. These rewards are divided between all
                                    pool participants in proportion to their contributions, making the project more fair
                                    and equitable for everyone.<br/><br/>Farming pools on Web3 Farm allow users to mine
                                    different cryptocurrencies and get rewarded for it in the form of $WEB3, $BNB, $USDT
                                    tokens and so on. Users can choose from different pools depending on their
                                    investment opportunities. </p>
                            </div>
                            <div className={'w-full mt-8 flex items-center'}>
                                <img className={'w-9 aspect-square'} src={'/images/done.svg'}/>
                                <p className={'text-white ml-2 text-2xl font-[900]'}>PRESALE: <span
                                    className={'font-normal text-orange font-museo'}>to be announced</span></p>
                            </div>
                            <div className={'w-full mt-3 flex items-center'}>
                                <img className={'w-9 aspect-square'} src={'/images/done.svg'}/>
                                <p className={'text-white ml-2 text-2xl font-[900]'}>SMART CONTRACT: <span
                                    className={'font-normal text-orange font-museo'}>to be announced</span></p>
                            </div>
                            <div className={'w-full mt-3 flex items-center'}>
                                <img className={'w-9 aspect-square'} src={'/images/done.svg'}/>
                                <p className={'text-white ml-2 text-2xl font-[900]'}>TIME TO START: <span
                                    className={'font-normal text-orange font-museo'}>
                                    {/*<CountdownTimer*/}
                                    {/*time={50056050} timeLimits={'minutes'} prefix={'MINUTES'}/>*/}
                                    to be announced
                                </span></p>
                            </div>
                            <div className={'w-3/4 mt-4 flex items-center justify-between'}>
                                <div
                                    className={'px-4 w-full mr-2 py-2 bg-orange rounded-sm flex items-center text-white text-2xl justify-center font-bold'}>
                                    KYC
                                </div>
                                <div
                                    className={'px-4 w-full mx-2 py-2 bg-orange rounded-sm flex items-center text-white text-2xl justify-center font-bold'}>
                                    AUDIT
                                </div>
                                <div
                                    className={'px-4 w-full mx-2 py-2 bg-orange rounded-sm flex items-center text-white text-2xl justify-center font-bold'}>
                                    SAFU
                                </div>
                            </div>
                        </div>
                        <div className={'sm:col-span-3 flex justify-center sm:justify-end'}>
                            <div className={'w-full aspect-square relative'}>
                                <Image className={''} src={'/images/main_block.png'} alt={'atom5'}
                                       layout={'fill'}></Image>
                            </div>
                        </div>
                    </div>
                </div>
                <div
                    className={'w-full bg-[#030021] sm:px-32 px-4 pb-10 flex items-center flex-col justify-center relative overflow-x-hidden'}>
                    <a id={'farm'} className={' text-white text-center pt-28 mb-10 text-2xl sm:text-6xl font-bold'}>Introducing
                        new <br/> Farming
                        platform</a>
                    <div className={'grid gap-12 w-full grid-cols-1 sm:grid-cols-3'}>
                        <Deposit boosters={boosters} firstCoinName={'BNB'} firstCoinIcon={'/images/coins/bnb.svg'}
                                 secondCoinName={'PINKSALE'} secondCoinIcon={'/images/coins/pinksale.svg'}
                                 rewardPerBlock={12.4345} timeTillEnd={555555}></Deposit>
                        <Deposit boosters={boosters} firstCoinName={'BNB'} firstCoinIcon={'/images/coins/bnb.svg'}
                                 secondCoinName={'PINKSALE'} secondCoinIcon={'/images/coins/pinksale.svg'}
                                 rewardPerBlock={12.4345} timeTillEnd={555555}></Deposit>
                        <Deposit boosters={boosters} firstCoinName={'BNB'} firstCoinIcon={'/images/coins/bnb.svg'}
                                 secondCoinName={'PINKSALE'} secondCoinIcon={'/images/coins/pinksale.svg'}
                                 rewardPerBlock={12.4345} timeTillEnd={555555}></Deposit>
                        <Deposit boosters={boosters} firstCoinName={'BNB'} firstCoinIcon={'/images/coins/bnb.svg'}
                                 secondCoinName={'PINKSALE'} secondCoinIcon={'/images/coins/pinksale.svg'}
                                 rewardPerBlock={12.4345} timeTillEnd={555555}></Deposit>
                        <Deposit boosters={boosters} firstCoinName={'BNB'} firstCoinIcon={'/images/coins/bnb.svg'}
                                 secondCoinName={'PINKSALE'} secondCoinIcon={'/images/coins/pinksale.svg'}
                                 rewardPerBlock={12.4345} timeTillEnd={555555}></Deposit>
                        <Deposit boosters={boosters} firstCoinName={'BNB'} firstCoinIcon={'/images/coins/bnb.svg'}
                                 secondCoinName={'PINKSALE'} secondCoinIcon={'/images/coins/pinksale.svg'}
                                 rewardPerBlock={12.4345} timeTillEnd={555555}></Deposit>
                        <Deposit boosters={boosters} firstCoinName={'BNB'} firstCoinIcon={'/images/coins/bnb.svg'}
                                 secondCoinName={'PINKSALE'} secondCoinIcon={'/images/coins/pinksale.svg'}
                                 rewardPerBlock={12.4345} timeTillEnd={555555}></Deposit>
                        <Deposit boosters={boosters} firstCoinName={'BNB'} firstCoinIcon={'/images/coins/bnb.svg'}
                                 secondCoinName={'PINKSALE'} secondCoinIcon={'/images/coins/pinksale.svg'}
                                 rewardPerBlock={12.4345} timeTillEnd={555555}></Deposit>
                        <Deposit boosters={boosters} firstCoinName={'BNB'} firstCoinIcon={'/images/coins/bnb.svg'}
                                 secondCoinName={'PINKSALE'} secondCoinIcon={'/images/coins/pinksale.svg'}
                                 rewardPerBlock={12.4345} timeTillEnd={555555}></Deposit>
                    </div>

                </div>
                <div className={'px-2 farm-booster-bg relative py-20 sm:px-32'}>
                    <a id={'boosters'} className={'pt-28 text-white text-4xl sm:text-8xl font-bold'}>Farm boosters</a>
                    <p className={'text-white mt-2 text-sm w-3/5 font-museo mt-5 font-normal sm:text-2xl'}>NFT Boosters.
                        Allows you to increase the profitability of farming in farming pools and is available in four
                        types:
                        <br/><br/>
                        1. adds 10% to farming<br/>
                        2. adds 30% to farming<br/>
                        3. adds 40% to farming<br/>
                        4. adds 50% to farming<br/><br/>

                        Each NFT booster has its own unique characteristics. These boosters can be purchased on our
                        website.</p>
                    <img src={'/images/booster_sprite.png'} className={'absolute right-0'}/>
                    <div className={'grid grid-cols-1 mt-10 sm:grid-cols-2 w-full sm:w-3/4 gap-8 '}>
                        <FarmBooster boostIncrease={2} boostPercent={10} boostImage={'/images/atoms/x2.svg'}
                                     supply={200}
                                     price={0.25}></FarmBooster>
                        <FarmBooster boostIncrease={3} boostPercent={30} boostImage={'/images/atoms/x3.svg'}
                                     supply={100}
                                     price={0.50}></FarmBooster>
                        <FarmBooster boostIncrease={4} boostPercent={40} boostImage={'/images/atoms/x4.svg'} supply={50}
                                     price={1.50}></FarmBooster>
                        <FarmBooster boostIncrease={5} boostPercent={50} boostImage={'/images/atoms/x5.svg'} supply={25}
                                     price={5.0}></FarmBooster>
                    </div>
                </div>

                <div className={'farm-booster-bg px-5 py-10 sm:px-32'}>
                    <a id={'roadmap'} className={'text-5xl sm:text-8xl font-black pt-24 text-white'}>Roadmap</a>
                    <div className={'grid sm:grid-cols-4'}>
                        <div className={'flex-col pl-7 sm:pl-0 py-4 relative sm:mt-6 flex justify-start'}>
                            <div className={'flex flex-col sm:flex-row sm:mb-6 items-center sm:relative'}>
                                <div className={'w-6 absolute -left-1 aspect-square bg-orange rounded-full'}>

                                </div>
                                <div className={'h-full absolute left-[6px] w-[4px] sm:w-full sm:h-[5px] bg-orange'}>

                                </div>
                            </div>
                            <div className={'flex items-center w-5/5'}>
                                <p className={'text-2xl sm:text-5xl font-[700] uppercase text-orange '}>Q1-2 2023 </p>
                            </div>
                            <ul className={'list-disc pl-5 text-white leading-9 text-sm sm:text-xl'}>
                                <li>Planning & Team building</li>
                                <li>Website & Community</li>
                                <li>farm pools development</li>
                                <li>Whitepaper</li>
                                <li>Marketing</li>
                                <li>1st giveaway</li>
                                <li>1st community competition</li>
                                <li>Launch Farming pool BNB/BUSD/Pinksale</li>
                                <li>NFT booster sale</li>
                                <li>Fair launch $Web3Farm token & CEX Listing</li>
                                <li>CG,CMC & CEX Listing</li>
                                <li>Launch Farming pool WEB3 token</li>
                                <li>CEX listing</li>

                            </ul>
                        </div>
                        <div className={'flex-col pl-7 sm:pl-0 py-4 relative sm:mt-6 flex justify-start'}>
                            <div className={'flex flex-col sm:flex-row sm:mb-6 items-center sm:relative'}>
                                <div className={'w-6 absolute -left-1 aspect-square bg-white rounded-full'}>

                                </div>
                                <div className={'h-full absolute left-[6px] w-[4px] sm:w-full sm:h-[5px] bg-white'}>

                                </div>
                            </div>
                            <div className={'flex items-center w-4/5'}>

                                <p className={'text-2xl sm:text-5xl font-black uppercase text-white '}>Q3
                                    2023 </p>
                            </div>
                            <ul className={'list-disc pl-5 text-white leading-9 text-sm sm:text-xl'}>
                                <li>DeFi App launch</li>
                                <li>More Partnership</li>
                                <li>Marketing</li>
                                <li>Launch Energy token</li>

                            </ul>
                        </div>
                        <div className={'flex-col pl-7 sm:pl-0 py-4 relative sm:mt-6 flex justify-start'}>
                            <div className={'flex flex-col sm:flex-row sm:mb-6 items-center sm:relative'}>
                                <div className={'w-6 absolute -left-1 aspect-square bg-white rounded-full'}>

                                </div>
                                <div
                                    className={'h-full absolute left-[6px] w-[4px] sm:w-full rounded-full sm:h-[5px] bg-white'}>

                                </div>
                            </div>
                            <div className={'flex items-center w-4/5'}>

                                <p className={'text-2xl sm:text-5xl font-black uppercase text-white '}>Q4
                                    2023 </p>
                            </div>
                            <ul className={'list-disc pl-5 text-white leading-9 text-sm sm:text-xl'}>
                                <li>Staking NFT</li>
                                <li>Staking Gov token</li>
                                <li>Staking Energy token</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className={'bg-[#110333] py-10 4'}>
                    <a id={'partners'}
                       className={'text-2xl text-center sm:text-8xl block w-full text-center font-black text-white'}>Partners</a>
                    <Marquee direction={'left'} gradient={false} className={'overflow-hidden my-6'}>
                        <div
                            className={'w-96 h-24 mx-5 flex items-center bg-white justify-center p-7 rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/BscScan-logo.png'} className={''}/>
                        </div>
                        <div
                            className={'w-96 h-24 mx-5 flex items-center bg-white justify-center p-7 rounded-lg border-2 border-[#A600E3]'}>
                            <img
                                src={'/images/partners/coingecko-branding-guide-8447de673439420efa0ab1e0e03a1f8b0137270fbc9c0b7c086ee284bd417fa1.png'}
                                className={''}/>
                        </div>
                        <div
                            className={'w-96 h-24 mx-5 flex items-center bg-white justify-center p-7 rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/Coinmarketcap_svg_logo.png'} className={''}/>
                        </div>
                        <div
                            className={'w-96 h-24 mx-5 flex items-center bg-white justify-center p-2 rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/Mediamodifier-Design.svg'} className={'h-full aspect-square'}/>
                        </div>
                    </Marquee>
                    <Marquee direction={'right'} gradient={false} className={'overflow-hidden my-6'}>

                        <div
                            className={'w-96 h-24 mx-5 flex items-center bg-white justify-center p-7 rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/dexview.b324bb762aec3013ebd4.png'} className={''}/>
                        </div>
                        <div
                            className={'w-96 h-24 mx-5 flex items-center bg-white justify-center p-7 rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/metamask4112.png'} className={'w-full'}/>
                        </div>
                        <div
                            className={'w-96 h-24 mx-5 flex items-center bg-white justify-center p-8 rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/pancakeswap-cake3276.png'} className={'w-full'}/>
                        </div>
                        <div
                            className={'w-96 h-24 mx-5 flex items-center bg-white justify-center p-2 rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/pinksale-logo-C26E3C2FC3-seeklogo.com.png'}
                                 className={'h-full aspect-square'}/>
                        </div>

                    </Marquee>
                </div>
                <div className={'bg-black w-full p-3 sm:py-10 sm:px-32'}>
                    <p className={'uppercase font-black text-orange text-2xl sm:text-4xl'}>HAVE QUESTIONS? WRITE US!</p>
                    <div className={'grid mt-5 gap-5 sm:grid-cols-4'}>
                        <input onChange={(event) => {
                        }}
                               className={'h-12 w-full rounded-md text-violet font-bold border-2 border-orange placeholder:text-black placeholder:opacity-50 p-2'}
                               placeholder={`Name`}/>
                        <input onChange={(event) => {
                        }}
                               className={'h-12 w-full rounded-md text-black font-bold border-2 border-orange placeholder:text-black placeholder:opacity-50 p-2'}
                               placeholder={`Question`}/>
                        <input onChange={(event) => {
                        }}
                               className={'h-12 w-full rounded-md text-black font-bold border-2 border-orange placeholder:text-black placeholder:opacity-50 p-2'}
                               placeholder={`Email / Telegram nickname`}/>
                        <button className={'bg-orange h-12 rounded-md text-white font-black text-3xl'}>SEND</button>
                    </div>
                    <div
                        className={'w-full mt-24 animate-navbarOpen transition-all duration-300 mt-3 grid sm:grid-cols-7 items-center'}>
                        <p className={'text-2xl uppercase font-semibold text-orange text-center  cursor-pointer '}>Presale</p>
                        <p className={'text-2xl uppercase font-semibold text-orange text-center  cursor-pointer '}>KYC</p>
                        <p className={'text-2xl uppercase font-semibold text-orange text-center  cursor-pointer '}>AUDIT</p>
                        <p className={'text-2xl uppercase font-semibold text-orange text-center  cursor-pointer '}>SAFU</p>
                        <p className={'text-2xl uppercase font-semibold text-orange text-center  cursor-pointer '}>Docs</p>
                        <p className={'text-2xl uppercase font-semibold text-orange text-center  cursor-pointer '}>Telegram</p>
                        <p className={'text-2xl uppercase font-semibold text-orange text-center  cursor-pointer '}>Twitter</p>
                    </div>
                </div>

            </main>
        </>
    )
}
