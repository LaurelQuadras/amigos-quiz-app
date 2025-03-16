import { Input } from "@/components/ui/input";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";

export interface QuestionImageDataProps {
  image_data: Blob[] | undefined;
  selectedImageFiles: any[];
  setSelectedImageFiles: Dispatch<SetStateAction<any[]>>;
}

export default function QuestionImageData({
  image_data,
  selectedImageFiles,
  setSelectedImageFiles,
}: QuestionImageDataProps) {
  const handleFileChange = (e: any): void => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      if (
        selectedImageFiles.length +
          fileArray.length +
          (typeof image_data === "string" ? 1 : 0) >
        4
      ) {
        alert("You cannot add more than 4 images");
      } else {
        setSelectedImageFiles([...selectedImageFiles, ...fileArray]);
      }
    }
  };

  return (
    <div className="flex gap-8 flex-auto items-center flex-wrap h-auto">
      <span className="w-40">Attachments</span>
      <div className="w-9/12 h-full">
        <Input
          id="picture"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
          className="w-82"
        />
        <div className="mt-2 h-fit object-contain flex gap-3 flex-wrap">
          {selectedImageFiles.length > 0 && (
            <div className="flex gap-3">
              {selectedImageFiles.map((file: any, index: number) => (
                <Image
                  key={index}
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                  className="rounded-md h-64"
                  width={250}
                  height={250}
                />
              ))}
            </div>
          )}
          {image_data !== undefined &&
            image_data.length > 0 &&
            image_data.map((image: Blob, index: number) =>
              image.toString().includes("image") ? (
                <div className="w-auto h-auto" key={index}>
                  <Image
                    src={`${image}`}
                    alt={`Preview`}
                    className="rounded-md h-fit object-contain"
                    width={250}
                    height={256}
                    unoptimized
                  />
                </div>
              ) : (
                <div className="w-auto h-auto" key={index}>
                  <audio src={`${image}`} controls />
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
}
