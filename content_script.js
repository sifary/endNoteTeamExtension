// --- FROM EMAIL HIGHLIGHTER ---

// Function to check if the anchor's content matches the specific text
function isEndNoteSupportAnchor(anchor) {
  const desiredText = "endnote.support@clarivate.com";
  return anchor.textContent.includes(desiredText);
}

//Function to check if there is an email keyword in the text
function isClarivateEmailList(anchor) {
  const emailKeywords = [
    'ts.',
    'ts-',
    'techstreet',
    'account',
    'tr.',
    'queries',
    'jgear',
    'jstead',
    'derwent',
    'customer',
    'scientific',
    'proposals',
    'service',
    'science',
    'custserv',
    'wos', 'WOS',
    'collections',
    'invoices',
    'serion',
    'services',
    'compumark',
    'admin',
    'contract',
    'ipsci',
    'ips',
    'drg',
    'dartsip',
    'hidadataprogram',
    'cortellis',
    'compuMark',
    'account',
    'billing',
    'invoice',
    'certificate',
    'tax',
    'support',
    'askhbi',
    'cash',
    'team',
    'sales',
    'bis.in', 'bis.mon',
    'bisqa',
  ];

  const clarivateDomain = '@clarivate.com';

  for (let keyword of emailKeywords) {
    if (anchor.textContent.includes(keyword) && anchor.textContent.includes(clarivateDomain)) {
      return true;
    }
  }

  return false;
}


// Function to change background color to orange
function highlightAnchorWithSpecificContent(anchor, color) {
  anchor.style.backgroundColor = color;
}

// Function to revert the background color to default
function unhighlightAnchor(anchor) {
  anchor.style.backgroundColor = "";
}

// Main function to check and handle anchor elements
function handleAnchors() {
  const fromFieldDiv = document.getElementsByClassName("standardField uiMenu");
  for (const fromDiv of fromFieldDiv) {
      const anchor = fromDiv.querySelector("a.select");
    if (!isEndNoteSupportAnchor(anchor)) {
      if (!isClarivateEmailList(anchor)) {
        highlightAnchorWithSpecificContent(anchor, "red");
      } else {
        highlightAnchorWithSpecificContent(anchor, "orange");
      }
    } else {
      unhighlightAnchor(anchor);
    }
  }

}

// --- OPEN CASES HIGHLIGHTER ---

// Main function to check and handle anchor elements
function handleCases() {
  const casesTable = document.querySelector("#brandBand_1 > div > div > div > div > div.slds-grid.listDisplays.safari-workaround-anchor > div > div.slds-col.slds-no-space.forceListViewManagerPrimaryDisplayManager > div.undefined.forceListViewManagerGrid > div.listViewContent.slds-table--header-fixed_container > div.uiScroller.scroller-wrapper.scroll-bidirectional.native > div > div > table > tbody");
  
  if (casesTable) {
    const casesList = casesTable.getElementsByTagName("tr");
    for (const caseRow of casesList) {
      const caseStatusGeneral = caseRow.querySelectorAll("td span span.slds-truncate");
      for (const caseStatus of caseStatusGeneral) {
        if (caseStatus.textContent.includes("New Email Received") || caseStatus.textContent.includes("Re-opened")) {
          highlightAnchorWithSpecificContent(caseRow, "moccasin")
        } else if (caseStatus.textContent.includes("Pending Action")) {
          highlightAnchorWithSpecificContent(caseRow, "lemonchiffon")
        } else if (caseStatus.textContent.includes("Assigned to Resolver Group")) {
          highlightAnchorWithSpecificContent(caseRow, "powderblue")
        } else if (caseStatus.textContent.includes("Solution Delivered to Customer")) {
          highlightAnchorWithSpecificContent(caseRow, "palegreen")
        } else if (caseStatus.textContent.includes("Open")) {
          highlightAnchorWithSpecificContent(caseRow, "peachpuff")
        } else {
          unhighlightAnchor(caseRow)
        }
      }
    }   
  } else {
    console.log("casesTable not found");
  }
}

// --- EVENT LISTENERS FOR EXECUTING FUNCTIONS ---

// MutationObserver to detect changes in the DOM
const observer = new MutationObserver(() => {
  handleAnchors();
  handleCases();
});

document.addEventListener("click", handleAnchors);
document.addEventListener("mouseover", handleAnchors);
document.addEventListener("click", handleCases);
document.addEventListener("mouseover", handleCases);

// Observe the document for mutations (changes in the DOM)
observer.observe(document, {
  childList: true,
  subtree: true,
});




