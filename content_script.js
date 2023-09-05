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

    return date1;
  } else {

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

// --- Check if the given date is in the correct format MM/DD/YYYY HH:MM AM/PM ---
function isValidDateFormat(textContent) {
  const datePattern = /^(1[0-2]|0?[1-9])\/(3[01]|[12][0-9]|0?[1-9])\/\d{4} (1[0-2]|0?[1-9]):([0-5][0-9]) (AM|PM)$/;

  return datePattern.test(textContent);
}

// --- Check if the given date is in the correct format DD/MM/YYYY HH:MM AM/PM ---
function isValidDateFormat2(textContent) {
  const datePattern = /^(3[01]|[12][0-9]|0?[1-9])\/(1[0-2]|0?[1-9])\/\d{4} (1[0-2]|0?[1-9]):([0-5][0-9]) (AM|PM)$/;

  return datePattern.test(textContent);
}

// --- If the date format is DD/MM/YYYY, convert it to MM/DD/YYYY ---
function convertDateFormat2(inputDate) {
  // Split the input date string into date and time parts
  const [datePart, timePart] = inputDate.split(' ');

  // Split the date part into day, month, and year
  const [day, month, year] = datePart.split('/');

  // Rearrange the parts into the desired format
  const outputDate = `${month}/${day}/${year} ${timePart}`;

  return outputDate;
}

function getDayOfMonth() {
  // Create a new Date object to get the current date
  var currentDate = new Date();

  // Get the day of the month (1-31)
  var dayOfMonth = currentDate.getDate();

  // Output the day of the month
  return dayOfMonth;
}

function getCurrentMonth() {
  // Create a new Date object to get the current date
  var currentDate = new Date();

  // Get the month (0-11)
  var month = currentDate.getMonth() + 1;

  // Output the month
  return month;
}

function getCurrentYear() {
  // Create a new Date object to get the current date
  var currentDate = new Date();

  // Get the four digit year (yyyy)
  var year = currentDate.getFullYear();

  // Output the year
  return year;
}

// --- Convert the found dateString to the correct format MM/DD/YYYY HH:MM AM/PM ---
function convertDateFormat(inputDate) {
  // Split the input date string into date and time parts
  const [datePart, timePart] = inputDate.split(' ');

  // Split the date part into day, month, and year
  const [firstDatePart, secondDatePart, year] = datePart.split('/');

  const currentDayOfMonth = getDayOfMonth();
  console.log('currentDayOfMonth!!', currentDayOfMonth)
  const currentMonth = getCurrentMonth();
  console.log('currentMonth!!', currentMonth)

  let day, month;

  // Check if the first part of the date is the day of the month
  if ((firstDatePart == currentDayOfMonth) && (secondDatePart == currentMonth)) {
      day = firstDatePart;
      month = secondDatePart;
      console.log('firstDatePart', firstDatePart, 'secondDatePart', secondDatePart, 'day', day, 'month', month);
      console.log('FIRST: firstDatePart === currentDayOfMonth && secondDatePart === currentMonth');
  } else if ((firstDatePart == currentMonth) && (secondDatePart == currentDayOfMonth)) {
      day = secondDatePart;
      month = firstDatePart;
      console.log('firstDatePart', firstDatePart, 'secondDatePart', secondDatePart, 'day', day, 'month', month);
      console.log('SECOND: firstDatePart === currentMonth && secondDatePart === currentDayOfMonth');
  } else if ((firstDatePart > 12) && (secondDatePart <= 12)) {
      day = firstDatePart;
      month = secondDatePart;
      console.log('firstDatePart', firstDatePart, 'secondDatePart', secondDatePart, 'day', day, 'month', month);
      console.log('THIRD: firstDatePart > 12 && secondDatePart <= 12');
  } else if ((firstDatePart <= 12) && (secondDatePart > 12)) {
      day = secondDatePart;
      month = firstDatePart;
      console.log('firstDatePart', firstDatePart, 'secondDatePart', secondDatePart, 'day', day, 'month', month);
      console.log('FOURTH: firstDatePart <= 12 && secondDatePart > 12');
  } else if ((firstDatePart > currentMonth) && (secondDatePart <= 12)) {
      day = firstDatePart;
      month = secondDatePart;
      console.log('firstDatePart', firstDatePart, 'secondDatePart', secondDatePart, 'day', day, 'month', month);
      console.log('FIFTH: firstDatePart > currentMonth && secondDatePart <= 12');
  } else if ((secondDatePart > currentMonth) && (firstDatePart <= 12)) {
      day = secondDatePart;
      month = firstDatePart;
      console.log('firstDatePart', firstDatePart, 'secondDatePart', secondDatePart, 'day', day, 'month', month);
      console.log('SIXTH: secondDatePart > currentMonth && firstDatePart <= 12');
  } else {
      month = firstDatePart;
      day = secondDatePart;
      console.log('firstDatePart', firstDatePart, 'secondDatePart', secondDatePart, 'day', day, 'month', month);
      console.log('SEVENT: No Change');
  }

  // Rearrange the parts into the desired format
  const outputDate = `${month}/${day}/${year} ${timePart}`;

  return outputDate;
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
            // if the date format is MM/DD/YYYY, push it to dateArray
            const convertedDate = convertDateFormat(textContent);
            dateArray.push(convertedDate);
          } else if (isValidDateFormat2(textContent)) {
            // if the date format is DD/MM/YYYY, convert it to MM/DD/YYYY and push it to dateArray
            const convertedDate = convertDateFormat2(textContent);
            dateArray.push(convertedDate);
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

// Observe the document for mutations (changes in the DOM)
observer.observe(document, {
  childList: true,
  subtree: true,
});




