import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Copy, Check, Download } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

interface ParticipantData {
  name: string;
  contact: string;
  semester: string;
  department: string;
  email: string;
}

interface RegistrationFormState {
  participants: ParticipantData[];
}

interface EventConfig {
  title: string;
  description: string;
  participantCount: number;
  participantLabels: string[];
}

const eventConfigs: Record<string, EventConfig> = {
  "treasure-hunt": {
    title: "Treasure Hunt",
    description:
      "Register your team for the ultimate campus adventure! Solve riddles, find clues, and race to victory.",
    participantCount: 4,
    participantLabels: [
      "Team Leader Details",
      "Team Member 2 Details",
      "Team Member 3 Details",
      "Team Member 4 Details",
    ],
  },
  "pot-painting": {
    title: "Pot Painting",
    description:
      "Transform earthen pots into masterpieces. Show your artistic skills!",
    participantCount: 1,
    participantLabels: ["Team Leader Details"],
  },
  reelandphotographycontest: {
    title: "Reel and Photography Contest",
    description:
      "Showcase your creative lens! Capture stunning moments and create engaging reels that tell a story.",
    participantCount: 1,
    participantLabels: ["Team Leader Details"],
  },
  rangoli: {
    title: "Rangoli",
    description:
      "Create stunning floor art with your team using colors and creativity.",
    participantCount: 2,
    participantLabels: ["Team Leader Details", "Team Member 2 Details"],
  },
  debate: {
    title: "Debate",
    description:
      "Present your arguments and defend your stance. Show your oratory prowess!",
    participantCount: 2,
    participantLabels: ["Team Leader Details", "Team Member 2 Details"],
  },
};

const semesterOptions = ["2K", "4K", "6K"];
const departmentOptions = ["AN", "TE", "AE", "CE", "ME"];

// Email validation regex
const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Phone number validation regex
const isValidPhoneNumber = (phone: string): boolean => {
  const phoneRegex = /^[0-9]{10}$/;
  return phoneRegex.test(phone.replace(/\D/g, ""));
};

// Razorpay script loader
const loadRazorpayScript = (): Promise<boolean> => {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }

    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.head.appendChild(script);
  });
};

