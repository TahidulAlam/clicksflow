import React from "react";
import Image from "next/image";
import { ImUpload3 } from "react-icons/im";
import { UseFormRegister, UseFormSetValue, FieldErrors } from "react-hook-form";
import { FormData } from "../../adminDashboard/offers/add/addOfferForm/GenarelAddForm";
interface ImageUploaderProps {
  register: UseFormRegister<FormData>;
  setValue: UseFormSetValue<FormData>;
  errors: FieldErrors<FormData>;
  imagePreview: string | null;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  setValue,
  errors,
  imagePreview,
}) => {
  return (
    <div className="w-full border border-dashed border-gray-300 flex flex-col justify-center items-center p-20 rounded">
      <label className="text-sm text-gray-400 py-2">
        Drag and Drop or Upload
      </label>
      <div className="relative">
        <input
          type="file"
          accept="image/*"
          id="fileUpload"
          className="hidden"
          onChange={(e) => {
            if (e.target.files?.[0]) {
              setValue("image", e.target.files[0]);
            }
          }}
        />
        <button
          type="button"
          onClick={() => document.getElementById("fileUpload")?.click()}
          className="p-2 bg-[#1E3557] text-white rounded-md hover:bg-blue-950 transition"
          title="Upload Image"
        >
          <ImUpload3 size={20} />
        </button>
      </div>
      {imagePreview && (
        <Image
          src={imagePreview}
          alt="Preview"
          className="w-20 h-20 mt-2 object-cover border rounded"
          width={80}
          height={80}
        />
      )}
      {errors.image && (
        <p className="text-red-500 text-sm mt-1">{errors.image.message}</p>
      )}
    </div>
  );
};

export default ImageUploader;
