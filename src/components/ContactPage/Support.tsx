import React from 'react';
import { motion } from 'framer-motion';
import { Coffee, DollarSign, Mail, Shield } from 'react-feather';

export default function SupportSection() {
  return (
    <motion.section
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.9, delay: 0.6, ease: 'easeOut' }}
      className="py-10"
    >
      <h2 className="text-2xl font-bold mb-2">Support My Work</h2>
      <p className="text-gray-700 dark:text-gray-300 mb-6">
        If you enjoy what I create and want to help me keep going, consider supporting me through one of the platforms below. Every bit helps and means a lot!
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {/* Buy Me a Coffee */}
        <SupportCard
          icon={<Coffee size={32} />}
          title="Buy Me a Coffee"
          description="A small gesture goes a long way! Treat me to a coffee and keep the creativity flowing."
          link="https://www.buymeacoffee.com/beany159"
        />

        {/* UPI */}
        <SupportCard
          icon={<Shield size={28} />}
          title="UPI Support"
          description="Click to open your UPI app with a pre-filled payment link. Works with most Indian apps like Google Pay, PhonePe, Paytm, etc."
          link="upi://pay?pa=your_upi_id@bank&pn=Your%20Name"
        />

        {/* PayPal */}
        <SupportCard
          icon={<DollarSign size={28} />}
          title="PayPal"
          description="Support internationally via PayPal using a secure hosted page."
          link="https://www.paypal.me/dalmatOr"
        />

        {/* Bank Transfer (Request Info) */}
        <SupportCard
          icon={<Mail size={28} />}
          title="Bank Transfer (India)"
          description="Prefer direct transfer? Email me and I’ll send verified bank details securely."
          link="mailto:your.email@example.com?subject=Requesting%20Bank%20Details%20for%20Support"
        />
      </div>
    </motion.section>
  );
}

type SupportCardProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
};

function SupportCard({ icon, title, description, link }: SupportCardProps) {
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex flex-col border dark:border-gray-600 rounded-lg p-4 hover:shadow-md transition bg-light-background dark:bg-dark-background"
    >
      <div className="flex items-center gap-3 mb-2 text-light-text dark:text-dark-text">
        {icon}
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      <p className="text-sm text-gray-600 dark:text-gray-300">{description}</p>
    </a>
  );
}