const EventRegistration = () => {
  const { slug } = useParams<{ slug: string }>();
  const eventConfig = slug ? eventConfigs[slug] : null;

  // Dynamic team size state for Rangoli (Variable Group)
  const [rangoliTeamSize, setRangoliTeamSize] = useState<1 | 2>(1);

  // Determine participant count based on event type
  const getParticipantCount = (): number => {
    if (slug === "rangoli") {
      return rangoliTeamSize;
    }
    return eventConfig?.participantCount || 0;
  };

  // Main form state - initialize with proper defaults
  // For Rangoli, default to 1 participant (Variable Group)
  // For other events, use their fixed participant count
  const [formState, setFormState] = useState<RegistrationFormState>(() => {
    const initialParticipantCount =
      slug === "rangoli" ? 1 : eventConfig?.participantCount || 1;
    return {
      participants: Array(initialParticipantCount)
        .fill(null)
        .map(() => ({
          name: "",
          contact: "",
          semester: "",
          department: "",
          email: "",
        })),
    };
  });

  // Validation errors state
  const [participantEmailErrors, setParticipantEmailErrors] = useState<
    Record<number, string>
  >({});
  const [participantContactErrors, setParticipantContactErrors] = useState<
    Record<number, string>
  >({});

  // Payment verification modal state
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentResponse, setPaymentResponse] = useState<{
    razorpay_payment_id: string;
    razorpay_order_id: string;
    razorpay_signature: string;
  } | null>(null);
  const [enteredPaymentId, setEnteredPaymentId] = useState("");
  const [isCompletingRegistration, setIsCompletingRegistration] =
    useState(false);
  const [registrationComplete, setRegistrationComplete] = useState(false);
  const [registrationData, setRegistrationData] = useState<{
    registrationNumber: string;
    eventName: string;
    participantDetails: ParticipantData[];
    teamLeaderName: string;
    teamLeaderContact: string;
    paymentId: string;
  } | null>(null);
  const [copied, setCopied] = useState(false);

  // Update participants when team size changes (Rangoli only) or event changes
  useEffect(() => {
    const participantCount = getParticipantCount();
    const updatedParticipants = Array(participantCount)
      .fill(null)
      .map(() => ({
        name: "",
        contact: "",
        semester: "",
        department: "",
        email: "",
      }));
    setFormState((prev) => ({
      ...prev,
      participants: updatedParticipants,
    }));
    // Clear validation errors when participants change
    setParticipantEmailErrors({});
    setParticipantContactErrors({});
  }, [rangoliTeamSize, slug, eventConfig]);

  if (!eventConfig) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-4xl text-secondary mb-4">
            Event Not Found
          </h1>
          <Link
            to="/"
            className="text-foreground/70 hover:text-secondary transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handleParticipantChange = (
    index: number,
    field: keyof ParticipantData,
    value: string,
  ) => {
    const updatedParticipants = [...formState.participants];
    updatedParticipants[index] = {
      ...updatedParticipants[index],
      [field]: value,
    };
    setFormState((prev) => ({
      ...prev,
      participants: updatedParticipants,
    }));

    // Validate email when it changes
    if (field === "email") {
      if (value && !validateEmail(value)) {
        setParticipantEmailErrors((prev) => ({
          ...prev,
          [index]: "Please enter a valid email address",
        }));
      } else {
        setParticipantEmailErrors((prev) => {
          const updatedErrors = { ...prev };
          delete updatedErrors[index];
          return updatedErrors;
        });
      }
    }

    // Validate contact when it changes
    if (field === "contact") {
      if (value && !isValidPhoneNumber(value)) {
        setParticipantContactErrors((prev) => ({
          ...prev,
          [index]: "Please enter a valid 10-digit phone number",
        }));
      } else {
        setParticipantContactErrors((prev) => {
          const updatedErrors = { ...prev };
          delete updatedErrors[index];
          return updatedErrors;
        });
      }
    }
  };

  const validateForm = (): boolean => {
    // Validate all participants (Team Leader is at index 0)
    for (let i = 0; i < formState.participants.length; i++) {
      const participant = formState.participants[i];
      const isTeamLeader = i === 0;
      const prefix = isTeamLeader ? "Team Leader" : `Participant ${i + 1}`;

      if (!participant.name.trim()) {
        alert(`${prefix} name is required`);
        return false;
      }
      if (!participant.contact.trim()) {
        alert(`${prefix} contact is required`);
        return false;
      }
      if (!isValidPhoneNumber(participant.contact)) {
        alert(`${prefix} contact must be a valid 10-digit phone number`);
        return false;
      }
      if (!participant.semester) {
        alert(`${prefix} semester is required`);
        return false;
      }
      if (!participant.department) {
        alert(`${prefix} department is required`);
        return false;
      }
      if (!participant.email.trim()) {
        alert(`${prefix} email is required`);
        return false;
      }
      if (!validateEmail(participant.email)) {
        alert(`${prefix} email must be a valid email address`);
        return false;
      }
    }

    return true;
  };

  // Check if form is valid (for disabling Pay Now button)
  const isFormValid = (): boolean => {
    if (formState.participants.length === 0) return false;

    for (let i = 0; i < formState.participants.length; i++) {
      const participant = formState.participants[i];
      if (
        !participant.name.trim() ||
        !participant.contact.trim() ||
        !isValidPhoneNumber(participant.contact) ||
        !participant.semester ||
        !participant.department ||
        !participant.email.trim() ||
        !validateEmail(participant.email) ||
        participantEmailErrors[i] ||
        participantContactErrors[i]
      ) {
        return false;
      }
    }

    return true;
  };

  const totalFee = formState.participants.length * 100;

  const copyPaymentId = () => {
    if (paymentResponse) {
      navigator.clipboard.writeText(paymentResponse.razorpay_payment_id);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const handleCompleteRegistration = async () => {
    if (!enteredPaymentId.trim()) {
      alert("Please enter the Payment ID to complete registration");
      return;
    }

    if (!paymentResponse) {
      alert("Payment information is missing. Please try again.");
      return;
    }

    setIsCompletingRegistration(true);

    try {
      const payload = {
        razorpay_order_id: paymentResponse.razorpay_order_id,
        razorpay_signature: paymentResponse.razorpay_signature,
        razorpay_payment_id: enteredPaymentId,
        amount: totalFee * 100,
        payer_name: formState.participants[0]?.name || "",
        leader_contact: formState.participants[0]?.contact || "",
        event_name: eventConfig?.title || slug || "",
        participants: formState.participants.map((p) => ({
          name: p.name,
          contact: p.contact,
          semester: p.semester,
          department: p.department,
          email: p.email,
        })),
      };

      const response = await fetch("https://apvcouncil.in/api/resoregi.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const result = await response.json();

      if (result.success || result.registration_number) {
        setRegistrationComplete(true);
        setRegistrationData({
          registrationNumber:
            result.registration_number || result.registrationNumber || "N/A",
          eventName: eventConfig?.title || slug || "",
          participantDetails: formState.participants,
          teamLeaderName: formState.participants[0]?.name || "",
          teamLeaderContact: formState.participants[0]?.contact || "",
          paymentId: enteredPaymentId,
        });
      } else {
        throw new Error(result.message || "Registration failed");
      }
    } catch (error) {
      console.error("Registration Error:", error);
      alert(
        `Registration Error: ${error instanceof Error ? error.message : "An error occurred"}`,
      );
    } finally {
      setIsCompletingRegistration(false);
    }
  };

  const generateReceipt = () => {
    if (!registrationData) return;

    const doc = new jsPDF();
    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    // Header - Top Left: Agnel Polytechnic, Vashi
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Agnel Polytechnic, Vashi", 20, 20);

    // Header - Top Right: Resonance 2k26
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    const resonanceText = "Resonance 2K26";
    const resonanceWidth = doc.getTextWidth(resonanceText);
    doc.text(resonanceText, pageWidth - resonanceWidth - 20, 20);

    // Title - Centered: Registration Receipt
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    const titleText = "Registration Receipt";
    const titleWidth = doc.getTextWidth(titleText);
    doc.text(titleText, (pageWidth - titleWidth) / 2, 40);

    // Prepare table data
    const tableData: any[][] = [];

    // Registration Number
    tableData.push([
      "Registration Number",
      registrationData.registrationNumber,
    ]);

    // Event Name
    tableData.push(["Event Name", registrationData.eventName]);

    // Participant Details
    registrationData.participantDetails.forEach((participant, index) => {
      tableData.push([
        `Participant ${index + 1}`,
        `${participant.name} - ${participant.department} - ${participant.semester}`,
      ]);
    });

    // Team Leader Contact
    tableData.push(["Contact", registrationData.teamLeaderContact]);

    // Institute
    tableData.push(["Institute", "Agnel Polytechnic, Vashi"]);

    // Payment ID
    tableData.push(["Payment ID", registrationData.paymentId]);

    // Amount Paid
    tableData.push(["Amount Paid", "Rs. 100"]);

    // Create table
    autoTable(doc, {
      startY: 50,
      head: [["Field", "Details"]],
      body: tableData,
      theme: "striped",
      headStyles: {
        fillColor: [128, 0, 0], // Dark red
        textColor: [255, 255, 255],
        fontStyle: "bold",
      },
      bodyStyles: {
        textColor: [0, 0, 0],
      },
      alternateRowStyles: {
        fillColor: [245, 245, 245],
      },
      styles: {
        cellPadding: 5,
        fontSize: 10,
      },
      columnStyles: {
        0: { cellWidth: 70, fontStyle: "bold" },
        1: { cellWidth: "auto" },
      },
    });

    // Footer
    const finalY = (doc as any).lastAutoTable.finalY || 150;
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    const footerText =
      "This is a computer-generated receipt. No signature required. APV Council";
    const footerWidth = doc.getTextWidth(footerText);
    doc.text(footerText, (pageWidth - footerWidth) / 2, finalY + 20);

    // Save PDF
    doc.save(
      `Resonance_Registration_${registrationData.registrationNumber}.pdf`,
    );
  };

  const handlePayNow = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      // Load Razorpay script
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load Razorpay. Please try again.");
        return;
      }

      // Prepare payload for backend
      // Team Leader is always at index 0
      const teamLeader = formState.participants[0];
      const payload = {
        amount: totalFee * 100, // Convert to paise
        payer_name: teamLeader.name,
        leader_contact: teamLeader.contact,
        event_name: eventConfig?.title || slug,
        participants: formState.participants.map((p) => ({
          name: p.name,
          contact: p.contact,
          semester: p.semester,
          department: p.department,
          email: p.email,
        })),
      };

      // Call backend API to create order
      const response = await fetch(
        "https://apvcouncil.in/api/create_order3.php",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      if (!response.ok) {
        throw new Error(`API Error: ${response.statusText}`);
      }

      const orderData = await response.json();

      if (!orderData.order_id) {
        throw new Error("Failed to create order. No order ID received.");
      }

      // Initialize Razorpay payment
      const razorpayKey = import.meta.env.VITE_RAZORPAY_KEY_ID;

      const options = {
        key: razorpayKey,
        amount: totalFee * 100,
        currency: "INR",
        name: "Resonance 2K26",
        description: `Registration for ${eventConfig?.title || slug}`,
        order_id: orderData.order_id,
        handler: function (response: any) {
          // Store payment response and show verification modal
          setPaymentResponse({
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_order_id: response.razorpay_order_id,
            razorpay_signature: response.razorpay_signature,
          });
          setShowPaymentModal(true);
          console.log("Payment Response:", response);
        },
        prefill: {
          name: formState.participants[0]?.name || "",
          contact: formState.participants[0]?.contact || "",
        },
        theme: {
          color: "#800000",
        },
        modal: {
          ondismiss: function () {
            console.log("Payment modal closed");
          },
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment Error:", error);
      alert(
        `Payment Error: ${error instanceof Error ? error.message : "An error occurred"}`,
      );
    }
  };

  return (
    <div className="min-h-screen">
      <Header />

      <section className="pt-32 pb-24 relative">
        <div className="absolute inset-0 bg-gradient-radial-crimson" />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Link
              to="/"
              className="inline-flex items-center gap-2 text-secondary hover:text-gold-bright transition-colors mb-8"
            >
              <ArrowLeft size={20} />
              <span className="font-body">Back to Home</span>
            </Link>

            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="font-display text-4xl md:text-5xl font-bold text-gradient-gold mb-4">
                  {eventConfig.title}
                </h1>
                <p className="font-body text-lg text-foreground/80">
                  {eventConfig.description}
                </p>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="glass-card p-8 border-secondary/20"
              >
                <h2 className="font-display text-2xl font-semibold text-secondary mb-6 text-center">
                  Registration Form
                </h2>

                <form className="space-y-8">
                  {/* Team Size Selector (Rangoli Only - Variable Group) */}
                  {slug === "rangoli" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className="bg-secondary/10 rounded-lg p-6 border border-secondary/20"
                    >
                      <label className="block font-display text-lg font-semibold text-secondary mb-4">
                        Team Size
                      </label>
                      <div className="flex gap-4">
                        {[1, 2].map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => setRangoliTeamSize(size as 1 | 2)}
                            className={`flex-1 py-3 px-4 rounded-lg font-body font-semibold transition-all ${
                              rangoliTeamSize === size
                                ? "bg-secondary text-background"
                                : "bg-background/50 border border-secondary/20 text-foreground hover:border-secondary/50"
                            }`}
                          >
                            {size} Participant{size > 1 ? "s" : ""}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}

                  {/* Participants Section */}
                  {formState.participants.map(
                    (participant, participantIndex) => {
                      // Determine field label prefix based on participant index
                      const isTeamLeader = participantIndex === 0;
                      const namePrefix = isTeamLeader ? "Team Leader " : "";

                      return (
                        <motion.div
                          key={participantIndex}
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: participantIndex * 0.1,
                          }}
                          className="glass-card border-l-4 border-secondary/30 pl-6 py-4 mb-6"
                        >
                          <h3 className="font-display text-lg font-semibold text-secondary mb-4">
                            {eventConfig.participantLabels[participantIndex]}
                          </h3>

                          {/* Name Field */}
                          <div className="mb-4">
                            <label className="block font-body text-sm text-foreground/80 mb-2">
                              {namePrefix}Name *
                            </label>
                            <input
                              type="text"
                              placeholder={`Enter ${namePrefix.toLowerCase()}name`}
                              value={participant.name}
                              onChange={(e) =>
                                handleParticipantChange(
                                  participantIndex,
                                  "name",
                                  e.target.value,
                                )
                              }
                              className="w-full px-4 py-3 rounded-lg bg-background/50 border border-secondary/20 text-foreground font-body placeholder:text-foreground/40 focus:outline-none focus:border-secondary/50 transition-colors"
                            />
                          </div>

                          {/* Contact Field */}
                          <div className="mb-4">
                            <label className="block font-body text-sm text-foreground/80 mb-2">
                              {namePrefix}Contact (10-digit phone number) *
                            </label>
                            <input
                              type="tel"
                              placeholder="Enter 10-digit phone number"
                              value={participant.contact}
                              onChange={(e) =>
                                handleParticipantChange(
                                  participantIndex,
                                  "contact",
                                  e.target.value,
                                )
                              }
                              className={`w-full px-4 py-3 rounded-lg bg-background/50 border text-foreground font-body placeholder:text-foreground/40 focus:outline-none transition-colors ${
                                participantContactErrors[participantIndex]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-secondary/20 focus:border-secondary/50"
                              }`}
                            />
                            {participantContactErrors[participantIndex] && (
                              <p className="text-red-500 font-body text-sm mt-1">
                                {participantContactErrors[participantIndex]}
                              </p>
                            )}
                          </div>

                          {/* Department Dropdown */}
                          <div className="mb-4">
                            <label className="block font-body text-sm text-foreground/80 mb-2">
                              {namePrefix}Department *
                            </label>
                            <select
                              value={participant.department}
                              onChange={(e) =>
                                handleParticipantChange(
                                  participantIndex,
                                  "department",
                                  e.target.value,
                                )
                              }
                              className="w-full px-4 py-3 rounded-lg bg-background/50 border border-secondary/20 text-foreground font-body focus:outline-none focus:border-secondary/50 transition-colors"
                            >
                              <option value="">Select Department</option>
                              {departmentOptions.map((dept) => (
                                <option key={dept} value={dept}>
                                  {dept}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Semester Dropdown */}
                          <div className="mb-4">
                            <label className="block font-body text-sm text-foreground/80 mb-2">
                              {namePrefix}Semester *
                            </label>
                            <select
                              value={participant.semester}
                              onChange={(e) =>
                                handleParticipantChange(
                                  participantIndex,
                                  "semester",
                                  e.target.value,
                                )
                              }
                              className="w-full px-4 py-3 rounded-lg bg-background/50 border border-secondary/20 text-foreground font-body focus:outline-none focus:border-secondary/50 transition-colors"
                            >
                              <option value="">Select Semester</option>
                              {semesterOptions.map((sem) => (
                                <option key={sem} value={sem}>
                                  {sem}
                                </option>
                              ))}
                            </select>
                          </div>

                          {/* Email Field */}
                          <div className="mb-4">
                            <label className="block font-body text-sm text-foreground/80 mb-2">
                              {namePrefix}Email *
                            </label>
                            <input
                              type="email"
                              placeholder="Enter participant email"
                              value={participant.email}
                              onChange={(e) =>
                                handleParticipantChange(
                                  participantIndex,
                                  "email",
                                  e.target.value,
                                )
                              }
                              className={`w-full px-4 py-3 rounded-lg bg-background/50 border text-foreground font-body placeholder:text-foreground/40 focus:outline-none transition-colors ${
                                participantEmailErrors[participantIndex]
                                  ? "border-red-500 focus:border-red-500"
                                  : "border-secondary/20 focus:border-secondary/50"
                              }`}
                            />
                            {participantEmailErrors[participantIndex] && (
                              <p className="text-red-500 font-body text-sm mt-1">
                                {participantEmailErrors[participantIndex]}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      );
                    },
                  )}

                  {/* Fee Summary */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: 0.3 }}
                    className="bg-secondary/10 rounded-lg p-6 border border-secondary/20"
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-display text-lg font-semibold text-secondary">
                        Total Fee:
                      </span>
                      <span className="font-display text-2xl font-bold text-gold-bright">
                        ₹{totalFee}
                      </span>
                    </div>
                    <p className="font-body text-sm text-foreground/60 mt-2">
                      ({formState.participants.length} participant
                      {formState.participants.length !== 1 ? "s" : ""} × ₹100)
                    </p>
                  </motion.div>

                  {/* Pay Now Button */}
                  <button
                    type="button"
                    onClick={handlePayNow}
                    disabled={!isFormValid()}
                    className="w-full py-4 px-6 rounded-xl font-body font-semibold text-lg bg-gradient-to-r from-crimson-rich to-crimson-glow text-foreground hover:from-crimson-glow hover:to-crimson-rich transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                  >
                    Pay Now ₹{totalFee}
                  </button>
                </form>

                <p className="font-body text-sm text-foreground/50 text-center mt-6">
                  You will receive a confirmation email after successful
                  payment.
                </p>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Payment Verification Modal */}
      <Dialog open={showPaymentModal} onOpenChange={setShowPaymentModal}>
        <DialogContent className="sm:max-w-md glass-card border-secondary/20">
          <AnimatePresence>
            {!registrationComplete ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl font-bold text-gradient-gold text-center">
                    Payment Successful!
                  </DialogTitle>
                  <DialogDescription className="text-center font-body text-foreground/80 mt-2">
                    Please verify your payment ID to complete registration
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-4">
                  {/* Payment ID Display with Copy Button */}
                  <div>
                    <label className="block font-body text-sm text-foreground/80 mb-2">
                      Payment ID
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={paymentResponse?.razorpay_payment_id || ""}
                        readOnly
                        className="flex-1 px-4 py-3 rounded-lg bg-background/50 border border-secondary/20 text-foreground font-body focus:outline-none"
                      />
                      <button
                        type="button"
                        onClick={copyPaymentId}
                        className="px-4 py-3 rounded-lg bg-secondary/20 hover:bg-secondary/30 border border-secondary/30 text-secondary transition-colors"
                        title="Copy Payment ID"
                      >
                        {copied ? (
                          <Check size={20} className="text-green-500" />
                        ) : (
                          <Copy size={20} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Enter Payment ID Input */}
                  <div>
                    <label className="block font-body text-sm text-foreground/80 mb-2">
                      Enter Payment ID *
                    </label>
                    <input
                      type="text"
                      placeholder="Paste Payment ID here"
                      value={enteredPaymentId}
                      onChange={(e) => setEnteredPaymentId(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg bg-background/50 border border-secondary/20 text-foreground font-body placeholder:text-foreground/40 focus:outline-none focus:border-secondary/50 transition-colors"
                    />
                  </div>

                  {/* Complete Registration Button */}
                  <button
                    type="button"
                    onClick={handleCompleteRegistration}
                    disabled={
                      isCompletingRegistration || !enteredPaymentId.trim()
                    }
                    className="w-full py-3 px-6 rounded-xl font-body font-semibold text-lg bg-gradient-to-r from-crimson-rich to-crimson-glow text-foreground hover:from-crimson-glow hover:to-crimson-rich transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isCompletingRegistration ? (
                      <>
                        <div className="w-5 h-5 border-2 border-foreground/30 border-t-foreground rounded-full animate-spin" />
                        Completing Registration...
                      </>
                    ) : (
                      "Complete Registration"
                    )}
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <DialogHeader>
                  <DialogTitle className="font-display text-2xl font-bold text-gradient-gold">
                    Registration Confirmed!
                  </DialogTitle>
                  <DialogDescription className="font-body text-foreground/80 mt-2">
                    Your registration has been successfully completed.
                  </DialogDescription>
                </DialogHeader>

                <div className="mt-6 space-y-4">
                  {registrationData && (
                    <div className="bg-secondary/10 rounded-lg p-4 border border-secondary/20">
                      <p className="font-body text-sm text-foreground/80">
                        Registration Number:{" "}
                        <span className="font-semibold text-secondary">
                          {registrationData.registrationNumber}
                        </span>
                      </p>
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={generateReceipt}
                    className="w-full py-3 px-6 rounded-xl font-body font-semibold text-lg bg-gradient-to-r from-gold-dark to-gold-metallic text-background hover:from-gold-metallic hover:to-gold-bright transition-all duration-300 flex items-center justify-center gap-2"
                  >
                    <Download size={20} />
                    Download Receipt
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default EventRegistration;
