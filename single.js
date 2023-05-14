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
  const nftDescription = document.getElementById('nft-description');
  const fullDescription = nftData.description;

  // Add this log to check the image URL
  console.log(`Image URL: ${image_url}`);

  // Create links
  const openseaLink = `https://opensea.io/assets/${asset_contract_address}/${token_id}`;
  const raribleLink = `https://rarible.com/token/${asset_contract_address}:${token_id}`;
  const manifoldLink = `https://manifold.xyz/asset/${asset_contract_address}/${token_id}`;

  // Get the elements and update their content
  const nftImg = document.getElementById('nft-img');

  // Get the elements
const nftTitle = document.getElementById('nft-title');
const sectionHeader = document.getElementById('section-header');

// Add glitch effect to the title and section header
nftTitle.classList.add('glitch');
sectionHeader.classList.add('glitch');

// Set data-text attribute for the glitch effect
nftTitle.setAttribute("data-text", name);
sectionHeader.setAttribute("data-text", 'Description');
  const readMoreLink = document.createElement('span');
  readMoreLink.classList.add('read-more-link');

  // Get link elements and update their hrefs
  const openseaElement = document.getElementById('opensea-link');
  const raribleElement = document.getElementById('rarible-link');
  const manifoldElement = document.getElementById('manifold-link');

  openseaElement.href = openseaLink;
  raribleElement.href = raribleLink;
  manifoldElement.href = manifoldLink;
  
  nftImg.src = image_url;
  nftTitle.setAttribute("data-text", name); // Set data-text attribute for glitch effect
  nftTitle.textContent = name;
  nftDescription.textContent = ''; // Clear previous content
  nftDescription.appendChild(readMoreLink);

  // Add event listener to "Read More" link
  readMoreLink.addEventListener('click', function() {
    nftDescription.textContent = fullDescription; // Show the full description
    readMoreLink.style.display = 'none'; // Hide the "Read More" link
  });

  // Typing effect for the description
  const typingEffect = async () => {
    for (let i = 0; i < fullDescription.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 50)); // Adjust typing speed here (50ms)
      nftDescription.textContent += fullDescription[i];
    }
  };

  typingEffect();
}

window.onload = function() {
  // Get token ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const tokenId = urlParams.get('token_id');


  // Fetch and display the NFT
  displayNFT('0xe7Eb1E4AEa7AC03687c1F159b1bdf2d9d29b90dE', tokenId);
};
