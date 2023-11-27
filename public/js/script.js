// Show Alert
const showAlert = document.querySelector("[show-alert]");
if(showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));
  const closeAlert = showAlert.querySelector("[close-alert]");

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  closeAlert.addEventListener("click", () => {
    showAlert.classList.add("alert-hidden");
  });
}
// End Show Alert

function changeName() {
  if($("#collapseButton").html()=="Thêm"){
      $("#collapseButton").html("Ẩn");
  }
  else{
      $("#collapseButton").html("Thêm");
  }
}

// Filter
var facet = [];
var school = [];
var minPriceValue = null;
var maxPriceValue = null;
let url = new URL(window.location.href);


var cbs = document.querySelectorAll('[name="checkboxFilter"]');

for (i = 0; i < cbs.length; i++) {
  cbs[i].addEventListener("click", function() {
    // Take URL 
    const [URL, qm] = url.href.split("?")
    if(qm) {
      var arrayQm = qm.split("=")
      if (arrayQm[0] == "keyword") url.href = URL + '?' + qm.split("&")[0];
      else url.href = URL + '?';
    } else url.href = URL + '?';

    // Add Array 
    const [filterKey, filterValue] = this.value.split("-");
    if (this.checked) {
      if (filterKey == "facet") {
        facet.push(filterValue);
      } else if (filterKey == "school") {
        school.push(filterValue);
      }
    } else {
      if(filterKey == "school") {
        var indexToDelete = school.indexOf(filterValue);
        if (indexToDelete !== -1) {
            school.splice(indexToDelete, 1);
        }

      } else if (filterKey == "facet") {
          var indexToDelete = facet.indexOf(filterValue);
          if (indexToDelete !== -1) {
              facet.splice(indexToDelete, 1);
          }

      }
    }
    if(school.length > 0) {
      for (i = 0; i < school.length; i++) {
        url.href += "&school=" + school[i];
      }
    }
    if(facet.length > 0) {
      for (i = 0; i < facet.length; i++) {
        url.href += "&facet=" + facet[i];
      }
    }
    if(minPriceValue != null) {
      url.href += "&minPrice=" + minPriceValue;
    }

    if(maxPriceValue != null) {
      url.href += "&maxPrice=" + maxPriceValue;
    }
    window.location.href = url.href;
  })
}


function updateCheckboxFromURL() {
  let url = new URL(window.location.href);
  
  var array = url.href.split('&')
  for (i = 1; i < array.length; i++) {
    const [arrayKey, arrayValue] = array[i].split('=');
    if (arrayKey == "school") school.push(arrayValue);
    else if (arrayKey == "facet") facet.push(arrayValue);

    else if (arrayKey == "minPrice") {
      document.querySelector('[name="minPrice"]').value = arrayValue;
      minPriceValue = arrayValue;
    } else if (arrayKey == "maxPrice") {
      document.querySelector('[name="maxPrice"]').value = arrayValue;
      maxPriceValue = arrayValue;
    }
  }

  cbs.forEach(function (cb) {
    const [filterKey, filterValue] = cb.value.split("-");
    if(filterKey == "school") {
      var index = school.indexOf(filterValue);
      if (index !== -1) cb.checked = true
    } else if (filterKey == "facet") {
      var index = facet.indexOf(filterValue);
      if (index !== -1) cb.checked = true
    }
  });
}


const priceButton = document.querySelector('[name="buttonPrice"]');
if(priceButton) {
  
  priceButton.addEventListener("click", () => {
    let url = new URL(window.location.href);

    const minPrice = document.querySelector('[name="minPrice"]');
    const maxPrice = document.querySelector('[name="maxPrice"]');
    
    // Check URL 
    const [checkURL, remainURL] = url.href.split('&')
    if (!remainURL) url.href += "?";

    // Min Price 
    if (Number(minPrice.value) > 0) {
      let Check = false;
      let arrayMin = url.href.split('&');
      for (i=0; i<arrayMin.length; i++) {
        const [arrayMinKey, arrayMinValue] = arrayMin[i].split('=');
        if (arrayMinKey == "minPrice") {
          arrayMin[i] = "minPrice=" + minPrice.value;
          Check = true;
          break;
        }
      }
      if (Check == false) {url.href += "&minPrice=" + minPrice.value;}
      else url.href = arrayMin.join('&');
    } else {
      let Check = false;
      let valueDelete;
      let arrayMin = url.href.split('&');
      for (i=0; i<arrayMin.length; i++) {
        const [arrayMinKey, arrayMinValue] = arrayMin[i].split('=');
        if (arrayMinKey == "minPrice") {
          valueDelete = arrayMin[i];
          Check = true;
          break;
        }
      }
      if (Check = true) {
        var indexToDelete = arrayMin.indexOf(valueDelete);
        if (indexToDelete !== -1) {
            arrayMin.splice(indexToDelete, 1);
        }
      }
      minPriceValue = null;
      url.href = arrayMin.join('&');
    }

    // Max Price 
    if (Number(maxPrice.value) > 0) {
      let Check = false;
      let arrayMax = url.href.split('&');
      for (i=0; i<arrayMax.length; i++) {
        const [arrayMaxKey, arrayMaxValue] = arrayMax[i].split('=');
        if (arrayMaxKey == "maxPrice") {
          arrayMax[i] = "maxPrice=" + maxPrice.value;
          Check = true;
          break;
        }
      }
      if (Check == false) {url.href += "&maxPrice=" + maxPrice.value;}
      else url.href = arrayMax.join('&');
    } else {
      let Check = false;
      let valueMaxDelete;
      let arrayMax = url.href.split('&');
      for (i=0; i<arrayMax.length; i++) {
        const [arrayMaxKey, arrayMaxValue] = arrayMax[i].split('=');
        if (arrayMaxKey == "maxPrice") {
          valueMaxDelete = arrayMax[i];
          Check = true;
          break;
        }
      }
      if (Check = true) {
        var indexToDelete = arrayMax.indexOf(valueMaxDelete);
        if (indexToDelete !== -1) {
            arrayMax.splice(indexToDelete, 1);
        }
      }
      maxPriceValue = null;
      url.href = arrayMax.join('&');
    }

    window.location.href = url.href;
  })
}
// End Filter 

// Clear Filter Button 
const clearButton = document.querySelector('[name="clearFilter"]');
if(clearButton) {
  clearButton.addEventListener("click", () => {
    let url = new URL(window.location.href);
    const [otherURL, qm] = url.href.split('?');
    url.href = otherURL;
    window.location.href = url.href;
  })
}
// End Clear Filter Button

window.addEventListener('load', updateCheckboxFromURL);

// Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if (buttonsPagination) {
  let url = new URL(window.location.href);

  buttonsPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");

      url.searchParams.set("page", page);

      window.location.href = url.href;
    });
  });
}
// End Pagination