interface Window {
    // pick one
    ethereum: EthereumProvider
    // ethereum: ExternalProvider
    // ethereum: AbstractProvider
}

// ExternalProvider seems to be the official ethersproject type for the window.ethereum object, however, `new Web3(ethereum)` does not like it so we must improvise.
declare type ExternalProvider = import('@ethersproject/providers').ExternalProvider
declare type AbstractProvider = import('../node_modules/web3-core/types').AbstractProvider
interface EthereumProvider extends ExternalProvider {
    _state: {
        accounts: string[]
    }
    on(event: 'close' | 'accountsChanged' | 'chainChanged' | 'networkChanged', callback: (payload: any) => void): void
    once(event: 'close' | 'accountsChanged' | 'chainChanged' | 'networkChanged', callback: (payload: any) => void): void
    removeAllListeners(): void
    sendAsync: AbstractProvider['sendAsync']
}