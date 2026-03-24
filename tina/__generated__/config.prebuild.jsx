// tina/config.ts
import { defineConfig } from "tinacms";

// content/tina/site-content.json
var site_content_default = {
  siteSettings: {
    mediaOrigin: "https://englishplumber.nl",
    businessName: "English Plumber",
    baseCity: "Medemblik",
    whatsappNumber: "+31 6 428 699 31",
    canonicalOrigin: "https://englishplumber.nl/",
    homepageUrl: "https://englishplumber.nl/",
    ogImage: "/family%20photo.PNG",
    locales: [
      {
        code: "en",
        label: "English",
        nativeLabel: "English",
        shortLabel: "EN",
        htmlLang: "en",
        ogLocale: "en_GB"
      },
      {
        code: "nl",
        label: "Dutch",
        nativeLabel: "Nederlands",
        shortLabel: "NL",
        htmlLang: "nl",
        ogLocale: "nl_NL"
      }
    ]
  },
  pages: {
    home: {
      translations: {
        en: {
          primaryArea: "Medemblik + 40km: Hoorn, Heerhugowaard, Purmerend, Alkmaar (not Amsterdam/Almere)",
          heroImagePath: "/family photo.PNG",
          seoTitle: "English Plumber | Boiler Service & Plumbing in Medemblik",
          seoDescription: "Friendly local plumber for expats and Dutch homeowners in Medemblik and nearby towns. Boiler servicing from \u20AC145, general plumbing at \u20AC95/hour. Send photos on WhatsApp +31 6 428 699 31.",
          hero: {
            titleLine1: "One-man Plumbing",
            titleLine2: "For Expats & Locals",
            description: "Boiler servicing, radiator work, tap repairs, and general plumbing handyman jobs serving all North-Holland from Medemblik. ",
            primaryCtaLabel: "Contact Me",
            imageAlt: "English Plumber hero image"
          },
          biomarkerPanel: {
            titleLine1: "One Plumber",
            titleLine2: "Core Services Covered",
            primaryCtaLabel: "View All Services",
            items: [
              {
                label: "Boiler Servicing",
                imagePath: "/boiler emoji.png"
              },
              {
                label: "Radiator Installation",
                imagePath: "/radiator emoji.png"
              },
              {
                label: "Pipe Repairs",
                imagePath: "/pipe repair emoji.png"
              },
              {
                label: "Tap Repair",
                imagePath: "/tap emoji.png"
              },
              {
                label: "Tap Replacement",
                imagePath: "/tap repair emoji.png"
              },
              {
                label: "Small Leak Fixes",
                imagePath: "/pipe emoji.png"
              },
              {
                label: "General Plumbing Handyman",
                imagePath: "/plumbing emoji.png"
              },
              {
                label: "Friendly Support",
                imagePath: "/friendly emoji.png"
              },
              {
                label: "Gas Saving Advice",
                imagePath: "/gas saving emojio.png"
              },
              {
                label: "Dutch + English Help",
                imagePath: "/dutch english emoji.png"
              }
            ]
          },
          featurePanel: {
            cardCtaLabel: "Ask on WhatsApp",
            cards: [
              {
                alt: "Boiler servicing",
                titleLine1: "Boiler",
                titleLine2: "Servicing",
                href: "https://wa.me/31642869931",
                imagePath: "/Boiler%20Servicing%20Avatar.png"
              },
              {
                alt: "Radiator services",
                titleLine1: "Radiator",
                titleLine2: "Services",
                href: "https://wa.me/31642869931",
                imagePath: "/Radiator Services Avatar.png"
              }
            ],
            headingLine1: "Clear",
            headingLine2: "Quotes",
            description: "Send photos and a short description on WhatsApp. I will review the issue and give a clear next step with pricing guidance before we book.",
            stat1: {
              value: "\u20AC95",
              line1: "Per Hour",
              line2: "General Work"
            },
            stat2: {
              value: "From",
              line1: "\u20AC145",
              line2: "Boiler Servicing"
            },
            prescriptionCard: {
              alt: "Tap repairs",
              titleLine1: "Tap",
              titleLine2: "Repairs",
              href: "https://wa.me/31642869931",
              imagePath: "/Tap Repairs Avatar.png",
              ctaLabel: "Ask on WhatsApp"
            },
            careHeadingLine1: "Bye home stress,",
            careHeadingLine2: "hello reliable plumbing",
            careDescription: "Friendly local service for expats and Dutch homeowners. No drains, no 24/7 emergency callouts, just clear communication and quality work.",
            testimonialAlt: "English Plumber at work",
            badgeTitle: "Certified",
            badgeStatus: "CO + VCA"
          },
          trustSection: {
            headingLine1: "Expats and locals trust",
            headingLine2: "English Plumber",
            memberLabel: "Verified Client",
            readMoreLabel: "More feedback",
            videoCards: [
              {
                thumbnailAlt: "Boiler service in Medemblik",
                profileAlt: "Client in Medemblik",
                thumbnailImagePath: "/boiler install.JPG",
                profileImagePath: "/werkspot logo.png",
                handle: "@medemblikhome",
                meta: "Boiler service completed"
              },
              {
                thumbnailAlt: "Radiator work in Hoorn",
                profileAlt: "Client in Hoorn",
                thumbnailImagePath: "/boiler service.JPG",
                profileImagePath: "/werkspot logo.png",
                handle: "@hoornhome",
                meta: "Radiator upgrade completed"
              },
              {
                thumbnailAlt: "Tap repair in Purmerend",
                profileAlt: "Client in Purmerend",
                thumbnailImagePath: "/tap and sink install.JPG",
                profileImagePath: "/werkspot logo.png",
                handle: "@purmerendhome",
                meta: "Tap repair completed"
              },
              {
                thumbnailAlt: "Plumbing handyman in Alkmaar",
                profileAlt: "Client in Alkmaar",
                thumbnailImagePath: "/pipe repair.JPG",
                profileImagePath: "/werkspot logo.png",
                handle: "@alkmaarhome",
                meta: "Small plumbing job completed"
              }
            ],
            textCards: [
              {
                profileAlt: "Profile Local Homeowner",
                profileImagePath: "/werkspot logo.png",
                name: "Local Homeowner",
                quote: "Review section is being updated with real customer feedback. For now, send photos on WhatsApp and I will reply with clear next steps."
              },
              {
                profileAlt: "Profile Expat Client",
                profileImagePath: "/werkspot logo.png",
                name: "Expat Client",
                quote: "I work photo-first on WhatsApp, so you can explain the problem quickly in English and get a straightforward quote."
              },
              {
                profileAlt: "Profile Dutch Homeowner",
                profileImagePath: "/werkspot logo.png",
                name: "Dutch Homeowner",
                quote: "Rates are transparent: \u20AC95 per hour for general work, boiler servicing from \u20AC145."
              },
              {
                profileAlt: "Profile Service Area Client",
                profileImagePath: "/werkspot logo.png",
                name: "Service Area Client",
                quote: "Main area is Medemblik and nearby towns including Hoorn, Heerhugowaard, Purmerend, and Alkmaar."
              }
            ]
          },
          commandCenterSection: {
            headingLine1: "So ",
            headingLine2: "all in one chat.",
            loadingAnimationLabel: "WhatsApp workflow preview...",
            description: "Share photos, explain the issue, and get practical advice, pricing guidance, and booking confirmation in one WhatsApp conversation.",
            ctaLabel: "View Services",
            appImagePath: "/images/command-center.svg",
            appImageAlt: "English Plumber WhatsApp workflow"
          },
          ourProcessSection: {
            imagePath: "/whatsapp conversation.png",
            imageAlt: "English Plumber process",
            headingLine1: "How It",
            headingLine2: "Works",
            steps: [
              {
                title: "Send Photos on WhatsApp",
                description: "Send photos and a short message with your postcode and issue."
              },
              {
                title: "Quick Assessment",
                description: "I review the issue and tell you the likely fix and next steps."
              },
              {
                title: "Clear Quote",
                description: "You get transparent pricing guidance before booking."
              },
              {
                title: "Book the Visit",
                description: "We schedule a convenient time and complete the job professionally."
              }
            ]
          },
          choosePathSection: {
            title: "Choose Your Service",
            subtitle: "Simple options for Medemblik and nearby towns. Strongest route: send photos on WhatsApp.",
            plans: [
              {
                name: "English Plumber",
                nameStyle: "Hourly",
                tagline: "General plumbing and handyman support",
                isPopular: false,
                pricing: {
                  oneTimePrice: "\u20AC95/hr",
                  recurringPrice: "\u20AC95/hr",
                  oneTimeLabel: "One-off",
                  recurringLabel: "One-off",
                  discountPercentage: "Clear",
                  twiceAnnuallyBillingText: "Minimum 1 hour. Parts extra.",
                  annuallyBillingText: "Travel costs calculated."
                },
                feature: [
                  {
                    categoryName: "Best for",
                    features: [
                      {
                        name: "Tap repairs and replacements"
                      },
                      {
                        name: "Radiator fixes"
                      },
                      {
                        name: "Small household plumbing jobs"
                      },
                      {
                        name: "Friendly English or Dutch communication"
                      }
                    ]
                  }
                ],
                restriction: [
                  {
                    categoryName: "Not included",
                    features: [
                      {
                        name: "No drains"
                      },
                      {
                        name: "No 24/7 emergency callouts"
                      }
                    ]
                  }
                ],
                link: {
                  label: "Get Started"
                }
              },
              {
                name: "English Plumber",
                nameStyle: "Boiler Service",
                tagline: "Annual servicing from \u20AC145",
                isPopular: true,
                pricing: {
                  oneTimePrice: "\u20AC145 from",
                  recurringPrice: "\u20AC145 from",
                  oneTimeLabel: "One-off",
                  recurringLabel: "One-off",
                  discountPercentage: "From",
                  twiceAnnuallyBillingText: "Servicing visit. Parts extra if needed.",
                  annuallyBillingText: "No subscription."
                },
                feature: [
                  {
                    categoryName: "Boiler brands",
                    features: [
                      {
                        name: "Vaillant"
                      },
                      {
                        name: "Intergas"
                      },
                      {
                        name: "Remeha"
                      },
                      {
                        name: "ATAG"
                      }
                    ]
                  },
                  {
                    categoryName: "Includes",
                    features: [
                      {
                        name: "Service check and safety review"
                      },
                      {
                        name: "Clear advice before extra work"
                      }
                    ]
                  }
                ],
                restriction: [
                  {
                    categoryName: "Please note",
                    features: [
                      {
                        name: "Final price depends on boiler condition"
                      }
                    ]
                  }
                ],
                link: {
                  label: "Get Started"
                }
              },
              {
                name: "English Plumber",
                nameStyle: "Free Quote",
                tagline: "Send photos first",
                isPopular: false,
                pricing: {
                  oneTimePrice: "\u20AC0",
                  recurringPrice: "\u20AC0",
                  oneTimeLabel: "Quote",
                  recurringLabel: "Quote",
                  discountPercentage: "Fast",
                  twiceAnnuallyBillingText: "WhatsApp assessment before visit.",
                  annuallyBillingText: "No call-out commitment."
                },
                feature: [
                  {
                    categoryName: "What you get",
                    features: [
                      {
                        name: "Photo/video review by WhatsApp"
                      },
                      {
                        name: "Recommended next step"
                      },
                      {
                        name: "Transparent pricing guidance"
                      }
                    ]
                  }
                ],
                restriction: [
                  {
                    categoryName: "Service area",
                    features: [
                      {
                        name: "North-Holland"
                      },
                      {
                        name: "Not based in Amsterdam or Almere"
                      }
                    ]
                  }
                ],
                link: {
                  label: "Get Started"
                }
              }
            ]
          },
          faqSection: {
            headingLine1: "Frequently Asked",
            headingLine2: "Questions",
            cardImagePath: "/FAQ.png",
            items: [
              {
                question: "Do you offer 24/7 emergency callouts?",
                answer: "No. I do not provide 24/7 emergency callouts. I focus on planned residential plumbing and heating jobs with clear communication."
              },
              {
                question: "What are your prices?",
                answer: "General plumbing work is \u20AC95 per hour. Boiler servicing starts from \u20AC145. Parts and materials are charged separately."
              },
              {
                question: "Which areas do you cover?",
                answer: "Main area is Medemblik and nearby towns including Hoorn, Heerhugowaard, Purmerend, and Alkmaar. I am not based in Amsterdam or Almere."
              },
              {
                question: "Which boiler brands and certifications do you work with?",
                answer: "I service common systems including Vaillant, Intergas, Remeha, and ATAG. Relevant work follows CO-vakmanschap and VCA standards where applicable. Basic workmanship guarantee: 30 days on the specific repair labour."
              }
            ],
            cardImageAlt: "English Plumber FAQ",
            supportTitle: "Still have questions?",
            supportDescription: "Send a WhatsApp message with photos and your postcode.",
            supportCtaLabel: "WhatsApp us",
            supportCtaHref: "https://wa.me/31642869931"
          },
          missionSection: {
            mission: {
              imageAlt: "English Plumber on site",
              imagePath: "/photo of family.PNG",
              name: "English Plumber",
              role: "Friendly local plumber in Medemblik",
              headingLine1: "I am on",
              headingLine2: "Mission",
              description: "I started this business to look after my family and my clients, to learn as much as possible and to grow into something meaningful and impactful!",
              ctaLabel: "Chat on WhatsApp",
              ctaHref: "https://wa.me/31642869931"
            },
            gallery: {
              headingLine1: "Seamlessly Connected",
              headingLine2: "to Your Home",
              ctaLabel: "Message on WhatsApp",
              ctaHref: "https://wa.me/31642869931",
              images: [
                {
                  alt: "Boiler service project",
                  imagePath: "/api/media/file/Image%20Container-3.webp"
                },
                {
                  alt: "Plumbing project",
                  imagePath: "/api/media/file/Image%20Container.webp"
                }
              ]
            }
          },
          newsletterSection: {
            backgroundImagePath: "/nice house.jpg",
            backgroundImageAlt: "English Plumber background",
            headingLine1: "Ready for a",
            headingLine2: "warm, worry-free home?",
            description: "Send photos on WhatsApp and get clear advice before small issues become expensive problems.",
            ctaLabel: "WhatsApp Now",
            ctaHref: "https://wa.me/31642869931"
          },
          serviceAreaSection: {
            headingLine1: "North-Holland",
            headingLine2: "Service Area",
            description: "Based in Medemblik, I serve homeowners across North-Holland within practical travel range. Send your postcode and photos on WhatsApp to confirm availability.",
            areas: [
              "Medemblik",
              "Hoorn",
              "Heerhugowaard",
              "Purmerend",
              "Alkmaar",
              "Enkhuizen",
              "Bovenkarspel",
              "Opmeer"
            ],
            excludedNote: "Service area is North-Holland, excluding Amsterdam and Almere.",
            mapEmbedUrl: "https://www.google.com/maps?q=North+Holland,+Netherlands&output=embed",
            mapTitle: "English Plumber service area map",
            ctaLabel: "Check Availability on WhatsApp",
            ctaHref: "https://wa.me/31642869931",
            regionName: "North Holland"
          },
          footerSection: {
            logoAlt: "English Plumber logo",
            logoImagePath: "/English plumber logo light.png",
            subscriptionText: "Need help fast? Send photos and your postcode on WhatsApp for a clear first response.",
            followUsLabel: "Follow us",
            supportTitle: "Help & Support",
            supportLinks: [
              {
                label: "WhatsApp Us",
                href: "https://wa.me/31642869931"
              },
              {
                label: "Free Quote",
                href: "https://wa.me/31642869931"
              },
              {
                label: "Boiler Servicing",
                href: "#boiler-servicing"
              },
              {
                label: "Radiator Services",
                href: "#radiator-services"
              },
              {
                label: "Tap Repairs",
                href: "#tap-repairs"
              }
            ],
            aboutTitle: "About English Plumber",
            aboutLinks: [
              {
                label: "Service Area",
                href: "#service-area"
              },
              {
                label: "CO-vakmanschap + VCA",
                href: "#certifications"
              },
              {
                label: "English + Dutch",
                href: "#language"
              },
              {
                label: "Not based in Amsterdam",
                href: "#service-area"
              }
            ],
            legalDisclaimer: "NO 24/7 EMERGENCY CALLOUT SERVICE. STANDARD RATE IS \u20AC95 PER HOUR FOR GENERAL PLUMBING WORK. BOILER SERVICING STARTS FROM \u20AC145. PARTS AND MATERIALS ARE CHARGED SEPARATELY. FINAL PRICE MAY VARY BY JOB CONDITION. MAIN SERVICE AREA: MEDEMBLIK, HOORN, HEERHUGOWAARD, PURMEREND, AND ALKMAAR. ENGLISH PLUMBER IS NOT BASED IN AMSTERDAM OR ALMERE. CO-VAKMANSCHAP AND VCA STANDARDS ARE FOLLOWED WHERE APPLICABLE. BASIC WORKMANSHIP GUARANTEE: 30 DAYS ON THE SPECIFIC REPAIR LABOUR.",
            cardImageAlt: "English Plumber service card",
            cardDesktopImagePath: "/whatsapp conversation.png",
            cardMobileImagePath: "/images/footer-card.svg",
            appPrompt: "Best way to reach me: WhatsApp with photos.",
            appStoreAlt: "WhatsApp contact",
            appStoreHref: "https://wa.me/31642869931",
            appStoreImagePath: "/socials/appstore.svg",
            googlePlayAlt: "WhatsApp contact",
            googlePlayHref: "https://wa.me/31642869931",
            googlePlayImagePath: "/socials/googleplay.svg",
            copyrightText: "\xA9 2026 English Plumber | All Rights Reserved",
            socialLinks: [
              {
                label: "Website",
                href: "https://englishplumber.nl/"
              },
              {
                label: "WhatsApp",
                href: "https://wa.me/31642869931"
              }
            ]
          },
          header: {
            logoImagePath: "/English plumber logo final.png",
            whatsAppHref: "https://wa.me/31642869931",
            primaryCtaLabel: "WhatsApp",
            secondaryCtaLabel: "Free Quote",
            secondaryCtaHref: "https://wa.me/31642869931",
            navItems: [
              {
                label: "Boiler\nServicing",
                href: "#boiler-servicing"
              },
              {
                label: "Radiator\nServices",
                href: "#radiator-services"
              },
              {
                label: "Tap\nRepairs",
                href: "#tap-repairs"
              },
              {
                label: "Plumbing\nHandyman",
                href: "#plumbing-handyman"
              },
              {
                label: "Pricing",
                href: "#pricing"
              },
              {
                label: "Service\nArea",
                href: "#service-area"
              },
              {
                label: "WhatsApp",
                href: "https://wa.me/31642869931"
              }
            ],
            logoAlt: "English Plumber logo",
            homeAriaLabel: "English Plumber home",
            mainNavAriaLabel: "Main navigation",
            openMenuAriaLabel: "Open menu",
            closeMenuAriaLabel: "Close menu",
            mobileNavAriaLabel: "Mobile navigation",
            mobileMenuTitle: "Menu",
            languageSwitcherAriaLabel: "Switch language"
          }
        },
        nl: {
          primaryArea: "Medemblik + 40 km: Hoorn, Heerhugowaard, Purmerend, Alkmaar (niet Amsterdam/Almere)",
          heroImagePath: "/family photo.PNG",
          seoTitle: "English Plumber | CV-onderhoud & loodgieterswerk in Medemblik",
          seoDescription: "Vriendelijke lokale loodgieter voor expats en Nederlandse huiseigenaren in Medemblik en omliggende plaatsen. CV-onderhoud vanaf \u20AC145, algemeen loodgieterswerk voor \u20AC95/uur. Stuur foto's via WhatsApp +31 6 428 699 31.",
          hero: {
            titleLine1: "Eenmans loodgietersservice",
            titleLine2: "Voor expats en locals",
            description: "CV-onderhoud, radiatorwerk, kraanreparaties en algemeen loodgieters- en kluswerk in heel Noord-Holland vanuit Medemblik.",
            primaryCtaLabel: "Neem contact op",
            imageAlt: "Heroafbeelding van English Plumber"
          },
          biomarkerPanel: {
            titleLine1: "E\xE9n loodgieter",
            titleLine2: "Kernservices geregeld",
            primaryCtaLabel: "Bekijk alle diensten",
            items: [
              {
                label: "CV-onderhoud",
                imagePath: "/boiler emoji.png"
              },
              {
                label: "Radiatorinstallatie",
                imagePath: "/radiator emoji.png"
              },
              {
                label: "Leidingreparaties",
                imagePath: "/pipe repair emoji.png"
              },
              {
                label: "Kraanreparatie",
                imagePath: "/tap emoji.png"
              },
              {
                label: "Kraan vervangen",
                imagePath: "/tap repair emoji.png"
              },
              {
                label: "Kleine lekkages verhelpen",
                imagePath: "/pipe emoji.png"
              },
              {
                label: "Algemeen loodgieters- en kluswerk",
                imagePath: "/plumbing emoji.png"
              },
              {
                label: "Vriendelijke service",
                imagePath: "/friendly emoji.png"
              },
              {
                label: "Gasbesparingsadvies",
                imagePath: "/gas saving emojio.png"
              },
              {
                label: "Hulp in Nederlands + Engels",
                imagePath: "/dutch english emoji.png"
              }
            ]
          },
          featurePanel: {
            cardCtaLabel: "Vraag via WhatsApp",
            cards: [
              {
                alt: "CV-onderhoud",
                titleLine1: "CV",
                titleLine2: "Onderhoud",
                href: "https://wa.me/31642869931",
                imagePath: "/Boiler%20Servicing%20Avatar.png"
              },
              {
                alt: "Radiatorservice",
                titleLine1: "Radiator",
                titleLine2: "Service",
                href: "https://wa.me/31642869931",
                imagePath: "/Radiator Services Avatar.png"
              }
            ],
            headingLine1: "Duidelijke",
            headingLine2: "Offertes",
            description: "Stuur foto's en een korte omschrijving via WhatsApp. Ik bekijk het probleem en geef een duidelijke vervolgstap met prijsindicatie voordat we inplannen.",
            stat1: {
              value: "\u20AC95",
              line1: "Per uur",
              line2: "Algemeen werk"
            },
            stat2: {
              value: "Vanaf",
              line1: "\u20AC145",
              line2: "CV-onderhoud"
            },
            prescriptionCard: {
              alt: "Kraanreparaties",
              titleLine1: "Kraan",
              titleLine2: "Reparaties",
              href: "https://wa.me/31642869931",
              imagePath: "/Tap Repairs Avatar.png",
              ctaLabel: "Vraag via WhatsApp"
            },
            careHeadingLine1: "Dag stress thuis,",
            careHeadingLine2: "hallo betrouwbaar loodgieterswerk",
            careDescription: "Vriendelijke lokale service voor expats en Nederlandse huiseigenaren. Geen afvoeren, geen 24/7 spoedoproepen, alleen duidelijke communicatie en degelijk werk.",
            testimonialAlt: "English Plumber aan het werk",
            badgeTitle: "Gecertificeerd",
            badgeStatus: "CO + VCA"
          },
          trustSection: {
            headingLine1: "Expats en locals vertrouwen",
            headingLine2: "English Plumber",
            memberLabel: "Geverifieerde klant",
            readMoreLabel: "Meer ervaringen",
            videoCards: [
              {
                thumbnailAlt: "CV-onderhoud in Medemblik",
                profileAlt: "Klant in Medemblik",
                thumbnailImagePath: "/images/gallery-1.svg",
                profileImagePath: "/images/avatar-1.svg",
                handle: "@medemblikhome",
                meta: "CV-onderhoud afgerond"
              },
              {
                thumbnailAlt: "Radiatorwerk in Hoorn",
                profileAlt: "Klant in Hoorn",
                thumbnailImagePath: "/images/gallery-2.svg",
                profileImagePath: "/images/avatar-2.svg",
                handle: "@hoornhome",
                meta: "Radiatorupgrade afgerond"
              },
              {
                thumbnailAlt: "Kraanreparatie in Purmerend",
                profileAlt: "Klant in Purmerend",
                thumbnailImagePath: "/images/gallery-1.svg",
                profileImagePath: "/images/avatar-3.svg",
                handle: "@purmerendhome",
                meta: "Kraanreparatie afgerond"
              },
              {
                thumbnailAlt: "Loodgietersklus in Alkmaar",
                profileAlt: "Klant in Alkmaar",
                thumbnailImagePath: "/images/gallery-2.svg",
                profileImagePath: "/images/avatar-4.svg",
                handle: "@alkmaarhome",
                meta: "Kleine loodgietersklus afgerond"
              }
            ],
            textCards: [
              {
                profileAlt: "Profiel lokale huiseigenaar",
                profileImagePath: "/images/avatar-1.svg",
                name: "Lokale huiseigenaar",
                quote: "De reviewsectie wordt bijgewerkt met echte klantreacties. Stuur voorlopig foto's via WhatsApp en ik antwoord met duidelijke vervolgstappen."
              },
              {
                profileAlt: "Profiel expatklant",
                profileImagePath: "/images/avatar-2.svg",
                name: "Expatklant",
                quote: "Ik werk eerst met foto's via WhatsApp, zodat je het probleem snel in het Engels kunt uitleggen en een duidelijke prijsopgave krijgt."
              },
              {
                profileAlt: "Profiel Nederlandse huiseigenaar",
                profileImagePath: "/images/avatar-3.svg",
                name: "Nederlandse huiseigenaar",
                quote: "Tarieven zijn transparant: \u20AC95 per uur voor algemeen werk, CV-onderhoud vanaf \u20AC145."
              },
              {
                profileAlt: "Profiel klant uit servicegebied",
                profileImagePath: "/images/avatar-4.svg",
                name: "Klant uit servicegebied",
                quote: "Het hoofdgebied is Medemblik en omliggende plaatsen, waaronder Hoorn, Heerhugowaard, Purmerend en Alkmaar."
              }
            ]
          },
          commandCenterSection: {
            headingLine1: "Dus",
            headingLine2: "alles in \xE9\xE9n chat.",
            loadingAnimationLabel: "Preview van de WhatsApp-werkwijze...",
            description: "Deel foto's, leg het probleem uit en krijg praktisch advies, een prijsindicatie en een boekingsbevestiging in \xE9\xE9n WhatsApp-gesprek.",
            ctaLabel: "Bekijk diensten",
            appImagePath: "/images/command-center.svg",
            appImageAlt: "WhatsApp-werkwijze van English Plumber"
          },
          ourProcessSection: {
            imagePath: "/images/process.svg",
            imageAlt: "Werkwijze van English Plumber",
            headingLine1: "Hoe het",
            headingLine2: "werkt",
            steps: [
              {
                title: "Stuur foto's via WhatsApp",
                description: "Stuur foto's en een kort bericht met je postcode en probleem."
              },
              {
                title: "Snelle beoordeling",
                description: "Ik bekijk het probleem en vertel je wat de waarschijnlijke oplossing en de volgende stap is."
              },
              {
                title: "Duidelijke offerte",
                description: "Je krijgt transparante prijsinformatie voordat je boekt."
              },
              {
                title: "Afspraak inplannen",
                description: "We plannen een geschikt moment en voeren het werk professioneel uit."
              }
            ]
          },
          choosePathSection: {
            title: "Kies jouw dienst",
            subtitle: "Eenvoudige opties voor Medemblik en omliggende plaatsen. Beste route: stuur foto's via WhatsApp.",
            plans: [
              {
                name: "English Plumber",
                nameStyle: "Per uur",
                tagline: "Algemene loodgieters- en klusondersteuning",
                isPopular: false,
                pricing: {
                  oneTimePrice: "\u20AC95/u",
                  recurringPrice: "\u20AC95/u",
                  oneTimeLabel: "Eenmalig",
                  recurringLabel: "Eenmalig",
                  discountPercentage: "Duidelijk",
                  twiceAnnuallyBillingText: "Minimaal 1 uur. Onderdelen extra.",
                  annuallyBillingText: "Reiskosten worden berekend."
                },
                feature: [
                  {
                    categoryName: "Geschikt voor",
                    features: [
                      {
                        name: "Kraanreparaties en vervangingen"
                      },
                      {
                        name: "Radiatorreparaties"
                      },
                      {
                        name: "Kleine loodgietersklussen in huis"
                      },
                      {
                        name: "Vriendelijke communicatie in het Engels of Nederlands"
                      }
                    ]
                  }
                ],
                restriction: [
                  {
                    categoryName: "Niet inbegrepen",
                    features: [
                      {
                        name: "Geen afvoeren"
                      },
                      {
                        name: "Geen 24/7 spoedoproepen"
                      }
                    ]
                  }
                ],
                link: {
                  label: "Start nu"
                }
              },
              {
                name: "English Plumber",
                nameStyle: "CV-onderhoud",
                tagline: "Jaarlijks onderhoud vanaf \u20AC145",
                isPopular: true,
                pricing: {
                  oneTimePrice: "Vanaf \u20AC145",
                  recurringPrice: "Vanaf \u20AC145",
                  oneTimeLabel: "Eenmalig",
                  recurringLabel: "Eenmalig",
                  discountPercentage: "Vanaf",
                  twiceAnnuallyBillingText: "Onderhoudsbezoek. Onderdelen extra indien nodig.",
                  annuallyBillingText: "Geen abonnement."
                },
                feature: [
                  {
                    categoryName: "CV-merken",
                    features: [
                      {
                        name: "Vaillant"
                      },
                      {
                        name: "Intergas"
                      },
                      {
                        name: "Remeha"
                      },
                      {
                        name: "ATAG"
                      }
                    ]
                  },
                  {
                    categoryName: "Inbegrepen",
                    features: [
                      {
                        name: "Servicebeurt en veiligheidscontrole"
                      },
                      {
                        name: "Duidelijk advies v\xF3\xF3r extra werk"
                      }
                    ]
                  }
                ],
                restriction: [
                  {
                    categoryName: "Let op",
                    features: [
                      {
                        name: "Eindprijs hangt af van de staat van de ketel"
                      }
                    ]
                  }
                ],
                link: {
                  label: "Start nu"
                }
              },
              {
                name: "English Plumber",
                nameStyle: "Gratis offerte",
                tagline: "Stuur eerst foto's",
                isPopular: false,
                pricing: {
                  oneTimePrice: "\u20AC0",
                  recurringPrice: "\u20AC0",
                  oneTimeLabel: "Offerte",
                  recurringLabel: "Offerte",
                  discountPercentage: "Snel",
                  twiceAnnuallyBillingText: "WhatsApp-beoordeling v\xF3\xF3r bezoek.",
                  annuallyBillingText: "Geen verplichting tot een bezoek."
                },
                feature: [
                  {
                    categoryName: "Wat je krijgt",
                    features: [
                      {
                        name: "Foto/video-beoordeling via WhatsApp"
                      },
                      {
                        name: "Aanbevolen volgende stap"
                      },
                      {
                        name: "Transparante prijsindicatie"
                      }
                    ]
                  }
                ],
                restriction: [
                  {
                    categoryName: "Servicegebied",
                    features: [
                      {
                        name: "Noord-Holland"
                      },
                      {
                        name: "Niet gevestigd in Amsterdam of Almere"
                      }
                    ]
                  }
                ],
                link: {
                  label: "Start nu"
                }
              }
            ]
          },
          faqSection: {
            headingLine1: "Veelgestelde",
            headingLine2: "Vragen",
            cardImagePath: "/images/faq-card.svg",
            items: [
              {
                question: "Bied je 24/7 spoedservice aan?",
                answer: "Nee. Ik bied geen 24/7 spoedservice aan. Ik richt me op geplande loodgieters- en verwarmingsklussen voor woningen met duidelijke communicatie."
              },
              {
                question: "Wat zijn je tarieven?",
                answer: "Algemeen loodgieterswerk kost \u20AC95 per uur. CV-onderhoud start vanaf \u20AC145. Onderdelen en materialen worden apart berekend."
              },
              {
                question: "Welke regio's bedien je?",
                answer: "Mijn hoofdgebied is Medemblik en omliggende plaatsen, waaronder Hoorn, Heerhugowaard, Purmerend en Alkmaar. Ik ben niet gevestigd in Amsterdam of Almere."
              },
              {
                question: "Met welke cv-merken en certificeringen werk je?",
                answer: "Ik onderhoud veelvoorkomende systemen, waaronder Vaillant, Intergas, Remeha en ATAG. Relevant werk wordt uitgevoerd volgens CO-vakmanschap- en VCA-normen waar van toepassing. Basale garantie op vakwerk: 30 dagen op het specifieke reparatiewerk."
              }
            ],
            cardImageAlt: "FAQ van English Plumber",
            supportTitle: "Nog vragen?",
            supportDescription: "Stuur een WhatsApp-bericht met foto's en je postcode.",
            supportCtaLabel: "Stuur een WhatsApp",
            supportCtaHref: "https://wa.me/31642869931"
          },
          missionSection: {
            mission: {
              imageAlt: "English Plumber op locatie",
              imagePath: "/api/media/file/nate%20%2B%20fam.png",
              name: "English Plumber",
              role: "Vriendelijke lokale loodgieter in Medemblik",
              headingLine1: "Ik ben op",
              headingLine2: "missie",
              description: "Ik ben dit bedrijf begonnen om voor mijn familie en mijn klanten te zorgen, zoveel mogelijk te leren en uit te groeien tot iets betekenisvols en impactvols!",
              ctaLabel: "Chat via WhatsApp",
              ctaHref: "https://wa.me/31642869931"
            },
            gallery: {
              headingLine1: "Naadloos verbonden",
              headingLine2: "met je woning",
              ctaLabel: "Bericht via WhatsApp",
              ctaHref: "https://wa.me/31642869931",
              images: [
                {
                  alt: "Project CV-onderhoud",
                  imagePath: "/api/media/file/Image%20Container-3.webp"
                },
                {
                  alt: "Loodgietersproject",
                  imagePath: "/api/media/file/Image%20Container.webp"
                }
              ]
            }
          },
          newsletterSection: {
            backgroundImagePath: "/api/media/file/woman%20newsletter.jpg",
            backgroundImageAlt: "English Plumber achtergrond",
            headingLine1: "Klaar voor een",
            headingLine2: "warm, zorgeloos huis?",
            description: "Stuur foto's via WhatsApp en krijg duidelijk advies voordat kleine problemen dure problemen worden.",
            ctaLabel: "Nu WhatsAppen",
            ctaHref: "https://wa.me/31642869931"
          },
          serviceAreaSection: {
            headingLine1: "Noord-Holland",
            headingLine2: "Servicegebied",
            description: "Vanuit Medemblik help ik huiseigenaren in heel Noord-Holland binnen praktische reisafstand. Stuur je postcode en foto's via WhatsApp om beschikbaarheid te controleren.",
            areas: [
              "Medemblik",
              "Hoorn",
              "Heerhugowaard",
              "Purmerend",
              "Alkmaar",
              "Enkhuizen",
              "Bovenkarspel",
              "Opmeer"
            ],
            excludedNote: "Servicegebied is Noord-Holland, met uitzondering van Amsterdam en Almere.",
            mapEmbedUrl: "https://www.google.com/maps?q=North+Holland,+Netherlands&output=embed",
            mapTitle: "Kaart van het servicegebied van English Plumber",
            ctaLabel: "Beschikbaarheid checken via WhatsApp",
            ctaHref: "https://wa.me/31642869931",
            regionName: "Noord-Holland"
          },
          footerSection: {
            logoAlt: "Engels loodgieterslogo",
            logoImagePath: "/images/logo-wordmark-card.png",
            subscriptionText: "Snel hulp nodig? Stuur foto's en je postcode via WhatsApp voor een duidelijke eerste reactie.",
            followUsLabel: "Volg ons",
            supportTitle: "Hulp & ondersteuning",
            supportLinks: [
              {
                label: "Stuur een WhatsApp",
                href: "https://wa.me/31642869931"
              },
              {
                label: "Gratis offerte",
                href: "https://wa.me/31642869931"
              },
              {
                label: "CV-onderhoud",
                href: "#boiler-servicing"
              },
              {
                label: "Radiatorservice",
                href: "#radiator-services"
              },
              {
                label: "Kraanreparaties",
                href: "#tap-repairs"
              }
            ],
            aboutTitle: "Over English Plumber",
            aboutLinks: [
              {
                label: "Servicegebied",
                href: "#service-area"
              },
              {
                label: "CO-vakmanschap + VCA",
                href: "#certifications"
              },
              {
                label: "Engels + Nederlands",
                href: "#language"
              },
              {
                label: "Niet gevestigd in Amsterdam",
                href: "#service-area"
              }
            ],
            legalDisclaimer: "GEEN 24/7 SPOEDSERVICE. STANDAARDTARIEF IS \u20AC95 PER UUR VOOR ALGEMEEN LOODGIETERSWERK. CV-ONDERHOUD START VANAF \u20AC145. ONDERDELEN EN MATERIALEN WORDEN APART BEREKEND. EINDPRIJS KAN VARIEREN OP BASIS VAN DE STAAT VAN DE KLUS. HOOFDSERVICEGEBIED: MEDEMBLIK, HOORN, HEERHUGOWAARD, PURMEREND EN ALKMAAR. ENGLISH PLUMBER IS NIET GEVESTIGD IN AMSTERDAM OF ALMERE. CO-VAKMANSCHAP- EN VCA-NORMEN WORDEN GEVOLGD WAAR VAN TOEPASSING. BASISGARANTIE OP VAKWERK: 30 DAGEN OP HET SPECIFIEKE REPARATIEWERK.",
            cardImageAlt: "English Plumber servicekaart",
            cardDesktopImagePath: "/images/footer-card.svg",
            cardMobileImagePath: "/images/footer-card.svg",
            appPrompt: "Beste manier om mij te bereiken: WhatsApp met foto's.",
            appStoreAlt: "WhatsApp-contact",
            appStoreHref: "https://wa.me/31642869931",
            appStoreImagePath: "/socials/appstore.svg",
            googlePlayAlt: "WhatsApp-contact",
            googlePlayHref: "https://wa.me/31642869931",
            googlePlayImagePath: "/socials/googleplay.svg",
            copyrightText: "\xA9 2026 English Plumber | Alle rechten voorbehouden",
            socialLinks: [
              {
                label: "Website",
                href: "https://englishplumber.nl/"
              },
              {
                label: "WhatsApp",
                href: "https://wa.me/31642869931"
              }
            ]
          },
          header: {
            logoImagePath: "/images/logo-wordmark-transparent.png",
            whatsAppHref: "https://wa.me/31642869931",
            primaryCtaLabel: "WhatsApp",
            secondaryCtaLabel: "Gratis offerte",
            secondaryCtaHref: "https://wa.me/31642869931",
            navItems: [
              {
                label: "CV\nOnderhoud",
                href: "#boiler-servicing"
              },
              {
                label: "Radiator\nService",
                href: "#radiator-services"
              },
              {
                label: "Kraan\nReparaties",
                href: "#tap-repairs"
              },
              {
                label: "Loodgieter\nKluswerk",
                href: "#plumbing-handyman"
              },
              {
                label: "Tarieven",
                href: "#pricing"
              },
              {
                label: "Service\ngebied",
                href: "#service-area"
              },
              {
                label: "WhatsApp",
                href: "https://wa.me/31642869931"
              }
            ],
            logoAlt: "Engels loodgieterslogo",
            homeAriaLabel: "English Plumber startpagina",
            mainNavAriaLabel: "Hoofdnavigatie",
            openMenuAriaLabel: "Menu openen",
            closeMenuAriaLabel: "Menu sluiten",
            mobileNavAriaLabel: "Mobiele navigatie",
            mobileMenuTitle: "Menu",
            languageSwitcherAriaLabel: "Taal wisselen"
          }
        }
      }
    }
  },
  translationAutomation: {
    provider: "deepl",
    sourceLocale: "en",
    targetLocales: [
      "nl"
    ],
    deeplBaseUrl: "https://api-free.deepl.com",
    promoNeedles: [
      "get your discount",
      "your first step toward better health",
      "because proactive health should be accessible",
      "flash sale",
      "10% off",
      "25% off"
    ],
    mediaPathPrefixes: [
      "/_next/image?",
      "/banner/",
      "/reviews/",
      "/footer/",
      "/faq.webp"
    ],
    exactTextReplacements: [],
    regexTextReplacements: []
  }
};

