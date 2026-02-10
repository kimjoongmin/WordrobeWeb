const fs = require("fs");
const path = require("path");

const assetsDir = path.join(__dirname, "../public/assets");
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

const ITEMS = [
  // Base
  { name: "avatar_base.png", color: "#ffe0bd", text: "BODY" },

  // Hair
  { name: "hair_long_brown.png", color: "#5d4037", text: "Long Brn" },
  { name: "hair_blonde.png", color: "#fff176", text: "Blonde" },
  { name: "hair_red.png", color: "#d32f2f", text: "Red" },
  { name: "hair_short_purple.png", color: "#9c27b0", text: "Purple" },
  { name: "hair_ponytail_brown.png", color: "#5d4037", text: "Pony" },
  { name: "hair_bun_blue.png", color: "#2196f3", text: "Blue Bun" },
  { name: "hair_updo_blonde.png", color: "#fff176", text: "Updo" },
  { name: "hair_bun_red.png", color: "#d32f2f", text: "Red Bun" },

  // Clothes
  { name: "clothes_pink_dress.png", color: "#f48fb1", text: "Pink" },
  { name: "clothes_denim.png", color: "#90caf9", text: "Denim" },
  { name: "clothes_blue_jacket.png", color: "#e3f2fd", text: "Jacket" },
  { name: "clothes_school_uniform_blue.png", color: "#3f51b5", text: "Uni" },
  { name: "clothes_dark_dress.png", color: "#1a237e", text: "Navy" },
  { name: "clothes_sailor_uniform.png", color: "#3f51b5", text: "Sailor" },
  { name: "clothes_red_dress.png", color: "#c62828", text: "Red" },
  { name: "clothes_kimono_red.png", color: "#b71c1c", text: "Kimono" },

  // Accessories
  { name: "accessory_glasses.png", color: "#424242", text: "Glasses" },
  { name: "accessory_bow.png", color: "#f44336", text: "Bow" },
  { name: "accessory_bag.png", color: "#795548", text: "Bag" },
  { name: "accessory_wings.png", color: "#e0e0e0", text: "Wings" },
];

ITEMS.forEach((item) => {
  const filePath = path.join(assetsDir, item.name);

  // CRITICAL: Do not overwrite real PNG images with mock SVGs
  if (fs.existsSync(filePath)) {
    console.log(`Skipping existing asset: ${item.name}`);
    return;
  }

  // Create an SVG (Placeholder only)
  const svgContent = `
<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
  <rect width="100%" height="100%" fill="transparent"/>
  <!-- Circle background for items/body -->
  <circle cx="100" cy="100" r="90" fill="${item.color}" fill-opacity="0.8" stroke="black" stroke-width="2"/>
  <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="24" fill="black" font-weight="bold">${item.text}</text>
</svg>
    `;
  fs.writeFileSync(filePath, svgContent);
  console.log(`Created placeholder ${filePath}`);
});
