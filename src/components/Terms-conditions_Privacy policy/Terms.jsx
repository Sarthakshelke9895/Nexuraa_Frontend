import React from 'react'
import './Terms.css';
import Backarow from '../../assets/backarrow.png';
const Terms = () => {

    const handlebackclick = () => {
        window.history.back();
      };
  return (
   
       <div className="terms-container">

       <nav className='randomnav'>
        <div className="background">
          <img src={Backarow} alt="Back" id='backarrow' onClick={handlebackclick} />
        </div>
        <img src="faviconserver" alt="logo" id='website_logonav' />
        <h1 id='website_namenav'>Nexuraa</h1>
      </nav>



      
      
      <header className="terms-header">
        <h1>Terms-Conditions & Privacy Policy</h1>
        <p>Welcome to Nexura: Online Hosting Platform for Mobile Applications</p>
      </header>
      <div className="terms-content">
        <section className="terms-section">
          <h2>1. Introduction</h2>
          <p>
            By accessing and using Nexura, you agree to comply with the terms outlined
            in this agreement. These terms govern the relationship between you and
            Nexura and set expectations for platform usage.
          </p>
        </section>

        <section className="terms-section">
          <h2>2. Account Creation</h2>
          <p>
            To host applications on Nexura, you must create an account. You are
            responsible for maintaining the confidentiality of your account credentials
            and agree to notify us immediately of any unauthorized access.
          </p>
        </section>

        <section className="terms-section">
          <h2>3. Application Hosting</h2>
          <p>
            Nexura provides hosting for mobile applications uploaded by users.
            Applications must comply with our content guidelines and must not
            contain prohibited material, including but not limited to:
          </p>
          <ul>
            <li>Malicious software or viruses</li>
            <li>Illegal or copyrighted content</li>
            <li>Content that violates user privacy or data security</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>4. Refund Policy</h2>
          <p>
            Nexura offers refunds under the following conditions:
          </p>
          <ul>
            <li>If the service is not delivered as promised due to technical issues.</li>
            <li>If you cancel your subscription within 14 days of the initial purchase, provided no apps have been uploaded during this period.</li>
            <li>Refunds will not be provided for partial subscription periods or for services already rendered.</li>
          </ul>
          <p>
            To request a refund, contact our support team with your account details
            and the reason for the refund.
          </p>
        </section>

        <section className="terms-section">
          <h2>5. Privacy Policy</h2>
          <p>
            Nexura is committed to protecting your personal information. By using
            our platform, you agree to the collection, use, and storage of your
            information as outlined below:
          </p>
          <ul>
            <li>Your personal details (name, email, etc.) are used to manage your account.</li>
            <li>Data related to your hosted applications is stored securely.</li>
            <li>Your information will not be shared with third parties without your consent, except as required by law.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>6. Payments</h2>
          <p>
            Nexura offers subscription-based plans for hosting applications:
          </p>
          <ul>
            <li>All payments are processed securely using industry-standard encryption.</li>
            <li>Recurring subscriptions will automatically renew unless canceled before the next billing date.</li>
            <li>Non-payment of subscription fees may result in suspension or termination of your account and hosted applications.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2>7. Updates and Maintenance</h2>
          <p>
            Users can update their hosted applications through the platform.
            Nexura reserves the right to review updates to ensure compliance with
            our policies before they go live.
          </p>
        </section>

        <section className="terms-section">
          <h2>8. Termination</h2>
          <p>
            Nexura reserves the right to terminate your account if you violate these
            terms. In such cases, hosted applications may be removed without prior
            notice.
          </p>
        </section>

        <section className="terms-section">
          <h2>9. Limitation of Liability</h2>
          <p>
            Nexura is not liable for damages arising from the use or inability to use
            the platform, including but not limited to loss of revenue or data.
          </p>
        </section>

        <section className="terms-section">
          <h2>10. Amendments</h2>
          <p>
            Nexura may update these terms at any time. Users will be notified of
            significant changes, and continued use of the platform implies acceptance
            of the updated terms.
          </p>
        </section>

      
      </div>
      <section className="terms-footer">
          <p>
            By using Nexura, you acknowledge that you have read, understood, and agree
            to these Terms and Conditions, including our Refund Policy, Privacy Policy,
            and Payment terms.
          </p>
        </section>
        <footer>
            
        </footer>
    </div>
   
  )
}

export default Terms
