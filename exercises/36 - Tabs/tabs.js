console.log('ya ya wes we get it.. IT WORKS!');

const tabs = document.querySelector('.tabs');
// look inside tabs instead of document because you'll likely have many tabs
// on the same page. This allows JavaScript to be reused for any number of tabs
const tabButtons = tabs.querySelectorAll('[role="tab"]');
const tabPanels = Array.from(tabs.querySelectorAll('[role="tabpanel"]'));

function handleTabClick(event) {
  // hide all tab panels
  tabPanels.forEach(panel => {
    panel.hidden = true;
  });
  // mark all tabs as unselected
  tabButtons.forEach(tab => {
    // tab.ariaSelected = false; // this doesn't work
    // for aria and custom (data) attributes you must use setAttribute
    tab.setAttribute('aria-selected', false);
  });
  // mark the clicked tab as selected
  event.currentTarget.setAttribute('aria-selected', true);
  // Note: we aren't using classes bc using just aria
  // find the associated tabPanel
  const { id } = event.currentTarget; // equivalent to const id = event.currentTarget.id;
  // and show it
  // Method 1:
  // const tabPanel = tabs.querySelector(`[aria-labelledby="${id}"]`);
  // tabPanel.hidden = false;

  // Method 2 (wes prefers this): find in the array of tabPanels
  // Note: had to convert tabPanels from NodeList to array before using find
  // tabPanels.find(panel => {
  //   if (panel.getAttribute('aria-labelledby') === id) {
  //     return true;
  //   }
  // });
  // above same as following. Except now we're storing it in variable, tabPanel
  const tabPanel = tabPanels.find(
    panel => panel.getAttribute('aria-labelledby') === id
  );
  console.log(tabPanel);
  tabPanel.hidden = false;
}

tabButtons.forEach(button => button.addEventListener('click', handleTabClick));
