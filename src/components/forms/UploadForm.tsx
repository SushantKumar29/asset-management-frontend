import { useState, useCallback } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Upload, X, File, Trash2, Plus } from "lucide-react";
import toast from "react-hot-toast";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { uploadSchema, type UploadFormData } from "@/lib/validations/upload";
import {
  ALLOWED_MIME_TYPES,
  MAX_FILE_COUNT,
  MAX_FILE_SIZE,
  MAX_TAGS_COUNT,
} from "@/constants/assets";
import { formatBytes, formatMimeType } from "@/lib/formatters";
import type { UploadFormProps } from "@/slices/assets/types";

const UploadForm = ({ onSubmit, isUploading }: UploadFormProps) => {
  const [currentTag, setCurrentTag] = useState("");
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UploadFormData>({
    resolver: zodResolver(uploadSchema),
    defaultValues: { files: [], description: "", tags: [] },
  });

  const files = watch("files");
  const tags = watch("tags") || [];

  const validateFile = useCallback((file: File) => {
    if (!ALLOWED_MIME_TYPES.includes(file.type)) {
      toast.error(`"${file.name}" is not supported`);
      return false;
    }
    if (file.size > MAX_FILE_SIZE) {
      toast.error(`"${file.name}" exceeds ${formatBytes(MAX_FILE_SIZE)}`);
      return false;
    }
    return true;
  }, []);

  const handleFileChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const validFiles = Array.from(e.target.files || []).filter(validateFile);
      const newFiles = [...files, ...validFiles];
      if (newFiles.length > MAX_FILE_COUNT) {
        toast.error(`Maximum ${MAX_FILE_COUNT} files allowed`);
        return;
      }
      setValue("files", newFiles, { shouldValidate: true });
    },
    [files, validateFile, setValue]
  );

  const removeFile = useCallback(
    (index: number) => {
      setValue(
        "files",
        files.filter((_, i) => i !== index),
        { shouldValidate: true }
      );
    },
    [files, setValue]
  );

  const clearAllFiles = useCallback(() => {
    setValue("files", [], { shouldValidate: true });
  }, [setValue]);

  const addTag = useCallback(() => {
    const tag = currentTag.trim();
    if (!tag) return;
    if (tags.includes(tag)) {
      toast.error("Tag already exists");
      return;
    }
    if (tags.length >= MAX_TAGS_COUNT) {
      toast.error(`Maximum ${MAX_TAGS_COUNT} tags`);
      return;
    }
    setValue("tags", [...tags, tag], { shouldValidate: true });
    setCurrentTag("");
  }, [currentTag, tags, setValue]);

  const removeTag = useCallback(
    (index: number) => {
      setValue(
        "tags",
        tags.filter((_, i) => i !== index),
        { shouldValidate: true }
      );
    },
    [tags, setValue]
  );

  const onFormSubmit = useCallback(
    async (data: UploadFormData) => {
      const formData = new FormData();
      data.files.forEach((file) => formData.append("files", file));
      if (data.description) formData.append("description", data.description);
      if (data.tags?.length) formData.append("tags", JSON.stringify(data.tags));
      await onSubmit(formData);
    },
    [onSubmit]
  );

  const totalSize = files.reduce((sum, f) => sum + f.size, 0);

  return (
    <form onSubmit={handleSubmit(onFormSubmit)} className="space-y-6">
      <div>
        <Label>Files * (Max 10)</Label>
        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-muted">
          <div className="text-center">
            <Upload className="h-8 w-8 mx-auto text-muted-foreground mb-2" />
            <p className="text-sm text-muted-foreground">
              {files.length ? `${files.length}/10 selected` : "Click to upload"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Images, videos, audio, docs (Max 100MB)
            </p>
          </div>
          <Input
            type="file"
            className="hidden"
            onChange={handleFileChange}
            multiple
            disabled={files.length >= 10}
          />
        </label>
        {errors.files && <p className="text-sm text-error mt-1">{errors.files.message}</p>}
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between">
            <Label>Selected ({files.length}/10)</Label>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={clearAllFiles}
              className="text-error"
            >
              <Trash2 className="h-3 w-3 mr-1" /> Clear All
            </Button>
          </div>
          <div className="space-y-2 max-h-64 overflow-auto">
            {files.map((file, i) => (
              <div key={i} className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <File className="h-4 w-4 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {formatMimeType(file.type)} • {formatBytes(file.size)}
                    </p>
                  </div>
                </div>
                <Button type="button" variant="ghost" size="sm" onClick={() => removeFile(i)}>
                  <X className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <Label>Description (Optional)</Label>
        <Textarea
          {...register("description")}
          placeholder="Enter description for all assets"
          rows={3}
          className="mt-1"
        />
      </div>

      <div>
        <Label>Tags (Optional)</Label>
        <div className="flex gap-2 mt-1">
          <Input
            value={currentTag}
            onChange={(e) => setCurrentTag(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
            placeholder="Add tags (press Enter)"
          />
          <Button type="button" size="sm" variant="outline" onClick={addTag}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        {errors.tags && <p className="text-sm text-error mt-1">{errors.tags.message}</p>}
        {tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {tags.map((tag, i) => (
              <Badge key={i} variant="secondary" className="gap-1">
                {tag}
                <button type="button" onClick={() => removeTag(i)} className="hover:text-error">
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        )}
      </div>

      {files.length > 0 && (
        <div className="p-3 rounded-lg bg-muted">
          <p className="text-sm font-medium">Upload Summary</p>
          <p className="text-xs text-muted-foreground">
            {files.length} file(s) • {formatBytes(totalSize)}
            {tags.length > 0 && ` • ${tags.length} tag(s)`}
          </p>
        </div>
      )}

      <div className="flex gap-3">
        <Button type="submit" disabled={isUploading || !files.length}>
          {isUploading
            ? "Uploading..."
            : `Upload ${files.length} Asset${files.length !== 1 ? "s" : ""}`}
        </Button>
        <Button type="button" variant="outline" onClick={() => window.history.back()}>
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default UploadForm;
