// ==========================================
// DOCTOR DATA
// ==========================================

const doctorAccounts = {

    "Dr. Anjali Rao": {
        id: "DOC001",
        password: "12345"
    },

    "Dr. Rahul Sharma": {
        id: "DOC002",
        password: "23456"
    },

    "Dr. Priya Menon": {
        id: "DOC003",
        password: "34567"
    },

    "Dr. Arjun Reddy": {
        id: "DOC004",
        password: "45678"
    },

    "Dr. Sneha Kapoor": {
        id: "DOC005",
        password: "56789"
    },

    "Dr. Vikram Singh": {
        id: "DOC006",
        password: "67890"
    }

};


// ==========================================
// LOAD DOCTORS FROM DATA.JSON
// ==========================================

document.addEventListener("DOMContentLoaded", function() {

    loadDoctors();

    const savedDoctor =
        localStorage.getItem("selectedDoctor");

    if (savedDoctor) {

        showDashboard(savedDoctor);

    }

});


// ==========================================
// LOAD DOCTOR LIST
// ==========================================

function loadDoctors() {

    fetch("../data.json")

        .then(response => {

            if (!response.ok) {
                throw new Error("Could not load data.json");
            }

            return response.json();

        })

        .then(data => {

            const select =
                document.getElementById("doctorSelect");

            data.doctors.forEach(doctor => {

                const option =
                    document.createElement("option");

                option.value = doctor.name;

                option.textContent =
                    doctor.name + " - " + doctor.specialization;

                select.appendChild(option);

            });

        })

        .catch(error => {

            console.error(error);

            alert(
                "Unable to load doctor information."
            );

        });

}


// ==========================================
// SELECT DOCTOR
// ==========================================

document.addEventListener("change", function(event) {

    if (event.target.id !== "doctorSelect") {
        return;
    }

    const doctorName =
        event.target.value;

    const doctorId =
        document.getElementById("doctorId");

    if (
        doctorName &&
        doctorAccounts[doctorName]
    ) {

        doctorId.value =
            doctorAccounts[doctorName].id;

    } else {

        doctorId.value = "";

    }

});


// ==========================================
// DOCTOR LOGIN
// ==========================================

function doctorLogin() {

    const doctorName =
        document.getElementById("doctorSelect").value;

    const doctorId =
        document.getElementById("doctorId").value.trim();

    const password =
        document.getElementById("doctorPassword").value;


    if (!doctorName || !doctorId || !password) {

        alert("Please fill all login details.");

        return;

    }


    const account =
        doctorAccounts[doctorName];


    if (!account) {

        alert("Please select a valid doctor.");

        return;

    }


    if (
        doctorId === account.id &&
        password === account.password
    ) {

        localStorage.setItem(
            "doctorLoggedIn",
            "true"
        );

        localStorage.setItem(
            "selectedDoctor",
            doctorName
        );


        alert(
            "Login successful. Welcome " +
            doctorName + "!"
        );


        showDashboard(doctorName);

    } else {

        alert(
            "Invalid Doctor ID or Password."
        );

    }

}


// ==========================================
// SHOW DASHBOARD
// ==========================================

function showDashboard(doctorName) {

    document.getElementById(
        "doctorLogin"
    ).style.display = "none";


    document.getElementById(
        "doctorDashboard"
    ).style.display = "block";


    document.getElementById(
        "loggedDoctorName"
    ).textContent = doctorName;


    document.getElementById(
        "appointmentDoctorName"
    ).textContent = doctorName;


    loadDashboard(doctorName);

}


// ==========================================
// LOAD DASHBOARD
// ==========================================

function loadDashboard(doctorName) {

    displayAdminAppointments(
        doctorName
    );

    loadAvailability(
        doctorName
    );

}


// ==========================================
// DISPLAY APPOINTMENTS
// ==========================================

