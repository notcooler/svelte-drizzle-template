export async function uploadFileToS3(
  file: File,
  customName: string | null = null
): Promise<string> {
  const name = encodeURIComponent(customName ?? file.name)
  const contentType = encodeURIComponent(file.type)

  // Get the signed URL from the server
  const { url } = await (
    await fetch(`api/image/upload?name=${name}&contentType=${contentType}`)
  ).json()

  const uploadRes = await fetch(url, {
    method: "PUT",
    headers: {
      "Content-Type": contentType,
    },
    body: file,
  })

  if (!uploadRes.ok) {
    throw new Error("Failed to upload file")
  }
  
  return url
}
