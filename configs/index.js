import UnboundTokenVestingABI from './abis/UnboundTokenVesting'

const VESTING_CONTRACT_ADDRESS = '0xC306f7319712D36577eB30A674c5B9Cf844Afe95'

const SUPPORTED_NETWORK_ID = 4

const NETWORK_NAME_MAP = {
  1: 'Ethereum Mainnet',
  4: 'Rinkeby',
}

const UNB_ADDRESS_MAP = {
  1: '0x8dB253a1943DdDf1AF9bcF8706ac9A0Ce939d922',
  4: '0xb62e7dA37b413E7312055E66261dcEF875Caf0Bb',
}

export const VESTING_CONTRACT_ADDRESS_MAP = {
  Strategic: '0x8134f2c2FD7682Ae0B2C6f5e569624A105836920',
  Venture: '0xEFF7Ce32346Ce6adD2F9E30DB21147343540d2F7',
  Seed: '0x5770b1A86aa16f8Ad8422C0ED4719A0fD4FD34F2',
  Private: '0x88002f982d823Db56FE050301f6c86e1255E3C17',
  'Friends &amp; Family': '0x1fc5348a14509F6C94D648d95dbEa1EC5eC8ba38',
}

export const VESTING_CATEGORIES = Object.keys(VESTING_CONTRACT_ADDRESS_MAP)

export {
  NETWORK_NAME_MAP,
  SUPPORTED_NETWORK_ID,
  UNB_ADDRESS_MAP,
  UnboundTokenVestingABI,
  VESTING_CONTRACT_ADDRESS,
}

export const INITIAL_START = 1639547820
// export const INITIAL_START = 1639562400 // 14 Dec 2021, 10:00 AM UTC
