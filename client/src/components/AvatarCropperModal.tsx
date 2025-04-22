import React, { useState, useRef, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  Crop,
  PixelCrop,
} from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import { UploadCloud } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

async function canvasPreview(
  image: HTMLImageElement,
  canvas: HTMLCanvasElement,
  crop: PixelCrop,
  scale = 1
) {
  const ctx = canvas.getContext("2d");

  if (!ctx) {
    toast.error("Something went wrong!");
    throw new Error("No 2d context");
  }

  const scaleX = image.naturalWidth / image.width;
  const scaleY = image.naturalHeight / image.height;
  const pixelRatio = window.devicePixelRatio;

  canvas.width = Math.floor(crop.width * scaleX * pixelRatio);
  canvas.height = Math.floor(crop.height * scaleY * pixelRatio);

  ctx.scale(pixelRatio, pixelRatio);
  ctx.imageSmoothingQuality = "high";

  const cropX = crop.x * scaleX;
  const cropY = crop.y * scaleY;
  const cropWidth = crop.width * scaleX;
  const cropHeight = crop.height * scaleY;

  const sourceX = image.naturalWidth / 2;
  const sourceY = image.naturalHeight / 2;

  ctx.save();
  ctx.translate(sourceX, sourceY);
  ctx.scale(scale, scale);
  ctx.translate(-sourceX, -sourceY);

  ctx.drawImage(
    image,
    cropX,
    cropY,
    cropWidth,
    cropHeight,
    0,
    0,
    cropWidth,
    cropHeight
  );

  ctx.restore();
}

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (croppedDataUrl: string) => void;
};

const DEFAULT_ASPECT = 1;
const DEFAULT_MIN_CROP_DIMENSION = 50;

export const AvatarCropperModal = ({ open, onOpenChange, onSave }: Props) => {
  const [imgSrc, setImgSrc] = useState("");
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<PixelCrop>();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles && acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      setCrop(undefined);
      setCompletedCrop(undefined);
      const reader = new FileReader();
      reader.addEventListener("load", () =>
        setImgSrc(reader.result?.toString() || "")
      );
      reader.readAsDataURL(file);
    } else {
      console.error(
        "File rejected. Please upload a valid image file (PNG, JPG, WEBP)."
      );
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive, fileRejections } =
    useDropzone({
      onDrop,
      accept: { "image/png": [], "image/jpeg": [], "image/webp": [] },
      maxFiles: 1,
      multiple: false,
      maxSize: 500000,
    });

  const isFileTooLarge = fileRejections.some((file) =>
    file.errors.some((err) => err.code === "file-too-large")
  );
  const isInvalidFile = fileRejections.some((file) =>
    file.errors.some((err) => err.code === "file-invalid-type")
  );

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: "%", width: 90 }, DEFAULT_ASPECT, width, height),
      width,
      height
    );
    setCrop(initialCrop);
    setCompletedCrop(undefined);
  }

  useEffect(() => {
    if (!completedCrop || !previewCanvasRef.current || !imgRef.current) return;
    canvasPreview(imgRef.current, previewCanvasRef.current, completedCrop);
  }, [completedCrop]);

  const handleSaveCrop = async (): Promise<void> => {
    const image = imgRef.current;
    const previewCanvas = previewCanvasRef.current;
    if (!image || !previewCanvas || !completedCrop) {
      console.error("Crop details or elements not available for saving.");
      toast.error("Could not save crop. Please try again.");
      return;
    }
    const base64dataUrl = previewCanvas.toDataURL("image/png");
    console.log(
      "😡 ~ handleSaveCrop ~ base64dataUrl ~ by empty@404 😡",
      base64dataUrl
    );
    if (!base64dataUrl || base64dataUrl === "data:,") {
      console.error("Failed to get base64 data from canvas");
      toast.error("Could not process the cropped image.");

      return;
    }
    onSave(base64dataUrl);
    clearImage();
  };

  const handleModalClose = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setImgSrc("");
      setCrop(undefined);
      setCompletedCrop(undefined);
    }
  };

  const clearImage = () => {
    setImgSrc("");
    setCrop(undefined);
    setCompletedCrop(undefined);
  };

  return (
    <Dialog open={open} onOpenChange={handleModalClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Update Profile Picture</DialogTitle>
          <DialogDescription>
            {imgSrc
              ? "Adjust the circle to crop."
              : "Drag & drop or click to upload."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {!imgSrc ? (
            <div
              {...getRootProps()}
              className={cn(
                "flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg cursor-pointer bg-muted/30 hover:bg-muted/50 transition-colors",
                isDragActive
                  ? "border-primary bg-primary/10"
                  : "border-muted-foreground/30"
              )}
              aria-label="File Upload Dropzone"
            >
              <input {...getInputProps()} aria-hidden="true" />
              <div className="text-center p-4">
                <UploadCloud
                  className={`mx-auto h-12 w-12 mb-4 ${
                    isDragActive ? "text-primary" : "text-muted-foreground"
                  }`}
                />
                {isDragActive ? (
                  <p className="text-lg font-semibold text-primary">
                    Drop the image here ...
                  </p>
                ) : (
                  <>
                    <p className="text-lg font-semibold">
                      Drag & drop image here
                    </p>
                    <p className="text-sm text-muted-foreground mb-2">
                      or click to browse
                    </p>
                    <p className="text-xs text-muted-foreground">
                      PNG, JPG, WEBP (Max 1 file)
                    </p>
                  </>
                )}

                {isFileTooLarge && (
                  <p className="text-xs text-destructive mt-2">
                    "File must be lower than 50MB"
                  </p>
                )}
                {isInvalidFile && (
                  <p className="text-xs text-destructive mt-2">
                    Invalid file type. Please upload PNG, JPG, or WEBP.
                  </p>
                )}
                {!isFileTooLarge &&
                  !isInvalidFile &&
                  fileRejections.length > 0 && (
                    <p className="text-xs text-destructive mt-2">
                      Something went wrong!
                    </p>
                  )}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4">
              <ReactCrop
                crop={crop}
                onChange={(_, percentCrop) => setCrop(percentCrop)}
                onComplete={(c) => {
                  setCompletedCrop(c);
                }}
                aspect={DEFAULT_ASPECT}
                circularCrop={true}
                minWidth={DEFAULT_MIN_CROP_DIMENSION}
                minHeight={DEFAULT_MIN_CROP_DIMENSION}
                keepSelection={true}
              >
                <img
                  ref={imgRef}
                  alt="Crop preview"
                  src={imgSrc}
                  onLoad={onImageLoad}
                  className="max-h-[50vh] object-contain"
                />
              </ReactCrop>
              <Button
                variant="link"
                size="sm"
                onClick={clearImage}
                className="mt-2 text-destructive hover:text-destructive/80"
              >
                Choose a different image
              </Button>
            </div>
          )}
        </div>

        {!!completedCrop && (
          <canvas
            ref={previewCanvasRef}
            style={{
              display: "none",
            }}
          />
        )}

        <DialogFooter>
          <DialogClose asChild>
            <Button type="button" variant="outline">
              Cancel
            </Button>
          </DialogClose>
          <Button
            type="button"
            onClick={handleSaveCrop}
            disabled={!imgSrc || !completedCrop}
          >
            Save Changes
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
