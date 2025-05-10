//  SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import {MyToken} from "./MyToken.sol";

contract WrappedMyToken is MyToken {
    constructor(
        string memory tokenName,
        string memory tokenSymbol
    ) MyToken(tokenName, tokenSymbol) {}

    //需要去铸造特定id的通证, 生产环境需要加权限去校验
    function mintTokenWithSpecificTokenId(address to, uint256 tokenId) public {
        _safeMint(to, tokenId);
    }
}
