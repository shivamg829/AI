document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinkItems = document.querySelectorAll('.nav-link');
    
    hamburger.addEventListener('click', function() {
        this.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    navLinkItems.forEach(item => {
        item.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            }
        });
    });
    
    // Header Scroll Effect
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Active Navigation Link on Scroll
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', function() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinkItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
    
    // Populate Doctors Section
    const doctorsContainer = document.querySelector('.doctors-container');
    const doctorsData = [
        {
            name: "Dr. Gregory House",
            specialty: "Diagnostic Medicine",
            bio: "Dr. Gregory House tackles health mysteries as would a medical Sherlock Holmes, all the while playing mind games with colleagues that include his best friend, oncologist James Wilson.",
            image: "house.jpg"
        },
        {
            name: "Dr. Meredith Grey",
            specialty: "General Surgery",
            bio: "Meredith Grey is the daughter of a famous surgeon. Grey struggles to maintain relationships with her colleagues, particularly the hospital's one-time chief of surgery.",
            image: "grey.jpg"
        },
        {
            name: "Dr. Shaun Murphy",
            specialty: "Surgical Resident",
            bio: "Shaun Murphy, a young autistic surgeon who has savant syndrome, relocates from a quiet country life to join the surgical unit at the prestigious San Jose St. Bonaventure Hospital.",
            image: "OIP (1).jpg"
        },
        {
            name: "Dr. Max Goodwin",
            specialty: "Medical Director",
            bio: "Dr. Max Goodwin is brilliant, charming -- and the new medical director at America's oldest public hospital.",
            image: "OIP (2).jpg"
        },
    
    ];
    
    doctorsData.forEach(doctor => {
        const doctorCard = document.createElement('div');
        doctorCard.className = 'doctor-card';
        doctorCard.innerHTML = `
            <div class="doctor-image">
                <img src="${doctor.image}" alt="${doctor.name}">
            </div>
            <div class="doctor-info">
                <h3 class="doctor-name">${doctor.name}</h3>
                <span class="doctor-specialty">${doctor.specialty}</span>
                <p class="doctor-bio">${doctor.bio}</p>
                <div class="doctor-social">
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fas fa-envelope"></i></a>
                </div>
            </div>
        `;
        doctorsContainer.appendChild(doctorCard);
    });
    
    // Populate Services Section
    const servicesContainer = document.querySelector('.services-container');
    const servicesData = [
        {
            title: "Emergency Transport",
            description: "Our fleet of state-of-the-art ambulances is equipped with cutting-edge medical technology and staffed by highly trained professionals, ensuring swift and expert care during emergencies.",
            icon: "fa-ambulance"
        },
        {
            title: "Pharmacy Services",
            description: "At the heart of our commitment to excellence is a state-of-the-art inventory of medical equipment designed to enhance diagnostics, treatments, and overall patient experience.",
            icon: "fa-pills"
        },
        {
            title: "Expert Doctors",
            description: "Our staff is the heartbeat of our hospital, and each member plays a crucial role in creating a supportive and healing environment.",
            icon: "fa-user-md"
        },
        {
            title: "Advanced Equipment",
            description: "Our hospital is equipped with state-of-the-art medical equipment designed to elevate the standard of diagnostics, treatments, and overall healthcare delivery.",
            icon: "fa-heartbeat"
        }
    ];
    
    servicesData.forEach(service => {
        const serviceCard = document.createElement('div');
        serviceCard.className = 'service-card';
        serviceCard.innerHTML = `
            <div class="service-icon">
                <i class="fas ${service.icon}"></i>
            </div>
            <h3 class="service-title">${service.title}</h3>
            <p class="service-description">${service.description}</p>
        `;
        servicesContainer.appendChild(serviceCard);
    });
    
    // Populate Reviews Section
    const reviewsContainer = document.querySelector('.reviews-container');
    const reviewsData = [
        {
            name: "Vibanshu Sharma",
            text: "I had a great experience with Dr. Johnson! They were attentive, took the time to explain things thoroughly, and made me feel comfortable. The staff was friendly, and the clinic was well-organized. I highly recommend Dr. Johnson for anyone seeking a caring and knowledgeable general practitioner.",
            rating: 4,
            image: "house.jpg"
        },
        {
            name: "Nitesh Kumar",
            text: "I want to express my gratitude to Dr. Rodriguez, the specialist I consulted. Their expertise and professionalism were outstanding. They listened to my concerns, provided clear explanations, and developed a comprehensive treatment plan. The entire process was smooth, and I feel confident in the care I received.",
            rating: 5,
            image: "house2.jpg"
        },
        {
            name: "Deshraj Soni",
            text: "Overall, my experience at Apollo Clinic was positive. The doctors were good, but the wait times were a bit long. It would be great if the clinic could improve its scheduling system to minimize wait times. The staff was friendly, and the facility was clean.",
            rating: 3,
            image: "max.jpg"
        },
        {
            name: "Aditya Kumar",
            text: "I want to thank the emergency room team at Apollo Hospital. They were quick to respond, efficient, and caring during a stressful situation. The nurses and doctors worked seamlessly to provide the necessary care. I'm grateful for their expertise and dedication.",
            rating: 4,
            image: "gray.jpg"
        },
        {
            name: "Shivam",
            text: "Dr. Smith is amazing with kids! My child felt comfortable and at ease during the appointment. Dr. Smith took the time to explain things in a way that my child could understand, and their approach was gentle and reassuring. The entire pediatric team deserves recognition.",
            rating: 5,
            image: "gooddoc.jpg"
        }
    ];
    
    const reviewSlider = document.createElement('div');
    reviewSlider.className = 'review-slider';
    
    reviewsData.forEach(review => {
        const reviewCard = document.createElement('div');
        reviewCard.className = 'review-card';
        
        let stars = '';
        for (let i = 0; i < 5; i++) {
            stars += i < review.rating ? '★' : '☆';
        }
        
        reviewCard.innerHTML = `
            <div class="review-content">
                <p class="review-text">${review.text}</p>
                <div class="review-author">
                    <div class="author-avatar">
                        <img src="${review.image}" alt="${review.name}">
                    </div>
                    <div class="author-info">
                        <h4>${review.name}</h4>
                        <div class="rating">${stars}</div>
                    </div>
                </div>
            </div>
        `;
        reviewSlider.appendChild(reviewCard);
    });
    
    reviewsContainer.appendChild(reviewSlider);
    
    // Add slider controls
    const sliderControls = document.createElement('div');
    sliderControls.className = 'slider-controls';
    
    reviewsData.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.className = 'slider-dot';
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            document.querySelectorAll('.slider-dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            reviewSlider.scrollTo({
                left: index * (350 + 30),
                behavior: 'smooth'
            });
        });
        sliderControls.appendChild(dot);
    });
    
    reviewsContainer.appendChild(sliderControls);
    
    // Auto-scroll reviews
    let currentSlide = 0;
    setInterval(() => {
        currentSlide = (currentSlide + 1) % reviewsData.length;
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            if (i === currentSlide) {
                dot.classList.add('active');
                reviewSlider.scrollTo({
                    left: i * (350 + 30),
                    behavior: 'smooth'
                });
            } else {
                dot.classList.remove('active');
            }
        });
    }, 5000);
    
    // Form Submission
    const appointmentForm = document.getElementById('appointment-form');
    const newsletterForm = document.querySelector('.newsletter-form');
    
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        const data = Object.fromEntries(formData.entries());
        
        // Here you would typically send the data to a server
        console.log('Appointment booked:', data);
        
        // Show success message
        alert('Appointment booked successfully! We will contact you shortly to confirm.');
        this.reset();
    });
    
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = this.querySelector('input[type="email"]').value;
        
        // Here you would typically send the email to a server
        console.log('Subscribed email:', email);
        
        // Show success message
        alert('Thank you for subscribing to our newsletter!');
        this.reset();
    });
    
    // Current year in footer
    document.querySelector('.footer-bottom p').innerHTML = 
        `&copy; ${new Date().getFullYear()} Apollo Hospitals. All Rights Reserved.`;
});
