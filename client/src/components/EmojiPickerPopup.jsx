import React, { useState } from "react";
import EmojiPicker from "emoji-picker-react";
import { LuImage, LuX } from "react-icons/lu";

const EmojiPickerPopup = ({ icon, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      {/* Icon Trigger */}
      <div
        className="flex items-center gap-3 cursor-pointer"
        onClick={() => setIsOpen(true)}
      >
        <div className="w-12 h-12 flex items-center justify-center bg-gray-100 rounded-lg">
          {icon ? (
            <img src={icon} alt="Icon" className="w-6 h-6" />
          ) : (
            <LuImage className="text-xl text-gray-400" />
          )}
        </div>

        <p className="text-sm text-gray-600">
          {icon ? "Change Icon" : "Pick Icon"}
        </p>
      </div>

      {/* Emoji Picker Popup */}
      {isOpen && (
        <div className="absolute z-50 mt-3 bg-white shadow-lg rounded-lg p-3">
          <button
            className="absolute top-2 right-2 text-gray-500 hover:text-black"
            onClick={() => setIsOpen(false)}
          >
            <LuX />
          </button>

          <EmojiPicker
            open={isOpen}
            onEmojiClick={(emoji) => {
              onSelect(emoji.imageUrl || emoji.emoji);
              setIsOpen(false);
            }}
          />
        </div>
      )}
    </div>
  );
};

export default EmojiPickerPopup;
