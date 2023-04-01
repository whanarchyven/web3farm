import React from 'react';

interface Interface {
    isHidden:boolean
}

const Navbar = ({isHidden}:Interface) => {

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
        <div className={'w-full p-2 sm:p-4 fixed z-50 font-pluto bg-violet'}>
            <div className={'w-full bg-violet flex justify-center items-center'}>
                <div
                    className={'w-40 cursor-pointer sm:mx-6 font-black text-blue uppercase h-7 flex items-center justify-center border-blue rounded-full border-2'}>
                    App
                </div>
                <p className={'cursor-pointer text-white sm:text-3xl mx-6 font-black uppercase'}>
                    Web3<span className={'text-blue'}> FARM</span>
                </p>
                <div
                    className={'w-40 cursor-pointer text-xs leading-3 sm:text-lg text-center sm:mx-6 font-black text-violet h-7 flex items-center justify-center bg-blue border-blue rounded-full border-2'}>
                    Connect wallet
                </div>
            </div>
            {isHidden?null:<div className={'w-full animate-navbarOpen transition-all duration-300 mt-3 hidden sm:grid grid-cols-7 items-center'}>
                {links.map((link)=>{
                    return <p key={link.name} className={'text-white text-center hover:text-blue transition-colors duration-300 cursor-pointer font-bold'}>{link.name}</p>
                })}
            </div>}
        </div>
    );
};

export default Navbar;