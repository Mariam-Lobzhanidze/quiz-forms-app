import { useState, useRef } from "react";
import ReactCrop, { Crop, PixelCrop } from "react-image-crop";
import { canvasPreview } from "./canvasPreview";
import { useDebounceEffect } from "./useDebounceEffect";
import { useDropzone } from "react-dropzone";
import "react-image-crop/dist/ReactCrop.css";

interface ImageUploadAndCropProps {
  onCropComplete: (croppedImageUrl: string | null) => void;
}

export default function ImageUploadAndCrop({ onCropComplete }: ImageUploadAndCropProps) {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  const [crop, setCrop] = useState<Crop>({
    unit: "px",
    x: 50,
    y: 50,
    width: 80,
    height: 80,
  });

  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();
  const [scale, setScale] = useState(1);

  const onDrop = (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onSelectFile(file);
    }
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

  function onSelectFile(file: File) {
    const reader = new FileReader();
    reader.addEventListener("load", () => setImgSrc(reader.result?.toString() || ""));
    reader.onerror = () => {
      console.error("Error loading image");
      setImgSrc("");
    };
    reader.readAsDataURL(file);
  }

  useDebounceEffect(
    () => {
      if (completedCrop?.width && completedCrop?.height && imgRef.current && previewCanvasRef.current) {
        canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop, scale);
        const croppedImageDataUrl = previewCanvasRef.current.toDataURL("image/jpeg");
        onCropComplete(croppedImageDataUrl);
      }
    },
    100,
    [completedCrop, scale]
  );

  return (
    <div className="p-3 flex gap-2 justify-center items-center flex-col">
      {imgSrc ? (
        <div className="flex gap-3 flex-col">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => setCompletedCrop(c)}
            aspect={1}
            minHeight={80}
            minWidth={80}
            circularCrop>
            <img
              ref={imgRef}
              alt="Crop me"
              src={imgSrc}
              style={{
                transform: `scale(${scale})`,
                objectFit: "contain",
                maxHeight: "60vh",
              }}
            />
          </ReactCrop>

          <div className="flex gap-4 my-4">
            <label className="text-emerald-400">Scale image: </label>
            <div className="flex items-center gap-3">
              <button
                onClick={() => setScale((prev) => Math.max(prev - 0.1, 0))}
                className="cursor-pointer bg-emerald-600 text-white w-6 h-6 flex items-center justify-center rounded">
                -
              </button>
              <button
                onClick={() => setScale((prev) => prev + 0.1)}
                className="cursor-pointer bg-emerald-600 text-white w-6 h-6 flex items-center justify-center rounded">
                +
              </button>
              <button
                onClick={() => setScale(1)}
                className="cursor-pointer bg-emerald-600 text-white w-6 h-6 flex items-center justify-center rounded">
                ↻
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div
          {...getRootProps()}
          className={`p-6 border-dashed border-2 border-gray-300 rounded-lg flex justify-center items-center ${
            isDragActive ? "bg-gray-100" : ""
          }`}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the image here...</p>
          ) : (
            <p>Drag & drop an image here, or click to select an image</p>
          )}
        </div>
      )}

      {!!completedCrop && (
        <canvas
          ref={previewCanvasRef}
          style={{
            width: completedCrop.width,
            height: completedCrop.height,
            display: "none",
          }}
        />
      )}
    </div>
  );
}
