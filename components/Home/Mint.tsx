import { ethers } from "ethers";
import React, { useEffect, useState } from "react";
import useDirectCall from "../../hooks/useTransation";
import { useAppSelector, useAppdispatch } from "../../hooks/redux";
import { ConnectButtonwagmi, ExampleButton } from "../Header/connect";
import { NFT_CONTRACT, NFT_PRICE } from "../../config";
import { useAccount, useSigner } from "wagmi";
import { fetchTotalMint } from "../../hooks/Totalsupply";
import { toast } from "react-hot-toast";
import { HiPlus,HiMinus } from "react-icons/hi";
export function Mint() {
  const dispatch = useAppdispatch();
  const [count,setcount] = useState<number>(1);
  const [price,setprice] = useState<number>()
  const { data: signer } = useSigner();
  const { address, isConnecting, isDisconnected, isConnected } = useAccount();
  const { BuyToken, loading, Checklimit } = useDirectCall(signer, NFT_CONTRACT);
  const supply = useAppSelector((state) => state.wallet.totalSupply);
  const [load, setload] = useState(false);
  useEffect(() => {
    setload(true);
  }, []);

  const Mintnft = async () => {
    if (!address) return toast.error("Connect your wallet");
      BuyToken("mint", "0",[count]);

  };
  useEffect(() => {
    dispatch(fetchTotalMint());
  }, [loading]);


  const incrementCount = () => {
    if (count < 3) {
      setcount(count + 1);
    }
  }
  
  const decrementCount = () => {
    if (count > 1) {
      setcount(count - 1);
    }
  }
  useEffect(()=>{
const price = count*Number(NFT_PRICE);
setprice(price);
  },[count])


  return (
    <div className="w-full flex flex-col justify-center  ">
       <div className='py-2 text-center'>
<h2 className='text-4xl text-white font-extrabold'>{supply}/30</h2>
<h2 className='text-lg uppercase py-2 text-white dark:text-white'>Price  {price} ETH</h2>
</div> 

<div className="flex flex-row justify-center gap-3 items-center py-2 mb-1">
  <div>
    <HiMinus onClick={()=>decrementCount()} className='bg-white p-1 rounded-full cursor-pointer' size={30}/>
  </div>
  <div className='bg-white rounded-2xl'>
  <h1 className="text-black px-8 py-2 ">{count}</h1>
  </div>
  <div>
    <HiPlus  onClick={()=>incrementCount()} className='bg-white p-1 rounded-full cursor-pointer' size={30}/>
  </div>

</div>

      {load ? (
        <div className="text-center">
          <button
            disabled={loading}
            onClick={() => Mintnft()}
            className="border  text-white font-bold py-2 px-10  tracking-[2px] font-Montserrat uppercase "
          >
            {loading ? "Minting.." : "Mint"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
