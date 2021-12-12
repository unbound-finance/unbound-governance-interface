<template>
  <section>
    <!-- Change Network Modal -->
    <Modal :value="showNetworkError" :persistent="true">
      <template>
        <div class="flex flex-col space-y-4 p-6 backgroundColor">
          <div class="flex justify-between items-center">
            <p class="font-medium dark:text-white">Change Your Network</p>
          </div>

          <div>
            <p class="dark:text-gray-200 text-sm">
              Please connect your wallet to Rinkeby Network
            </p>
          </div>
        </div>
      </template>
    </Modal>

    <!-- Change Network Modal -->
    <Modal :value="isTransactionSuccessModalActive" :persistent="true">
      <template>
        <div class="flex flex-col space-y-4 p-6 backgroundColor">
          <div class="flex justify-between items-center">
            <p class="font-medium dark:text-white">Transaction Successful</p>
          </div>

          <div>
            <p class="dark:text-gray-200 text-sm">Please check Etherscan</p>
          </div>
        </div>
      </template>
    </Modal>
    <nav
      class="bg-white border-gray-200 px- bg-white border-gray-200 px-2 sm:px-4 py-2.5 rounded dark:bg-gray-800"
    >
      <div
        class="container mx-auto flex flex-wrap items-center justify-between"
      >
        <a href="#" class="flex">
          <span
            class="self-center text-lg font-semibold whitespace-nowrap dark:text-white"
            >Unbound Token Vesting</span
          >
        </a>
        <div class="flex md:order-2">
          <div
            v-if="address"
            class="text-white button focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            {{ address.slice(0, 5) }}... {{ address.slice(-4) }}
          </div>
          <button
            v-else
            type="button"
            class="text-white button focus:ring-4 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="connectWallet()"
          >
            Connect Wallet
          </button>
        </div>
      </div>
    </nav>
    <div>
      <div class="flex justify-center items-center">
        <div
          class="lg:w-1/4 md:w-2/4 sm:w-full rounded-2xl overflow-hidden shadow-lg bg-white mt-20"
        >
          <div class="px-10 py-10">
            <div class="flex flex-col space-y-10">
              <div class="text-center text-xl text-gray-500">
                Your Claimable Rewards
              </div>
              <div class="font-bold text-4xl mb-2 text-center">
                {{ pendingRewards }} UNB
              </div>

              <div>
                <div class="text-center text-sm text-gray-500">
                  <span class="font-bold">Ending On:</span> {{ end }}
                </div>

                <!-- <div class="text-center text-sm text-gray-500">
                  <span class="font-bold">Total Rewards Pending: </span>
                  {{ total }}
                </div> -->
              </div>
              <!-- <p class="text-gray-700 text-base">Lorem ipsum dolor sit amet.</p> -->

              <button
                type="button"
                class="w-full transition delay-150 text-white button font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-3 md:mr-0 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                @click="claim"
              >
                Claim
              </button>
            </div>
          </div>
        </div>
      </div>
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
  SUPPORTED_NETWORK_ID,
  UnboundTokenVestingABI,
  VESTING_CONTRACT_ADDRESS,
} from '../configs'

export default {
  components: {
    Modal,
  },
  data() {
    return {
      address: '',
      network: '',
      showNetworkError: '',
      pendingRewards: '0',
      end: 0,
      total: 0,
      isTransactionSuccessModalActive: false,
    }
  },
  mounted() {
    this.checkForWallet()
    this.getAddress()
    this.getNetwork()
    this.getPendingRewards()
  },
  methods: {
    connectWallet() {
      window.ethereum.request({ method: 'eth_requestAccounts' })
    },

    async getPendingRewards() {
      const provider = new providers.Web3Provider(window.ethereum, 'any')
      const signer = provider.getSigner()

      const vestingContract = await new Contract(
        VESTING_CONTRACT_ADDRESS,
        UnboundTokenVestingABI,
        signer
      )

      const vesting = await vestingContract.vestings(signer.getAddress())

      const amount = await vesting.amount.toString()
      const end = await vesting.end.toString()
      const untill = Math.floor(Date.now() / 1000)
      const begin = await vesting.begin.toString()
      // const cliff = await res.cliff.toString()
      // const initialAmount = await res.initialAmount.toString()
      const lastUpdate = await vesting.lastUpdate.toString()
      const numarator = (await amount) * (untill - lastUpdate)
      const denominator = (await end) - begin
      this.pendingRewards = (numarator / denominator / 1e18).toFixed(2)

      this.end = dayjs.unix(end)
      this.total = amount / 1e18

      if (vesting.amount === 0) {
        this.pendingRewards = 0
      }
    },

    async claim() {
      try {
        const provider = new providers.Web3Provider(window.ethereum, 'any')
        const signer = provider.getSigner()

        const vestingContract = await new Contract(
          VESTING_CONTRACT_ADDRESS,
          UnboundTokenVestingABI,
          signer
        )

        vestingContract.claim()

        this.isTransactionSuccessModalActive = true
      } catch (error) {
        this.isTransactionSuccessModalActive = false
        console.log(error)
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
      if (SUPPORTED_NETWORK_ID !== this.network) {
        this.showNetworkError = true
      } else {
        this.showNetworkError = false
      }
    },
  },
}

window.ethereum.on('accountsChanged', function (accounts) {
  window.location.reload()
})

window.ethereum.on('chainChanged', function (accounts) {
  window.location.reload()
})
</script>

<style>
.button {
  background: #059991;
}

.button:hover {
  background: #36adab;
}
</style>
