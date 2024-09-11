import { Connection } from "@solana/web3.js";

const connection = new Connection(
    "https://solana-mainnet.g.alchemy.com/v2/aleYeT5BI1MFFXJw37SiYu_FdeYMaMqb"

)

const getEpochs = async () => {
    const epochs = await  connection.getEpochSchedule()

    console.log(epochs)
}

getEpochs()