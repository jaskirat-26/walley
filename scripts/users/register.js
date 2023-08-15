document.addEventListener('DOMContentLoaded', function () {
    const registrationForm = document.forms.registerationForm;
    
    
    registrationForm.addEventListener("submit", async function (event) {
      event.preventDefault(); // Prevent the default form submission behavior
      
      var first_name = document.getElementById("first_name");
      var last_name = document.getElementById("last_name");
      var email = document.getElementById("email");
      var password = document.getElementById("password");
      console.log(first_name.value, last_name.value, email.value, password.value);
      // Convert the form data to an object
      const formDataObject = {};
      formDataObject['first_name'] = first_name.value;
      formDataObject['last_name'] = last_name.value;
      formDataObject['email'] = email.value;
      formDataObject['password'] = password.value;
      // const reqBody = JSON.stringify(formDataObject);

      const searchParams = new URLSearchParams(formDataObject);
      console.log(searchParams);
  
      // Send a POST request to your app's backend using fetch
      try {
        const response = await fetch("/users/register", {
            method: "POST",
            body: searchParams,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        });

        if (response.ok) {
            // Handle success, maybe redirect to a success page or show a success message
            console.log("Registration successful!");
        } else {
            // Handle error, maybe show an error message
            console.error("Registration failed");
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
    });
});
  