function displayAdminAppointments(
    doctorName
) {

    const container =
        document.getElementById(
            "adminAppointmentList"
        );


    const appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        ) || [];


    // Only appointments for selected doctor

    const doctorAppointments =
        appointments.filter(
            appointment =>
                appointment.doctor === doctorName
        );


    // Total

    document.getElementById(
        "totalAppointments"
    ).textContent =
        doctorAppointments.length;


    // Confirmed

    document.getElementById(
        "confirmedAppointments"
    ).textContent =
        doctorAppointments.filter(
            appointment =>
                appointment.status === "Confirmed"
        ).length;


    // Pending

    document.getElementById(
        "pendingAppointments"
    ).textContent =
        doctorAppointments.filter(
            appointment =>
                appointment.status === "Pending"
        ).length;


    // Unique patients

    const patients =
        new Set(
            doctorAppointments.map(
                appointment =>
                    appointment.patient
            )
        );


    document.getElementById(
        "patientCount"
    ).textContent =
        patients.size;


    // No appointments

    if (doctorAppointments.length === 0) {

        container.innerHTML = `
            <p class="empty">
                No appointments for ${doctorName}.
            </p>
        `;

        return;

    }


    container.innerHTML = "";


    doctorAppointments.forEach(
        appointment => {

            const card =
                document.createElement("div");

            card.className =
                "appointment-card";


            card.innerHTML = `

                <h3>
                    Patient: ${appointment.patient}
                </h3>

                <p>
                    <strong>Doctor:</strong>
                    ${appointment.doctor}
                </p>

                <p>
                    <strong>Date:</strong>
                    ${appointment.date}
                </p>

                <p>
                    <strong>Time:</strong>
                    ${appointment.time}
                </p>

                <p>
                    <strong>Reason:</strong>
                    ${appointment.reason || "Not provided"}
                </p>

                <p>
                    <strong>Status:</strong>

                    <span class="status ${appointment.status.toLowerCase()}">
                        ${appointment.status}
                    </span>
                </p>

                ${
                    appointment.status !== "Cancelled"
                    ?
                    `
                    <div class="appointment-buttons">

                        <button
                            class="confirm-btn"
                            onclick="updateAppointment(
                                ${appointment.id},
                                'Confirmed'
                            )">
                            Confirm
                        </button>

                        <button
                            class="cancel-btn"
                            onclick="updateAppointment(
                                ${appointment.id},
                                'Cancelled'
                            )">
                            Cancel
                        </button>

                    </div>
                    `
                    :
                    ""
                }

            `;


            container.appendChild(card);

        }
    );

}


// ==========================================
// UPDATE APPOINTMENT
// ==========================================

function updateAppointment(
    id,
    status
) {

    const appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        ) || [];


    const appointment =
        appointments.find(
            item => item.id === id
        );


    if (!appointment) {

        alert("Appointment not found.");

        return;

    }


    appointment.status =
        status;


    localStorage.setItem(
        "appointments",
        JSON.stringify(
            appointments
        )
    );


    const doctorName =
        localStorage.getItem(
            "selectedDoctor"
        );


    displayAdminAppointments(
        doctorName
    );


    alert(
        "Appointment " +
        status.toLowerCase() +
        " successfully."
    );

}


// ==========================================
// SAVE AVAILABILITY
// ==========================================

function saveAvailability() {

    const from =
        document.getElementById(
            "availableFrom"
        ).value;


    const until =
        document.getElementById(
            "availableUntil"
        ).value;


    const doctorName =
        localStorage.getItem(
            "selectedDoctor"
        );


    if (!from || !until) {

        alert(
            "Please select both time values."
        );

        return;

    }


    if (from >= until) {

        alert(
            "Available From time must be before Available Until time."
        );

        return;

    }


    const availability =
        JSON.parse(
            localStorage.getItem(
                "doctorAvailability"
            )
        ) || {};


    availability[doctorName] = {

        from: from,

        until: until

    };


    localStorage.setItem(
        "doctorAvailability",
        JSON.stringify(
            availability
        )
    );


    document.getElementById(
        "availabilityMessage"
    ).textContent =
        "Availability saved successfully.";

}


// ==========================================
// LOAD AVAILABILITY
// ==========================================

function loadAvailability(
    doctorName
) {

    const availability =
        JSON.parse(
            localStorage.getItem(
                "doctorAvailability"
            )
        ) || {};


    const doctorAvailability =
        availability[doctorName];


    if (!doctorAvailability) {
        return;
    }


    document.getElementById(
        "availableFrom"
    ).value =
        doctorAvailability.from;


    document.getElementById(
        "availableUntil"
    ).value =
        doctorAvailability.until;

}


// ==========================================
// LOGOUT
// ==========================================

function logoutDoctor() {

    localStorage.removeItem(
        "doctorLoggedIn"
    );

    localStorage.removeItem(
        "selectedDoctor"
    );


    window.location.href =
        "../index.html";

}


// ==========================================
// GO HOME
// ==========================================

function goHome() {

    window.location.href =
        "../index.html";

}