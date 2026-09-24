// ==========================================
// LOGIN
// ==========================================

function openLogin() {

    closeModals();

    document.getElementById("loginModal").style.display = "flex";

}


// ==========================================
// REGISTER
// ==========================================

function openRegister() {

    closeModals();

    document.getElementById("registerModal").style.display = "flex";

}


// ==========================================
// CLOSE MODALS
// ==========================================

function closeModals() {

    document.getElementById("loginModal").style.display = "none";

    document.getElementById("registerModal").style.display = "none";

}


// ==========================================
// REGISTER PATIENT
// ==========================================

function registerPatient() {

    const name =
        document.getElementById("regName").value.trim();

    const age =
        document.getElementById("regAge").value.trim();

    const phone =
        document.getElementById("regPhone").value.trim();

    const email =
        document.getElementById("regEmail").value.trim();

    const password =
        document.getElementById("regPassword").value.trim();

    const gender =
        document.getElementById("regGender").value;


    if (!name || !age || !phone || !email || !password || !gender) {

        alert("Please fill all the details.");

        return;
    }


    if (!/^[0-9]{10}$/.test(phone)) {

        alert("Please enter a valid 10-digit phone number.");

        return;
    }


    const patient = {

        name: name,
        age: age,
        phone: phone,
        email: email,
        password: password,
        gender: gender

    };


    localStorage.setItem(
        "patient",
        JSON.stringify(patient)
    );


    alert("Account created successfully!");


    // FIXED: use closeModals()
    closeModals();


    // Clear fields

    document.getElementById("regName").value = "";
    document.getElementById("regAge").value = "";
    document.getElementById("regPhone").value = "";
    document.getElementById("regEmail").value = "";
    document.getElementById("regPassword").value = "";
    document.getElementById("regGender").value = "";


    // Open login

    openLogin();

}


// ==========================================
// LOGIN FUNCTION
// ==========================================

function login() {

    const type =
        document.getElementById("loginType").value;


    // ================= PATIENT =================

    if (type === "user") {

        const email =
            document.getElementById("loginEmail").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        const patient =
            JSON.parse(localStorage.getItem("patient"));


        if (!patient) {

            alert("Please create a patient account first.");

            return;
        }


        if (
            email === patient.email &&
            password === patient.password
        ) {

            localStorage.setItem(
                "loggedInUser",
                "user"
            );

            window.location.href =
                "user/user.html";

        } else {

            alert("Invalid patient email or password.");

        }

    }


    // ================= ADMIN =================

    else {

        const username =
            document.getElementById("loginUsername").value.trim();

        const password =
            document.getElementById("loginPassword").value;


        if (
            username === "doctor" &&
            password === "12345"
        ) {

            localStorage.setItem(
                "doctorLoggedIn",
                "true"
            );

            window.location.href =
                "admin/admin.html";

        } else {

            alert("Invalid doctor username or password.");

        }

    }

}


// ==========================================
// LOGIN TYPE CHANGE
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    const loginType =
        document.getElementById("loginType");

    if (!loginType) return;


    loginType.addEventListener("change", function() {

        const email =
            document.getElementById("loginEmail");

        const username =
            document.getElementById("loginUsername");


        if (this.value === "admin") {

            email.style.display = "none";

            username.style.display = "block";

            username.value = "";

        } else {

            email.style.display = "block";

            username.style.display = "none";

            username.value = "";

        }

    });

});


// ==========================================
// FIND DOCTORS
// ==========================================

function openDoctors() {

    window.location.href =
        "user/user.html#doctors";

}


// ==========================================
// BOOKING
// ==========================================

function openBooking() {

    window.location.href =
        "user/user.html#booking";

}


// ==========================================
// REMINDERS
// ==========================================

function openReminders() {

    window.location.href =
        "user/user.html#reminders";

}


// ==========================================
// CONSULTATION
// ==========================================

function openConsultation() {

    window.location.href =
        "user/user.html#consultation";

}


// ==========================================
// DOCTOR PORTAL
// ==========================================

function openDoctorPortal() {

    window.location.href =
        "admin/admin.html";

}


// ==========================================
// CLICK OUTSIDE MODAL
// ==========================================

window.addEventListener("click", function(event) {

    const loginModal =
        document.getElementById("loginModal");

    const registerModal =
        document.getElementById("registerModal");


    if (event.target === loginModal) {

        closeModals();

    }


    if (event.target === registerModal) {

        closeModals();

    }

});


// ==========================================
// IMAGE SLIDESHOW
// ==========================================

let currentSlide = 0;

const slides =
    document.querySelectorAll(".slide");


function showSlide(index) {

    slides.forEach(function(slide) {

        slide.classList.remove("active");

    });


    slides[index].classList.add("active");

}


setInterval(function() {

    if (slides.length === 0) return;

    currentSlide++;

    if (currentSlide >= slides.length) {

        currentSlide = 0;

    }

    showSlide(currentSlide);

}, 3000);