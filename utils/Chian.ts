import { Chain } from '@wagmi/core'


export const dogechain = {
 id: 568,
 name: 'Dogechain Testnet',
 network: 'DC',
 nativeCurrency: {
 decimals: 18,
 name: 'DC',
 symbol: 'DOGE',
 },
 rpcUrls: {
 public: { http: ['https://rpc-testnet.dogechain.dog'] },
 default: { http: ['https://rpc-testnet.dogechain.dog'] },
 },
 blockExplorers: {
 etherscan: { name: 'SnowTrace', url: 'https://explorer-testnet.dogechain.dog' },
 default: { name: 'SnowTrace', url: 'https://explorer-testnet.dogechain.dog' },
 },
 contracts: {
 multicall3: {
 address: '0xca11bde05977b3631167028862be2a173976ca11',
 blockCreated: 11_907_934,
 },
 },
} as const satisfies Chain
