"use client"

import type React from "react"

import { useState } from "react"
import { Upload, ImageIcon } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PredictionResults } from "@/components/prediction-results"
import { uploadImage } from "@/actions/upload-image"
import { Task3PredictionResults } from "./task3-prediction-res"

export function ImageUploader({ endpoint, isTask3 }: { endpoint: string, isTask3: boolean }) {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string | null>(null)
  const [isUploading, setIsUploading] = useState(false)
  const [results, setResults] = useState<any>(null)
  const [error, setError] = useState<string | null>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0]
    if (selectedFile) {
      setFile(selectedFile)
      const reader = new FileReader()
      reader.onload = () => {
        setPreview(reader.result as string)
      }
      reader.readAsDataURL(selectedFile)
      setResults(null)
      setError(null)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!file) return

    setIsUploading(true)
    setError(null)

    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await uploadImage(formData, endpoint)
      setResults(response)
    } catch (err) {
      console.error("Error uploading image:", err)
      setError("Failed to process image. Please try again.")
    } finally {
      setIsUploading(false)
    }
  }

  return (
    <div className="space-y-6">
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label
                  htmlFor="image-upload"
                  className="flex h-64 cursor-pointer flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/25 px-6 py-10 text-center"
                >
                  <div className="flex flex-col items-center justify-center gap-1">
                    <Upload className="h-10 w-10 text-muted-foreground" />
                    <div className="mt-2 flex flex-col items-center justify-center">
                      <span className="font-semibold">Click to upload</span>
                      <span className="text-xs text-muted-foreground">or drag and drop</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-2">JPG, PNG or GIF up to 5MB</p>
                  </div>
                  <input
                    id="image-upload"
                    name="image"
                    type="file"
                    accept="image/*"
                    className="sr-only"
                    onChange={handleFileChange}
                  />
                </label>
                <Button type="submit" disabled={!file || isUploading} className="mt-2">
                  {isUploading ? "Processing..." : "Predict Disease"}
                </Button>
              </div>

              <div className="flex flex-col items-center justify-center">
                {preview ? (
                  <div className="relative aspect-square w-full overflow-hidden rounded-md">
                    <img src={preview || "/placeholder.svg"} alt="Preview" className="h-full w-full object-cover" />
                  </div>
                ) : (
                  <div className="flex h-64 w-full flex-col items-center justify-center rounded-md border border-dashed border-muted-foreground/25">
                    <ImageIcon className="h-10 w-10 text-muted-foreground" />
                    <p className="mt-2 text-sm text-muted-foreground">Image preview will appear here</p>
                  </div>
                )}
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {error && <div className="rounded-md bg-destructive/15 p-4 text-destructive">{error}</div>}

      {results && !isTask3 && <PredictionResults results={results} />}
      {results && isTask3 && <Task3PredictionResults results={results} />}
    </div>
  )
}
