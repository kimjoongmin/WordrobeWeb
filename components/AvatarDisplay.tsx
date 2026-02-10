"use client";

import React from "react";
import { SHOP_ITEMS } from "../data/gameData";
// We don't import SPRITE_CONFIG anymore as we are using direct images.

interface AvatarProps {
  avatarId?: string;
  className?: string; // Additional classes for sizing
}

export default function AvatarDisplay({
  avatarId,
  className = "w-64 h-64",
}: AvatarProps) {
  // Find item data or default to base
  const item = SHOP_ITEMS.find((i) => i.id === avatarId);
  const imagePath = item
    ? item.imagePath
    : "/Wordrobe/assets/character/avatar_base.png";

  return (
    <div
      className={`relative ${className} bg-white/40 rounded-full border-4 border-white overflow-hidden shadow-lg mx-auto backdrop-blur-sm halo-glow`}
    >
      <img
        src={imagePath}
        alt="Avatar"
        className="absolute inset-0 w-full h-full object-contain"
      />
    </div>
  );
}
