export default [
  {
    inputs: [
      {
        internalType: 'address',
        name: '_unboundToken',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_governance',
        type: 'address',
      },
    ],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_begin',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_end',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_cliff',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
    ],
    name: 'AddVesting',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_newRecipient',
        type: 'address',
      },
    ],
    name: 'ChangeRecipient',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_begin',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_end',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_cliff',
        type: 'uint256',
      },
      {
        indexed: false,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
    ],
    name: 'ChangeVesting',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'Claim',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
      {
        indexed: false,
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'ClaimInitial',
    type: 'event',
  },
  {
    inputs: [],
    name: 'acceptGovernance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: 'address',
            name: 'recipient',
            type: 'address',
          },
          {
            internalType: 'uint256',
            name: 'amount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'initialAmount',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'begin',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'end',
            type: 'uint256',
          },
          {
            internalType: 'uint256',
            name: 'cliff',
            type: 'uint256',
          },
        ],
        internalType: 'struct UnboundTokenVesting.AddVestingParams[]',
        name: 'params',
        type: 'tuple[]',
      },
    ],
    name: 'addVesting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_governance',
        type: 'address',
      },
    ],
    name: 'changeGovernance',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_current',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_new',
        type: 'address',
      },
    ],
    name: 'changeRecipient',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_begin',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_end',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_cliff',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: '_lastUpdate',
        type: 'uint256',
      },
      {
        internalType: 'address',
        name: '_recipient',
        type: 'address',
      },
    ],
    name: 'changeVesting',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claim',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claimInitial',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'governance',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'pendingGovernance',
    outputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '_token',
        type: 'address',
      },
      {
        internalType: 'address',
        name: '_to',
        type: 'address',
      },
      {
        internalType: 'uint256',
        name: '_amount',
        type: 'uint256',
      },
    ],
    name: 'remove',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unboundToken',
    outputs: [
      {
        internalType: 'contract IUnboundToken',
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        internalType: 'address',
        name: '',
        type: 'address',
      },
    ],
    name: 'vestings',
    outputs: [
      {
        internalType: 'uint256',
        name: 'amount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'initialAmount',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'begin',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'end',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'cliff',
        type: 'uint256',
      },
      {
        internalType: 'uint256',
        name: 'lastUpdate',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
]
