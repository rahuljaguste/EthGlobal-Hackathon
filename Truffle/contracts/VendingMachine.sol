// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/Pausable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Burnable.sol";
import "@openzeppelin/contracts/token/ERC1155/extensions/ERC1155Supply.sol";

/// @custom:security-contact rahuljaguste@gmail.com
contract VendingMachine is
    ERC1155,
    Ownable,
    Pausable,
    ERC1155Burnable,
    ERC1155Supply
{
    uint256 public price = 0 ether;

    mapping(address => uint256) addressBalances;
    uint256 public maxTokens = 60;
    uint256 public tokenId = 0;
    uint256 public countPerSlot = 5;
    event Minted(
        address indexed to,
        uint256 indexed tokenId,
        uint256 indexed amount
    );

    constructor()
        ERC1155(
            "ipfs://QmWYReTfhMenvA1fTZ5tCa7fYjMgo672j9cXAZ9s2xmwie/{id}.json"
        )
    {}

    function setURI(string memory newuri) public onlyOwner {
        _setURI(newuri);
    }

    function pause() public onlyOwner {
        _pause();
    }

    function unpause() public onlyOwner {
        _unpause();
    }

    function mint(uint256 id) public payable {
        require(totalSupply(id) < 5, "You can mint only 5");
        require(msg.value >= price, "Insufficient balance to Mint");
        require(tokenId < maxTokens, "Out of Tokens");
        require(addressBalances[msg.sender] <= 3, "You can mint only 3");

        uint256 newId = (totalSupply(id) * 12) + id;
        addressBalances[msg.sender] += 1;
        tokenId++;

        _mint(msg.sender, newId, 1, "");
        emit Minted(msg.sender, newId, 1);
    }

    function _beforeTokenTransfer(
        address operator,
        address from,
        address to,
        uint256[] memory ids,
        uint256[] memory amounts,
        bytes memory data
    ) internal override(ERC1155, ERC1155Supply) whenNotPaused {
        super._beforeTokenTransfer(operator, from, to, ids, amounts, data);
    }

    function setPrice(uint256 _price) public onlyOwner {
        price = _price;
    }

    function withdraw(uint256 _amount) public payable onlyOwner {
        require(payable(msg.sender).send(_amount));
    }

    function withdrawAll() public payable onlyOwner {
        require(payable(msg.sender).send(address(this).balance));
    }

    function refill(uint256 _additionalTokens, uint256 _countPerSlot)
        public
        onlyOwner
    {
        require(_additionalTokens % 12 == 0, "Refill must be multiple of 12");
        require(
            tokenId == maxTokens,
            "Refill can only be done when all tokens are minted"
        );
        require(_countPerSlot > 0, "Need atleast 1 token per slot");
        countPerSlot = _countPerSlot;
        maxTokens += _additionalTokens;
    }

    function reset() public onlyOwner {
        tokenId = maxTokens;
    }

    function isOutOfTokens() public view returns (bool) {
        return tokenId == maxTokens;
    }

    function getCurrentTokenCount() public view returns (uint256) {
        return tokenId;
    }

    function getTokenLeft(uint256 id) public view returns (uint256) {
        return countPerSlot - totalSupply(id);
    }
}