// tina/config.ts
var envBranch = process.env.CF_PAGES_BRANCH || process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || process.env.GITHUB_REF_NAME || process.env.GITHUB_HEAD_REF;
var branch = (envBranch || "main").trim();
var clientId = process.env.NEXT_PUBLIC_TINA_CLIENT_ID?.trim() || null;
var token = process.env.TINA_TOKEN?.trim() || null;
var isLocalTina = process.env.TINA_PUBLIC_IS_LOCAL === "true";
var previewOriginEnv = process.env.TINA_PREVIEW_ORIGIN?.trim() || process.env.CF_PAGES_URL?.trim() || process.env.PUBLIC_SITE_URL?.trim() || process.env.SITE_URL?.trim() || "";
var previewOrigin = isLocalTina ? "http://localhost:4321" : previewOriginEnv;
var siteContent = site_content_default;
var explicitLabels = {
  en: "English",
  nl: "Dutch",
  siteSettings: "Site Settings",
  deeplBaseUrl: "DeepL Base URL"
};
var toLabel = (name) => explicitLabels[name] ?? name.replace(/([a-z0-9])([A-Z])/g, "$1 $2").replace(/[-_]/g, " ").replace(/\s+/g, " ").trim().replace(/^./, (char) => char.toUpperCase());
var isUrlValue = (value) => {
  if (value.startsWith("#")) return true;
  if (value.startsWith("/")) return true;
  if (value.startsWith("./") || value.startsWith("../")) return true;
  if (/^(https?:\/\/|mailto:|tel:)/i.test(value)) return true;
  try {
    new URL(value);
    return true;
  } catch {
    return false;
  }
};
var isLikelyUrlField = (name) => /(?:href|url|origin)$/i.test(name);
var isLikelyImageField = (name) => {
  const lower = name.toLowerCase();
  if (lower.endsWith("imagealt") || lower.endsWith("alt")) return false;
  return lower === "ogimage" || lower === "heroimagepath" || lower.endsWith("image") || lower.endsWith("imagepath");
};
var isAltField = (name) => /alt$/i.test(name);
var stringValidator = (label, required = false) => (value) => {
  const text = typeof value === "string" ? value.trim() : "";
  if (required && !text) {
    return `${label} is required.`;
  }
};
var urlValidator = (label, required = true) => (value) => {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text) {
    if (required) return `${label} is required.`;
    return;
  }
  if (!isUrlValue(text)) {
    return `${label} must be an absolute URL, relative path, or hash anchor.`;
  }
};
var imageValidator = (label, required = true) => (value) => {
  const text = typeof value === "string" ? value.trim() : "";
  if (!text && required) {
    return `${label} is required.`;
  }
};
var createStringField = (name, value, options = {}) => {
  const label = toLabel(name);
  const isTextarea = options.isTextarea ?? (value.includes("\n") || value.length > 140);
  return {
    type: "string",
    name,
    label,
    ui: {
      ...isTextarea ? { component: "textarea" } : {},
      validate: stringValidator(label, options.required ?? false)
    }
  };
};
var createUrlField = (name, required = true) => {
  const label = toLabel(name);
  return {
    type: "string",
    name,
    label,
    ui: {
      component: "text",
      validate: urlValidator(label, required)
    }
  };
};
var createImageField = (name, required = true) => {
  const label = toLabel(name);
  return {
    type: "image",
    name,
    label,
    ui: {
      validate: imageValidator(label, required)
    }
  };
};
var createAltField = (name, value) => createStringField(name, value, {
  required: true,
  isTextarea: false
});
var withList = (field) => ({
  ...field,
  list: true
});
var buildExplicitField = (name, value) => {
  if (typeof value === "string") {
    if (isLikelyImageField(name)) {
      return createImageField(name, true);
    }
    if (isLikelyUrlField(name)) {
      return createUrlField(name, true);
    }
    if (isAltField(name)) {
      return createAltField(name, value);
    }
    return createStringField(name, value);
  }
  if (typeof value === "number") {
    return {
      type: "number",
      name,
      label: toLabel(name)
    };
  }
  if (typeof value === "boolean") {
    return {
      type: "boolean",
      name,
      label: toLabel(name)
    };
  }
  if (Array.isArray(value)) {
    const first = value.find((entry) => entry !== null && entry !== void 0);
    if (typeof first === "string") {
      if (isLikelyImageField(name)) {
        return withList(createImageField(name, true));
      }
      if (isLikelyUrlField(name)) {
        return withList(createUrlField(name, true));
      }
      if (isAltField(name)) {
        return withList(createAltField(name, first));
      }
      return withList(createStringField(name, first));
    }
    if (typeof first === "number") {
      return {
        type: "number",
        name,
        label: toLabel(name),
        list: true
      };
    }
    if (typeof first === "boolean") {
      return {
        type: "boolean",
        name,
        label: toLabel(name),
        list: true
      };
    }
    if (first && typeof first === "object" && !Array.isArray(first)) {
      return {
        type: "object",
        name,
        label: toLabel(name),
        list: true,
        fields: buildObjectFields(first)
      };
    }
    return {
      type: "string",
      name,
      label: toLabel(name),
      list: true
    };
  }
  if (value && typeof value === "object") {
    return {
      type: "object",
      name,
      label: toLabel(name),
      fields: buildObjectFields(value)
    };
  }
  return createStringField(name, "");
};
var buildObjectFields = (value) => Object.entries(value).map(([name, fieldValue]) => buildExplicitField(name, fieldValue));
var config_default = defineConfig({
  branch,
  clientId,
  token,
  ui: previewOrigin ? {
    previewUrl: () => ({ url: previewOrigin })
  } : void 0,
  build: {
    outputFolder: "admin",
    publicFolder: "public"
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public"
    }
  },
  schema: {
    collections: [
      {
        name: "siteContent",
        label: "Site Content",
        path: "content/tina",
        format: "json",
        match: {
          include: "site-content"
        },
        ui: {
          router: () => "/",
          allowedActions: {
            create: false,
            delete: false
          }
        },
        fields: buildObjectFields(siteContent)
      }
    ]
  }
});
export {
  config_default as default
};
