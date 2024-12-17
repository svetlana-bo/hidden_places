fetch("json/events.json")
  .then((response) => {
    console.log(`Response Status: ${response.status}`); // Log the response
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })