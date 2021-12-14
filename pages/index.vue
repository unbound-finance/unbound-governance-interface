<template>
  <section>
    <!-- Change Network Modal -->
    <Modal v-if="address" v-model="showNetworkError" :persistent="true">
      <div class="flex flex-col space-y-4 p-6 backgroundColor">
        <div class="flex justify-between items-center">
          <p class="font-medium dark:text-white">Change Your Network</p>
        </div>

        <div>
          <p class="dark:text-gray-200 text-sm">
            Please connect your wallet to
            {{ NETWORK_NAME_MAP[SUPPORTED_NETWORK_ID] }} Network
          </p>
        </div>
      </div>
    </Modal>

    <!-- Change Network Modal -->
    <Modal v-model="isTransactionSuccessModalActive">
      <div class="flex flex-col space-y-4 p-6 backgroundColor">
        <div class="flex justify-between items-center">
          <p class="font-medium dark:text-white">Transaction Successful</p>
        </div>

        <div>
          <a
            class="dark:text-gray-200 text-sm"
            :href="getEtherscanLink(hash)"
            target="_blank"
            >View on Etherscan ↗</a
          >
        </div>
      </div>
    </Modal>
    <Modal v-model="isTransactionFailedModalActive">
      <div class="flex flex-col space-y-4 p-6 backgroundColor">
        <div class="flex flex-col justify-between items-center">
          <p class="font-medium dark:text-white">Transaction unsuccessful</p>
          <!-- <code
            v-if="error"
            class="break-all w-full bg-black text-xs text-white rounded px-3 py-1 mt-3"
          >
            {{ error.message.split('message":')[1].split('",')[0].slice(1) }}
          </code> -->
        </div>
      </div>
    </Modal>
    <nav
      class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800"
    >
      <div
        class="container mx-auto flex flex-wrap items-center justify-between"
      >
        <a href="#" class="flex">
          <span
            class="self-center text-lg font-semibold whitespace-nowrap text-gray-600"
            >Unbound Token Vesting</span
          >
        </a>

        <!-- <div class="flex md:order-2 space-x-3 items-center">
          <button
            v-if="address"
            class="text-white focus:ring-primary bg-primary hover:!bg-primary-light font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
          >
            {{ address.slice(0, 5) }}... {{ address.slice(-4) }}
          </button>
          <button
            v-else
            type="button"
            class="text-white focus:ring-primary bg-primary hover:!bg-primary-light font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
            @click="connectWallet()"
          >
            Connect Wallet
          </button>
        </div> -->
      </div>
    </nav>
    <div class="container mx-auto my-20">
      <div
        class="rounded-2xl mx-auto w-full max-w-md overflow-hidden shadow-lg bg-white"
      >
        <div class="p-10">
          <div class="space-y-6">
            <template>
              <div class="mx-auto w-full max-w-md">
                <div class="rounded overflow-hidden">
                  <div class="flex flex-col items-center justify-center">
                    <div>
                      <img
                        src="~/assets/images/logo.svg"
                        class="animate-coin w-24 h-24 object-contain my-6"
                      />
                    </div>

                    <div class="mx-auto max-w-md mt-3">
                      <div class="flex flex-col px-3 rounded mt-3 bg-white">
                        <p
                          class="text-xs text-gray-400 flex items-center space-x-2"
                        >
                          <span class="uppercase"
                            >Initial claim WILL BEGIN IN</span
                          >
                        </p>
                        <p
                          class="text-2xl font-light text-gray-700 mt-2 tracking-widest font-mono"
                        >
                          {{ initialCountDown }}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div>

      <!-- <div
        class="rounded-2xl mx-auto w-full max-w-md overflow-hidden shadow-lg bg-white"
      >
        <div class="p-10">
          <div class="space-y-6">
            <div v-if="initialStarts <= 0">
              <label
                for="vestingCategory"
                class="uppercase text-gray-500 text-xs font-medium mb-3 block"
              >
                Choose vesting Category
              </label>
              <select
                id="vestingCategory"
                v-model="vestingAddress"
                :disabled="loading"
                class="border-2 px-3 text-sm text-gray-500 py-2 w-full rounded-lg outline-none focus:border-primary"
              >
                <option
                  v-for="([name, vAddress], i) in vestingCategory"
                  :key="name"
                  :selected="i == 0"
                  :value="vAddress"
                  :innerHtml.prop="name"
                ></option>
              </select>
            </div>
            <div v-if="loading">loading...</div>

            <template v-else-if="vestingStarts <= 0">
              <div>
                <label
                  class="uppercase text-gray-500 text-xs font-medium mb-3 block"
                >
                  Your Claimable UNB
                </label>
                <div
                  class="font-bold text-3xl mb-2 text-gray-700 flex space-x-2"
                >
                  <span
                    >{{ isNaN(pendingRewards) ? '-' : pendingRewards }}
                  </span>
                  <img src="@/assets/images/logo.svg" width="24" />
                </div>
              </div>

              <table
                class="bg-gray-100 rounded-xl text-[#828282] p-3 text-left w-full text-xs"
              >
                <tr>
                  <th class="font-bold px-3 pt-3">Total UNB</th>
                  <td class="text-[#444444] text-right px-3 pt-3">
                    {{ Number(total).toFixed(2) || '-' }}
                    $UNB
                  </td>
                </tr>
                <tr>
                  <th class="font-bold px-3 pt-3">Total Pending UNB</th>
                  <td class="text-[#444444] text-right px-3 pt-3">
                    {{ totalPendingReward.toFixed(2) || '-' }}
                    $UNB
                  </td>
                </tr>
                <tr>
                  <th class="font-bold px-3 pt-3 pb-3">Claimed Till Now</th>
                  <td class="text-[#444444] text-right px-3 pt-3 pb-3">
                    {{
                      (Number(total) - Number(totalPendingReward)).toFixed(2) ||
                      '-'
                    }}
                    $UNB
                  </td>
                </tr>
                <tr>
                  <th class="font-bold px-3 pb-3">Vesting Ends On:</th>
                  <td class="text-[#444444] text-right px-3 pb-3">
                    {{ end }}
                  </td>
                </tr>
              </table>
              <div
                v-if="initialAmount"
                class="flex justify-between items-center"
              >
                <span class="uppercase text-gray-500 text-xs font-medium">
                  Claim initial $UNB
                </span>
                <button
                  type="button"
                  class="transition delay-150 text-primary border-2 border-opacity-25 border-primary font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                  @click="claimInitialRewards"
                >
                  Claim {{ initialAmount.toFixed(2) }} $UNB
                </button>
              </div>
              <button
                v-if="address"
                type="button"
                :disabled="
                  !vestingAddress ||
                  isNaN(pendingRewards) ||
                  pendingRewards <= 0
                "
                class="w-full transition delay-150 text-white font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                :class="[
                  !vestingAddress ||
                  isNaN(pendingRewards) ||
                  pendingRewards <= 0
                    ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                    : 'bg-primary :hover:bg-primary-light',
                ]"
                @click="claim"
              >
                {{
                  // eslint-disable-next-line vue/no-parsing-error
                  isNaN(pendingRewards) || pendingRewards <= 0
                    ? 'Not eligible'
                    : 'Claim $UNB'
                }}
              </button>
              <button
                v-else
                type="button"
                class="text-white w-full focus:ring-primary bg-primary hover:!bg-primary-light font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                @click="connectWallet()"
              >
                Connect Wallet
              </button>
            </template>
            <template v-else>
              <div class="mx-auto w-full max-w-md">
                <div
                  class="flex flex-col border px-3 rounded mb-5 py-3 bg-white"
                >
                  <p class="text-xs text-gray-400 flex items-center space-x-2">
                    <span>VESTING WILL BEGIN IN</span>
                    <img
                      src="@/assets/images/ic_info.svg"
                      width="12"
                      title="Including cliff period."
                    />
                  </p>
                  <p>{{ vestingCountDown }}</p>
                </div>
                <div class="rounded overflow-hidden">
                  <div class="flex flex-col items-center justify-center">
                    <div>
                      <img
                        src="~/assets/images/logo.svg"
                        class="animate-coin w-24 h-24 object-contain my-6"
                      />
                    </div>
                    <div
                      v-if="initialStarts <= 0"
                      class="font-bold text-3xl mb-2 text-gray-700 flex space-x-2"
                    >
                      <span
                        >{{
                          isNaN(initialAmount) ? '-' : initialAmount.toFixed(2)
                        }}
                      </span>
                      <span>UNB</span>
                    </div>

                    <table
                      v-if="initialStarts <= 0"
                      class="bg-gray-100 rounded-xl text-[#828282] mt-3 p-3 text-left w-full text-xs"
                    >
                      <tr>
                        <th class="font-bold px-3 pt-3">Total UNB</th>
                        <td class="text-[#444444] text-right px-3 pt-3">
                          {{ Number(total).toFixed(2) || '-' }}
                          $UNB
                        </td>
                      </tr>
                      <tr>
                        <th class="font-bold px-3 pt-3">Total Pending UNB</th>
                        <td class="text-[#444444] text-right px-3 pt-3">
                          {{ totalPendingReward.toFixed(2) || '-' }}
                          $UNB
                        </td>
                      </tr>
                      <tr>
                        <th class="font-bold px-3 pt-3">Claimed Till Now</th>
                        <td class="text-[#444444] text-right px-3 pt-3">
                          {{
                            (
                              Number(total) - Number(totalPendingReward)
                            ).toFixed(2) || '-'
                          }}
                          $UNB
                        </td>
                      </tr>
                      <tr>
                        <th class="font-bold px-3 pt-3 pb-3">UNB Address</th>
                        <td class="text-[#444444] text-right px-3 pt-3 pb-3">
                          {{
                            shortenAddress(
                              UNB_ADDRESS_MAP[SUPPORTED_NETWORK_ID]
                            )
                          }}
                        </td>
                      </tr>
                    </table>

                    <div v-if="initialStarts > 0" class="mx-auto max-w-md mt-3">
                      <div class="flex flex-col px-3 rounded mt-3 bg-white">
                        <p
                          class="text-xs text-gray-400 flex items-center space-x-2"
                        >
                          <span class="uppercase"
                            >Initial claim WILL BEGIN IN</span
                          >
                        </p>
                        <p
                          class="text-2xl font-light text-gray-700 mt-2 tracking-widest font-mono"
                        >
                          {{ initialCountDown }}
                        </p>
                      </div>
                    </div>
                    <div v-else class="w-full mt-6">
                      <span class="text-xs text-center text-gray-400"
                        >Claim your initial $UNB</span
                      >
                      <div class="w-full mt-2">
                        <button
                          v-if="address"
                          type="button"
                          :disabled="isNaN(initialAmount) || initialAmount <= 0"
                          class="w-full transition delay-150 text-white font-medium rounded text-sm px-5 py-3 text-center mr-3 md:mr-0"
                          :class="[
                            isNaN(initialAmount) || initialAmount <= 0
                              ? 'cursor-not-allowed bg-gray-200 text-gray-400'
                              : 'bg-primary :hover:bg-primary-light',
                          ]"
                          @click="claimInitialRewards"
                        >
                          {{
                            // eslint-disable-next-line vue/no-parsing-error
                            isNaN(initialAmount) || initialAmount <= 0
                              ? 'Not eligible'
                              : 'Claim $UNB'
                          }}
                        </button>
                        <button
                          v-else
                          type="button"
                          class="text-white w-full focus:ring-primary bg-primary hover:!bg-primary-light font-medium rounded text-sm px-5 py-2.5 text-center mr-3 md:mr-0"
                          @click="connectWallet"
                        >
                          Connect Wallet
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
          </div>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script>
