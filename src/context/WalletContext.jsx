import React, { useCallback, useMemo } from "react";
import { ethers } from "ethers";
const network = "rinkeby"; // use rinkeby testnet
const provider = ethers.getDefaultProvider(network, {
  etherscan: import.meta.env.VITE_ETHERSCAN_API,
});
import axios from "axios";

const WalletContext = React.createContext({});

const WalletProvider = ({ children }) => {
  const [wallet, setWallet] = React.useState(null);
  const [balance, setBalance] = React.useState(null);

  React.useEffect(() => {
    if (wallet) {
      //   provider.getBalance(wallet.address).then((balance) => {
      //   const balanceInEth = ethers.utils.formatEther(balance);
      //     setBalance(balanceInEth);
      //   });
      try {
        axios
          .get(
            `https://api-rinkeby.etherscan.io//api?module=account&action=balance&address=${
              wallet.address
            }&tag=latest&apikey=${import.meta.env.VITE_ETHERSCAN_API}`
          )
          .then((res) => {
            console.log("alo", res);
            const balanceInEth = ethers.utils.formatEther(res.data.result);
            setBalance(balanceInEth);
            localStorage.setItem("wallet", JSON.stringify(wallet));
          });
      } catch (e) {}
    }
  }, [wallet]);

  const sendEth = useCallback(
    async (to, amount) => {
      let sendWallet = new ethers.Wallet(wallet.privateKey, provider);

      let tx = {
        to,
        // Convert currency unit from ether to wei
        value: ethers.utils.parseEther(amount),
      };

      return sendWallet.sendTransaction(tx).then((txObj) => {
        return txObj;
      });
    },
    [wallet]
  );

  return (
    <WalletContext.Provider value={{ wallet, setWallet, balance, sendEth }}>
      {children}
    </WalletContext.Provider>
  );
};

export const useWallet = () => React.useContext(WalletContext);

export default WalletProvider;
