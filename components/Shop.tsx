"use client";

import React from "react";
import { ShopItem, SHOP_ITEMS } from "../data/gameData";

interface ShopProps {
  points: number;
  ownedItems: string[];
  onBuy: (item: ShopItem) => void;
  onEquip: (item: ShopItem) => void;
  equippedAvatar: string;
}

export default function Shop({
  points,
  ownedItems,
  onBuy,
  onEquip,
  equippedAvatar,
}: ShopProps) {
  return (
    <div className="flex flex-col h-full bg-transparent rounded-[2rem] overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-white/20 flex justify-between items-center sticky top-0 z-10 glass backdrop-blur-xl">
        <h2 className="text-xl font-bold text-pink-600 flex items-center gap-2 halo-text">
          🛍️ Shop
        </h2>
        <div className="px-3 py-1 bg-white/50 rounded-full text-yellow-700 font-bold border border-white shadow-sm text-sm">
          💰 {points}
        </div>
      </div>

      {/* Grid */}
      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
        <div className="grid grid-cols-2 gap-3 pb-20">
          {SHOP_ITEMS.map((item) => {
            const isOwned = ownedItems.includes(item.id);
            const isEquipped = equippedAvatar === item.id;

            return (
              <div
                key={item.id}
                className={`
                    flex flex-col p-3 rounded-2xl border transition-all touch-manipulation glass-card
                    ${isOwned ? "border-green-200 bg-green-50/30" : "border-white/50 hover:bg-white/40"}
                `}
              >
                {/* Item Preview */}
                <div className="aspect-square w-full bg-white/40 rounded-xl mb-3 overflow-hidden relative border border-white/60 shadow-inner flex items-center justify-center p-2">
                  <img
                    src={item.imagePath}
                    alt={item.name || `Avatar ${item.id.replace("avatar", "")}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        "/Wordrobe/assets/character/avatar_base.png";
                    }}
                  />
                </div>

                <div className="mt-auto">
                  <p className="text-xs font-bold text-gray-700 mb-2 truncate">
                    {item.name}
                  </p>

                  {isOwned ? (
                    <button
                      onClick={() => onEquip(item)}
                      disabled={isEquipped}
                      className={`
                                w-full py-2 rounded-xl text-xs font-bold transition-all border border-white/20
                                ${
                                  isEquipped
                                    ? "bg-gray-400/50 text-white cursor-not-allowed"
                                    : "bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-lg active:scale-95"
                                }
                            `}
                    >
                      {isEquipped ? "Wearing" : "Wear"}
                    </button>
                  ) : (
                    <button
                      onClick={() => onBuy(item)}
                      disabled={points < item.cost}
                      className={`
                                w-full py-2 rounded-xl text-xs font-bold flex items-center justify-center gap-1 transition-all border border-white/20
                                ${
                                  points < item.cost
                                    ? "bg-gray-200/50 text-gray-400"
                                    : "bg-gradient-to-r from-pink-500 to-rose-500 text-white shadow-lg shadow-pink-200/50 active:scale-95"
                                }
                            `}
                    >
                      <span>Buy {item.cost}</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