import { providers, Contract } from 'ethers'
import detectEthereumProvider from '@metamask/detect-provider'
import dayjs from 'dayjs'
// components
import Modal from '../components/Modal.vue'

// configs
import {
  INITIAL_START,
  NETWORK_NAME_MAP,
  UNB_ADDRESS_MAP,
  SUPPORTED_NETWORK_ID,
  UnboundTokenVestingABI,
  VESTING_CONTRACT_ADDRESS_MAP,
} from '../configs'

function countdown(s) {
  const d = Math.floor(s / (3600 * 24))

  s -= d * 3600 * 24

  const h = Math.floor(s / 3600)

  s -= h * 3600

  const m = Math.floor(s / 60)

  s -= Math.floor(m * 60)

  const tmp = []

  d && tmp.push(d + 'd')
  ;(d || h) && tmp.push(h + 'h')
  ;(d || h || m) && tmp.push(m + 'm')

  tmp.push(s + 's')

  return tmp.join(' ')
}

export default {
  components: {
    Modal,
  },
  data() {
    return {
      NETWORK_NAME_MAP,
      UNB_ADDRESS_MAP,
      SUPPORTED_NETWORK_ID,
      vestingCategory: Object.entries(VESTING_CONTRACT_ADDRESS_MAP),
      address: '',
      vestingAddress: VESTING_CONTRACT_ADDRESS_MAP.Strategic,
      network: '',
      networkName: '',
      showNetworkError: '',
      pendingRewards: '0',
      totalPendingReward: 0,
      end: 0,
      cliff: 0,
      total: 0,
      initialAmount: 0,
      hash: '',
      error: null,
      isTransactionSuccessModalActive: false,
      isTransactionFailedModalActive: false,
      vestingStarts: 0,
      initialStarts: 0,
      loading: true,
    }
  },
  computed: {
    vestingCountDown() {
      return countdown(this.vestingStarts)
    },
    initialCountDown() {
      return countdown(this.initialStarts)
    },
  },
  watch: {
    vestingAddress: {
      immediate: true,
      handler() {
        this.loading = true
        this.getPendingRewards().finally(() => {
          this.loading = false
        })
      },
    },
  },
  mounted() {
    if (this.initialTimer) clearInterval(this.initialTimer)
    this.initialStarts = INITIAL_START - Math.floor(Date.now() / 1000)

    this.initialTimer = setInterval(() => {
      if (this.initialStarts === 0) return clearInterval(this.initialTimer)

      this.initialStarts -= 1
    }, 1000)
    this.checkForWallet()
    this.getAddress()
    this.getNetwork()
    window.ethereum.on('accountsChanged', function (accounts) {
      window.location.reload()
    })

    window.ethereum.on('chainChanged', function (accounts) {
      window.location.reload()
    })
  },
  methods: {
    shortenAddress(address, chars = 6) {
      return `${address.substring(0, chars + 2)}...${address.substring(
        42 - chars
      )}`
    },
    getEtherscanLink(hash, type = 'tx') {
      return `https://${
        this.network.toString() === '1' ? '' : `${this.networkName}.`
      }etherscan.io/${type}/${hash}`
    },
    connectWallet() {
      window.ethereum.request({ method: 'eth_requestAccounts' })
    },
    async getPendingRewards() {
      const provider = new providers.Web3Provider(window.ethereum, 'any')
      const signer = provider.getSigner()

      const vestingContract = new Contract(
        this.vestingAddress,
        UnboundTokenVestingABI,
        signer
      )

      const vesting = await vestingContract.vestings(signer.getAddress())

      const amount = vesting.amount.toString()
      const initialAmount = vesting.initialAmount.toString()
      this.begin = vesting.begin.toString()
      this.cliff = vesting.cliff.toString()

      const end = vesting.end.toString()
      const until = Math.floor(Date.now() / 1000)

      // const cliff = await res.cliff.toString()
      // const initialAmount = await res.initialAmount.toString()
      const lastUpdate = vesting.lastUpdate.toString()
      const numerator = amount * (until - lastUpdate)
      const denominator = end - this.begin
      this.pendingRewards = (numerator / denominator / 1e18).toFixed(2)

      const rewardsPerSecond = amount / (end - this.begin)
      const diff = until - this.begin

      this.totalPendingReward =
        (amount - rewardsPerSecond * diff + numerator / denominator) / 1e18

      this.end =
        end === '0' ? '-' : dayjs.unix(end).format('MMM DD, YYYY - HH:mm')
      this.initialAmount = initialAmount / 1e18
      this.total = amount / 1e18

      if (vesting.amount === 0) {
        this.pendingRewards = 0
      }
      this.startTimers()
    },
    startTimers() {
      this.vestingStarts = +this.cliff - Math.floor(Date.now() / 1000)
      if (this.vestingTimer) clearInterval(this.vestingTimer)

      this.vestingTimer = setInterval(() => {
        if (this.vestingStarts === 0) {
          return clearInterval(this.vestingTimer)
        }
        this.vestingStarts -= 1
      }, 1000)
    },
    async claimInitialRewards() {
      try {
        const provider = new providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()

        const vestingContract = new Contract(
          this.vestingAddress,
          UnboundTokenVestingABI,
          signer
        )

        const res = await vestingContract.claimInitial()
        this.hash = res.hash

        this.isTransactionSuccessModalActive = true
        res.wait(1).then(async () => {
          await this.getPendingRewards()
        })
      } catch (error) {
        this.isTransactionFailedModalActive = true
        this.error = error
        console.log(error)
      }
    },

    async claim() {
      try {
        const provider = new providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()

        const vestingContract = new Contract(
          this.vestingAddress,
          UnboundTokenVestingABI,
          signer
        )

        const res = await vestingContract.claim()
        this.hash = res.hash

        this.isTransactionSuccessModalActive = true

        res.wait(1).then(async () => {
          await this.getPendingRewards()
        })
      } catch (error) {
        this.isTransactionFailedModalActive = true
        console.log(error)
        this.error = error
      }
    },

    async getAddress() {
      const provider = new providers.Web3Provider(window.ethereum, 'any')
      await provider.send('eth_requestAccounts', [])
      this.address = await provider.getSigner().getAddress()
    },

    async isWalletConnected() {
      const provider = new providers.Web3Provider(window.ethereum, 'any')
      const accounts = await provider.listAccounts()
      return accounts.length > 0
    },

    async checkForWallet() {
      const provider = await detectEthereumProvider()
      if (!provider) {
        alert('Please install Web3 wallet')
      }
    },
    async getNetwork() {
      const provider = new providers.Web3Provider(window.ethereum, 'any')
      this.network = (await provider.getNetwork()).chainId
      this.networkName = (await provider.getNetwork()).name
      if (SUPPORTED_NETWORK_ID !== this.network) {
        this.showNetworkError = true
      } else {
        this.showNetworkError = false
      }
    },
  },
}
</script>

<style>
.animate-coin {
  animation: rotate3d 4s linear infinite;
}

@keyframes rotate3d {
  0% {
    transform: perspective(1000px) rotateY(360deg);
  }

  100% {
    transform: perspective(1000px) rotateY(0deg);
  }
}
</style>
