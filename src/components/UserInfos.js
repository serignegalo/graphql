"use client";

import React from "react";
import { FaCircle } from "react-icons/fa";

export default function UserInfos({
  infosUser,
  userTransaction,
  userTransactionInfos,
}) {
  const totalXP = Math.round((userTransaction + 70000) / 1000);

  //   let totalXp = 0
  //   userTransaction.nodes.forEach( el => {
  //     totalXp =+ el.id
  // });

  return (
    <>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, 300px)",
          gridRowGap: "30px",
          gridColumnGap: "30px",
          gridAutoRows: "230px 230px",
          padding: "2vw 2vw 0 2vw",
          justifyContent: "center",
        }}
      >
        <div className="flex first flex-col items-center text-center bg-gray-900 row-span-2">
          <p className="text-xs mt-6 mb-1">pseudo</p>
          <p className="text-3xl font-bold text-indigo-400 text-indigo-500">
            {infosUser.login}
          </p>
          <p className="text-s text-green-400 mt-2 mb-1">
            {" "}
            ID {userTransactionInfos.userId}
          </p>
          <div>
            <p className="text-xs text-indigo-400 mt-6 mb-1">first name</p>
            <p className="text-2xl">{infosUser.firstName}</p>
            <p className="bg-white h-[2px] rounded my-4 w-32 text-center"></p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xs text-indigo-400 mt-6 mb-1">last name</p>
            <p className="text-2xl uppercase">{infosUser.lastName}</p>
            <p className="bg-white h-[2px] rounded my-4 w-32 text-center"></p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-xs text-indigo-400 mt-6 mb-1">mail</p>
            <p className="text-lg">{infosUser.email}</p>
            <p className="bg-white h-[2px] rounded my-4 w-32 text-center"></p>
          </div>
        </div>
        <div className="flex flex-col items-center bg-gray-900 col-span-2 relative">
          <p className="text-8xl absolute left-8 top-4">
            <span className="text-indigo-500">{totalXP}</span>kb
          </p>
          <p className="bg-gray-600 h-[2px] absolute top-[110px] rounded my-4 w-[90%] text-center"></p>
        </div>
        <div className="flex items-center flex-col bg-gray-900">
          <div className="flex flex-row items-center justify-between mt-6 mb-1 w-[80%]">
            <p className="text-md text-gray-400">current level</p>
            <FaCircle className="text-green-400" />
          </div>
          <p className="text-9xl w-[80%] text-green-400">{infosUser.events[0].level}</p>
        </div>
      </div>
    </>
  );
}
