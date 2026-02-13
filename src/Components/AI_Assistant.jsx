import { useState, useRef, useEffect } from 'react';

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content:
        "Hello! 👋 I'm **FinBot**, your intelligent Finfree Enterprises loan assistant.\n\n💡 **Ask me about:**\n• Loan eligibility requirements\n• EMI calculations\n• Application process\n• Document requirements\n• Interest rates and tenure\n\nGo ahead, try me with any question! 😊"
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  /* ================= SCROLL TO SECTION ================= */
  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setIsOpen(false);
    }
  };

  /* ================= COMPREHENSIVE AI ENGINE ================= */
  const getAIResponse = (message) => {
    const msg = message.toLowerCase();

    // 🔹 GENERAL & GREETING
    if (msg.includes("hi") || msg.includes("hello") || msg.includes("hey")) {
      return {
        text: "Hello! 👋 Welcome to Finfree Enterprises. I'm here to help you with loans, eligibility, EMI calculations, and more. What would you like to know?",
        actions: []
      };
    }
    
    if (msg.includes("your name") || msg.includes("what's your name") || msg.includes("who are you") || msg.includes("what are you called")) {
      return {
        text: "I'm **FinBot**! 🤖\n\nYour intelligent AI loan assistant from Finfree Enterprises. I'm here 24/7 to help you with all your loan-related queries, from eligibility checks to EMI calculations!\n\nNice to meet you! How can I assist you today?",
        actions: [
          { label: "View Services", section: "services-section" },
          { label: "Check Eligibility", section: "eligibility-section" }
        ]
      };
    }

    if (msg.includes("help") || msg.includes("what can you do")) {
      return {
        text: "I can help you with:\n• Loan types & services\n• EMI calculations\n• Eligibility criteria\n• Required documents\n• Application process\n• Loan status tracking\n• Interest rates & tenure\n\nJust ask me anything!",
        actions: [
          { label: "View All Services", section: "services-section" }
        ]
      };
    }

    if (msg.includes("how does this work") || msg.includes("how this work") || msg.includes("process")) {
      return {
        text: "Our process is simple:\n1️⃣ Fill the application form\n2️⃣ Submit required documents\n3️⃣ We compare options from multiple banks\n4️⃣ Get quick approval & disbursement!",
        actions: [
          { label: "See Detailed Process", section: "process-section" }
        ]
      };
    }

    // 🔹 LOAN TYPES & SERVICES
    if (msg.includes("loan type") || msg.includes("what loan") || msg.includes("which loan")) {
      return {
        text: "We provide:\n• Personal Loans\n• Business Loans\n• Home Loans\n• Mortgage Loans\n• Medical Loans\n• Balance Transfer\n• Education Loans\n\nEach loan type has different eligibility and interest rates.",
        actions: [
          { label: "View All Services", section: "services-section" },
          { label: "Check Eligibility", section: "eligibility-section" }
        ]
      };
    }

    if (msg.includes("personal loan")) {
      return {
        text: "Personal Loans are unsecured loans for various needs like medical emergencies, weddings, travel, etc.\n\n✅ Loan Amount: ₹50,000 - ₹50 Lakhs\n✅ Interest Rate: 10% - 24%\n✅ Tenure: 1-5 years\n✅ Minimal documentation required",
        actions: [
          { label: "Calculate EMI", section: "emi-calculator" },
          { label: "Apply Now", section: "hero-section" }
        ]
      };
    }

    if (msg.includes("business loan")) {
      return {
        text: "Business Loans help entrepreneurs grow their business with working capital or expansion funds.\n\n✅ Loan Amount: ₹1 Lakh - ₹50 Lakhs\n✅ Interest Rate: 12% - 28%\n✅ Tenure: 1-7 years\n✅ For registered businesses",
        actions: [
          { label: "Check Eligibility", section: "eligibility-section" },
          { label: "Apply Now", section: "hero-section" }
        ]
      };
    }

    if (msg.includes("home loan") || msg.includes("house loan")) {
      return {
        text: "Home Loans help you purchase or construct your dream home.\n\n✅ Loan Amount: Up to ₹5 Crores\n✅ Interest Rate: 8% - 12%\n✅ Tenure: Up to 30 years\n✅ Tax benefits available under Section 80C",
        actions: [
          { label: "Calculate EMI", section: "emi-calculator" },
          { label: "Apply Now", section: "hero-section" }
        ]
      };
    }

    if (msg.includes("mortgage loan")) {
      return {
        text: "Mortgage Loans are secured loans against property collateral.\n\n✅ Loan Amount: Based on property value\n✅ Lower interest rates\n✅ Flexible tenure\n✅ Use funds for any purpose",
        actions: [
          { label: "View Services", section: "services-section" }
        ]
      };
    }

    if (msg.includes("balance transfer")) {
      return {
        text: "Balance Transfer helps you switch your existing loan to a lender with lower interest rates, reducing your EMI burden.\n\n✅ Lower interest rates\n✅ Reduced EMI\n✅ Save on total interest\n✅ Better loan terms",
        actions: [
          { label: "Calculate Savings", section: "emi-calculator" }
        ]
      };
    }

    if (msg.includes("medical loan")) {
      return {
        text: "Medical Loans provide quick funds for emergency healthcare needs.\n\n✅ Quick approval\n✅ Minimal documentation\n✅ Flexible repayment\n✅ No collateral required",
        actions: [
          { label: "Apply Now", section: "hero-section" }
        ]
      };
    }

    if (msg.includes("best for me") || msg.includes("which is best")) {
      return {
        text: "The best loan depends on your needs:\n• Personal needs → Personal Loan\n• Business growth → Business Loan\n• Buying property → Home Loan\n• Emergency medical → Medical Loan\n• Lower EMI → Balance Transfer\n\nTell me your requirement, and I'll guide you!",
        actions: [
          { label: "View All Options", section: "services-section" }
        ]
      };
    }

    // 🔹 EMI & INTEREST
    if (msg.includes("emi") || msg.includes("calculate")) {
      return {
        text: "EMI (Equated Monthly Installment) is the fixed amount you pay monthly to repay your loan.\n\nEMI = [P × r × (1+r)^n] / [(1+r)^n-1]\n\nWhere:\nP = Loan amount\nr = Monthly interest rate\nn = Loan tenure in months\n\nUse our EMI Calculator for instant results!",
        actions: [
          { label: "Go to EMI Calculator", section: "emi-calculator" }
        ]
      };
    }

    if (msg.includes("interest rate") || msg.includes("interest")) {
      return {
        text: "Interest rates vary by loan type:\n• Personal Loan: 10% - 36%\n• Business Loan: 12% - 28%\n• Home Loan: 8% - 12%\n• Medical Loan: 12% - 24%\n\nRates depend on CIBIL score, income, and lender policies.",
        actions: [
          { label: "Calculate EMI", section: "emi-calculator" }
        ]
      };
    }

    if (msg.includes("reduce emi") || msg.includes("lower emi")) {
      return {
        text: "To reduce EMI, you can:\n1️⃣ Increase loan tenure (but pay more interest)\n2️⃣ Make a larger down payment\n3️⃣ Opt for balance transfer to lower rates\n4️⃣ Improve CIBIL score for better rates\n5️⃣ Negotiate with lender",
        actions: [
          { label: "Calculate Different EMIs", section: "emi-calculator" }
        ]
      };
    }

    if (msg.includes("tenure") || msg.includes("loan period")) {
      return {
        text: "Loan tenure affects your EMI:\n• Shorter tenure = Higher EMI, Less interest\n• Longer tenure = Lower EMI, More interest\n\nTypical tenures:\n• Personal Loan: 1-5 years\n• Business Loan: 1-7 years\n• Home Loan: 5-30 years",
        actions: [
          { label: "Try Different Tenures", section: "emi-calculator" }
        ]
      };
    }

    // 🔹 ELIGIBILITY & CIBIL
    if (msg.includes("eligib")) {
      return {
        text: "Basic Eligibility Criteria:\n• Age: 23 to 65 years\n• Indian resident\n• Regular income source\n• Active bank account\n• Valid address proof\n• Not bankrupt in past 1 year\n• Minimum CIBIL: 650+ (varies by lender)",
        actions: [
          { label: "View Full Criteria", section: "eligibility-section" }
        ]
      };
    }

    if (msg.includes("minimum age") || msg.includes("age require")) {
      return {
        text: "Age requirements:\n• Minimum: 23 years\n• Maximum: 65 years (at loan maturity)\n\nSome lenders may have different age criteria for specific loan types.",
        actions: [
          { label: "Check Full Eligibility", section: "eligibility-section" }
        ]
      };
    }

    if (msg.includes("income proof") || msg.includes("salary")) {
      return {
        text: "Income requirements vary:\n• Salaried: ₹15,000+ monthly\n• Self-employed: ₹2 Lakhs+ annual\n\nAccepted income proof:\n• Salary slips (last 3 months)\n• Bank statements (6 months)\n• ITR (last 2 years)\n• Form 16",
        actions: [
          { label: "View Documents", section: "process-section" }
        ]
      };
    }

    if (msg.includes("cibil")) {
      return {
        text: "CIBIL Score is a 3-digit credit score (300-900) that indicates your creditworthiness.\n\n✅ 750+: Excellent (Best rates)\n✅ 650-749: Good (Approved easily)\n⚠️ 550-649: Fair (Higher rates)\n❌ Below 550: Poor (Difficult approval)\n\nGood CIBIL increases approval chances!",
        actions: [
          { label: "Check Eligibility", section: "eligibility-section" }
        ]
      };
    }

    if (msg.includes("low cibil") || msg.includes("bad cibil") || msg.includes("without cibil")) {
      return {
        text: "Yes, you can get loans with low/no CIBIL, but:\n• Interest rates will be higher\n• Loan amount may be limited\n• Requires strong co-applicant\n• More documentation needed\n\nWe help improve CIBIL scores and find suitable lenders!",
        actions: [
          { label: "Contact Support", section: "hero-section" }
        ]
      };
    }

    // 🔹 DOCUMENTS
    if (msg.includes("document")) {
      return {
        text: "Required Documents:\n📄 Identity Proof: Aadhaar, PAN, Passport\n📄 Address Proof: Utility bills, Rent agreement\n📄 Income Proof: Salary slips, Bank statements, ITR\n📄 Employment Proof: Appointment letter, ID card\n📄 Photos: Passport size (2 copies)\n📄 Bank Statements: Last 6 months",
        actions: [
          { label: "View Process", section: "process-section" }
        ]
      };
    }

    if (msg.includes("aadhaar")) {
      return {
        text: "Yes, Aadhaar card is mandatory for KYC verification. It serves as both identity and address proof.\n\nMake sure your Aadhaar details match other documents!",
        actions: []
      };
    }

    if (msg.includes("pan")) {
      return {
        text: "Yes, PAN Card is mandatory for all loan applications as per RBI guidelines. It's required for:\n• KYC verification\n• Income tax tracking\n• Credit history check",
        actions: []
      };
    }

    if (msg.includes("bank statement")) {
      return {
        text: "Bank statements (last 6 months) are required to verify:\n• Regular income credits\n• Financial stability\n• Existing EMI obligations\n• Spending patterns\n\nEnsure statements show healthy balance and regular credits!",
        actions: []
      };
    }

    if (msg.includes("upload document") || msg.includes("online upload")) {
      return {
        text: "Yes! You can upload all documents online during the application process. Our secure portal accepts:\n• PDF format\n• JPG/PNG images\n• Maximum 5MB per file\n\nPhysical verification may be done later if required.",
        actions: [
          { label: "Apply Now", section: "hero-section" }
        ]
      };
    }

    // 🔹 APPLICATION PROCESS
    if (msg.includes("apply") || msg.includes("application")) {
      return {
        text: "Simple 3-Step Application Process:\n\n1️⃣ Fill Application Form\n   • Enter personal details\n   • Upload documents\n\n2️⃣ Compare Options\n   • Get quotes from multiple banks\n   • Choose best offer\n\n3️⃣ Get Your Funds\n   • Quick approval\n   • Direct bank transfer",
        actions: [
          { label: "Apply Now", section: "hero-section" },
          { label: "See Process", section: "process-section" }
        ]
      };
    }

    if (msg.includes("how long") || msg.includes("approval time") || msg.includes("when will i get")) {
      return {
        text: "Timeline varies by loan type:\n• Personal Loan: 24-72 hours\n• Business Loan: 3-7 days\n• Home Loan: 7-15 days\n\nFactors affecting speed:\n✅ Complete documentation\n✅ Good CIBIL score\n✅ Quick bank verification\n✅ Property valuation (for home loans)",
        actions: []
      };
    }

    if (msg.includes("online process") || msg.includes("digital")) {
      return {
        text: "Yes! Our entire process is digital:\n✅ Online application\n✅ Document upload\n✅ Digital verification\n✅ E-signature\n✅ Online tracking\n✅ Direct bank transfer\n\nNo need to visit office unless required!",
        actions: [
          { label: "Start Application", section: "hero-section" }
        ]
      };
    }

    if (msg.includes("track") || msg.includes("status")) {
      return {
        text: "Yes! You can track your loan application in real-time:\n• Login to your account\n• View current status\n• Check pending documents\n• Get notifications\n\nWe'll also send SMS/email updates!",
        actions: []
      };
    }

    // 🔹 STATUS MEANINGS
    if (msg.includes("in process") || msg.includes("processing")) {
      return {
        text: "\"In Process\" means:\n• Application received\n• Documents under verification\n• Bank evaluation ongoing\n• Wait for next update\n\nTypically takes 2-5 business days.",
        actions: []
      };
    }

    if (msg.includes("login status") || msg.includes("logged in")) {
      return {
        text: "\"Login\" status means:\n• Your file has been submitted to the bank\n• Bank has acknowledged receipt\n• Initial screening passed\n• Awaiting detailed verification\n\nThis is a positive sign!",
        actions: []
      };
    }

    if (msg.includes("query status") || msg.includes("query raised")) {
      return {
        text: "\"Query\" status means:\n• Bank needs additional information\n• Some documents are unclear\n• Verification issue found\n\nAction required:\n📌 Check email/SMS for query details\n📌 Submit requested documents ASAP\n📌 Contact our support for help",
        actions: []
      };
    }

    if (msg.includes("sanction") || msg.includes("approved")) {
      return {
        text: "\"Sanctioned\" means:\n✅ Your loan is APPROVED!\n✅ Loan amount confirmed\n✅ Interest rate finalized\n✅ Awaiting final documentation\n\nNext step: Sign loan agreement and await disbursement!",
        actions: []
      };
    }

    if (msg.includes("disburs")) {
      return {
        text: "\"Disbursement\" means:\n💰 Loan amount is being transferred!\n💰 Money will reach your bank account within 24-48 hours\n💰 EMI starts from next month\n\nCongratulations! 🎉",
        actions: []
      };
    }

    if (msg.includes("reject")) {
      return {
        text: "Loan rejection can happen due to:\n❌ Low CIBIL score\n❌ Insufficient income\n❌ Incomplete documents\n❌ High existing debt\n❌ Unstable employment\n\nDon't worry! We can:\n✅ Suggest alternate lenders\n✅ Help improve CIBIL\n✅ Reapply with better profile",
        actions: []
      };
    }

    // 🔹 BANK & APPROVAL
    if (msg.includes("which bank") || msg.includes("bank available")) {
      return {
        text: "We work with 15+ leading banks:\n🏦 ICICI Bank\n🏦 Axis Bank\n🏦 SBI\n🏦 HDFC Bank\n🏦 Kotak Mahindra\n🏦 Yes Bank\n🏦 Union Bank\n🏦 Canara Bank\n🏦 Central Bank\n...and more!\n\nWe compare and get you the best deal!",
        actions: []
      };
    }

    if (msg.includes("bank selection") || msg.includes("choose bank")) {
      return {
        text: "Bank selection is based on:\n• Your CIBIL score\n• Income profile\n• Loan amount\n• Best interest rates\n• Fastest approval\n\nWe recommend the best-fit bank, but you can choose your preference too!",
        actions: []
      };
    }

    if (msg.includes("bank reject") || msg.includes("bank denied")) {
      return {
        text: "If a bank rejects your application:\n• We try alternate banks\n• No extra charges\n• Different lenders have different criteria\n• Don't lose hope!\n\nWe've helped 1000+ customers get approved after initial rejection!",
        actions: []
      };
    }

    if (msg.includes("bank verif")) {
      return {
        text: "Bank verification includes:\n✅ Document authentication\n✅ Employment verification call\n✅ CIBIL check\n✅ Physical address verification (if needed)\n✅ Income validation\n\nEnsure all details are accurate!",
        actions: []
      };
    }

    // 🔹 COMMISSION
    if (msg.includes("commission")) {
      return {
        text: "Commission is paid to DSAs (Direct Selling Agents) and partners who bring customers.\n\n• Paid by lenders, not customers\n• Based on loan amount disbursed\n• Only on successful approvals\n• Typically 0.5% - 2% of loan value\n\nCustomers pay ZERO commission!",
        actions: []
      };
    }

    // 🔹 SECURITY & TRUST
    if (msg.includes("safe") || msg.includes("secure") || msg.includes("data")) {
      return {
        text: "Your data is 100% safe with us:\n🔒 SSL encrypted platform\n🔒 Secure document upload\n🔒 No data sharing without consent\n🔒 GDPR compliant\n🔒 Regular security audits\n\nWe value your trust and privacy!",
        actions: []
      };
    }

    if (msg.includes("confidential") || msg.includes("who can see")) {
      return {
        text: "Your information is confidential:\n• Only authorized staff can access\n• Shared only with chosen lenders\n• Not sold to third parties\n• Deleted after loan closure (if requested)\n\nYour privacy is our priority!",
        actions: []
      };
    }

    // 🔹 SUPPORT & CONTACT
    if (msg.includes("contact") || msg.includes("support")) {
      return {
        text: "Contact our support team:\n📞 Call: +91 95339 80582\n📧 Email: support@dsacrm.com\n🕐 Mon-Sat: 9 AM - 6 PM\n\nOr submit your query through our contact form!",
        actions: [
          { label: "Apply Now", section: "hero-section" }
        ]
      };
    }

    if (msg.includes("talk to") || msg.includes("executive")) {
      return {
        text: "Yes! You can talk to our loan executives:\n• Call us directly\n• Request a callback\n• Schedule a meeting\n• Chat support\n\nWe're here to help! 😊",
        actions: []
      };
    }

    if (msg.includes("issue") || msg.includes("problem") || msg.includes("complaint")) {
      return {
        text: "Sorry to hear that! 😟\n\nTo resolve your issue:\n1️⃣ Call: +91 95339 80582\n2️⃣ Email: support@dsacrm.com\n3️⃣ Use feedback form\n\nWe'll resolve it ASAP!",
        actions: []
      };
    }

    // 🔹 SYSTEM & AI
    if (msg.includes("how do you work") || msg.includes("how does this assistant")) {
      return {
        text: "I'm an AI-powered assistant trained on loan knowledge! 🤖\n\nI can:\n✅ Answer your questions instantly\n✅ Guide you through the process\n✅ Explain loan terms\n✅ Calculate EMI\n✅ Check eligibility\n\nBut for final decisions, our human experts review everything!",
        actions: []
      };
    }

    if (msg.includes("are you ai") || msg.includes("are you robot")) {
      return {
        text: "Yes! I'm an AI assistant created to help you with loan queries 24/7! 🤖\n\nI'm powered by advanced algorithms but backed by real human experts who handle your applications!",
        actions: []
      };
    }

    if (msg.includes("predict") || msg.includes("will i get approved")) {
      return {
        text: "I can assess your chances based on:\n• CIBIL score range\n• Income stability\n• Existing obligations\n• Age criteria\n\nBut final approval depends on bank's internal policies. Apply now to get a definite answer!",
        actions: [
          { label: "Check Eligibility", section: "eligibility-section" },
          { label: "Apply Now", section: "hero-section" }
        ]
      };
    }

    if (msg.includes("accurate") || msg.includes("reliable")) {
      return {
        text: "My responses are based on:\n✅ Latest RBI guidelines\n✅ Current market rates\n✅ 5+ years of industry data\n✅ 10,000+ successful loans\n\nAccuracy: 95%+ for general queries!\n\nFor personalized advice, consult our experts!",
        actions: []
      };
    }
    
    if (msg.includes("how to login") || msg.includes("how do i login") || msg.includes("sign in")) {
      return {
        text: "To login to your account:\n\n1. Click on the 'Login' button in the top right corner\n2. Enter your registered email and password\n3. Click 'Sign In'\n\n💡 Forgot password? Use the 'Reset Password' link on the login page.",
        actions: [
          { label: "Go to Login", section: "hero-section" },
          { label: "Contact Support", section: "contact-section" }
        ]
      };
    }

    if (msg.includes("how to register") || msg.includes("how do i register") || msg.includes("sign up") || msg.includes("create account")) {
      return {
        text: "To register for a new account:\n\n1. Click on 'Register' or 'Sign Up' button\n2. Fill in your personal details (Name, Email, Phone)\n3. Create a strong password\n4. Verify your email/phone\n5. Complete your profile\n\n✅ Registration is quick and free!",
        actions: [
          { label: "Register Now", section: "hero-section" },
          { label: "Need Help?", section: "contact-section" }
        ]
      };
    }

    if (msg.includes("contact") || msg.includes("reach you") || msg.includes("get in touch")) {
      return {
        text: "You can reach us through:\n\n📞 Phone: +91-XXXXX-XXXXX\n📧 Email: support@financehub.com\n🏢 Office: Visit our branch near you\n💬 Live Chat: Available 24/7\n\n⏰ Working Hours: Mon-Sat, 9 AM - 6 PM",
        actions: [
          { label: "Contact Us", section: "contact-section" },
          { label: "Find Branch", section: "services-section" }
        ]
      };
    }

    if (msg.includes("email") || msg.includes("email id") || msg.includes("mail address")) {
      return {
        text: "Our official email addresses:\n\n📧 General Inquiries: info@financehub.com\n📧 Loan Support: loans@financehub.com\n📧 Customer Service: support@financehub.com\n📧 Complaints: complaints@financehub.com\n\n💡 We typically respond within 24 hours!",
        actions: [
          { label: "Contact Us", section: "contact-section" },
          { label: "Apply for Loan", section: "hero-section" }
        ]
      };
    }

    // 🔹 DEFAULT RESPONSE
    return {
      text: "I can help you with:\n• Loan types & services\n• EMI calculations\n• Eligibility & CIBIL\n• Documents required\n• Application process\n• Loan tracking\n\nPlease ask a specific question, and I'll guide you!",
      actions: [
        { label: "View Services", section: "services-section" },
        { label: "Calculate EMI", section: "emi-calculator" }
      ]
    };
  };

  /* ================= SEND MESSAGE ================= */
  const handleSend = () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");

    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    setTimeout(() => {
      const response = getAIResponse(userMessage);

      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: response.text,
        actions: response.actions 
      }]);
      setIsLoading(false);
    }, 600);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const suggestedQuestions = [
    "What documents do I need?",
    "Am I eligible for a loan?",
    "How to calculate EMI?",
    "What's the interest rate?"
  ];

  /* ================= ENHANCED STYLES ================= */
  const buttonStyle = {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '64px',
    height: '64px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'white',
    fontSize: '28px',
    border: 'none',
    cursor: 'pointer',
    boxShadow: '0 10px 40px rgba(102, 126, 234, 0.5)',
    transition: 'all 0.3s ease',
    zIndex: 9999,
    animation: 'pulse 2s infinite'
  };

  const chatWindowStyle = {
    position: 'fixed',
    bottom: '24px',
    right: '24px',
    width: '400px',
    maxWidth: '90vw',
    height: '600px',
    maxHeight: '85vh',
    backgroundColor: 'white',
    borderRadius: '20px',
    boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
    display: 'flex',
    flexDirection: 'column',
    zIndex: 9999,
    overflow: 'hidden'
  };

  const headerStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    padding: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
  };

  const headerTitleStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '12px'
  };

  const avatarStyle = {
    width: '40px',
    height: '40px',
    backgroundColor: 'white',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '24px',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  const headerTextStyle = {
    display: 'flex',
    flexDirection: 'column'
  };

  const closeButtonStyle = {
    background: 'rgba(255,255,255,0.2)',
    border: 'none',
    color: 'white',
    fontSize: '20px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease'
  };

  const messagesContainerStyle = {
    flex: 1,
    overflowY: 'auto',
    padding: '20px',
    backgroundColor: '#f8fafc',
    display: 'flex',
    flexDirection: 'column',
    gap: '12px'
  };

  const messageWrapperStyle = (isUser) => ({
    display: 'flex',
    justifyContent: isUser ? 'flex-end' : 'flex-start',
    flexDirection: 'column',
    alignItems: isUser ? 'flex-end' : 'flex-start'
  });

  const messageStyle = (isUser) => ({
    display: 'inline-block',
    maxWidth: '75%',
    padding: '12px 16px',
    borderRadius: isUser ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
    background: isUser
      ? 'linear-gradient(135deg, #667eea, #764ba2)'
      : 'white',
    color: isUser ? 'white' : '#1f2937',
    whiteSpace: 'pre-wrap',
    wordWrap: 'break-word',
    boxShadow: isUser ? '0 4px 12px rgba(102, 126, 234, 0.3)' : '0 2px 8px rgba(0,0,0,0.1)',
    fontSize: '14px',
    lineHeight: '1.5',
    animation: 'slideIn 0.3s ease'
  });

  const actionButtonStyle = {
    marginTop: '8px',
    padding: '8px 16px',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    borderRadius: '20px',
    fontSize: '13px',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px'
  };

  const loadingStyle = {
    display: 'inline-block',
    padding: '12px 16px',
    borderRadius: '18px 18px 18px 4px',
    background: 'white',
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
  };

  const dotStyle = (delay) => ({
    width: '8px',
    height: '8px',
    margin: '0 2px',
    backgroundColor: '#667eea',
    borderRadius: '50%',
    display: 'inline-block',
    animation: `bounce 1.4s infinite ease-in-out ${delay}`
  });

  const suggestedQuestionsStyle = {
    padding: '16px 20px',
    backgroundColor: '#f8fafc',
    borderTop: '1px solid #e2e8f0'
  };

  const suggestionButtonStyle = {
    fontSize: '12px',
    backgroundColor: 'white',
    border: '1px solid #e0e7ff',
    color: '#667eea',
    padding: '8px 14px',
    borderRadius: '20px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    margin: '4px',
    fontWeight: '500'
  };

  const inputContainerStyle = {
    padding: '16px 20px',
    backgroundColor: 'white',
    borderTop: '1px solid #e2e8f0',
    display: 'flex',
    gap: '10px'
  };

  const inputStyle = {
    flex: 1,
    padding: '12px 16px',
    border: '2px solid #e2e8f0',
    borderRadius: '12px',
    fontSize: '14px',
    outline: 'none',
    transition: 'all 0.3s ease',
    fontFamily: 'inherit',
    backgroundColor: '#f8fafc',
    color: '#1f2937'
  };

  const sendButtonStyle = {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    color: 'white',
    border: 'none',
    padding: '12px 20px',
    borderRadius: '12px',
    fontSize: '18px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontWeight: '600',
    minWidth: '50px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  };

  return (
    <>
      <style>{`
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 10px 40px rgba(102, 126, 234, 0.5);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 15px 50px rgba(102, 126, 234, 0.7);
          }
        }

        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes bounce {
          0%, 80%, 100% {
            transform: scale(0);
          }
          40% {
            transform: scale(1);
          }
        }

        /* Scrollbar Styling */
        .messages-container::-webkit-scrollbar {
          width: 6px;
        }

        .messages-container::-webkit-scrollbar-track {
          background: #f1f5f9;
        }

        .messages-container::-webkit-scrollbar-thumb {
          background: #cbd5e1;
          border-radius: 10px;
        }

        .messages-container::-webkit-scrollbar-thumb:hover {
          background: #94a3b8;
        }

        /* Responsive Design */
        @media (max-width: 640px) {
          .ai-chat-window {
            width: calc(100vw - 20px) !important;
            height: calc(100vh - 100px) !important;
            bottom: 10px !important;
            right: 10px !important;
            max-height: 90vh !important;
          }
          
          .ai-chat-button {
            bottom: 20px !important;
            right: 20px !important;
            width: 56px !important;
            height: 56px !important;
            font-size: 24px !important;
          }
        }
      `}</style>

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          className="ai-chat-button"
          onClick={() => setIsOpen(true)}
          style={buttonStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.1)';
            e.currentTarget.style.boxShadow = '0 15px 50px rgba(102, 126, 234, 0.7)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 10px 40px rgba(102, 126, 234, 0.5)';
          }}
        >
          💬
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="ai-chat-window" style={chatWindowStyle}>
          {/* Header */}
          <div style={headerStyle}>
            <div style={headerTitleStyle}>
              <div style={avatarStyle}>🤖</div>
              <div style={headerTextStyle}>
                <strong style={{ fontSize: '16px', fontWeight: '700' }}>FinBot AI Assistant</strong>
                <span style={{ fontSize: '12px', opacity: '0.9' }}>🌟 Online • Try me now!</span>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              style={closeButtonStyle}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.3)';
                e.currentTarget.style.transform = 'rotate(90deg)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
                e.currentTarget.style.transform = 'rotate(0deg)';
              }}
            >
              ✕
            </button>
          </div>

          {/* Messages */}
          <div className="messages-container" style={messagesContainerStyle}>
            {messages.map((msg, idx) => (
              <div key={idx} style={messageWrapperStyle(msg.role === 'user')}>
                <div style={messageStyle(msg.role === 'user')}>
                  {msg.content}
                </div>
                {/* Action Buttons */}
                {msg.actions && msg.actions.length > 0 && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '8px' }}>
                    {msg.actions.map((action, actionIdx) => (
                      <button
                        key={actionIdx}
                        onClick={() => scrollToSection(action.section)}
                        style={actionButtonStyle}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 4px 12px rgba(102, 126, 234, 0.5)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 2px 8px rgba(102, 126, 234, 0.3)';
                        }}
                      >
                        {action.label} →
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Loading Animation */}
            {isLoading && (
              <div style={messageWrapperStyle(false)}>
                <div style={loadingStyle}>
                  <span style={dotStyle('0ms')}></span>
                  <span style={dotStyle('150ms')}></span>
                  <span style={dotStyle('300ms')}></span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions with FinBot Promo */}
          {messages.length <= 1 && (
            <div style={suggestedQuestionsStyle}>
              <p style={{ 
                fontSize: '13px', 
                color: '#667eea', 
                marginBottom: '12px', 
                fontWeight: '700',
                textAlign: 'center'
              }}>
                💬 Try FinBot - Your AI Loan Expert!
              </p>
              <p style={{ fontSize: '12px', color: '#64748b', marginBottom: '8px', fontWeight: '600' }}>
                Quick questions:
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => setInput(q)}
                    style={suggestionButtonStyle}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#eef2ff';
                      e.currentTarget.style.borderColor = '#667eea';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'white';
                      e.currentTarget.style.borderColor = '#e0e7ff';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div style={inputContainerStyle}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask FinBot anything..."
              disabled={isLoading}
              style={inputStyle}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#667eea';
                e.currentTarget.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#e2e8f0';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
            <button
              onClick={handleSend}
              disabled={!input.trim() || isLoading}
              style={{
                ...sendButtonStyle,
                opacity: !input.trim() || isLoading ? '0.5' : '1',
                cursor: !input.trim() || isLoading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => {
                if (input.trim() && !isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 20px rgba(102, 126, 234, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {isLoading ? '...' : '➤'}
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AIAssistant;