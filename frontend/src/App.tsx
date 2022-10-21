import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

import { Address, Wallet } from "fuels";
import {NFTAbi__factory} from "./contracts/nft";
import {NftMarketplaceAbi__factory} from "./contracts/marketplace";
import { log } from 'console';

function App() {
  const [name, setName] = useState("");
  const [symbol, setSymbol] = useState("");
  const [image, setImage] = useState("");
  const [description, setDescription] = useState<any[]>([]);
  const [allDescription, setAllDescription] = useState<any[]>([]);
  const [nftData, setNftData] = useState<string[]>([]);

  type TokenMetaData = {
    name: string;
    symbol: string;
    token_uri: string;
}

const md1: TokenMetaData = {
  name: "Booty Demons #1",
  symbol: "BD #1",
  token_uri: "QmYy65NTTXqM9PFwvs9rBBaYbG8xbHaaZDGN9QyRbkEERo",
}

const md2: TokenMetaData = {
  name: "Booty Demons #2",
  symbol: "BD #2",
  token_uri: "Qmbi5ennNe3bsvGmqREfMhyRCsiPmNjP8RfmtBDMf56T4G",
}

const mintData: any = [md1, md2];

const admin = "0x6b63804cfbf9856e68e5b6e7aef238dc8311ec55bec04df774003a2c96e0418e";
const wallet = new Wallet(
  "0xde97d8624a438121b86a1956544bd72ed68cd69f2c99555b08b1e8c51ffd511c"
  );
  
  const contractId =
  "0x159c27dcf780b6aa2be24fb257456f799f84c761664a269c5e180569ad50eafb";
  
  const NFTContractId =
  "0x3245f0b770312e4463024cec93ae0944ec876c3a6adc93a4402f18fa4f6d12a6";

    const marketplaceContract = NftMarketplaceAbi__factory.connect(
      contractId,
      wallet
    );

    const NFTContract = NFTAbi__factory.connect(
      NFTContractId,
      wallet
    );

  const callConstructorResp = async () => {
    const consttructor = await NFTContract.functions.constructor(true, { Address: { value: admin } }, 100).call();
    console.log("some1", consttructor);
    
  };

  const mint = async () => {
    // const NFTAdmin = await NFTContract.functions.admin().get();
    // console.log("NFTAdmin", NFTAdmin);
    const mintedNFT = await NFTContract.functions.mint(mintData.length, {Address: { value: admin}}, mintData).call();
    console.log("mintedNFT", mintedNFT);
     
  };

  const getNFT = async () => {
    const base = "https://ipfs.io/ipfs/";
    const metaData = await NFTContract.functions.meta_data(1).get();
    setName(metaData.value.name);
    setSymbol(metaData.value.symbol);
    const uri = base + metaData.value.token_uri;
    console.log(metaData);
    
    fetch(uri)
      .then(res => res.json())
      .then(res => {
        const url = base + res.image.split("//")[1];
        console.log("uri", res.attributes);
        console.log("type", typeof(res.attributes));
        setDescription(res.attributes);
        setImage(url);
        
    });
    console.log(metaData.value);
  };


const all_meta_data = async () => {
    const base = "https://ipfs.io/ipfs/";
    let data: any = [];
    const metaData1 = await (await NFTContract.functions.all_meta_data().get()).value;
    console.log(metaData1);
    for (let index = 0; index < metaData1.length; index++) {
      const metaData = metaData1[index];
      setName(metaData.name);
      setSymbol(metaData.symbol);
      const uri = base + metaData.token_uri;
      
      fetch(uri)
        .then(res => res.json())
        .then(res => {
          const url = base + res.image.split("//")[1];
          // console.log("uri", url);
          // setDescription(res.attributes);
          setImage(url);
          let nftObj = {
            name: metaData.name,
            symbol: metaData.symbol,
            image: url,
          }
          data.push(nftObj);
          setNftData([...data]); 
        });
      }
    console.log("data", data);
  };

  const owner_of = async () => {
    const owner_of = await NFTContract.functions.owner_of(0).get();
    console.log("owner_of", owner_of);
  };

  const approveNFT = async () => {
    const approve_nft = await NFTContract.functions.approve({ContractId : { value: contractId }}, 0).call();
    console.log("approve_nft", approve_nft);
  };

  const transferFrom = async () => {
    const transfer_from = await NFTContract.functions.transfer_from({ Address: { value: admin } }, {ContractId : { value: contractId }}, 0).call();
    console.log("transfer_from", transfer_from);
  };

  const transferFromOwner = async () => {
    const transfer_from_owner = await NFTContract.functions.transfer_from({ContractId : { value: contractId }}, { Address: { value: admin } }, 0).call();
    console.log("transfer_from_owner", transfer_from_owner);
  };

  const listNFT = async () => {
    // const transfer_from = await NFTContract.functions.transfer_from({ Address: { value: admin } }, {ContractId : { value: contractId }}, 0).call();
    // console.log("transfer_from", transfer_from);
    const list_nft = await marketplaceContract.functions.list_nft({ value: NFTContractId }, 1, 12).call();
    console.log("list_nft", list_nft);
  };


  return (
    <div className="App">
      <div>
        <button
          onClick={callConstructorResp}
        >
          callConstructorResp
        </button>
      </div>
      <div>
        <button
          onClick={mint}
        >
          mint
        </button>
      <div>
        <button
          onClick={getNFT}
          >
          getNFT
        </button>
        { name ? (
           <>
          <div>
            name: {name}, 
            <br></br>
            symbol: {symbol},
            <br></br>
            <img
              height={100}
              width={100}
            src={image} alt="" />
            {/* description: {description}, */}
            { description.map((data) => (
              <div key={data.trait_type}>
                name : {data.trait_type},  
                value : {data.value}
              </div>
            ))}
            
          </div>
           </>
        ): (
          <></>
        )}
        </div>
      </div>
      <button
          onClick={all_meta_data}
          >
          all_meta_data
        </button>
      <div>
        <button
          onClick={owner_of}
        >
          owner_of
        </button>
      </div>
      <div>
        <button
          onClick={approveNFT}
        >
          approveNFT
        </button>
      </div>
      <div>
        <button
          onClick={listNFT}
        >
          listNFT
        </button>
      </div>
    </div>
  );
}

export default App;
