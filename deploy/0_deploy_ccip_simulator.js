module.exports = async ({ getNamedAccounts, deployments }) => {
    const { firstAccount } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("Deploying CCIP Simulator contract")
    await deploy("CCIPLocalSimulator", {
        contract: "CCIPLocalSimulator",
        from: firstAccount,
        log: true,
        args: []
    })
    log("CCIP Simulator contract deployed successful")
}

//在我们的设计中，nft是部署在sourcechain上。在destinationchain中我们会部署wnft
module.exports.tags = ["test", "all"]