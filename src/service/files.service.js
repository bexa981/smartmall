async function uploadImageFormDataToGitHub(token, owner, repo, branch, filePath, file) {
    const githubApiUrl = `https://api.github.com/repos/${owner}/${repo}/contents/${filePath}`;
  
    try {
      const base64Content = await readFileAsBase64(file);
  
      const formData = new FormData();
      formData.append("message", `Upload ${filePath}`); 
      formData.append("content", base64Content); 
      formData.append("branch", branch);
  
      const response = await fetch(githubApiUrl, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
        },
        body: JSON.stringify({
          message: `Upload ${filePath}`,
          content: base64Content,
          branch: branch,
        }),
      });
  
      if (!response.ok) {
        const error = await response.json();
        throw new Error(`GitHub API error: ${error.message}`);
      }
  
      const data = await response.json();
      const fileUrl = data.content.download_url;
  
      console.log("File uploaded successfully:", fileUrl);
      return fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      throw error;
    }
  } 

function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => {
        const base64Content = reader.result.split(",")[1];
        resolve(base64Content);
      };
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(file);
    });
  }
  
export async function uploadFile(file) {
    const token = process.env.VUE_APP_GITHUB_TOKEN;
    const owner = "bexa981";
    const repo = "smartsmall-storage";
    const branch = "main";

    const filePath = 'images/'+ Date.now() + '_' + `${file.name}`.trim()
    
    if (!file) {
        console.error("No file selected!");
        return;
    }
    
    const fileUrl = await uploadImageFormDataToGitHub(
        token,
        owner,
        repo,
        branch,
        filePath,
        file
        );
    return fileUrl
}