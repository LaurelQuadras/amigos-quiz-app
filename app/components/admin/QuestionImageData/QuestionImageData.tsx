import { Input } from "@/components/ui/input";
import Image from "next/image";
import { useEffect, useState } from "react";

export interface QuestionImageDataProps {
  image_data: Blob | undefined;
}

export default function QuestionImageData({
  image_data,
}: QuestionImageDataProps) {
  const [selectedFiles, setSelectedFiles] = useState<any>([]);
  const dataUrl: string = image_data
    ? `data:image/png;base64,${image_data}`
    : "";

  const handleFileChange = (e: any): void => {
    const files = e.target.files;
    if (files) {
      const fileArray = Array.from(files);
      setSelectedFiles([...selectedFiles, ...fileArray]);
    }
  };

  /**
   * <span className="w-40">Attachments</span>
        <div>
          <Input
            id="picture"
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
          {selectedFiles.length > 0 && (
            <div className="mt-2 h-64 object-contain flex gap-3 flex-wrap">
              {selectedFiles.map((file: any, index: number) => (
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
   */

  return (
    <div className="flex gap-8 items-center flex-wrap h-auto">
      <span className="w-40">Attachments</span>
      <div>
        <Input
          id="picture"
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileChange}
        />
        {typeof image_data === "string" && (
          <div className="w-auto h-auto">
            <Image
              src={dataUrl}
              alt={`Preview`}
              className="rounded-md h-64 object-contain"
              width={250}
              height={256}
              unoptimized
            />
          </div>
        )}
      </div>
    </div>
  );
}
