"use client"
import React from 'react';

const TermsConditionsPage: React.FC = () => {
  return (
    <div style={{
      padding: '20px 16px',
      fontFamily: 'sans-serif',
      lineHeight: '1.6',
      textAlign: 'left',
      fontSize: '16px'
    }}>
      <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '10px' }}>Terms and Conditions</h1>
      <p style={{ marginBottom: '30px' }}>
        Please read these terms carefully before using MELETE
      </p>

      <section>
        <p>
          • Please read these Terms and Conditions carefully before using the MELETE mobile application ("Application", "Service") operated by MELETE WELLNESS SOLUTIONS PRIVATE LIMITED ("Company", "We", "Us", or "Our").
        </p>
        <p>
          • By downloading or using the Application, you agree to abide by these Terms and Conditions. If you do not agree to these Terms, please refrain from using the Service.
        </p>
      </section>

      <p><strong>• 1. Interpretation and Definitions</strong></p>
      <p><strong>Definitions</strong></p>
      <ul>
        <li>Application refers to MELETE, the mental health mobile application.</li>
        <li>Account means an individual user account created to access the Application's services.</li>
        <li>Company refers to MELETE WELLNESS SOLUTIONS PRIVATE LIMITED, registered in India.</li>
        <li>Service refers to the Application and all services made available through it.</li>
        <li>Content means any text, audio, video, graphics, or other material posted or made available through the Application.</li>
        <li>You refers to the individual accessing the Application or using the Service, or any legal entity on whose behalf the Service is used.</li>
      </ul>

      <p><strong>• 2. Acknowledgment</strong></p>
      <ul>
        <li>These Terms constitute an agreement between You and the Company regarding your use of the Service.</li>
        <li>You affirm that you are at least 18 years of age or using the app under parental supervision.</li>
        <li>Your access and use of the Service is also conditioned on your acceptance of and compliance with our Privacy Policy.</li>
      </ul>

      <p><strong>• 3. User Accounts</strong></p>
      <ul>
        <li>To access certain features, you must register an account with accurate and complete information.</li>
        <li>You are responsible for safeguarding your password and all activities under your account.</li>
        <li>You agree not to:
          <ul>
            <li>Impersonate any person or entity</li>
            <li>Share your credentials</li>
            <li>Use offensive, obscene, or misleading usernames</li>
          </ul>
        </li>
        <li>Notify us immediately of any unauthorized account use.</li>
      </ul>

      <p><strong>• 4. Services Provided</strong></p>
      <ul>
        <li>Access online counselling, yoga, mindfulness resources, guided meditation, and wellness programs</li>
        <li>Book sessions with certified mental health professionals and yoga trainers</li>
        <li>Receive mental wellness content and notifications</li>
        <li>Participate in custom wellness programs</li>
      </ul>
      <p style={{ color: 'red' }}>
        <strong>Important:</strong> This Application is not intended for emergency medical services. In case of a crisis, contact your local emergency number.
      </p>

      <p><strong>• 5. Content and Usage Restrictions</strong></p>
      <ul>
        <li>You agree not to:
          <ul>
            <li>Post unlawful, abusive, defamatory, or discriminatory content</li>
            <li>Upload content containing viruses or malware</li>
            <li>Violate intellectual property rights</li>
            <li>Use the Service for unauthorized commercial purposes</li>
            <li>Misrepresent or impersonate others</li>
          </ul>
        </li>
        <li>We reserve the right to remove any content deemed inappropriate.</li>
      </ul>

      <p><strong>• 6. Privacy and Data Handling</strong></p>
      <ul>
        <li>By using the Application, you consent to the collection and use of data per our Privacy Policy.</li>
        <li>This may include:
          <ul>
            <li>Name, age, contact details, and booking history</li>
            <li>Device, usage, and location data (when permitted)</li>
          </ul>
        </li>
      </ul>

      <p><strong>• 7. Intellectual Property</strong></p>
      <p>The Service, content, and all intellectual property rights remain the property of the Company.No part of the Service may be copied, reproduced, or redistributed without our prior written consent.</p>

      <p><strong>• 8. Third-Party Services</strong></p>
      <p>The Application may contain links to third-party websites or services. We have no control over their content, privacy policies, or practices and assume no responsibility for them.</p>

      <p><strong>• 9. Limitation of Liability</strong></p>
      <ul>
        <li>The Application is provided "as is" without warranties.</li>
        <li>The Company will not be liable for indirect, incidental, or consequential damages.</li>
        <li>Liability is limited to the amount paid for the Service, whichever is lower.</li>
      </ul>

      <p><strong>• 10. Termination</strong></p>
      <p>We reserve the right to suspend or terminate your account without notice if you breach these Terms.Upon termination, your right to use the Service ceases immediately.</p>

      <p><strong>• 11. Changes to These Terms</strong></p>
      <p>We may amend these Terms periodically. Continued use of the Application after changes implies acceptance of the updated Terms.</p>

      <p><strong>• 12. Governing Law</strong></p>
      <p>These Terms are governed by the laws of INDIA.</p>

      <p><strong>• 13. Dispute Resolution</strong></p>
      <p>For any concerns or disputes, you agree to first contact us for informal resolution. Failing which, the dispute shall be subject to the jurisdiction of Calicut.</p>

      <p><strong>• 14. Contact Us</strong></p>
      <ul>
        <li><strong>Company:</strong> Melete Wellness Solutions Private Limited</li>
        <li><strong>Email:</strong> meletewellnesssolutions@gmail.com</li>
        <li><strong>Phone:</strong> +91 8943175522</li>
        <li><strong>Address:</strong> 2nd Floor, VK Tower, Mankavu, Calicut-673007</li>
      </ul>

      <footer style={{ marginTop: '40px', borderTop: '1px solid #ccc', paddingTop: '20px', fontSize: '14px', color: '#666' }}>
        Last updated: {new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })}
      </footer>
    </div>
  );
};

export default TermsConditionsPage;
