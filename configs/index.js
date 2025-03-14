import UnboundTokenVestingABI from './abis/UnboundTokenVesting'

const VESTING_CONTRACT_ADDRESS = '0xC306f7319712D36577eB30A674c5B9Cf844Afe95'

const SUPPORTED_NETWORK_ID = 1

const NETWORK_NAME_MAP = {
  1: 'Ethereum Mainnet',
  4: 'Rinkeby',
}

const UNB_ADDRESS_MAP = {
  1: '0x8dB253a1943DdDf1AF9bcF8706ac9A0Ce939d922',
  4: '0xb62e7dA37b413E7312055E66261dcEF875Caf0Bb',
}

export const VESTING_CONTRACT_ADDRESS_MAP = {
  Early: '0x3B4e5Be9C380bA7f0E8E88f98e9928d3e6Df96D0',
  Strategic: '0x107678C8EF64E8e8DAb40bFCcA6f8a1ebC82D99a',
  Venture: '0x439f729e66022d1BA592b1E04Ad0804eB5Dfca35',
  Institution: '0xfB1dE6E1021a1E503f31aD42BD26891e68bb29c8',
  Seed: '0x80f666E786F3Bc862a0D7d762D3f7C7193a7681F',
  Private: '0x67b62a4427a6f1111b94193F96f3a81122f1FD5f',
  'Friends &amp; Family': '0x0d3891F52EAB019612FE5DF32E278b81D4af2DFA',
}

export const VESTING_CATEGORIES = Object.keys(VESTING_CONTRACT_ADDRESS_MAP)

export {
  NETWORK_NAME_MAP,
  SUPPORTED_NETWORK_ID,
  UNB_ADDRESS_MAP,
  UnboundTokenVestingABI,
  VESTING_CONTRACT_ADDRESS,
}

// export const INITIAL_START = 1639551420
export const INITIAL_START = 1639562400 // 14 Dec 2021, 10:00 AM UTC
