// main.js - CP WebTechnologies Uganda AI Assistant with Google Gemini API
// Location: Arkright, Entebbe Road, Uganda

class CPAIAssistant {
    constructor() {
        this.API_KEY = 'AIzaSyDfBpIxzHvHcadNyhA7DWkOAmTIcq_e0q8';
        this.API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

        // Safely get DOM elements with null checks
        this.chatContainer = document.querySelector('.chat');
        this.inputField = document.querySelector('.input-area input');
        this.sendButton = document.getElementById('send-btn');
        this.voiceButton = document.getElementById('voice-btn');
        this.closeButton = document.querySelector('.close');

        // Check if all required elements exist
        this.checkElements();

        this.isListening = false;
        this.recognition = null;
        this.synth = window.speechSynthesis;
        this.useFallbackMode = false;
        this.conversationContext = [];

        // Minimum time the typing indicator stays on screen (ms)
        this.MIN_TYPING_TIME = 1100;

        // ============================================
        // CP WebTechnologies UGANDA Business Information
        // ============================================
        this.businessInfo = {
            company: {
                name: "CP WebTechnologies Uganda",
                shortName: "CP WebTechs",
                assistant: "Cyprian",
                tagline: "Your Trusted ICT Partner in Uganda",
                mission: "Empowering Ugandan businesses through innovative technology solutions",
                founded: "2023",
                location: "Arkright, Entebbe Road, Kampala, Uganda",
                landmark: "Arkright Stage, near Shell Arkright",
            },

            contacts: {
                phone: "+256 775640199",
                whatsapp: "+256 741 963128",
                alternate: "+256 775 64 0199",
                email: "cpwebtechs@gmail.com",
                support: "cpwebtechs@gmail.com",
                sales: "cpwebtechs@gmail.com",
                website: "https://cp-webtechnologies.github.io/-cp/index.html",
            },

            hours: {
                weekday: "Monday - Friday: 8:00 AM - 7:00 PM (EAT)",
                saturday: "Saturday: 9:00 AM - 3:00 PM (EAT)",
                sunday: "Sunday: 24hours",
                public_holidays: "Closed on public holidays but ready to respond to your inquiries",
                emergency: "24/7 emergency support for critical systems: +256 775 640199"
            },

            services: {
                software_engineering: {
                    title: "💻 Software Engineering Services",
                    description: "Custom software solutions tailored for Ugandan and international businesses",
                    items: [
                        {
                            name: "Custom Web Applications",
                            description: "React, Angular, Vue.js, Node.js applications",
                            price_range: "UGX 3,500,000 - 15,000,000 but determined by the needs",
                            timeline: "4-12 weeks",
                            includes: ["Source code", "Documentation", "Training", "3 months support"]
                        },
                        {
                            name: "Mobile App Development",
                            description: "Android & iOS apps (Flutter, React Native, Kotlin, Swift)",
                            price_range: "UGX 5,000,000 - 20,000,000",
                            timeline: "6-16 weeks",
                            includes: ["Both Android & iOS", "App Store submission", "Analytics", "Push notifications"]
                        },
                        {
                            name: "Enterprise Software",
                            description: "CRM, ERP, Inventory Systems, HR Systems",
                            price_range: "UGX 2,000,000 - 30,000,000 but determined by the needs",
                            timeline: "8-24 weeks",
                            includes: ["Custom modules", "User training", "Data migration", "Ongoing support"]
                        },
                        {
                            name: "API Development & Integration",
                            description: "Connect systems, third-party integrations",
                            price_range: "UGX 2,500,000 - 8,000,000",
                            timeline: "2-6 weeks",
                            includes: ["Documentation", "Testing", "Security implementation"]
                        },
                        {
                            name: "Payment Gateway Integration",
                            description: "MTN MoMo, Airtel Money, Visa, Mastercard",
                            price_range: "UGX 1,500,000 - 3,500,000",
                            timeline: "1-3 weeks",
                            includes: ["Mobile Money", "Card payments", "Bank transfers"]
                        }
                    ]
                },

                web_development: {
                    title: "🌐 Web Development Services",
                    description: "Professional websites for Ugandan and international businesses",
                    items: [
                        {
                            name: "Basic Business Website",
                            description: "5 pages, responsive design, contact form",
                            price_range: "UGX 1,500,000 - 2,500,000",
                            timeline: "2-3 weeks",
                            includes: ["Mobile responsive", "SEO basics", "Contact form", "Google Maps"]
                        },
                        {
                            name: "Corporate Website",
                            description: "Up to 15 pages, CMS, blog, gallery",
                            price_range: "UGX 800,000 - 5,000,000 but determined by the needs",
                            timeline: "4-6 weeks",
                            includes: ["Content Management System", "News/blog section", "Photo gallery", "Newsletter integration"]
                        },
                        {
                            name: "E-commerce Website",
                            description: "Online store with payments, inventory",
                            price_range: "UGX 3,500,000 - 8,000,000",
                            timeline: "6-10 weeks",
                            includes: ["Product catalog", "Shopping cart", "MoMo integration", "Order management"]
                        },
                        {
                            name: "School/College Website",
                            description: "For educational institutions",
                            price_range: "UGX 1,000,000 - 6,000,000",
                            timeline: "4-8 weeks",
                            includes: ["Student portal", "Results portal", "Event calendar", "Parent communication"]
                        },
                        {
                            name: "Hotel/Restaurant Website",
                            description: "With booking system",
                            price_range: "UGX 1,500,000 - 7,000,000",
                            timeline: "4-8 weeks",
                            includes: ["Room/table booking", "Menu display", "Online reservations", "Gallery"]
                        },
                        {
                            name: "Website Maintenance",
                            description: "Monthly updates, backups, security",
                            price_range: "UGX 500,000 - 1,200,000/month",
                            timeline: "Ongoing",
                            includes: ["Security updates", "Backups", "Content updates", "Performance monitoring"]
                        }
                    ]
                },

                graphics_design: {
                    title: "🎨 Graphics & Design Services",
                    description: "Creative design solutions for your brand",
                    items: [
                        {
                            name: "Logo & Branding Package",
                            description: "Complete brand identity",
                            price_range: "UGX 400,000 - 2,000,000 but determined by the needs",
                            timeline: "1-2 weeks",
                            includes: ["Logo design (3 concepts)", "Business card design", "Letterhead", "Brand guidelines"]
                        },
                        {
                            name: "Business Cards",
                            description: "Design + 100 prints",
                            price_range: "UGX 50,000 - 450,000 but determined by the needs",
                            timeline: "3-5 days",
                            includes: ["Design", "Premium card stock", "Full color both sides", "UV coating"]
                        },
                        {
                            name: "Brochures/Flyers",
                            description: "Design + printing",
                            price_range: "UGX 80,000 - 800,000 but determined by the needs",
                            timeline: "1-3 days",
                            includes: ["Design", "Printing (500 pieces)", "Folding", "Glossy finish"]
                        },
                        {
                            name: "Social Media Graphics",
                            description: "Monthly content package",
                            price_range: "UGX 600,000/month",
                            timeline: "Monthly",
                            includes: ["20 custom posts", "Story templates", "Cover images", "Ad creatives"]
                        },
                        {
                            name: "Annual Reports",
                            description: "20-30 page document design",
                            price_range: "UGX 1,500,000 - 3,000,000",
                            timeline: "2-3 weeks",
                            includes: ["Layout design", "Infographics", "Print ready files", "Digital version"]
                        },
                        {
                            name: "Video Editing",
                            description: "Promotional videos, animations",
                            price_range: "UGX 800,000 - 2,500,000",
                            timeline: "1-3 weeks",
                            includes: ["Editing", "Motion graphics", "Voiceover", "Background music"]
                        }
                    ]
                },

                it_infrastructure: {
                    title: "🔧 IT Infrastructure Services",
                    description: "Reliable hardware and network solutions",
                    items: [
                        {
                            name: "System Installation",
                            description: "Servers, workstations setup",
                            price_range: "From UGX 1,500,000",
                            timeline: "3-7 days",
                            includes: ["Hardware setup", "OS installation", "Software configuration", "Testing"]
                        },
                        {
                            name: "Network Installation",
                            description: "Cabling, routers, switches",
                            price_range: "From UGX 8000,000",
                            timeline: "4-10 days",
                            includes: ["Site survey", "Cabling", "Equipment setup", "WiFi configuration"]
                        },
                        {
                            name: "CCTV Installation",
                            description: "Security cameras",
                            price_range: "UGX 1,500,000 - 5,000,000",
                            timeline: "2-5 days",
                            includes: ["4-8 cameras", "DVR/NVR", "Mobile viewing", "1 year warranty"]
                        },
                        {
                            name: "Cloud Migration",
                            description: "Move to AWS, Azure, Google Cloud",
                            price_range: "UGX 1,000,000 - 10,000,000",
                            timeline: "2-8 weeks",
                            includes: ["Assessment", "Migration planning", "Data transfer", "Optimization"]
                        },
                        {
                            name: "Maintenance Contracts",
                            description: "Monthly IT support",
                            price_range: "UGX 200,000 - 2,500,000/month",
                            timeline: "Ongoing",
                            includes: ["On-site support", "Remote monitoring", "Hardware maintenance", "Emergency response"]
                        },
                        {
                            name: "UPS & Power Backup",
                            description: "Protect your equipment",
                            price_range: "UGX 500,000 - 3,000,000",
                            timeline: "1-3 days",
                            includes: ["Supply", "Installation", "Configuration", "Testing"]
                        }
                    ]
                },

                training: {
                    title: "📚 Training Programs",
                    description: "Practical ICT skills development",
                    items: [
                        {
                            name: "Web Development Bootcamp",
                            description: "HTML, CSS, JavaScript, React",
                            duration: "6 weeks",
                            price: " From UGX 1,800,000",
                            schedule: "Weekdays 6-8pm or Saturdays 9am-4pm",
                            includes: ["Hands-on projects", "Certificate", "Job placement support", "Lifetime updates"]
                        },
                        {
                            name: "Mobile App Development",
                            description: "Flutter/React Native",
                            duration: "8 weeks",
                            price: " From UGX 1,200,000",
                            schedule: "Weekends only",
                            includes: ["Build 2 apps", "Play Store submission guide", "Certificate", "Mentorship"]
                        },
                        {
                            name: "Digital Skills Training",
                            description: "Computer basics, internet, office",
                            duration: "4 weeks",
                            price: "UGX 500,000",
                            schedule: "Morning or evening sessions",
                            includes: ["Practical exercises", "Certificate", "Learning materials", "Refreshments"]
                        },
                        {
                            name: "Cybersecurity Awareness",
                            description: "Protect yourself and business",
                            duration: "2 weeks",
                            price: "UGX 600,000",
                            schedule: "Evening sessions",
                            includes: ["Security best practices", "Threat detection", "Data protection", "Certificate"]
                        },
                        {
                            name: "Database Administration",
                            description: "MySQL, PostgreSQL, MongoDB,Wordpress",
                            duration: "5 weeks",
                            price: "UGX 1,500,000",
                            schedule: "Weekends",
                            includes: ["Hands-on labs", "Real projects", "Certificate", "Job referrals"]
                        },
                        {
                            name: "Corporate Training",
                            description: "Customized for your team",
                            duration: "Custom",
                            price: "UGX 1,000,000 - 3,000,000",
                            schedule: "Flexible",
                            includes: ["Tailored curriculum", "On-site or remote", "Certificate for all", "Post-training support"]
                        }
                    ]
                },

                digital_marketing: {
                    title: "📱 Digital Marketing Services",
                    description: "Grow your business online",
                    items: [
                        {
                            name: "SEO Optimization",
                            description: "Rank higher on Google",
                            price_range: "UGX 600,000 - 1,500,000",
                            timeline: "Ongoing",
                            includes: ["Keyword research", "On-page SEO", "Content strategy", "Monthly reports"]
                        },
                        {
                            name: "Social Media Management",
                            description: "Facebook, Instagram, Twitter",
                            price_range: "UGX 1,000,000/month",
                            timeline: "Monthly",
                            includes: ["Daily posts", "Community management", "Analytics", "Monthly strategy"]
                        },
                        {
                            name: "Google Ads Campaign",
                            description: "Paid advertising",
                            price_range: "UGX 500,000 + ad spend",
                            timeline: "Monthly",
                            includes: ["Campaign setup", "Keyword research", "Ad creation", "Performance tracking"]
                        },
                        {
                            name: "Email Marketing",
                            description: "Newsletters, campaigns",
                            price_range: "UGX 300,000 - 800,000",
                            timeline: "Per campaign",
                            includes: ["Template design", "List management", "Campaign setup", "Analytics"]
                        }
                    ]
                }
            },

            pricing_summary: {
                websites: {
                    basic: "UGX 1,500,000 - 2,500,000",
                    business: "UGX 3,000,000 - 5,000,000",
                    ecommerce: "UGX 4,500,000 - 8,000,000",
                    custom: "From UGX 8,000,000"
                },
                mobile_apps: {
                    simple: "UGX 2,000,000 - 8,000,000",
                    medium: "UGX 4,000,000 - 15,000,000",
                    complex: "UGX 6,000,000 - 25,000,000"
                },
                software: {
                    small: "UGX 3,500,000 - 7,000,000",
                    medium: "UGX 8,000,000 - 15,000,000",
                    large: "UGX 18,000,000 - 30,000,000"
                },
                graphics: {
                    logo: "UGX 800,000 - 2,000,000",
                    branding: "UGX 1,500,000 - 3,500,000",
                    social_monthly: "UGX 600,000/month"
                },
                infrastructure: {
                    installation: "From UGX 1,500,000",
                    network: "From UGX 2,000,000",
                    cctv: "UGX 2,500,000 - 5,000,000",
                    maintenance_monthly: "UGX 800,000 - 2,500,000/month"
                },
                training: {
                    individual: "UGX 600,000 - 2,200,000",
                    corporate: "UGX 1,000,000 - 3,000,000"
                }
            },

            expertise: {
                industries: [
                    "Banking & Finance",
                    "Education & Schools",
                    "Healthcare",
                    "Hotels & Tourism",
                    "Retail & E-commerce",
                    "NGOs & Non-profits",
                    "Government",
                    "Transport & Logistics",
                    "Real Estate",
                    "Agriculture"
                ],
                languages: ["English", "Luganda", "Swahili", "Runyankole-Rukiga", "Runyoro-Rutooro"]
            },

            policies: {
                cancellation: "📋 **Cancellation Policy:**\n• 30-day written notice required\n• Email: cpwebtechs@gmail.com\n• 25% early termination fee for annual contracts canceled within first 3 months\n• Completed projects: 30-day bug fix warranty\n• Refunds processed within 14 business days",

                payment: "💳 **Payment Terms:**\n• 50% deposit to start, 50% on completion\n• NET-15 for corporate clients\n• Accepted: Bank transfer (Stanbic, Centenary), MTN MoMo, Airtel Money\n•",

                sla: "⚡ **Service Level Agreement:**\n• Critical (System Down): 1 hour response\n• High Priority: 6 hours\n• Normal: 24 hours\n• Low Priority: 48 hours\n• On-site: Within 24 hours for Kampala, 48 hours upcountry\n• Page Load time: <3 sec\n• Server Response time: <2 sec",

                refund: "💰 **Refund Policy:**\n• 80% refund within 7 days of project start\n• 50% refund within 14 days\n• No refund after 30 days unless services are not deliverd as Agreed Upon\n• Custom software: Milestone-based payments, non-refundable after approval",

                warranty: "🛡️ **Warranty:**\n• 3 months free support after project completion\n• 1 year hardware warranty (parts & labor)\n• Bug fixes covered for 90 days\n• Free updates for 6 months",

                nda: "🔒 **Confidentiality:** NDA available upon request before project discussion. Your ideas are safe with us."
            },

            promotions: {
                current: "🎉 **Current Special Offers:**\n• 10% off for first-time clients\n• Free domain name with annual hosting\n• Refer a friend: Both get 15% off next project\n• Student discount: 20% off training programs\n• Bundle offer: Website + Logo + Social media - Save 25%\n• NGO discount: 15% off for registered non-profits",

                seasonal: "🌸 **Seasonal Offers:**\n• Back to School: 15% off training in January & August\n• Christmas Special: 10% off all services in December\n• Business Anniversary: Free maintenance for 3 months"
            },

            faqs: [
                {
                    category: "general",
                    questions: [
                        {
                            q: "where are you located",
                            a: "📍 **Our Location:**\n\n**CP WebTechnologies Uganda**\nArkright, Entebbe Road\nKampala, Uganda\n\n**Landmark:**  near Shell Arkright\n\n**Directions:**\n• From Kampala city: 15 minutes via Entebbe Road\n• From Entebbe Airport: 20 minutes\n• Public transport: Taxis to 'Arkright' stage, then 2 minute walk\n\n**Parking:** Free parking available on premises\n\n**Office Hours:** Mon-Fri 8am-7pm, Sat 9am-3pm\n\n**Google Maps:** Search 'CP WebTechnologies Uganda'"
                        },
                        {
                            q: "what are your opening hours",
                            a: "🕒 **CP WebTechnologies Business Hours (EAT):**\n\n• Monday - Friday: 8:00 AM - 7:00 PM\n• Saturday: 9:00 AM - 3:00 PM\n• Sunday: Closed\n• Public Holidays: Closed\n\n**Emergency Technical Support:**\n📞 +256 775640199 (24/7 for critical issues)\n\n**After-hours appointments:** Available upon request for existing clients."
                        },
                        {
                            q: "how can i contact you",
                            a: "📱 **Contact CP WebTechnologies Uganda:**\n\n**Call/WhatsApp:**\n📞 +256 775 640199\n📞 +256 741 963128 \n\n**Email:**\n 📧 cpwebtechs@gmail.com\n\n**Website:**\n🌐 https://cp-webtechnologies.github.io/-cp <BR><BR><BR>**Office:** Arkright, Entebbe Road, Kampala\n\n**Response time:** Within 2 hours during business hours."
                        },
                        {
                            q: "what services do you offer",
                            a: "🚀 **CP WebTechnologies Uganda - Complete Services**\n\n**💻 Software Engineering**\n• Custom Web Applications (UGX 1.5M - 15M)\n• Mobile App Development (UGX 2M - 20M)\n• Enterprise Software (UGX 4M - 30M)\n• API Integration (UGX 2.5M - 8M)\n• Payment Gateway Integration (UGX 1.5M - 3.5M)\n\n**🌐 Web Development**\n• Basic Websites (UGX 1M - 2.5M)\n• Corporate Websites (UGX 3M - 5M)\n• E-commerce Stores (UGX 4.5M - 8M)\n• School/Hotel Websites (UGX 3M - 7M)\n• Website Maintenance (UGX 500K - 1.2M/month)\n\n**🎨 Graphics & Design**\n• Logo & Branding (UGX 800K - 2M)\n• Business Cards (UGX 250K - 450K)\n• Brochures/Flyers (UGX 350K - 800K)\n• Social Media Graphics (UGX 600K/month)\n• Annual Reports (UGX 1.5M - 3M)\n• Video Editing (UGX 800K - 2.5M)\n\n**🔧 IT Infrastructure**\n• System Installation (From UGX 1.5M)\n• Network Installation (From UGX 2M)\n• CCTV Installation (UGX 2.5M - 5M)\n• Cloud Migration (UGX 3M - 10M)\n• Maintenance Contracts (UGX 800K - 2.5M/month)\n• UPS & Power Backup (UGX 500K - 3M)\n\n**📚 Training Programs**\n• Web Development Bootcamp (UGX 1.8M - 6 weeks)\n• Mobile App Development (UGX 2.2M - 8 weeks)\n• Digital Skills (UGX 800K - 4 weeks)\n• Cybersecurity (UGX 600K - 2 weeks)\n• Database Admin (UGX 1.5M - 5 weeks)\n• Corporate Training (UGX 1M - 3M)\n\n**📱 Digital Marketing**\n• SEO Optimization (UGX 800K - 1.5M)\n• Social Media Management (UGX 1M/month)\n• Google Ads (UGX 500K + ad spend)\n• Email Marketing (UGX 400K - 800K)\n\nWhich service are you interested in? I can provide more details! 😊"
                        }
                    ]
                },
                {
                    category: "pricing",
                    questions: [
                        {
                            q: "how much for a website",
                            a: "💰 **Website Pricing (UGX):**\n\n**Basic Business Website** (5 pages)\n• UGX 1,500,000 - 2,500,000\n✓ Mobile responsive\n✓ Contact form\n✓ SEO basics\n✓ 3 months support\n\n**Corporate Website** (up to 15 pages)\n• UGX 3,000,000 - 5,000,000\n✓ Content Management System\n✓ Blog/News section\n✓ Photo gallery\n✓ Newsletter integration\n\n**E-commerce Website** (Online store)\n• UGX 4,500,000 - 8,000,000\n✓ Product catalog\n✓ MTN MoMo/Airtel Money\n✓ Shopping cart\n✓ Order management\n\n**School Website**\n• UGX 3,000,000 - 6,000,000\n✓ Student portal\n✓ Results portal\n✓ Event calendar\n✓ Parent communication\n\n**Hotel/Restaurant Website**\n• UGX 3,500,000 - 7,000,000\n✓ Online booking\n✓ Menu display\n✓ Gallery\n✓ Reservation system\n\n**Website Maintenance**\n• Basic: UGX 500,000/month\n• Premium: UGX 1,200,000/month\n\nAll prices include design, development, and training. Want a custom quote? Tell me about your business! 😊"
                        },
                        {
                            q: "how much for a mobile app",
                            a: "📱 **Mobile App Development Pricing (UGX):**\n\n**Simple App** (Basic functionality)\n• UGX 5,000,000 - 8,000,000\n✓ Single platform (Android or iOS)\n✓ Basic UI/UX\n✓ 2-3 screens\n✓ Simple features\n\n**Medium Complexity App**\n• UGX 10,000,000 - 15,000,000\n✓ Both Android & iOS\n✓ Custom design\n✓ Backend integration\n✓ User accounts\n✓ 5-10 screens\n\n**Complex App** (Advanced features)\n• UGX 18,000,000 - 25,000,000\n✓ Both platforms\n✓ Real-time features\n✓ Payment integration\n✓ Advanced animations\n✓ Admin dashboard\n\n**What's included:**\n✓ Source code\n✓ App Store/Play Store submission\n✓ 3 months support\n✓ Training\n✓ Documentation\n\n**Popular App Types:**\n• E-commerce apps\n• Taxi booking apps\n• Food delivery apps\n• School management apps\n• Banking/fintech apps\n• Social apps\n\nWant to discuss your app idea? Visit us at Arkright or book a free consultation! 🚀"
                        },
                        {
                            q: "what are your training fees",
                            a: "📚 **Training Program Fees (UGX):**\n\n**Individual Courses:**\n• Web Development Bootcamp (6 weeks): UGX 1,800,000\n• Mobile App Development (8 weeks): UGX 2,200,000\n• Digital Skills (4 weeks): UGX 800,000\n• Cybersecurity (2 weeks): UGX 600,000\n• Database Admin (5 weeks): UGX 1,500,000\n\n**Corporate Training:**\n• Group (up to 10 people): UGX 1,000,000 - 3,000,000\n• Custom workshops: Quoted based on needs\n\n**What's Included:**\n✓ Certified trainers\n✓ Hands-on projects\n✓ Learning materials\n✓ Certificate of completion\n✓ Post-training support\n✓ Job placement assistance\n✓ Tea/coffee and snacks\n\n**Schedule:**\n• Weekday evenings: 6pm - 8pm\n• Saturdays: 9am - 4pm\n• Corporate: Flexible\n\n**Next intake:** First Monday of every month\n\n**Location:** Arkright, Entebbe Road (our training center)\n\nRegister now: training@cpwebtechnologies.ug or call +256 700 123456 🎓"
                        },
                        {
                            q: "how much for cctv installation",
                            a: "🔒 **CCTV Installation Pricing (UGX):**\n\n**Basic Package** (4 cameras)\n• UGX 2,500,000\n✓ 4 HD cameras\n✓ 1TB DVR (30 days recording)\n✓ Mobile viewing\n✓ Standard installation\n✓ 1 year warranty\n\n**Standard Package** (8 cameras)\n• UGX 3,800,000\n✓ 8 HD cameras\n✓ 2TB DVR (60 days recording)\n✓ Night vision\n✓ Mobile & PC viewing\n✓ 1 year warranty\n\n**Premium Package** (16 cameras)\n• UGX 5,000,000\n✓ 16 HD cameras\n✓ 4TB DVR (90 days recording)\n✓ Motion detection\n✓ Remote access\n✓ 2 year warranty\n\n**Additional Options:**\n• PTZ cameras: +UGX 800,000 each\n• Audio recording: +UGX 300,000\n• Extended warranty: +15%\n• Solar powered: +UGX 1,500,000\n\n**Includes:**\n✓ Site survey\n✓ All cabling\n✓ Professional installation\n✓ Training on use\n✓ Mobile app setup\n\n**Service Areas:**\n• Kampala: Free installation\n• Upcountry: Travel fee applies\n\nContact us for a free site visit and quote! 📹"
                        }
                    ]
                },
                {
                    category: "process",
                    questions: [
                        {
                            q: "how long does it take to build a website",
                            a: "⏱️ **Website Development Timeline:**\n\n**Simple Website** (5 pages)\n• 2-3 weeks\n\n**Business Website** (10-15 pages)\n• 4-6 weeks\n\n**E-commerce Website**\n• 6-10 weeks\n\n**Custom Web Application**\n• 8-16 weeks\n\n**Our Process:**\n1️⃣ **Discovery (Week 1)** - Understanding your needs\n2️⃣ **Design (Week 1-2)** - Wireframes and mockups\n3️⃣ **Development (Week 2-6)** - Building your site\n4️⃣ **Testing (Week 6-7)** - Quality assurance\n5️⃣ **Launch (Week 8)** - Go live!\n6️⃣ **Training & Handover** - Show you how to manage\n\n**Factors affecting timeline:**\n• Complexity of features\n• Content readiness\n• Third-party integrations\n• Client feedback speed\n\nWe provide weekly updates so you always know the progress! 😊"
                        },
                        {
                            q: "what is your development process",
                            a: "🔄 **CP WebTechnologies Development Process**\n\n**Phase 1: Discovery & Planning** (1-2 weeks)\n• Requirements gathering\n• Project scope definition\n• Technology selection\n• Timeline estimation\n• Quote finalization\n\n**Phase 2: Design & Prototyping** (1-3 weeks)\n• Wireframes creation\n• UI/UX design\n• Client review & feedback\n• Design approval\n\n**Phase 3: Development** (2-12 weeks)\n• Frontend development\n• Backend development\n• Database design\n• API integration\n• Weekly progress updates\n\n**Phase 4: Testing** (1-2 weeks)\n• Functionality testing\n• Browser compatibility\n• Mobile responsiveness\n• Performance optimization\n• Bug fixes\n\n**Phase 5: Deployment** (1 week)\n• Server setup\n• Domain configuration\n• Data migration\n• Go-live\n\n**Phase 6: Training & Handover**\n• User training session\n• Documentation\n• Source code delivery\n• 3 months free support\n\n**Our methodology:** Agile with bi-weekly sprints\n\n**Communication:** WhatsApp, Email, or in-person meetings at our Arkright office.\n\nReady to start? Let's schedule a discovery meeting! 🚀"
                        }
                    ]
                },
                {
                    category: "technical",
                    questions: [
                        {
                            q: "do you offer maintenance",
                            a: "🔧 **Maintenance Plans at CP WebTechnologies:**\n\n**Basic Plan - UGX 500,000/month**\n✓ Monthly security updates\n✓ Weekly backups\n✓ Uptime monitoring\n✓ Email support\n✓ Office hours only\n\n**Premium Plan - UGX 1,200,000/month**\n✓ Weekly security updates\n✓ Daily backups\n✓ 24/7 monitoring\n✓ Priority support\n✓ Monthly performance report\n✓ 1 on-site visit/month\n\n**Enterprise Plan - Custom pricing**\n✓ Dedicated support team\n✓ 24/7 emergency response\n✓ Unlimited on-site visits\n✓ Quarterly strategy sessions\n✓ Custom SLA\n\n**One-time Maintenance:**\n• Emergency fix: UGX 200,000\n• Content update: UGX 100,000/hour\n• Security audit: UGX 500,000\n\n**What we maintain:**\n• Websites & web apps\n• Mobile apps\n• Servers & networks\n• CCTV systems\n\nContact us for a maintenance assessment! 😊"
                        },
                        {
                            q: "do you provide hosting",
                            a: "🌐 **Web Hosting Plans (UGX):**\n\n**Basic Hosting**\n• UGX 500,000/year\n✓ 5GB storage\n✓ 50GB bandwidth\n✓ 5 email accounts\n✓ SSL certificate\n✓ 99.9% uptime\n\n**Business Hosting**\n• UGX 800,000/year\n✓ 20GB storage\n✓ 200GB bandwidth\n✓ 20 email accounts\n✓ SSL certificate\n✓ Daily backups\n✓ Priority support\n\n**E-commerce Hosting**\n• UGX 1,200,000/year\n✓ 50GB storage\n✓ Unlimited bandwidth\n✓ Unlimited emails\n✓ SSL certificate\n✓ Hourly backups\n✓ 24/7 support\n\n**All plans include:**\n✓ Free domain (first year)\n✓ cPanel access\n✓ Softaculous installer\n✓ 24/7 monitoring\n✓ DDoS protection\n\n**Servers located in:**\n• Uganda (for local speed)\n• Backup in Europe\n\nFree migration from your current host!\n\nContact us to set up your hosting today! 🚀"
                        }
                    ]
                },
                {
                    category: "payment",
                    questions: [
                        {
                            q: "what payment methods do you accept",
                            a: "💳 **Payment Methods Accepted:**\n\n**Mobile Money:**\n• MTN MoMo: *165# (Pay to 0775640199)\n• Airtel Money: *185# (Pay to 0741 96 3128)\n\n**Bank Transfer:**\n• Stanbic Bank Uganda\n\n• Centenary Bank\n  Branch: Entebbe Road\n\n•  **Other Options:**\n• PayPal (for international clients)\n• Bank draft\n• Cash at our office\n\n**Payment Terms:**\n• 50% deposit to start\n• 50% on completion\n• \n**Need a payment plan?** Ask about our installment options for projects over UGX 1M.\n\nContact us at +256 775 640 199 for invoicing questions. 💰"
                        }
                    ]
                },
                {
                    category: "support",
                    questions: [
                        {
                            q: "do you offer after-sales support",
                            a: "✅ **After-Sales Support at CP WebTechnologies:**\n\n**Free Support Period:**\n• 3 months included with every project\n• Bug fixes covered\n• Minor adjustments included\n• Email & phone support\n\n**Support Channels:**\n📞 Phone: +256 700 123456\n📧 Email: support@cpwebtechnologies.ug\n💬 WhatsApp: +256 700 123456\n🏢 In-person: Arkright office\n\n**Support Hours:**\n• Weekdays: 8am - 7pm\n• Saturdays: 9am - 3pm\n• Emergency: 24/7 (critical issues)\n\n**Response Times:**\n• Critical: 2 hours\n• High: 6 hours\n• Normal: 24 hours\n• Low: 48 hours\n\n**Extended Support Plans:**\nAfter the free period, you can subscribe to our maintenance packages starting at UGX 500,000/month.\n\n**Training Included:**\nWe train you or your team on how to use and manage your new system!\n\nYour success is our success! 😊"
                        }
                    ]
                }
            ]
        };

        // System context for Gemini API
        this.systemContext = `You are Cyprian, a helpful AI assistant for CP WebTechnologies Uganda, located at Arkright on Entebbe Road, Kampala.

        ABOUT CP WEBTECHNOLOGIES:
        - Full-service ICT company in Uganda since 2023
        - Services: Software Engineering, Web Development, Graphics Design, IT Infrastructure, Training, Digital Marketing
        - Location: Arkright, Entebbe Road, Kampala (Opposite Victoria Mall)
        - Contact: +256 775 640 199, cpwebtechs@gmail.com
        - Hours: Mon-Fri 8am-7pm, Sat 9am-3pm

        YOUR PERSONALITY:
        - Friendly and professional
        - Use Ugandan context (mention UGX, local landmarks, Mobile Money)
        - Be enthusiastic about helping customers
        - Use emojis occasionally to be friendly 😊
        - Keep responses concise but informative

        RULES:
        1. For business questions (services, pricing, contact, location), use the specific business information provided
        2. For general questions, provide helpful answers
        3. Always offer to help further or ask clarifying questions
        4. If you don't know something, offer to connect with a human

        Current date: ${new Date().toLocaleDateString()}
        Current time in Uganda: ${new Date().toLocaleTimeString('en-UG', { timeZone: 'Africa/Kampala' })}`;

        // Initialize if all elements exist
        if (this.allElementsExist()) {
            this.init();
        } else {
            console.error('Required DOM elements not found. Please check your HTML structure.');
        }
    }

