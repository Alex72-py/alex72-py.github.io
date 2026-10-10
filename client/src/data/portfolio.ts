/** Owner content: edit, commit to main, and GitHub Actions publishes the change. */
export type CommissionStatus = "open" | "closed";
export interface GalleryArtwork {
  id: string;
  title: string;
  character: string;
  shortName: string;
  series: string;
  image: string;
  fullImage: string;
  width: number;
  height: number;
  alt: string;
}

export const portfolio = {
  artist: {
    name: "Alex",
    title: "Traditional anime artist",
    email: "aquibmasud7+commisions@gmail.com",
    discord: "zyxelan",
    paymentMethods: ["USDC", "USDT"],
  },
  siteUrl: "https://alex72-py.github.io",

  // Change to "closed" to pause requests across the entire site.
  commissionStatus: "open" as CommissionStatus,
  statusCopy: {
    open: {
      label: "Commissions open",
      shortLabel: "Open",
      heading: "Your favorites,",
      headingAccent: "in my ink.",
      description:
        "I’m Alex. I draw anime fanart by hand, using ink and Ohuhu alcohol markers. Here’s a little of what’s in my sketchbook.",
      cta: "Request a commission",
      contactHeading: "Who’s on your mind?",
      contactDescription:
        "Send me the character, a reference, and the finish you’d like. I’ll confirm the price and discuss timing before we start.",
      note: "I work around life, with a flexible schedule. Let’s discuss timing before I begin.",
    },
    closed: {
      label: "Commissions closed",
      shortLabel: "Closed",
      heading: "Still drawing,",
      headingAccent: "between pages.",
      description:
        "I’m Alex. I draw anime fanart with ink and Ohuhu alcohol markers. New commissions are paused, but my sketchbook is still here to browse.",
      cta: "Ask about availability",
      contactHeading: "For another page.",
      contactDescription:
        "I’m not accepting new commissions right now. You can still message me about future availability; I’ll update the status here when requests reopen.",
      note: "New requests are paused. My gallery and commission details are here for future reference.",
    },
  },
  // IDs keep the hero stable when the gallery is reordered or a piece is removed.
  featuredArtworkIds: ["ai", "aqua"],
  gallery: [
    {
      id: "ai",
      title: "A promise in stars",
      character: "Ai Hoshino",
      shortName: "Ai Hoshino",
      series: "Oshi no Ko",
      image: "/artworks/ai-hoshino-marker_d470525b.webp",
      fullImage: "/artworks/ai-hoshino-marker_d470525b.png",
      width: 812,
      height: 1400,
      alt: "Alex’s traditional marker drawing of Ai Hoshino, with purple hair, star details, and pink costume accents.",
    },
    {
      id: "alya",
      title: "Hidden words",
      character: "Alisa Mikhailovna Kujou (Alya)",
      shortName: "Alya Kujou",
      series: "Alya Sometimes Hides Her Feelings in Russian",
      image: "/artworks/alya-kujou-marker_10b61ea6.webp",
      fullImage: "/artworks/alya-kujou-marker_10b61ea6.jpg",
      width: 586,
      height: 869,
      alt: "Alex’s traditional marker drawing of Alya seated in a school uniform, with silver hair and a pink ribbon.",
    },
    {
      id: "aqua",
      title: "Aqua, in focus",
      character: "Aquamarine Hoshino",
      shortName: "Aqua Hoshino",
      series: "Oshi no Ko",
      image: "/artworks/aqua-hoshino-marker_1cc470db.webp",
      fullImage: "/artworks/aqua-hoshino-marker_1cc470db.jpg",
      width: 876,
      height: 1232,
      alt: "Alex’s traditional marker drawing of Aquamarine Hoshino in a blue stage uniform, with starry eyes.",
    },
    {
      id: "marin",
      title: "Soft light",
      character: "Marin Kitagawa",
      shortName: "Marin Kitagawa",
      series: "My Dress-Up Darling",
      image: "/artworks/marin-kitagawa-marker_47b2d5f7.webp",
      fullImage: "/artworks/marin-kitagawa-marker_47b2d5f7.jpg",
      width: 617,
      height: 872,
      alt: "Alex’s traditional marker drawing of Marin Kitagawa with long blonde hair and a black bow.",
    },
    {
      id: "zero-two",
      title: "Red signal",
      character: "Zero Two",
      shortName: "Zero Two",
      series: "DARLING in the FRANXX",
      image: "/artworks/zero-two-marker_61db09d9.webp",
      fullImage: "/artworks/zero-two-marker_61db09d9.jpg",
      width: 633,
      height: 903,
      alt: "Alex’s traditional marker drawing of Zero Two with pink hair and red uniform details.",
    },
  ] as GalleryArtwork[],
  pricing: [
    {
      name: "Sketch",
      price: "$5",
      description: "Clean sketchwork with simple shading.",
      features: ["Clean sketch", "Simple shading", "High-resolution image"],
    },
    {
      name: "Line Art",
      price: "$10",
      description: "Clean linework with a marker or ink finish.",
      features: [
        "Clean line art",
        "Marker / ink finish",
        "High-resolution image",
      ],
    },
    {
      name: "Full Color",
      price: "From $15",
      description: "Layered Ohuhu marker color, like the pieces above.",
      features: [
        "Ohuhu alcohol markers",
        "Full-color rendering",
        "High-resolution image",
      ],
    },
  ],
  pricingNote:
    "The final quote depends on complexity, the number of characters, and the background. I’ll confirm it with you before starting.",
  drawList: [
    "Anime fanart",
    "Portraits",
    "Half body",
    "Full body",
    "Simple backgrounds",
  ],
  process: [
    {
      title: "Send the idea",
      description:
        "Share the character, clear references, preferred finish, and any background details. We’ll discuss the quote and estimated timing.",
    },
    {
      title: "Approve the sketch",
      description:
        "Pay 50% upfront in USDC or USDT, then I’ll start. I’ll send a sketch so we can agree on the direction before the final artwork.",
    },
    {
      title: "I draw the piece",
      description:
        "I work by hand, around a flexible schedule. If I need more time than estimated, I’ll send you an update.",
    },
    {
      title: "Preview, then delivery",
      description:
        "I’ll send a watermarked preview. After the remaining payment, you’ll receive the final high-resolution image through our agreed message channel.",
    },
  ],
  about: {
    heading: "A person behind the page.",
    description:
      "I enjoy drawing the characters I love: expressive faces, clean lines, and layers of marker color. These are traditional drawings, made on paper by hand.",
    schedule:
      "This is my personal freelance work. I fit drawing around life, so timing is flexible rather than a fixed turnaround. We’ll talk about the estimate before I start, and I’ll let you know if it changes.",
    delivery:
      "Commissions are delivered as a high-resolution image. Please don’t assume physical shipping is included.",
  },
  inquiry: {
    subject: "Anime fanart commission",
    template:
      "Hi Alex! I’d like to ask about an anime fanart commission.\n\nCharacter and series:\nReference links:\nPreferred finish (Sketch / Line Art / Full Color):\nPose / framing / background:\nBudget:\nTiming or other notes:\n\nI understand your schedule is flexible and would like to discuss an estimated timeline.",
  },
  terms: [
    {
      title: "Timing is flexible",
      content:
        "I’ll give you an estimated timeline before I start, but my timing is flexible and real life can affect it. If I need more time, I’ll send you an update. Please reply to questions and sketch-approval messages so your commission can keep moving.",
    },
    {
      title: "Payment",
      content:
        "I’ll confirm the final price before I begin. A 50% upfront payment is required to start your commission, and the remaining payment is due after I send the watermarked preview. I’ll send the final high-resolution image after the full payment is complete. I accept USDC and USDT.",
    },
    {
      title: "References & changes",
      content:
        "Please send clear references and important details before I start. I’ll send a sketch for approval first. Small changes are okay during the sketch stage, but major changes to the character, pose, composition, or request after approval may need an extra fee or may not be possible.",
    },
    {
      title: "Cancellations",
      content:
        "If you need to cancel, please tell me as soon as possible. Once I have started sketching or working on the final piece, the upfront payment is not refundable because it covers the time already spent. If I need to cancel a commission that I cannot complete, I’ll refund the amount paid for work I have not finished.",
    },
    {
      title: "Preview & final delivery",
      content:
        "I’ll send a watermarked preview before the final payment. After the remaining balance is paid, I’ll deliver the high-resolution file through our agreed direct-message channel. Please save a backup of your final image after delivery.",
    },
    {
      title: "Personal use, sharing & credit",
      content:
        "Your commission is for personal use. Please do not redistribute, resell, upload it as a free-to-use resource, use it for commercial products, claim it as your own work, or remove my credit. If you post or repost the finished artwork, please credit the artist: Alex.",
    },
    {
      title: "Artist credit & portfolio use",
      content:
        "I keep the rights to my own artwork; the anime characters belong to their respective owners. I may share finished commissions in my portfolio or on my social accounts unless you ask for privacy before I begin. I will not share private commission details beyond what is needed to show the finished art.",
    },
    {
      title: "Keep it respectful",
      content:
        "Please keep messages and requests respectful. If there is a problem with your commission or payment, message me first and I’ll do my best to sort it out with you.",
    },
  ],
  socialLinks: [
    {
      label: "YouTube",
      handle: "AnimeSenpaiArt7",
      url: "https://www.youtube.com/@AnimeSenpaiArt7",
    },
    {
      label: "GitHub",
      handle: "Alex72-py",
      url: "https://github.com/Alex72-py",
    },
    {
      label: "Reddit",
      handle: "Just-Distance-2925",
      url: "https://www.reddit.com/user/Just-Distance-2925",
    },
    { label: "Instagram", handle: "", url: "" },
    { label: "X / Twitter", handle: "", url: "" },
  ],
} as const;
