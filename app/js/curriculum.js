// HtetLingo Comprehensive Language Curriculum
// Structured Duolingo-style Units, Levels & Interactive Exercises
// English, Japanese, Chinese, Thai, and Burmese

window.HTET_CURRICULUM = {
  // -------------------------------------------------------------
  // JAPANESE (日本語) CURRICULUM
  // -------------------------------------------------------------
  ja: {
    language: 'Japanese',
    flag: '🇯🇵',
    units: [
      {
        id: 'ja_u1',
        title: 'Unit 1: First Words & Greetings',
        subtitle: 'မင်္ဂလာပါနှင့် နေ့စဉ်နှုတ်ဆက်စကားများ',
        color: '#f43f5e',
        icon: '🌸',
        levels: [
          {
            id: 'ja_u1_l1',
            title: 'Lesson 1: Essential Greetings',
            desc: 'Konnichiwa, Arigatou, Sayounara',
            icon: '👋',
            xp: 20,
            questions: [
              {
                type: 'choice',
                prompt: 'What does "こんにちは (Konnichiwa)" mean?',
                audioText: 'こんにちは',
                audioLang: 'ja',
                options: ['မင်္ဂလာပါ (Hello / Good afternoon)', 'ကျေးဇူးတင်ပါတယ် (Thank you)', 'နှုတ်ဆက်ပါတယ် (Goodbye)', 'ဟုတ်ကဲ့ (Yes)'],
                correctIndex: 0,
                tip: '"Konnichiwa" is the standard friendly greeting used throughout the day in Japan.'
              },
              {
                type: 'word_bank',
                prompt: 'Translate to Japanese: "Thank you very much"',
                audioText: 'どうもありがとうございます',
                audioLang: 'ja',
                targetSentence: ['どうも', 'ありがとう', 'ございます'],
                words: ['どうも', 'おはよう', 'ありがとう', 'ございます', 'さようなら', 'はい'],
                tip: '"Doumo arigatou gozaimasu" is the polite way to express deep gratitude.'
              },
              {
                type: 'match',
                prompt: 'Tap the matching word pairs',
                pairs: [
                  { a: 'こんにちは', b: 'မင်္ဂလာပါ' },
                  { a: 'ありがとう', b: 'ကျေးဇူးတင်ပါတယ်' },
                  { a: 'さようなら', b: 'သွားပါဦးမယ်' },
                  { a: 'はい', b: 'ဟုတ်ကဲ့' }
                ]
              },
              {
                type: 'choice',
                prompt: 'Listen and choose what you hear:',
                audioText: 'さようなら',
                audioLang: 'ja',
                options: ['さようなら (Sayounara)', 'こんにちは (Konnichiwa)', 'いいえ (Iie)', 'ありがとう (Arigatou)'],
                correctIndex: 0,
                tip: '"Sayounara" means goodbye when parting.'
              },
              {
                type: 'word_bank',
                prompt: 'Translate to Japanese: "Yes, hello"',
                audioText: 'はい、こんにちは',
                audioLang: 'ja',
                targetSentence: ['はい', 'こんにちは'],
                words: ['はい', 'いいえ', 'こんにちは', 'ありがとう'],
                tip: '"Hai" means Yes in Japanese.'
              }
            ]
          },
          {
            id: 'ja_u1_l2',
            title: 'Lesson 2: Meeting People & Introductions',
            desc: 'Watashi, Hajimemashite, Douzo yoroshiku',
            icon: '🤝',
            xp: 25,
            questions: [
              {
                type: 'choice',
                prompt: 'What is the polite phrase when meeting someone for the first time?',
                audioText: 'はじめまして',
                audioLang: 'ja',
                options: ['はじめまして (Nice to meet you)', 'ごちそうさま (Thank you for the meal)', 'さようなら (Goodbye)', 'ごめんなさい (Sorry)'],
                correctIndex: 0,
                tip: '"Hajimemashite" is said when introducing yourself to someone new.'
              },
              {
                type: 'word_bank',
                prompt: 'Assemble: "I am Htet" (わたしは てつ です)',
                audioText: 'わたしは てつ です',
                audioLang: 'ja',
                targetSentence: ['わたし', 'は', 'てつ', 'です'],
                words: ['わたし', 'です', 'は', 'あなた', 'てつ', 'ありがとう'],
                tip: '"Watashi wa [Name] desu" is how you introduce your name.'
              },
              {
                type: 'match',
                prompt: 'Match introductions and pronouns',
                pairs: [
                  { a: 'わたし', b: 'ကျွန်မ / ကျွန်တော် (I)' },
                  { a: 'あなた', b: 'မင်း / သင် (You)' },
                  { a: 'はじめまして', b: 'တွေ့ရတာဝမ်းသာပါတယ်' },
                  { a: 'お元気ですか', b: 'နေကောင်းပါသလား' }
                ]
              },
              {
                type: 'choice',
                prompt: 'How do you ask "How are you?" in Japanese?',
                audioText: 'おげんきですか',
                audioLang: 'ja',
                options: ['お元気ですか (O-genki desu ka?)', 'いくらですか (Ikura desu ka?)', 'どこですか (Doko desu ka?)', 'なんですか (Nan desu ka?)'],
                correctIndex: 0,
                tip: '"Genki" refers to health, energy, and spirits.'
              }
            ]
          },
          {
            id: 'ja_u1_l3',
            title: 'Lesson 3: Unit 1 Checkpoint Challenge',
            desc: 'Mastery test for greetings & introductions',
            icon: '👑',
            xp: 30,
            questions: [
              {
                type: 'choice',
                prompt: 'Someone says "Arigatou gozaimasu". How do you reply?',
                audioText: 'どういたしまして',
                audioLang: 'ja',
                options: ['どういたしまして (You are welcome)', 'さようなら (Goodbye)', 'いいえ (No)', 'はじめまして (Nice to meet you)'],
                correctIndex: 0,
                tip: '"Dou itashimashite" means "Don\'t mention it / You\'re very welcome".'
              },
              {
                type: 'word_bank',
                prompt: 'Translate: "Please treat me well / Nice to meet you"',
                audioText: 'どうぞ よろしく おねがいします',
                audioLang: 'ja',
                targetSentence: ['どうぞ', 'よろしく', 'おねがいします'],
                words: ['どうぞ', 'こんにちは', 'よろしく', 'おねがいします', 'はい'],
                tip: '"Douzo yoroshiku onegaishimasu" is the foundation of polite Japanese relationships.'
              },
              {
                type: 'match',
                prompt: 'Speed match the core words',
                pairs: [
                  { a: 'いいえ', b: 'မဟုတ်ပါ (No)' },
                  { a: 'すみません', b: 'တောင်းပန်ပါတယ် / Excuse me' },
                  { a: 'どうぞ', b: 'ကြွပါ / ဖိတ်ခေါ်ပါတယ်' },
                  { a: '元気', b: 'ကျန်းမာရွှင်လန်းခြင်း' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ja_u2',
        title: 'Unit 2: Cute Cafe & Dining',
        subtitle: 'ကော်ဖီဆိုင်နှင့် အစားအသောက် မှာယူခြင်း',
        color: '#ec4899',
        icon: '🍰',
        levels: [
          {
            id: 'ja_u2_l1',
            title: 'Lesson 1: Ordering at a Cafe',
            desc: 'Koohii, O-kudasai, Kore, Oishii',
            icon: '☕',
            xp: 25,
            questions: [
              {
                type: 'choice',
                prompt: 'How do you say "This one, please" while pointing to the menu?',
                audioText: 'これをください',
                audioLang: 'ja',
                options: ['これをください (Kore o kudasai)', 'あれはなんですか (Are wa nan desu ka)', 'おいくらですか (O-ikura desu ka)', 'いりません (Irimasen)'],
                correctIndex: 0,
                tip: '"Kore o kudasai" is the #1 most useful phrase in any Japanese restaurant or shop.'
              },
              {
                type: 'word_bank',
                prompt: 'Translate to Japanese: "Coffee, please"',
                audioText: 'コーヒーをください',
                audioLang: 'ja',
                targetSentence: ['コーヒー', 'を', 'ください'],
                words: ['コーヒー', 'お茶', 'を', 'ください', 'おいしい', '水'],
                tip: 'Item + を (o) + ください (kudasai) means "Please give me [Item]".'
              },
              {
                type: 'match',
                prompt: 'Match drinks and foods',
                pairs: [
                  { a: 'お茶 (O-cha)', b: 'လက်ဖက်ရည်ကြမ်း (Green Tea)' },
                  { a: '水 (Mizu)', b: 'ရေ (Water)' },
                  { a: 'おいしい (Oishii)', b: 'အရသာရှိတယ် (Delicious)' },
                  { a: 'ごはん (Gohan)', b: 'ထမင်း / အစားအသောက် (Meal)' }
                ]
              },
              {
                type: 'choice',
                prompt: 'What do you say before starting to eat?',
                audioText: 'いただきます',
                audioLang: 'ja',
                options: ['いただきます (Itadakimasu)', 'ごちそうさま (Gochisousama)', 'かんぱい (Kanpai)', 'おねがいします (Onegaishimasu)'],
                correctIndex: 0,
                tip: '"Itadakimasu" expresses gratitude for the lives and effort that created the food.'
              }
            ]
          },
          {
            id: 'ja_u2_l2',
            title: 'Lesson 2: Paying the Bill & Compliments',
            desc: 'Ikura, O-kaikei, Kawaii, Sugoi',
            icon: '💳',
            xp: 25,
            questions: [
              {
                type: 'choice',
                prompt: 'How do you ask "How much is this?"',
                audioText: 'いくらですか',
                audioLang: 'ja',
                options: ['いくらですか (Ikura desu ka?)', 'どこですか (Doko desu ka?)', 'なんじですか (Nan-ji desu ka?)', 'だれですか (Dare desu ka?)'],
                correctIndex: 0,
                tip: '"Ikura desu ka" asks for price or total bill.'
              },
              {
                type: 'word_bank',
                prompt: 'Assemble: "The bill, please" (お会計をお願いします)',
                audioText: 'おかいけいをおねがいします',
                audioLang: 'ja',
                targetSentence: ['お会計', 'を', 'お願いします'],
                words: ['お会計', 'を', 'お願いします', 'おいしい', '水', 'ごちそう'],
                tip: '"O-kaikei o onegaishimasu" signals the staff that you are ready to pay.'
              },
              {
                type: 'match',
                prompt: 'Match cute compliments & shopping words',
                pairs: [
                  { a: 'かわいい (Kawaii)', b: 'ချစ်စရာကောင်းတယ် (Cute)' },
                  { a: 'すごい (Sugoi)', b: 'အရမ်းတော်တယ် / အံ့ဩစရာ (Amazing)' },
                  { a: 'おすすめ (Osusume)', b: 'အကြံပြုချက် (Recommendation)' },
                  { a: 'お会計 (O-kaikei)', b: 'ငွေရှင်းခြင်း (The Bill)' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'ja_u3',
        title: 'Unit 3: Solo Travel & Safe Transit',
        subtitle: 'ရထားစီးခြင်းနှင့် တစ်ကိုယ်တော် လုံခြုံစွာ ခရီးသွားခြင်း',
        color: '#a855f7',
        icon: '🚅',
        levels: [
          {
            id: 'ja_u3_l1',
            title: 'Lesson 1: Trains & Station Directions',
            desc: 'Eki, Densha, Doko, Chikatetsu',
            icon: '🗺️',
            xp: 30,
            questions: [
              {
                type: 'choice',
                prompt: 'Where is the train station? How do you ask this?',
                audioText: '駅はどこですか',
                audioLang: 'ja',
                options: ['駅はどこですか (Eki wa doko desu ka?)', '駅はなんじですか (Eki wa nan-ji desu ka?)', '駅はいくらですか (Eki wa ikura desu ka?)', '駅に行きません (Eki ni ikimasen)'],
                correctIndex: 0,
                tip: '[Place] + はどこですか (wa doko desu ka) means "Where is [Place]?"'
              },
              {
                type: 'word_bank',
                prompt: 'Assemble: "Excuse me, where is the restroom?" (すみません、トイレはどこですか)',
                audioText: 'すみません、トイレはどこですか',
                audioLang: 'ja',
                targetSentence: ['すみません', 'トイレ', 'は', 'どこですか'],
                words: ['すみません', 'トイレ', 'は', 'どこですか', '駅', '電車'],
                tip: '"Sumimasen" politely gets attention before asking any question.'
              },
              {
                type: 'match',
                prompt: 'Match travel navigation terms',
                pairs: [
                  { a: '駅 (Eki)', b: 'ဘူတာရုံ (Station)' },
                  { a: '電車 (Densha)', b: 'ရထား (Train)' },
                  { a: '地下鉄 (Chikatetsu)', b: 'မြေအောက်ရထား (Subway)' },
                  { a: '出口 (Deguchi)', b: 'ထွက်ပေါက် (Exit)' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // ENGLISH (အင်္ဂလိပ်) CURRICULUM
  // -------------------------------------------------------------
  en: {
    language: 'English',
    flag: '🇺🇸',
    units: [
      {
        id: 'en_u1',
        title: 'Unit 1: Everyday Conversations & Greetings',
        subtitle: 'နေ့စဉ်သုံး အင်္ဂလိပ်စကားပြောနှင့် မိတ်ဆက်ခြင်း',
        color: '#f43f5e',
        icon: '🌸',
        levels: [
          {
            id: 'en_u1_l1',
            title: 'Lesson 1: Friendly Everyday Greetings',
            desc: 'Hello, How are you doing?, Nice to meet you',
            icon: '✨',
            xp: 20,
            questions: [
              {
                type: 'choice',
                prompt: 'What is the natural and friendly response to "How are you doing?"',
                audioText: 'I am doing great, thank you!',
                audioLang: 'en',
                options: ['I am doing great, thank you! (ကျွန်မ အရမ်းကောင်းပါတယ်၊ ကျေးဇူးတင်ပါတယ်)', 'I am 20 years old (အသက် ၂၀ ပါ)', 'My name is Htet (နာမည် ထက် ပါ)', 'Goodbye (နှုတ်ဆက်ပါတယ်)'],
                correctIndex: 0,
                tip: '"I\'m doing great, thanks!" is warm, natural, and friendly.'
              },
              {
                type: 'word_bank',
                prompt: 'Assemble: "It is really nice to meet you"',
                audioText: 'It is really nice to meet you',
                audioLang: 'en',
                targetSentence: ['It', 'is', 'really', 'nice', 'to', 'meet', 'you'],
                words: ['It', 'is', 'really', 'nice', 'to', 'meet', 'you', 'see', 'good', 'day'],
                tip: '"Nice to meet you" establishes connection when meeting someone for the first time.'
              },
              {
                type: 'match',
                prompt: 'Match everyday English phrases with Burmese',
                pairs: [
                  { a: 'Good morning', b: 'မင်္ဂလာနံနက်ခင်းပါ' },
                  { a: 'Have a wonderful day', b: 'သာယာသောနေ့လေးဖြစ်ပါစေ' },
                  { a: 'Take good care', b: 'ဂရုစိုက်ပါနော်' },
                  { a: 'See you soon', b: 'မကြာခင် ပြန်တွေ့ကြမယ်' }
                ]
              },
              {
                type: 'choice',
                prompt: 'Someone offers you help. How do you politely accept?',
                audioText: 'Thank you, that would be lovely!',
                audioLang: 'en',
                options: ['Thank you, that would be lovely! (ကျေးဇူးတင်ပါတယ်ရှင်၊ သိပ်ကောင်းတာပေါ့)', 'No, go away (မလာပါနဲ့)', 'Who are you? (ဘယ်သူလဲ)', 'I don\'t know (မသိဘူး)'],
                correctIndex: 0,
                tip: '"That would be lovely!" sounds polite, confident, and sweet.'
              }
            ]
          },
          {
            id: 'en_u1_l2',
            title: 'Lesson 2: Ordering at a Restaurant & Cafe',
            desc: 'Can I have, Please, The check please',
            icon: '☕',
            xp: 25,
            questions: [
              {
                type: 'word_bank',
                prompt: 'Assemble: "Could I please have an iced latte?"',
                audioText: 'Could I please have an iced latte?',
                audioLang: 'en',
                targetSentence: ['Could', 'I', 'please', 'have', 'an', 'iced', 'latte?'],
                words: ['Could', 'I', 'please', 'have', 'an', 'iced', 'latte?', 'want', 'give', 'bill'],
                tip: '"Could I please have [Item]?" is the most polite, native way to order.'
              },
              {
                type: 'choice',
                prompt: 'How do you ask for the bill at the end of your meal?',
                audioText: 'Could we get the check, please?',
                audioLang: 'en',
                options: ['Could we get the check, please? (ငွေရှင်းပေးပါဦးရှင်)', 'Where is the food? (အစားအသောက် ဘယ်မှာလဲ)', 'Give me money (ပိုက်ဆံပေးပါ)', 'I want to sleep (အိပ်ချင်တယ်)'],
                correctIndex: 0,
                tip: 'In US English "check" is common; in UK English "bill" is used.'
              },
              {
                type: 'match',
                prompt: 'Match cafe and dining vocabulary',
                pairs: [
                  { a: 'Delicious', b: 'အရသာရှိသော' },
                  { a: 'Recommendation', b: 'အကြံပြုချက်' },
                  { a: 'Receipt', b: 'ပြေစာ / ဘောက်ချာ' },
                  { a: 'Takeaway / To go', b: 'ပါဆယ်ယူမည်' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'en_u2',
        title: 'Unit 2: Confidence & Expressing Opinions',
        subtitle: 'မိမိကိုယ်ကို ယုံကြည်မှုနှင့် ထင်မြင်ချက်ထုတ်ဖော်ခြင်း',
        color: '#10b981',
        icon: '👑',
        levels: [
          {
            id: 'en_u2_l1',
            title: 'Lesson 1: Sharing Ideas Confidently',
            desc: 'In my view, I believe, Let us collaborate',
            icon: '💼',
            xp: 25,
            questions: [
              {
                type: 'choice',
                prompt: 'How do you introduce your perspective professionally?',
                audioText: 'From my perspective, this approach is very promising.',
                audioLang: 'en',
                options: ['From my perspective... (ကျွန်မ အမြင်အရဆိုရင်...)', 'Sorry I am stupid (ကျွန်မ အသုံးမကျပါဘူး)', 'Whatever you say (မင်းပြောသလိုပဲ)', 'I have no idea (ဘာမှမသိပါ)'],
                correctIndex: 0,
                tip: '"From my perspective" establishes authority with grace.'
              },
              {
                type: 'word_bank',
                prompt: 'Assemble: "I believe in my own potential"',
                audioText: 'I believe in my own potential',
                audioLang: 'en',
                targetSentence: ['I', 'believe', 'in', 'my', 'own', 'potential'],
                words: ['I', 'believe', 'in', 'my', 'own', 'potential', 'doubt', 'fear', 'never'],
                tip: 'Believe in your unique strengths and vision.'
              },
              {
                type: 'match',
                prompt: 'Match confidence & career terms',
                pairs: [
                  { a: 'Empowerment', b: 'စွမ်းရည်မြှင့်တင်မှု' },
                  { a: 'Leadership', b: 'ခေါင်းဆောင်မှု' },
                  { a: 'Confidence', b: 'ယုံကြည်မှု' },
                  { a: 'Sisterhood', b: 'ညီအစ်မစည်းလုံးမှု' }
                ]
              }
            ]
          }
        ]
      }
,
      {
        id: 'en_em_verbs',
        title: 'Unit 3: Essential Verbs Mastery (EMDictionary Dataset)',
        subtitle: 'EMDictionary မှ ထုတ်နှုတ်ထားသော မရှိမဖြစ် ကြိယာဝေါဟာရများ',
        color: '#0284c7',
        icon: '📚',
        levels: [
          {
            id: 'en_em_v1',
            title: 'Lesson 1: Learning & Action Verbs',
            desc: 'learn, speak, understand, discover',
            icon: '✍️',
            xp: 25,
            questions: [
              {
                type: 'choice',
                prompt: 'According to EMDictionary, what does "learn /lɜːn/" mean?',
                audioText: 'learn',
                audioLang: 'en',
                options: ['သင်ယူသည် / လေ့လာသင်ကြားသည်', 'မေ့လျော့သည် (Forget)', 'ငြင်းပယ်သည် (Refuse)', 'အိပ်ပျော်သည် (Sleep)'],
                correctIndex: 0,
                tip: 'EMDictionary: learn (v) ၁။ သင်ယူသည်။ လေ့လာသင်ကြားသည်။ လေ့ကျက်သည်။'
              },
              {
                type: 'word_bank',
                prompt: 'Assemble the EMDictionary example sentence: "She learns languages very quickly"',
                audioText: 'She learns languages very quickly',
                audioLang: 'en',
                targetSentence: ['She', 'learns', 'languages', 'very', 'quickly'],
                words: ['She', 'learns', 'languages', 'very', 'quickly', 'slow', 'never'],
                tip: 'learn + s for third person singular.'
              },
              {
                type: 'match',
                prompt: 'Match verbs from EMDictionary dataset',
                pairs: [
                  { a: 'learn', b: 'သင်ယူသည်' },
                  { a: 'speak', b: 'ပြောဆိုသည်' },
                  { a: 'understand', b: 'နားလည်သဘောပေါက်သည်' },
                  { a: 'encourage', b: 'အားပေးတိုက်တွန်းသည်' }
                ]
              }
            ]
          },
          {
            id: 'en_em_v2',
            title: 'Lesson 2: Strength & Empathy Verbs',
            desc: 'achieve, empower, support, believe',
            icon: '🌟',
            xp: 30,
            questions: [
              {
                type: 'choice',
                prompt: 'What does "achieve /əˈtʃiːv/" mean in EMDictionary?',
                audioText: 'achieve',
                audioLang: 'en',
                options: ['အောင်မြင်စွာ ပြီးမြောက်သည် / ရရှိသည်', 'ရှုံးနိမ့်သည် (Fail)', 'စွန့်ခွာသည် (Leave)', 'ပျက်စီးသည် (Break)'],
                correctIndex: 0,
                tip: 'EMDictionary: achieve (v) ၁။ ရရှိသည်။ ဆွတ်ခူးသည်။ ပြီးမြောက်သည်။'
              },
              {
                type: 'word_bank',
                prompt: 'Assemble: "Women can achieve any dream"',
                audioText: 'Women can achieve any dream',
                audioLang: 'en',
                targetSentence: ['Women', 'can', 'achieve', 'any', 'dream'],
                words: ['Women', 'can', 'achieve', 'any', 'dream', 'cannot', 'fear'],
                tip: 'Believe in continuous learning and achievement.'
              },
              {
                type: 'match',
                prompt: 'Match empowerment verbs from dataset',
                pairs: [
                  { a: 'achieve', b: 'အောင်မြင်စွာရရှိသည်' },
                  { a: 'empower', b: 'လုပ်ပိုင်ခွင့်စွမ်းရည်ပေးသည်' },
                  { a: 'support', b: 'ရိုင်းပင်းကူညီသည်' },
                  { a: 'protect', b: 'ကာကွယ်စောင့်ရှောက်သည်' }
                ]
              }
            ]
          }
        ]
      },
      {
        id: 'en_em_adjectives',
        title: 'Unit 4: Expressive Adjectives (EMDictionary & POS)',
        subtitle: 'သရုပ်ဖော် နာမဝိသေသနများနှင့် စကားလုံးအလှများ',
        color: '#8b5cf6',
        icon: '🎨',
        levels: [
          {
            id: 'en_em_adj1',
            title: 'Lesson 1: Character & Brilliance',
            desc: 'courageous, brilliant, compassionate, resilient',
            icon: '💎',
            xp: 25,
            questions: [
              {
                type: 'choice',
                prompt: 'What does "courageous /kəˈreɪ.dʒəs/" mean in EMDictionary?',
                audioText: 'courageous',
                audioLang: 'en',
                options: ['ရဲရင့်သော / သတ္တိရှိသော', 'ကြောက်ရွံ့သော (Fearful)', 'စိတ်ဆိုးသော (Angry)', 'ပျင်းရိသော (Lazy)'],
                correctIndex: 0,
                tip: 'EMDictionary: courageous (adj) သတ္တိရှိသော။ ရဲရင့်သော။'
              },
              {
                type: 'word_bank',
                prompt: 'Assemble: "A courageous voice inspires the world"',
                audioText: 'A courageous voice inspires the world',
                audioLang: 'en',
                targetSentence: ['A', 'courageous', 'voice', 'inspires', 'the', 'world'],
                words: ['A', 'courageous', 'voice', 'inspires', 'the', 'world', 'silent', 'fear'],
                tip: 'Expressing truth with bravery.'
              },
              {
                type: 'match',
                prompt: 'Match descriptive adjectives from dataset',
                pairs: [
                  { a: 'courageous', b: 'သတ္တိရှိသော' },
                  { a: 'brilliant', b: 'ထက်မြက်ထူးချွန်သော' },
                  { a: 'resilient', b: 'ကြံ့ကြံ့ခံနိုင်သော' },
                  { a: 'radiant', b: 'ဝင်းလက်တောက်ပသော' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // CHINESE (中文 / MANDARIN) CURRICULUM
  // -------------------------------------------------------------
  zh: {
    language: 'Chinese',
    flag: '🇨🇳',
    units: [
      {
        id: 'zh_u1',
        title: 'Unit 1: Essential Mandarin Greetings',
        subtitle: 'တရုတ်စကားပြော အခြေခံ နှုတ်ဆက်ခြင်း',
        color: '#f43f5e',
        icon: '🏮',
        levels: [
          {
            id: 'zh_u1_l1',
            title: 'Lesson 1: First Mandarin Words',
            desc: 'Nǐ hǎo, Xièxiè, Zàijiàn',
            icon: '👋',
            xp: 20,
            questions: [
              {
                type: 'choice',
                prompt: 'What does "你好 (Nǐ hǎo)" mean?',
                audioText: '你好',
                audioLang: 'zh',
                options: ['မင်္ဂလာပါ (Hello)', 'ကျေးဇူးတင်ပါတယ် (Thank you)', 'နှုတ်ဆက်ပါတယ် (Goodbye)', 'ဟုတ်တယ် (Yes)'],
                correctIndex: 0,
                tip: '"Nǐ hǎo" is the universal greeting in Mandarin Chinese.'
              },
              {
                type: 'word_bank',
                prompt: 'Translate to Chinese: "Thank you very much"',
                audioText: '非常感谢',
                audioLang: 'zh',
                targetSentence: ['非常', '感谢'],
                words: ['非常', '感谢', '你好', '再见', '对不起'],
                tip: '"Fēicháng gǎnxiè" expresses heartfelt thanks.'
              },
              {
                type: 'match',
                prompt: 'Match Chinese phrases with meanings',
                pairs: [
                  { a: '你好 (Nǐ hǎo)', b: 'မင်္ဂလာပါ' },
                  { a: '谢谢 (Xièxiè)', b: 'ကျေးဇူးတင်ပါတယ်' },
                  { a: '再见 (Zàijiàn)', b: 'နောက်မှတွေ့မယ်' },
                  { a: '对不起 (Duìbuqǐ)', b: 'တောင်းပန်ပါတယ်' }
                ]
              },
              {
                type: 'choice',
                prompt: 'How do you say "You are welcome" in Chinese?',
                audioText: '不客气',
                audioLang: 'zh',
                options: ['不客气 (Bú kèqi)', '没关系 (Méi guānxi)', '好的 (Hǎo de)', '行 (Xíng)'],
                correctIndex: 0,
                tip: '"Bú kèqi" literally means "no need to be so polite/formal".'
              }
            ]
          },
          {
            id: 'zh_u1_l2',
            title: 'Lesson 2: Shopping & Asking Price',
            desc: 'Duōshǎo qián, Tài guì le, Piàoliang',
            icon: '🛍️',
            xp: 25,
            questions: [
              {
                type: 'choice',
                prompt: 'How do you ask "How much is this?" in Mandarin?',
                audioText: '这个多少钱',
                audioLang: 'zh',
                options: ['这个多少钱 (Zhège duōshǎo qián?)', '在哪里 (Zài nǎlǐ?)', '是什么 (Shì shénme?)', '怎么走 (Zěnme zǒu?)'],
                correctIndex: 0,
                tip: '"Zhège duōshǎo qián" is essential for markets and shopping.'
              },
              {
                type: 'word_bank',
                prompt: 'Assemble: "Very beautiful!" (非常漂亮)',
                audioText: '非常漂亮',
                audioLang: 'zh',
                targetSentence: ['非常', '漂亮'],
                words: ['非常', '漂亮', '多少', '钱', '好的'],
                tip: '"Piàoliang" means pretty, beautiful, or elegant.'
              },
              {
                type: 'match',
                prompt: 'Match shopping phrases',
                pairs: [
                  { a: '太棒了 (Tài bàng le)', b: 'အရမ်းမိုက်တယ် / အကောင်းဆုံးပဲ' },
                  { a: '便宜一点 (Piányi yīdiǎn)', b: 'နည်းနည်းလျှော့ပေးပါ' },
                  { a: '买单 (Mǎidān)', b: 'ငွေရှင်းမယ်' },
                  { a: '好吃 (Hǎochī)', b: 'အရသာရှိတယ်' }
                ]
              }
            ]
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // THAI (ภาษาไทย) CURRICULUM
  // -------------------------------------------------------------
  th: {
    language: 'Thai',
    flag: '🇹🇭',
    units: [
      {
        id: 'th_u1',
        title: 'Unit 1: Polite Thai Everyday Phrases',
        subtitle: 'ထိုင်းစကားပြော အခြေခံနှင့် ယဉ်ကျေးသော စကားလုံးများ',
        color: '#f43f5e',
        icon: '🌺',
        levels: [
          {
            id: 'th_u1_l1',
            title: 'Lesson 1: Greetings & Politeness',
            desc: 'Sawatdee kha, Khob khun kha',
            icon: '🙏',
            xp: 20,
            questions: [
              {
                type: 'choice',
                prompt: 'What does "สวัสดีค่ะ (Sawatdee kha)" mean when spoken by a female?',
                audioText: 'สวัสดีค่ะ',
                audioLang: 'th',
                options: ['မင်္ဂလာပါ (Hello / Greetings)', 'ကျေးဇူးတင်ပါတယ် (Thank you)', 'စားပြီးပြီလား (Have you eaten?)', 'သွားပါဦးမယ် (Goodbye)'],
                correctIndex: 0,
                tip: 'Females end polite sentences with "kha" (ค่ะ), while males use "khrap" (ครับ).'
              },
              {
                type: 'word_bank',
                prompt: 'Assemble: "Thank you very much" (ขอบคุณ มาก ค่ะ)',
                audioText: 'ขอบคุณมากค่ะ',
                audioLang: 'th',
                targetSentence: ['ขอบคุณ', 'มาก', 'ค่ะ'],
                words: ['ขอบคุณ', 'มาก', 'ค่ะ', 'สวัสดี', 'ไม่เป็นไร'],
                tip: '"Khob khun mak kha" means thank you very much.'
              },
              {
                type: 'match',
                prompt: 'Match Thai expressions with Burmese',
                pairs: [
                  { a: 'สวัสดีค่ะ (Sawatdee kha)', b: 'မင်္ဂလာပါ' },
                  { a: 'ขอบคุณค่ะ (Khob khun kha)', b: 'ကျေးဇူးတင်ပါတယ်' },
                  { a: 'ไม่เป็นไรค่ะ (Mai pen rai kha)', b: 'ကိစ္စမရှိပါဘူး / ရပါတယ်' },
                  { a: 'อร่อยมาก (Aroy mak)', b: 'အရမ်းအရသာရှိတယ်' }
                ]
              },
              {
                type: 'choice',
                prompt: 'How do you ask "How much is this?" in Thai?',
                audioText: 'อันนี้เท่าไหร่คะ',
                audioLang: 'th',
                options: ['อันนี้เท่าไหร่คะ (An nee tao rai kha?)', 'อยู่ที่ไหนคะ (Yoo tee nai kha?)', 'ชื่ออะไรคะ (Cheu arai kha?)', 'ไปไหนคะ (Pai nai kha?)'],
                correctIndex: 0,
                tip: '"Tao rai" means how much.'
              }
            ]
          }
        ]
      }
    ]
  },

  // -------------------------------------------------------------
  // BURMESE (မြန်မာစကား) CURRICULUM
  // -------------------------------------------------------------
  my: {
    language: 'Burmese',
    flag: '🇲🇲',
    units: [
      {
        id: 'my_u1',
        title: 'Unit 1: Essential Myanmar Greetings',
        subtitle: 'မြန်မာဘာသာ နှုတ်ဆက်ခြင်းနှင့် နေ့စဉ်အသုံးအနှုန်းများ',
        color: '#f43f5e',
        icon: '🌸',
        levels: [
          {
            id: 'my_u1_l1',
            title: 'Lesson 1: Greetings & Warmth',
            desc: 'Mingalaba, Kyei-zu-tin-ba-de, Ne-kaung-la',
            icon: '🙏',
            xp: 20,
            questions: [
              {
                type: 'choice',
                prompt: 'What does "မင်္ဂလာပါ (Mingalaba)" mean?',
                audioText: 'မင်္ဂလာပါ',
                audioLang: 'my',
                options: ['Hello / Blessings upon you', 'Thank you', 'Goodbye', 'Good night'],
                correctIndex: 0,
                tip: '"Mingalaba" is the auspicious traditional greeting of Myanmar, meaning "auspicious blessings to you".'
              },
              {
                type: 'word_bank',
                prompt: 'Assemble: "Thank you very much" (ကျေးဇူး အများကြီး တင်ပါတယ်)',
                audioText: 'ကျေးဇူးအများကြီးတင်ပါတယ်',
                audioLang: 'my',
                targetSentence: ['ကျေးဇူး', 'အများကြီး', 'တင်ပါတယ်'],
                words: ['ကျေးဇူး', 'အများကြီး', 'တင်ပါတယ်', 'မင်္ဂလာပါ', 'ဟုတ်ကဲ့'],
                tip: '"Kyei-zu tin-ba-de" expresses sincere gratitude in Burmese.'
              },
              {
                type: 'match',
                prompt: 'Match Myanmar phrases with English',
                pairs: [
                  { a: 'မင်္ဂလာပါ', b: 'Hello (Mingalaba)' },
                  { a: 'ကျေးဇူးတင်ပါတယ်', b: 'Thank you' },
                  { a: 'နေကောင်းလား', b: 'How are you?' },
                  { a: 'ကောင်းပါတယ်', b: 'I am fine / Good' }
                ]
              }
            ]
          }
        ]
      }
,
      {
        id: 'my_heritage_names',
        title: 'Unit 2: Myanmar Female Names & Heritage (L16H7 Dataset)',
        subtitle: 'မြန်မာအမျိုးသမီး နာမည်များ၊ အဓိပ္ပာယ်များနှင့် ယဉ်ကျေးမှု',
        color: '#ec4899',
        icon: '🌸',
        levels: [
          {
            id: 'my_name_l1',
            title: 'Lesson 1: Royal Flowers & Cherished Daughters',
            desc: 'သဇင် (Thazin), မေ (May), ထက် (Htet)',
            icon: '🌺',
            xp: 25,
            questions: [
              {
                type: 'choice',
                prompt: 'What is the cultural symbolism of the Myanmar name "သဇင် (Thazin)"?',
                audioText: 'သဇင်',
                audioLang: 'my',
                options: ['တော်ဝင်သဇင်ပန်း / ဖြူစင်မြင့်မြတ်ခြင်း (Royal Orchid)', 'နေမင်းကြီး (Sun)', 'ပင်လယ် (Ocean)', 'မိုးကြိုး (Thunder)'],
                correctIndex: 0,
                tip: 'သဇင်ပန်းသည် သန့်စင်ဖြူစင်မှု၊ ကျက်သရေနှင့် မာန်မာနရှိသော တော်ဝင်ပန်း ဖြစ်ပါသည်။'
              },
              {
                type: 'word_bank',
                prompt: 'Assemble the female name meaning: "မေ သည် ချစ်ခင်မြတ်နိုးဖွယ်ကောင်းသော သမီးငယ်"',
                audioText: 'မေသည် ချစ်ခင်မြတ်နိုးဖွယ်ကောင်းသော သမီးငယ်',
                audioLang: 'my',
                targetSentence: ['မေ', 'သည်', 'ချစ်ခင်မြတ်နိုးဖွယ်ကောင်းသော', 'သမီးငယ်'],
                words: ['မေ', 'သည်', 'ချစ်ခင်မြတ်နိုးဖွယ်ကောင်းသော', 'သမီးငယ်', 'ရန်သူ', 'မကောင်းသော'],
                tip: '"မေ" ဆိုသည်မှာ မိဘဆွေမျိုးတို့ ချစ်ခင်မြတ်နိုးရသော သမီးမိန်းကလေး ဖြစ်ပါသည်။'
              },
              {
                type: 'match',
                prompt: 'Match Myanmar female names with meanings from dataset',
                pairs: [
                  { a: 'သဇင် (Thazin)', b: 'တော်ဝင်သဇင်ပန်း၊ ဖြူစင်ခြင်း' },
                  { a: 'မေ (May)', b: 'ချစ်မြတ်နိုးဖွယ် သမီးငယ်' },
                  { a: 'ထက် (Htet)', b: 'ထက်မြက်ခြင်း၊ ထူးချွန်ခြင်း' },
                  { a: 'ခင် (Khin)', b: 'မေတ္တာရှိခြင်း၊ ခင်မင်တတ်ခြင်း' }
                ]
              }
            ]
          },
          {
            id: 'my_karen_l1',
            title: 'Lesson 2: Karen Ethnic Language Greetings (Karen Dataset)',
            desc: 'မုဂ့ၤ (Mu-ge), တာဘလူး (Ta-blu)',
            icon: '🌿',
            xp: 25,
            questions: [
              {
                type: 'choice',
                prompt: 'In Sgaw Karen language, what does "တာဘလူး (Ta-blu)" mean?',
                audioText: 'တာဘလူး',
                audioLang: 'my',
                options: ['ကျေးဇူးတင်ပါတယ် (Thank you)', 'နှုတ်ဆက်ပါတယ် (Goodbye)', 'သွားတော့ (Go away)', "မသိပါ (Don't know)"],
                correctIndex: 0,
                tip: '"တာဘလူး" (Ta-blu) သည် ကရင်ဘာသာစကားဖြင့် "ကျေးဇူးတင်ပါတယ်" ဟု အဓိပ္ပာယ်ရပါသည်။'
              },
              {
                type: 'match',
                prompt: 'Match Karen words with Burmese meanings',
                pairs: [
                  { a: 'တာဘလူး', b: 'ကျေးဇူးတင်ပါတယ်' },
                  { a: 'မုဂ့ၤ', b: 'မင်္ဂလာပါ / နှုတ်ခွန်းဆက်' },
                  { a: 'ကညီ', b: 'ကရင်လူမျိုး' },
                  { a: 'ဆိုး', b: 'ချစ်သည်' }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};
