"use client";
import React from "react";
import { motion } from "framer-motion";

const PrivacyPolicyClient: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };
  return (
    <>
      <motion.div
        className="flex flex-col justify-center items-center mt-36 w-screeen h-full"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="font-extrabold text-xl md:text-4xl ">Privacy Policy</h2>
        <div className="w-88 md:w-128 text-xs md:text-sm mt-20 text-wrap break-words">
          <p className="mb-10 leading-relaxed">
            <strong>Effective Date:</strong> {new Date().toLocaleDateString()}
          </p>

          <p className="leading-relaxed">
            AristoVLT (&quot;Company,&quot; &quot;we,&quot; &quot;us,&quot; or
            &quot;our&quot;) values your privacy and is committed to protecting
            your personal information. This Privacy Policy describes how we
            collect, use, disclose, and safeguard your information when you
            visit our website (&quot;Site&quot;) and use our services
            (&quot;Services&quot;). Please read this Privacy Policy carefully.
            By accessing or using the Site and Services, you agree to the terms
            of this Privacy Policy. If you do not agree, please refrain from
            using our Site and Services.
          </p>

          <hr className="my-10" />

          <h3 className="font-bold mt-10">1. Information We Collect</h3>

          <h4 className="font-bold mt-5">1.1. Information You Provide to Us</h4>
          <ul className="leading-relaxed mt-3">
            <li>
              <strong>Personal Information:</strong> When you register an
              account, make a purchase, subscribe to our mailing list, or
              contact us, you may provide information such as your name, email
              address, phone number, shipping address, and payment details.
            </li>
            <li>
              <strong>Account Details:</strong> Usernames, passwords, and other
              login credentials.
            </li>
          </ul>

          <h4 className="font-bold mt-5">
            1.2. Information We Collect Automatically
          </h4>
          <ul className="leading-relaxed mt-3">
            <li>
              <strong>Usage Data:</strong> Information about your interaction
              with the Site, such as IP addresses, browser types, access times,
              and referring websites.
            </li>
            <li>
              <strong>Device Information:</strong> Data about the device you use
              to access the Site, including operating system, hardware type, and
              device identifiers.
            </li>
            <li>
              <strong>Cookies and Tracking Technologies:</strong> We use
              cookies, web beacons, and similar technologies to enhance your
              experience on our Site and analyze site usage.
            </li>
          </ul>

          <h4 className="font-bold mt-5">
            1.3. Information from Third Parties
          </h4>
          <p className="leading-relaxed mt-3">
            We may collect information about you from third parties, such as
            social media platforms or other services you use to interact with
            us.
          </p>

          <hr className="my-10" />

          <h3 className="font-bold mt-10">2. How We Use Your Information</h3>
          <ul className="leading-relaxed mt-3">
            <li>
              <strong>To Provide and Manage Services:</strong> Process
              transactions, deliver products, and provide customer support.
            </li>
            <li>
              <strong>To Improve Our Site:</strong> Analyze usage trends,
              identify technical issues, and enhance functionality.
            </li>
            <li>
              <strong>To Communicate with You:</strong> Send account updates,
              promotional materials, and responses to inquiries.
            </li>
            <li>
              <strong>To Ensure Security:</strong> Monitor for fraudulent
              activity and enforce our Terms of Use.
            </li>
            <li>
              <strong>To Comply with Legal Obligations:</strong> Fulfill legal
              and regulatory requirements.
            </li>
          </ul>

          <hr className="my-10" />

          <h3 className="font-bold mt-10">3. Sharing Your Information</h3>

          <h4 className="font-bold mt-5">3.1. Service Providers</h4>
          <p className="leading-relaxed mt-3">
            We share information with trusted service providers who perform
            functions such as payment processing, shipping, email delivery, and
            data analysis on our behalf.
          </p>

          <h4 className="font-bold mt-5">3.2. Legal Requirements</h4>
          <p className="leading-relaxed mt-3">
            We may disclose your information if required by law or in response
            to valid legal requests, such as subpoenas or court orders.
          </p>

          <h4 className="font-bold mt-5">3.3. Business Transfers</h4>
          <p className="leading-relaxed mt-3">
            In the event of a merger, acquisition, or sale of assets, your
            information may be transferred to the acquiring entity.
          </p>

          <h4 className="font-bold mt-5">3.4. With Your Consent</h4>
          <p className="leading-relaxed mt-3">
            We may share your information with third parties if you have
            provided your consent.
          </p>

          <hr className="my-10" />

          <h3 className="font-bold mt-10">4. Data Retention</h3>
          <p className="leading-relaxed mt-3">
            We retain your information for as long as necessary to fulfill the
            purposes outlined in this Privacy Policy unless a longer retention
            period is required or permitted by law. When we no longer need your
            information, we will securely delete or anonymize it.
          </p>

          <hr className="my-10" />

          <h3 className="font-bold mt-10">5. Your Privacy Choices</h3>

          <h4 className="font-bold mt-5">5.1. Access and Correction</h4>
          <p className="leading-relaxed mt-3">
            You may request access to the personal information we hold about you
            and request corrections if it is inaccurate.
          </p>

          <h4 className="font-bold mt-5">5.2. Opt-Out of Marketing</h4>
          <p className="leading-relaxed mt-3">
            You can unsubscribe from marketing emails by following the
            instructions in the email. Even if you opt out, we may still send
            you transactional communications.
          </p>

          <h4 className="font-bold mt-5">
            5.3. Cookies and Tracking Technologies
          </h4>
          <p className="leading-relaxed mt-3">
            Most web browsers allow you to manage or disable cookies. Note that
            disabling cookies may affect the functionality of the Site.
          </p>

          <hr className="my-10" />

          <h3 className="font-bold mt-10">6. Security</h3>
          <p className="leading-relaxed mt-3">
            We implement reasonable technical and organizational measures to
            protect your information from unauthorized access, use, disclosure,
            or destruction. However, no system is completely secure, and we
            cannot guarantee the absolute security of your information.
          </p>

          <hr className="my-10" />

          <h3 className="font-bold mt-10">7. International Data Transfers</h3>
          <p className="leading-relaxed mt-3">
            If you are located outside the United States, please note that your
            information will be transferred to and processed in the United
            States. By using our Site and Services, you consent to this
            transfer.
          </p>

          <hr className="my-10" />

          <h3 className="font-bold mt-10">8. Children’s Privacy</h3>
          <p className="leading-relaxed mt-3">
            Our Site and Services are not directed at children under 13. We do
            not knowingly collect personal information from children. If we
            learn that we have collected information from a child under 13, we
            will delete it promptly.
          </p>

          <hr className="my-10" />

          <h3 className="font-bold mt-10">9. Changes to This Privacy Policy</h3>
          <p className="leading-relaxed mt-3">
            We may update this Privacy Policy from time to time to reflect
            changes in our practices or legal requirements. The updated Privacy
            Policy will be posted on this page with the effective date. We
            encourage you to review this page periodically.
          </p>

          <hr className="my-10" />

          <h3 className="font-bold mt-10">10. Contact Us</h3>
          <p className="leading-relaxed mt-3">
            If you have questions or concerns about this Privacy Policy or our
            data practices, please contact us:
          </p>
          <ul className="leading-relaxed mt-3">
            <li>
              <strong>Email:</strong> contact@aristovlt.com
            </li>
            {/* <li>
              <strong>Phone:</strong> +1 (555) 123-4567
            </li>
            <li>
              <strong>Address:</strong> San Diego, CA 92129
            </li> */}
          </ul>

          <p className="leading-relaxed mt-10">
            Thank you for trusting AristoVLT with your personal information.
          </p>
        </div>
      </motion.div>
    </>
  );
};

export default PrivacyPolicyClient;
