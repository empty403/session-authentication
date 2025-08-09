import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Card, CardBody, Button } from "@heroui/react";
import { Upload, X, Image as ImageIcon } from "lucide-react";
import { useFormContext, useController } from "react-hook-form";

type FileUploadProps = {
  name: string;
  accept?: Record<string, string[]>;
  maxSize?: number;
  multiple?: boolean;
  label?: string;
  description?: string;
  className?: string;
  onFileChange?: (files: File[]) => void;
};

export const FileUpload = ({
  name,
  accept = { "image/*": [".png", ".jpg", ".jpeg", ".gif", ".webp"] },
  maxSize = 5 * 1024 * 1024,
  multiple = false,
  label = "Upload File",
  description = "Drag and drop files here or click to browse",
  className,
  onFileChange,
}: FileUploadProps) => {
  const [preview, setPreview] = useState<string | null>(null);
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const { field } = useController({
    name,
    control,
  });

  const error = errors[name];
  const errorMessage = error?.message as string | undefined;

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const files = multiple ? acceptedFiles : [acceptedFiles[0]];
      field.onChange(multiple ? files : files[0]);
      onFileChange?.(files);

      if (!multiple && files[0] && files[0].type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = () => setPreview(reader.result as string);
        reader.readAsDataURL(files[0]);
      }
    },
    [field, multiple, onFileChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept,
    maxSize,
    multiple,
  });

  const removeFile = () => {
    field.onChange(null);
    setPreview(null);
  };

  const currentFile = field.value as File | File[] | null;
  const hasFiles = Array.isArray(currentFile)
    ? currentFile.length > 0
    : !!currentFile;

  return (
    <div className={className}>
      {label && (
        <label className="block text-sm font-medium mb-2">{label}</label>
      )}

      <Card
        className={`border-2 border-dashed transition-colors ${
          isDragActive ? "border-primary bg-primary/5" : "border-default-300"
        } ${error ? "border-danger" : ""}`}
      >
        <CardBody>
          <div {...getRootProps()} className="cursor-pointer">
            <input {...getInputProps()} />

            {preview ? (
              <div className="relative">
                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  className="absolute top-2 right-2"
                  onPress={removeFile}
                >
                  <X size={16} />
                </Button>
              </div>
            ) : hasFiles ? (
              <div className="flex items-center justify-between p-4">
                <div className="flex items-center space-x-3">
                  <ImageIcon size={24} className="text-default-500" />
                  <span className="text-sm">
                    {Array.isArray(currentFile)
                      ? `${currentFile.length} file(s) selected`
                      : (currentFile as File)?.name}
                  </span>
                </div>
                <Button
                  isIconOnly
                  size="sm"
                  variant="flat"
                  onPress={removeFile}
                >
                  <X size={16} />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center p-8 text-center">
                <Upload size={48} className="text-default-400 mb-4" />
                <p className="text-default-600 mb-2">
                  {isDragActive ? "Drop files here" : description}
                </p>
                <p className="text-xs text-default-400">
                  Max size: {Math.round(maxSize / 1024 / 1024)}MB
                </p>
              </div>
            )}
          </div>
        </CardBody>
      </Card>

      {error && <p className="text-tiny text-danger mt-1">{errorMessage}</p>}
    </div>
  );
};
