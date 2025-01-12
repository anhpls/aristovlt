"use client";
import React from "react";
import { motion } from "framer-motion";

const TermsClient: React.FC = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <motion.div
      className=" flex flex-col justify-center items-center mt-36 h-full "
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <h1 className="text-md md:text-lg lg:text-4xl font-extrabold mb-">
        Terms of Service
      </h1>
      <div className="w-88 md:w-128 text-xs md:text-sm mt-10 text-wrap break-words leading-relaxed">
        <p>
          Welcome to AristoVLT! These Terms of Service (&quot;Terms&quot;)
          govern your access to and use of our website, products, and services
          (collectively, the &quot;Services&quot;). By accessing or using the
          Services, you agree to comply with and be bound by these Terms. If you
          do not agree to these Terms, you may not access or use the Services.
        </p>

        <hr className="my-10" />

        <p>
          <strong>1. Acceptance of Terms</strong>
          <br />
          By accessing or using our Services, you confirm that you have read,
          understood, and agree to these Terms, as well as our Privacy Policy.
          If you are using the Services on behalf of an organization, you
          represent that you have the authority to bind that organization to
          these Terms.
        </p>

        <hr className="my-10" />

        <p>
          <strong>2. Changes to Terms</strong>
          <br />
          AristoVLT reserves the right to modify these Terms at any time.
          Changes will be effective immediately upon posting on the website.
          Your continued use of the Services after changes are posted
          constitutes your acceptance of the revised Terms. Please review these
          Terms periodically to stay informed of any updates.
        </p>

        <hr className="my-10" />

        <p>
          <strong>3. Eligibility</strong>
          <br />
          You must be at least 18 years old to use our Services. By accessing or
          using the Services, you affirm that you are of legal age and have the
          legal capacity to enter into these Terms. Minors under 18 may only use
          the Services under the supervision of a parent or legal guardian.
        </p>

        <hr className="my-10" />

        <p>
          <strong>4. Account Registration</strong>
          <br />
          To access certain features of our Services, you may be required to
          create an account. By creating an account, you agree to:
        </p>
        <ul className="list-disc list-inside mt-3">
          <li>Provide accurate, current, and complete information.</li>
          <li>Maintain the confidentiality of your login credentials.</li>
          <li>
            Notify us immediately of any unauthorized use of your account.
          </li>
        </ul>
        <p className="mt-3">
          AristoVLT is not responsible for any losses resulting from
          unauthorized access to your account.
        </p>

        <hr className="my-10" />

        <p>
          <strong>5. Prohibited Activities</strong>
          <br />
          You agree not to engage in any of the following prohibited activities:
        </p>
        <ul className="list-disc list-inside mt-3">
          <li>
            <strong>Unauthorized Use:</strong> Accessing or using the Services
            for unlawful purposes or in violation of these Terms.
          </li>
          <li>
            <strong>Harmful Activities:</strong> Attempting to disrupt, damage,
            or interfere with the Services, servers, or networks.
          </li>
          <li>
            <strong>Resale:</strong> Reselling or redistributing our products
            without express authorization.
          </li>
          <li>
            <strong>Misrepresentation:</strong> Impersonating any person or
            entity or misrepresenting your affiliation with a person or entity.
          </li>
          <li>
            <strong>Intellectual Property Violations:</strong> Copying,
            modifying, distributing, or exploiting our intellectual property
            without permission.
          </li>
        </ul>

        <hr className="my-10" />

        <p>
          <strong>6. Purchases and Payment</strong>
          <br />
          When making a purchase, you agree to:
        </p>
        <ul className="list-disc list-inside mt-3">
          <li>Provide accurate payment and billing information.</li>
          <li>
            Authorize us to charge your payment method for the total amount.
          </li>
          <li>
            Comply with any additional terms or conditions specified during
            checkout.
          </li>
        </ul>
        <p className="mt-3">
          All payments are processed securely through third-party payment
          gateways. AristoVLT is not responsible for errors or issues caused by
          these providers.
        </p>

        <hr className="my-10" />

        <p>
          <strong>7. Shipping and Delivery</strong>
        </p>
        <ul className="list-disc list-inside mt-3">
          <li>
            <strong>Processing Times:</strong> Orders are typically processed
            within 2-5 business days.
          </li>
          <li>
            <strong>Shipping Times:</strong> Delivery times may vary depending
            on your location and the shipping method selected at checkout.
          </li>
          <li>
            <strong>Delays:</strong> AristoVLT is not responsible for delays
            caused by third-party carriers, customs, or other factors beyond our
            control.
          </li>
          <li>
            <strong>Tracking:</strong> Tracking information will be provided for
            all shipped orders.
          </li>
        </ul>

        <hr className="my-10" />

        <p>
          <strong>8. Returns and Exchanges</strong>
        </p>
        <ul className="list-disc list-inside mt-3">
          <li>
            <strong>Return Policy:</strong> Returns must be initiated within 30
            days of delivery. Items must be unused, in original packaging, and
            accompanied by proof of purchase.
          </li>
          <li>
            <strong>Exclusions:</strong> Custom or personalized items are
            non-refundable.
          </li>
          <li>
            <strong>Process:</strong> To request a return or exchange, contact
            us at <span className="font-semibold">contact@aristovlt.com</span>{" "}
            with your order details.
          </li>
        </ul>

        <hr className="my-10" />

        <p>
          <strong>9. Intellectual Property</strong>
          <br />
          All content, designs, logos, trademarks, and other intellectual
          property (collectively, &quot;Content&quot;) on the Services are owned
          by AristoVLT or its licensors. You are granted a limited,
          non-exclusive license to access and use the Services for personal,
          non-commercial purposes. Unauthorized use of the Content is strictly
          prohibited.
        </p>

        <hr className="my-10" />

        <p>
          <strong>10. User-Generated Content</strong>
        </p>
        <ul className="list-disc list-inside mt-3">
          <li>
            <strong>Ownership:</strong> By submitting content to the Services
            (e.g., reviews, comments, photos), you grant AristoVLT a worldwide,
            perpetual, irrevocable, royalty-free license to use, reproduce,
            modify, and distribute your content.
          </li>
          <li>
            <strong>Restrictions:</strong> You agree not to post content that is
            unlawful, defamatory, or infringes on third-party rights.
          </li>
        </ul>

        <hr className="my-10" />

        <p>
          <strong>11. Limitation of Liability</strong>
          <br />
          To the fullest extent permitted by law, AristoVLT will not be liable
          for any direct, indirect, incidental, consequential, or punitive
          damages arising from your use of the Services. This includes, but is
          not limited to, loss of profits, data, or goodwill.
        </p>

        <hr className="my-10" />

        <p>
          <strong>12. Indemnification</strong>
          <br />
          You agree to indemnify and hold harmless AristoVLT, its affiliates,
          employees, and agents from any claims, damages, or expenses arising
          from your use of the Services or violation of these Terms.
        </p>

        <hr className="my-10" />

        <p>
          <strong>13. Privacy</strong>
          <br />
          Your use of the Services is subject to our Privacy Policy, which
          explains how we collect, use, and protect your information. By using
          the Services, you consent to the practices described in our Privacy
          Policy.
        </p>

        <hr className="my-10" />

        <p>
          <strong>14. Termination</strong>
          <br />
          AristoVLT reserves the right to suspend or terminate your access to
          the Services at any time, with or without notice, for violations of
          these Terms or for any other reason at our discretion.
        </p>

        <hr className="my-10" />

        <p>
          <strong>15. Governing Law</strong>
          <br />
          These Terms are governed by the laws of the State of Delaware, United
          States. Any disputes arising under these Terms will be resolved
          exclusively in the courts located in Delaware.
        </p>

        <hr className="my-10" />

        <p>
          <strong>16. Arbitration Agreement</strong>
          <br />
          By agreeing to these Terms, you agree to resolve any disputes through
          binding arbitration in accordance with the rules of the American
          Arbitration Association. You waive your right to a jury trial or
          participation in a class action lawsuit.
        </p>

        <hr className="my-10" />

        <p>
          <strong>17. Entire Agreement</strong>
          <br />
          These Terms, along with our Privacy Policy, constitute the entire
          agreement between you and AristoVLT regarding your use of the
          Services. Any failure to enforce a provision of these Terms does not
          constitute a waiver of that provision.
        </p>

        <hr className="my-10" />

        <p>
          <strong>Contact Information</strong>
          <br />
          For any questions or concerns about these Terms, please contact us:
        </p>
        <ul className="list-disc list-inside mt-3">
          <li>
            <strong>Email:</strong> contact@aristovlt.com
          </li>
          <li>
            <strong>Phone:</strong> +1 (555) 123-4567
          </li>
          <li>
            <strong>Address:</strong> San Diego, CA 92129
          </li>
        </ul>
        <p className="mt-20 italic">
          Thank you for choosing <span className="font-bold">AristoVLT!</span>
        </p>
      </div>
    </motion.div>
  );
};

export default TermsClient;
