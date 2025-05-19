"use client";
import React, { useCallback } from "react";
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
  register,
  setValue,
  errors,
  imagePreview,
}) => {
  // Handle file selection for both click and drag-and-drop
  const handleFileChange = useCallback(
    (file: File | null) => {
      if (file) {
        setValue("image", file, { shouldValidate: true });
      }
    },
    [setValue]
  );

  // Handle drag-and-drop events
  const handleDrop = useCallback(
    (e: React.DragEvent<HTMLDivElement>) => {
      e.preventDefault();
      e.stopPropagation();
      const file = e.dataTransfer.files?.[0];
      handleFileChange(file);
    },
    [handleFileChange]
  );

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  return (
    <div
      className="w-full h-[250px] flex flex-col items-center justify-center relative border-2 border-dashed border-gray-300 rounded-lg bg-white hover:bg-gray-50 transition-colors"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      role="button"
      aria-label="Upload or drag and drop an image"
    >
      <input
        type="file"
        accept="image/png,image/jpeg,image/gif"
        id="file-upload"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-50"
        {...register("image")}
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
      />
      <div className="text-center">
        <h3 className="mt-2 text-sm font-medium text-gray-900">
          <label htmlFor="file-upload" className="relative cursor-pointer">
            <span>Drag and drop</span>
            <span className="text-indigo-600"> or browse</span>
            <span> to upload</span>
          </label>
        </h3>
        <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            document.getElementById("file-upload")?.click();
          }}
          className="mt-4 p-2 bg-[#1E3557] text-white rounded-md hover:bg-blue-950 transition flex items-center justify-center mx-auto"
          title="Upload Image"
        >
          <ImUpload3 size={20} className="" />
          {/* <span>Upload</span> */}
        </button>
      </div>
      {imagePreview && (
        <div className="mt-4 flex justify-center">
          <Image
            src={imagePreview}
            alt="Preview"
            className="w-20 h-20 object-cover border rounded"
            width={80}
            height={80}
          />
        </div>
      )}
      {errors.image && (
        <p className="mt-2 text-xs text-red-500 text-center">
          {errors.image.message}
        </p>
      )}
    </div>
  );
};

export default ImageUploader;
