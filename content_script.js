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
      // check if the row has the term "Open" but not "Re-opened"
      if (hasOpenButNotReopened(row)) {
        const dateArray = [];
        const dateElements = row.querySelectorAll("td span span");
        
        // check if there's any textContent with the correct format, and push it to dateArray if it is
        dateElements.forEach(element => {
          const textContent = element.textContent;
          
          if (isValidDateFormat(textContent)) {
            dateArray.push(textContent);
          } 
        });

        //check if the number of items in dateArray is 2 or 1, and assign earlierDate accordingly
        let earlierDate;

        if (dateArray.length === 2) {
          earlierDate = getEarlierDate(dateArray[0], dateArray[1]);
        } else if (dateArray.length === 1) {
          earlierDate = new Date(dateArray[0]);
        }

        // calculate the time difference in minutes
        const caseMinutes = calculateTimeDifferenceInMinutes(earlierDate);
        
        // highlight the row with different colors based on the time difference
        if (caseMinutes > 90) {
          highlightAnchorWithSpecificContent(row, "rgb(255, 220, 230)")
        } else if(caseMinutes <= 90 && caseMinutes > 60) {
          highlightAnchorWithSpecificContent(row, "rgb(255, 232, 184)")
        } else if(caseMinutes <= 60 && caseMinutes > 30) {
          highlightAnchorWithSpecificContent(row, "rgb(209, 247, 196)")
        } else if(caseMinutes <= 30) {
          highlightAnchorWithSpecificContent(row, "rgb(194, 244, 233)")
        }
      } else {
        unhighlightAnchor(row);
      }
    }
  }
}

// --- CASE STATUS HIGHLIGHTER ---

// --- Generate the style declaration for the handleStatus function ---
function generateStyle(color) {
  return `background-color: ${color}; border-radius: 6px; padding: 3px 6px; color: white; font-weight: 500;`;
}

// Main function to check and highlight status elements
function handleStatus() {
  let webTables = document.querySelectorAll('table');

  for (let table of webTables) {
    const rows = table.querySelector('tbody').querySelectorAll('tr');
    for (let row of rows) {
      let cells = row.querySelectorAll('td span span');
      for (let cell of cells) {
          let cellText = cell.textContent.trim();
        if (cellText === "New Email Received" || cellText === "Re-opened" || cellText === "Completed by Resolver Group" || cellText === "New") {
          cell.setAttribute("style", generateStyle("rgb(191, 39, 75)"));
        } else if (cellText === "Pending Action" || cellText === "Initial Response Sent") {
          cell.setAttribute("style", generateStyle("rgb(247, 114, 56)"));
        } else if (cellText === "Assigned to Resolver Group" || cellText === "Pending Internal Response" || cellText === "Pending AM Response" || cellText === "Pending QA Review") {
          cell.setAttribute("style", generateStyle("rgb(140, 77, 253)"));
        } else if (cellText === "Solution Delivered to Customer") {
          cell.setAttribute("style", generateStyle("rgb(45, 200, 64)"));
        } else if (cellText === "Closed" || cellText === "Pending Customer Response") {
          cell.setAttribute("style", generateStyle("rgb(103, 103, 103)"));
        } else {
          cell.removeAttribute("style");
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
  handleStatus()
});

document.addEventListener("click", handleAnchors);
document.addEventListener("mouseover", handleAnchors);
document.addEventListener("click", handleCases);
document.addEventListener("mouseover", handleCases);
document.addEventListener("click", handleStatus);
document.addEventListener("mouseover", handleStatus);

// Observe the document for mutations (changes in the DOM)
observer.observe(document, {
  childList: true,
  subtree: true,
});




