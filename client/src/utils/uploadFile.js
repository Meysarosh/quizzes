export async function uploadFile(file, name) {
  try {
    const response = await fetch('http://localhost:5000/image', {
      method: 'POST',
      body: file,
      headers: {
        name,
      },
    });

    return response;
  } catch (err) {
    return 'Failed to upload the file.';
  }
}
