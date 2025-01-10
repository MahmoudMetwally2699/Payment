import {
  LandingContainer,
  LandingCTA,
  LandingFAQ,
  LandingFeatures,
  LandingHero,
  LandingHowItWorks,
  LandingPainPoints,
  LandingPricing,
  LandingSocialProof,
  LandingSocialRating,
  LandingTestimonials,
} from '~/designSystem'

export default function LandingPage() {
  const features = [
    {
      heading: `Automated Payment Processing`,
      description: `Save hours of manual work with intelligent payment automation that handles verification and approvals seamlessly.`,
      icon: <i className="las la-robot"></i>,
    },
    {
      heading: `Smart Document Verification`,
      description: `Verify identity documents instantly with AI-powered verification that reduces errors by 90%.`,
      icon: <i className="las la-id-card"></i>,
    },
    {
      heading: `Real-Time Tracking`,
      description: `Monitor payment status and approvals in real-time through an intuitive dashboard.`,
      icon: <i className="las la-chart-line"></i>,
    },
    {
      heading: `Role-Based Access`,
      description: `Control who can view and approve payments with customizable permission levels.`,
      icon: <i className="las la-user-shield"></i>,
    },
    {
      heading: `Compliance Ready`,
      description: `Stay compliant with built-in controls and audit trails for all payment activities.`,
      icon: <i className="las la-check-circle"></i>,
    },
    {
      heading: `Analytics & Reporting`,
      description: `Make data-driven decisions with comprehensive payment analytics and custom reports.`,
      icon: <i className="las la-chart-bar"></i>,
    },
  ]

  const testimonials = [
    {
      name: `Sarah Chen`,
      designation: `CFO, TechCorp Solutions`,
      content: `We reduced our payment processing time by 75% and eliminated manual errors completely. The ROI was evident within the first month.`,
      avatar: 'https://randomuser.me/api/portraits/women/6.jpg',
    },
    {
      name: `Michael Rodriguez`,
      designation: `Operations Director, Global Logistics`,
      content: `The automated verification system has been a game-changer. What took us days now happens in minutes.`,
      avatar: 'https://randomuser.me/api/portraits/men/7.jpg',
    },
    {
      name: `David Park`,
      designation: `Finance Manager, Retail Chain`,
      content: `The dashboard gives us complete visibility over our payment flows. We can spot and resolve issues before they become problems.`,
      avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    },
  ]

  const navItems = [
    {
      title: `Features`,
      link: `#features`,
    },
    {
      title: `Pricing`,
      link: `#pricing`,
    },
    {
      title: `FAQ`,
      link: `#faq`,
    },
  ]

  const packages = [
    {
      title: `Starter`,
      description: `Perfect for growing businesses`,
      monthly: 199,
      yearly: 1990,
      features: [
        `Up to 1,000 monthly verifications`,
        `Basic analytics`,
        `Email support`,
      ],
    },
    {
      title: `Professional`,
      description: `For scaling operations`,
      monthly: 499,
      yearly: 4990,
      features: [
        `Unlimited verifications`,
        `Advanced analytics`,
        `Priority support`,
        `Custom workflows`,
      ],
      highlight: true,
    },
    {
      title: `Enterprise`,
      description: `Custom solutions for large organizations`,
      monthly: 999,
      yearly: 9990,
      features: [
        `Dedicated account manager`,
        `Custom integration`,
        `SLA guarantee`,
        `24/7 support`,
      ],
    },
  ]

  const questionAnswers = [
    {
      question: `How quickly can we implement the system?`,
      answer: `Most organizations are up and running within 48 hours. Our team provides full onboarding support to ensure smooth implementation.`,
    },
    {
      question: `Is the system compliant with financial regulations?`,
      answer: `Yes, we maintain compliance with major financial regulations including PSD2, GDPR, and KYC requirements.`,
    },
    {
      question: `Can we integrate with our existing systems?`,
      answer: `We offer robust APIs and pre-built integrations with major payment gateways and enterprise systems.`,
    },
    {
      question: `What kind of support do you provide?`,
      answer: `We provide 24/7 technical support, dedicated account management for enterprise clients, and comprehensive documentation.`,
    },
  ]

  const steps = [
    {
      heading: `Connect Your Systems`,
      description: `Integrate with your existing payment infrastructure in minutes`,
    },
    {
      heading: `Configure Workflows`,
      description: `Set up automated verification rules and approval chains`,
    },
    {
      heading: `Monitor & Analyze`,
      description: `Track payments and get insights through the dashboard`,
    },
    {
      heading: `Scale Confidently`,
      description: `Grow your payment operations without growing overhead`,
    },
  ]

  const painPoints = [
    {
      emoji: `😫`,
      title: `Drowning in manual payment approvals`,
    },
    {
      emoji: `🤯`,
      title: `Struggling with compliance requirements`,
    },
    {
      emoji: `😤`,
      title: `Lost time and money from payment errors`,
    },
  ]

  return (
    <LandingContainer navItems={navItems}>
      <LandingHero
        title={`Transform Your Payment Operations from Chaos to Control`}
        subtitle={`Automate payment verification, eliminate manual errors, and process payments 70% faster with our intelligent platform`}
        buttonText={`Start Free Trial`}
        pictureUrl={`https://marblism-dashboard-api--production-public.s3.us-west-1.amazonaws.com/pRfJMN-payguardpaymentt-2MrN`}
        socialProof={
          <LandingSocialRating
            numberOfUsers={1000}
            suffixText={`from happy finance teams`}
          />
        }
      />
      <LandingSocialProof title={`Trusted by Industry Leaders`} />
      <LandingPainPoints
        title={`Companies lose $550K annually to payment errors. Stop being one of them.`}
        painPoints={painPoints}
      />
      <LandingHowItWorks
        title={`Your Path to Payment Excellence`}
        steps={steps}
      />
      <LandingFeatures
        id="features"
        title={`Everything You Need to Master Payment Management`}
        subtitle={`Powerful features designed to transform your payment operations`}
        features={features}
      />
      <LandingTestimonials
        title={`Join 1000+ Companies Already Saving Time and Money`}
        subtitle={`See how organizations like yours achieved payment excellence`}
        testimonials={testimonials}
      />
      <LandingPricing
        id="pricing"
        title={`Invest in Efficiency, Scale with Confidence`}
        subtitle={`Choose the plan that fits your payment volume`}
        packages={packages}
      />
      <LandingFAQ
        id="faq"
        title={`Common Questions About Transforming Your Payments`}
        subtitle={`Everything you need to know about getting started`}
        questionAnswers={questionAnswers}
      />
      <LandingCTA
        title={`Ready to Transform Your Payment Operations?`}
        subtitle={`Join 1000+ companies saving time and money with automated payment management`}
        buttonText={`Start Free Trial`}
        buttonLink={`/register`}
      />
    </LandingContainer>
  )
}
