"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { MFA_LEVELS, WALLET_CONNECTORS, Web3Auth, Web3AuthOptions } from "@web3auth/modal";
import { CHAIN_NAMESPACES, IProvider, WEB3AUTH_NETWORK } from "@web3auth/base";
import { EthereumPrivateKeyProvider } from "@web3auth/ethereum-provider";
// Pas d'import d'ethers ici, on l'importera là où on en a besoin, 
// ou on peut stocker un ethersProvider dans le state si tu veux.

const chainConfig = {
    chainNamespace: CHAIN_NAMESPACES.EIP155,
    chainId: "0xaa36a7", // Sepolia
    rpcTarget: "https://rpc.ankr.com/eth_sepolia",
    displayName: "Ethereum Sepolia Testnet",
    blockExplorerUrl: "https://sepolia.etherscan.io",
    ticker: "ETH",
    tickerName: "Ethereum",
};

interface Web3AuthContextType {
    provider: IProvider | null;
    loggedIn: boolean;
    login: () => Promise<void>;
    logout: () => Promise<void>;
    userInfo: any | null;
}

const Web3AuthContext = createContext<Web3AuthContextType | null>(null);

export const Web3AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [web3auth, setWeb3auth] = useState<Web3Auth | null>(null);
    const [provider, setProvider] = useState<IProvider | null>(null);
    const [loggedIn, setLoggedIn] = useState(false);
    const [userInfo, setUserInfo] = useState<any | null>(null);

    useEffect(() => {
        const init = async () => {
            try {
                const privateKeyProvider = new EthereumPrivateKeyProvider({
                    config: { chainConfig },
                });

                const web3authOptions: Web3AuthOptions = {
                    clientId: process.env.NEXT_PUBLIC_WEB3AUTH_CLIENT_ID || "",
                    web3AuthNetwork: WEB3AUTH_NETWORK.SAPPHIRE_DEVNET,
                    modalConfig: {
                        connectors: {
                            [WALLET_CONNECTORS.AUTH]: {
                                label: 'auth',
                                loginMethods: {
                                    farcaster: {
                                        showOnModal: false,
                                    },
                                    twitch: {
                                        showOnModal: false,
                                    },
                                    kakao: {
                                        showOnModal: false,
                                    },
                                    github: {
                                        showOnModal: false,
                                    },
                                    reddit: {
                                        showOnModal: false,
                                    },
                                    wechat: {
                                        showOnModal: false,
                                    },
                                    sms_passwordless: {
                                        showOnModal: false,
                                        
                                    },
                                },
                                showOnModal: true,
                            },
                        },
                    },
                    mfaLevel: MFA_LEVELS.DEFAULT,
                    uiConfig: {
                        loginMethodsOrder: ["google", "facebook", "apple", "twitter", "discord"],
                    }
                }


                const web3authInstance = new Web3Auth(web3authOptions);

                setWeb3auth(web3authInstance);
                await web3authInstance.init();

                if (web3authInstance.connected) {
                    setProvider(web3authInstance.provider);
                    setLoggedIn(true);
                    setUserInfo(await web3authInstance.getUserInfo());
                }
            } catch (error) {
                console.error(error);
            }
        };

        init();
    }, []);

    const login = async () => {
        if (!web3auth) return;
        try {
            const web3authProvider = await web3auth.connect();
            setProvider(web3authProvider);
            setLoggedIn(true);
            setUserInfo(await web3auth.getUserInfo());
        } catch (error) {
            console.error(error);
        }
    };

    const logout = async () => {
        if (!web3auth) return;
        try {
            await web3auth.logout();
            setProvider(null);
            setLoggedIn(false);
            setUserInfo(null);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Web3AuthContext.Provider value={{ provider, loggedIn, login, logout, userInfo }}>
            {children}
        </Web3AuthContext.Provider>
    );
};

export const useWeb3Auth = () => {
    const context = useContext(Web3AuthContext);
    if (!context) throw new Error("useWeb3Auth must be used within a Web3AuthProvider");
    return context;
};