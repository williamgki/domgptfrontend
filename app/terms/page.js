// app/terms-and-privacy/page.js
import React from 'react';

const TermsAndPrivacy = () => {
  const currentDate = new Date().toLocaleDateString();

  return (
    <div className="container mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy & Terms</h1>

      <section className="mb-8">
        <h2 className="text-2xl font-semibold mb-4">Privacy Policy</h2>
        <p className="mb-2">Last updated: {currentDate}</p>
        <p className="mb-4">This privacy policy explains how we handle information on this website.</p>

        <h3 className="text-xl font-semibold mb-2">Information Collection</h3>
        <p className="mb-4">We collect minimal information:</p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Server Logs:</strong> Like most websites, our server automatically records basic information about your visit, including your IP address, browser type, referring pages, time spent on pages, and date/time stamps. This data helps us understand site usage patterns and troubleshoot technical issues.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Third-Party Services</h3>
        <p className="mb-4">This website contains links to external services:</p>
        <ul className="list-disc list-inside mb-4">
          <li>
            <strong>Buy Me a Coffee:</strong> Our site includes links to Buy Me a Coffee for optional support. When you interact with these links, Buy Me a Coffee may set cookies and collect information according to their own privacy policy. We do not control or have access to this data.
          </li>
        </ul>

        <h3 className="text-xl font-semibold mb-2">Your Rights</h3>
        <p className="mb-4">Under UK data protection laws, you have rights regarding your personal data, including the right to access, correct, or request deletion of your data.</p>

        <h3 className="text-xl font-semibold mb-2">Contact Information</h3>
        <p>If you have questions about this privacy policy, please contact: <a href="mailto:domgpt@gmail.com">domgpt@gmail.com</a></p>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Terms of Use</h2>

        <h3 className="text-xl font-semibold mb-2">Agreement</h3>
        <p className="mb-4">By using this website, you agree to these terms of use. If you disagree with any part, please do not use the site.</p>

        <h3 className="text-xl font-semibold mb-2">Content and Copyright</h3>
        <p className="mb-4">All content on this website is provided for informational purposes only. Unless otherwise stated, all content is the property of the site owner and is protected by UK copyright laws.</p>

        <h3 className="text-xl font-semibold mb-2">External Links</h3>
        <p className="mb-4">This website may contain links to external websites. We are not responsible for the content or privacy practices of these sites.</p>

        <h3 className="text-xl font-semibold mb-2">Limitation of Liability</h3>
        <p className="mb-4">The information on this website is provided "as is" without any representations or warranties, express or implied. We make no representations or warranties regarding the accuracy or completeness of the information.</p>
        <p className="mb-4">We will not be liable for any loss or damage including without limitation, indirect or consequential loss or damage, arising from use of this website.</p>

        <h3 className="text-xl font-semibold mb-2">Changes to Terms</h3>
        <p>We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting to the website.</p>
      </section>
    </div>
  );
};

export default TermsAndPrivacy;