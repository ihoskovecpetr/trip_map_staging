const obch_info_path = "/obchodni-informace";
const about_path = "/o-nas";

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
    header: "Obchodní informace",
    pathHeader: `${obch_info_path}?section=${sectionTags.GDPR}`,
    items: [
      {
        path: `${obch_info_path}?section=${sectionTags.GDPR}`,
        label: "Podmínky ochrany osobních údajů",
      },
      {
        path: `${obch_info_path}?section=${sectionTags.Objection}`,
        label: "Reklamace / odstoupení od smlouvy",
      },
      {
        path: `${obch_info_path}?section=${sectionTags.ToSale}`,
        label: "Obchodní podmínky",
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
    header: "O nás",
    pathHeader: `${about_path}?section=${sectionTags.About}`,
    items: [
      {
        path: `${about_path}?section=${sectionTags.About}`,
        label: "O nás",
      },
      {
        path: `${about_path}?section=${sectionTags.Contact}`,
        label: "Kontaktujte nás",
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
