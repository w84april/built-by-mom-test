This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).
Vercel deployment - https://built-by-mom-test.vercel.app/
It's a simple dApp that allows users to connect their account (using [RainbowKit](https://www.rainbowkit.com/)) and send ERC20 tokens to different address. [Wagmi](https://wagmi.sh/) + [View](https://viem.sh/) are used for blockchain interactions.

The app contains a simple [React Hook Form](https://react-hook-form.com/) with 3 fields:
- Token: ERC20 Token selection. Currently only DAI token is supported on every chain
- Recipient Address/ENS Name: An input field to type in the Ethereum address or ENS name. ENS will be resovled into an actual address if it's valid.
- Amount: An input field where users can type in the DAI amount in a human-readable format (e.g., 2.43 DAI).

## Chains
Currently the dApp supports 4 EVM blockchains: Ethereum, Sepolia (testnet), Goerli (testnet), localhost.
### Ethereum
chainId: 1,
DAI Contract Address: `0x6B175474E89094C44Da98b954EedeAC495271d0F`

### Sepolia
The Sepolia testnet is a new Proof-of-Stake testnet that developers can use to deploy and test their smart contracts for free.
You can get Sepolia ETH here - https://sepoliafaucet.com/
To test the app you also should get some tDAI token on Sepolia - simply call `create` function here to get some - https://sepolia.etherscan.io/token/0x53844f9577c2334e541aec7df7174ece5df1fcf0#writeContract

chainId: 11155111,
tDAI Contract Address: `0x53844F9577C2334e541Aec7Df7174ECe5dF1fCf0`

### Goerli
A cross-client proof-of-authority testing network for Ethereum.
Was mostly used to test ENS Avatar feature.
You can get some Goerli ETH here - https://goerlifaucet.com/

### Localhost
Local blockchain is also supported by the app.
- You can set check how to set up your local blockchain using hardhat here - [Guide](https://medium.com/@kaishinaw/erc20-using-hardhat-a-comprehensive-guide-3211efba98d4)
- You can refer to this repo if you stuck - https://github.com/w84april/local-chain
- After deploying ERC20 token contract to your local node, please update lines `40`, `41`, `42` with your data here - https://github.com/w84april/built-by-mom-test/blob/main/src/utils/constants.ts
- You should see contract address in terminal right after deploying it. 

When these steps are completed, it should be possible to connect the dApp to your local blockchain.

## Running app locally
Firstly, please create `.env` file in the root folder with contents of file like:
```
NEXT_PUBLIC_API_KEY={yourApiKey}
NEXT_PUBLIC_PROJECT_ID={yourProjectId}
```
Where `yourApiKey` is a Web3 API Key (you can get one here - https://app.infura.io/dashboard)
And `yourProjectId` is a WalletConnect project id that can be obtained from walletconnect.com

After this, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
