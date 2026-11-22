// HtetLingo Multilingual Learning & Empowerment Dataset
// Feminism, Sisterhood, Women Empowerment & Lexical Collection
// Curated by Htet with Open Source Dictionaries (EMDictionary, English-to-English, Myanmar Wordlists)

window.HTET_DATA = {
  languages: [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸', script: 'Latin' },
    { code: 'my', name: 'Burmese', native: 'မြန်မာဘာသာ', flag: '🇲🇲', script: 'Myanmar' },
    { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', script: 'Japanese' },
    { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳', script: 'Mandarin' },
    { code: 'th', name: 'Thai', native: 'ภาษาไทย', flag: '🇹🇭', script: 'Thai' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', script: 'Latin' },
    { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', script: 'Latin' },
    { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷', script: 'Hangul' }
  ],

  // Inspiring Feminist & Sisterhood Quotes
  dailyAffirmations: [
    {
      quote: "There is no limit to what we, as women, can accomplish.",
      quoteMy: "အမျိုးသမီးတွေအနေနဲ့ ငါတို့ စွမ်းဆောင်နိုင်တဲ့ အရာတွေမှာ ဘာကန့်သတ်ချက်မှ မရှိပါဘူး။",
      author: "Michelle Obama",
      lang: "en"
    },
    {
      quote: "When the whole world is silent, even one voice becomes powerful.",
      quoteMy: "ကမ္ဘာတစ်ခုလုံး တိတ်ဆိတ်နေချိန်မှာ အသံတစ်သံတည်းကပင် အင်အားကြီးမားတဲ့ စွမ်းအား ဖြစ်လာပါတယ်။",
      author: "Malala Yousafzai",
      lang: "en"
    },
    {
      quote: "I am deliberate and afraid of nothing.",
      quoteMy: "ငါသည် ပြတ်သားခိုင်မာပြီး ဘယ်အရာကိုမှ မကြောက်ရွံ့ပါ။",
      author: "Audre Lorde",
      lang: "en"
    },
    {
      quote: "女は生まれながらにして女なのではなく、女になるのだ。",
      quoteMy: "အမျိုးသမီးတစ်ယောက်ဟာ မွေးကတည်းက အမျိုးသမီးဖြစ်လာတာ မဟုတ်ဘဲ၊ အမျိုးသမီးအဖြစ် ဖန်တီးတည်ဆောက်လာရခြင်း ဖြစ်ပါတယ်။",
      author: "Simone de Beauvoir (Le Deuxième Sexe)",
      lang: "ja"
    }
  ],

  // 1. Vocabulary Database
  vocabulary: [
    // --- FEMINISM & HUMAN RIGHTS (အမျိုးသမီးအခွင့်အရေးနှင့် တန်းတူညီမျှရေး) ---
    {
      id: 'v_fem_01',
      category: 'feminism',
      level: 'Empowerment',
      translations: {
        en: { word: 'Empowerment', phonetic: '/ɪmˈpaʊ.ər.mənt/', example: 'Education is the ultimate foundation for women's empowerment.' },
        my: { word: 'စွမ်းရည်မြှင့်တင်မှု / လုပ်ပိုင်ခွင့်', phonetic: 'Swan-yei myin-tin-hmu', example: 'ပညာရေးသည် အမျိုးသမီးများ၏ စွမ်းရည်မြှင့်တင်မှုအတွက် အဓိကသော့ချက်ဖြစ်ပါတယ်။' },
        ja: { word: 'エンパワーメント / 力量強化', phonetic: 'Empawāmento', example: '女性のエンパワーメントが社会をより豊かにします。' },
        zh: { word: '赋权 / 女性赋能', phonetic: 'Fùquán / Nǚxìng fùnéng', example: '教育是实现女性赋能最根本的基石。' },
        th: { word: 'การเสริมพลัง / เพิ่มศักยภาพ', phonetic: 'Karn serm phalang', example: 'การศึกษาคือรากฐานสำคัญของการเสริมพลังสตรี' },
        fr: { word: 'Autonomisation / Émancipation', phonetic: '/o.tɔ.nɔ.mi.za.sjɔ̃/', example: 'L'émancipation des femmes transforme le monde.' },
        de: { word: 'Ermächtigung / Selbstbestimmung', phonetic: '/ɛɐ̯ˈmɛçtɪɡʊŋ/', example: 'Bildung ist die Grundlage für Selbstbestimmung.' },
        ko: { word: '역량 강화 / 임파워먼트', phonetic: 'Yeongryang ganghwa', example: '여성의 역량 강화는 사회 발전의 핵심입니다.' }
      }
    },
    {
      id: 'v_fem_02',
      category: 'feminism',
      level: 'Empowerment',
      translations: {
        en: { word: 'Sisterhood & Solidarity', phonetic: '/ˈsɪs.tə.hʊd ən ˌsɒl.ɪˈdær.ə.ti/', example: 'In our sisterhood, every woman finds courage and unconditional support.' },
        my: { word: 'ညီအစ်မစည်းလုံးညီညွတ်မှု', phonetic: 'Nyi-a-ma see-lone-nyi-nyut-hmu', example: 'မိန်းကလေးအချင်းချင်း အားပေးရိုင်းပင်းခြင်းသည် ကြီးမားသော ခွန်အားဖြစ်ပါတယ်။' },
        ja: { word: 'シスターフッド / 連帯', phonetic: 'Shisutāhuddo / Rentai', example: '女性同士の連帯が、新しい未来を切り拓きます。' },
        zh: { word: '姐妹情谊与团结', phonetic: 'Jiěmèi qíngyì yǔ tuánjié', example: '在姐妹情谊中，我们互相支持、共同闪耀。' },
        th: { word: 'ความเป็นพี่น้องและพลังความสามัคคี', phonetic: 'Khwam pen phee nong', example: 'ความสามัคคีของผู้หญิงสร้างพลังที่ยิ่งใหญ่' },
        fr: { word: 'Sororité et Solidarité', phonetic: '/sɔ.ʁɔ.ʁi.te/', example: 'La sororité donne le courage de se faire entendre.' },
        de: { word: 'Schwesternschaft & Solidarität', phonetic: '/ˈʃvɛstɐnʃaft/', example: 'Solidarität unter Frauen verändert Systeme.' },
        ko: { word: '자매애와 연대', phonetic: 'Jamaeae-wa yeondae', example: '자매애를 통해 우리는 더 강해집니다.' }
      }
    },
    {
      id: 'v_fem_03',
      category: 'feminism',
      level: 'Empowerment',
      translations: {
        en: { word: 'Gender Equality', phonetic: '/ˈdʒen.dər iˈkwɒl.ə.ti/', example: 'Gender equality is a fundamental human right for everyone.' },
        my: { word: 'ကျား/မ တန်းတူညီမျှရေး', phonetic: 'Kyar-ma tan-tu-nyi-hmya-yei', example: 'ကျား/မ တန်းတူညီမျှမှုသည် လူ့အခွင့်အရေး၏ အခြေခံစံနှုန်းဖြစ်ပါတယ်။' },
        ja: { word: 'ジェンダー平等', phonetic: 'Jendā byōdō', example: 'ジェンダー平等は持続可能な未来への必須条件です。' },
        zh: { word: '性别平等', phonetic: 'Xìngbié píngděng', example: '性别平等是每个人最基本的权利。' },
        th: { word: 'ความเท่าเทียมทางเพศ', phonetic: 'Khwam thao thiam thang phet', example: 'ความเท่าเทียมทางเพศคือสิทธิมนุษยชนขั้นพื้นฐาน' },
        fr: { word: 'Égalité des genres', phonetic: '/e.ɡa.li.te de ʒɑ̃ʁ/', example: 'L'égalité des genres profite à toute la société.' },
        de: { word: 'Geschlechtergerechtigkeit', phonetic: '/ɡəˈʃlɛçtɐɡəˌʁɛçtɪçkaɪt/', example: 'Geschlechtergerechtigkeit ist ein Menschenrecht.' },
        ko: { word: '성평등', phonetic: 'Seong-pyeong-deung', example: '성평등은 더 나은 사회를 위한 필수 조건입니다.' }
      }
    },
    {
      id: 'v_fem_04',
      category: 'feminism',
      level: 'Empowerment',
      translations: {
        en: { word: 'Bodily Autonomy & Consent', phonetic: '/kənˈsent/', example: 'Every person has the sovereign right to bodily autonomy and consent.' },
        my: { word: 'ကိုယ်ပိုင်လွတ်လပ်ခွင့်နှင့် သဘောတူခွင့်ပြုချက်', phonetic: 'Ko-paing lut-lat-khwet', example: 'မိမိခန္ဓာကိုယ်နှင့် စိတ်ဆန္ဒအပေါ် ကိုယ်တိုင်ဆုံးဖြတ်ခွင့်သည် အလွန်အရေးကြီးပါတယ်။' },
        ja: { word: '身体的自己決定権と同意', phonetic: 'Dōi to ketteiken', example: 'からだと心の自己決定権は尊重されなければなりません。' },
        zh: { word: '身体自主权与知情同意', phonetic: 'Shēntǐ zìzhǔquán yǔ tóngyì', example: '身体自主权是不可剥夺的基本权利。' },
        th: { word: 'การยินยอมและความเป็นเจ้าของในร่างกาย', phonetic: 'Karn yin-yom', example: 'ทุกคนมีสิทธิ์ตัดสินใจในร่างกายของตนเอง' },
        fr: { word: 'Autonomie corporelle et consentement', phonetic: '/kɔ̃.sɑ̃t.mɑ̃/', example: 'Le consentement est la base de tout respect.' },
        de: { word: 'Körperliche Selbstbestimmung', phonetic: '/kœʁpɐlɪçə/', example: 'Einvernehmlichkeit und Respekt stehen an erster Stelle.' },
        ko: { word: '신체적 자율권과 동의', phonetic: 'Sinchejeok jayul-gwon-gwa dong-ui', example: '자신의 몸에 대한 결정권은 누구에게나 있습니다.' }
      }
    },

    // --- SELF-LOVE & DAILY AFFIRMATIONS (မိမိကိုယ်ကို ယုံကြည်မှုနှင့် စိတ်ခွန်အား) ---
    {
      id: 'v_aff_01',
      category: 'affirmations',
      level: 'Daily Confidence',
      translations: {
        en: { word: 'I am confident and worthy', phonetic: '/ˈkɒn.fɪ.dənt/', example: 'I am confident in my abilities, and I am worthy of all good things.' },
        my: { word: 'ငါသည် မိမိကိုယ်ကို ယုံကြည်ပြီး တန်ဖိုးရှိသည်', phonetic: 'Nga-thei ko-ko yone-kyi-thei', example: 'ငါ့ရဲ့ စွမ်းရည်တွေကို ငါယုံကြည်တယ်၊ ငါဟာ တန်ဖိုးရှိတဲ့ မိန်းကလေးတစ်ယောက်ပါ။' },
        ja: { word: '私は自分に自信と価値がある', phonetic: 'Watashi wa jishin ga aru', example: '私は自分の強さを信じ、胸を張って歩みます。' },
        zh: { word: '我充满自信与价值', phonetic: 'Wǒ chōngmǎn zìxìn yǔ jiàzhí', example: '我有独特的闪光点，我值得一切美好。' },
        th: { word: 'ฉันมั่นใจและมีคุณค่าในตัวเอง', phonetic: 'Chan man-jai lae mee khun-kha', example: 'ฉันภาคภูมิใจในตัวตนและเชื่อมั่นในพลังของฉัน' },
        fr: { word: 'J'ai confiance en moi et j'ai de la valeur', phonetic: '/kɔ̃.fjɑ̃s/', example: 'J'ai toute confiance en mes capacités.' },
        de: { word: 'Ich bin selbstbewusst und wertvoll', phonetic: '/ˈzɛlpstbəˌvʊst/', example: 'Ich vertraue meiner inneren Stärke.' },
        ko: { word: '나는 자신감 있고 소중한 존재다', phonetic: 'Naneun jasinsogam issgo sojunghan jonjaeda', example: '나는 내 모습 그대로 소중하고 당당합니다.' }
      }
    },
    {
      id: 'v_aff_02',
      category: 'affirmations',
      level: 'Daily Confidence',
      translations: {
        en: { word: 'My voice deserves to be heard', phonetic: '/vɔɪs dɪˈzɜːvz/', example: 'I speak with clarity, truth, and conviction. My voice deserves to be heard.' },
        my: { word: 'ငါ့ရဲ့ စကားသံသည် အဖိုးတန်သည်', phonetic: 'Nga sakar-than thee a-hpo-tan-thei', example: 'ငါပြောတဲ့ စကားတွေဟာ အဓိပ္ပာယ်ရှိတယ်၊ ငါ့အသံကို လူတွေ လေးစားနားထောင်ထိုက်ပါတယ်။' },
        ja: { word: '私の声には力がある', phonetic: 'Watashi no koe ni wa chikara ga aru', example: '私の意見には価値があり、遠慮する必要はありません。' },
        zh: { word: '我的声音值得被倾听', phonetic: 'Wǒ de shēngyīn zhídé bèi qīngtīng', example: '勇敢表达自己，我的想法无比重要。' },
        th: { word: 'เสียงและความคิดของฉันมีคุณค่า', phonetic: 'Siang khong chan mee khun-kha', example: 'ฉันกล้าพูดและแสดงออกอย่างมั่นใจ' },
        fr: { word: 'Ma voix mérite d'être entendue', phonetic: '/vwa me.ʁit/', example: 'Mes opinions comptent et méritent d'être partagées.' },
        de: { word: 'Meine Stimme zählt', phonetic: '/ˈʃtɪmə tsɛːlt/', example: 'Ich habe das Recht, meine Meinung klar zu äußern.' },
        ko: { word: '내 목소리는 존중받을 자격이 있다', phonetic: 'Nae moksorineun jonjung badeul jagyeogi issda', example: '내 생각과 목소리는 소중하고 힘이 있습니다.' }
      }
    },

    // --- WOMEN IN CAREER & ASSERTIVE LEADERSHIP (ခေါင်းဆောင်မှုနှင့် အလုပ်အကိုင်) ---
    {
      id: 'v_lead_01',
      category: 'leadership',
      level: 'Career & STEM',
      translations: {
        en: { word: 'Assertive Communication', phonetic: '/əˈsɜː.tɪv kəˌmjuː.nɪˈkeɪ.ʃən/', example: 'She leads team meetings with assertive, respectful communication.' },
        my: { word: 'ယုံကြည်မှုရှိရှိ ပြတ်သားစွာ ပြောဆိုခြင်း', phonetic: 'Pyat-thar-swar pyaw-so-jin', example: 'မိမိအမြင်ကို အားနာကြောက်ရွံ့ခြင်းမရှိဘဲ ယဉ်ကျေးပြတ်သားစွာ ဖော်ထုတ်ပြောဆိုရပါမယ်။' },
        ja: { word: 'アサーティブ・コミュニケーション', phonetic: 'Asātibu komyunikēshon', example: '相手を尊重しながら、自分の意見を率直に伝えます。' },
        zh: { word: '坚定而自信的沟通', phonetic: 'Jiāndìng ér zìxìn de gōutōng', example: '以从容自信的姿态表达专业观点。' },
        th: { word: 'การสื่อสารอย่างมั่นใจและสร้างสรรค์', phonetic: 'Karn seu-sarn yang man-jai', example: 'แสดงความคิดเห็นอย่างสุภาพและหนักแน่นในที่ทำงาน' },
        fr: { word: 'Communication assertive', phonetic: '/a.sɛʁ.tiv/', example: 'Exprimer ses idées avec clarté et assurance.' },
        de: { word: 'Durchsetzungsstarke Kommunikation', phonetic: '/dʊʁçˈzɛtsʊŋsˌʃtaʁk/', example: 'Klar, respektvoll und souverän auftreten.' },
        ko: { word: '당당하고 명확한 소통', phonetic: 'Dangdanghago myeonghwak-han sotong', example: '회의에서 자신의 의견을 자신 있게 제시합니다.' }
      }
    },
    {
      id: 'v_lead_02',
      category: 'leadership',
      level: 'Career & STEM',
      translations: {
        en: { word: 'Salary Negotiation & Fair Pay', phonetic: '/ˈsæl.ər.i nɪˌɡəʊ.ʃiˈeɪ.ʃən/', example: 'Women deserve equal pay for equal work, without compromise.' },
        my: { word: 'ထိုက်တန်သော လစာငွေ ညှိနှိုင်းတောင်းဆိုခြင်း', phonetic: 'La-sar nyi-hnaing-jin', example: 'ကိုယ့်ရဲ့ ကျွမ်းကျင်မှုနဲ့ အားထုတ်မှုအတွက် ထိုက်တန်တဲ့ လုပ်ခလစာကို တောင်းဆိုပိုင်ခွင့်ရှိပါတယ်။' },
        ja: { word: '給与交渉と同一賃金', phonetic: 'Kyūyo kōshō', example: '同一労働同一賃金を求め、堂々と給与交渉に臨みます。' },
        zh: { word: '薪酬协商与同工同酬', phonetic: 'Xīnchóu xiéshāng', example: '每一份才华与劳动都应获得公正匹配的报酬。' },
        th: { word: 'การเจรจาเงินเดือนอย่างเท่าเทียม', phonetic: 'Karn jera-ja ngern-duean', example: 'เรียกร้องค่าตอบแทนที่เหมาะสมกับความสามารถ' },
        fr: { word: 'Négociation salariale et égalité', phonetic: '/ne.ɡɔ.sja.sjɔ̃/', example: 'À travail égal, salaire égal pour toutes les femmes.' },
        de: { word: 'Gehaltsverhandlung & Entgeltgleichheit', phonetic: '/ɡəˈhaltsvɛɐ̯ˌhandlʊŋ/', example: 'Faire Bezahlung für erstklassige Leistung.' },
        ko: { word: '연봉 협상과 공정한 보상', phonetic: 'Yeonbong hyeopsang', example: '자신의 역량에 걸맞은 정당한 보상을 당당히 요구합니다.' }
      }
    },

    // --- SOLO FEMALE TRAVELER & SAFETY (တစ်ဦးတည်း ခရီးသွား မိန်းကလေးများအတွက် ဘေးကင်းလုံခြုံရေး) ---
    {
      id: 'v_safe_01',
      category: 'safety',
      level: 'Travel Safety',
      translations: {
        en: { word: 'Please respect my personal space', phonetic: '/ˈpɜː.sən.əl speɪs/', example: 'Excuse me, please take a step back and respect my personal space.' },
        my: { word: 'ကျေးဇူးပြုပြီး ကျွန်မရဲ့ ကိုယ်ပိုင်နယ်ပယ်ကို လေးစားပါ', phonetic: 'Kyun-ma ko-paing nae-pae lay-sar-ba', example: 'ခွင့်မပြုဘဲ မနီးကပ်ပါနဲ့၊ ကိုယ်ပိုင်နယ်ပယ်ကို လေးစားပေးပါ။' },
        ja: { word: 'パーソナルスペースを空けてください', phonetic: 'Pāsonaru supēsu o akete kudasai', example: 'すみません、少し離れていただけますか？' },
        zh: { word: '请保持礼貌距离 / 请尊重个人空间', phonetic: 'Qǐng bǎochí jùlí', example: '请退后一步，请尊重我的个人界限。' },
        th: { word: 'กรุณาเว้นระยะห่างและให้เกียรติด้วยครับ/ค่ะ', phonetic: 'Ka-ru-na wen ra-ya-hang', example: 'ขอโทษนะคะ ช่วยถอยออกไปหน่อยค่ะ' },
        fr: { word: 'Veuillez respecter mon espace personnel', phonetic: '/ɛs.pas pɛʁ.sɔ.nɛl/', example: 'Pardon, merci de garder vos distances.' },
        de: { word: 'Bitte respektieren Sie meinen Abstand', phonetic: '/ˈapˌʃtant/', example: 'Bitte treten Sie einen Schritt zurück.' },
        ko: { word: '개인 공간을 지켜주세요', phonetic: 'Gaein gong-gan-eul jikyeojuseyo', example: '죄송하지만 조금만 물러서 주시겠어요?' }
      }
    },
    {
      id: 'v_safe_02',
      category: 'safety',
      level: 'Travel Safety',
      translations: {
        en: { word: 'Women-only Carriage / Safe Zone', phonetic: '/ˈwɪm.ɪn ˈəʊn.li/', example: 'Where is the designated women-only subway carriage?' },
        my: { word: 'အမျိုးသမီးသီးသန့် တွဲ / လုံခြုံရေးဇုန်', phonetic: 'A-myo-tha-mee thee-than', example: 'အမျိုးသမီးသီးသန့် ရထားတွဲ ဘယ်ဘက်မှာ ရှိပါသလဲရှင်။' },
        ja: { word: '女性専用車両 (じょせいせんようしゃりょう)', phonetic: 'Josei sen'yō sharyō', example: '女性専用車両は何号車ですか？' },
        zh: { word: '女性专用车厢 / 女性安全区', phonetic: 'Nǚxìng zhuānyòng chēxiāng', example: '请问女性专用车厢在几号站台？' },
        th: { word: 'ตู้โดยสารเฉพาะสุภาพสตรี', phonetic: 'Dtoo doy-sarn cha-phor su-phap satree', example: 'ตู้รถไฟเฉพาะผู้หญิงอยู่ตรงไหนคะ?' },
        fr: { word: 'Espace sécurisé réservé aux femmes', phonetic: '/ɛs.pas se.ky.ʁi.ze/', example: 'Où se situe l'espace sécurisé pour les voyageuses ?' },
        de: { word: 'Frauen-Schutzzone / Frauenabteil', phonetic: '/ˈfʁaʊ̯ən.apˌtaɪ̯l/', example: 'Gibt es einen gesonderten Bereich für alleinreisende Frauen?' },
        ko: { word: '여성 전용 칸 / 여성 안심 구역', phonetic: 'Yeoseong jeon-yong kan', example: '여성 전용 지하철 칸은 어디에 있나요?' }
      }
    },

    // --- SISTERHOOD, COMPLIMENTS & WELLNESS (ချစ်ကြည်ရင်းနှီးမှု၊ အလှအပနှင့် ကျန်းမာရေး) ---
    {
      id: 'v_sis_01',
      category: 'sisterhood',
      level: 'Friendship & Care',
      translations: {
        en: { word: 'You are radiant and inspiring!', phonetic: '/ˈreɪ.di.ənt/', example: 'You look absolutely radiant today, and your energy inspires everyone around you!' },
        my: { word: 'မင်း အရမ်းလှပြီး စိတ်ခွန်အားဖြစ်စေတယ်!', phonetic: 'Min a-yan hla-thei', example: 'ဒီနေ့ နင့်ရဲ့ အပြုံးက အရမ်းတောက်ပပြီး အားလုံးကို အင်အားဖြစ်စေတယ်!' },
        ja: { word: '輝いていて、とても素敵です！', phonetic: 'Kagayaite ite, suteki desu', example: '今日のあなたの笑顔は周りを明るく元気づけてくれます！' },
        zh: { word: '你今天容光焕发，太有魅力了！', phonetic: 'Nǐ jīntiān róngguāng huànfā', example: '你的积极和善良给每个人带来了力量！' },
        th: { word: 'เธอดูเปล่งประกายและสดใสมากเลย!', phonetic: 'Ther doo pleng pra-gai maak', example: 'รอยยิ้มของเธอทำให้ทุกคนมีความสุข' },
        fr: { word: 'Tu es rayonnante et inspirante !', phonetic: '/ʁɛ.jɔ.nɑ̃t/', example: 'Ton énergie positive illumine toute la pièce !' },
        de: { word: 'Du strahlst so viel Lebensfreude aus!', phonetic: '/ʃtʁaːlst/', example: 'Deine Stärke und Herzlichkeit inspirieren mich jeden Tag.' },
        ko: { word: '오늘 정말 빛나고 멋져요!', phonetic: 'Oneul jeongmal bitnago meosjyeoyo', example: '당신의 밝은 에너지는 주변 사람들에게 큰 힘이 됩니다!' }
      }
    }
  ],

  // 2. Grammar Lessons Tailored for Women & Girls
  grammar: [
    {
      id: 'g_fem_01',
      language: 'en',
      title: 'Assertive Communication: Replacing Over-Apologies',
      level: 'Empowered English / Professional',
      burmeseExplanation: 'လူမှုအသိုင်းအဝိုင်းများစွာတွင် အမျိုးသမီးများသည် မလိုအပ်ဘဲ ခွင့်လွှတ်တောင်းပန်စကား (Excessive apologies) မကြာခဏ အသုံးပြုလေ့ရှိကြပါတယ်။ မိမိကိုယ်ကို ယုံကြည်မှုရှိသော ခေါင်းဆောင်တစ်ဦးအဖြစ် ပြောဆိုရာတွင် "Sorry for being late" အစား ကျေးဇူးတင်စကားဖြစ်သော "Thank you for your patience" ဟု ပြောင်းလဲသုံးခြင်းဖြင့် မိမိ၏ အဆင့်အတန်းနှင့် အခွင့်အာဏာ (Agency) ကို ခိုင်မာစေပါတယ်။',
      englishExplanation: 'Research shows women are socialized to over-apologize, which inadvertently diminishes perceived authority. In professional environments, transform defensive apologies into assertive gratitude. Instead of saying "Sorry to interrupt," use "I have an important point to add." Instead of "Sorry for the delay," say "Thank you for waiting."',
      formula: 'Replace [Defensive Apology: "Sorry..."] ➔ [Assertive Leadership: "Thank you for..."]',
      examples: [
        {
          target: 'Thank you for waiting, let us begin. (Instead of: Sorry I am late)',
          meaningMy: 'စောင့်ဆိုင်းပေးတဲ့အတွက် ကျေးဇူးတင်ပါတယ်၊ စတင်ကြရအောင်။',
          meaningEn: 'Projecting composure and mutual respect without defensiveness.'
        },
        {
          target: 'I would like to contribute a perspective on this. (Instead of: Sorry to bother you)',
          meaningMy: 'ဒီအကြောင်းအရာနဲ့ ပတ်သက်ပြီး ကျွန်မရဲ့ အမြင်တစ်ခု မျှဝေပေးလိုပါတယ်။',
          meaningEn: 'Asserting entitlement to share expertise in collaborative discussions.'
        }
      ],
      culturalTip: 'မိမိအမှားမဟုတ်ဘဲ တောင်းပန်စကား သုံးခြင်းကို ရှောင်ကြဉ်ပါ။ ကျေးဇူးတင်စကားဖြင့် စတင်ခြင်းသည် ဆွေးနွေးပွဲကို ပိုမိုအပြုသဘောဆောင်စေပါသည်။'
    },
    {
      id: 'g_fem_02',
      language: 'ja',
      title: 'Japanese Feminine Particles (わ・よ・ね) and Modern Agency',
      level: 'JLPT N4–N3 / Japanese Nuances',
      burmeseExplanation: 'ဂျပန်ဘာသာတွင် ရှေးရိုးစွဲ အမျိုးသမီးသုံး စကားအဆုံးသတ်များ (Female speech / 女性語) ဖြစ်သည့် 「〜わ (wa)」「〜かしら (kashira)」 စသည်တို့ ရှိသော်လည်း၊ ခေတ်သစ် တိုကျိုလုပ်ငန်းခွင်တွင် အမျိုးသမီးများသည် မိမိကိုယ်ကို ပိုမိုယုံကြည်ပြတ်သားသော အသုံးအနှုန်းများ (Assertive Desu/Masu + よ/ね) ဖြင့် ပေါင်းစပ်ပြောဆိုကြပါတယ်။ ဤသင်ခန်းစာသည် ရင်းနှီးနွေးထွေးမှုနှင့် ပရော်ဖက်ရှင်နယ် ဆန်မှုကို မျှတစွာ အသုံးပြုပုံကို ရှင်းပြပေးပါသည်။',
      englishExplanation: 'Traditional Japanese linguistics categorized explicit "feminine speech" particles like わ (wa) or かしら (kashira). Modern Japanese women, however, balance warm social connection with clear intellectual authority using polite endings (〜です / 〜ます) paired with confirmatory particles (ね / よ) rather than submissive softeners.',
      formula: '[Statement] + と思います (I think/believe) OR [Proposal] + しませんか (Shall we?)',
      examples: [
        {
          target: '私の考えでは、この方法が最も効果的だと思います。(Watashi no kangae dewa, kono hōhō ga mottomo kōkateki da to omoimasu.)',
          meaningMy: 'ကျွန်မရဲ့ အမြင်အရတော့ ဒီနည်းလမ်းက အထိရောက်ဆုံး ဖြစ်မယ်လို့ ယူဆပါတယ်ရှင်။',
          meaningEn: 'In my professional view, I believe this approach is the most effective.'
        },
        {
          target: '一緒にプロジェクトを成功させましょうね！(Issho ni purojekuto o seikō sasemashō ne!)',
          meaningMy: 'ပရောဂျက်ကို အတူတူ အောင်မြင်အောင် လုပ်ဆောင်ကြရအောင်နော်!',
          meaningEn: 'Let us make this project a great success together!'
        }
      ],
      culturalTip: 'ယနေ့ခေတ် ဂျပန်အမျိုးသမီး ခေါင်းဆောင်များသည် မိမိကိုယ်ကို နှိမ့်ချလွန်းခြင်းမရှိဘဲ ယုံကြည်မှုအပြည့်ဖြင့် ရင်ဆိုင်ပြောဆိုကြပါသည်။'
    },
    {
      id: 'g_fem_03',
      language: 'th',
      title: 'Thai Female Polite Particles: ค่ะ (Statement) vs คะ (Question)',
      level: 'Thai Essentials for Women',
      burmeseExplanation: 'ထိုင်းစကားတွင် အမျိုးသမီးတိုင်း မဖြစ်မနေ သိထားရမည့် အသံထွက် ကွဲပြားမှု ၂ ခု ရှိပါတယ်။ ဝါကျအဆုံး သာမန်ပြောဆိုခြင်း သို့မဟုတ် အတည်ပြုခြင်းတွင် အသံနိမ့် 「ค่ะ (khà)」 ကို သုံးပြီး၊ မေးခွန်းမေးခြင်း သို့မဟုတ် ခေါ်ဝေါ်ရာတွင် အသံမြင့် 「คะ (khá)」 ကို သုံးရပါတယ်။ ဤအသံထွက်များကို မှန်ကန်စွာ သုံးစွဲခြင်းဖြင့် ဆွဲဆောင်မှုရှိပြီး စမတ်ကျသော မိန်းကလေးတစ်ယောက်အဖြစ် ပေါ်လွင်စေပါတယ်။',
      englishExplanation: 'Thai female speakers use tone-distinguished polite particles. For statements, agreements, and greetings, use falling tone ค่ะ (khà). For questions and polite address, use high tone คะ (khá). Mixing these up is a common beginner pitfall; mastering them conveys elegance, intelligence, and poise.',
      formula: 'Statement: [Phrase] + ค่ะ (khà)  |  Question: [Question] + คะ (khá)?',
      examples: [
        {
          target: 'ยินดีที่ได้รู้จักค่ะ (Yin-dee tee dai roo-jak khà)',
          meaningMy: 'တွေ့ဆုံရတာ ဝမ်းသာပါတယ်ရှင် (အမျိုးသမီးသုံး စကားပြောအဆုံးသတ်)။',
          meaningEn: 'Pleased to meet you (Spoken by female, statement ค่ะ).'
        },
        {
          target: 'ห้องน้ำไปทางไหนคะ? (Hong-nam pai thang nai khá?)',
          meaningMy: 'အိမ်သာ ဘယ်ဘက်မှာ ရှိပါသလဲရှင်? (မေးခွန်းအသံထွက် คะ)',
          meaningEn: 'Where is the restroom, please? (Spoken by female, question คะ).'
        }
      ],
      culturalTip: 'ထိုင်းလူမျိုးအမျိုးသမီးငယ်များသည် လက်အုပ်ချီ ဝေ (Wai) ပြုလုပ်ပြီး ဤစကားလုံးများကို လှပစွာ ရွတ်ဆိုလေ့ရှိပါသည်။'
    },
    {
      id: 'g_fem_04',
      language: 'my',
      title: 'Burmese Politeness & Female Agency: ကျွန်မ / ညီမ / တို့',
      level: 'Burmese Foundation',
      burmeseExplanation: 'မြန်မာစကားတွင် အမျိုးသမီးများ မိမိကိုယ်ကို ရည်ညွှန်းရာတွင် အခြေအနေအလိုက် ပညာသားပါပါ ရွေးချယ်နိုင်ပါတယ်။ တရားဝင် အစည်းအဝေးများ၊ စာရေးသားရာတွင် 「ကျွန်မ (Kyun-ma)」 ကို ယုံကြည်မှုရှိရှိ အသုံးပြုပြီး၊ ရင်းနှီးသော မိတ်ဆွေ အပေါင်းအသင်းများတွင် 「ညီမ / တို့」 ကို ဖော်ရွေနွေးထွေးစွာ အသုံးပြုနိုင်ပါတယ်။ အရေးကြီးဆုံးမှာ မိမိကိုယ်ကို အားငယ်သိမ်ငယ်သော လေသံမပါဘဲ လေးစားကြည်ညိုဖွယ် ဖြစ်စေရန် ဖြစ်ပါတယ်။',
      englishExplanation: 'In Burmese culture, female self-referential pronouns carry deep social warmth and dignity. "ကျွန်မ (Kyun-ma)" is the standard dignified formal pronoun for women in academic, legal, and professional settings, while "ညီမ (Nyi-ma - younger sister)" conveys endearing sisterhood among peers.',
      formula: 'ကျွန်မ (Kyun-ma) + [အကြောင်းအရာ] + ပါတယ် (ba-de)',
      examples: [
        {
          target: 'ကျွန်မ ဒီအစီအစဉ်ကို တာဝန်ယူ ဆောင်ရွက်ပါမယ်ရှင်။',
          meaningMy: 'ကျွန်မ ကိုယ်တိုင် ဦးဆောင်ပြီး တာဝန်ယူပါမယ် (ယုံကြည်မှုအပြည့်ရှိသော ခေါင်းဆောင်မှု)။',
          meaningEn: 'I will take personal leadership and ownership of this initiative.'
        },
        {
          target: 'ညီမတို့ အတူတူ ကြိုးစားကြမယ်နော်!',
          meaningMy: 'မိန်းကလေး အချင်းချင်း အားပေးသော ညီအစ်မချစ်ကြည်ရေး စကား။',
          meaningEn: 'Let us work together and cheer each other on, sisters!'
        }
      ],
      culturalTip: 'မြန်မာအမျိုးသမီးများသည် သမိုင်းတစ်လျှောက် ကိုယ်ပိုင်အမည်နှင့် ကိုယ်ပိုင်ဂုဏ်သိက္ခာကို လွတ်လပ်စွာ ထိန်းသိမ်းနိုင်ခဲ့သော ရိုးရာဓလေ့ရှိပါသည်။'
    }
  ],

  // 3. Empowering Quizzes & Listening Challenges
  quizzes: [
    {
      id: 'q_fem_01',
      language: 'en',
      type: 'mcq',
      topic: 'Empowered Communication',
      question: 'Which of the following phrases is the most assertive, professional alternative to "Sorry for being late"?',
      options: [
        '"I am terribly sorry, I always mess up with time."',
        '"Thank you for your patience; let us get right to the agenda."',
        '"Please forgive me, I hope you are not mad."',
        '"Sorry again, so sorry!"'
      ],
      answerIndex: 1,
      explanation: '"Thank you for your patience" shifts the focus to appreciation and respect without undermining your professional authority.'
    },
    {
      id: 'q_fem_02',
      language: 'ja',
      type: 'listening',
      topic: 'Travel Safety in Japan',
      audioText: '女性専用車両は何号車ですか',
      question: 'Listen to the audio. What is the female traveler inquiring about at the Tokyo station?',
      options: [
        'Which platform is for the bullet train (Shinkansen)?',
        'Where is the women-only subway carriage located?',
        'What time does the last train depart?',
        'Where can I purchase a ticket?'
      ],
      answerIndex: 1,
      explanation: 'The sentence was "女性専用車両は何号車ですか" (Josei sen'yō sharyō wa nan-gōsha desu ka?), asking for the women-only train car number.'
    },
    {
      id: 'q_fem_03',
      language: 'th',
      type: 'mcq',
      topic: 'Thai Politeness for Women',
      question: 'When asking a question politely in Thai as a female speaker, which particle should be placed at the very end?',
      options: [
        'ครับ (Khrap - male statement)',
        'ค่ะ (Khà - female statement)',
        'คะ (Khá - female question)',
        'ไหม (Mai - question word alone)'
      ],
      answerIndex: 2,
      explanation: 'For female speakers asking questions or calling out politely, the high-tone "คะ (khá)" is the correct and elegant choice.'
    },
    {
      id: 'q_fem_04',
      language: 'my',
      type: 'mcq',
      topic: 'Sisterhood & Empowerment',
      question: 'မြန်မာဘာသာဖြင့် "မိန်းကလေးများ၏ စွမ်းရည်မြှင့်တင်မှု" ကို အင်္ဂလိပ်လို အတိအကျ မည်သို့ခေါ်ဆိုသနည်း။',
      options: [
        'Women's Empowerment',
        'Women's Employment',
        'Women's Entertainment',
        'Women's Environment'
      ],
      answerIndex: 0,
      explanation: '"Women's Empowerment" သည် အမျိုးသမီးများ၏ လုပ်ပိုင်ခွင့်၊ ဆုံးဖြတ်ခွင့်နှင့် စွမ်းဆောင်ရည်မြှင့်တင်မှုကို ဖော်ညွှန်းသည့် ဝေါဟာရဖြစ်ပါသည်။'
    }
  ],

  // 4. Multilingual Dictionary (Integrated with EMDictionary & Lexical Open Datasets)
  dictionary: [
    {
      id: 'd_empower',
      term: 'Empower / Empowerment',
      pos: 'verb / noun',
      ipa: '/ɪmˈpaʊ.ər/',
      source: 'EMDictionary & Lexiverse',
      translations: {
        en: 'Empower: To give power, legal authority or confidence to somebody.',
        my: 'လုပ်ပိုင်ခွင့်အာဏာပေးသည်။ စွမ်းရည်မြှင့်တင်ပေးသည်။',
        ja: '力を与える、自立を促す、エンパワーメント',
        zh: '赋权、使能够、赋予力量 (Fùquán)',
        th: 'ให้อำนาจ, เสริมสร้างพลังความสามารถ',
        fr: 'Rendre autonome, autonomiser, émanciper',
        de: 'Ermächtigen, stärken, befähigen',
        ko: '권한을 주다, 역량을 강화하다'
      },
      example: 'Education empowers girls to become leaders of tomorrow.'
    },
    {
      id: 'd_sisterhood',
      term: 'Sisterhood',
      pos: 'noun',
      ipa: '/ˈsɪs.tə.hʊd/',
      source: 'EMDictionary & Wordlists',
      translations: {
        en: 'The feeling of kinship and mutual support among women.',
        my: 'ညီအစ်မအချင်းချင်း စည်းလုံးညီညွတ်မှုနှင့် မေတ္တာတရား။',
        ja: '女性同士の連帯、シスターフッド (Shisutāhuddo)',
        zh: '姐妹情谊、女性间的守望互助 (Jiěmèi qíngyì)',
        th: 'ความเป็นพี่น้องของผู้หญิง, ความผูกพันของสตรี',
        fr: 'Sororité, solidarité féminine',
        de: 'Schwesternschaft, Solidarität unter Frauen',
        ko: '자매애, 여성들 간의 연대감'
      },
      example: 'In our sisterhood, we lift each other up rather than compete.'
    },
    {
      id: 'd_equality',
      term: 'Equality',
      pos: 'noun',
      ipa: '/iˈkwɒl.ə.ti/',
      source: 'EMDictionary (21,984 Entries Database)',
      translations: {
        en: 'The state of being equal, especially in status, rights, and opportunities.',
        my: 'တူညီသော အခွင့်အရေးရှိခြင်း။ တန်းတူညီမျှမှု။',
        ja: '平等 (びょうどう - Byōdō)',
        zh: '平等、同等权利 (Píngděng)',
        th: 'ความเท่าเทียมกัน, ความเสมอภาค',
        fr: 'Égalité',
        de: 'Gleichberechtigung, Gleichheit',
        ko: '평등 (Pyeong-deung)'
      },
      example: 'Gender equality is essential for a peaceful and prosperous world.'
    },
    {
      id: 'd_courage',
      term: 'Courage',
      pos: 'noun',
      ipa: '/ˈkʌr.ɪdʒ/',
      source: 'EMDictionary',
      translations: {
        en: 'The ability to do something that frightens one; bravery.',
        my: 'ရဲရင့်ခြင်း။ သတ္တိ။ စိတ်ခွန်အား။',
        ja: '勇気 (ゆうき - Yūki)',
        zh: '勇气、胆量 (Yǒngqì)',
        th: 'ความกล้าหาญ, จิตใจที่เด็ดเดี่ยว',
        fr: 'Courage, bravoure',
        de: 'Mut, Tapferkeit',
        ko: '용기 (Yong-gi)'
      },
      example: 'It takes courage to speak up for what is right.'
    },
    {
      id: 'd_freedom',
      term: 'Freedom & Liberty',
      pos: 'noun',
      ipa: '/ˈfriː.dəm/',
      source: 'EMDictionary',
      translations: {
        en: 'The power or right to act, speak, or think without hindrance.',
        my: 'လွတ်လပ်မှု။ လွတ်လပ်ခွင့်။ ကိုယ်ပိုင်ဆုံးဖြတ်ပိုင်ခွင့်။',
        ja: '自由 (じゆう - Jiyū)',
        zh: '自由 (Zìyóu)',
        th: 'อิสรภาพ, เสรีภาพ',
        fr: 'Liberté',
        de: 'Freiheit',
        ko: '자유 (Ja-yu)'
      },
      example: 'Freedom begins when you embrace your authentic self.'
    },
    {
      id: 'd_inspire',
      term: 'Inspire',
      pos: 'verb',
      ipa: '/ɪnˈspaɪər/',
      source: 'EMDictionary',
      translations: {
        en: 'To fill someone with the urge or ability to do or feel something creative.',
        my: 'စိတ်အားတက်ကြွစေသည်။ လှုံ့ဆော်သည်။ ခွန်အားပေးသည်။',
        ja: '鼓舞する、刺激を与える (Kobu suru)',
        zh: '启发、激励、鼓舞 (Jīlì)',
        th: 'สร้างแรงบันดาลใจ',
        fr: 'Inspirer, motiver',
        de: 'Inspirieren, beflügeln',
        ko: '영감을 주다, 격려하다'
      },
      example: 'Her resilience and passion inspire girls across Myanmar and the world.'
    },
    {
      id: 'd_voice',
      term: 'Voice',
      pos: 'noun',
      ipa: '/vɔɪs/',
      source: 'EMDictionary',
      translations: {
        en: 'The sound produced in a person's larynx; the right to express an opinion.',
        my: 'အသံ။ စကားသံ။ မိမိဆန္ဒသဘောထားကို ထုတ်ဖော်ပြောဆိုခွင့်။',
        ja: '声 (こえ - Koe)、発言権',
        zh: '声音、发言权 (Shēngyīn)',
        th: 'เสียง, สิทธิ์ในการออกเสียง',
        fr: 'Voix, droit de s'exprimer',
        de: 'Stimme, Mitspracherecht',
        ko: '목소리, 발언권'
      },
      example: 'Use your voice to lift up those who cannot speak for themselves.'
    },
    {
      id: 'd_radiant',
      term: 'Radiant',
      pos: 'adjective',
      ipa: '/ˈreɪ.di.ənt/',
      source: 'English-to-English Dictionary',
      translations: {
        en: 'Clearly emanating great joy, love, health, or beauty.',
        my: 'တောက်ပကြည်လင်သော။ ဝင်းလက်သော။ ကျက်သရေရှိသော။',
        ja: '輝くばかりの、晴れやかな (Kagayaku)',
        zh: '容光焕发的、灿烂的 (Róngguāng huànfā)',
        th: 'เปล่งปลั่ง, สดใสเจิดจ้า',
        fr: 'Rayonnant(e), éclatant(e)',
        de: 'Strahlend, leuchtend',
        ko: '빛나는, 환한'
      },
      example: 'Her smile was radiant with joy and confidence.'
    }
  ],

  // 5. Special Myanmar Female Names & Meanings Collection (from Myanmar_Names & MyanmarName-en-mm)
  femaleNamesCollection: [
    { nameMm: 'သဇင်', nameEn: 'Thazin', meaning: 'Royal orchid; symbol of purity, elegance, and unyielding grace.' },
    { nameMm: 'မေ', nameEn: 'May', meaning: 'Beloved daughter; sweet, gentle, and deeply cherished.' },
    { nameMm: 'ထက်', nameEn: 'Htet', meaning: 'Sharp, brilliant, outstanding, and visionary.' },
    { nameMm: 'ခင်', nameEn: 'Khin', meaning: 'Friendly, affectionate, kind-hearted, and welcoming.' },
    { nameMm: 'အေးအေး', nameEn: 'Aye Aye', meaning: 'Calm, serene, peaceful, and composed.' },
    { nameMm: 'သီတာ', nameEn: 'Thida', meaning: 'Cool, soothing freshwater stream; purity and calm.' },
    { nameMm: 'နန်း', nameEn: 'Nan', meaning: 'Palace, royalty; dignity, nobility, and high purpose.' },
    { nameMm: 'ရွှေရည်', nameEn: 'Shwe Yee', meaning: 'Golden liquid; precious, glowing, and radiant.' }
  ]
};
