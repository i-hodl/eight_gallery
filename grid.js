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
  
    if (!nftData) {
      console.log(`Failed to fetch data for token_id: ${token_id}`);
      return;
    }
  
    const image_url = nftData.image_original_url || nftData.image_url;
    const name = nftData.name;
  
    const div = document.createElement('div');
    div.className = 'nft';
    
    const img = document.createElement('img');
    img.src = image_url;
    img.alt = name;
    
    const h2 = document.createElement('h2');
    h2.textContent = name;
  
    div.appendChild(img);
    div.appendChild(h2);
  
    div.addEventListener('click', function() {
      window.location.href = `/single.html?token_id=${token_id}`;
    });
  
    document.getElementById('nft-grid').appendChild(div);
  }
  
  for(let i = 1; i <= 9; i++) {
    displayNFT('0xe7Eb1E4AEa7AC03687c1F159b1bdf2d9d29b90dE', i.toString());
  }
  