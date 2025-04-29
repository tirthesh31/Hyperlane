// Include GSAP and MotionPathPlugin via CDN or package manager
    // Register plugins
    gsap.registerPlugin(MotionPathPlugin);
    
    // Configuration
    const starSystems = [
      { id: 'star1', x: 680, y: 150, name: 'STARKNET' },
      { id: 'star2', x: 280, y: 190, name: 'ECLIPSE' },
      { id: 'star3', x: 440, y: 140, name: 'OPTIMISM' },
      { id: 'star4', x: 360, y: 270, name: 'UNICHAIN' },
      { id: 'star5', x: 480, y: 215, name: 'BASE' },
      { id: 'star6', x: 600, y: 240, name: 'SOLANA' },
      { id: 'star7', x: 200, y: 150, name: 'POLYGON' },
      { id: 'star8', x: 220, y: 237.5, name: 'CELESTIA' },
      { id: 'star9', x: 110, y: 290 , name: 'ETHEREUM' }
    ];
    
    const validCombinations = [
      { org: 'star6', dest: 'star2' , dataPackage: 'Renzo', headline:'Asset Insuance'}, // SOLANA - BASE
      { org: 'star3', dest: 'star4' , dataPackage: 'Velodrome', headline:'Velodrome'}, // POLYGON - ETHEREUM
      { org: 'star9', dest: 'star5' , dataPackage: 'Aave', headline:'Aave'}, // BNB CHAIN - ARBITRUM
    ];

    let currentCombinationIndex = 0;
    let previousOrg = null;
    let previousDest = null;
    
    // Initialize with first combination
    let currentOrg = starSystems.findIndex(star => star.id === validCombinations[0].org);
    let currentDest = starSystems.findIndex(star => star.id === validCombinations[0].dest);

    // Function to get the SVG path for a star based on its ID
    function getStarSymbolPath(starId) {
      // Define which icon to use based on starId
      const iconMap = {
        'star1': '67f7e6de08b79e4910e114b0_STARKNET',
        'star2': '67f7e6de6aea857b95bd28b4_BASE',
        'star3': '67f7e6de9bfb177fc0d98abd_ARBITRUM',
        'star4': '67f7e6de7796d821e8f26e28_BNB%20CHAIN',
        'star5': '67f7e6de6aea857b95bd28b4_BASE',
        'star6': '67f7e6de1b28f4ac0646e9da_SOLANA',
        'star7': '67f7e6de25260e963364940b_POLYGON',
        'star8': '67f7e6de6aea857b95bd28c3_CELESTIA',
        'star9': '67f7e6de469b28aa08b66a66_ETHEREUM'
      };

      // Default to Hyperlane's own icon if the star ID is not recognized
      const iconName = iconMap[starId] || 'ETHEREUM';
      
      // Return the path to the SVG icon
      return `https://cdn.prod.website-files.com/67f6e5eb787625b1298796e7/${iconName}.svg`;
    }

    // Function to get next valid combination
    function getNextCombination() {
      currentCombinationIndex = (currentCombinationIndex + 1) % validCombinations.length;
      return validCombinations[currentCombinationIndex];
    }

    // Define center points for org and dest connections
    const starCenter = { x: 11.5, y: 11 };
    const orgCenter = { x: 11.5, y: 11 };
    const destCenter = { x: 11.5, y: 11 };

    // Create all star systems
    function createStarSystems() {
      const container = document.querySelector(".star-systems");
      
      starSystems.forEach((star, index) => {
        const group = document.createElementNS("http://www.w3.org/2000/svg", "g");
        group.setAttribute("id", star.id);
        group.setAttribute("class", "star-system");
        group.setAttribute("transform", `translate(${star.x}, ${star.y})`);
        group.setAttribute("data-index", index);
        group.style.opacity = "0"; // Initially set all stars to invisible
        
        // Create basic star circle
        const starCircle = document.createElementNS("http://www.w3.org/2000/svg", "g");
        starCircle.setAttribute("class", "star-circle");
        
        const innerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        innerCircle.setAttribute("cx", starCenter.x);
        innerCircle.setAttribute("cy", starCenter.y);
        innerCircle.setAttribute("r", "3");
        innerCircle.setAttribute("fill", "#FF53E1");
        
        const outerCircle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        outerCircle.setAttribute("cx", starCenter.x);
        outerCircle.setAttribute("cy", starCenter.y);
        outerCircle.setAttribute("r", "8");
        outerCircle.setAttribute("stroke", "#FF53E1");
        outerCircle.setAttribute("stroke-opacity", "0.4");
        outerCircle.setAttribute("fill", "none");
        
        starCircle.appendChild(innerCircle);
        starCircle.appendChild(outerCircle);
        group.appendChild(starCircle);
        
        // Create origin content (initially hidden)
        const orgContent = document.createElementNS("http://www.w3.org/2000/svg", "g");
        orgContent.setAttribute("class", "org-content");
        orgContent.style.opacity = "0";
        orgContent.style.visibility = "hidden";
        
         // Add the font style in the head section
        const styleSheet = document.createElement("style");
        styleSheet.textContent = `
          @import url('https://fonts.googleapis.com/css2?family=Raleway:wght@500&display=swap');  /* Using Raleway as closest to Rale Grotesk */
        `;
        document.head.appendChild(styleSheet);

        // Create a container for the origin frame
        const originFrame = document.createElementNS("http://www.w3.org/2000/svg", "image");
        originFrame.setAttribute("href", "https://cdn.prod.website-files.com/67f6e5eb787625b1298796e7/67febbf3fc9a7532b1759ac5_46efc8f622a190f53f7cd4e57e475514_destination.svg");
        originFrame.setAttribute("width", "50");
        originFrame.setAttribute("height", "50");
        originFrame.setAttribute("x", orgCenter.x - 25); // Center the frame (87/2)
        originFrame.setAttribute("y", orgCenter.y - 25); // Center the frame (79/2)
        
        const orgText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        orgText.setAttribute("x", orgCenter.x);
         orgText.setAttribute("y", orgCenter.y - 35);
        orgText.setAttribute("fill", "rgba(255, 255, 255, 0.60)");
        orgText.setAttribute("font-family", "Raleway, sans-serif");
        orgText.setAttribute("font-size", "9px");
        orgText.setAttribute("font-weight", "500");
        orgText.setAttribute("letter-spacing", "0.18px");
        orgText.setAttribute("text-anchor", "middle");
        orgText.setAttribute("filter", "url(#text-glow-filter)");
        orgText.textContent = `ORG: ${star.name}`;
        
        // Origin glow filter
        const orgGlow1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        orgGlow1.setAttribute("cx", orgCenter.x);
        orgGlow1.setAttribute("cy", orgCenter.y);
        orgGlow1.setAttribute("r", "3");
        orgGlow1.setAttribute("fill", "#FF53E1");
        orgGlow1.setAttribute("filter", "url(#glow-filter)");
        
        const orgGlow2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        orgGlow2.setAttribute("cx", orgCenter.x);
        orgGlow2.setAttribute("cy", orgCenter.y);
        orgGlow2.setAttribute("r", "13");
        orgGlow2.setAttribute("fill", "#FF58E2");
        orgGlow2.setAttribute("filter", "url(#big-glow-filter)");
        
        const orgCenter1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        orgCenter1.setAttribute("cx", orgCenter.x);
        orgCenter1.setAttribute("cy", orgCenter.y);
        orgCenter1.setAttribute("r", "4");
        orgCenter1.setAttribute("fill", "white");
        
        // Create image element instead of path
        const orgSymbol = document.createElementNS("http://www.w3.org/2000/svg", "image");
        
        // Use the star-specific SVG icon with scale adjustment to make it 2px smaller
        const orgIconScale = 0.6; // Scale factor to make icon 2px smaller
        orgSymbol.setAttribute("transform", `scale(${orgIconScale}) translate(${(1-orgIconScale)*orgCenter.x/orgIconScale}, ${(1-orgIconScale)*orgCenter.y/orgIconScale})`);
        orgSymbol.setAttribute("href", getStarSymbolPath(star.id, orgCenter.x, orgCenter.y));
        // Set width and height to appropriate size
        orgSymbol.setAttribute("width", "13");
        orgSymbol.setAttribute("height", "13");
        orgSymbol.setAttribute("x", orgCenter.x - 6.5);
        orgSymbol.setAttribute("y", orgCenter.y - 6.5);
        
        const orgRing1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        orgRing1.setAttribute("cx", orgCenter.x);
        orgRing1.setAttribute("cy", orgCenter.y);
        orgRing1.setAttribute("r", "10");
        orgRing1.setAttribute("stroke", "#FFF");
        orgRing1.setAttribute("fill", "none");
        
        const orgRing3 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        orgRing3.setAttribute("cx", orgCenter.x);
        orgRing3.setAttribute("cy", orgCenter.y);
        orgRing3.setAttribute("r", "15");
        orgRing3.setAttribute("stroke", "#FF53E1");
        orgRing3.setAttribute("stroke-opacity", "0.4");
        orgRing3.setAttribute("fill", "none");
        
        // Create container for rotating rectangles
        const orgRotatingGroup = document.createElementNS("http://www.w3.org/2000/svg", "g");
        orgRotatingGroup.setAttribute("class", "org-rotating-group");
        
        // Create 25 rectangles arranged in an arc
        const totalRects = 20;
        const radius = 12; // Distance from center to rectangles
        const arcStart = -35; // Start angle in degrees
        const arcEnd = 90; // End angle in degrees
        const angleStep = (arcEnd - arcStart) / (totalRects - 1);
        const gapMultiplier = 1; // Increase this to create bigger gaps
        
        for (let i = totalRects; i > 0; i--) {
            const angle = (arcStart + i * angleStep * gapMultiplier) * (Math.PI / 180); // Convert to radians
            const rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
            
            // Calculate position on the arc
            const x = orgCenter.x + radius * Math.cos(angle);
            const y = orgCenter.y + radius * Math.sin(angle);
            
            // Set rectangle properties
            rect.setAttribute("x", x - 0.75); // Center the rectangle (half of width)
            rect.setAttribute("y", y - 2); // Center the rectangle
            rect.setAttribute("width", "1"); // Slightly thinner rectangles
            rect.setAttribute("height", "4");
            rect.setAttribute("fill", "#fff");
            rect.setAttribute("fill-opacity", "0");
            rect.setAttribute("transform", `rotate(${90 + (angle * 180 / Math.PI)} ${x} ${y})`); // Rotate rectangle to follow arc
            rect.setAttribute("class", "org-rotating-rect");
            
            orgRotatingGroup.appendChild(rect);
        }
        
        orgContent.appendChild(originFrame);
        orgContent.appendChild(orgText);
        orgContent.appendChild(orgGlow1);
        orgContent.appendChild(orgGlow2);
        orgContent.appendChild(orgCenter1);
        //orgContent.appendChild(orgSymbol);
        orgContent.appendChild(orgRing1);
        orgContent.appendChild(orgRing3);
        orgContent.appendChild(orgRotatingGroup);
        group.appendChild(orgContent);
        
        // Create destination content (initially hidden)
        const destContent = document.createElementNS("http://www.w3.org/2000/svg", "g");
        destContent.setAttribute("class", "dest-content");
        destContent.style.opacity = "0";
        destContent.style.visibility = "hidden";
        
        // const destFrame = document.createElementNS("http://www.w3.org/2000/svg", "image");
        // destFrame.setAttribute("href", "./src/assets/icons/destination.svg");
        // destFrame.setAttribute("width", "67.5");
        // destFrame.setAttribute("height", "67.5");
        // destFrame.setAttribute("x", destCenter.x - 33.75); // Center the frame (87/2)
        // destFrame.setAttribute("y", destCenter.y - 33.75); // Center the frame (79/2)

        const destTopLine = document.createElementNS("http://www.w3.org/2000/svg", "image");
        destTopLine.setAttribute("href", "https://cdn.prod.website-files.com/67f6e5eb787625b1298796e7/67febbfb7b088fe81ac2d751_topLine.svg");
        destTopLine.setAttribute("width", "15");
        destTopLine.setAttribute("height", "115.5");
        destTopLine.setAttribute("x", destCenter.x - 6.5);
        destTopLine.setAttribute("y", destCenter.y - 136);

        const destBottomLine = document.createElementNS("http://www.w3.org/2000/svg", "image");
        destBottomLine.setAttribute("href", "https://cdn.prod.website-files.com/67f6e5eb787625b1298796e7/67febbfb58642f016dd5bae3_bottomLine.svg");
        destBottomLine.setAttribute("width", "15");
        destBottomLine.setAttribute("height", "278");
        destBottomLine.setAttribute("x", destCenter.x - 6.5);
        destBottomLine.setAttribute("y", destCenter.y + 20  );

        const destRightLine = document.createElementNS("http://www.w3.org/2000/svg", "image");
        destRightLine.setAttribute("href", "https://cdn.prod.website-files.com/67f6e5eb787625b1298796e7/67febbfb267ab27769734c39_rightLine.svg");
        destRightLine.setAttribute("width", "1003");
        destRightLine.setAttribute("height", "15");
        destRightLine.setAttribute("x", destCenter.x - 77.5);
        destRightLine.setAttribute("y", destCenter.y - 7.5);

        const destLeftLine = document.createElementNS("http://www.w3.org/2000/svg", "image");
        destLeftLine.setAttribute("href", "https://cdn.prod.website-files.com/67f6e5eb787625b1298796e7/67febbfbfc9a7532b175a854_leftLine.svg");
        destLeftLine.setAttribute("width", "635");
        destLeftLine.setAttribute("height", "20");
        destLeftLine.setAttribute("x", destCenter.x - 655);
        destLeftLine.setAttribute("y", destCenter.y - 10);

        const destTopLeftBorder = document.createElementNS("http://www.w3.org/2000/svg", "image");
        destTopLeftBorder.setAttribute("href", "https://cdn.prod.website-files.com/67f6e5eb787625b1298796e7/67febbfb4eb10a592599ae84_topLeftBorder.svg");
        destTopLeftBorder.setAttribute("width", "14");
        destTopLeftBorder.setAttribute("height", "15");
        destTopLeftBorder.setAttribute("x", destCenter.x - 22);
        destTopLeftBorder.setAttribute("y", destCenter.y - 22);

        const destTopRightBorder = document.createElementNS("http://www.w3.org/2000/svg", "image");
        destTopRightBorder.setAttribute("href", "https://cdn.prod.website-files.com/67f6e5eb787625b1298796e7/67febbfc1d230362ec217161_topRightBorder.svg");
        destTopRightBorder.setAttribute("width", "14");
        destTopRightBorder.setAttribute("height", "15");
        destTopRightBorder.setAttribute("x", destCenter.x + 8.5);
        destTopRightBorder.setAttribute("y", destCenter.y - 22);

        const destBottomLeftBorder = document.createElementNS("http://www.w3.org/2000/svg", "image");
        destBottomLeftBorder.setAttribute("href", "https://cdn.prod.website-files.com/67f6e5eb787625b1298796e7/67febbfb299352b261ce35da_bottomLeftBorder.svg");
        destBottomLeftBorder.setAttribute("width", "14");
        destBottomLeftBorder.setAttribute("height", "15");
        destBottomLeftBorder.setAttribute("x", destCenter.x - 22);
        destBottomLeftBorder.setAttribute("y", destCenter.y + 8);

        const destBottomRightBorder = document.createElementNS("http://www.w3.org/2000/svg", "image");
        destBottomRightBorder.setAttribute("href", "https://cdn.prod.website-files.com/67f6e5eb787625b1298796e7/67febbfb186891d1267e764c_bottomRightBorder.svg");
        destBottomRightBorder.setAttribute("width", "14");
        destBottomRightBorder.setAttribute("height", "15");
        destBottomRightBorder.setAttribute("x", destCenter.x + 8.5);
        destBottomRightBorder.setAttribute("y", destCenter.y + 8);
        
        const destText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        destText.setAttribute("x", destCenter.x);
        destText.setAttribute("y", destCenter.y - 35);
        destText.setAttribute("fill", "rgba(255, 255, 255, 0.60)");
        destText.setAttribute("font-family", "Raleway, sans-serif");
        destText.setAttribute("font-size", "9px");
        destText.setAttribute("font-weight", "500");
        destText.setAttribute("letter-spacing", "0.18px");
        destText.setAttribute("filter", "url(#text-glow-filter)");
        destText.setAttribute("text-anchor", "middle");
        destText.textContent = `DEST_${star.name}`;
        
        // Create more complex destination graphics
        const destGlow1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        destGlow1.setAttribute("cx", destCenter.x);
        destGlow1.setAttribute("cy", destCenter.y);
        // Adjust size based on star ID
        const isSmallerDest = ['star1', 'star4', 'star5', 'star7'].includes(star.id);
        const glow1Radius = isSmallerDest ? "3.05" : "4.05";
        destGlow1.setAttribute("r", "3");
        destGlow1.setAttribute("fill", "white");
        destGlow1.setAttribute("filter", "url(#glow-filter)");
        
        const destGlow2 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        destGlow2.setAttribute("cx", destCenter.x);
        destGlow2.setAttribute("cy", destCenter.y);
        const glow2Radius = isSmallerDest ? "7.18" : "9.18";
        destGlow2.setAttribute("r", "13");
        destGlow2.setAttribute("fill", "#FF58E2");
        destGlow2.setAttribute("filter", "url(#big-glow-filter)");
        
        const destCenter1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        destCenter1.setAttribute("cx", destCenter.x);
        destCenter1.setAttribute("cy", destCenter.y);
        const centerRadius = isSmallerDest ? "3.5" : "4.5";
        destCenter1.setAttribute("r", "4");
        destCenter1.setAttribute("fill", "white");
        
        // Create image element instead of path
        const destSymbol = document.createElementNS("http://www.w3.org/2000/svg", "image");
        
        // Use the star-specific SVG icon
        destSymbol.setAttribute("href", getStarSymbolPath(star.id, destCenter.x, destCenter.y));
        // Set width and height to appropriate size
        const symbolSize = isSmallerDest ? "9" : "10";
        destSymbol.setAttribute("width", symbolSize);
        destSymbol.setAttribute("height", symbolSize);
        destSymbol.setAttribute("x", destCenter.x - (symbolSize/2));
        destSymbol.setAttribute("y", destCenter.y - (symbolSize/2));
        
        const destRing1 = document.createElementNS("http://www.w3.org/2000/svg", "circle");
        destRing1.setAttribute("cx", destCenter.x);
        destRing1.setAttribute("cy", destCenter.y);
        const ring1Radius = isSmallerDest ? "8.174" : "10.174";
        destRing1.setAttribute("r", "14");
        destRing1.setAttribute("stroke", "#FFF");
        destRing1.setAttribute("fill", "none");
        
        destContent.appendChild(destTopLeftBorder);
        destContent.appendChild(destTopRightBorder);
        destContent.appendChild(destBottomLeftBorder);
        destContent.appendChild(destBottomRightBorder);
        destContent.appendChild(destTopLine);
        destContent.appendChild(destBottomLine);
        destContent.appendChild(destRightLine);
        destContent.appendChild(destLeftLine);
        destContent.appendChild(destText);
        destContent.appendChild(destGlow1);
        destContent.appendChild(destGlow2);
        destContent.appendChild(destCenter1);
        //destContent.appendChild(destSymbol);
        destContent.appendChild(destRing1);
        
        group.appendChild(destContent);
        container.appendChild(group);
        
        // Add click event to star for manual selection
        group.addEventListener('click', () => {
          // Find current index of this star
          const clickedIndex = parseInt(group.getAttribute('data-index'));
          
          // If this star is already org or dest, do nothing
          if (clickedIndex === currentOrg || clickedIndex === currentDest) {
            return;
          }
          
          // Stop current animation timeline
          if (window.currentTimeline) {
            window.currentTimeline.kill();
          }
          
          // Set this star as the new destination
          previousOrg = currentOrg;
          previousDest = currentDest;
          currentDest = clickedIndex;
          
          // Run the animation cycle
          animateCycle();
        });

        // Initialize first org and dest
        if(index === currentOrg) {
          orgContent.style.visibility = "visible";
          orgContent.style.opacity = "1";
          starCircle.style.opacity = "0";
        }
        
        if(index === currentDest) {
          destContent.style.visibility = "visible";
          destContent.style.opacity = "1";
          starCircle.style.opacity = "0";
        }
      });
      
      gsap.to('.dest-content circle[stroke-dasharray]', {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 20,
        repeat: -1,
        ease: "linear"
        });

        gsap.to('.org-content circle[stroke-dasharray]', {
        rotation: 360,
        transformOrigin: "50% 50%",
        duration: 20,
        repeat: -1,
        ease: "linear"
        });

    }
    
    // Create navigation paths between stars
    function createNavigationPaths() {
      // Get origin and destination positions
      const orgStar = starSystems[currentOrg];
      const destStar = starSystems[currentDest];
      
      // Set main navigation line
      const navLine = document.querySelector(".nav-line path");
      navLine.style.opacity = "0";
      
      // Calculate absolute positions for connection points
      const orgX = orgStar.x + orgCenter.x;
      const orgY = orgStar.y + orgCenter.y;
      const destX = destStar.x + destCenter.x;
      const destY = destStar.y + destCenter.y;
      
      // Fixed starting point for navigation (530x, 430y)
      const startX = 530;
      const startY = 430;
      
      // Calculate the key distances and angles for better path planning
      const startToOrgDist = Math.sqrt(Math.pow(orgX - startX, 2) + Math.pow(orgY - startY, 2));
      const orgToDestDist = Math.sqrt(Math.pow(destX - orgX, 2) + Math.pow(destY - orgY, 2));
      const totalDist = Math.sqrt(Math.pow(destX - startX, 2) + Math.pow(destY - startY, 2));
      
      // Calculate the overall path direction
      const dirX = destX - startX;
      const dirY = destY - startY;
      const angle = Math.atan2(dirY, dirX);
      
      // Calculate perpendicular vector for S-curve
      const perpX = Math.cos(angle + Math.PI/2);
      const perpY = Math.sin(angle + Math.PI/2);
      
      // Calculate curve intensity based on total distance but constrained
      const svg = document.querySelector('svg');
      const svgWidth = svg.viewBox.baseVal.width;
      const maxCurveIntensity = svgWidth * 0.02; // Reduced from 0.15 to 0.08
      const curveIntensity = Math.min(totalDist * 0.02, maxCurveIntensity); // Reduced from 0.25 to 0.15
      
      // Calculate control points for a more contained S curve
      // First curve - upper part of S
      const ctrl1X = startX + dirX * 0.3 + perpX * curveIntensity;
      const ctrl1Y = startY + dirY * 0.3 + perpY * curveIntensity;
      
      const ctrl2X = startX + dirX * 0.4 + perpX * curveIntensity;
      const ctrl2Y = startY + dirY * 0.4 + perpY * curveIntensity;
      
      // Second curve - lower part of S
      const ctrl3X = startX + dirX * 0.6 - perpX * curveIntensity;
      const ctrl3Y = startY + dirY * 0.6 - perpY * curveIntensity;
      
      const ctrl4X = startX + dirX * 0.7 - perpX * curveIntensity;
      const ctrl4Y = startY + dirY * 0.7 - perpY * curveIntensity;
      
      // Create a single fluid S curve
      const pathString = `
        M ${startX} ${startY}
        C ${ctrl1X} ${ctrl1Y}, ${ctrl2X} ${ctrl2Y}, ${orgX} ${orgY}
        S ${ctrl4X} ${ctrl4Y}, ${destX} ${destY}
      `.trim().replace(/\s+/g, ' ');
      
      navLine.setAttribute("d", pathString);
      navLine.setAttribute("stroke-width", "2");
      navLine.setAttribute("filter", "url(#navLine-glow) url(#navLine-brush)");
      navLine.setAttribute("stroke-linecap", "round");
      navLine.setAttribute("opacity", "1");
      
      // Add data package images along the navLine
      // Remove previous data packages if they exist
      const existingPackages = document.querySelectorAll(".data-package");
      existingPackages.forEach(pkg => pkg.remove());
      
      // Create container for data packages if it doesn't exist
      let dataPackageContainer = document.querySelector(".data-packages");
      if (!dataPackageContainer) {
        dataPackageContainer = document.createElementNS("http://www.w3.org/2000/svg", "g");
        dataPackageContainer.setAttribute("class", "data-packages");
        document.querySelector("svg").appendChild(dataPackageContainer);
      } else {
        dataPackageContainer.innerHTML = '';
      }
      
      // Create 3 data packages placed at different positions along the main path
      const dataPackagePositions = [0.25, 0.5, 0.75]; // Positions along the path (0 to 1)
      
      // Create only 2 data packages (removed the first one)
      dataPackagePositions.slice(1, 3).forEach((_, index) => {

        const dataPackageText = document.createElementNS("http://www.w3.org/2000/svg", "text");
        dataPackageText.setAttribute("class", "data-package-text");
        dataPackageText.setAttribute("text-anchor", "middle");
        dataPackageText.setAttribute("y", "0");
        dataPackageText.setAttribute("fill", "white");
        dataPackageText.setAttribute("font-family", "Raleway, sans-serif");
        dataPackageText.setAttribute("font-size", "12px");
        dataPackageText.setAttribute("font-weight", "500");
        dataPackageText.setAttribute("filter", "url(#text-glow-filter)");
        dataPackageText.setAttribute("position", "absolute");
        dataPackageText.setAttribute("top", "-10");
        dataPackageText.textContent = validCombinations[currentCombinationIndex].dataPackage;
        
        const animationDuration = 1000; // Duration in milliseconds for fade transition
        const displayDuration = 3000; // Duration to display each headline
        const element = document.querySelector(".data-package-hero-text");
        // Start the animation cycle
        setInterval(function() {
          // Fade out
          element.style.transition = `opacity ${animationDuration/2}ms ease-out`;
          element.style.opacity = 0;
          
          setTimeout(function() {
            // Update text while invisible
            element.textContent = validCombinations[currentCombinationIndex].headline;
            
            // Fade in
            element.style.transition = `opacity ${animationDuration/2}ms ease-in`;
            element.style.opacity = 1;
          }, animationDuration/2);
          
        }, displayDuration + animationDuration);
      
        // Create the data package image for main path
        const dataPackage = document.createElementNS("http://www.w3.org/2000/svg", "image");
        dataPackage.setAttribute("class", `data-package `);
        dataPackage.setAttribute("href", "https://cdn.prod.website-files.com/67f6e5eb787625b1298796e7/67f7e6deb5e2dad989aac0d6_fd4bc82957cd54b5948ae2b3127da3c3_Data%20Package.svg");
        dataPackage.setAttribute("width", "27");
        dataPackage.setAttribute("height", "27");

        const dataPackageWrapper = document.createElementNS("http://www.w3.org/2000/svg", "g");
        dataPackageWrapper.setAttribute("class", `data-package-wrapper main-data-package-${index}`);
        dataPackageWrapper.setAttribute("opacity", `0`);
        dataPackageWrapper.setAttribute("display", `flex`);
        dataPackageWrapper.setAttribute("align-items", `center`);
        dataPackageWrapper.setAttribute("direction", `row`);
        
        // Add to container
        dataPackageWrapper.appendChild(dataPackageText);
        dataPackageWrapper.appendChild(dataPackage);
        dataPackageContainer.appendChild(dataPackageWrapper);
      });
      
      // Update the gradient for the line
      const navGradient = document.getElementById("navGradient");
      navGradient.setAttribute("x1", startX);
      navGradient.setAttribute("y1", startY);
      navGradient.setAttribute("x2", destX);
      navGradient.setAttribute("y2", destY);
      
      // Create split lines to random stars with enhanced visual appeal
      const splitLinesContainer = document.querySelector(".split-lines");
      splitLinesContainer.innerHTML = '';
      
      // Find 3 random stars that are not org or dest
      const availableStars = starSystems.filter((_, index) => 
        index !== currentOrg && index !== currentDest
      );
      
       // Sort available stars by distance from destination
      availableStars.sort((a, b) => {
        const distA = Math.sqrt(Math.pow(a.x - destStar.x, 2) + Math.pow(a.y - destStar.y, 2));
        const distB = Math.sqrt(Math.pow(b.x - destStar.x, 2) + Math.pow(b.y - destStar.y, 2));
        return distA - distB;
      });
      
      // Take the 3 closest stars
      const splitCount = Math.min(3, availableStars.length);
      const nearestStars = availableStars.slice(0, splitCount);
      
      // Enhanced visual arrangement for split lines
      // Use the golden angle (137.5°) for optimal visual distribution
      const goldenAngle = 2.4; // ~137.5 degrees in radians
      
      for (let i = 0; i < splitCount; i++) {
        const targetStar = nearestStars[i];
        
        // Connect from dest center to target star center
        const targetX = targetStar.x + starCenter.x;
        const targetY = targetStar.y + starCenter.y;
        
        // Calculate base vector and distance
        const dx = targetX - destX;
        const dy = targetY - destY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const baseAngle = Math.atan2(dy, dx);
        
        // Use golden angle distribution for control points
        const offsetAngle = baseAngle + (i * goldenAngle * 0.15);
        
        // Create optimized control point with visual balance
        const ctrlDist = Math.min(distance * 0.5, 120);
        const ctrlX = destX + Math.cos(offsetAngle) * ctrlDist;
        const ctrlY = destY + Math.sin(offsetAngle) * ctrlDist - 20; // Slight upward bias
        
        // Create the beautifully curved path
        const splitPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
        splitPath.setAttribute("class", "split-line");
        splitPath.setAttribute("d", `M${destX} ${destY} Q${ctrlX} ${ctrlY}, ${targetX} ${targetY}`);
        splitPath.setAttribute("stroke", "#FF53E1");
        splitPath.setAttribute("stroke-width", "1");
        splitPath.setAttribute("stroke-linecap", "round");
        
        // Save path length for animation
        const splitLength = splitPath.getTotalLength();
        splitPath.setAttribute("stroke-dasharray", splitLength);
        splitPath.setAttribute("stroke-dashoffset", splitLength);
        splitPath.style.opacity = "0";
        
        splitLinesContainer.appendChild(splitPath);
      }
    }
    
    // Animate cycle of navigation
    function animateCycle() {
      // Create a timeline for the entire cycle
      const tl = gsap.timeline({
        onComplete: function() {
          // Create fade-out animation
          const fadeOutTl = gsap.timeline({
            onComplete: function() {
              // Show basic star for current org and dest
              const currentOrgStar = document.querySelector(`#${starSystems[currentOrg].id} .star-circle`);
              const currentDestStar = document.querySelector(`#${starSystems[currentDest].id} .star-circle`);
              
              // Fade in basic stars and immediately start next cycle
              gsap.to([currentOrgStar, currentDestStar], {
                opacity: 1,
                duration: 0.3,
                onComplete: function() {
                  rotateSystems();
                  animateCycle();
                }
              });
            }
          });

          // Fade out everything together
          fadeOutTl.to([
            ".data-package",
            ".nav-line path",
            ".split-line",
            `#${starSystems[currentOrg].id} .org-content`,
            `#${starSystems[currentDest].id} .dest-content`
          ], {
            opacity: 0,
            duration: 0.5,
            ease: "power1.inOut"
          });
        }
      });
      
      window.currentTimeline = tl;
      
      // Reset previous org and dest displays if they exist
      if (previousOrg !== null && previousDest !== null) {
        // Fade out previous org and dest content together
        const prevOrgSelector = `#${starSystems[previousOrg].id} .org-content`;
        const prevDestSelector = `#${starSystems[previousDest].id} .dest-content`;
        const prevOrgStarSelector = `#${starSystems[previousOrg].id} .star-circle`;
        const prevDestStarSelector = `#${starSystems[previousDest].id} .star-circle`;

        // Fade out both previous contents
        tl.to([prevOrgSelector, prevDestSelector], {
          opacity: 0,
          duration: 0.75
        });

        // Hide both previous contents
        tl.set([prevOrgSelector, prevDestSelector], { 
          visibility: "hidden" 
        });

        // Show and fade in both previous stars
        tl.set(prevOrgStarSelector, {
          visibility: "visible"
        });
        tl.to(prevOrgStarSelector, {
          opacity: 1,
          duration: 0.75
        });
      }
      
      // Update navigation paths
      createNavigationPaths();
      
      const orgStarSelector = `#${starSystems[currentOrg].id} .star-circle`;
      const orgContentSelector = `#${starSystems[currentOrg].id} .org-content`;
      const destStarSelector = `#${starSystems[currentDest].id} .star-circle`;
      const destContentSelector = `#${starSystems[currentDest].id} .dest-content`;

      // First hide and show origin content
      tl.to(orgStarSelector, {
        opacity: 0,
        duration: 0.75
      });

      tl.set(orgContentSelector, { 
        visibility: "visible" 
      });
      tl.to(orgContentSelector, {
        opacity: 1,
        duration: 0.75
      });

      // Then handle destination content
      tl.to(destStarSelector, {
        opacity: 0,
        duration: 0.75
      }, ">");

      tl.set(destContentSelector, { 
        visibility: "visible" 
      });
      tl.to(destContentSelector, {
        opacity: 1,
        duration: 0.75
      });
      
      // Animate the main navigation line with a refined, elegant approach
      const mainNavLine = document.querySelector(".nav-line path");
      const mainNavLineLength = mainNavLine.getTotalLength();
      
      // Initialize the line
      tl.set(mainNavLine, {
        strokeDasharray: mainNavLineLength,
        strokeDashoffset: mainNavLineLength,
        opacity: 0.9,
        attr: {
          filter: "none" // Ensure no blur effect initially
        }
      });
      
      // Create a more refined, elegant line drawing animation
      tl.to(mainNavLine, {
        strokeDashoffset: 0,
        duration: 2.5, // Slightly longer for more fluid motion
        ease: "power2.inOut", // Smoother easing
        onUpdate: function() {
          // Dynamic width adjustment during draw for added visual depth
          const progress = 1 - (mainNavLine.style.strokeDashoffset.replace('px', '') / mainNavLineLength);
          if (progress > 0.1 && progress < 0.9) {
            // Subtle width increase during main drawing phase
            mainNavLine.setAttribute("stroke-width", 2);
          }
        }
      }, "mainNav"); // Add label 'mainNav' for referencing in other animations
      
      // Create a subtle, elegant pulse after drawing completes
      tl.to(mainNavLine, {
        strokeWidth: 2,
        opacity: 1,
        duration: 0.8,
        ease: "sine.inOut",
        yoyo: true,
        repeat: 1
      });
      
      // Create a label for when the connection is fully established
      tl.addLabel("connectionComplete", ">");
      
      // Animate split lines with improved staggered timing and refined motion
      const splitLines = document.querySelectorAll(".split-line");
      
      // Staged reveal of split lines for better visual hierarchy
      tl.to(splitLines, {
        opacity: 0.3,
        duration: 0.4,
        stagger: {
          amount: 0.3,
          from: "start"
        }
      }, "connectionComplete-=0.4");
      
      // Elegant drawing animation for each split line
      tl.to(splitLines, {
        strokeDashoffset: 0,
        duration: 1.2,
        ease: "power3.out",
        stagger: {
          amount: 0.3,
          from: "start"
        }
      }, "-=0.4");
      
      // Fade out split lines at the end
      tl.to(splitLines, {
        opacity: 0.3,
        duration: 0.7,
        ease: "power1.inOut"
      }, "+=0.2");
      
      // Complete connection label - after main line AND split lines are fully drawn
      tl.addLabel("fullConnectionComplete", ">");
      
      // Animate the rotating rectangles one by one
      const rotatingRects = document.querySelectorAll(`#${starSystems[currentOrg].id} .org-rotating-rect`);
      rotatingRects.forEach((rect, index) => {
        tl.to(rect, {
          fillOpacity: .9,
          duration: 0,
          delay: 0.1,
          ease: "power1.Out"
        });
      });
      
      // Create a label for data package animations to start after full connection
      tl.addLabel("dataPackages", "fullConnectionComplete+=0.2");
      
      // Animate main data packages along the navigation line
      const mainPackages = document.querySelectorAll(".main-data-package-0, .main-data-package-1");
      const navPath = document.querySelector(".nav-line path");
      
      // Get the current org star's position
      const orgStar = starSystems[currentOrg];
      const orgStartX = orgStar.x;
      const orgStartY = orgStar.y;
      
      // Position and animate each main data package along the path
      mainPackages.forEach((pkg, index) => {
        // Position the package at the org symbol position
        tl.set(pkg, {
          x: orgStartX , // Center the data package (half of width)
          y: orgStartY , // Center the data package (half of height)
          opacity: 1, // Start fully visible
          scale: 0.8, // Start at normal scale
          rotation: Math.random() * 30 - 15 // Random rotation between -15 and 15 degrees
        }, `dataPackages+=${index + 2}`);
        
        // For the first package (medium speed to dest)
        if (index === 0) {
          tl.to(pkg, {
            motionPath: {
              path: navPath,
              align: navPath,
              alignOrigin: [0.5, 0.5],
              start: 0.40, // Start from org position (approximately 1/3 of the path)
              end: 1 // End at dest
            },
            duration: 2.0, // Medium speed package
            ease: "power1.inOut",
            onUpdate: function() {
              const progress = this.progress();
              if (progress > 0.8) { // Only fade out near the end
                pkg.setAttribute("opacity", 1 - (progress - 0.8) * 5); // Fade out in last 20%
              }
            }
          });
          
          // Fade out at destination
          tl.to(pkg, {
            opacity: 0,
            scale: 1.2, 
            duration: 0.3,
            ease: "power3.in"
          }, `>-0.2`);
        }
        // For the second package (slower speed to dest)
        else if (index === 1) {
          tl.to(pkg, {
            motionPath: {
              path: navPath,
              align: navPath,
              alignOrigin: [0.5, 0.5],
              start: 0.4, // Start from org position (approximately 1/3 of the path)
              end: 1
            },
            duration: 2.8, // Slowest package
            ease: "power1.inOut",
            onUpdate: function() {
              const progress = this.progress();
              if (progress > 0.8) { // Only fade out near the end
                pkg.setAttribute("opacity", 1 - (progress - 0.8) * 5); // Fade out in last 20%
              }
            }
          });
          
          // Fade out at destination
          tl.to(pkg, {
            opacity: 0,
            scale: 1.2, 
            duration: 0.3,
            ease: "power3.in"
          }, `>-0.2`);
        }
      });
      // Reset rotating rectangles
      const resetRotatingRects = document.querySelectorAll(`#${starSystems[currentOrg].id} .org-rotating-rect`);
      rotatingRects.forEach((rect, index) => {
        tl.to(rect, {
          fillOpacity: 0,
          duration: 0,
          delay: 0.1,
          ease: "power1.Out"
        });
      });
      return tl;
    }
    
    // Modified rotateSystems function to use valid combinations
    function rotateSystems() {
      previousOrg = currentOrg;
      previousDest = currentDest;

      const nextCombination = getNextCombination();
      
      // Find indices for the next combination
      currentOrg = starSystems.findIndex(star => star.id === nextCombination.org);
      currentDest = starSystems.findIndex(star => star.id === nextCombination.dest);
    }
    
    // Initialize everything
    function init() {
      createStarSystems();
      createNavigationPaths();
      
      // Set up color gradient for destination ring
      const destRingGradient = document.getElementById("dest-ring-gradient");
      destRingGradient.setAttribute("x1", destCenter.x + 16);
      destRingGradient.setAttribute("y1", destCenter.y - 6);
      destRingGradient.setAttribute("x2", destCenter.x - 12);
      destRingGradient.setAttribute("y2", destCenter.y - 6);
      
      // Simplified initialization with faster star reveal
      const initialTl = gsap.timeline();
      
      // Quickly reveal all star systems
      initialTl.to(".star-system", {
        duration: 0.8,
        opacity: 1,
        stagger: {
          each: 0.1,
          from: "random",
          amount: 0.5
        },
        ease: "power1.out"
      }, 0.2)
      .call(() => {
        animateCycle();
      }, null, "+=0.2");
    }
    
    // Start when page loads
    window.addEventListener('load', init);

    function createStarSVGPath(x, y, starId) {
      // Calculate adjusted coordinates
      const adjustedX = x;
      const adjustedY = y;
      
      // Define which icon to use based on starId
      const iconMap = {
        'star1': 'BASE',
        'star2': 'SOLANA',
        'star3': 'POLYGON',
        'star4': 'ETHEREUM',
        'star5': 'BNB CHAIN',
        'star6': 'ARBITRUM',
        'star7': 'STARKNET',
        'star8': 'CELESTIA',
        'star9': 'BASE'
      };
      
      // Default to Hyperlane's own icon if the star ID is not recognized
      const iconName = iconMap[starId] || 'ETHEREUM';
      
      // Build the image element
      const iconElement = document.createElementNS("http://www.w3.org/2000/svg", "image");
      iconElement.setAttribute("href", `./src/assets/icons/${iconName}.svg`);
      
      // Set size and position attributes
      iconElement.setAttribute("width", "10");
      iconElement.setAttribute("height", "10");
      iconElement.setAttribute("x", adjustedX - 5);
      iconElement.setAttribute("y", adjustedY - 5);
      
      return iconElement;
    }
    
    
    // code for general functionality 
		// JavaScript Part - Handling both hover and click with animations
    document.addEventListener('DOMContentLoaded', function() {
      // Get all the columns
      const columns = document.querySelectorAll('.section-architecture-main-content-col');

      // Animation function using requestAnimationFrame
      function animate(element, start, end, duration) {
        const startTime = performance.now();

        function update(currentTime) {
          const elapsedTime = currentTime - startTime;

          if (elapsedTime >= duration) {
            element.style.opacity = end;
            return;
          }

          const progress = elapsedTime / duration;
          const currentOpacity = start + (end - start) * progress;
          element.style.opacity = currentOpacity;

          requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
      }

      // Animate loader width
      function animateLoader(loader, toWidth, duration) {
        const startTime = performance.now();
        const startWidth = parseInt(getComputedStyle(loader).width) || 0;
        const endWidth = loader.parentElement.offsetWidth * (toWidth / 100);

        function update(currentTime) {
          const elapsedTime = currentTime - startTime;

          if (elapsedTime >= duration) {
            loader.style.width = `${toWidth}%`;
            return;
          }

          const progress = elapsedTime / duration;
          const currentWidth = startWidth + (endWidth - startWidth) * progress;
          loader.style.width = `${currentWidth}px`;

          requestAnimationFrame(update);
        }

        requestAnimationFrame(update);
      }

      // Add hover event listeners to each column
      columns.forEach(column => {
        // Mouse enter (hover) event
        column.addEventListener('mouseenter', function() {
          // Don't change opacity if it's already active (clicked)
          if (!this.classList.contains('active')) {
            animate(this, 0.4, 0.8, 500); // 0.5s animation
          }
        });

        // Mouse leave (hover out) event
        column.addEventListener('mouseleave', function() {
          // Reset to default opacity if not active (clicked)
          if (!this.classList.contains('active')) {
            animate(this, 0.8, 0.4, 500); // 0.5s animation
          }
        });

        // Click event
        column.addEventListener('click', function() {
          // Remove active class from all columns and animate opacity
          columns.forEach(col => {
            col.classList.remove('active');
            if (col !== this) {
              animate(col, parseFloat(col.style.opacity || 0.4), 0.4, 500);
            }
						
            // Find the image in this column and reset its opacity
            const imageClass = col.classList.contains('col-send') ? '.architecture-image.send.desktop' : 
                               col.classList.contains('col-extend') ? '.architecture-image.extend.desktop' : 
                               '.architecture-image.participate.desktop';
            
            const image = document.querySelector(imageClass);
            if (image) {
              animate(image, parseFloat(this.style.opacity || 0.0), 0.0, 500);
            }

            // Find the loader in this column and reset its width
            const loaderClass = col.classList.contains('col-send') ? '.loader-container-send' : 
                               col.classList.contains('col-extend') ? '.loader-container-extend' : 
                               '.loader-container-participate';
						
            const loader = document.querySelector(loaderClass);
            if (loader) {
              animateLoader(loader, 0, 500); // Reset loader width with animation
            }
          });

          // Add active class to clicked column and animate opacity
          this.classList.add('active');
          animate(this, parseFloat(this.style.opacity || 0.4), 1.0, 500);

						// Find the image in this column and reset its opacity
            const imageClass = this.classList.contains('col-send') ? '.architecture-image.send.desktop' : 
                               this.classList.contains('col-extend') ? '.architecture-image.extend.desktop' : 
                               '.architecture-image.participate.desktop';
            
            const image = document.querySelector(imageClass);
            if (image) {
              animate(image, parseFloat(this.style.opacity || 0.0), 1, 500);
            }

          // Find the loader in this column and set its width to 100%
          const loaderClass = this.classList.contains('col-send') ? '.loader-container-send' : 
                             this.classList.contains('col-extend') ? '.loader-container-extend' : 
                             '.loader-container-participate';
          const loader = document.querySelector(loaderClass);
          if (loader ) {
            animateLoader(loader, 100, 500); // Animate to 100% width
          }
        });
      });
    });
  
    document.addEventListener('DOMContentLoaded', function () {
      // Get loader elements
      const loader1 = document.querySelector('.loader-1');
      const loader2 = document.querySelector('.loader-2');
      const loader3 = document.querySelector('.loader-3');
      
      // Get sections and case study elements
      const sectionFooter = document.querySelector('.section-casestudy-main-footer');
      const section1 = document.querySelector('.section-casestudy-1');
      const section2 = document.querySelector('.section-casestudy-2');
      const section3 = document.querySelector('.section-casestudy-3');
      const caseStudy1 = document.querySelector('.casestudy-1');
      const caseStudy2 = document.querySelector('.casestudy-2');
      const caseStudy3 = document.querySelector('.casestudy-3');
      
      // Animation control variables
      let animationId;
      let startTime;
      let paused = false;
      let elapsedWhenPaused = 0;
      let duration = 6000; // Animation duration in ms
      let currentSection = 1; // Track current active section
      
      // Add transitions to loaders
      if (loader1) loader1.style.transition = 'width 1s ease, opacity 0.3s ease';
      if (loader2) loader2.style.transition = 'width 1s ease, opacity 0.3s ease';
      if (loader3) loader3.style.transition = 'width 1s ease, opacity 0.3s ease';
    
      // Check if all required elements exist
      if (!loader1 || !loader2 || !loader3) {
        console.error('Loader elements not found');
        return;
      }
      
      if (!section1 || !section2 || !section3) {
        console.error('Section elements not found');
        return;
      }
      
      if (!caseStudy1 || !caseStudy2 || !caseStudy3) {
        console.error('Case study elements not found');
        return;
      }
    
      // Function to update UI based on current section
      function updateUI(section) {
        // Reset all sections and case studies
        section1.style.opacity = '100%';
        section2.style.opacity = '40%';
        section3.style.opacity = '40%';
        
        // Update loaders based on current section
        if (section === 1) {
          loader1.style.width = '100%';
          loader1.style.opacity = '1';
          loader2.style.width = '0%';
          loader3.style.width = '0%';
          section1.style.opacity = '100%';
          section2.style.opacity = '40%';
          section3.style.opacity = '40%';
          showCaseStudy(1);
        } 
        else if (section === 2) {
          loader1.style.width = '100%';
          loader1.style.opacity = '0';
          loader2.style.width = '100%';
          loader2.style.opacity = '1';
          loader3.style.width = '0%';
          section1.style.opacity = '40%';
          section2.style.opacity = '100%';
          section3.style.opacity = '40%';
          showCaseStudy(2);
        } 
        else if (section === 3) {
          loader1.style.width = '100%';
          loader1.style.opacity = '0';
          loader2.style.width = '100%';
          loader2.style.opacity = '0';
          loader3.style.width = '100%';
          loader3.style.opacity = '1';
          section1.style.opacity = '40%';
          section2.style.opacity = '40%';
          section3.style.opacity = '100%';
          loader1.style.width = '0%';
          
          showCaseStudy(3);
        }
      }
      
      // Function to show specific case study and hide others
      function showCaseStudy(num) {
        // Hide all case studies first
        caseStudy1.style.opacity = '0';
        caseStudy2.style.opacity = '0';
        caseStudy3.style.opacity = '0';
        
        // After a short delay, change display property and show the selected one
        setTimeout(() => {
          caseStudy2.style.display = num === 2 ? 'block' : 'none';
          caseStudy3.style.display = num === 3 ? 'block' : 'none';
          
          // Show the selected case study
          if (num === 1) caseStudy1.style.opacity = '1';
          if (num === 2) caseStudy2.style.opacity = '1';
          if (num === 3) caseStudy3.style.opacity = '1';
        }, 300);
      }
    
      // Animation loop function
      function animateLoaders(currentTime) {
        if (!startTime) startTime = currentTime - elapsedWhenPaused;
        const elapsed = currentTime - startTime;
        
        // Calculate which section should be active based on elapsed time
        const totalCycle = duration * 3; // Total time for all 3 sections
        const cyclePosition = (elapsed % totalCycle) / duration;
        
        // Determine current section (1, 2, or 3)
        const newSection = Math.floor(cyclePosition) + 1;
        
        // Only update UI if section changed
        if (newSection !== currentSection) {
          currentSection = newSection > 3 ? 1 : newSection;
          updateUI(currentSection);
        }
        
        // Continue animation if not paused
        if (!paused) {
          animationId = requestAnimationFrame(animateLoaders);
        }
      }
    
      // Start the animation
      function startAnimation() {
        if (!paused) {
          startTime = null;
          elapsedWhenPaused = 0;
          animationId = requestAnimationFrame(animateLoaders);
        }
      }
    
      // Pause the animation
      function pauseAnimation() {
        if (!paused) {
          paused = true;
          cancelAnimationFrame(animationId);
          elapsedWhenPaused = performance.now() - (startTime || performance.now());
        }
      }
    
      // Resume the animation
      function resumeAnimation() {
        if (paused) {
          paused = false;
          animationId = requestAnimationFrame(animateLoaders);
        }
      }
    
      // Handle section hover
      function handleSectionHover(sectionNum) {
        pauseAnimation();
        updateUI(sectionNum);
      }
    
      // Set up hover events
      section1.addEventListener('mouseenter', () => handleSectionHover(1));
      section2.addEventListener('mouseenter', () => handleSectionHover(2));
      section3.addEventListener('mouseenter', () => handleSectionHover(3));
      
      // Set up mouseleave event to resume animation
      const sections = [section1, section2, section3];
      sections.forEach(section => {
        section.addEventListener('mouseleave', resumeAnimation);
      });
    
      // Intersection Observer to start/pause animation when section is in viewport
      const observer = new IntersectionObserver(function (entries) {
        if (entries[0].isIntersecting) {
          resumeAnimation();
        } else {
          pauseAnimation();
        }
      }, { threshold: 0.2 });
    
      if (sectionFooter) {
        observer.observe(sectionFooter);
      }
    
      // Initial setup
      caseStudy1.style.display = 'block';
      caseStudy1.style.opacity = '1';
      caseStudy2.style.display = 'none';
      caseStudy2.style.opacity = '0';
      caseStudy3.style.display = 'none';
      caseStudy3.style.opacity = '0';
    
      // Add transitions
      [caseStudy1, caseStudy2, caseStudy3].forEach(caseStudy => {
        caseStudy.style.transition = 'opacity 0.3s ease';
      });
    
      [section1, section2, section3].forEach(section => {
        section.style.transition = 'opacity 0.3s ease';
      });
    
      // Check if element is in viewport
      function isElementInViewport(el) {
        if (!el) return false;
        
        const rect = el.getBoundingClientRect();
        return (
          rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
          rect.bottom >= 0
        );
      }
    
      // Start animation if section is in viewport
      if (isElementInViewport(sectionFooter)) {
        startAnimation();
      }
    });
  
    