    checkElements() {
        console.log('Checking DOM elements:');
        console.log('- chatContainer:', this.chatContainer);
        console.log('- inputField:', this.inputField);
        console.log('- sendButton:', this.sendButton);
        console.log('- voiceButton:', this.voiceButton);
        console.log('- closeButton:', this.closeButton);
    }

    allElementsExist() {
        return this.chatContainer && this.inputField && this.sendButton && this.voiceButton && this.closeButton;
    }

    init() {
        this.setupEventListeners();
        this.initializeSpeechRecognition();
        this.addWelcomeMessage();
        this.testAPIConnection();
    }

    async testAPIConnection() {
        try {
            const response = await this.getGeminiResponse("Hello, this is a test message.");
            console.log('✅ API connection successful');
        } catch (error) {
            console.log('⚠️ Using fallback mode - API connection failed');
            this.useFallbackMode = true;
        }
    }

    setupEventListeners() {
        this.sendButton.addEventListener('click', () => this.sendMessage());

        this.inputField.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });

        this.voiceButton.addEventListener('click', () => this.toggleVoiceInput());
        this.closeButton.addEventListener('click', () => this.closeChat());

        document.addEventListener('visibilitychange', () => {
            if (document.hidden && this.isListening) {
                this.stopVoiceInput();
            }
        });
    }

    initializeSpeechRecognition() {
        if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            this.recognition = new SpeechRecognition();
            this.recognition.continuous = false;
            this.recognition.interimResults = false;
            this.recognition.lang = 'en-UG';

            this.recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                this.inputField.value = transcript;
                this.sendMessage();
            };

            this.recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                this.showNotification('Voice input error. Please try again.', 'error');
                this.stopVoiceInput();
            };

            this.recognition.onend = () => {
                this.stopVoiceInput();
            };
        } else {
            this.voiceButton.style.display = 'none';
            console.warn('Speech recognition not supported');
        }
    }

    toggleVoiceInput() {
        if (!this.recognition) {
            this.showNotification('Voice input is not supported in your browser', 'error');
            return;
        }

        if (this.isListening) {
            this.stopVoiceInput();
        } else {
            this.startVoiceInput();
        }
    }

    startVoiceInput() {
        try {
            this.recognition.start();
            this.isListening = true;
            this.voiceButton.style.backgroundColor = '#e53e3e';
            this.voiceButton.style.borderColor = '#e53e3e';
            this.showNotification('Listening... Speak now', 'info');
        } catch (error) {
            console.error('Failed to start voice input:', error);
            this.showNotification('Failed to start voice input', 'error');
        }
    }

    stopVoiceInput() {
        if (this.isListening) {
            this.recognition.stop();
            this.isListening = false;
            this.voiceButton.style.backgroundColor = '#ed8936';
            this.voiceButton.style.borderColor = '#ed8936';
        }
    }

    // =========================================================
    // FIXED sendMessage: always shows typing indicator for a
    // minimum duration before rendering the reply.
    // =========================================================
    async sendMessage() {
        const message = this.inputField.value.trim();
        if (!message) return;

        // Add user message to chat
        this.addMessage(message, 'user');
        this.inputField.value = '';

        // Add to conversation context
        this.conversationContext.push({ role: 'user', content: message });

        // Show typing indicator
        this.showTypingIndicator();

        const startedAt = Date.now();

        try {
            let response;
            if (this.useFallbackMode) {
                response = this.getBusinessResponse(message);
            } else {
                response = await this.getGeminiResponse(message);
            }

            // Enforce minimum typing indicator visibility
            const elapsed = Date.now() - startedAt;
            const remaining = Math.max(0, this.MIN_TYPING_TIME - elapsed);
            if (remaining > 0) {
                await new Promise(resolve => setTimeout(resolve, remaining));
            }

            this.removeTypingIndicator();
            this.addMessage(response, 'model');
            this.conversationContext.push({ role: 'assistant', content: response });

            if (!this.useFallbackMode) {
                this.speakResponse(response);
            }
        } catch (error) {
            console.error('Error getting response:', error);
            this.removeTypingIndicator();
            this.useFallbackMode = true;
            const fallbackResponse = this.getBusinessResponse(message);
            this.addMessage(fallbackResponse, 'model');
            this.conversationContext.push({ role: 'assistant', content: fallbackResponse });
        }
    }

    async getGeminiResponse(userMessage) {
        if (this.useFallbackMode) {
            return this.getBusinessResponse(userMessage);
        }

        const businessResponse = this.getBusinessResponse(userMessage);
        if (businessResponse && !businessResponse.includes("I'm here to help")) {
            return businessResponse;
        }

        const requestBody = {
            contents: [{
                parts: [{
                    text: `${this.systemContext}\n\nUser: ${userMessage}\n\nAssistant:`
                }]
            }],
            generationConfig: {
                temperature: 0.7,
                maxOutputTokens: 800,
            }
        };

        try {
            const response = await fetch(`${this.API_URL}?key=${this.API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }

            const data = await response.json();

            if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
                return data.candidates[0].content.parts[0].text;
            } else {
                throw new Error('Invalid response format');
            }

        } catch (error) {
            console.error('Gemini API error:', error);
            this.useFallbackMode = true;
            return this.getBusinessResponse(userMessage);
        }
    }

    getBusinessResponse(userMessage) {
        const message = userMessage.toLowerCase().trim();
        const biz = this.businessInfo;

        // GREETINGS & GENERAL
        if (this.matchesAny(message, ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'yourself', 'good evening', 'howdy'])) {
            return `👋 Hello! I'm **Cyprian**, your CP WebTechnologies Uganda assistant. Welcome to CP WebTechnologies at Arkright, Entebbe Road!\n\nI can help you with:\n• 💻 Software & Web Development\n• 🎨 Graphics Design\n• 🔧 IT Infrastructure\n• 📚 Training Programs\n• 📱 Digital Marketing\n\nHow can I assist you today? 😊`;
        }

        if (this.matchesAny(message, ['how are you', 'how are you doing', 'you doing'])) {
            return `I'm doing great, thank you for asking! 😊 Ready to help you with all your ICT needs here at CP WebTechnologies Uganda. How can I assist you today?`;
        }

        if (this.matchesAny(message, ['thank', 'thanks', 'appreciate'])) {
            return `You're most welcome! 😊 It's my pleasure to help. Is there anything else you'd like to know about CP WebTechnologies? We're always here for you at our Arkright office on Entebbe Road!`;
        }

        if (this.matchesAny(message, ['bye', 'goodbye', 'see you', 'later'])) {
            return `Thank you for reaching out to CP WebTechnologies! 👋 Feel free to contact us anytime at +256 775640199/+256 741963128 or visit us at Arkright, Entebbe Road. Have a great time! 😊`;
        }

        // LOCATION & CONTACT
        if (this.matchesAny(message, ['where', 'location', 'address', 'office', 'find you', 'directions', 'map'])) {
            return biz.faqs[0].questions[0].a;
        }

        if (this.matchesAny(message, ['hour', 'open', 'close', 'time', 'when', 'business hours', 'working hours'])) {
            return biz.hours.weekday + '\n' + biz.hours.saturday + '\n' + biz.hours.sunday + '\n\n🚨 **Emergency Support:** ' + biz.hours.emergency;
        }

        if (this.matchesAny(message, ['contact', 'phone', 'call', 'whatsapp', 'person', 'human', 'people', 'live', 'email', 'reach', 'get in touch', 'talk to'])) {
            return biz.faqs[0].questions[2].a;
        }

        // SERVICES - GENERAL
        if (this.matchesAny(message, ['service', 'offer', 'provide', 'do you do', 'what can you do', 'capabilities', 'solutions'])) {
            return biz.faqs[0].questions[3].a;
        }

        // SOFTWARE ENGINEERING
        if (this.matchesAny(message, ['software', 'application', 'custom software', 'enterprise software', 'crm', 'erp', 'hr system'])) {
            return this.formatServiceCategory(biz.services.software_engineering);
        }

        // WEB DEVELOPMENT
        if (this.matchesAny(message, ['web', 'website', 'site', 'ecommerce', 'online store', 'corporate site', 'school website', 'hotel website'])) {
            if (message.includes('ecommerce') || message.includes('online store') || message.includes('shop')) {
                const webDev = biz.services?.web_development;
                const items = webDev?.items || [];
                const item = items[2];

                if (!item) {
                    return "E-commerce website information coming soon! Please contact us for a custom quote.";
                }

                const name = item.name || 'E-commerce Website';
                const description = item.description || 'Online store with payment integration';
                const price = item.price_range || 'UGX 4,500,000 - 8,000,000';
                const timeline = item.timeline || '6-10 weeks';
                const includes = item.includes && Array.isArray(item.includes)
                    ? item.includes.map(i => '• ' + i).join('\n')
                    : '• Product catalog\n• Payment integration\n• Order management';

                return `${name}\n${description}\n💰 **Price:** ${price}\n⏱️ **Timeline:** ${timeline}\n✅ **Includes:**\n${includes}`;
            }
            if (message.includes('school') || message.includes('college') || message.includes('university')) {
                let item = biz.services.web_development.items[3];
                return `${item.name}\n${item.description}\n💰 **Price:** ${item.price_range}\n⏱️ **Timeline:** ${item.timeline}\n✅ **Includes:**\n${(item.includes || []).map(i => '• ' + i).join('\n')}`;
            }
            if (message.includes('hotel') || message.includes('restaurant') || message.includes('lodge')) {
                let item = biz.services.web_development.items[4];
                return `${item.name}\n${item.description}\n💰 **Price:** ${item.price_range}\n⏱️ **Timeline:** ${item.timeline}\n✅ **Includes:**\n${(item.includes || []).map(i => '• ' + i).join('\n')}`;
            }
            if (message.includes('maintenance') || message.includes('update') || message.includes('support')) {
                let item = biz.services.web_development.items[5];
                return `${item.name}\n${item.description}\n💰 **Price:** ${item.price_range}\n✅ **Includes:**\n${(item.includes || []).map(i => '• ' + i).join('\n')}`;
            }
            return this.formatServiceCategory(biz.services.web_development);
        }

        // MOBILE APP DEVELOPMENT
        if (this.matchesAny(message, ['app', 'mobile', 'android', 'ios', 'iphone', 'flutter', 'react native'])) {
            let softwareCat = this.formatServiceCategory(biz.services.software_engineering, true);
            return softwareCat + '\n\n📱 **Mobile App Pricing Summary:**\n' +
                   '• Simple App: UGX 2,000,000 - 8,000,000\n' +
                   '• Medium App: UGX 4,000,000 - 15,000,000\n' +
                   '• Complex App: UGX 6,000,000 - 25,000,000\n\n' +
                   'Want to discuss your app idea? Visit us at Arkright for a free consultation! 😊 or call us at +256 775 640199';
        }

        // GRAPHICS DESIGN
        if (this.matchesAny(message, ['graphic', 'design', 'logo', 'brand', 'business card', 'brochure', 'flyer', 'social media', 'video', 'animation', 'report'])) {
            if (message.includes('logo')) {
                let item = biz.services.graphics_design.items[0];
                return `${item.name}\n${item.description}\n💰 **Price:** ${item.price_range}\n⏱️ **Timeline:** ${item.timeline}\n✅ **Includes:**\n${(item.includes || []).map(i => '• ' + i).join('\n')}`;
            }
            if (message.includes('business card')) {
                let item = biz.services.graphics_design.items[1];
                return `${item.name}\n${item.description}\n💰 **Price:** ${item.price_range}\n⏱️ **Timeline:** ${item.timeline}\n✅ **Includes:**\n${(item.includes || []).map(i => '• ' + i).join('\n')}`;
            }
            if (message.includes('social media')) {
                let item = biz.services.graphics_design.items[3];
                return `${item.name}\n${item.description}\n💰 **Price:** ${item.price_range}\n✅ **Includes:**\n${(item.includes || []).map(i => '• ' + i).join('\n')}`;
            }
            return this.formatServiceCategory(biz.services.graphics_design);
        }

        // IT INFRASTRUCTURE
        if (this.matchesAny(message, ['infrastructure', 'it', 'hardware', 'server', 'network', 'cctv', 'camera', 'installation', 'cloud', 'maintenance', 'ups', 'power backup'])) {
            if (message.includes('cctv') || message.includes('camera') || message.includes('security')) {
                return biz.faqs[1].questions[3].a;
            }
            if (message.includes('maintenance') || message.includes('support contract')) {
                let item = biz.services.it_infrastructure.items[4];
                return `${item.name}\n${item.description}\n💰 **Price:** ${item.price_range}\n✅ **Includes:**\n${(item.includes || []).map(i => '• ' + i).join('\n')}`;
            }
            return this.formatServiceCategory(biz.services.it_infrastructure);
        }

        // TRAINING PROGRAMS
        if (this.matchesAny(message, ['train', 'learn', 'course', 'class', 'workshop', 'bootcamp', 'study', 'education', 'skill'])) {
            if (message.includes('web') || (message.includes('development') && message.includes('bootcamp'))) {
                const training = biz.services?.training;
                const items = training?.items || [];
                const item = items[0];

                if (!item) {
                    return "Web Development Bootcamp information coming soon! Contact us for details.";
                }

                const name = item.name || 'Web Development Bootcamp';
                const description = item.description || 'Comprehensive web development training';
                const price = item.price || 'UGX 1,800,000';
                const duration = item.duration || '6 weeks';
                const schedule = item.schedule || 'Weekdays 6-8pm or Saturdays';
                const includes = item.includes && Array.isArray(item.includes)
                    ? item.includes.map(i => '• ' + i).join('\n')
                    : '• Hands-on projects\n• Certificate\n• Job support';

                return `${name}\n${description}\n💰 **Price:** ${price}\n⏱️ **Duration:** ${duration}\n📅 **Schedule:** ${schedule}\n✅ **Includes:**\n${includes}`;
            }
            if (message.includes('mobile') || message.includes('app')) {
                let item = biz.services.training.items[1];
                return `${item.name}\n${item.description}\n💰 **Price:** ${item.price}\n⏱️ **Duration:** ${item.duration}\n📅 **Schedule:** ${(item.includes || []).map(i => '• ' + i).join('\n')}`;
            }
            if (message.includes('digital') || message.includes('computer basics') || message.includes('office')) {
                let item = biz.services.training.items[2];
                return `${item.name}\n${item.description}\n💰 **Price:** ${item.price}\n⏱️ **Duration:** ${item.duration}\n✅ **Includes:**\n${(item.includes || []).map(i => '• ' + i).join('\n')}`;
            }
            if (message.includes('cyber') || message.includes('security')) {
                let item = biz.services.training.items[3];
                return `${item.name}\n${item.description}\n💰 **Price:** ${item.price}\n⏱️ **Duration:** ${item.duration}\n✅ **Includes:**\n${(item.includes || []).map(i => '• ' + i).join('\n')}`;
            }
            if (message.includes('corporate') || message.includes('company') || message.includes('staff') || message.includes('employees')) {
                let item = biz.services.training.items[5];
                return `${item.name}\n${item.description}\n💰 **Price:** ${item.price}\n✅ **Includes:**\n${(item.includes || []).map(i => '• ' + i).join('\n')}`;
            }
            return this.formatServiceCategory(biz.services.training);
        }

        // DIGITAL MARKETING
        if (this.matchesAny(message, ['marketing', 'seo', 'social media management', 'google ads', 'email marketing', 'digital marketing'])) {
            return this.formatServiceCategory(biz.services.digital_marketing);
        }

        // PRICING & RATES
        if (this.matchesAny(message, ['price', 'cost', 'how much', 'rate', 'fee', 'charges', 'pricing', 'quotation', 'quote'])) {
            if (message.includes('website') || message.includes('web')) {
                return biz.faqs[1].questions[0].a;
            }
            if (message.includes('app') || message.includes('mobile')) {
                return biz.faqs[1].questions[1].a;
            }
            if (message.includes('train') || message.includes('course') || message.includes('learn')) {
                return biz.faqs[1].questions[2].a;
            }
            if (message.includes('cctv') || message.includes('camera')) {
                return biz.faqs[1].questions[3].a;
            }
            if (message.includes('logo') || message.includes('brand')) {
                return biz.services.graphics_design.items[0].name + ': ' + biz.services.graphics_design.items[0].price_range;
            }
            if (message.includes('maintenance')) {
                return biz.services.it_infrastructure.items[4].name + ': ' + biz.services.it_infrastructure.items[4].price_range;
            }

            return `💰 **CP WebTechnologies Pricing Summary (UGX):**


**Websites:**
• Basic: 1.5M - 2.5M
• Business: 3M - 5M
• E-commerce: 4.5M - 8M

**Mobile Apps:**
• Simple: 5M - 8M
• Medium: 10M - 15M
• Complex: 18M - 25M

**Graphics:**
• Logo: 800K - 2M
• Business Cards: 250K - 450K
• Social Media: 600K/month

**Training:**
• Individual: 600K - 2.2M
• Corporate: 1M - 3M

**Infrastructure:**
• CCTV: 2.5M - 5M
• Maintenance: 800K - 2.5M/month

Want a detailed quote? Tell me what you need! 😊`;
        }

        // PAYMENT METHODS
        if (this.matchesAny(message, ['payment', 'pay', 'money', 'momo', 'mtn', 'payment methods', 'airtel', 'bank', 'transfer', 'installment', 'deposit'])) {
            return biz.faqs[4].questions[0].a;
        }

        // POLICIES
        if (this.matchesAny(message, ['policy', 'cancel', 'cancellation', 'policies', 'refund', 'warranty', 'guarantee', 'terms', 'conditions', 'sla', 'agreement'])) {
            if (message.includes('cancel')) {
                return biz.policies.cancellation;
            }
            if (message.includes('refund')) {
                return biz.policies.refund;
            }
            if (message.includes('warranty')) {
                return biz.policies.warranty;
            }
            if (message.includes('sla') || message.includes('service level')) {
                return biz.policies.sla;
            }
            return biz.policies.cancellation + '\n\n' + biz.policies.refund + '\n\n' + biz.policies.warranty;
        }

        // PROCESS & TIMELINE
        if (this.matchesAny(message, ['process', 'how it works', 'methodology', 'steps', 'timeline', 'how long', 'duration', 'when can i get'])) {
            if (message.includes('website')) {
                return biz.faqs[2].questions[0].a;
            }
            if (message.includes('app')) {
                return `📱 **Mobile App Development Timeline:**\n\n• Simple App: 6-8 weeks\n• Medium App: 10-14 weeks\n• Complex App: 16-24 weeks\n\n**Process:**\n1. Discovery (1-2 weeks)\n2. Design (2-3 weeks)\n3. Development (4-12 weeks)\n4. Testing (2-3 weeks)\n5. Deployment (1 week)\n6. Training & Support\n\nVisit us at Arkright to discuss your app!`;
            }
            return biz.faqs[2].questions[0].a;
        }

        // TEAM & EXPERTISE
        if (this.matchesAny(message, ['team', 'who are you', 'about you', 'expert', 'certified', 'qualification', 'experience', 'background'])) {
            let inds = biz.expertise.industries.map(ind => '• ' + ind).join('\n');

            return `👥 **Our Team at CP WebTechnologies Uganda**

**Industries We Serve:**
${inds}

**Languages Spoken:** ${biz.expertise.languages.join(', ')}

Our team combines technical expertise with local business understanding to deliver solutions that drive real results for Ugandan and international businesses.

Visit us at Arkright, Entebbe Road to meet our team! 😊 or call us at +256 741 963128`;
        }

        // SUPPORT & MAINTENANCE
        if (this.matchesAny(message, ['support', 'help', 'assist', 'after sales', 'maintenance', 'update', 'fix', 'issue', 'problem', 'not working'])) {
            if (message.includes('maintenance') || message.includes('update')) {
                let item = biz.services.web_development.items[5];
                return `${item.name}\n${item.description}\n💰 **Price:** ${item.price_range}\n✅ **Includes:**\n${(item.includes || []).map(i => '• ' + i).join('\n')}`;
            }
            return biz.faqs[5].questions[0].a;
        }

        // HOSTING
        if (this.matchesAny(message, ['hosting', 'host', 'server', 'domain'])) {
            return biz.faqs[3].questions[1].a;
        }

        // PROMOTIONS & DISCOUNTS
        if (this.matchesAny(message, ['discount', 'offer', 'promo', 'special', 'deal', 'bundle', 'sale'])) {
            return biz.promotions.current + '\n\n' + biz.promotions.seasonal;
        }

        // REFERRALS
        if (this.matchesAny(message, ['refer', 'friend', 'colleague', 'someone'])) {
            return "🤝 **Referral Program:**\n\nRefer a friend or colleague to CP WebTechnologies and both of you get **15% off** your next project!\n\nHow it works:\n1. Tell your friend about us\n2. They mention your name when contacting us\n3. Both get discount on next project\n\nShare the love! 💝";
        }

        // TESTIMONIALS / PORTFOLIO
        if (this.matchesAny(message, ['testimonial', 'review', 'portfolio', 'past work', 'examples', 'samples', 'previous projects'])) {
            return "📁 **Our Work:**\n\nWe've successfully delivered projects for:\n• Banks and financial institutions\n• Schools and universities\n• Hotels and lodges\n• Retail stores and supermarkets\n• NGOs and non-profits\n• Government agencies\n\n**Want to see examples?**\n  visit our office at Arkright to see live demos!\n\nWe're happy to provide references upon request. 😊";
        }

        // MEETING / CONSULTATION
        if (this.matchesAny(message, ['meet', 'consultation', 'appointment', 'discuss', 'talk in person', 'visit'])) {
            return "📅 **Book a Consultation:**\n\nWe'd love to meet you at our Arkright office!\n\n**Location:** Arkright, Entebbe Road, Kampala\n**Hours:** Mon-Fri 8am-7pm, Sat 9am-3pm\n\n**To schedule an appointment:**\n📞 Call: +256 775 640 199\n📧 Email: cpwebtechs@gmail.com\n💬 WhatsApp: +256 775 640 199\n\n**Free 30-minute initial consultation** to discuss your needs!\n\nWalk-ins welcome, but appointments ensure we have the right expert ready for you. 😊";
        }

        // DEFAULT RESPONSE
        return "Thank you for reaching out to CP WebTechnologies Uganda! I'm here to help with all your ICT needs. 😊\n\n**You can ask me about:**\n📍 Location & Contact\n💻 Services & Pricing\n🕒 Business Hours\n📚 Training Programs\n🔧 Technical Support\n📋 Policies & FAQs\n\nWhat specific information are you looking for? Feel free to ask, or visit us at Arkright on Entebbe Road! or contact us on +256 775640199 / +256 741963128";
    }

    matchesAny(message, keywords) {
        return keywords.some(keyword => message.includes(keyword));
    }

    formatServiceCategory(category, includeAll = false) {
        if (!category) {
            return "Service information not available. Please contact us directly.";
        }

        const title = category.title || 'Services';
        const description = category.description || '';
        const items = category.items || [];

        let response = `**${title}**\n${description}\n\n`;

        const itemsToShow = includeAll ? items : items.slice(0, 3);

        itemsToShow.forEach(item => {
            if (!item) return;

            const name = item.name || 'Service';
            const desc = item.description || '';
            const price = item.price_range || item.price || 'Contact for quote';

            response += `**${name}**\n`;
            response += `• ${desc}\n`;
            response += `💰 Price: ${price}\n`;

            if (item.timeline) response += `⏱️ Timeline: ${item.timeline}\n`;
            if (item.duration) response += `⏱️ Duration: ${item.duration}\n`;

            if (item.includes && Array.isArray(item.includes)) {
                response += `✅ **Includes:**\n`;
                item.includes.forEach(inc => {
                    response += `• ${inc}\n`;
                });
            }

            response += '\n';
        });

        if (!includeAll && items.length > 3) {
            response += `*...and ${items.length - 3} more services. Ask for details!*\n\n`;
        }

        response += `For more details, visit us at Arkright or call +256 775 640 199 / +256 741963128 ! 😊`;

        return response;
    }

    // =========================================================
    // FIXED addMessage: uses smart scrolling so long replies
    // are read from the top instead of jumping to the bottom.
    // =========================================================
    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = sender;

        const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        if (sender === 'model') {
            const avatar = document.createElement('img');
            avatar.className = 'bot-avatar';
            avatar.src = 'logo.png';
            avatar.alt = 'CP AI Assistant';
            avatar.width = 36;
            avatar.height = 36;
            avatar.onerror = () => {
                avatar.src = 'https://via.placeholder.com/36/2563eb/ffffff?text=CP';
            };

            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.innerHTML = this.formatMessage(text) + `<span class="time">${time}</span>`;

            messageDiv.appendChild(avatar);
            messageDiv.appendChild(messageContent);
        } else {
            const messageContent = document.createElement('div');
            messageContent.className = 'message-content';
            messageContent.innerHTML = this.formatMessage(text) + `<span class="time">${time}</span>`;
            messageDiv.appendChild(messageContent);
        }

        this.chatContainer.appendChild(messageDiv);

        // Smart scroll: show the top of long messages, bottom of short ones
        this.scrollToElement(messageDiv);
    }

    // =========================================================
    // Smart scroll helper: keeps long answers readable
    // =========================================================
    scrollToElement(el) {
        if (!el || !this.chatContainer) return;

        // Wait for layout so offsetHeight is accurate
        requestAnimationFrame(() => {
            const container = this.chatContainer;
            const containerHeight = container.clientHeight;
            const elHeight = el.offsetHeight;
            const elTop = el.offsetTop;

            if (elHeight > containerHeight * 0.6) {
                // Long message: align its top near the top of the viewport
                container.scrollTo({
                    top: Math.max(0, elTop - 12),
                    behavior: 'smooth'
                });
            } else {
                // Short message: scroll to the bottom smoothly
                container.scrollTo({
                    top: container.scrollHeight,
                    behavior: 'smooth'
                });
            }
        });
    }

    formatMessage(text) {
        // Convert URLs to links
        text = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" style="color: #2563eb; text-decoration: underline;">$1</a>');

        // Convert emails to mailto links
        text = text.replace(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/g, '<a href="mailto:$1" style="color: #2563eb; text-decoration: underline;">$1</a>');

        // Convert phone numbers to tel links (Ugandan format)
        text = text.replace(/(\+256\s?\d{3}\s?\d{3}\s?\d{3})/g, '<a href="tel:$1" style="color: #2563eb; text-decoration: underline;">$1</a>');

        // Strip any raw <BR> tags users may have typed, normalise to newlines
        text = text.replace(/<br\s*\/?>/gi, '\n');

        // Convert line breaks to <br>
        text = text.replace(/\n/g, '<br>');

        // Bold formatting for headers
        text = text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        return text;
    }

    addWelcomeMessage() {
        setTimeout(() => {
            const welcome = `👋 **Welcome to CP WebTechnologies Uganda!**

I'm **Cyprian**, your AI assistant. We're located at **Arkright on Entebbe Road**, Kampala.

**How can I help you today?** 😊

💡 **Popular questions:**
• What services do you offer?
• How much for a website?
• Where are you located?
• What are your training programs?
• Do you do mobile apps?

Just ask away!`;

            this.addMessage(welcome, 'model');
        }, 500);
    }

    // =========================================================
    // FIXED showTypingIndicator: uses smart scroll so the
    // typing bubble is always visible while it animates.
    // =========================================================
    showTypingIndicator() {
        // Remove any existing indicator first
        this.removeTypingIndicator();

        const indicator = document.createElement('div');
        indicator.className = 'model';
        indicator.id = 'typing-indicator';

        const avatar = document.createElement('img');
        avatar.className = 'bot-avatar';
        avatar.src = 'logo.png';
        avatar.alt = 'CP AI Assistant';
        avatar.width = 36;
        avatar.height = 36;
        avatar.onerror = () => {
            avatar.src = 'https://via.placeholder.com/36/2563eb/ffffff?text=CP';
        };

        const dots = document.createElement('div');
        dots.className = 'typing-dots';
        dots.innerHTML = '<span></span><span></span><span></span>';

        indicator.appendChild(avatar);
        indicator.appendChild(dots);

        this.chatContainer.appendChild(indicator);

        // Scroll so the typing indicator is visible
        this.scrollToElement(indicator);
    }

    removeTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.remove();
        }
    }

    scrollToBottom() {
        if (!this.chatContainer) return;
        this.chatContainer.scrollTo({
            top: this.chatContainer.scrollHeight,
            behavior: 'smooth'
        });
    }

    speakResponse(text) {
        if ('speechSynthesis' in window && text.split(' ').length < 30) {
            this.synth.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.lang = 'en-US';
            utterance.rate = 1;
            utterance.pitch = 1;
            this.synth.speak(utterance);
        }
    }

    showNotification(message, type = 'info') {
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(n => n.remove());

        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;

        const colors = {
            error: '#e53e3e',
            info: '#3182ce',
            success: '#38a169'
        };

        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 12px 24px;
            border-radius: 8px;
            color: white;
            font-weight: 500;
            z-index: 1000;
            animation: slideIn 0.3s ease;
            background: ${colors[type] || '#3182ce'};
            box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        `;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    closeChat() {
        this.chatContainer.innerHTML = '';
        this.addWelcomeMessage();
        this.inputField.value = '';
        this.conversationContext = [];
        this.showNotification('Chat reset successfully', 'success');
    }
}

// Wait for DOM to be fully loaded before initializing
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded, initializing CP WebTechnologies Uganda AI Assistant...');

    // Small delay to ensure everything is ready
    setTimeout(() => {
        try {
            if (!window.cpAssistant) {
                window.cpAssistant = new CPAIAssistant();
                console.log('✅ CP WebTechnologies AI Assistant initialized successfully');
            }
        } catch (error) {
            console.error('❌ Failed to initialize CP AI Assistant:', error);
        }
    }, 100);

    // Add animation styles
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }

        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }

        .typing-dots {
            background: white;
            padding: 16px 24px;
            border-radius: 18px 18px 18px 4px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            display: flex;
            gap: 4px;
        }

        .typing-dots span {
            width: 8px;
            height: 8px;
            background: #2563eb;
            border-radius: 50%;
            display: inline-block;
            animation: bounce 1.4s infinite ease-in-out both;
        }

        .typing-dots span:nth-child(1) { animation-delay: -0.32s; }
        .typing-dots span:nth-child(2) { animation-delay: -0.16s; }

        @keyframes bounce {
            0%, 80%, 100% { transform: scale(0); }
            40% { transform: scale(1.0); }
        }

        .message-content {
            max-width: 80%;
            padding: 12px 16px;
            border-radius: 18px;
            position: relative;
            word-wrap: break-word;
            box-shadow: 0 2px 5px rgba(0,0,0,0.05);
        }

        .model .message-content {
            background: white;
            border: 1px solid #e2e8f0;
            border-bottom-left-radius: 5px;
            color: #1e293b;
        }

        .user .message-content {
            background: #2563eb;
            color: white;
            border-bottom-right-radius: 5px;
        }

        .time {
            font-size: 0.65rem;
            opacity: 0.7;
            display: block;
            text-align: right;
            margin-top: 6px;
        }

        .user .time {
            color: rgba(255,255,255,0.8);
        }

        .bot-avatar {
            border-radius: 50%;
            object-fit: cover;
            border: 2px solid #2563eb;
            flex-shrink: 0;
        }

        .model, .user {
            display: flex;
            gap: 10px;
            align-items: flex-start;
            animation: messageSlide 0.3s ease;
        }

        @keyframes messageSlide {
            from {
                opacity: 0;
                transform: translateY(10px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }

        .user {
            flex-direction: row-reverse;
        }
    `;
    document.head.appendChild(style);
});

// Global error handler
window.addEventListener('error', (event) => {
    console.error('Global error:', event.error ? event.error.message : 'Unknown error');
});

// Fallback init if DOM is already loaded when this script runs
if (document.readyState !== 'loading') {
    console.log('DOM already loaded, initializing...');
    setTimeout(() => {
        try {
            if (!window.cpAssistant) {
                window.cpAssistant = new CPAIAssistant();
            }
        } catch (error) {
            console.error('Failed to initialize CP AI Assistant:', error);
        }
    }, 100);
}
