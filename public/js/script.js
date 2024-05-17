//navbar

$(document).ready(function () {
  $("#bar").click(function () {
    $("nav ul").css("right", " -100px");
    $("#bar").css("display", " none");
  });
  $("#close").click(function () {
    $("nav ul").css("right", " -3000px");
    $("#bar").css("display", "block");
  });
  $("li").click(function () {
    $("nav ul").css("right", " -3000px");
    $("#bar").css("display", "block");
  });
});

//reviews
$(document).ready(function () {
  var currentIndex = 1;

  function showContent(index) {
    $("#rev-content1, #rev-content2, #rev-content3").hide();
    $("#s1, #s2, #s3").css("background-color", "aliceblue");

    $("#rev-content" + index).show();
    $("#s" + index).css("background-color", "rgb(132, 0, 255)");
  }

  function changeContent() {
    currentIndex = (currentIndex % 3) + 1;
    showContent(currentIndex);
  }

  // Initial setup
  showContent(currentIndex);

  // Auto change every 3 seconds
  setInterval(changeContent, 3000);

  // Click events
  $("#s1").click(function () {
    currentIndex = 1;
    showContent(currentIndex);
  });

  $("#s2").click(function () {
    currentIndex = 2;
    showContent(currentIndex);
  });

  $("#s3").click(function () {
    currentIndex = 3;
    showContent(currentIndex);
  });
});

//payment
function redirectToPaymentPage(pageNumber) {
  window.location.href = "/payment" + pageNumber;
}

//lecture
function redirectTolecturePage(pageNumber) {
  window.location.href = "/lecture" + pageNumber;
}

// freetrial
function redirectToFreeTrialPage(pageNumber) {
  window.location.href = "/freetrial" + pageNumber;
}

function closeSuccessCard() {
  var successCard = document.querySelector(".success-card");
  successCard.style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
  // Get the elements
  var startFreeTrialLink = document.querySelector(".free a");
  var checkOutLink = document.querySelector('a[href=""]');
  var closeButton = document.querySelector(".close-button");
  var successMessage = document.querySelector(".success-message");
  var successCard = document.querySelector(".success-card");

  // Add a click event listener to the "Start Free Trial" link
  startFreeTrialLink.addEventListener("click", function (event) {
    // Prevent the default link behavior (following the href)
    event.preventDefault();

    // Show the success message
    successMessage.style.display = "block";
  });

  // Add a click event listener to the "Check Out" link
  checkOutLink.addEventListener("click", function (event) {
    // Prevent the default link behavior (following the href)
    event.preventDefault();

    // Redirect to a specific payment page
    redirectToPaymentPage(1); // replace 1 with the desired page number
  });

  // Add a click event listener to the "Close" button
  closeButton.addEventListener("click", function (event) {
    // Close the success card
    closeSuccessCard();
  });
});

//! after registration
window.onload = function () {
  // Check if the 'registered' flag is set in localStorage
  if (
    document.cookie
      .split(";")
      .some((item) => item.trim().startsWith("registered="))
  ) {
    // Display the success message
    const message = document.createElement("div");
    message.textContent =
      "Congratulations! You registered successfully. Please login.";
    message.style.backgroundColor = "green";
    message.style.color = "white";
    message.style.padding = "10px";
    message.style.position = "fixed";
    message.style.top = "10px";
    message.style.right = "10px";
    message.style.zIndex = "1000";
    document.body.appendChild(message);

    // Remove the message after 5 seconds
    setTimeout(() => {
      message.remove();
    }, 5000);

    // Remove the 'registered' flag from localStorage
    document.cookie =
      "registered=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  }
};

document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    var username = document.getElementById("username").value;
    var password = document.getElementById("password").value;

    if (!username || !password) {
      event.preventDefault();
      document.getElementById("error-message").textContent =
        "Please enter your username and password";
    }
  });