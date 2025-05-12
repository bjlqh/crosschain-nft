module.exports = async ({ getNamedAccounts, deployments }) => {
    const { firstAccount } = await getNamedAccounts()
    const { deploy, log } = deployments

    log("Deploying nft contract")
    await deploy("MyToken", {
        contract: "MyToken",
        from: firstAccount,
        log: true,
        args: ["MyToken", "MT"]
    })
    log("nft contract deployed successful")
}

//在我们的设计中，nft是部署在sourcechain上。在destinationchain中我们会部署wnft
module.exports.tags = ["sourcechain", "all"]