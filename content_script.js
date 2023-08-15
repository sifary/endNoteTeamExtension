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
  let webTables = document.querySelectorAll('table');

  for (let table of webTables) {
    const rows = table.querySelector('tbody').querySelectorAll('tr');
    for (let row of rows) {
      const cells = row.querySelectorAll('span span');
      for (let cell of cells) {
        if (cell.textContent.includes("New Email Received") || cell.textContent.includes("Re-opened") || cell.textContent.includes("Completed by Resolver Group") || cell.textContent.includes("Open") || cell.textContent.includes("New") ) {
          highlightAnchorWithSpecificContent(row, "moccasin")
        } else if (cell.textContent.includes("Pending Action") || cell.textContent.includes("Initial Response Sent")) {
          highlightAnchorWithSpecificContent(row, "lemonchiffon")
        } else if (cell.textContent.includes("Assigned to Resolver Group") || cell.textContent.includes("Pending Internal Response") || cell.textContent.includes("Pending AM Response") || cell.textContent.includes("Pending QA Review")) {
          highlightAnchorWithSpecificContent(row, "powderblue")
        } else if (cell.textContent.includes("Solution Delivered to Customer")) {
          highlightAnchorWithSpecificContent(row, "palegreen")
        } else if (cell.textContent.includes("Closed") || cell.textContent.includes("Pending Customer Response") || cell.textContent.includes("Approved Waiting on Info") || cell.textContent.includes("Campaign Scheduled") || cell.textContent.includes("Collections Suspension") || cell.textContent.includes("Count Returned") || cell.textContent.includes("Count Submitted") || cell.textContent.includes("Send to Webotis") || cell.textContent.includes("Testing Submitted")) {
          unhighlightAnchor(row)
        }
      }
    }
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




