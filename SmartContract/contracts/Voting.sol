// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract VotingPool {
    address public admin;
    string public poolName; // Added Pool Name
    uint256 public startTime;
    uint256 public endTime;
    string[] public candidates;
    mapping(string => uint256) public votesReceived;
    mapping(address => bool) public hasVoted;
    mapping(address => bool) public isVoter; // Store allowed voters

    event VoteCasted(address indexed voter, string candidate);

    constructor(
        address _admin,
        string memory _poolName,
        uint256 _startTime,
        uint256 _endTime,
        string[] memory _candidates,
        address[] memory _voters // List of allowed voters
    ) {
        admin = _admin;
        poolName = _poolName; // Store pool name
        startTime = _startTime;
        endTime = _endTime;
        candidates = _candidates;

        // Store allowed voters
        for (uint256 i = 0; i < _voters.length; i++) {
            isVoter[_voters[i]] = true;
        }
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    modifier votingActive() {
        require(block.timestamp >= startTime && block.timestamp <= endTime, "Voting inactive");
        _;
    }

    modifier onlyRegisteredVoter() {
        require(isVoter[msg.sender], "Not a registered voter");
        _;
    }

    function getPoolName() public view returns (string memory) {
        return poolName;
    }
    
    function getCandidates() external view returns (string[] memory) {
        return candidates;
    }


    function vote(string memory candidate) external votingActive onlyRegisteredVoter {
        require(!hasVoted[msg.sender], "Already voted");
        hasVoted[msg.sender] = true;
        votesReceived[candidate] += 1;

        emit VoteCasted(msg.sender, candidate);
    }

    function getVoteCount(string memory candidate) external view onlyAdmin returns (uint256) {
        return votesReceived[candidate];
    }

    function getAllVotes() external view onlyAdmin returns (string[] memory, uint256[] memory) {
        uint256[] memory results = new uint256[](candidates.length);
        for (uint256 i = 0; i < candidates.length; i++) {
            results[i] = votesReceived[candidates[i]];
        }
        return (candidates, results);
    }
}

contract VotingFactory {
    address public admin;
    VotingPool[] public votingPools;
    address[] public registeredVoters;

    event VotingPoolCreated(address indexed poolAddress, string poolName); // Updated Event

    constructor(address[] memory _voters) {
        admin = msg.sender;
        registeredVoters = _voters; // Store registered voters
    }

    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this");
        _;
    }

    function createVotingPool(
        string memory _poolName, // Accepting Pool Name
        uint256 _startTime,
        uint256 _endTime,
        string[] memory _candidates
    ) external onlyAdmin {
        VotingPool newPool = new VotingPool(
            msg.sender,
            _poolName, // Passing Pool Name
            _startTime,
            _endTime,
            _candidates,
            registeredVoters // Pass voter list to each pool
        );
        votingPools.push(newPool);

        emit VotingPoolCreated(address(newPool), _poolName); // Updated Event Emission
    }

    function getAllPools() external view returns (VotingPool[] memory) {
        return votingPools;
    }
}
