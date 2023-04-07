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

    const web3 = new Web3(Web3.givenProvider);

    const rewardTokenABI = [{
            "inputs": [],
            "stateMutability": "nonpayable",
            "type": "constructor"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
                "indexed": true,
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
            "name": "Approval",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {
                "indexed": true,
                "internalType": "address",
                "name": "to",
                "type": "address"
            }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
            "name": "Transfer",
            "type": "event"
        }, {
            "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
                "internalType": "address",
                "name": "spender",
                "type": "address"
            }],
            "name": "allowance",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "name": "approve",
            "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
            "name": "balanceOf",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "decimals",
            "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
                "internalType": "uint256",
                "name": "subtractedValue",
                "type": "uint256"
            }],
            "name": "decreaseAllowance",
            "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
                "internalType": "uint256",
                "name": "addedValue",
                "type": "uint256"
            }],
            "name": "increaseAllowance",
            "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
            "name": "mint",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [],
            "name": "name",
            "outputs": [{"internalType": "string", "name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "symbol",
            "outputs": [{"internalType": "string", "name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "totalSupply",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }],
            "name": "transfer",
            "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
            "name": "transferFrom",
            "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
            "stateMutability": "nonpayable",
            "type": "function"
        }]
    ; //сюда аби пуляешь, но лучше из другого файла импротить. Аби можно взять на страницах контрактов
    const stakedTokenABI = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "owner", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
        "name": "Approval",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "from", "type": "address"}, {
            "indexed": true,
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
        "name": "Transfer",
        "type": "event"
    }, {
        "inputs": [{"internalType": "address", "name": "owner", "type": "address"}, {
            "internalType": "address",
            "name": "spender",
            "type": "address"
        }],
        "name": "allowance",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "name": "approve",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "account", "type": "address"}],
        "name": "balanceOf",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "decimals",
        "outputs": [{"internalType": "uint8", "name": "", "type": "uint8"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
            "internalType": "uint256",
            "name": "subtractedValue",
            "type": "uint256"
        }],
        "name": "decreaseAllowance",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "spender", "type": "address"}, {
            "internalType": "uint256",
            "name": "addedValue",
            "type": "uint256"
        }],
        "name": "increaseAllowance",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}],
        "name": "mint",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "name",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "symbol",
        "outputs": [{"internalType": "string", "name": "", "type": "string"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "totalSupply",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "to", "type": "address"}, {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }],
        "name": "transfer",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
            "internalType": "address",
            "name": "to",
            "type": "address"
        }, {"internalType": "uint256", "name": "amount", "type": "uint256"}],
        "name": "transferFrom",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }];
    const erc1155ABI = [{"inputs": [], "stateMutability": "nonpayable", "type": "constructor"}, {
            "anonymous": false,
            "inputs": [{"indexed": true, "internalType": "address", "name": "account", "type": "address"}, {
                "indexed": true,
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }, {"indexed": false, "internalType": "bool", "name": "approved", "type": "bool"}],
            "name": "ApprovalForAll",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{
                "indexed": true,
                "internalType": "address",
                "name": "previousOwner",
                "type": "address"
            }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
            "name": "OwnershipTransferred",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "internalType": "address", "name": "operator", "type": "address"}, {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            }, {"indexed": true, "internalType": "address", "name": "to", "type": "address"}, {
                "indexed": false,
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            }, {"indexed": false, "internalType": "uint256[]", "name": "values", "type": "uint256[]"}],
            "name": "TransferBatch",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": true, "internalType": "address", "name": "operator", "type": "address"}, {
                "indexed": true,
                "internalType": "address",
                "name": "from",
                "type": "address"
            }, {"indexed": true, "internalType": "address", "name": "to", "type": "address"}, {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }, {"indexed": false, "internalType": "uint256", "name": "value", "type": "uint256"}],
            "name": "TransferSingle",
            "type": "event"
        }, {
            "anonymous": false,
            "inputs": [{"indexed": false, "internalType": "string", "name": "value", "type": "string"}, {
                "indexed": true,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }],
            "name": "URI",
            "type": "event"
        }, {
            "inputs": [{"internalType": "address", "name": "account", "type": "address"}, {
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            }],
            "name": "balanceOf",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address[]", "name": "accounts", "type": "address[]"}, {
                "internalType": "uint256[]",
                "name": "ids",
                "type": "uint256[]"
            }],
            "name": "balanceOfBatch",
            "outputs": [{"internalType": "uint256[]", "name": "", "type": "uint256[]"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "name": "boosters",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}],
            "name": "exists",
            "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "account", "type": "address"}, {
                "internalType": "address",
                "name": "operator",
                "type": "address"
            }],
            "name": "isApprovedForAll",
            "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "name": "maxSupply",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "name": "mintPrice",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "owner",
            "outputs": [{"internalType": "address", "name": "", "type": "address"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [],
            "name": "renounceOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }, {"internalType": "uint256[]", "name": "ids", "type": "uint256[]"}, {
                "internalType": "uint256[]",
                "name": "amounts",
                "type": "uint256[]"
            }, {"internalType": "bytes", "name": "data", "type": "bytes"}],
            "name": "safeBatchTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "from", "type": "address"}, {
                "internalType": "address",
                "name": "to",
                "type": "address"
            }, {"internalType": "uint256", "name": "id", "type": "uint256"}, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }, {"internalType": "bytes", "name": "data", "type": "bytes"}],
            "name": "safeTransferFrom",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "operator", "type": "address"}, {
                "internalType": "bool",
                "name": "approved",
                "type": "bool"
            }], "name": "setApprovalForAll", "outputs": [], "stateMutability": "nonpayable", "type": "function"
        }, {
            "inputs": [{"internalType": "string", "name": "newuri", "type": "string"}],
            "name": "setURI",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "bytes4", "name": "interfaceId", "type": "bytes4"}],
            "name": "supportsInterface",
            "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}],
            "name": "totalSupply",
            "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
            "name": "transferOwnership",
            "outputs": [],
            "stateMutability": "nonpayable",
            "type": "function"
        }, {
            "inputs": [{"internalType": "uint256", "name": "_tokenid", "type": "uint256"}],
            "name": "uri",
            "outputs": [{"internalType": "string", "name": "", "type": "string"}],
            "stateMutability": "view",
            "type": "function"
        }, {
            "inputs": [{"internalType": "address", "name": "recipient", "type": "address"}, {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function"
        }]
    ;
    const stakingABI = [{
        "inputs": [{
            "internalType": "address",
            "name": "_rewardTokenAddress",
            "type": "address"
        }, {"internalType": "address", "name": "_stakedTokenAddress", "type": "address"}, {
            "internalType": "address",
            "name": "_boosterToken",
            "type": "address"
        }], "stateMutability": "nonpayable", "type": "constructor"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "recipient",
            "type": "address"
        }, {"indexed": false, "internalType": "uint256", "name": "tokenAmount", "type": "uint256"}],
        "name": "ClaimRewards",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": false, "internalType": "address", "name": "user", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "boost", "type": "uint256"}],
        "name": "NewLock",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": true,
            "internalType": "address",
            "name": "previousOwner",
            "type": "address"
        }, {"indexed": true, "internalType": "address", "name": "newOwner", "type": "address"}],
        "name": "OwnershipTransferred",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "time", "type": "uint256"}],
        "name": "RewardDeposited",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "uint256",
            "name": "newLockTime",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "newMinStaking", "type": "uint256"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "newMaxBoost",
            "type": "uint256"
        }],
        "name": "SettingsUpdated",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{
            "indexed": false,
            "internalType": "uint256",
            "name": "totalAmount",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "startTime", "type": "uint256"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "endTime",
            "type": "uint256"
        }],
        "name": "StakingCreated",
        "type": "event"
    }, {
        "anonymous": false,
        "inputs": [{"indexed": true, "internalType": "address", "name": "user", "type": "address"}, {
            "indexed": false,
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }, {"indexed": false, "internalType": "uint256", "name": "boost", "type": "uint256"}],
        "name": "Unlock",
        "type": "event"
    }, {
        "inputs": [],
        "name": "ACC_FACTOR",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "booster",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "boosterToken",
        "outputs": [{"internalType": "contract IBooster", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "_newMinStakingAmount", "type": "uint256"}],
        "name": "changeMinStakingAmount",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "claim",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "endTime",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "isFinished",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "lastDistribution",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "minStakingAmount",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}, {
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {"internalType": "uint256[]", "name": "", "type": "uint256[]"}, {
            "internalType": "uint256[]",
            "name": "",
            "type": "uint256[]"
        }, {"internalType": "bytes", "name": "", "type": "bytes"}],
        "name": "onERC1155BatchReceived",
        "outputs": [{"internalType": "bytes4", "name": "", "type": "bytes4"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}, {
            "internalType": "address",
            "name": "",
            "type": "address"
        }, {"internalType": "uint256", "name": "", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }, {"internalType": "bytes", "name": "", "type": "bytes"}],
        "name": "onERC1155Received",
        "outputs": [{"internalType": "bytes4", "name": "", "type": "bytes4"}],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "owner",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}, {
            "internalType": "bool",
            "name": "useBooster",
            "type": "bool"
        }, {"internalType": "uint256", "name": "boosterId", "type": "uint256"}],
        "name": "participate",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "renounceOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "tokenAdd", "type": "address"}, {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }], "name": "rescueERC20", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {
        "inputs": [],
        "name": "rewardPerSecond",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "rewardToken",
        "outputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "rewardTokenAddress",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "rewards",
        "outputs": [{
            "internalType": "uint256",
            "name": "totalExcludedToken",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "lastClaim", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "sharedData",
        "outputs": [{"internalType": "uint256", "name": "totalAmount", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "totalBoostedAmount",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "rewardPerShareToken", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "stakedToken",
        "outputs": [{"internalType": "contract IERC20", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "stakedTokenAddress",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "uint256", "name": "_rewardAmount", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "_startTime",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "_endTime", "type": "uint256"}],
        "name": "start",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "startTime",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "bytes4", "name": "interfaceId", "type": "bytes4"}],
        "name": "supportsInterface",
        "outputs": [{"internalType": "bool", "name": "", "type": "bool"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [],
        "name": "totalTokenClaimed",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "newOwner", "type": "address"}],
        "name": "transferOwnership",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [],
        "name": "unlock",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "", "type": "address"}],
        "name": "userData",
        "outputs": [{"internalType": "uint256", "name": "amount", "type": "uint256"}, {
            "internalType": "uint256",
            "name": "boostedAmount",
            "type": "uint256"
        }, {"internalType": "uint256", "name": "lockedTime", "type": "uint256"}, {
            "internalType": "bool",
            "name": "hasBooster",
            "type": "bool"
        }, {"internalType": "uint256", "name": "boosterId", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "user", "type": "address"}],
        "name": "viewUnpaid",
        "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    }, {
        "inputs": [{"internalType": "address", "name": "recipient", "type": "address"}, {
            "internalType": "uint256",
            "name": "amount",
            "type": "uint256"
        }], "name": "withdraw", "outputs": [], "stateMutability": "nonpayable", "type": "function"
    }, {"stateMutability": "payable", "type": "receive"}];

    const rewardTokenAddress = '0xe44fa14881b192be661ad5ec23227b9924079f80';
    const stakedTokenAddress = '0x7fe57743b2967eb43e1f8a949387144569d5481d';
    const erc1155Address = '0x6e58824a169452ae3dBD77F32ef44199B403221E';
    const stakingAddress = '0x604e275876Be53fFD2165dDdb481187e42474aea';


    const rewardToken = new web3.eth.Contract(rewardTokenABI, rewardTokenAddress);
    const stakedToken = new web3.eth.Contract(stakedTokenABI, stakedTokenAddress);
    const erc1155 = new web3.eth.Contract(erc1155ABI, erc1155Address);
    const staking = new web3.eth.Contract(stakingABI, stakingAddress);

    async function claimRewards() {
        const accounts = await web3.eth.getAccounts();
        await staking.methods.claim().send({from: accounts[0]});
    }

    async function stakeTokens(amount, useBooster, boosterId) {
        const accounts = await web3.eth.getAccounts();
        await staking.methods.participate(amount, useBooster, boosterId).send({from: accounts[0]});
    }

    async function claim() {
        const accounts = await web3.eth.getAccounts();
        await staking.methods.claim().send({from: accounts[0]});
    }

    async function unlock() {
        const accounts = await web3.eth.getAccounts();
        await staking.methods.unlock().send({from: accounts[0]});
    }

    async function minStakingAmount() {
        const accounts = await web3.eth.getAccounts();
        await staking.methods.minStakingAmount().send({from: accounts[0]});
    }

    async function rewardPerSecond() {
        const accounts = await web3.eth.getAccounts();
        await staking.methods.rewardPerSecond().send({from: accounts[0]});
    }

    async function startTime() {
        const accounts = await web3.eth.getAccounts();
        await staking.methods.startTime().send({from: accounts[0]});
    }

    async function isFinished() {
        const accounts = await web3.eth.getAccounts();
        await staking.methods.startTime().send({from: accounts[0]});
    }

    async function userData() {
        const accounts = await web3.eth.getAccounts();
        await staking.methods.userData(accounts[0]).send({from: accounts[0]});
    }

    async function viewUnpaid() {
        const accounts = await web3.eth.getAccounts();
        await staking.methods.viewUnpaid(accounts[0]).send({from: accounts[0]});
    }


    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <main className={'min-h-screen overflow-x-hidden font-pluto '}>
                <Navbar setIsHidden={setNavbarHidden} isHidden={navbarHidden}></Navbar>
                <div className={'p-2 sm:p-14 pt-16 sm:pt-28 main-bg h-[986px]'}>
                    <div className={'grid mt-5 sm:mt-10 grid-cols-1 gap-8 w-full sm:grid-cols-6'}>
                        <div className={'sm:col-span-3'}>
                            <img className={'w-full'} src={'/images/logo.svg'}>
                            </img>
                            <div className={'w-full'}>
                                <p className={'text-white mt-2 font-museo font-normal sm:text-2xl'}>Our WEB3 project is
                                    a decentralized
                                    cryptocurrency exchange that utilizes blockchain technology to provide users with a
                                    secure and transparent platform for trading cryptocurrencies. </p>
                            </div>
                            <div className={'w-full mt-8 flex items-center'}>
                                <img className={'w-9 aspect-square'} src={'/images/done.svg'}/>
                                <p className={'text-white ml-2 text-2xl font-[900]'}>PRESALE: <span
                                    className={'font-normal text-orange font-museo'}>15 april 2023 14 UTC</span></p>
                            </div>
                            <div className={'w-full mt-3 flex items-center'}>
                                <img className={'w-9 aspect-square'} src={'/images/done.svg'}/>
                                <p className={'text-white ml-2 text-2xl font-[900]'}>SMART CNTRCT: <span
                                    className={'font-normal text-orange font-museo'}>0x3454657457777865</span></p>
                            </div>
                            <div className={'w-full mt-3 flex items-center'}>
                                <img className={'w-9 aspect-square'} src={'/images/done.svg'}/>
                                <p className={'text-white ml-2 text-2xl font-[900]'}>TIME TO START: <span
                                    className={'font-normal text-orange font-museo'}><CountdownTimer
                                    time={50056050} timeLimits={'minutes'} prefix={'MINUTES'}/></span></p>
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
                        {/*<div className={'sm:col-span-3 flex flex-col items-center justify-between'}>*/}
                        {/*    <div*/}
                        {/*        className={'w-full my-1 text-violet text-3xl font-bold h-14 bg-white rounded-full flex items-center justify-center border-blue border-4'}>*/}
                        {/*        KYC*/}
                        {/*    </div>*/}
                        {/*    <div*/}
                        {/*        className={'w-full my-1 text-violet text-3xl font-bold h-14 bg-white rounded-full flex items-center justify-center border-blue border-4'}>*/}
                        {/*        AUDIT*/}
                        {/*    </div>*/}
                        {/*    <div*/}
                        {/*        className={'w-full my-1 text-violet text-3xl font-bold h-14 bg-white rounded-full flex items-center justify-center border-blue border-4'}>*/}
                        {/*        SAFU*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                        {/*<div*/}
                        {/*    className={'sm:col-span-9 p-2 flex flex-col sm:flex-row items-center justify-between h-full border-blue rounded-xl bg-violet border-4'}>*/}
                        {/*    <div className={'h-full aspect-square relative'}>*/}
                        {/*        <Image src={'/images/main_info.svg'} alt={'main info'} layout={'fill'}></Image>*/}
                        {/*    </div>*/}
                        {/*    <div className={'flex flex-col sm:w-1/4 items-center'}>*/}
                        {/*        <p className={'uppercase text-white text-2xl text-center font-bold my-2'}>Presale</p>*/}
                        {/*        <p className={'uppercase text-blue text-2xl text-center font-bold my-2'}>15 april*/}
                        {/*            2023 <br/> 14 UTC</p>*/}
                        {/*    </div>*/}
                        {/*    <div className={'flex flex-col sm:w-1/4 items-center'}>*/}
                        {/*        <p className={'uppercase text-white text-2xl text-center font-bold my-2'}>SMART*/}
                        {/*            CNTRCT</p>*/}
                        {/*        <p className={'uppercase text-blue text-2xl text-center font-bold my-2'}>0x345465<br/>7457777865*/}
                        {/*        </p>*/}
                        {/*    </div>*/}
                        {/*    <div className={'flex flex-col sm:w-1/4 items-center cursor-pointer'}>*/}
                        {/*        <p className={'uppercase text-white text-2xl text-center font-bold my-2'}*/}
                        {/*           onClick={() => {*/}
                        {/*               console.log(userData())*/}
                        {/*           }}>TIME TO*/}
                        {/*            START</p>*/}
                        {/*        <p className={'uppercase text-blue text-2xl text-center font-bold my-2'}><CountdownTimer*/}
                        {/*            time={50056050} timeLimits={'minutes'} prefix={'MINUTES'}/></p>*/}
                        {/*    </div>*/}
                        {/*</div>*/}
                    </div>
                </div>
                <div
                    className={'w-full bg-[#030021] sm:px-32 px-4 py-10 flex items-center flex-col justify-center relative overflow-x-hidden'}>
                    <p className={' text-white text-center mb-10 text-2xl sm:text-6xl font-bold'}>Introducing new <br/> Farming
                        platform</p>
                    <div className={'grid gap-12 w-full grid-cols-1 sm:grid-cols-2'}>
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
                    <p className={'text-white text-4xl sm:text-8xl mt-10 font-bold'}>Farm boosters</p>
                    <p className={'text-white mt-2 text-sm w-4/5 font-museo mt-5 font-normal sm:text-2xl'}>collection of tools,
                        techniques, and practices aimed at enhancing the productivity and efficiency of farming
                        operations. This program is designed to provide farmers with the necessary resources to optimize
                        their agricultural output, increase crop yields, improve soil health, and reduce waste.</p>
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
                    <p className={'text-5xl sm:text-8xl font-black text-white'}>Roadmap</p>
                    <div className={'grid sm:grid-cols-4'}>
                        <div className={'flex-col pl-7 sm:pl-0 py-4 relative sm:mt-6 flex justify-start'}>
                            <div className={'flex flex-col sm:flex-row sm:mb-6 items-center sm:relative'}>
                                <div className={'w-6 absolute -left-1 aspect-square bg-orange rounded-full'}>

                                </div>
                                <div className={'h-full absolute left-[6px] w-[4px] sm:w-full sm:h-[5px] bg-orange'}>

                                </div>
                            </div>
                            <div className={'flex items-center w-4/5'}>
                                <p className={'text-2xl sm:text-5xl font-[700] uppercase text-orange '}>Q1 2023 </p>
                            </div>
                            <ul className={'list-disc pl-5 text-white leading-9 text-sm sm:text-xl'}>
                                <li>Planning & Team building</li>
                                <li>Website & Community</li>
                                <li>Farm pools development</li>
                                <li>Whitepaper Marketing</li>
                                <li>1st giveaway</li>
                                <li>1st community competition</li>
                                <li>Launch Farming pool BNB/BUSD/Pinksale</li>
                                <li>NFT booster sale</li>
                                <li>Fair launch $Web3Farm token</li>
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

                                <p className={'text-2xl sm:text-5xl font-black uppercase text-white '}>Q1
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
                                <div className={'h-full absolute left-[6px] w-[4px] sm:w-full sm:h-[5px] bg-white'}>

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
                        <div className={'flex-col pl-7 sm:pl-0 py-4 relative sm:mt-6 flex justify-start'}>
                            <div className={'flex flex-col sm:flex-row sm:mb-6 items-center sm:relative'}>
                                <div className={'w-6 absolute -left-1 aspect-square bg-white rounded-full'}>

                                </div>
                                <div className={'h-full absolute left-[6px] w-[4px] sm:w-full sm:h-[5px] bg-white'}>

                                </div>
                            </div>
                            <div className={'flex items-center w-4/5'}>

                                <p className={'text-2xl sm:text-5xl font-black uppercase text-white '}>Q1
                                    2024 </p>
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
                    <p className={'text-2xl sm:text-8xl text-center font-black text-white'}>Partners</p>
                    <Marquee direction={'left'} gradient={false} className={'overflow-hidden my-6'}>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                    </Marquee>
                    <Marquee direction={'right'} gradient={false} className={'overflow-hidden my-6'}>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                        <div className={'w-72 h-20 mx-5 flex items-center deposit-bg justify-center rounded-lg border-2 border-[#A600E3]'}>
                            <img src={'/images/partners/binance.svg'} className={'w-3/4 h-32'}/>
                        </div>
                    </Marquee>
                </div>
                <div className={'bg-[#110333] w-full p-3 sm:py-10 sm:px-32'}>
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
