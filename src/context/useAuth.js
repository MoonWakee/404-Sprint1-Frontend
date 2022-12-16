import React, {
  createContext,
  useMemo,
  useState,
  useCallback,
  useContext,
  useEffect,
} from "react";

const AuthContext = createContext();
const useAuth = () => {
  const context = useContext(AuthContext);
  // if `undefined`, throw an error
  if (context === undefined) {
    throw new Error("useUserContext was used outside of its Provider");
  }
  return context;
};

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState(null);

  const handleLogout = useCallback(async () => {
    setIsLoggedIn(false);
    setUserName(null);
  }, []);

  const handleLogin = useCallback(async () => {
    // A Web3Provider wraps a standard Web3 provider, which is
    // what MetaMask injects as window.ethereum into each page
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);

    // The MetaMask plugin also allows signing transactions to
    // send ether and pay to change state within the blockchain.
    // For this, you need the account signer…
    const signer = provider.getSigner();
    const userName = await signer.getAddress();
    setUserName(userName);
    setIsLoggedIn(true);
  }, [isLoggedIn]);

  const getUserName = useCallback(() => {
    if (!userName) return;
    return `${userName.slice(0, 6)}...${userName.slice(
      userName.length - 4,
      userName.length,
    )}`;
  }, [userName]);

  const memoedValue = useMemo(
    () => ({
      userName,
      isLoggedIn,
      getUserName,
      handleLogin,
      handleLogout,
    }),
    [
      userName,
      isLoggedIn,
      getUserName,
      handleLogin,
      handleLogout,
    ],
  );
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  );
};
export { AuthProvider, useAuth };
