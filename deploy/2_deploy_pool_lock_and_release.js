const { ethers } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
    const { firstAccount } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("NFTPoolLockAndRelease deploying...")

    const ccipSimulatorDeployment = await deployments.get("CCIPLocalSimulator");
    const ccipLocalSimulator = await ethers.getContractAt("CCIPLocalSimulator", ccipSimulatorDeployment.address);
    const ccipConifg = await ccipLocalSimulator.configuration();
    const sourceChainRouter = ccipConifg.sourceRouter_;
    const linkTokenAddr = ccipConifg.linkToken_;
    const nftDeployment = await deployments.get("MyToken");
    const nftAddr = nftDeployment.address;

    await deploy("NFTPoolLockAndRelease", {
        contract: "NFTPoolLockAndRelease",
        from: firstAccount,
        log: true,
        args: [sourceChainRouter, linkTokenAddr, nftAddr]   //constructor(address _router, address _link, address nftAddr),其中router,link需要使用mock数据，模拟ccip
    })

    log("NFTPoolLocalLockAndRelease deployed successfully")
}

module.exports.tags = ["sourcechain", "all"]