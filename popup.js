async function getActiveTabURL() {
    const tabs = await chrome.tabs.query({
        currentWindow: true,
        active: true
    });
  
    return tabs[0];
}

document.addEventListener("DOMContentLoaded", async () => {
    const activeTab = await getActiveTabURL();

    if (activeTab.url.includes("clarivateanalytics.lightning.force.com") || activeTab.url.includes("clarivateanalytics--preprod.sandbox.lightning.force.com")) {
        chrome.storage.sync.get('savedSelection', function (items) {
            var savedValue = items.savedSelection;
            if (savedValue) {
                document.getElementById('selectionDropdown').value = savedValue;
            }
        });

        // Set up the click event listener for the save button
        document.getElementById('saveButton').addEventListener('click', save);
    } else {
        const container = document.getElementsByClassName("container")[0];

        container.innerHTML = `<div class="notInSFDC">To view your team's setting or status colour configuration, please open this extension in your Salesforce page</div>`;
    }
});

// Save the current selection to chrome.storage
function save() {
    const selectedValue = document.getElementById('selectionDropdown').value;
    saveSelection(selectedValue);
    alert('Saved. Please refresh CForce (Salesforce Website). Thanks 😊');
  }
  
  // Function to save the selection to chrome.storage
  function saveSelection(selectedValue) {
    chrome.storage.sync.set({ 'savedSelection': selectedValue }, function() {
      console.log('Selection saved: ' + selectedValue);
    });
  }