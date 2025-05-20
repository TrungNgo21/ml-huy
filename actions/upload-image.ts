

export async function uploadImage(formData: FormData, endpoint: string) {
  try {
    const image = formData.get("file") as File

    if (!image) {
      throw new Error("No image provided")
    }

    // Get the API URL from environment variables
    const apiUrl = "http://localhost:8000/task1/predict"

    if (!apiUrl) {
      throw new Error("MODEL_API_URL environment variable is not set")
    }

    // Create a new FormData instance for the API request
    const apiFormData = new FormData()

    // Convert the File to a Blob and append to the form
    const bytes = await image.arrayBuffer()
    const blob = new Blob([bytes], { type: image.type })
    apiFormData.append("file", blob, image.name)

    // Send the request to the model API
    const response = await fetch(endpoint, {
      method: "POST",
      body: apiFormData,
    })

    if (!response.ok) {
      throw new Error(`API request failed with status ${response.status}`)
    }

    const result = await response.json()

    // Revalidate the path to update the UI
    return result
  } catch (error) {
    console.error("Error in uploadImage:", error)
    throw error
  }
}
