async function fetchNFTMetadata(asset_contract_address, token_id) {
    try {
      const response = await fetch(`https://api.opensea.io/api/v1/asset/${asset_contract_address}/${token_id}/`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
  
  async function displayNFT(asset_contract_address, token_id) {
    const nftData = await fetchNFTMetadata(asset_contract_address, token_id);
  
    // Check if data was fetched successfully
    if (!nftData) {
      console.log(`Failed to fetch data for token_id: ${token_id}`);
      return;
    }
  
    const image_url = nftData.image_original_url || nftData.image_url;
    const name = nftData.name;
    const fullDescription = nftData.description;
  
    // Update the elements on the page with the fetched data
    document.getElementById('nft-img').src = image_url;
    document.getElementById('nft-title').textContent = name;
    document.getElementById('nft-description').textContent = fullDescription;
  }
  
  // Get token ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const tokenId = urlParams.get('token_id');
  
  // Fetch and display the NFT
  displayNFT('0xe7Eb1E4AEa7AC03687c1F159b1bdf2d9d29b90dE', tokenId);
  