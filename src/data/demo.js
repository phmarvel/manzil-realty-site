// All demo content for the Manzil Realty landing page, in one place.
// Swap this file (or its values) to put in real content. Everything here is demo.
// Structure: photos, listings, neighbourhoods, agents (data, bilingual) and content.{ar,en} (UI strings).

const U = (id, w, h) =>
  `https://images.unsplash.com/photo-${id}?w=${w}&h=${h}&fit=crop&q=70&auto=format`;

// Photos: Unsplash (free licence, `id`) and Wikimedia Commons (CC BY / CC BY-SA, `commons`, copied to assets/img) with credits shown in the footer.
// Commons photos show real Jeddah (Al-Balad, the waterfront and the district tiles); Unsplash photos show homes and interiors.
export const photos = {
  hero: { commons: { file: 'old-jeddah-roshan-white.jpg', author: { ar: 'xiquinhosilva', en: 'xiquinhosilva' }, licence: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Old_Jeddah_-_55361084747.jpg' }, alt: { ar: 'مبنى مبيّض بالجير بصناديق رواشين خشبية منحوتة في البلد بجدة', en: 'Lime-plastered building with carved timber roshan boxes in Al-Balad, Jeddah' } },
  p1: { id: '1600596542815-ffad4c1539a9', alt: { ar: 'فيلا بيضاء من طابقين ومسبح أمامها', en: 'Two-storey white villa with a pool in front' } },
  p2: { id: '1600607687939-ce8a6c25118c', alt: { ar: 'صالة معيشة واسعة بأريكة بيضاء وجدار خشبي', en: 'Spacious living room with a white sofa and a timber wall' } },
  p3: { id: '1580587771525-78b9dba3b914', alt: { ar: 'منزل حديث بمسبح ممتد وأسطح بيضاء', en: 'Modern townhouse with a long pool and white terraces' } },
  p4: { id: '1545324418-cc1a3fa10c00', alt: { ar: 'واجهة عمارة سكنية حديثة بشرفات زجاجية تحت سماء صافية', en: 'Modern residential block with glass balconies under a clear sky' } },
  p5: { id: '1613490493576-7fde63acd811', alt: { ar: 'فيلا بسقف خشبي ومسبح يعكس الضوء', en: 'Villa with a timber roof and a pool catching the light' } },
  p6: { commons: { file: 'old-jeddah-street.jpg', author: { ar: 'xiquinhosilva', en: 'xiquinhosilva' }, licence: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Old_Jeddah_-_55362436320.jpg' }, alt: { ar: 'شارع في البلد ببناء أبيض ونخلة ورواشين داكنة', en: 'Street in Al-Balad with a white building, a palm and dark timber roshans' } },
  p7: { commons: { file: 'jeddah-waterfront-evening.jpg', author: { ar: 'وكالة الأنباء السعودية', en: 'Saudi Press Agency' }, licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:%D9%88%D8%A7%D8%AC%D9%87%D8%A9_%D9%85%D8%AF%D9%8A%D9%86%D8%A9_%D8%AC%D8%AF%D8%A9_%D8%A7%D9%84%D8%A8%D8%AD%D8%B1%D9%8A%D8%A9_%D9%81%D9%8A_%D8%A7%D9%84%D9%85%D8%B3%D8%A7%D8%A1.jpg' }, alt: { ar: 'واجهة جدة البحرية في المساء', en: 'Jeddah waterfront in the evening' } },
  p8: { id: '1582268611958-ebfd161ef9cf', alt: { ar: 'فيلا بسقف ممتد ومسبح وأسطح للجلوس', en: 'Villa with a deep roof, a pool and a seating terrace' } },
  p9: { id: '1493809842364-78817add7ffb', alt: { ar: 'غرفة جلوس بنوافذ كبيرة وأرضية خشبية', en: 'Sitting room with large windows and a timber floor' } },
  p10: { commons: { file: 'old-jeddah-corner-building.jpg', author: { ar: 'xiquinhosilva', en: 'xiquinhosilva' }, licence: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Old_Jeddah_-_55362214124.jpg' }, alt: { ar: 'مبنى من أربعة طوابق بنوافذ خشبية مقوسة عند ناصية في البلد', en: 'Four-storey corner building with arched timber windows in Al-Balad' } },
  p11: { commons: { file: 'old-jeddah-restored.jpg', author: { ar: 'xiquinhosilva', en: 'xiquinhosilva' }, licence: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Old_Jeddah_-_55362217344.jpg' }, alt: { ar: 'مبانٍ مرمَّمة في حي البلد التاريخي في وضح النهار', en: 'Restored buildings in the historic Al-Balad district in daylight' } },
  p12: { id: '1556912172-45b7abe8b7e1', alt: { ar: 'مطبخ أبيض مضيء بجزيرة خشبية وكراسي', en: 'Bright white kitchen with a timber island and stools' } },
  n1: { commons: { file: 'old-jeddah-roshan-balconies.jpg', author: { ar: 'xiquinhosilva', en: 'xiquinhosilva' }, licence: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Old_Jeddah_-_55362178648.jpg' }, alt: { ar: 'واجهة بيت قديم بشرفات ورواشين خشبية متراصة في جدة التاريخية', en: 'Old house facade stacked with timber roshan balconies in historic Jeddah' } },
  n2: { commons: { file: 'alrawdah-street.jpg', author: { ar: 'Mohammad Waqas Ahmad', en: 'Mohammad Waqas Ahmad' }, licence: 'CC BY 3.0', page: 'https://commons.wikimedia.org/wiki/File:Rawdah_District_-_panoramio.jpg' }, alt: { ar: 'شارع في حي الروضة بجدة بنخيل ومبانٍ إدارية', en: 'Street in Al-Rawdah, Jeddah, with palms and office buildings' } },
  n3: { commons: { file: 'jeddah-waterfront-coast.jpg', author: { ar: 'مصوّر غير معروف', en: 'Unknown author' }, licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Jeddah_Waterfront,_Western_Saudi_Arabia_(2026).jpg' }, alt: { ar: 'ساحل جدة على البحر الأحمر وطريق الواجهة البحرية وأبراج المدينة', en: 'Jeddah’s Red Sea coast, the waterfront road and the city towers' } },
  n4: { commons: { file: 'obhur-creek.jpg', author: { ar: 'Tahir mq', en: 'Tahir mq' }, licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Obhur_Jeddah_3.jpg' }, alt: { ar: 'قناة أبحر في جدة وفي وسطها منحوتات على شكل ذيول حيتان', en: 'Obhur creek in Jeddah with whale-tail sculptures in the water' } },
  n5: { commons: { file: 'tahlia-galleria.jpg', author: { ar: 'Ahmed Abdulbasit', en: 'Ahmed Abdulbasit' }, licence: 'CC BY 4.0', page: 'https://commons.wikimedia.org/wiki/File:Jeddah_galleria.jpg' }, alt: { ar: 'مبنى «غاليريا» بقوسه الكبير ونخيله على شارع التحلية في جدة', en: 'The Galleria building with its large arch and palms on Tahlia Street, Jeddah' } },
};

// Photo URL for a given display size. Commons photos are self-hosted in assets/img (960px wide copies, credited in the footer).
export const photoUrl = (key, w, h) => {
  const ph = photos[key];
  return ph.commons ? `assets/img/${ph.commons.file}` : U(ph.id, w, h);
};

export const neighbourhoods = [
  { id: 'albalad', photo: 'n1', name: { ar: 'البلد', en: 'Al-Balad' }, line: { ar: 'المدينة التاريخية: بيوت مرجانية ورواشين خشبية، وشقق بإيجار سنوي.', en: 'The historic quarter: coral-stone houses and timber roshans, mostly annual rentals.' } },
  { id: 'alshati', photo: 'n3', name: { ar: 'الشاطئ', en: 'Al-Shati' }, line: { ar: 'قريب من الكورنيش، فلل وشقق بإطلالة على البحر.', en: 'Close to the Corniche, with villas and sea-facing apartments.' } },
  { id: 'alrawdah', photo: 'n2', name: { ar: 'الروضة', en: 'Al-Rawdah' }, line: { ar: 'حيّ سكني هادئ بمدارس وحدائق قريبة.', en: 'A quiet residential district with schools and parks nearby.' } },
  { id: 'obhur', photo: 'n4', name: { ar: 'أبحر', en: 'Obhur' }, line: { ar: 'مساحات أكبر ومنازل بمسابح، شمال المدينة.', en: 'Larger plots and homes with pools, north of the city.' } },
  { id: 'alandalus', photo: 'n5', name: { ar: 'الأندلس', en: 'Al-Andalus' }, line: { ar: 'شقق قريبة من شارع التحلية والمكاتب والمقاهي.', en: 'Apartments close to Tahlia Street, offices and cafés.' } },
];

// price: in SAR. For rent it is per year. area in m².
export const listings = [
  { id: 'l1', slug: 'villa-alshati-420', status: 'sale', type: 'villa', hood: 'alshati', price: 4800000, area: 420, beds: 5, baths: 6, photo: 'p1',
    title: { ar: 'فيلا بمسبح في الشاطئ', en: 'Villa with a pool in Al-Shati' },
    line: { ar: 'خمس غرف نوم، مجلس منفصل وموقف لثلاث سيارات.', en: 'Five bedrooms, a separate majlis and parking for three cars.' } },
  { id: 'l2', slug: 'apartment-alrawdah-165', status: 'sale', type: 'apartment', hood: 'alrawdah', price: 1150000, area: 165, beds: 3, baths: 3, photo: 'p2',
    title: { ar: 'شقة ثلاث غرف في الروضة', en: 'Three-bedroom apartment in Al-Rawdah' },
    line: { ar: 'الطابق الرابع، مصعد وموقف خاص، بناء عام ٢٠٢٠.', en: 'Fourth floor, lift and private parking, built in 2020.' } },
  { id: 'l3', slug: 'townhouse-obhur-280', status: 'sale', type: 'townhouse', hood: 'obhur', price: 2600000, area: 280, beds: 4, baths: 4, photo: 'p3',
    title: { ar: 'تاون هاوس في أبحر', en: 'Townhouse in Obhur' },
    line: { ar: 'حديقة صغيرة وسطح، على بعد عشر دقائق من البحر.', en: 'Small garden and roof terrace, ten minutes from the sea.' } },
  { id: 'l4', slug: 'apartment-alandalus-120', status: 'sale', type: 'apartment', hood: 'alandalus', price: 890000, area: 120, beds: 2, baths: 2, photo: 'p4',
    title: { ar: 'شقة غرفتان في الأندلس', en: 'Two-bedroom apartment in Al-Andalus' },
    line: { ar: 'شرفة مطلة على الشارع الرئيسي، مناسبة لأسرة صغيرة.', en: 'Balcony on the main street, suited to a small family.' } },
  { id: 'l5', slug: 'villa-alrawdah-350', status: 'sale', type: 'villa', hood: 'alrawdah', price: 3400000, area: 350, beds: 5, baths: 5, photo: 'p5',
    title: { ar: 'فيلا في الروضة', en: 'Villa in Al-Rawdah' },
    line: { ar: 'مسبح وحديقة، والسعر قابل للنقاش بعد المعاينة.', en: 'Pool and garden; the price can be discussed after a viewing.' } },
  { id: 'l6', slug: 'apartment-albalad-95', status: 'rent', type: 'apartment', hood: 'albalad', price: 38000, area: 95, beds: 2, baths: 1, photo: 'p6',
    title: { ar: 'شقة غرفتان في البلد', en: 'Two-bedroom apartment in Al-Balad' },
    line: { ar: 'في مبنى مرمَّم قرب باب شريف، الإيجار سنوي.', en: 'In a restored building near Bab Sharif; annual lease.' } },
  { id: 'l7', slug: 'apartment-alshati-140', status: 'rent', type: 'apartment', hood: 'alshati', price: 85000, area: 140, beds: 3, baths: 2, photo: 'p7',
    title: { ar: 'شقة ثلاث غرف في الشاطئ', en: 'Three-bedroom apartment in Al-Shati' },
    line: { ar: 'إطلالة جانبية على البحر وصيانة المبنى مشمولة.', en: 'Side view of the sea; building maintenance included.' } },
  { id: 'l8', slug: 'villa-obhur-400', status: 'rent', type: 'villa', hood: 'obhur', price: 160000, area: 400, beds: 5, baths: 5, photo: 'p8',
    title: { ar: 'فيلا للإيجار في أبحر', en: 'Villa for rent in Obhur' },
    line: { ar: 'مسبح مشترك مع فيلتين فقط، وملحق للسائق.', en: 'Pool shared with just two other villas, and a driver’s annex.' } },
  { id: 'l9', slug: 'apartment-alandalus-110', status: 'rent', type: 'apartment', hood: 'alandalus', price: 52000, area: 110, beds: 2, baths: 2, photo: 'p9',
    title: { ar: 'شقة غرفتان في الأندلس', en: 'Two-bedroom apartment in Al-Andalus' },
    line: { ar: 'مفروشة جزئياً، ويمكن الدفع على دفعتين.', en: 'Partly furnished; rent can be paid in two instalments.' } },
  { id: 'l10', slug: 'house-albalad-260', status: 'sale', type: 'townhouse', hood: 'albalad', price: 2900000, area: 260, beds: 6, baths: 4, photo: 'p10',
    title: { ar: 'بيت مرمَّم في البلد', en: 'Restored house in Al-Balad' },
    line: { ar: 'ثلاثة طوابق برواشين أصلية؛ نوضح لك قيود الترميم قبل أي عرض.', en: 'Three floors with original roshans; we explain the restoration rules before any offer.' } },
  { id: 'l11', slug: 'apartment-albalad-70', status: 'rent', type: 'apartment', hood: 'albalad', price: 28000, area: 70, beds: 1, baths: 1, photo: 'p11',
    title: { ar: 'شقة غرفة واحدة في البلد', en: 'One-bedroom apartment in Al-Balad' },
    line: { ar: 'فوق محل مرمَّم، سقف عالٍ وإيجار سنوي.', en: 'Above a restored shopfront, high ceilings, annual lease.' } },
  { id: 'l12', slug: 'apartment-alrawdah-100', status: 'rent', type: 'apartment', hood: 'alrawdah', price: 64000, area: 100, beds: 2, baths: 2, photo: 'p12',
    title: { ar: 'شقة غرفتان في الروضة', en: 'Two-bedroom apartment in Al-Rawdah' },
    line: { ar: 'مطبخ جديد ومدرسة على بعد خمس دقائق سيراً.', en: 'New kitchen and a school five minutes on foot.' } },
];

// === Listing detail pages ===
// Detail data for listing.html, joined to `listings` by id, to `agents` by agentId and to `neighbourhoods` by id. All demo.
// Three more Al-Balad photos (Wikimedia Commons, self-hosted in assets/img); the footer credits list every entry of `photos`.
Object.assign(photos, {
  d1: { commons: { file: 'old-jeddah-3.jpg', author: { ar: 'Tahir mq', en: 'Tahir mq' }, licence: 'CC BY-SA 4.0', page: 'https://commons.wikimedia.org/wiki/File:Old_Jeddah_3.jpg' }, alt: { ar: 'زقاق مضاء في سوق البلد ليلاً بين محلات ومبانٍ برواشين خشبية', en: 'A lit lane in the Al-Balad souq at night between shops and timber-roshan buildings' } },
  d2: { commons: { file: 'old-jeddah-5.jpg', author: { ar: 'Radosław Botev', en: 'Radosław Botev' }, licence: 'CC BY 3.0 pl', page: 'https://commons.wikimedia.org/wiki/File:Old_Jeddah_(5).jpg' }, alt: { ar: 'ساحة في البلد أمام مبنى برواشين خضراء وطاولات مقهى مفتوحة', en: 'A square in Al-Balad in front of a building with green roshans and open café tables' } },
  d3: { commons: { file: 'old-jeddah-8.jpg', author: { ar: 'Radosław Botev', en: 'Radosław Botev' }, licence: 'CC BY 3.0 pl', page: 'https://commons.wikimedia.org/wiki/File:Old_Jeddah_(8).jpg' }, alt: { ar: 'مبنى أبيض من أربعة طوابق برواشين بنية وأبواب خشبية في البلد', en: 'A four-storey white building with brown roshans and timber doors in Al-Balad' } },
});

// gallery: keys of `photos` (the first is shown large). facts: built year, level, parking spaces, furnished (no | partly | yes).
export const listingDetails = {
  l1: { gallery: ['p1', 'p5', 'p2', 'n3'], agentId: 'a1', facts: { built: 2019, parking: 3, furnished: 'no', level: { ar: 'طابقان وسطح', en: 'Two floors and a roof' } },
    desc: { ar: 'فيلا من طابقين على قطعة مساحتها أكبر من مساحة البناء، فيها مجلس منفصل بمدخل خاص وغرفة سائق. المسبح في الواجهة الخلفية، والشارع هادئ بعد التاسعة مساءً. نراجع معك أسعار الفلل المشابهة في الحي قبل أن تقدّم أي عرض.', en: 'A two-storey villa on a plot larger than the building, with a separate majlis that has its own entrance and a driver’s room. The pool is at the back, and the street is quiet after nine in the evening. We go through comparable villa prices in the district with you before you make any offer.' } },
  l2: { gallery: ['p2', 'p12', 'p4', 'n2'], agentId: 'a3', facts: { built: 2020, parking: 1, furnished: 'no', level: { ar: 'الطابق الرابع', en: 'Fourth floor' } },
    desc: { ar: 'شقة في الطابق الرابع بثلاث غرف نوم وصالة واسعة تدخلها الشمس صباحاً. في المبنى مصعد وموقف خاص للشقة. المدرسة والحديقة على بعد عشر دقائق سيراً، وهذا ما تسأل عنه معظم العائلات.', en: 'A fourth-floor apartment with three bedrooms and a wide living room that gets morning sun. The building has a lift and a parking space for the flat. A school and a park are ten minutes on foot, which is what most families ask about first.' } },
  l3: { gallery: ['p3', 'p8', 'p9', 'n4'], agentId: 'a1', facts: { built: 2021, parking: 2, furnished: 'no', level: { ar: 'طابقان وسطح', en: 'Two floors and a roof' } },
    desc: { ar: 'تاون هاوس بأربع غرف نوم وحديقة صغيرة في الخلف وسطح يصلح للجلسات المسائية. الطريق إلى البحر نحو عشر دقائق بالسيارة. الجيران عائلات، ورسوم الصيانة المشتركة معلنة قبل التوقيع.', en: 'A townhouse with four bedrooms, a small back garden and a roof terrace for evenings. The sea is about ten minutes by car. The neighbours are families, and the shared maintenance fee is stated before you sign.' } },
  l4: { gallery: ['p4', 'p9', 'p12', 'n5'], agentId: 'a3', facts: { built: 2016, parking: 1, furnished: 'no', level: { ar: 'الطابق السادس', en: 'Sixth floor' } },
    desc: { ar: 'شقة بغرفتين وشرفة على الشارع الرئيسي، مناسبة لأسرة صغيرة أو لموظف يريد القرب من مكتبه. الأصوات من الشارع حاضرة نهاراً وتخف مساءً. نشرح لك خطوات التمويل العقاري إن احتجت إليه.', en: 'A two-bedroom apartment with a balcony on the main street, suited to a small family or someone who wants to be near the office. Street noise is there by day and eases in the evening. We explain the mortgage steps if you need them.' } },
  l5: { gallery: ['p5', 'p1', 'p12', 'n2'], agentId: 'a3', facts: { built: 2017, parking: 2, furnished: 'no', level: { ar: 'طابقان', en: 'Two floors' } },
    desc: { ar: 'فيلا بخمس غرف نوم ومسبح وحديقة، في شارع سكني. السعر المطلوب قابل للنقاش بعد المعاينة، ونعرض عليك أسعار صفقات مشابهة قبل أن تتفاوض.', en: 'A five-bedroom villa with a pool and garden on a residential street. The asking price can be discussed after a viewing, and we show you comparable sale prices before you negotiate.' } },
  l6: { gallery: ['p6', 'd3', 'p9', 'd1'], agentId: 'a2', facts: { built: 1950, parking: 0, furnished: 'no', level: { ar: 'الطابق الثاني', en: 'Second floor' } },
    desc: { ar: 'شقة بغرفتين في مبنى مرمَّم قرب باب شريف، بسقف عالٍ ونوافذ خشبية. لا يوجد موقف خاص، والمشي إلى السوق دقائق. الإيجار سنوي، وتشرح لك ريم بنود العقد قبل التوقيع.', en: 'A two-bedroom apartment in a restored building near Bab Sharif, with high ceilings and timber windows. There is no private parking, and the souq is a few minutes’ walk. The lease is annual, and Reem goes through its terms before you sign.' } },
  l7: { gallery: ['p7', 'p2', 'p12', 'n3'], agentId: 'a2', facts: { built: 2018, parking: 1, furnished: 'partly', level: { ar: 'الطابق التاسع', en: 'Ninth floor' } },
    desc: { ar: 'شقة بثلاث غرف في طابق مرتفع، تُرى منها زاوية من البحر. صيانة المبنى مشمولة في الإيجار، وفي المبنى مصعدان وحارس. مفروشة جزئياً بالمطبخ والمكيفات.', en: 'A three-bedroom apartment on a high floor with a side view of the sea. Building maintenance is included in the rent, and the building has two lifts and a guard. Partly furnished with the kitchen and air conditioners.' } },
  l8: { gallery: ['p8', 'p3', 'p12', 'n4'], agentId: 'a2', facts: { built: 2015, parking: 3, furnished: 'no', level: { ar: 'طابقان', en: 'Two floors' } },
    desc: { ar: 'فيلا للإيجار بخمس غرف نوم، تشترك بالمسبح مع فيلتين فقط، وفيها ملحق للسائق. الحي هادئ وبعيد عن زحام المدينة. الإيجار سنوي ويمكن مناقشة الدفع على دفعتين.', en: 'A five-bedroom villa for rent that shares its pool with just two other villas, with a driver’s annex. The district is quiet and away from city traffic. The lease is annual and payment in two instalments can be discussed.' } },
  l9: { gallery: ['p9', 'p2', 'p12', 'n5'], agentId: 'a2', facts: { built: 2014, parking: 1, furnished: 'partly', level: { ar: 'الطابق الثالث', en: 'Third floor' } },
    desc: { ar: 'شقة بغرفتين قرب شارع التحلية، مفروشة جزئياً، ويمكن دفع الإيجار على دفعتين. المقاهي والمكاتب على بعد خطوات، والمبنى فيه مصعد.', en: 'A two-bedroom apartment near Tahlia Street, partly furnished, with rent payable in two instalments. Cafés and offices are a few steps away, and the building has a lift.' } },
  l10: { gallery: ['p10', 'd2', 'd3', 'p2'], agentId: 'a1', facts: { built: 1935, parking: 0, furnished: 'no', level: { ar: 'ثلاثة طوابق', en: 'Three floors' } },
    desc: { ar: 'بيت قديم مرمَّم من ثلاثة طوابق بستة غرف نوم ورواشين أصلية على الواجهة. للمباني في البلد قيود ترميم وتراخيص خاصة، ونشرحها لك كاملة قبل أي عرض. لا يوجد موقف داخل البيت.', en: 'A restored three-floor house with six bedrooms and its original roshans on the facade. Buildings in Al-Balad come with restoration rules and special permits, and we explain them in full before any offer. There is no parking inside the house.' } },
  l11: { gallery: ['p11', 'd3', 'p9', 'd1'], agentId: 'a2', facts: { built: 1960, parking: 0, furnished: 'no', level: { ar: 'فوق محل مرمَّم', en: 'Above a restored shopfront' } },
    desc: { ar: 'شقة بغرفة واحدة فوق محل مرمَّم، بسقف عالٍ ونافذة تطل على زقاق السوق. مناسبة لشخص أو زوجين يريدان السكن في قلب البلد. الإيجار سنوي.', en: 'A one-bedroom apartment above a restored shopfront, with a high ceiling and a window onto a souq lane. Suited to one person or a couple who want to live in the heart of Al-Balad. The lease is annual.' } },
  l12: { gallery: ['p12', 'p2', 'p9', 'n2'], agentId: 'a2', facts: { built: 2022, parking: 1, furnished: 'no', level: { ar: 'الطابق الثاني', en: 'Second floor' } },
    desc: { ar: 'شقة بغرفتين ومطبخ جديد، والمدرسة على بعد خمس دقائق سيراً. المبنى حديث وهادئ ومناسب لعائلة صغيرة. الإيجار سنوي.', en: 'A two-bedroom apartment with a new kitchen, and a school five minutes on foot. The building is new and quiet, suited to a small family. The lease is annual.' } },
};

export const hoodAbout = {
  albalad: { ar: 'البلد هي جدة التاريخية، ومسجّلة في قائمة التراث العالمي. الأزقة ضيقة والمشي فيها هو الوسيلة الأسهل، والمباني مرجانية برواشين خشبية. الترميم يحتاج إلى موافقات، ونعرّفك بها قبل الشراء.', en: 'Al-Balad is historic Jeddah, listed as a World Heritage site. The lanes are narrow and walking is the easy way in, and the buildings are coral stone with timber roshans. Restoration needs approvals, and we explain them before you buy.' },
  alshati: { ar: 'الشاطئ حيّ قريب من الكورنيش، فيه فلل وشقق مرتفعة بإطلالات بحرية. المشي على الواجهة البحرية مساءً من أسباب اختيار الحي، والأسعار فيه من الأعلى في المدينة.', en: 'Al-Shati is next to the Corniche, with villas and tall apartment blocks facing the sea. An evening walk on the waterfront is a big reason people choose it, and prices are among the city’s highest.' },
  alrawdah: { ar: 'الروضة حيّ سكني هادئ فيه مدارس وحدائق ومحلات قريبة. الشوارع واسعة وفيها نخيل، وهو من أكثر الأحياء طلباً بين العائلات.', en: 'Al-Rawdah is a quiet residential district with schools, parks and shops nearby. The streets are wide and lined with palms, and families ask for it more than almost any other district.' },
  obhur: { ar: 'أبحر شمال المدينة، وفيه قطع أكبر ومنازل بمسابح وقنوات بحرية. تحتاج فيه إلى سيارة، وفي المقابل تحصل على مساحة وهدوء أكثر.', en: 'Obhur is north of the city, with larger plots, homes with pools and sea inlets. You need a car there, and in return you get more space and quiet.' },
  alandalus: { ar: 'الأندلس قريب من شارع التحلية والمكاتب والمقاهي، ومعظم مبانيه شقق. مناسب لمن يريد أن يكون قريباً من عمله ومن الخدمات.', en: 'Al-Andalus is close to Tahlia Street, offices and cafés, and most of its buildings are apartments. It suits people who want to be near work and services.' },
};

export const agents = [
  { id: 'a1', name: { ar: 'فيصل الغامدي', en: 'Faisal Al-Ghamdi' }, initials: { ar: 'ف غ', en: 'FG' }, phone: '+966 12 555 0141',
    role: { ar: 'مستشار مبيعات', en: 'Sales advisor' },
    areas: { ar: 'الشاطئ وأبحر', en: 'Al-Shati and Obhur' },
    langs: { ar: 'العربية والإنجليزية', en: 'Arabic and English' },
    line: { ar: 'عشر سنوات في بيع الفلل، ويبدأ كل ملف بمقارنة أسعار الصفقات الأخيرة.', en: 'Ten years selling villas; every file starts with recent comparable sales.' } },
  { id: 'a2', name: { ar: 'ريم الحربي', en: 'Reem Al-Harbi' }, initials: { ar: 'ر ح', en: 'RH' }, phone: '+966 12 555 0142',
    role: { ar: 'مستشارة تأجير', en: 'Leasing advisor' },
    areas: { ar: 'البلد والأندلس', en: 'Al-Balad and Al-Andalus' },
    langs: { ar: 'العربية والإنجليزية', en: 'Arabic and English' },
    line: { ar: 'تشرح بنود العقد قبل التوقيع، وتتابع مع المُلّاك حتى تسليم المفتاح.', en: 'Explains the lease terms before signing and follows up with owners until handover.' } },
  { id: 'a3', name: { ar: 'خالد باكر', en: 'Khalid Baker' }, initials: { ar: 'خ ب', en: 'KB' }, phone: '+966 12 555 0143',
    role: { ar: 'مستشار مبيعات', en: 'Sales advisor' },
    areas: { ar: 'الروضة والأندلس', en: 'Al-Rawdah and Al-Andalus' },
    langs: { ar: 'العربية والإنجليزية والأردية', en: 'Arabic, English and Urdu' },
    line: { ar: 'يتخصص في الشقق للعائلات الأولى، ويشرح خطوات التمويل العقاري بوضوح.', en: 'Focuses on first family apartments and explains the mortgage steps plainly.' } },
];

export const company = {
  phone: '+966 12 555 0100',
  email: 'hello@manzil-realty.example',
};

// MNZ-4 WhatsApp contact button. Demo numbers (international format, digits only): swap them here.
// Agents are joined by id; the texts are attached to content.ar / content.en under the same comment.
export const whatsapp = {
  agency: '966555010100',
  agents: { a1: '966555010141', a2: '966555010142', a3: '966555010143' },
};
export const whatsappText = {
  ar: {
    short: 'واتساب',
    label: 'تواصل عبر واتساب',
    agent: 'راسل {name} عبر واتساب',
    opens: 'يفتح في نافذة جديدة',
    general: 'مرحباً منزل العقارية، أريد الاستفسار عن عقار في جدة.',
    hood: 'مرحباً منزل العقارية، أريد الاستفسار عن العقارات في حي {hood}.',
    agentMsg: 'مرحباً {name}، أريد الاستفسار عن عقار في {areas}.',
  },
  en: {
    short: 'WhatsApp',
    label: 'Chat on WhatsApp',
    agent: 'Message {name} on WhatsApp',
    opens: 'Opens in a new window',
    general: 'Hello Manzil Realty, I’d like to ask about a home in Jeddah.',
    hood: 'Hello Manzil Realty, I’d like to ask about homes in {hood}.',
    agentMsg: 'Hello {name}, I’d like to ask about a home in {areas}.',
  },
};

export const content = {
  ar: {
    meta: { title: 'منزل العقارية | عقارات للبيع والإيجار في جدة', description: 'عقارات للبيع والإيجار في جدة بأسعار معلنة وخطوات واضحة. احجز معاينة أو اسأل عن عقار.' },
    brand: 'منزل',
    brandSub: 'عقارات في جدة',
    demoNote: 'المحتوى في هذه الصفحة تجريبي: العقارات والأسعار والأسماء وأرقام الهاتف أمثلة.',
    demoLabel: 'ملاحظة عن المحتوى',
    skip: 'انتقل إلى المحتوى',
    nav: { label: 'التنقل الرئيسي', menu: 'قائمة الهاتف', search: 'البحث', listings: 'العقارات', hoods: 'الأحياء', agents: 'المستشارون', contact: 'تواصل معنا', cta: 'احجز معاينة', menuOpen: 'فتح القائمة', menuClose: 'إغلاق القائمة' },
    lang: { switchLabel: 'English', switchAria: 'التبديل إلى اللغة الإنجليزية' },
    hero: {
      title: 'بيت مناسب في جدة، وسعر واضح من البداية',
      lead: 'نعرض كل عقار بسعره المطلوب، ونراجع معك أسعار الصفقات المشابهة قبل أن تقرر. المعاينة بموعد يناسبك ودون التزام.',
      cta: 'احجز معاينة',
      secondary: 'ابحث في العقارات',
      facts: [
        { k: 'الأسعار', v: 'تُعرض كما يطلبها المالك' },
        { k: 'المعاينة', v: 'بموعد تحدده أنت' },
        { k: 'الرد', v: 'خلال يوم عمل واحد' },
      ],
    },
    search: {
      title: 'ابحث عن عقار',
      legendMode: 'نوع الصفقة', buy: 'شراء', rent: 'إيجار',
      type: 'نوع العقار', hood: 'الحيّ', price: 'السعر الأقصى', priceRent: 'السعر الأقصى للسنة', beds: 'غرف النوم',
      any: 'الكل', anyHood: 'كل الأحياء', anyPrice: 'بدون حد', anyBeds: 'أي عدد',
      bedsMin: '{n}+', reset: 'مسح الاختيارات',
      types: { apartment: 'شقة', villa: 'فيلا', townhouse: 'تاون هاوس' },
    },
    listings: {
      title: 'عقارات معروضة الآن',
      lead: 'كل سعر هو السعر المطلوب من المالك. اطلب منا مقارنة بالصفقات الأخيرة قبل أي عرض.',
      count: { zero: 'لا توجد عقارات مطابقة', one: 'عقار واحد مطابق', two: 'عقاران مطابقان', few: '{n} عقارات مطابقة', many: '{n} عقاراً مطابقاً', other: '{n} عقار مطابق' },
      statusSale: 'للبيع', statusRent: 'للإيجار',
      perYear: 'في السنة', asking: 'السعر المطلوب',
      area: 'المساحة', beds: 'غرف النوم', baths: 'الحمامات',
      areaUnit: 'م²',
      bedsN: { one: 'غرفة نوم', two: 'غرفتا نوم', few: '{n} غرف نوم', many: '{n} غرفة نوم', other: '{n} غرفة نوم', zero: 'استوديو' },
      bathsN: { one: 'حمام', two: 'حمامان', few: '{n} حمامات', many: '{n} حماماً', other: '{n} حمام', zero: '' },
      ask: 'اسأل عن هذا العقار',
      emptyTitle: 'لا يوجد عقار بهذه المواصفات حالياً',
      emptyBody: 'جرّب رفع السعر الأقصى، أو اختيار «كل الأحياء»، أو تقليل عدد غرف النوم. يمكنك أيضاً أن تترك لنا طلبك فنبحث لك.',
      emptyReset: 'مسح الاختيارات',
      emptyAsk: 'اترك لنا طلبك',
    },
    hoods: {
      title: 'الأحياء التي نعمل فيها',
      lead: 'نعرف الشوارع والمباني في كل حي. اختر حيّاً لترى ما هو معروض فيه.',
      count: { zero: 'لا عقارات معروضة', one: 'عقار واحد معروض', two: 'عقاران معروضان', few: '{n} عقارات معروضة', many: '{n} عقاراً معروضاً', other: '{n} عقار معروض' },
      view: 'اعرض عقارات {name}',
    },
    agents: {
      title: 'مستشارونا',
      lead: 'يجيب كل مستشار بنفسه عن الهاتف، ويبقى معك حتى تسليم المفتاح.',
      areas: 'الأحياء', langs: 'اللغات', call: 'اتصل بـ {name}',
    },
    contact: {
      title: 'اسأل عن عقار أو احجز معاينة',
      lead: 'اكتب لنا بياناتك الأساسية وسنتصل بك خلال يوم عمل واحد. لا نطلب أي مبلغ ولا نشارك رقمك مع جهات أخرى.',
      stepsTitle: 'ما الذي سيحدث بعد ذلك',
      steps: [
        'نقرأ طلبك ونتصل بك على الرقم الذي تكتبه.',
        'نرسل لك العقارات المناسبة مع أسعار صفقات مشابهة.',
        'نحدد موعد المعاينة الذي يناسبك.',
      ],
      hoursTitle: 'ساعات العمل',
      hours: 'السبت إلى الخميس، من 9 صباحاً إلى 6 مساءً. الجمعة بموعد مسبق.',
      form: {
        legend: 'بيانات الطلب',
        intent: 'ماذا تريد؟', inquiry: 'سؤال عن عقار', viewing: 'حجز معاينة',
        name: 'الاسم الكامل', namePh: 'مثال: سارة العتيبي',
        phone: 'رقم الجوال', phoneHint: 'رقم سعودي من عشر خانات، مثل 0551234567',
        property: 'العقار أو الحيّ', propertyPh: 'اختر عقاراً أو حيّاً',
        groupListings: 'العقارات المعروضة', groupHoods: 'الأحياء', notSure: 'لم أحدد بعد',
        date: 'التاريخ المفضل للمعاينة', time: 'الوقت المفضل',
        timePh: 'اختر وقتاً',
        message: 'ملاحظات (اختياري)', messagePh: 'مثال: أفضّل الطابق الأعلى، وعندي سيارتان.',
        submit: 'أرسل الطلب', sending: 'جارٍ الإرسال…',
        errorsTitle: 'راجع الحقول التالية:',
        errors: {
          name: 'اكتب اسمك الكامل، حرفان على الأقل.',
          phone: 'اكتب رقم جوال سعودي صحيحاً من عشر خانات، مثل 0551234567.',
          property: 'اختر العقار أو الحيّ الذي يهمك، أو «لم أحدد بعد».',
          dateEmpty: 'اختر تاريخاً للمعاينة.',
          datePast: 'اختر تاريخاً من اليوم فصاعداً.',
          dateFar: 'اختر تاريخاً خلال الأشهر الثلاثة القادمة.',
          time: 'اختر وقتاً مناسباً للمعاينة.',
        },
        successTitle: 'وصلنا طلبك',
        successInquiry: 'شكراً يا {name}. سنتصل بك على {phone} خلال يوم عمل واحد بخصوص: {property}.',
        successViewing: 'شكراً يا {name}. سجّلنا طلب معاينة بخصوص {property} يوم {date} في {time}. سنتصل بك على {phone} لتأكيد الموعد.',
        successNote: 'هذه نسخة تجريبية: لم يُرسل أي شيء فعلياً.',
        again: 'إرسال طلب آخر',
        failTitle: 'تعذّر إرسال الطلب',
        fail: 'لم يصل طلبك. تحقق من اتصالك بالإنترنت ثم أعد المحاولة، أو اتصل بنا على الرقم في أسفل الصفحة.',
      },
    },
    // === Listing detail pages ===
    listing: {
      pageTitle: '{title} | منزل العقارية',
      back: 'العودة إلى العقارات',
      notFoundTitle: 'لم نجد هذا العقار',
      notFoundBody: 'ربما بيع العقار أو أُجّر، أو أن الرابط ناقص. شاهد العقارات المعروضة الآن، أو اترك لنا طلبك.',
      notFoundCta: 'عرض العقارات',
      galleryLabel: 'صور العقار',
      prev: 'الصورة السابقة', next: 'الصورة التالية', photoOf: 'صورة {n} من {total}', showPhoto: 'اعرض الصورة {n}',
      statArea: 'الحيّ', statSize: 'المساحة', statBeds: 'غرف النوم', statBaths: 'الحمامات',
      descTitle: 'عن هذا العقار',
      factsTitle: 'معلومات أساسية',
      facts: { deal: 'الصفقة', type: 'النوع', built: 'سنة البناء', level: 'الطابق', parking: 'المواقف', furnished: 'الفرش', perM2: 'سعر المتر' },
      perM2Unit: 'للمتر المربع',
      furnished: { no: 'غير مفروشة', partly: 'مفروشة جزئياً', yes: 'مفروشة' },
      parkingN: { zero: 'لا يوجد موقف خاص', one: 'موقف واحد', two: 'موقفان', few: '{n} مواقف', many: '{n} موقفاً', other: '{n} موقف' },
      hoodTitle: 'عن حيّ {name}',
      hoodLink: 'اعرض عقارات {name}',
      agentTitle: 'مستشارك في هذا العقار',
      agentLead: 'يجيب عن أسئلتك بنفسه ويرتّب معك موعد المعاينة.',
      formTitle: 'اسأل عن هذا العقار أو احجز معاينة',
      formLead: 'سنتصل بك خلال يوم عمل واحد. لا نطلب أي مبلغ.',
      asking: 'تسأل عن: {title}',
    },
    // MNZ-4 WhatsApp contact button
    whatsapp: whatsappText.ar,
    footer: {
      about: 'منزل العقارية وسيط عقاري في جدة، يبيع ويؤجّر الشقق والفلل بأسعار معلنة.',
      contactTitle: 'التواصل',
      address: 'طريق الأمير سلطان، الروضة، جدة',
      hoursTitle: 'ساعات العمل',
      hours: 'السبت إلى الخميس، 9 صباحاً إلى 6 مساءً',
      linksTitle: 'الصفحة',
      creditsTitle: 'مصادر الصور',
      creditsLead: 'صور البلد والواجهة البحرية من ويكيميديا كومنز بترخيص CC BY أو CC BY-SA، وباقي الصور من Unsplash بترخيص مجاني. وتصميم الصفحة مبني على قوالب مفتوحة المصدر.',
      creditsItem: 'صورة {n} على Unsplash',
      creditsItemCommons: 'صورة {n}: {author}، {licence}',
      rights: 'منزل العقارية، جدة.',
    },
    noscript: 'تحتاج هذه الصفحة إلى تفعيل JavaScript لعرض العقارات.',
  },
  en: {
    meta: { title: 'Manzil Realty | Homes for sale and rent in Jeddah', description: 'Homes for sale and rent in Jeddah, with asking prices and clear steps. Ask about a property or book a viewing.' },
    brand: 'Manzil',
    brandSub: 'Realty in Jeddah',
    demoNote: 'The content on this page is demo: the properties, prices, names and phone numbers are examples.',
    demoLabel: 'Note about the content',
    skip: 'Skip to content',
    nav: { label: 'Main navigation', menu: 'Phone menu', search: 'Search', listings: 'Homes', hoods: 'Neighbourhoods', agents: 'Advisors', contact: 'Contact', cta: 'Book a viewing', menuOpen: 'Open menu', menuClose: 'Close menu' },
    lang: { switchLabel: 'العربية', switchAria: 'Switch to Arabic' },
    hero: {
      title: 'A home in Jeddah, with the price clear from the first call',
      lead: 'We list every property at the owner’s asking price and walk you through comparable sales before you decide. Viewings are by appointment, with no obligation.',
      cta: 'Book a viewing',
      secondary: 'Search homes',
      facts: [
        { k: 'Prices', v: 'Shown as the owner asks' },
        { k: 'Viewings', v: 'On a time you choose' },
        { k: 'Replies', v: 'Within one working day' },
      ],
    },
    search: {
      title: 'Find a property',
      legendMode: 'Deal type', buy: 'Buy', rent: 'Rent',
      type: 'Property type', hood: 'Neighbourhood', price: 'Maximum price', priceRent: 'Maximum price per year', beds: 'Bedrooms',
      any: 'Any', anyHood: 'All neighbourhoods', anyPrice: 'No limit', anyBeds: 'Any number',
      bedsMin: '{n}+', reset: 'Clear choices',
      types: { apartment: 'Apartment', villa: 'Villa', townhouse: 'Townhouse' },
    },
    listings: {
      title: 'Homes available now',
      lead: 'Each price is the owner’s asking price. Ask us for recent comparable sales before you make any offer.',
      count: { zero: 'No matching homes', one: '1 matching home', two: '2 matching homes', few: '{n} matching homes', many: '{n} matching homes', other: '{n} matching homes' },
      statusSale: 'For sale', statusRent: 'For rent',
      perYear: 'per year', asking: 'Asking price',
      area: 'Area', beds: 'Bedrooms', baths: 'Bathrooms',
      areaUnit: 'm²',
      bedsN: { one: '1 bedroom', two: '2 bedrooms', few: '{n} bedrooms', many: '{n} bedrooms', other: '{n} bedrooms', zero: 'Studio' },
      bathsN: { one: '1 bathroom', two: '2 bathrooms', few: '{n} bathrooms', many: '{n} bathrooms', other: '{n} bathrooms', zero: '' },
      ask: 'Ask about this home',
      emptyTitle: 'No home matches these choices right now',
      emptyBody: 'Try a higher maximum price, choose “All neighbourhoods”, or ask for fewer bedrooms. You can also leave us your request and we will search for you.',
      emptyReset: 'Clear choices',
      emptyAsk: 'Leave us your request',
    },
    hoods: {
      title: 'Neighbourhoods we work in',
      lead: 'We know the streets and buildings in each district. Choose one to see what is listed there.',
      count: { zero: 'Nothing listed', one: '1 home listed', two: '2 homes listed', few: '{n} homes listed', many: '{n} homes listed', other: '{n} homes listed' },
      view: 'See homes in {name}',
    },
    agents: {
      title: 'Our advisors',
      lead: 'Each advisor answers the phone personally and stays with you until the keys are handed over.',
      areas: 'Neighbourhoods', langs: 'Languages', call: 'Call {name}',
    },
    contact: {
      title: 'Ask about a home or book a viewing',
      lead: 'Leave your basic details and we will call within one working day. We never ask for payment here and never share your number.',
      stepsTitle: 'What happens next',
      steps: [
        'We read your request and call the number you give.',
        'We send matching homes with comparable sale prices.',
        'We set a viewing time that suits you.',
      ],
      hoursTitle: 'Opening hours',
      hours: 'Saturday to Thursday, 9:00 to 18:00. Friday by appointment.',
      form: {
        legend: 'Request details',
        intent: 'What would you like?', inquiry: 'Ask about a property', viewing: 'Book a viewing',
        name: 'Full name', namePh: 'For example: Sara Al-Otaibi',
        phone: 'Mobile number', phoneHint: 'A ten-digit Saudi number, such as 0551234567',
        property: 'Property or neighbourhood', propertyPh: 'Choose a property or neighbourhood',
        groupListings: 'Listed homes', groupHoods: 'Neighbourhoods', notSure: 'Not decided yet',
        date: 'Preferred viewing date', time: 'Preferred time',
        timePh: 'Choose a time',
        message: 'Notes (optional)', messagePh: 'For example: I prefer a higher floor and have two cars.',
        submit: 'Send request', sending: 'Sending…',
        errorsTitle: 'Check these fields:',
        errors: {
          name: 'Enter your full name, at least two letters.',
          phone: 'Enter a valid ten-digit Saudi mobile number, such as 0551234567.',
          property: 'Choose the property or neighbourhood you are interested in, or “Not decided yet”.',
          dateEmpty: 'Choose a date for the viewing.',
          datePast: 'Choose a date from today onwards.',
          dateFar: 'Choose a date within the next three months.',
          time: 'Choose a time that suits you for the viewing.',
        },
        successTitle: 'We have your request',
        successInquiry: 'Thank you, {name}. We will call you on {phone} within one working day about: {property}.',
        successViewing: 'Thank you, {name}. We noted a viewing request for {property} on {date} at {time}. We will call you on {phone} to confirm.',
        successNote: 'This is a demo: nothing was actually sent.',
        again: 'Send another request',
        failTitle: 'The request could not be sent',
        fail: 'Your request did not arrive. Check your internet connection and try again, or call us on the number at the bottom of the page.',
      },
    },
    // === Listing detail pages ===
    listing: {
      pageTitle: '{title} | Manzil Realty',
      back: 'Back to homes',
      notFoundTitle: 'We could not find this home',
      notFoundBody: 'It may have been sold or let, or the link may be incomplete. See the homes available now, or leave us your request.',
      notFoundCta: 'See homes',
      galleryLabel: 'Photos of this home',
      prev: 'Previous photo', next: 'Next photo', photoOf: 'Photo {n} of {total}', showPhoto: 'Show photo {n}',
      statArea: 'Neighbourhood', statSize: 'Size', statBeds: 'Bedrooms', statBaths: 'Bathrooms',
      descTitle: 'About this home',
      factsTitle: 'Key facts',
      facts: { deal: 'Deal', type: 'Type', built: 'Built', level: 'Level', parking: 'Parking', furnished: 'Furnishing', perM2: 'Price per m²' },
      perM2Unit: 'per m²',
      furnished: { no: 'Unfurnished', partly: 'Partly furnished', yes: 'Furnished' },
      parkingN: { zero: 'No private parking', one: '1 space', two: '2 spaces', few: '{n} spaces', many: '{n} spaces', other: '{n} spaces' },
      hoodTitle: 'About {name}',
      hoodLink: 'See homes in {name}',
      agentTitle: 'Your advisor for this home',
      agentLead: 'Answers your questions personally and arranges the viewing with you.',
      formTitle: 'Ask about this home or book a viewing',
      formLead: 'We will call within one working day. We never ask for payment.',
      asking: 'Asking about: {title}',
    },
    // MNZ-4 WhatsApp contact button
    whatsapp: whatsappText.en,
    footer: {
      about: 'Manzil Realty is a real estate broker in Jeddah selling and renting apartments and villas at stated prices.',
      contactTitle: 'Contact',
      address: 'Prince Sultan Road, Al-Rawdah, Jeddah',
      hoursTitle: 'Opening hours',
      hours: 'Saturday to Thursday, 9:00 to 18:00',
      linksTitle: 'On this page',
      creditsTitle: 'Photo credits',
      creditsLead: 'The Al-Balad and waterfront photos are from Wikimedia Commons (CC BY or CC BY-SA); the other photos are from Unsplash under its free licence. The page design adapts open-source templates.',
      creditsItem: 'Photo {n} on Unsplash',
      creditsItemCommons: 'Photo {n}: {author}, {licence}',
      rights: 'Manzil Realty, Jeddah.',
    },
    noscript: 'This page needs JavaScript to show the homes.',
  },
};

// Time slots for viewings (24h, formatted per language with Intl).
export const viewingSlots = ['10:00', '12:00', '14:00', '16:00', '18:00'];

// Price steps for the filter (SAR; rent is per year).
export const priceSteps = {
  sale: [1000000, 2000000, 3000000, 5000000],
  rent: [50000, 80000, 120000, 200000],
};
