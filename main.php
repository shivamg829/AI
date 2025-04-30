<?php
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Apollo Hospitals - Premium Healthcare Services</title>
    <link rel="stylesheet" href="styles1.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
</head>
<body>
    <!-- Header/Navigation -->
    <header class="header">
        <nav class="navbar">
            <div class="logo-container">
                <img src="logo.png" alt="Apollo Hospitals Logo" class="logo">
                <span class="logo-text">Apollo Hospitals</span>
            </div>
            <ul class="nav-links">
                <li><a href="#home" class="nav-link active">Home</a></li>
                <li><a href="#doctors" class="nav-link">Doctors</a></li>
                <li><a href="#services" class="nav-link">Services</a></li>
                <li><a href="#reviews" class="nav-link">Reviews</a></li>
                <li><a href="#appointment" class="nav-link">Appointment</a></li>
                <li><a href="#contact" class="nav-link">Contact</a></li>
                <li><a href="login.php" class="nav-link">Login</a></li>
            </ul>
            <div class="hamburger">
                <div class="line"></div>
                <div class="line"></div>
                <div class="line"></div>
            </div>
        </nav>
    </header>

    <!-- Hero Section -->
    <section class="hero" id="home">
        <div class="video-background">
            <video autoplay muted loop id="hero-video">
                <source src="video.mp4" type="video/mp4">
            </video>
            <div class="video-overlay"></div>
        </div>
        <div class="hero-content">
            <h2 class="hero-subtitle">WELCOME TO</h2>
            <h1 class="hero-title">APOLLO HOSPITALS</h1>
            <p class="hero-text">Where compassionate care meets cutting-edge medical expertise. Our hospital is dedicated to providing exceptional healthcare services to our community.</p>
            <div class="hero-buttons">
                <a href="#appointment" class="btn btn-primary">Book Appointment</a>
                <a href="#services" class="btn btn-secondary">Our Services</a>
            </div>
        </div>
        <div class="scroll-down">
            <span>Scroll Down</span>
            <i class="fas fa-chevron-down"></i>
        </div>
    </section>

    <!-- Doctors Section -->
    <section class="section doctors-section" id="doctors">
        <div class="section-header">
            <h2 class="section-title">Our Team of Specialists</h2>
            <p class="section-subtitle">Meet our highly qualified medical professionals</p>
            <div class="divider"></div>
        </div>
        <div class="doctors-container">
            
        </div>
    </section>

    <!-- Services Section -->
    <section class="section services-section" id="services">
        <div class="section-header">
            <h2 class="section-title">Our Premium Services</h2>
            <p class="section-subtitle">Comprehensive healthcare solutions for all your needs</p>
            <div class="divider"></div>
        </div>
        <div class="services-container">
            
        </div>
    </section>

    <!-- Reviews Section -->
    <section class="section reviews-section" id="reviews">
        <div class="section-header">
            <h2 class="section-title">Patient Testimonials</h2>
            <p class="section-subtitle">What our patients say about us</p>
            <div class="divider"></div>
        </div>
        <div class="reviews-container">
            
        </div>
    </section>

    <!-- Appointment Section -->
    <section class="section appointment-section" id="appointment">
        <div class="section-header">
            <h2 class="section-title">Book An Appointment</h2>
            <p class="section-subtitle">Schedule your visit with our specialists</p>
            <div class="divider"></div>
        </div>
        <div class="appointment-container">
            <div class="appointment-form-container">
                <form id="appointment-form" class="appointment-form">
                    <div class="form-group">
                        <input type="text" id="name" name="name" placeholder="Full Name" required>
                    </div>
                    <div class="form-group">
                        <input type="email" id="email" name="email" placeholder="Email Address" required>
                    </div>
                    <div class="form-group">
                        <input type="tel" id="phone" name="phone" placeholder="Phone Number" required>
                    </div>
                    <div class="form-group">
                        <select id="department" name="department" required>
                            <option value="" disabled selected>Select Department</option>
                            <option value="cardiology">Cardiology</option>
                            <option value="neurology">Neurology</option>
                            <option value="orthopedics">Orthopedics</option>
                            <option value="pediatrics">Pediatrics</option>
                            <option value="general">General Medicine</option>
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <input type="date" id="date" name="date" required>
                        </div>
                        <div class="form-group">
                            <input type="time" id="time" name="time" required>
                        </div>
                    </div>
                    <div class="form-group">
                        <textarea id="message" name="message" placeholder="Additional Information"></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary">Book Appointment</button>
                </form>
            </div>
            <div class="appointment-info">
                <h3>Why Choose Apollo Hospitals?</h3>
                <ul class="benefits-list">
                    <li><i class="fas fa-check-circle"></i> 24/7 Emergency Services</li>
                    <li><i class="fas fa-check-circle"></i> World-class Medical Facilities</li>
                    <li><i class="fas fa-check-circle"></i> Experienced Specialists</li>
                    <li><i class="fas fa-check-circle"></i> Patient-centered Care</li>
                    <li><i class="fas fa-check-circle"></i> Advanced Diagnostic Tools</li>
                </ul>
                <div class="contact-info">
                    <h4>Contact Us</h4>
                    <p><i class="fas fa-phone"></i> 8809903280</p>
                    <p><i class="fas fa-envelope"></i> info@apollohospitals.com</p>
                    <p><i class="fas fa-map-marker-alt"></i> Lovely Proffesional University</p>
                </div>
            </div>
        </div>
    </section>

    <!-- Newsletter Section -->
    <section class="section newsletter-section" id="contact">
        <div class="newsletter-container">
            <div class="newsletter-content">
                <h2>Subscribe to Our Newsletter</h2>
                <p>Stay updated with our latest news, health tips, and special offers</p>
            </div>
            <form class="newsletter-form">
                <input type="email" placeholder="Your Email Address" required>
                <button type="submit" class="btn btn-primary">Subscribe</button>
            </form>
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-container">
            <div class="footer-about">
                <div class="logo-container">
                    <img src="logo.png" alt="Apollo Hospitals Logo" class="footer-logo">
                    <span class="logo-text">Apollo Hospitals</span>
                </div>
                <p>Committed to providing exceptional healthcare services with compassion and cutting-edge technology.</p>
                <div class="social-links">
                    <a href="#"><i class="fab fa-facebook-f"></i></a>
                    <a href="#"><i class="fab fa-twitter"></i></a>
                    <a href="#"><i class="fab fa-instagram"></i></a>
                    <a href="#"><i class="fab fa-linkedin-in"></i></a>
                </div>
            </div>
            <div class="footer-links">
                <h3>Quick Links</h3>
                <ul>
                    <li><a href="#home">Home</a></li>
                    <li><a href="#doctors">Doctors</a></li>
                    <li><a href="#services">Services</a></li>
                    <li><a href="#reviews">Patient Reviews</a></li>
                    <li><a href="#appointment">Appointment</a></li>
                </ul>
            </div>
            <div class="footer-services">
                <h3>Our Services</h3>
                <ul>
                    <li><a href="#">Emergency Care</a></li>
                    <li><a href="#">Cardiology</a></li>
                    <li><a href="#">Neurology</a></li>
                    <li><a href="#">Orthopedics</a></li>
                    <li><a href="#">Pediatrics</a></li>
                </ul>
            </div>
            <div class="footer-contact">
                <h3>Contact Us</h3>
                <p><i class="fas fa-map-marker-alt"></i>Lovely Proffesional University</p>
                <p><i class="fas fa-phone"></i> 8809903280</p>
                <p><i class="fas fa-envelope"></i> info@apollohospitals.com</p>
                <p><i class="fas fa-clock"></i> Open 24/7</p>
            </div>
        </div>
        <div class="footer-bottom">
            <p>&copy; 2025 Apollo Hospitals. All Rights Reserved.</p>
            <div class="legal-links">
                <a href="#">Privacy Policy</a>
                <a href="#">Terms of Service</a>
            </div>
        </div>
    </footer>

    <!-- Back to Top Button -->
    <a href="#home" class="back-to-top" id="backToTop">
        <i class="fas fa-arrow-up"></i>
    </a>
    <!-- Chatbot Widget -->
    <div class="chatbot-container" id="chatbotContainer">
        <div class="chatbot-header">
            <h3>Apollo Health Assistant</h3>
            <button class="chatbot-close" id="chatbotClose"><i class="fas fa-times"></i></button>
        </div>
        <div class="chatbot-messages" id="chatbotMessages">
            <div class="message bot-message">Hello! Welcome to Apollo Hospitals. How can I assist you today?</div>
        </div>
        <div class="chatbot-input">
            <input type="text" id="chatbotInput" placeholder="Type your message..." autocomplete="off">
            <button id="chatbotSend"><i class="fas fa-paper-plane"></i></button>
        </div>
    </div>
    <button class="chatbot-icon" id="chatbotIcon"><i class="fas fa-comment-medical"></i></button>
    <script src="chat.js"></script>
    <script src="script.js"></script>
</body>
</html>
