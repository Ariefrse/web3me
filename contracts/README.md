# CommuniCrypt Donation Smart Contract

## Setup and Deployment

1. Install Dependencies
```bash
npm install
```

2. Configure Environment
- Copy `.env.example` to `.env`
- Fill in your Infura Project ID
- Add your MetaMask private key
- Add Etherscan API Key

3. Compile Contracts
```bash
npm run compile
```

4. Deploy to Testnet
```bash
# For Sepolia
npm run deploy -- --network sepolia

# For Mumbai
npm run deploy -- --network mumbai
```

## Key Contract Features
- Create donation causes
- Donate to causes
- Claim funds for causes
- 5% platform fee
- Owner-controlled management
