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

// --- Given two dates, return the earlier date ---
function getEarlierDate(date1Str, date2Str) {
  const date1 = new Date(date1Str);
  const date2 = new Date(date2Str);

  if (date1 < date2) {
    console.log("The earlier date is:", date1);
    return date1;
  } else {
    console.log("The earlier date is:", date2);
    return date2;
  }
}

// --- Calculate the time difference between the given date and now in minutes ---
function calculateTimeDifferenceInMinutes(date) {
  const openDate = new Date(date);
  const currentDate = new Date();

  const timeDifferenceInMilliseconds = Math.abs(currentDate - openDate);
  const timeDifferenceInMinutes = timeDifferenceInMilliseconds / (1000 * 60);

  return timeDifferenceInMinutes;
}

// --- Check if the given date is in the correct format ---
function isValidDateFormat(textContent) {
  const datePattern = /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/\d{4} (1[0-2]|0?[1-9]):([0-5][0-9]) (AM|PM)$/;

  return datePattern.test(textContent);
}

// --- Check if the row element has the term "Open" but not "Re-opened", and returns true if both are fulfilled ---
function hasOpenButNotReopened(rowElement) {
  const statusElements = rowElement.querySelectorAll("td span span");
  let isOpenFound = false;
  let isReopenedFound = false;

  statusElements.forEach(element => {
    const textContent = element.textContent.trim();
    
    if (textContent === "Open") {
      isOpenFound = true;
    } else if (textContent === "Re-opened") {
      isReopenedFound = true;
    }
  });

  if (isOpenFound && !isReopenedFound) {
    return true
  } else {
    return false;
  }
}

// Main function to check and handle anchor elements
function handleCases() {
  let webTables = document.querySelectorAll('table');

  for (let table of webTables) {
    const rows = table.querySelector('tbody').querySelectorAll('tr');
    for (let row of rows) {
      if (hasOpenButNotReopened(row)) {
        const dateArray = [];
        const dateElements = rowElement.querySelectorAll("td span span");
      
        dateElements.forEach(element => {
          const textContent = element.textContent;
          
          if (isValidDateFormat(textContent)) {
            dateArray.push(textContent);
          } 
        });

        const earlierDate = getEarlierDate(dateArray[0], dateArray[1]);
        const caseMinutes = calculateTimeDifferenceInMinutes(earlierDate);

        if (caseMinutes > 90) {
          highlightAnchorWithSpecificContent(row, "rgb(255, 157, 184)")
        } else if(caseMinutes <= 90 && caseMinutes > 60) {
          highlightAnchorWithSpecificContent(row, "rgb(251, 171, 134)")
        } else if(caseMinutes <= 60 && caseMinutes > 30) {
          highlightAnchorWithSpecificContent(row, "rgb(255, 214, 118)")
        } else if(caseMinutes <= 30) {
          highlightAnchorWithSpecificContent(row, "rgb(160, 255, 154)")
        }
      } else {
        unhighlightAnchor(row);
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




