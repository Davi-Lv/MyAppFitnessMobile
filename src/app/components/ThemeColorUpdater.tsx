"use client";

import { useEffect } from 'react';

const colorMap: { [key: string]: string } = {
  "bg-red-500": "#ef4444",
  "bg-blue-500": "#3b82f6",
  "bg-green-500": "#22c55e",
  "bg-purple-500": "#8b5cf6",
  "bg-orange-500": "#f97316",
};

interface ThemeColorUpdaterProps {
  colorClass: string;
}

const ThemeColorUpdater: React.FC<ThemeColorUpdaterProps> = ({ colorClass }) => {
  useEffect(() => {
    const hexColor = colorMap[colorClass] || '#000000'; // Cor padrão preta
    let metaThemeColor = document.querySelector("meta[name=theme-color]");

    if (!metaThemeColor) {
        metaThemeColor = document.createElement('meta');
        metaThemeColor.setAttribute('name', 'theme-color');
        document.getElementsByTagName('head')[0].appendChild(metaThemeColor);
    }

    metaThemeColor.setAttribute("content", hexColor);
  }, [colorClass]);

  return null;
};

export default ThemeColorUpdater;