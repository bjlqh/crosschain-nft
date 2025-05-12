const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { firstAccount } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("NFTPoolBurnAndMint deploying...")

    const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator");
    const ccipLocalSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeployment.address);
    const ccipConifg = await ccipLocalSimulator.configuration();
    const destinationRouter = ccipConifg.destinationRouter_;
    const linkTokenAddr = ccipConifg.linkToken_;
    const wnftDeployment = await deployments.get("WrappedMyToken");
    const wnftAddr = wnftDeployment.address;

    await deploy("NFTPoolBurnAndMint", {
        contract: "NFTPoolBurnAndMint",
        from: firstAccount,
        log: true,
        args: [destinationRouter, linkTokenAddr, wnftAddr]   //constructor(address _router, address _link, address nftAddr),其中router,link需要使用mock数据，模拟ccip
    })

    log("NFTPoolBurnAndMint deployed successfully")
}

module.exports.tags = ["destchain", "all"]