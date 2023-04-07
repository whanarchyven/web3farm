import React from 'react';
import ConnectWallet from './ConnectWallet'

interface Interface {
    isHidden:boolean,
    setIsHidden:(arg:boolean)=>any
}

const Navbar = ({isHidden, setIsHidden}:Interface) => {

    const links = [{
        name: 'Whitepaper',
        url: '/'
    },
        {
            name: 'Roadmap',
            url: '/'
        },
        {
            name: 'Partners',
            url: '/'
        },
        {
            name: 'Farm',
            url: '/'
        },
        {
            name: 'NFT boosters',
            url: '/'
        },
        {
            name: 'Socials',
            url: '/'
        },
        {
            name: 'Tokenomics',
            url: '/'
        },

    ]

    return (
        <div className={'w-full p-1 sm:p-4 fixed z-50 font-pluto transition-all duration-300 bg-orange'} onMouseLeave={()=>{setIsHidden(true)}} onMouseEnter={()=>{setIsHidden(false)}}>
            <div className={'w-full flex justify-center items-center'}>
                <div
                    className={'w-40 cursor-pointer sm:mx-6 font-black text-white uppercase h-7 flex items-center justify-center border-white rounded-full border-2'}>
                    App
                </div>
                <p className={'cursor-pointer text-center text-white sm:text-3xl mx-1 sm:mx-6 font-black uppercase'}>
                    Web3<span className={'text-white'}> FARM</span>
                </p>
                <div
                    className={'w-40 cursor-pointer text-xs leading-3 sm:text-lg text-center sm:mx-6 font-black text-orange h-7 flex items-center justify-center bg-white border-orange rounded-full border-2'}>
                    <ConnectWallet></ConnectWallet>
                </div>
            </div>
            {isHidden?null:<div className={'w-full animate-navbarOpen transition-all duration-300 mt-3 hidden sm:grid grid-cols-7 items-center'}>
                {links.map((link)=>{
                    return <p key={link.name} className={'text-white text-center transition-colors duration-300 cursor-pointer font-bold'}>{link.name}</p>
                })}
            </div>}
        </div>
    );
};

export default Navbar;