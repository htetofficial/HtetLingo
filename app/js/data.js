// HtetLingo Core Multilingual Learning Dataset
// Covers: English (EN), Burmese (MY), Japanese (JA), Chinese (ZH), Thai (TH), French (FR), German (DE), Korean (KO)

window.HTET_DATA = {
  languages: [
    { code: 'en', name: 'English', native: 'English', flag: '🇺🇸', script: 'Latin' },
    { code: 'my', name: 'Burmese', native: 'မြန်မာဘာသာ', flag: '🇲🇲', script: 'Myanmar' },
    { code: 'ja', name: 'Japanese', native: '日本語', flag: '🇯🇵', script: 'Japanese (Kanji/Kana)' },
    { code: 'zh', name: 'Chinese', native: '中文', flag: '🇨🇳', script: 'Simplified Hanzi' },
    { code: 'th', name: 'Thai', native: 'ภาษาไทย', flag: '🇹🇭', script: 'Thai' },
    { code: 'fr', name: 'French', native: 'Français', flag: '🇫🇷', script: 'Latin' },
    { code: 'de', name: 'German', native: 'Deutsch', flag: '🇩🇪', script: 'Latin' },
    { code: 'ko', name: 'Korean', native: '한국어', flag: '🇰🇷', script: 'Hangul' }
  ],

  // 1. Vocabulary Database
  vocabulary: [
    // GREETINGS & ESSENTIALS
    {
      id: 'v_greet_01',
      category: 'greetings',
      level: 'Beginner',
      translations: {
        en: { word: 'Hello / Good day', phonetic: '/həˈloʊ/', example: 'Hello, how are you today?' },
        my: { word: 'မင်္ဂလာပါ', phonetic: 'Mingalaba', example: 'မင်္ဂလာပါ၊ နေကောင်းလားခင်ဗျာ။' },
        ja: { word: 'こんにちは', phonetic: 'Konnichiwa', example: 'こんにちは、お元気ですか？' },
        zh: { word: '你好', phonetic: 'Nǐ hǎo', example: '你好，最近好吗？' },
        th: { word: 'สวัสดี', phonetic: 'Sawatdee (khrap/ka)', example: 'สวัสดีครับ สบายดีไหมครับ?' },
        fr: { word: 'Bonjour', phonetic: '/bɔ̃.ʒuʁ/', example: 'Bonjour, comment allez-vous ?' },
        de: { word: 'Guten Tag', phonetic: '/ˌɡuːtn̩ ˈtaːk/', example: 'Guten Tag, wie geht es Ihnen?' },
        ko: { word: '안녕하세요', phonetic: 'Annyeonghaseyo', example: '안녕하세요, 잘 지내셨어요?' }
      }
    },
    {
      id: 'v_greet_02',
      category: 'greetings',
      level: 'Beginner',
      translations: {
        en: { word: 'Thank you very much', phonetic: '/ˈθæŋk juː/', example: 'Thank you very much for your help.' },
        my: { word: 'ကျေးဇူးတင်ပါတယ်', phonetic: 'Kyei-zu tin-ba-de', example: 'ကူညီပေးတဲ့အတွက် ကျေးဇူးတင်ပါတယ်။' },
        ja: { word: 'ありがとうございます', phonetic: 'Arigatō gozaimasu', example: '手伝ってくれてありがとうございます。' },
        zh: { word: '非常感谢', phonetic: 'Fēicháng gǎnxiè', example: '非常感谢您的帮助！' },
        th: { word: 'ขอบคุณมาก', phonetic: 'Khop khun maak', example: 'ขอบคุณมากสำหรับความช่วยเหลือครับ' },
        fr: { word: 'Merci beaucoup', phonetic: '/mɛʁ.si bo.ku/', example: 'Merci beaucoup pour votre aide.' },
        de: { word: 'Vielen Dank', phonetic: '/ˈfiːlən daŋk/', example: 'Vielen Dank für Ihre Hilfe.' },
        ko: { word: '대단히 감사합니다', phonetic: 'Daedan-hi gamsahamnida', example: '도와주셔서 대단히 감사합니다.' }
      }
    },
    {
      id: 'v_greet_03',
      category: 'greetings',
      level: 'Beginner',
      translations: {
        en: { word: 'Nice to meet you', phonetic: '/naɪs tuː miːt juː/', example: 'It is very nice to meet you.' },
        my: { word: 'တွေ့ရတာ ဝမ်းသာပါတယ်', phonetic: 'Twei-ya-da wun-tha-ba-de', example: 'အခုလို တွေ့ဆုံရတာ ဝမ်းသာပါတယ်။' },
        ja: { word: 'はじめまして / どうぞよろしく', phonetic: 'Hajimemashite', example: 'はじめまして、よろしくお願いいたします。' },
        zh: { word: '很高兴认识你', phonetic: 'Hěn gāoxìng rènshí nǐ', example: '很高兴认识你，我是迈克。' },
        th: { word: 'ยินดีที่ได้รู้จัก', phonetic: 'Yin-dee tee dai roo-jak', example: 'ยินดีที่ได้รู้จักครับ ผมชื่อจอห์นครับ' },
        fr: { word: 'Enchanté(e)', phonetic: '/ɑ̃.ʃɑ̃.te/', example: 'Enchanté de faire votre connaissance.' },
        de: { word: 'Schön, Sie kennenzulernen', phonetic: '/ʃøːn ziː/', example: 'Sehr schön, Sie kennenzulernen.' },
        ko: { word: '만나서 반갑습니다', phonetic: 'Mannaseo bangapseumnida', example: '처음 뵙겠습니다, 만나서 반갑습니다.' }
      }
    },

    // TRAVEL & TRANSPORT
    {
      id: 'v_travel_01',
      category: 'travel',
      level: 'Elementary',
      translations: {
        en: { word: 'Airport / Flight', phonetic: '/ˈeə.pɔːt / flaɪt/', example: 'Where is terminal 2 at the airport?' },
        my: { word: 'လေဆိပ် / လေယာဉ်ခရီးစဉ်', phonetic: 'Lei-zeik / Lei-yin', example: 'အပြည်ပြည်ဆိုင်ရာ လေဆိပ်ကို ဘယ်လိုသွားရမလဲ။' },
        ja: { word: '空港 / 飛行機', phonetic: 'Kūkō / Hikōki', example: '国際空港行きの電車はどれですか？' },
        zh: { word: '机场 / 航班', phonetic: 'Jīchǎng / Hángbān', example: '请问去航站楼怎么走？' },
        th: { word: 'สนามบิน / เที่ยวบิน', phonetic: 'Sa-naam-bin / Thiao-bin', example: 'สนามบินสุวรรณภูมิไปทางไหนครับ?' },
        fr: { word: 'Aéroport / Vol', phonetic: '/a.e.ʁɔ.pɔʁ/', example: 'Où se trouve le terminal des départs ?' },
        de: { word: 'Flughafen / Flug', phonetic: '/ˈfluːkˌhaːfn̩/', example: 'Wann startet der Flug nach Tokio?' },
        ko: { word: '공항 / 비행기', phonetic: 'Gonghang / Bihaenggi', example: '인천국제공항으로 가는 버스는 어디서 타나요?' }
      }
    },
    {
      id: 'v_travel_02',
      category: 'travel',
      level: 'Elementary',
      translations: {
        en: { word: 'Where is the train station?', phonetic: '/weər ɪz ðə treɪn/', example: 'Excuse me, where is the nearest station?' },
        my: { word: 'ဘူတာရုံ ဘယ်နားမှာလဲ', phonetic: 'Bu-ta-yon bae-na-hma-le', example: 'အနီးဆုံး မီးရထားဘူတာရုံ ဘယ်နားမှာလဲခင်ဗျာ။' },
        ja: { word: '駅はどこですか？', phonetic: 'Eki wa doko desu ka?', example: 'すみません、一番近い駅はどこですか？' },
        zh: { word: '地铁站/火车站 在哪里？', phonetic: 'Dìtiě zhàn zài nǎlǐ?', example: '请问最近的地铁站在哪里？' },
        th: { word: 'สถานีรถไฟอยู่ที่ไหน?', phonetic: 'Sa-tha-nee rot-fai yoo tee nai?', example: 'ขอโทษครับ สถานีรถไฟฟ้าไปทางไหนครับ?' },
        fr: { word: 'Où est la gare ?', phonetic: '/u ɛ la ɡaʁ/', example: 'Pardon, où se trouve la station de métro ?' },
        de: { word: 'Wo ist der Bahnhof?', phonetic: '/voː ɪst deːɐ̯ ˈbaːnˌhoːf/', example: 'Entschuldigung, wo ist die nächste U-Bahn?' },
        ko: { word: '지하철역이 어디에 있나요?', phonetic: 'Jihacheol-yeogi eodie issnayo?', example: '실례지만, 가장 가까운 기차역이 어디인가요?' }
      }
    },

    // FOOD & DINING
    {
      id: 'v_food_01',
      category: 'food',
      level: 'Beginner',
      translations: {
        en: { word: 'Delicious / Tasty', phonetic: '/dɪˈlɪʃ.əs/', example: 'This food is absolutely delicious!' },
        my: { word: 'အရသာရှိတယ် / စားကောင်းတယ်', phonetic: 'A-ya-tha shi-de', example: 'ဒီဟင်းလျာ အရမ်းအရသာရှိပါတယ်။' },
        ja: { word: 'おいしい / うまい', phonetic: 'Oishii / Umai', example: 'このラーメンは本当においしいです！' },
        zh: { word: '好吃 / 美味', phonetic: 'Hǎochī / Měiwèi', example: '这道菜非常好吃！' },
        th: { word: 'อร่อยมาก', phonetic: 'A-roy maak', example: 'อาหารจานนี้อร่อยมากๆ ครับ' },
        fr: { word: 'Délicieux / Bon', phonetic: '/de.li.sjø/', example: 'Ce repas est vraiment délicieux !' },
        de: { word: 'Lecker / Köstlich', phonetic: '/ˈlɛkɐ/', example: 'Das Essen schmeckt wirklich lecker!' },
        ko: { word: '맛있어요', phonetic: 'Mas-iss-eoyo', example: '이 음식은 정말 맛있어요!' }
      }
    },
    {
      id: 'v_food_02',
      category: 'food',
      level: 'Beginner',
      translations: {
        en: { word: 'Water, please', phonetic: '/ˈwɔː.tər pliːz/', example: 'Could we get two glasses of water, please?' },
        my: { word: 'ရေတစ်ခွက် ပေးပါဦး', phonetic: 'Yei tit-khwet pei-ba-ohn', example: 'သောက်ရေအေးတစ်ခွက်လောက် ပေးပါခင်ဗျာ။' },
        ja: { word: 'お水をください', phonetic: 'O-mizu o kudasai', example: 'すみません、お冷を一杯いただけますか？' },
        zh: { word: '请给我一杯水', phonetic: 'Qǐng gěi wǒ yī bēi shuǐ', example: '服务员，请给我们两杯温水。' },
        th: { word: 'ขอน้ำเปล่าครับ/ค่ะ', phonetic: 'Kho nam plao khrap', example: 'ขอน้ำดื่มสองแก้วด้วยครับ' },
        fr: { word: 'De l’eau, s’il vous plaît', phonetic: '/də lo sil vu plɛ/', example: 'Une carafe d’eau, s’il vous plaît.' },
        de: { word: 'Wasser, bitte', phonetic: '/ˈvasɐ ˈbɪtə/', example: 'Ein Glas stilles Wasser, bitte.' },
        ko: { word: '물 좀 주세요', phonetic: 'Mul jom juseyo', example: '여기 시원한 물 한 잔만 주세요.' }
      }
    },

    // BUSINESS & TECHNOLOGY
    {
      id: 'v_biz_01',
      category: 'business',
      level: 'Intermediate',
      translations: {
        en: { word: 'Meeting / Discussion', phonetic: '/ˈmiː.tɪŋ/', example: 'Let us schedule a meeting for tomorrow.' },
        my: { word: 'အစည်းအဝေး / ဆွေးနွေးပွဲ', phonetic: 'A-see-a-wei', example: 'မနက်ဖြန် မနက်ပိုင်း အစည်းအဝေးလုပ်ပါမယ်။' },
        ja: { word: '会議 / ミーティング', phonetic: 'Kaigi / Mītingu', example: '明日の午後、緊急の会議を開きます。' },
        zh: { word: '会议 / 商讨', phonetic: 'Huìyì / Shāngtǎo', example: '我们安排明天上午开个简会。' },
        th: { word: 'การประชุม', phonetic: 'Karn pra-choom', example: 'เรามีการประชุมสำคัญในวันพรุ่งนี้' },
        fr: { word: 'Réunion', phonetic: '/ʁe.y.njɔ̃/', example: 'Planifions une réunion pour la semaine prochaine.' },
        de: { word: 'Besprechung / Meeting', phonetic: '/bəˈʃpʁɛçʊŋ/', example: 'Können wir einen Termin vereinbaren?' },
        ko: { word: '회의 / 미팅', phonetic: 'Hoe-ui / Miting', example: '내일 오전 10시에 전략 회의가 있습니다.' }
      }
    }
  ],

  // 2. Comprehensive Grammar Modules
  grammar: [
    {
      id: 'g_ja_01',
      language: 'ja',
      title: 'Topic Marker 「は」 vs Subject Marker 「が」',
      level: 'JLPT N5 / Beginner',
      burmeseExplanation: 'ဂျပန်ဘာသာတွင် 「は (wa)」 သည် စကားပြောဆိုရာတွင် အဓိကပြောလိုသော အကြောင်းအရာ (Topic) ကို သတ်မှတ်ပြသပြီး၊ 「が (ga)」 သည် တိကျသော ကတ္တား (Subject) သို့မဟုတ် အသစ်စတင်ပြောပြသော အချက်အလက်ကို ဖော်ပြပေးပါသည်။',
      englishExplanation: 'In Japanese, 「は」(pronounced "wa") marks the overall topic that both speakers know, while 「が」(ga) marks specific new subjects, emphatic subjects, or grammatical subjects in subordinate clauses.',
      formula: '[Topic] は [Statement] です / [Subject] が [Action/Property]',
      examples: [
        {
          target: '私はミャンマー人です。(Watashi wa Myanmā-jin desu.)',
          meaningMy: 'ကျွန်တော်ကတော့ မြန်မာလူမျိုး ဖြစ်ပါတယ်။',
          meaningEn: 'As for me, I am Burmese.'
        },
        {
          target: '雨が降っています。(Ame ga futte imasu.)',
          meaningMy: 'မိုးရွာနေပါတယ်။ (မိုး ဆိုသော ဖြစ်စဉ်ကို အလေးပေးဖော်ပြ)',
          meaningEn: 'Rain is falling. (Emphasizing the subject rain)'
        }
      ],
      culturalTip: 'ဂျပန်ယဉ်ကျေးမှုအရ စကားစတင်မိတ်ဆက်ရာတွင် နှိမ့်ချသော အသုံးအနှုန်းများဖြင့် တွဲဖက်သုံးလေ့ရှိပါသည်။'
    },
    {
      id: 'g_zh_01',
      language: 'zh',
      title: 'Aspect Particle 「了」 (Completed Action & State Change)',
      level: 'HSK 1–2 / Beginner',
      burmeseExplanation: 'တရုတ်ဘာသာတွင် အင်္ဂလိပ်စာလို အတိတ်ကာလ ကြိယာပြောင်းလဲခြင်း (Past tense conjugation) မရှိပါ။ လုပ်ဆောင်မှု ပြီးမြောက်သွားခြင်း သို့မဟုတ် အခြေအနေသစ်တစ်ခုသို့ ပြောင်းလဲသွားခြင်းကို ဖော်ပြရန် 「了 (le)」 ကို ကြိယာနောက် သို့မဟုတ် ဝါကျအဆုံးတွင် ထည့်သွင်းအသုံးပြုရပါသည်။',
      englishExplanation: 'Mandarin does not conjugate verbs for tense. Instead, aspect particles like 「了 (le)」 indicate either a completed action (verb + 了) or a change of state (sentence final 了).',
      formula: '[Subject] + [Verb] + 了 + [Object]  OR  [Situation] + 了',
      examples: [
        {
          target: '我已经吃晚饭了。(Wǒ yǐjīng chī wǎnfàn le.)',
          meaningMy: 'ကျွန်တော် ညစာ စားပြီးသွားပါပြီ။',
          meaningEn: 'I have already eaten dinner.'
        },
        {
          target: '下雨了！(Xiàyǔ le!)',
          meaningMy: 'မိုးရွာလာပြီ! (အခြေအနေ ပြောင်းလဲသွားခြင်း)',
          meaningEn: 'It has started raining! (Change of situation)'
        }
      ],
      culturalTip: 'တရုတ်လူမျိုးများသည် နှုတ်ဆက်ရာတွင် "吃了吗？(ထမင်းစားပြီးပြီလား)" ဟု မကြာခဏ အသုံးပြုကြပြီး ရင်းနှီးမှုကို ပြသပါသည်။'
    },
    {
      id: 'g_my_01',
      language: 'my',
      title: 'Burmese Polite Sentence Enders: သည်/တယ်/ပါ/ခင်ဗျာ/ရှင်',
      level: 'Burmese Foundation',
      burmeseExplanation: 'မြန်မာစကားတွင် ဝါကျအဆုံး သတ်မှတ်ချက်များသည် အရေးအကြီးဆုံးဖြစ်ပြီး ယဉ်ကျေးမှု၊ ကျား/မ နှင့် စကားပြော/အရေး ပုံစံများကို ခွဲခြားပေးပါသည်။ စကားပြောတွင် 「တယ် / ပါတယ်」 ကို သုံး၍ အရေးတွင် 「သည် / ပါသည်」 ကို သုံးပါသည်။',
      englishExplanation: 'Burmese verbs sit at the end of the sentence (SOV: Subject-Object-Verb). Sentence final particles indicate politeness, mood, and formality: "de / ba-de" for spoken, "thee / ba-thee" for formal written.',
      formula: '[ကတ္တား] + [ကံ] + [ကြိယာ] + ပါတယ် (Spoken Polite)',
      examples: [
        {
          target: 'ကျွန်တော် ရေ သောက်ပါတယ်။ (Kyun-taw yei thauk-ba-de.)',
          meaningMy: 'ကျွန်တော် ရေသောက်ပါ၏။ (ယဉ်ကျေးသော စကားပြော)',
          meaningEn: 'I drink water (Polite male speech).'
        },
        {
          target: 'မင်္ဂလာပါရှင်။ (Mingalaba shin.)',
          meaningMy: 'အမျိုးသမီးများ ယဉ်ကျေးစွာ နှုတ်ဆက်ခြင်း။',
          meaningEn: 'Hello (Female speaker polite particle).'
        }
      ],
      culturalTip: 'ကျားဖြစ်ပါက "ခင်ဗျာ (khin-bya)"၊ မဖြစ်ပါက "ရှင် (shin)" ဟူသော စကားအဆုံးသတ်ကို သုံးခြင်းဖြင့် လေးစားမှုကို အထူးပြသနိုင်ပါသည်။'
    },
    {
      id: 'g_th_01',
      language: 'th',
      title: 'Polite Particles: ครับ (Khrap) vs ค่ะ/คะ (Kha)',
      level: 'Thai Essentials',
      burmeseExplanation: 'ထိုင်းစကားတွင် ဝါကျတိုင်း၏ နောက်ဆုံးတွင် ယဉ်ကျေးမှုပြ အသံအဆုံးစကားလုံးများကို မဖြစ်မနေ ထည့်သွင်းရပါသည်။ အမျိုးသားများက 「ครับ (khrap)」 ကို သုံးပြီး၊ အမျိုးသမီးများက ဝါကျအဆုံးတွင် 「ค่ะ (khà)」 နှင့် မေးခွန်းများတွင် 「คะ (khá)」 ကို သုံးရပါသည်။',
      englishExplanation: 'In Thai culture, politeness particles at the end of every sentence are mandatory. Male speakers say "ครับ (khrap)" and female speakers say "ค่ะ (khà)" for statements and "คะ (khá)" for questions.',
      formula: '[Sentence] + ครับ (Male) / ค่ะ (Female)',
      examples: [
        {
          target: 'ขอบคุณครับ (Khop khun khrap)',
          meaningMy: 'ကျေးဇူးတင်ပါတယ်ခင်ဗျာ (အမျိုးသားသုံး)။',
          meaningEn: 'Thank you (spoken by a male).'
        },
        {
          target: 'สบายดีค่ะ (Sabai dee kha)',
          meaningMy: 'နေကောင်းပါတယ်ရှင် (အမျိုးသမီးသုံး)။',
          meaningEn: 'I am fine (spoken by a female).'
        }
      ],
      culturalTip: 'ထိုင်းလူမျိုးများနှင့် ဆက်ဆံရာတွင် လက်အုပ်ချီ၍ ဝေ (Wai) လုပ်ရင်း ဤစကားလုံးများကို ပြောဆိုခြင်းသည် အလွန်လေးစားဖွယ်ကောင်းပါသည်။'
    }
  ],

  // 3. Interactive Quizzes & Practice Tests
  quizzes: [
    {
      id: 'q_01',
      language: 'ja',
      type: 'mcq',
      topic: 'Daily Greetings',
      question: 'What is the most common Japanese greeting for "Good afternoon / Hello"?',
      options: ['こんばんは (Konbanwa)', 'こんにちは (Konnichiwa)', 'おはようございます (Ohayō)', 'さようなら (Sayōnara)'],
      answerIndex: 1,
      explanation: '「こんにちは」(Konnichiwa) is used during daytime to say Hello or Good afternoon. おはよう is for morning and こんばんは is for evening.'
    },
    {
      id: 'q_02',
      language: 'my',
      type: 'mcq',
      topic: 'Essential Burmese',
      question: 'မြန်မာဘာသာဖြင့် "ကျေးဇူးတင်ပါတယ်" ၏ အင်္ဂလိပ်အဓိပ္ပာယ်မှာ အဘယ်နည်း။',
      options: ['Excuse me', 'Thank you', 'Goodbye', 'Good morning'],
      answerIndex: 1,
      explanation: '"ကျေးဇူးတင်ပါတယ်" (Kyei-zu tin-ba-de) means "Thank you" in Burmese.'
    },
    {
      id: 'q_03',
      language: 'zh',
      type: 'listening',
      topic: 'Food & Drink',
      audioText: '请给我一杯水',
      question: 'Listen to the audio. What is the speaker requesting?',
      options: ['A cup of tea', 'A glass of water', 'The dinner check', 'A cold soda'],
      answerIndex: 1,
      explanation: 'The sentence was "请给我一杯水" (Qǐng gěi wǒ yī bēi shuǐ), meaning "Please give me a cup/glass of water".'
    },
    {
      id: 'q_04',
      language: 'th',
      type: 'mcq',
      topic: 'Thai Politeness',
      question: 'Which particle should a female speaker use when thanking someone in Thai?',
      options: ['ครับ (Khrap)', 'ค่ะ (Kha)', 'ไหม (Mai)', 'นะ (Na)'],
      answerIndex: 1,
      explanation: 'Female speakers use "ค่ะ (khà)" as the polite ending for statements and greetings.'
    },
    {
      id: 'q_05',
      language: 'en',
      type: 'mcq',
      topic: 'Business English',
      question: 'Which sentence is the most professional way to schedule a meeting?',
      options: [
        'Hey, come talk tomorrow.',
        'Could we schedule a brief discussion for tomorrow morning?',
        'You need to meet me right now.',
        'I want meeting tomorrow.'
      ],
      answerIndex: 1,
      explanation: '"Could we schedule a brief discussion for tomorrow morning?" uses polite modals suited for business communication.'
    }
  ],

  // 4. Multilingual Dictionary Data
  dictionary: [
    {
      id: 'd_01',
      term: 'Language',
      pos: 'noun',
      ipa: '/ˈlæŋ.ɡwɪdʒ/',
      translations: {
        en: 'Language',
        my: 'ဘာသာစကား',
        ja: '言語 (げんご - Gengo)',
        zh: '语言 (Yǔyán)',
        th: 'ภาษา (Pha-sa)',
        fr: 'Langue',
        de: 'Sprache',
        ko: '언어 (Eon-eo)'
      },
      example: 'Learning a new language connects you with diverse cultures.'
    },
    {
      id: 'd_02',
      term: 'Culture',
      pos: 'noun',
      ipa: '/ˈkʌl.tʃər/',
      translations: {
        en: 'Culture',
        my: 'ယဉ်ကျေးမှု / ဓလေ့ထုံးတမ်း',
        ja: '文化 (ぶんか - Bunka)',
        zh: '文化 (Wénhuà)',
        th: 'วัฒนธรรม (Wat-tha-na-tham)',
        fr: 'Culture',
        de: 'Kultur',
        ko: '문화 (Mun-hwa)'
      },
      example: 'To understand words deeply, we must understand their culture.'
    },
    {
      id: 'd_03',
      term: 'Friend',
      pos: 'noun',
      ipa: '/frend/',
      translations: {
        en: 'Friend',
        my: 'သူငယ်ချင်း / မိတ်ဆွေ',
        ja: '友達 (ともだち - Tomodachi)',
        zh: '朋友 (Péngyou)',
        th: 'เพื่อน (Pheuan)',
        fr: 'Ami(e)',
        de: 'Freund',
        ko: '친구 (Chingu)'
      },
      example: 'A true friend is a treasure across all borders.'
    },
    {
      id: 'd_04',
      term: 'Learn',
      pos: 'verb',
      ipa: '/lɜːn/',
      translations: {
        en: 'Learn / Study',
        my: 'လေ့လာသင်ယူသည်',
        ja: '学ぶ / 勉強する (Manabu / Benkyō suru)',
        zh: '学习 (Xuéxí)',
        th: 'เรียนรู้ (Rian-roo)',
        fr: 'Apprendre',
        de: 'Lernen',
        ko: '배우다 / 공부하다 (Bae-uda)'
      },
      example: 'With HtetLingo, you can learn anytime, anywhere offline.'
    },
    {
      id: 'd_05',
      term: 'Heart / Mind',
      pos: 'noun',
      ipa: '/hɑːrt/',
      translations: {
        en: 'Heart / Spirit',
        my: 'နှလုံးသား / စိတ်နှလုံး',
        ja: '心 (こころ - Kokoro)',
        zh: '心灵 / 心 (Xīnlíng)',
        th: 'หัวใจ / จิตใจ (Hua-jai)',
        fr: 'Cœur / Esprit',
        de: 'Herz / Geist',
        ko: '마음 (Ma-eum)'
      },
      example: 'Language spoken from the heart bridges any gap.'
    }
  ]
};
