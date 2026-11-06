// Routes, prices and doctors. Every price: veon/research/prices-site.md (fact C-106). Doctors: fact C-005.
const NB = " ";
const money = (n: number) => String(n).replace(/\B(?=(\d{3})+$)/g, NB);
export const uah = (n: number) => `${money(n)}${NB}грн`;
export const from = (n: number) => `від${NB}${uah(n)}`;

export interface Line { name: string; price: string; note?: string; }
export interface Route { id: string; title: string; steps: Line[][]; stepNote?: string; doctors?: string; }

export const routes: Route[] = [
  {
    id: "pain",
    title: "Болить або руйнується зуб",
    steps: [
      [{ name: "Консультація", price: uah(350) }],
      [{ name: "Зняття гострого болю", price: from(1100) }],
      [
        { name: "Лікування карієсу", price: from(2000) },
        { name: "Лікування кореневого каналу", price: from(3000) },
      ],
    ],
    stepNote: "Також лікування під мікроскопом.",
    doctors: "Брезден Вікторія, терапевт; Коваль Владислав, ендодонтист",
  },
  {
    id: "implant",
    title: "Немає зуба",
    steps: [
      [{ name: "Консультація + КТ", price: uah(1450) }],
      [{ name: "Кісткова пластика, якщо потрібна", price: from(6500) }],
      [
        { name: "Імплант Neodent", price: uah(21000) },
        { name: "Імплант Megagen AnyRidge", price: uah(25300) },
        { name: "Імплант Straumann", price: uah(33000) },
        { name: "Імплант Straumann Active", price: uah(38500) },
      ],
      [
        { name: "Коронка керамічна", price: from(12600) },
        { name: "Коронка цирконієва преміум", price: from(12700) },
      ],
    ],
    doctors: "Гриневич Андрій, хірург-імплантолог; Чех Богдан, ортопед",
  },
  {
    id: "fear",
    title: "Боюся лікування",
    steps: [
      [{ name: "Консультація", price: uah(350) }],
      [
        { name: "Закис азоту, 15 хв", price: uah(600) },
        { name: "Седація інгаляційна, 30 хв", price: uah(2000) },
        { name: "Седація інгаляційна, перша година", price: uah(4000) },
      ],
      [{ name: "Нагляд анестезіолога, 1 год", price: uah(600) }],
    ],
  },
  {
    id: "child",
    title: "Лікування для дитини",
    steps: [
      [{ name: "Консультація дитячого стоматолога", price: uah(550) }],
      [{ name: "Профілактична гігієна", price: uah(1000) }],
      [
        { name: "Герметизація фісур", price: from(750) },
        { name: "Відновлення молочного зуба", price: from(1950) },
      ],
    ],
    doctors: "Бедрань Оксана, дитячий стоматолог",
  },
  {
    id: "smile",
    title: "Хочу змінити усмішку",
    steps: [
      [{ name: "Консультація ортодонта", price: uah(700) }],
      [
        { name: "Відбілювання Zoom", price: uah(12100) },
        { name: "Zoom професійне + домашнє", price: uah(16500) },
        { name: "Композитні вініри", price: uah(8800) },
        { name: "Вінір керамічний", price: from(15400) },
        { name: "Металева брекет-система", price: uah(18700) },
        { name: "Візуалізація на елайнерах", price: uah(2800) },
      ],
    ],
  },
  {
    id: "gums",
    title: "Ясна та гігієна",
    steps: [
      [{ name: "Консультація пародонтолога", price: uah(800) }],
      [
        { name: "Професійна чистка", price: from(1650) },
        { name: "Чистка під мікроскопом", price: from(2000) },
      ],
      [{ name: "Кюретаж, за зуб", price: from(600) }],
    ],
    doctors: "Полікарпова Соломія, пародонтолог",
  },
];

export interface PriceGroup { id: string; title: string; rows: Line[]; }
const forOurPatients = "для наших пацієнтів";

export const priceGroups: PriceGroup[] = [
  {
    id: "diagnostics",
    title: "Консультації та діагностика",
    rows: [
      { name: "Консультація", price: uah(350) },
      { name: "Онлайн-консультація", price: uah(350) },
      { name: "Консультація + КТ", price: uah(1450) },
      { name: "КТ двох щелеп", price: uah(660), note: forOurPatients },
      { name: "Панорамний знімок", price: uah(400), note: forOurPatients },
    ],
  },
  {
    id: "treatment",
    title: "Лікування",
    rows: [
      { name: "Зняття гострого болю", price: from(1100) },
      { name: "Лікування карієсу", price: from(2000) },
      { name: "Кореневий канал", price: from(3000) },
      { name: "Видалення зуба", price: uah(1900) },
    ],
  },
  {
    id: "implants",
    title: "Імплантація",
    rows: [
      { name: "Neodent", price: uah(21000) },
      { name: "Megagen AnyRidge", price: uah(25300) },
      { name: "Straumann", price: uah(33000) },
      { name: "Straumann Active", price: uah(38500) },
      { name: "Кісткова пластика", price: from(6500) },
    ],
  },
  {
    id: "aesthetics",
    title: "Естетика та ортодонтія",
    rows: [
      { name: "Відбілювання Zoom", price: uah(12100) },
      { name: "Zoom професійне + домашнє", price: uah(16500) },
      { name: "Вінір керамічний", price: from(15400) },
      { name: "Металева брекет-система", price: uah(18700) },
    ],
  },
  {
    id: "hygiene",
    title: "Гігієна",
    rows: [
      { name: "Професійна чистка", price: from(1650) },
      { name: "Чистка під мікроскопом", price: from(2000) },
      { name: "Консультація пародонтолога", price: uah(800) },
    ],
  },
  {
    id: "kids",
    title: "Дітям",
    rows: [
      { name: "Консультація", price: uah(550) },
      { name: "Профілактична гігієна", price: uah(1000) },
      { name: "Герметизація фісур", price: from(750) },
      { name: "Відновлення молочного зуба", price: from(1950) },
    ],
  },
  {
    id: "sedation",
    title: "Седація",
    rows: [
      { name: "Закис азоту, 15 хв", price: uah(600) },
      { name: "Інгаляційна, 30 хв", price: uah(2000) },
      { name: "Інгаляційна, перша година", price: uah(4000) },
    ],
  },
];

export const doctors = [
  { file: "hrynevych", surname: "Гриневич", name: "Андрій Ярославович", role: "Хірург-імплантолог" },
  { file: "brezden", surname: "Брезден", name: "Вікторія Михайлівна", role: "Терапевт" },
  { file: "chekh", surname: "Чех", name: "Богдан Ігорович", role: "Ортопед" },
  { file: "polikarpova", surname: "Полікарпова", name: "Соломія Андріївна", role: "Пародонтолог" },
  { file: "koval", surname: "Коваль", name: "Владислав Сергійович", role: "Ендодонтист" },
  { file: "bedran", surname: "Бедрань", name: "Оксана Юріївна", role: "Дитячий стоматолог" },
];
