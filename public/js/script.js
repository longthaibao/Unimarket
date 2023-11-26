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
let url = new URL(window.location.href);


var cbs = document.querySelectorAll('[name="checkboxFilter"]');

for (i = 0; i < cbs.length; i++) {
  cbs[i].addEventListener("click", function() {
    // Take URL 
    const [URL, qm] = url.href.split("?")
    if(qm) {
      var arrayQm = qm.split("=")
      if (arrayQm[0] == "keyword") url.href = URL + '?' + qm.split("&")[0];
    }
    else url.href = URL + '?';

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
    window.location.href = url.href;
  })
}


function updateCheckboxFromURL() {
  let url = new URL(window.location.href);
  
  var array = url.href.split('&')
  for (i = 1; i < array.length; i++) {
    const [arrayKey, arrayValue] = array[i].split('=');
    if (arrayKey == "school") school.push(arrayValue);
    else if (arrayKey == "facet") facet.push(arrayValue)
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

window.addEventListener('load', updateCheckboxFromURL);

// End Filter 