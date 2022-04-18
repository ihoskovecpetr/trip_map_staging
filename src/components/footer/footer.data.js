const obch_info_path = "/business-info";
const about_path = "/about";

export const sectionTags = {
  GDPR: "gdpr",
  Objection: "reklamace",
  ToSale: "obchodni_podminky",
  About: "o_nas",
  Contact: "kontakt",
};

export const sectionObjectsObchInfo = [
  { name: "Podmínky ochrany osobních údajů (GDPR)", tag: sectionTags.GDPR },
  { name: "Reklamace / odstoupení od smlouvy", tag: sectionTags.Objection },
  { name: "Obchodní podmínky", tag: sectionTags.ToSale },
];

export const sectionObjectsAbout = [
  { name: "O nás", tag: sectionTags.About },
  { name: "Kontakt", tag: sectionTags.Contact },
];

export const footerObj = [
  {
    header: "businessInformation.title",
    pathHeader: `${obch_info_path}?section=${sectionTags.GDPR}`,
    items: [
      {
        path: `${obch_info_path}?section=${sectionTags.GDPR}`,
        label: "businessInformation.subtitle_1",
      },
      {
        path: `${obch_info_path}?section=${sectionTags.Objection}`,
        label: "businessInformation.subtitle_2",
      },
      {
        path: `${obch_info_path}?section=${sectionTags.ToSale}`,
        label: "businessInformation.subtitle_3",
      },
      // {
      //   path: "/",
      //   label: "Site Map",
      // },
      // {
      //   path: "/",
      //   label: "Store Hours",
      // },
    ],
  },
  {
    header: "about.title",
    pathHeader: `${about_path}?section=${sectionTags.About}`,
    items: [
      {
        path: `${about_path}?section=${sectionTags.About}`,
        label: "about.subtitle_about",
      },
      {
        path: `${about_path}?section=${sectionTags.Contact}`,
        label: "about.subtitle_contact",
      },
      // {
      //   path: "/",
      //   label: "Zákaznický Servis",
      // },
      // {
      //   path: "/",
      //   label: "Copyright",
      // },
      // {
      //   path: "/",
      //   label: "Popular Campaign",
      // },
    ],
  },
  // {
  //   header: "My Account",
  //   items: [
  //     {
  //       path: "/",
  //       label: "Press inquiries",
  //     },
  //     {
  //       path: "/",
  //       label: "Social media ",
  //     },
  //     {
  //       path: "/",
  //       label: "directories",
  //     },
  //     {
  //       path: "/",
  //       label: "Images & B-roll",
  //     },
  //     {
  //       path: "/",
  //       label: "Permissions",
  //     },
  //   ],
  // },
  // {
  //   header: "Bezpečnostní pravidla",
  //   items: [
  //     {
  //       path: "/",
  //       label: "Bezpečnost aplikace",
  //     },
  //     // {
  //     //   path: "/",
  //     //   label: "Software principles",
  //     // },
  //     {
  //       path: "/",
  //       label: "GDPR",
  //     },
  //     {
  //       path: "/",
  //       label: "Bezpečné platby",
  //     },
  //   ],
  // },
];
