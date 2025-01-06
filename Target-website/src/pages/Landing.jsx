// import React from 'react';
import FullscreenSlider from "../components/Slider";


const Landing = () => {
    return (

        <>
        
        
         {/* Fullscreen Slider */}
         <div className="fullscreen-slider">
          <FullscreenSlider />
        </div>

        {/* Card Section */}
        <section className="card-section container">
          <div className="row justify-content-center align-items-center">
            <div className="col-md-4 text-center">
              <h1>Target for Engineering</h1>
              <p>
                A story of more than just Engineering, but also of a family that has been working together for more than 30 years.
              </p>
              <button className="btn btn-primary">Learn More</button>
            </div>
            <div className="col-md-6">
              <img
                src="https://orascom.com/wp-content/uploads/Plant-1-Bahr-2.png"
                alt="Random"
                className="img-fluid"
              />
            </div>
          </div>
        </section>
        </>
        // <div style={styles.container}>
        //     <header style={styles.header}>
        //         <h1>Welcome to Our Website</h1>
        //         <p>Your journey starts here</p>
        //     </header>
        //     <main style={styles.main}>
        //         <section style={styles.section}>
        //             <h2>About Us</h2>
        //             <p>We are committed to providing the best service.</p>
        //         </section>
        //         <section style={styles.section}>
        //             <h2>Services</h2>
        //             <p>Explore the wide range of services we offer.</p>
        //         </section>
        //         <section style={styles.section}>
        //             <h2>Contact</h2>
        //             <p>Get in touch with us for more information.</p>
        //         </section>
        //     </main>
        //     <footer style={styles.footer}>
        //         <p>&copy; 2023 Our Website. All rights reserved.</p>
        //     </footer>
        // </div>
    );
};

// const styles = {
//     container: {
//         fontFamily: 'Arial, sans-serif',
//         textAlign: 'center',
//         padding: '20px',
//     },
//     header: {
//         backgroundColor: '#f8f9fa',
//         padding: '20px',
//         borderBottom: '1px solid #dee2e6',
//     },
//     main: {
//         padding: '20px',
//     },
//     section: {
//         margin: '20px 0',
//     },
//     footer: {
//         backgroundColor: '#f8f9fa',
//         padding: '10px',
//         borderTop: '1px solid #dee2e6',
//     },
// };

export default Landing;