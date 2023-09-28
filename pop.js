chrome.runtime.onInstalled.addListener(() => {
    console.log("onInstalled...");
  
    // create alarm after extension is installed / upgraded
    chrome.alarms.create("startRequest", { periodInMinutes: 60 });
    startRequest();
  });
  
  chrome.alarms.onAlarm.addListener((alarm) => {
    startRequest();
  });
  
  async function startRequest() {
    const response = await fetch("https://stoic-quotes.com/api/quote");
    const newData = await response.json();
    const data = `${newData.text} —${newData.author}`;
    console.log(data);
  
    var options = {
      title: "Stoicism",
      message: data,
      iconUrl: "stoic.png",
      type: "basic",
      requireInteraction: true
    };
    chrome.notifications.create("", options);
  }