// ==========================================
// LOAD DOCTORS
// ==========================================

fetch("../data.json")

    .then(response => response.json())

    .then(data => {

        const doctors = data.doctors;

        const container =
            document.getElementById("doctorContainer");

        const select =
            document.getElementById("doctorSelect");


        doctors.forEach(doctor => {

            const card =
                document.createElement("div");

            card.className = "doctor-card";


            card.innerHTML = `

                <div class="doctor-image">
                    ${doctor.image}
                </div>

                <h3>
                    ${doctor.name}
                </h3>

                <p class="specialization">
                    ${doctor.specialization}
                </p>

                <p>
                    Experience:
                    ${doctor.experience}
                </p>

                <p>
                    Available:
                    ${doctor.available}
                </p>

                <button
                    onclick="selectDoctor('${doctor.name}')">

                    Book Appointment

                </button>

            `;


            container.appendChild(card);


            const option =
                document.createElement("option");

            option.value =
                doctor.name;

            option.textContent =
                doctor.name +
                " - " +
                doctor.specialization;

            select.appendChild(option);

        });

    })

    .catch(error => {

        console.log(
            "Error loading doctors:",
            error
        );

    });


// ==========================================
// PATIENT INFORMATION
// ==========================================

const patient =
    JSON.parse(
        localStorage.getItem("patient")
    );


if (patient) {

    document.getElementById(
        "patientNameDisplay"
    ).textContent =
        patient.name;

    document.getElementById(
        "appointmentPatient"
    ).value =
        patient.name;

}


// ==========================================
// SELECT DOCTOR
// ==========================================

function selectDoctor(doctorName) {

    document.getElementById(
        "doctorSelect"
    ).value =
        doctorName;


    document.getElementById(
        "booking"
    ).scrollIntoView({

        behavior: "smooth"

    });

}


// ==========================================
// BOOK APPOINTMENT
// ==========================================

function bookAppointment(event) {

    event.preventDefault();


    const patientName =
        document.getElementById(
            "appointmentPatient"
        ).value;


    const doctor =
        document.getElementById(
            "doctorSelect"
        ).value;


    const date =
        document.getElementById(
            "appointmentDate"
        ).value;


    const time =
        document.getElementById(
            "appointmentTime"
        ).value;


    const reason =
        document.getElementById(
            "appointmentReason"
        ).value.trim();


    if (
        patientName === "" ||
        doctor === "" ||
        date === "" ||
        time === ""
    ) {

        alert(
            "Please fill all appointment details."
        );

        return;
    }


    const appointment = {

        id: Date.now(),

        patient: patientName,

        doctor: doctor,

        date: date,

        time: time,

        reason: reason,

        status: "Pending"

    };


    let appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        ) || [];


    appointments.push(
        appointment
    );


    localStorage.setItem(
        "appointments",
        JSON.stringify(
            appointments
        )
    );


    alert(
        "Appointment booked successfully!"
    );


    document.getElementById(
        "appointmentDate"
    ).value = "";

    document.getElementById(
        "appointmentTime"
    ).value = "";

    document.getElementById(
        "appointmentReason"
    ).value = "";


    displayAppointments();

}


// ==========================================
// DISPLAY APPOINTMENTS
// ==========================================

function displayAppointments() {

    const appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        ) || [];


    const list =
        document.getElementById(
            "appointmentList"
        );


    if (appointments.length === 0) {

        list.innerHTML = `
            <p class="empty">
                No appointments booked yet.
            </p>
        `;

        return;
    }


    list.innerHTML = "";


    appointments.forEach(
        (appointment, index) => {

            list.innerHTML += `

                <div class="appointment-card">

                    <h3>
                        📅 Appointment ${index + 1}
                    </h3>

                    <p>
                        <strong>Patient:</strong>
                        ${appointment.patient}
                    </p>

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
                        ${appointment.reason || "General consultation"}
                    </p>

                    <p>
                        <strong>Status:</strong>

                        <span class="status">
                            ${appointment.status}
                        </span>

                    </p>


                    <button
                        class="cancel-btn"
                        onclick="cancelAppointment(${appointment.id})">

                        Cancel Appointment

                    </button>

                </div>

            `;

        }
    );

}


// ==========================================
// CANCEL APPOINTMENT
// ==========================================

function cancelAppointment(id) {

    let appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        ) || [];


    appointments =
        appointments.filter(
            appointment =>
                appointment.id !== id
        );


    localStorage.setItem(
        "appointments",
        JSON.stringify(
            appointments
        )
    );


    displayAppointments();


    alert(
        "Appointment cancelled successfully."
    );

}


// ==========================================
// VIRTUAL CONSULTATION
// ==========================================

function startConsultation() {

    const appointments =
        JSON.parse(
            localStorage.getItem(
                "appointments"
            )
        ) || [];


    if (appointments.length === 0) {

        alert(
            "Please book an appointment before starting a consultation."
        );

        document.getElementById(
            "booking"
        ).scrollIntoView({

            behavior: "smooth"

        });

        return;
    }


    document.getElementById(
        "consultationModal"
    ).style.display =
        "flex";

}


// ==========================================
// CLOSE CONSULTATION
// ==========================================

function closeConsultation() {

    document.getElementById(
        "consultationModal"
    ).style.display =
        "none";

}


// ==========================================
// MICROPHONE
// ==========================================

function toggleMic() {

    alert(
        "Microphone control activated."
    );

}


// ==========================================
// CAMERA
// ==========================================

function toggleCamera() {

    alert(
        "Camera control activated."
    );

}


// ==========================================
// LOGOUT
// ==========================================

function logout() {

    localStorage.removeItem(
        "loggedInUser"
    );

    window.location.href =
        "../index.html";

}


// ==========================================
// INITIAL LOAD
// ==========================================

displayAppointments();


// ==========================================
// OPEN CORRECT SECTION FROM HOME PAGE
// ==========================================

window.addEventListener("load", function() {

    const section =
        window.location.hash;


    if (section) {

        setTimeout(function() {

            const element =
                document.querySelector(section);

            if (element) {

                element.scrollIntoView({
                    behavior: "smooth"
                });

            }

        }, 500);

    }

});