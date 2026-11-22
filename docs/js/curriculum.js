// HtetLingo Comprehensive Language Curriculum
// Structured Duolingo-style Units, Levels & Interactive Exercises
// English, Japanese, Chinese, Thai, and Burmese
// Features: Multi-tiered Interactive Questions, Cultural Etiquette,
// Max Mapper Common English Errors, and LexiForge Sentence Smithing.

const HTET_CURRICULUM = {
  "ja": {
    "language": "Japanese",
    "flag": "🇯🇵",
    "units": [
      {
        "id": "ja_u1",
        "title": "Unit 1: First Words & Greetings",
        "subtitle": "မင်္ဂလာပါနှင့် နေ့စဉ်နှုတ်ဆက်စကားများ",
        "color": "#f43f5e",
        "icon": "🌸",
        "levels": [
          {
            "id": "ja_u1_l1",
            "title": "Lesson 1: Essential Greetings",
            "desc": "Konnichiwa, Arigatou, Sayounara",
            "icon": "👋",
            "xp": 20,
            "questions": [
              {
                "type": "choice",
                "prompt": "What does \"こんにちは (Konnichiwa)\" mean?",
                "audioText": "こんにちは",
                "audioLang": "ja",
                "options": [
                  "မင်္ဂလာပါ (Hello / Good afternoon)",
                  "ကျေးဇူးတင်ပါတယ် (Thank you)",
                  "နှုတ်ဆက်ပါတယ် (Goodbye)",
                  "ဟုတ်ကဲ့ (Yes)"
                ],
                "correctIndex": 0,
                "tip": "\"Konnichiwa\" is the standard friendly greeting used throughout the day in Japan."
              },
              {
                "type": "word_bank",
                "prompt": "Translate to Japanese: \"Thank you very much\"",
                "audioText": "どうもありがとうございます",
                "audioLang": "ja",
                "targetSentence": [
                  "どうも",
                  "ありがとう",
                  "ございます"
                ],
                "words": [
                  "どうも",
                  "おはよう",
                  "ありがとう",
                  "ございます",
                  "さようなら",
                  "はい"
                ],
                "tip": "\"Doumo arigatou gozaimasu\" is the polite way to express deep gratitude."
              },
              {
                "type": "match",
                "prompt": "Tap the matching word pairs",
                "pairs": [
                  {
                    "a": "こんにちは",
                    "b": "မင်္ဂလာပါ"
                  },
                  {
                    "a": "ありがとう",
                    "b": "ကျေးဇူးတင်ပါတယ်"
                  },
                  {
                    "a": "さようなら",
                    "b": "သွားပါဦးမယ်"
                  },
                  {
                    "a": "はい",
                    "b": "ဟုတ်ကဲ့"
                  }
                ]
              },
              {
                "type": "choice",
                "prompt": "Listen and choose what you hear:",
                "audioText": "さようなら",
                "audioLang": "ja",
                "options": [
                  "さようなら (Sayounara)",
                  "こんにちは (Konnichiwa)",
                  "いいえ (Iie)",
                  "ありがとう (Arigatou)"
                ],
                "correctIndex": 0,
                "tip": "\"Sayounara\" means goodbye when parting."
              },
              {
                "type": "word_bank",
                "prompt": "Translate to Japanese: \"Yes, hello\"",
                "audioText": "はい、こんにちは",
                "audioLang": "ja",
                "targetSentence": [
                  "はい",
                  "こんにちは"
                ],
                "words": [
                  "はい",
                  "いいえ",
                  "こんにちは",
                  "ありがとう"
                ],
                "tip": "\"Hai\" means Yes in Japanese."
              }
            ]
          },
          {
            "id": "ja_u1_l2",
            "title": "Lesson 2: Meeting People & Introductions",
            "desc": "Watashi, Hajimemashite, Douzo yoroshiku",
            "icon": "🤝",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "What is the polite phrase when meeting someone for the first time?",
                "audioText": "はじめまして",
                "audioLang": "ja",
                "options": [
                  "はじめまして (Nice to meet you)",
                  "ごちそうさま (Thank you for the meal)",
                  "さようなら (Goodbye)",
                  "ごめんなさい (Sorry)"
                ],
                "correctIndex": 0,
                "tip": "\"Hajimemashite\" is said when introducing yourself to someone new."
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"I am Htet\" (わたしは てつ です)",
                "audioText": "わたしは てつ です",
                "audioLang": "ja",
                "targetSentence": [
                  "わたし",
                  "は",
                  "てつ",
                  "です"
                ],
                "words": [
                  "わたし",
                  "です",
                  "は",
                  "あなた",
                  "てつ",
                  "ありがとう"
                ],
                "tip": "\"Watashi wa [Name] desu\" is how you introduce your name."
              },
              {
                "type": "match",
                "prompt": "Match introductions and pronouns",
                "pairs": [
                  {
                    "a": "わたし",
                    "b": "ကျွန်မ / ကျွန်တော် (I)"
                  },
                  {
                    "a": "あなた",
                    "b": "မင်း / သင် (You)"
                  },
                  {
                    "a": "はじめまして",
                    "b": "တွေ့ရတာဝမ်းသာပါတယ်"
                  },
                  {
                    "a": "お元気ですか",
                    "b": "နေကောင်းပါသလား"
                  }
                ]
              },
              {
                "type": "choice",
                "prompt": "How do you ask \"How are you?\" in Japanese?",
                "audioText": "おげんきですか",
                "audioLang": "ja",
                "options": [
                  "お元気ですか (O-genki desu ka?)",
                  "いくらですか (Ikura desu ka?)",
                  "どこですか (Doko desu ka?)",
                  "なんですか (Nan desu ka?)"
                ],
                "correctIndex": 0,
                "tip": "\"Genki\" refers to health, energy, and spirits."
              }
            ]
          },
          {
            "id": "ja_u1_l3",
            "title": "Lesson 3: Unit 1 Checkpoint Challenge",
            "desc": "Mastery test for greetings & introductions",
            "icon": "👑",
            "xp": 30,
            "questions": [
              {
                "type": "choice",
                "prompt": "Someone says \"Arigatou gozaimasu\". How do you reply?",
                "audioText": "どういたしまして",
                "audioLang": "ja",
                "options": [
                  "どういたしまして (You are welcome)",
                  "さようなら (Goodbye)",
                  "いいえ (No)",
                  "はじめまして (Nice to meet you)"
                ],
                "correctIndex": 0,
                "tip": "\"Dou itashimashite\" means \"Don't mention it / You're very welcome\"."
              },
              {
                "type": "word_bank",
                "prompt": "Translate: \"Please treat me well / Nice to meet you\"",
                "audioText": "どうぞ よろしく おねがいします",
                "audioLang": "ja",
                "targetSentence": [
                  "どうぞ",
                  "よろしく",
                  "おねがいします"
                ],
                "words": [
                  "どうぞ",
                  "こんにちは",
                  "よろしく",
                  "おねがいします",
                  "はい"
                ],
                "tip": "\"Douzo yoroshiku onegaishimasu\" is the foundation of polite Japanese relationships."
              },
              {
                "type": "match",
                "prompt": "Speed match the core words",
                "pairs": [
                  {
                    "a": "いいえ",
                    "b": "မဟုတ်ပါ (No)"
                  },
                  {
                    "a": "すみません",
                    "b": "တောင်းပန်ပါတယ် / Excuse me"
                  },
                  {
                    "a": "どうぞ",
                    "b": "ကြွပါ / ဖိတ်ခေါ်ပါတယ်"
                  },
                  {
                    "a": "元気",
                    "b": "ကျန်းမာရွှင်လန်းခြင်း"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "ja_u2",
        "title": "Unit 2: Cute Cafe & Dining",
        "subtitle": "ကော်ဖီဆိုင်နှင့် အစားအသောက် မှာယူခြင်း",
        "color": "#ec4899",
        "icon": "🍰",
        "levels": [
          {
            "id": "ja_u2_l1",
            "title": "Lesson 1: Ordering at a Cafe",
            "desc": "Koohii, O-kudasai, Kore, Oishii",
            "icon": "☕",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "How do you say \"This one, please\" while pointing to the menu?",
                "audioText": "これをください",
                "audioLang": "ja",
                "options": [
                  "これをください (Kore o kudasai)",
                  "あれはなんですか (Are wa nan desu ka)",
                  "おいくらですか (O-ikura desu ka)",
                  "いりません (Irimasen)"
                ],
                "correctIndex": 0,
                "tip": "\"Kore o kudasai\" is the #1 most useful phrase in any Japanese restaurant or shop."
              },
              {
                "type": "word_bank",
                "prompt": "Translate to Japanese: \"Coffee, please\"",
                "audioText": "コーヒーをください",
                "audioLang": "ja",
                "targetSentence": [
                  "コーヒー",
                  "を",
                  "ください"
                ],
                "words": [
                  "コーヒー",
                  "お茶",
                  "を",
                  "ください",
                  "おいしい",
                  "水"
                ],
                "tip": "Item + を (o) + ください (kudasai) means \"Please give me [Item]\"."
              },
              {
                "type": "match",
                "prompt": "Match drinks and foods",
                "pairs": [
                  {
                    "a": "お茶 (O-cha)",
                    "b": "လက်ဖက်ရည်ကြမ်း (Green Tea)"
                  },
                  {
                    "a": "水 (Mizu)",
                    "b": "ရေ (Water)"
                  },
                  {
                    "a": "おいしい (Oishii)",
                    "b": "အရသာရှိတယ် (Delicious)"
                  },
                  {
                    "a": "ごはん (Gohan)",
                    "b": "ထမင်း / အစားအသောက် (Meal)"
                  }
                ]
              },
              {
                "type": "choice",
                "prompt": "What do you say before starting to eat?",
                "audioText": "いただきます",
                "audioLang": "ja",
                "options": [
                  "いただきます (Itadakimasu)",
                  "ごちそうさま (Gochisousama)",
                  "かんぱい (Kanpai)",
                  "おねがいします (Onegaishimasu)"
                ],
                "correctIndex": 0,
                "tip": "\"Itadakimasu\" expresses gratitude for the lives and effort that created the food."
              }
            ]
          },
          {
            "id": "ja_u2_l2",
            "title": "Lesson 2: Paying the Bill & Compliments",
            "desc": "Ikura, O-kaikei, Kawaii, Sugoi",
            "icon": "💳",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "How do you ask \"How much is this?\"",
                "audioText": "いくらですか",
                "audioLang": "ja",
                "options": [
                  "いくらですか (Ikura desu ka?)",
                  "どこですか (Doko desu ka?)",
                  "なんじですか (Nan-ji desu ka?)",
                  "だれですか (Dare desu ka?)"
                ],
                "correctIndex": 0,
                "tip": "\"Ikura desu ka\" asks for price or total bill."
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"The bill, please\" (お会計をお願いします)",
                "audioText": "おかいけいをおねがいします",
                "audioLang": "ja",
                "targetSentence": [
                  "お会計",
                  "を",
                  "お願いします"
                ],
                "words": [
                  "お会計",
                  "を",
                  "お願いします",
                  "おいしい",
                  "水",
                  "ごちそう"
                ],
                "tip": "\"O-kaikei o onegaishimasu\" signals the staff that you are ready to pay."
              },
              {
                "type": "match",
                "prompt": "Match cute compliments & shopping words",
                "pairs": [
                  {
                    "a": "かわいい (Kawaii)",
                    "b": "ချစ်စရာကောင်းတယ် (Cute)"
                  },
                  {
                    "a": "すごい (Sugoi)",
                    "b": "အရမ်းတော်တယ် / အံ့ဩစရာ (Amazing)"
                  },
                  {
                    "a": "おすすめ (Osusume)",
                    "b": "အကြံပြုချက် (Recommendation)"
                  },
                  {
                    "a": "お会計 (O-kaikei)",
                    "b": "ငွေရှင်းခြင်း (The Bill)"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "ja_u3",
        "title": "Unit 3: Solo Travel & Safe Transit",
        "subtitle": "ရထားစီးခြင်းနှင့် တစ်ကိုယ်တော် လုံခြုံစွာ ခရီးသွားခြင်း",
        "color": "#a855f7",
        "icon": "🚅",
        "levels": [
          {
            "id": "ja_u3_l1",
            "title": "Lesson 1: Trains & Station Directions",
            "desc": "Eki, Densha, Doko, Chikatetsu",
            "icon": "🗺️",
            "xp": 30,
            "questions": [
              {
                "type": "choice",
                "prompt": "Where is the train station? How do you ask this?",
                "audioText": "駅はどこですか",
                "audioLang": "ja",
                "options": [
                  "駅はどこですか (Eki wa doko desu ka?)",
                  "駅はなんじですか (Eki wa nan-ji desu ka?)",
                  "駅はいくらですか (Eki wa ikura desu ka?)",
                  "駅に行きません (Eki ni ikimasen)"
                ],
                "correctIndex": 0,
                "tip": "[Place] + はどこですか (wa doko desu ka) means \"Where is [Place]?\""
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"Excuse me, where is the restroom?\" (すみません、トイレはどこですか)",
                "audioText": "すみません、トイレはどこですか",
                "audioLang": "ja",
                "targetSentence": [
                  "すみません",
                  "トイレ",
                  "は",
                  "どこですか"
                ],
                "words": [
                  "すみません",
                  "トイレ",
                  "は",
                  "どこですか",
                  "駅",
                  "電車"
                ],
                "tip": "\"Sumimasen\" politely gets attention before asking any question."
              },
              {
                "type": "match",
                "prompt": "Match travel navigation terms",
                "pairs": [
                  {
                    "a": "駅 (Eki)",
                    "b": "ဘူတာရုံ (Station)"
                  },
                  {
                    "a": "電車 (Densha)",
                    "b": "ရထား (Train)"
                  },
                  {
                    "a": "地下鉄 (Chikatetsu)",
                    "b": "မြေအောက်ရထား (Subway)"
                  },
                  {
                    "a": "出口 (Deguchi)",
                    "b": "ထွက်ပေါက် (Exit)"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "ja_u4",
        "title": "Unit 4: Harajuku Fashion & Trendy Shopping",
        "subtitle": "ဟာရာဂျူကု ဖက်ရှင်နှင့် စတိုင်ကျ ဈေးဝယ်ထွက်ခြင်း",
        "color": "#ec4899",
        "icon": "👗",
        "levels": [
          {
            "id": "ja_u4_l1",
            "title": "Lesson 1: Cute Outfits & Aesthetic Styles",
            "desc": "Wanpīsu, Fuku, Niau, Kawaii",
            "icon": "🛍️",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "How do you say \"This dress looks very nice on you\" in Japanese?",
                "audioText": "このワンピース、とても似合っていますよ",
                "audioLang": "ja",
                "options": [
                  "このワンピース、とても似合っていますよ (Kono wanpīsu, totemo niatte imasu yo)",
                  "このワンピースは高すぎます (Kono wanpīsu wa takasugimasu)",
                  "ワンピースを着ません (Wanpīsu o kimasen)",
                  "どこで買いましたか (Doko de kaimashita ka)"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "「似合う (niau)」ဆိုသည်မှာ \"လိုက်ဖက်သည် / လိုက်ဖက်လှပသည်\" ဟု အဓိပ္ပာယ်ရပါသည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"May I try this on?\" (これを試着してもいいですか)",
                "audioText": "これを試着してもいいですか",
                "audioLang": "ja",
                "targetSentence": [
                  "これ",
                  "を",
                  "試着",
                  "してもいいですか"
                ],
                "words": [
                  "これ",
                  "を",
                  "試着",
                  "してもいいですか",
                  "見ます",
                  "高い"
                ],
                "correct": "これを試着してもいいですか",
                "tip": "「〜してもいいですか (~shitemo ii desu ka)」သည် ယဉ်ကျေးစွာ ခွင့်တောင်းသည့် အသုံးဖြစ်ပါသည်။"
              },
              {
                "type": "match",
                "prompt": "Match Japanese shopping vocabulary",
                "pairs": [
                  {
                    "a": "服 (Fuku)",
                    "b": "အဝတ်အစား (Clothes)",
                    "target": "服 (Fuku)",
                    "my": "အဝတ်အစား (Clothes)"
                  },
                  {
                    "a": "試着 (Shichaku)",
                    "b": "အဝတ်စမ်းဝတ်ကြည့်ခြင်း (Fitting)",
                    "target": "試着 (Shichaku)",
                    "my": "အဝတ်စမ်းဝတ်ကြည့်ခြင်း (Fitting)"
                  },
                  {
                    "a": "似合う (Niau)",
                    "b": "လိုက်ဖက်ကြည့်ကောင်းသည် (Suits you)",
                    "target": "似合う (Niau)",
                    "my": "လိုက်ဖက်ကြည့်ကောင်းသည် (Suits you)"
                  },
                  {
                    "a": "割引 (Waribiki)",
                    "b": "လျှော့ဈေး (Discount)",
                    "target": "割引 (Waribiki)",
                    "my": "လျှော့ဈေး (Discount)"
                  }
                ]
              }
            ]
          },
          {
            "id": "ja_u4_l2",
            "title": "Lesson 2: Sizes, Colors & The Cashier",
            "desc": "M-saizu, Kuro, Kaikei, Kudasai",
            "icon": "💳",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "How do you ask for a Medium size in Japanese?",
                "audioText": "Mサイズはありますか",
                "audioLang": "ja",
                "options": [
                  "Mサイズはありますか (Emu-saizu wa arimasu ka?)",
                  "Sサイズがいいです (Esu-saizu ga ii desu)",
                  "サイズがわかりません (Saizu ga wakarimasen)",
                  "サイズはいりません (Saizu wa irimasen)"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "[Item] + はありますか (wa arimasu ka) = [Item] ရှိပါသလား။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"I will take this one, please.\" (これをください)",
                "audioText": "これをください",
                "audioLang": "ja",
                "targetSentence": [
                  "これ",
                  "を",
                  "ください"
                ],
                "words": [
                  "これ",
                  "を",
                  "ください",
                  "あれ",
                  "も"
                ],
                "correct": "これをください",
                "tip": "「〜をください (~o kudasai)」= \"ဒါလေး ယူပါမယ် / ပေးပါ\" ဟု ဈေးဝယ်ရာတွင် အမြဲသုံးသည်။"
              },
              {
                "type": "match",
                "prompt": "Match sizes and colors",
                "pairs": [
                  {
                    "a": "白 (Shiro)",
                    "b": "အဖြူရောင် (White)",
                    "target": "白 (Shiro)",
                    "my": "အဖြူရောင် (White)"
                  },
                  {
                    "a": "黒 (Kuro)",
                    "b": "အနက်ရောင် (Black)",
                    "target": "黒 (Kuro)",
                    "my": "အနက်ရောင် (Black)"
                  },
                  {
                    "a": "ピンク (Pinku)",
                    "b": "ပန်းရောင် (Pink)",
                    "target": "ピンク (Pinku)",
                    "my": "ပန်းရောင် (Pink)"
                  },
                  {
                    "a": "お会計 (O-kaikei)",
                    "b": "ငွေရှင်းကောင်တာ (Payment)",
                    "target": "お会計 (O-kaikei)",
                    "my": "ငွေရှင်းကောင်တာ (Payment)"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "ja_u5",
        "title": "Unit 5: JLPT N5 Essential Grammar & Particles",
        "subtitle": "ဂျပန်ဘာသာ သဒ္ဒါအခြေခံနှင့် ဝိဘတ်အသုံးများ",
        "color": "#8b5cf6",
        "icon": "⛩️",
        "levels": [
          {
            "id": "ja_u5_l1",
            "title": "Lesson 1: Subject & Object Particles (は, が, を)",
            "desc": "Mastering wa, ga, and o particles",
            "icon": "📚",
            "xp": 30,
            "questions": [
              {
                "type": "choice",
                "prompt": "Which particle marks the direct object of an action (e.g. drinking water)?",
                "audioText": "水を飲みます",
                "audioLang": "ja",
                "options": [
                  "を (o)",
                  "は (wa)",
                  "に (ni)",
                  "で (de)"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "「を (o)」သည် လုပ်ဆောင်ချက်ခံရသော အရာဝတ္ထု (Direct Object) နောက်တွင် ကပ်သုံးပါသည်။ ဥပမာ: 水を飲みます (ရေသောက်သည်)။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"I eat Japanese food\" (わたしは日本料理を食べます)",
                "audioText": "わたしは日本料理を食べます",
                "audioLang": "ja",
                "targetSentence": [
                  "わたし",
                  "は",
                  "日本料理",
                  "を",
                  "食べます"
                ],
                "words": [
                  "わたし",
                  "は",
                  "日本料理",
                  "を",
                  "食べます",
                  "飲みます",
                  "に"
                ],
                "correct": "わたしは日本料理を食べます",
                "tip": "Subject + は + Object + を + Verb"
              },
              {
                "type": "match",
                "prompt": "Match JLPT N5 Particles with their functions",
                "pairs": [
                  {
                    "a": "は (wa)",
                    "b": "Topic Marker (အကြောင်းအရာပြ)",
                    "target": "は (wa)",
                    "my": "Topic Marker (အကြောင်းအရာပြ)"
                  },
                  {
                    "a": "を (o)",
                    "b": "Object Marker (ကံပုဒ်ပြ)",
                    "target": "を (o)",
                    "my": "Object Marker (ကံပုဒ်ပြ)"
                  },
                  {
                    "a": "に (ni)",
                    "b": "Time / Destination (အချိန် / ဦးတည်ရာ)",
                    "target": "に (ni)",
                    "my": "Time / Destination (အချိန် / ဦးတည်ရာ)"
                  },
                  {
                    "a": "で (de)",
                    "b": "Location of Action (လုပ်ဆောင်ရာနေရာ)",
                    "target": "で (de)",
                    "my": "Location of Action (လုပ်ဆောင်ရာနေရာ)"
                  }
                ]
              }
            ]
          },
          {
            "id": "ja_u5_l2",
            "title": "Lesson 2: Polite Requests (~てください)",
            "desc": "Asking politely with te-form + kudasai",
            "icon": "🌸",
            "xp": 30,
            "questions": [
              {
                "type": "choice",
                "prompt": "How do you say \"Please wait a moment\" in polite Japanese?",
                "audioText": "少々お待ちください",
                "audioLang": "ja",
                "options": [
                  "少々お待ちください (Shōshō o-machi kudasai)",
                  "待っていません (Matte imasen)",
                  "早く来てください (Hayaku kite kudasai)",
                  "帰りましょう (Kaerimashō)"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "「少々お待ちください」သည် အလွန်ယဉ်ကျေးသော ခေတ္တစောင့်ဆိုင်းပေးပါရန် မေတ္တာရပ်ခံစကားဖြစ်ပါသည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"Please listen carefully\" (よく聞いてください)",
                "audioText": "よく聞いてください",
                "audioLang": "ja",
                "targetSentence": [
                  "よく",
                  "聞いて",
                  "ください"
                ],
                "words": [
                  "よく",
                  "聞いて",
                  "ください",
                  "話して",
                  "見て"
                ],
                "correct": "よく聞いてください",
                "tip": "「〜てください (~te kudasai)」သည် တစ်စုံတစ်ခုပြုလုပ်ပေးရန် ယဉ်ကျေးစွာ ပြောဆိုခြင်းဖြစ်ပါသည်။"
              },
              {
                "type": "match",
                "prompt": "Match polite request expressions",
                "pairs": [
                  {
                    "a": "教えてください",
                    "b": "ကျေးဇူးပြု၍ သင်ပြပေးပါ",
                    "target": "教えてください",
                    "my": "ကျေးဇူးပြု၍ သင်ပြပေးပါ"
                  },
                  {
                    "a": "見てください",
                    "b": "ကျေးဇူးပြု၍ ကြည့်ပါ",
                    "target": "見てください",
                    "my": "ကျေးဇူးပြု၍ ကြည့်ပါ"
                  },
                  {
                    "a": "書いてください",
                    "b": "ကျေးဇူးပြု၍ ရေးပါ",
                    "target": "書いてください",
                    "my": "ကျေးဇူးပြု၍ ရေးပါ"
                  },
                  {
                    "a": "座ってください",
                    "b": "ကျေးဇူးပြု၍ ထိုင်ပါ",
                    "target": "座ってください",
                    "my": "ကျေးဇူးပြု၍ ထိုင်ပါ"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "en": {
    "language": "English",
    "flag": "🇺🇸",
    "units": [
      {
        "id": "en_u1",
        "title": "Unit 1: Everyday Conversations & Greetings",
        "subtitle": "နေ့စဉ်သုံး အင်္ဂလိပ်စကားပြောနှင့် မိတ်ဆက်ခြင်း",
        "color": "#f43f5e",
        "icon": "🌸",
        "levels": [
          {
            "id": "en_u1_l1",
            "title": "Lesson 1: Friendly Everyday Greetings",
            "desc": "Hello, How are you doing?, Nice to meet you",
            "icon": "✨",
            "xp": 20,
            "questions": [
              {
                "type": "choice",
                "prompt": "What is the natural and friendly response to \"How are you doing?\"",
                "audioText": "I am doing great, thank you!",
                "audioLang": "en",
                "options": [
                  "I am doing great, thank you! (ကျွန်မ အရမ်းကောင်းပါတယ်၊ ကျေးဇူးတင်ပါတယ်)",
                  "I am 20 years old (အသက် ၂၀ ပါ)",
                  "My name is Htet (နာမည် ထက် ပါ)",
                  "Goodbye (နှုတ်ဆက်ပါတယ်)"
                ],
                "correctIndex": 0,
                "tip": "\"I'm doing great, thanks!\" is warm, natural, and friendly."
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"It is really nice to meet you\"",
                "audioText": "It is really nice to meet you",
                "audioLang": "en",
                "targetSentence": [
                  "It",
                  "is",
                  "really",
                  "nice",
                  "to",
                  "meet",
                  "you"
                ],
                "words": [
                  "It",
                  "is",
                  "really",
                  "nice",
                  "to",
                  "meet",
                  "you",
                  "see",
                  "good",
                  "day"
                ],
                "tip": "\"Nice to meet you\" establishes connection when meeting someone for the first time."
              },
              {
                "type": "match",
                "prompt": "Match everyday English phrases with Burmese",
                "pairs": [
                  {
                    "a": "Good morning",
                    "b": "မင်္ဂလာနံနက်ခင်းပါ"
                  },
                  {
                    "a": "Have a wonderful day",
                    "b": "သာယာသောနေ့လေးဖြစ်ပါစေ"
                  },
                  {
                    "a": "Take good care",
                    "b": "ဂရုစိုက်ပါနော်"
                  },
                  {
                    "a": "See you soon",
                    "b": "မကြာခင် ပြန်တွေ့ကြမယ်"
                  }
                ]
              },
              {
                "type": "choice",
                "prompt": "Someone offers you help. How do you politely accept?",
                "audioText": "Thank you, that would be lovely!",
                "audioLang": "en",
                "options": [
                  "Thank you, that would be lovely! (ကျေးဇူးတင်ပါတယ်ရှင်၊ သိပ်ကောင်းတာပေါ့)",
                  "No, go away (မလာပါနဲ့)",
                  "Who are you? (ဘယ်သူလဲ)",
                  "I don't know (မသိဘူး)"
                ],
                "correctIndex": 0,
                "tip": "\"That would be lovely!\" sounds polite, confident, and sweet."
              }
            ]
          },
          {
            "id": "en_u1_l2",
            "title": "Lesson 2: Ordering at a Restaurant & Cafe",
            "desc": "Can I have, Please, The check please",
            "icon": "☕",
            "xp": 25,
            "questions": [
              {
                "type": "word_bank",
                "prompt": "Assemble: \"Could I please have an iced latte?\"",
                "audioText": "Could I please have an iced latte?",
                "audioLang": "en",
                "targetSentence": [
                  "Could",
                  "I",
                  "please",
                  "have",
                  "an",
                  "iced",
                  "latte?"
                ],
                "words": [
                  "Could",
                  "I",
                  "please",
                  "have",
                  "an",
                  "iced",
                  "latte?",
                  "want",
                  "give",
                  "bill"
                ],
                "tip": "\"Could I please have [Item]?\" is the most polite, native way to order."
              },
              {
                "type": "choice",
                "prompt": "How do you ask for the bill at the end of your meal?",
                "audioText": "Could we get the check, please?",
                "audioLang": "en",
                "options": [
                  "Could we get the check, please? (ငွေရှင်းပေးပါဦးရှင်)",
                  "Where is the food? (အစားအသောက် ဘယ်မှာလဲ)",
                  "Give me money (ပိုက်ဆံပေးပါ)",
                  "I want to sleep (အိပ်ချင်တယ်)"
                ],
                "correctIndex": 0,
                "tip": "In US English \"check\" is common; in UK English \"bill\" is used."
              },
              {
                "type": "match",
                "prompt": "Match cafe and dining vocabulary",
                "pairs": [
                  {
                    "a": "Delicious",
                    "b": "အရသာရှိသော"
                  },
                  {
                    "a": "Recommendation",
                    "b": "အကြံပြုချက်"
                  },
                  {
                    "a": "Receipt",
                    "b": "ပြေစာ / ဘောက်ချာ"
                  },
                  {
                    "a": "Takeaway / To go",
                    "b": "ပါဆယ်ယူမည်"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "en_u2",
        "title": "Unit 2: Confidence & Expressing Opinions",
        "subtitle": "မိမိကိုယ်ကို ယုံကြည်မှုနှင့် ထင်မြင်ချက်ထုတ်ဖော်ခြင်း",
        "color": "#10b981",
        "icon": "👑",
        "levels": [
          {
            "id": "en_u2_l1",
            "title": "Lesson 1: Sharing Ideas Confidently",
            "desc": "In my view, I believe, Let us collaborate",
            "icon": "💼",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "How do you introduce your perspective professionally?",
                "audioText": "From my perspective, this approach is very promising.",
                "audioLang": "en",
                "options": [
                  "From my perspective... (ကျွန်မ အမြင်အရဆိုရင်...)",
                  "Sorry I am stupid (ကျွန်မ အသုံးမကျပါဘူး)",
                  "Whatever you say (မင်းပြောသလိုပဲ)",
                  "I have no idea (ဘာမှမသိပါ)"
                ],
                "correctIndex": 0,
                "tip": "\"From my perspective\" establishes authority with grace."
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"I believe in my own potential\"",
                "audioText": "I believe in my own potential",
                "audioLang": "en",
                "targetSentence": [
                  "I",
                  "believe",
                  "in",
                  "my",
                  "own",
                  "potential"
                ],
                "words": [
                  "I",
                  "believe",
                  "in",
                  "my",
                  "own",
                  "potential",
                  "doubt",
                  "fear",
                  "never"
                ],
                "tip": "Believe in your unique strengths and vision."
              },
              {
                "type": "match",
                "prompt": "Match confidence & career terms",
                "pairs": [
                  {
                    "a": "Empowerment",
                    "b": "စွမ်းရည်မြှင့်တင်မှု"
                  },
                  {
                    "a": "Leadership",
                    "b": "ခေါင်းဆောင်မှု"
                  },
                  {
                    "a": "Confidence",
                    "b": "ယုံကြည်မှု"
                  },
                  {
                    "a": "Sisterhood",
                    "b": "ညီအစ်မစည်းလုံးမှု"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "en_em_verbs",
        "title": "Unit 3: Essential Verbs Mastery (EMDictionary Dataset)",
        "subtitle": "EMDictionary မှ ထုတ်နှုတ်ထားသော မရှိမဖြစ် ကြိယာဝေါဟာရများ",
        "color": "#0284c7",
        "icon": "📚",
        "levels": [
          {
            "id": "en_em_v1",
            "title": "Lesson 1: Learning & Action Verbs",
            "desc": "learn, speak, understand, discover",
            "icon": "✍️",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "According to EMDictionary, what does \"learn /lɜːn/\" mean?",
                "audioText": "learn",
                "audioLang": "en",
                "options": [
                  "သင်ယူသည် / လေ့လာသင်ကြားသည်",
                  "မေ့လျော့သည် (Forget)",
                  "ငြင်းပယ်သည် (Refuse)",
                  "အိပ်ပျော်သည် (Sleep)"
                ],
                "correctIndex": 0,
                "tip": "EMDictionary: learn (v) ၁။ သင်ယူသည်။ လေ့လာသင်ကြားသည်။ လေ့ကျက်သည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble the EMDictionary example sentence: \"She learns languages very quickly\"",
                "audioText": "She learns languages very quickly",
                "audioLang": "en",
                "targetSentence": [
                  "She",
                  "learns",
                  "languages",
                  "very",
                  "quickly"
                ],
                "words": [
                  "She",
                  "learns",
                  "languages",
                  "very",
                  "quickly",
                  "slow",
                  "never"
                ],
                "tip": "learn + s for third person singular."
              },
              {
                "type": "match",
                "prompt": "Match verbs from EMDictionary dataset",
                "pairs": [
                  {
                    "a": "learn",
                    "b": "သင်ယူသည်"
                  },
                  {
                    "a": "speak",
                    "b": "ပြောဆိုသည်"
                  },
                  {
                    "a": "understand",
                    "b": "နားလည်သဘောပေါက်သည်"
                  },
                  {
                    "a": "encourage",
                    "b": "အားပေးတိုက်တွန်းသည်"
                  }
                ]
              }
            ]
          },
          {
            "id": "en_em_v2",
            "title": "Lesson 2: Strength & Empathy Verbs",
            "desc": "achieve, empower, support, believe",
            "icon": "🌟",
            "xp": 30,
            "questions": [
              {
                "type": "choice",
                "prompt": "What does \"achieve /əˈtʃiːv/\" mean in EMDictionary?",
                "audioText": "achieve",
                "audioLang": "en",
                "options": [
                  "အောင်မြင်စွာ ပြီးမြောက်သည် / ရရှိသည်",
                  "ရှုံးနိမ့်သည် (Fail)",
                  "စွန့်ခွာသည် (Leave)",
                  "ပျက်စီးသည် (Break)"
                ],
                "correctIndex": 0,
                "tip": "EMDictionary: achieve (v) ၁။ ရရှိသည်။ ဆွတ်ခူးသည်။ ပြီးမြောက်သည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"Women can achieve any dream\"",
                "audioText": "Women can achieve any dream",
                "audioLang": "en",
                "targetSentence": [
                  "Women",
                  "can",
                  "achieve",
                  "any",
                  "dream"
                ],
                "words": [
                  "Women",
                  "can",
                  "achieve",
                  "any",
                  "dream",
                  "cannot",
                  "fear"
                ],
                "tip": "Believe in continuous learning and achievement."
              },
              {
                "type": "match",
                "prompt": "Match empowerment verbs from dataset",
                "pairs": [
                  {
                    "a": "achieve",
                    "b": "အောင်မြင်စွာရရှိသည်"
                  },
                  {
                    "a": "empower",
                    "b": "လုပ်ပိုင်ခွင့်စွမ်းရည်ပေးသည်"
                  },
                  {
                    "a": "support",
                    "b": "ရိုင်းပင်းကူညီသည်"
                  },
                  {
                    "a": "protect",
                    "b": "ကာကွယ်စောင့်ရှောက်သည်"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "en_em_adjectives",
        "title": "Unit 4: Expressive Adjectives (EMDictionary & POS)",
        "subtitle": "သရုပ်ဖော် နာမဝိသေသနများနှင့် စကားလုံးအလှများ",
        "color": "#8b5cf6",
        "icon": "🎨",
        "levels": [
          {
            "id": "en_em_adj1",
            "title": "Lesson 1: Character & Brilliance",
            "desc": "courageous, brilliant, compassionate, resilient",
            "icon": "💎",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "What does \"courageous /kəˈreɪ.dʒəs/\" mean in EMDictionary?",
                "audioText": "courageous",
                "audioLang": "en",
                "options": [
                  "ရဲရင့်သော / သတ္တိရှိသော",
                  "ကြောက်ရွံ့သော (Fearful)",
                  "စိတ်ဆိုးသော (Angry)",
                  "ပျင်းရိသော (Lazy)"
                ],
                "correctIndex": 0,
                "tip": "EMDictionary: courageous (adj) သတ္တိရှိသော။ ရဲရင့်သော။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"A courageous voice inspires the world\"",
                "audioText": "A courageous voice inspires the world",
                "audioLang": "en",
                "targetSentence": [
                  "A",
                  "courageous",
                  "voice",
                  "inspires",
                  "the",
                  "world"
                ],
                "words": [
                  "A",
                  "courageous",
                  "voice",
                  "inspires",
                  "the",
                  "world",
                  "silent",
                  "fear"
                ],
                "tip": "Expressing truth with bravery."
              },
              {
                "type": "match",
                "prompt": "Match descriptive adjectives from dataset",
                "pairs": [
                  {
                    "a": "courageous",
                    "b": "သတ္တိရှိသော"
                  },
                  {
                    "a": "brilliant",
                    "b": "ထက်မြက်ထူးချွန်သော"
                  },
                  {
                    "a": "resilient",
                    "b": "ကြံ့ကြံ့ခံနိုင်သော"
                  },
                  {
                    "a": "radiant",
                    "b": "ဝင်းလက်တောက်ပသော"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "en_u3",
        "title": "Unit 3: Max Mapper Common English Errors",
        "subtitle": "အသုံးမှားလေ့ရှိသော အင်္ဂလိပ်စကားလုံးများနှင့် သဒ္ဒါအမှားများ",
        "color": "#f97316",
        "icon": "⚠️",
        "levels": [
          {
            "id": "en_u3_l1",
            "title": "Lesson 1: Tricky Confused Word Pairs",
            "desc": "advice vs advise, affect vs effect, loose vs lose",
            "icon": "💡",
            "xp": 30,
            "questions": [
              {
                "type": "choice",
                "prompt": "Choose the correct word: \"Her feedback will positively ______ our team's outcome.\"",
                "audioText": "Her feedback will positively affect our team's outcome",
                "audioLang": "en",
                "options": [
                  "affect (verb)",
                  "effect (noun)",
                  "effected",
                  "affecting"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "⚠️ \"affect\" သည် ကြိယာ (verb: အကျိုးသက်ရောက်စေသည်) ဖြစ်ပြီး \"effect\" သည် နာမ် (noun: အကျိုးသက်ရောက်မှု) ဖြစ်ပါသည်။"
              },
              {
                "type": "choice",
                "prompt": "Choose the correct word: \"Thank you for the inspiring ______ you gave me.\"",
                "audioText": "Thank you for the inspiring advice you gave me",
                "audioLang": "en",
                "options": [
                  "advice (noun: အကြံဉာဏ်)",
                  "advise (verb: အကြံပေးသည်)",
                  "advises",
                  "advicing"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "⚠️ \"advice\" (with 'c') သည် နာမ်ဖြစ်ပြီး \"advise\" (with 's') သည် ကြိယာဖြစ်ပါသည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"Do not lose your inner confidence\" (Do not lose your inner confidence)",
                "audioText": "Do not lose your inner confidence",
                "audioLang": "en",
                "targetSentence": [
                  "Do",
                  "not",
                  "lose",
                  "your",
                  "inner",
                  "confidence"
                ],
                "words": [
                  "Do",
                  "not",
                  "lose",
                  "loose",
                  "your",
                  "inner",
                  "confidence"
                ],
                "correct": "Do not lose your inner confidence",
                "tip": "⚠️ \"lose\" = ဆုံးရှုံးသည် (verb)၊ \"loose\" = လျော့ရဲသော/မကျပ်သော (adjective) ဖြစ်သည်။"
              },
              {
                "type": "match",
                "prompt": "Match confusing word pairs with correct definitions",
                "pairs": [
                  {
                    "a": "advice",
                    "b": "အကြံဉာဏ် (Noun)",
                    "target": "advice",
                    "my": "အကြံဉာဏ် (Noun)"
                  },
                  {
                    "a": "advise",
                    "b": "အကြံပေးသည် (Verb)",
                    "target": "advise",
                    "my": "အကြံပေးသည် (Verb)"
                  },
                  {
                    "a": "affect",
                    "b": "သက်ရောက်မှုရှိသည် (Verb)",
                    "target": "affect",
                    "my": "သက်ရောက်မှုရှိသည် (Verb)"
                  },
                  {
                    "a": "effect",
                    "b": "ရလဒ် / အကျိုးသက်ရောက်မှု (Noun)",
                    "target": "effect",
                    "my": "ရလဒ် / အကျိုးသက်ရောက်မှု (Noun)"
                  }
                ]
              }
            ]
          },
          {
            "id": "en_u3_l2",
            "title": "Lesson 2: Tricky Spellings & Double Letters",
            "desc": "accidentally vs accidently, a lot vs alot, embarrass",
            "icon": "✍️",
            "xp": 30,
            "questions": [
              {
                "type": "choice",
                "prompt": "Which spelling is correct?",
                "audioText": "I accidentally deleted the draft",
                "audioLang": "en",
                "options": [
                  "accidentally (correct)",
                  "accidently (misspelled)",
                  "accidentaly (misspelled)",
                  "acidentally (misspelled)"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "⚠️ \"accidentally\" တွင် \"-al-ly\" ပါဝင်ရပါမည်။ \"accidently\" ဟု စာလုံးပေါင်းမှားလေ့ရှိပါသည်။"
              },
              {
                "type": "choice",
                "prompt": "Which phrase is grammatically standard?",
                "audioText": "We learned a lot of new skills today",
                "audioLang": "en",
                "options": [
                  "a lot (two separate words)",
                  "alot (incorrect single word)",
                  "allot (means to distribute)",
                  "a-lot"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "⚠️ \"a lot\" သည် စကားလုံးနှစ်လုံးခွဲရေးရပါသည်။ \"alot\" သည် အဘိဓာန်တွင် မရှိသော အမှားဖြစ်ပါသည်။"
              },
              {
                "type": "match",
                "prompt": "Match misspelled words with their correct spellings",
                "pairs": [
                  {
                    "a": "accidently ❌",
                    "b": "accidentally ✔️",
                    "target": "accidently ❌",
                    "my": "accidentally ✔️"
                  },
                  {
                    "a": "alot ❌",
                    "b": "a lot ✔️",
                    "target": "alot ❌",
                    "my": "a lot ✔️"
                  },
                  {
                    "a": "embarass ❌",
                    "b": "embarrass ✔️ (2 r, 2 s)",
                    "target": "embarass ❌",
                    "my": "embarrass ✔️ (2 r, 2 s)"
                  },
                  {
                    "a": "seperate ❌",
                    "b": "separate ✔️ (with 'a')",
                    "target": "seperate ❌",
                    "my": "separate ✔️ (with 'a')"
                  }
                ]
              }
            ]
          },
          {
            "id": "en_u3_l3",
            "title": "Lesson 3: Misused Everyday Phrases",
            "desc": "as opposed to, based on, in harm's way",
            "icon": "🗣️",
            "xp": 30,
            "questions": [
              {
                "type": "choice",
                "prompt": "Which idiom correctly means \"in contrast to\"?",
                "audioText": "She chose courage as opposed to fear",
                "audioLang": "en",
                "options": [
                  "as opposed to (correct)",
                  "as a pose to (misused)",
                  "as opposed for (incorrect)",
                  "as oppose to"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "⚠️ \"as opposed to\" ဟူသောအသုံးသည် အမှန်ဖြစ်ပြီး \"as a pose to\" ဟု အသံတူမှားယွင်းရေးလေ့ရှိပါသည်။"
              },
              {
                "type": "choice",
                "prompt": "Complete the phrase: \"This strategy is ______ solid market research.\"",
                "audioText": "This strategy is based on solid market research",
                "audioLang": "en",
                "options": [
                  "based on (standard English)",
                  "based around (misused phrase)",
                  "based with",
                  "based over"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "⚠️ Standard English တွင် \"based on\" ဟုသာ အသုံးပြုပါသည်။"
              },
              {
                "type": "match",
                "prompt": "Match misused phrases with accurate standard English",
                "pairs": [
                  {
                    "a": "as a pose to ❌",
                    "b": "as opposed to ✔️",
                    "target": "as a pose to ❌",
                    "my": "as opposed to ✔️"
                  },
                  {
                    "a": "in arm's way ❌",
                    "b": "in harm's way ✔️",
                    "target": "in arm's way ❌",
                    "my": "in harm's way ✔️"
                  },
                  {
                    "a": "deep-seeded ❌",
                    "b": "deep-seated ✔️",
                    "target": "deep-seeded ❌",
                    "my": "deep-seated ✔️"
                  },
                  {
                    "a": "could of ❌",
                    "b": "could have ✔️",
                    "target": "could of ❌",
                    "my": "could have ✔️"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "en_u4",
        "title": "Unit 4: Executive Leadership & Workplace Negotiations",
        "subtitle": "ခေါင်းဆောင်မှု၊ ညှိနှိုင်းဆွေးနွေးပွဲနှင့် ရုံးသုံး အင်္ဂလိပ်စာ",
        "color": "#3b82f6",
        "icon": "💼",
        "levels": [
          {
            "id": "en_u4_l1",
            "title": "Lesson 1: Diplomatic Disagreement & Finding Common Ground",
            "desc": "Perspectives, alignment, and respectful negotiations",
            "icon": "🤝",
            "xp": 30,
            "questions": [
              {
                "type": "choice",
                "prompt": "How do you diplomatically offer an alternative view in a meeting?",
                "audioText": "I appreciate your perspective; however, consider another angle",
                "audioLang": "en",
                "options": [
                  "I appreciate your perspective; however, let us also consider...",
                  "You are completely wrong",
                  "I don't care what you think",
                  "That makes no sense at all"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "\"I appreciate your perspective; however...\" သည် အစည်းအဝေးများတွင် သဘောထားကွဲလွဲမှုကို အလွန်ယဉ်ကျေးစွာ တင်ပြသည့် အသုံးဖြစ်ပါသည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"We reached a mutual agreement on all terms\"",
                "audioText": "We reached a mutual agreement on all terms",
                "audioLang": "en",
                "targetSentence": [
                  "We",
                  "reached",
                  "a",
                  "mutual",
                  "agreement",
                  "on",
                  "all",
                  "terms"
                ],
                "words": [
                  "We",
                  "reached",
                  "a",
                  "mutual",
                  "agreement",
                  "on",
                  "all",
                  "terms",
                  "disputed"
                ],
                "correct": "We reached a mutual agreement on all terms",
                "tip": "\"mutual agreement\" = နှစ်ဦးနှစ်ဖက် သဘောတူညီချက်။"
              },
              {
                "type": "match",
                "prompt": "Match executive negotiation terms",
                "pairs": [
                  {
                    "a": "alignment",
                    "b": "သဘောထား ညီညွတ်မျှတမှု",
                    "target": "alignment",
                    "my": "သဘောထား ညီညွတ်မျှတမှု"
                  },
                  {
                    "a": "common ground",
                    "b": "ဘုံသဘောတူညီချက်",
                    "target": "common ground",
                    "my": "ဘုံသဘောတူညီချက်"
                  },
                  {
                    "a": "stakeholders",
                    "b": "အကျိုးသက်ဆိုင်သူများ",
                    "target": "stakeholders",
                    "my": "အကျိုးသက်ဆိုင်သူများ"
                  },
                  {
                    "a": "deliverables",
                    "b": "ပြီးမြောက်ရမည့် ရလဒ်များ",
                    "target": "deliverables",
                    "my": "ပြီးမြောက်ရမည့် ရလဒ်များ"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "en_u5",
        "title": "Unit 5: LexiForge Sentence Smithing & Clause Matrix",
        "subtitle": "ဝါကျခွဲများ ပေါင်းစပ်ဖန်တီးခြင်းနှင့် အဆင့်မြင့် အင်္ဂလိပ်ဝါကျဖွဲ့စည်းပုံ",
        "color": "#8b5cf6",
        "icon": "🧱",
        "levels": [
          {
            "id": "en_u5_l1",
            "title": "Lesson 1: Matrix Clause Assembly & Relative Pronouns",
            "desc": "Independent & Dependent clauses, who, which, that",
            "icon": "🧩",
            "xp": 35,
            "questions": [
              {
                "type": "choice",
                "prompt": "Choose the correct relative pronoun for a person: \"The leader ______ inspired the community received the peace award.\"",
                "audioText": "The leader who inspired the community received the peace award",
                "audioLang": "en",
                "options": [
                  "who (referring to people)",
                  "which (referring to objects)",
                  "where (referring to place)",
                  "when (referring to time)"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "လူပုဂ္ဂိုလ် (people) ကို ပြန်လည်ညွှန်းဆိုသော Relative Pronoun အဖြစ် \"who\" ကို အသုံးပြုရပါမည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"Although she faced obstacles, she never surrendered\"",
                "audioText": "Although she faced obstacles, she never surrendered",
                "audioLang": "en",
                "targetSentence": [
                  "Although",
                  "she",
                  "faced",
                  "obstacles",
                  "she",
                  "never",
                  "surrendered"
                ],
                "words": [
                  "Although",
                  "she",
                  "faced",
                  "obstacles",
                  "she",
                  "never",
                  "surrendered",
                  "because",
                  "but"
                ],
                "correct": "Although she faced obstacles she never surrendered",
                "tip": "\"Although\" (သော်လည်း) သည် ဆန့်ကျင်ဘက် အလျော့ပေးပြ ဝါကျခွဲ (Adverbial Clause of Concession) ကို စတင်ရာတွင် သုံးသည်။"
              },
              {
                "type": "match",
                "prompt": "Match clause connectors with their grammatical functions",
                "pairs": [
                  {
                    "a": "who",
                    "b": "Relative Pronoun for People (လူပုဂ္ဂိုလ်ညွှန်း)",
                    "target": "who",
                    "my": "Relative Pronoun for People (လူပုဂ္ဂိုလ်ညွှန်း)"
                  },
                  {
                    "a": "which",
                    "b": "Relative Pronoun for Things (သက်မဲ့အရာဝတ္ထုညွှန်း)",
                    "target": "which",
                    "my": "Relative Pronoun for Things (သက်မဲ့အရာဝတ္ထုညွှန်း)"
                  },
                  {
                    "a": "although",
                    "b": "Subordinating Conjunction of Concession (အလျော့ပေးပြ)",
                    "target": "although",
                    "my": "Subordinating Conjunction of Concession (အလျော့ပေးပြ)"
                  },
                  {
                    "a": "because",
                    "b": "Subordinating Conjunction of Reason (အကြောင်းပြ)",
                    "target": "because",
                    "my": "Subordinating Conjunction of Reason (အကြောင်းပြ)"
                  }
                ]
              }
            ]
          },
          {
            "id": "en_u5_l2",
            "title": "Lesson 2: Syntactic Ambiguity & Modifier Placement",
            "desc": "Clear modifier positioning without confusion",
            "icon": "🎯",
            "xp": 35,
            "questions": [
              {
                "type": "choice",
                "prompt": "Which sentence avoids a dangling modifier and states meaning clearly?",
                "audioText": "Walking into the room, she saw the beautiful flowers",
                "audioLang": "en",
                "options": [
                  "Walking into the room, she saw the beautiful flowers. (Clear)",
                  "Walking into the room, the flowers were seen. (Dangling)",
                  "The flowers walked into the room. (Nonsense)",
                  "Walking the room saw her."
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "Participle (Walking into the room) ၏ အပြုလုပ်သူ (she) သည် ၎င်း၏ ကပ်လျက်တွင် ကတ္တားအဖြစ် ရှိနေရပါမည်။"
              },
              {
                "type": "match",
                "prompt": "Match ambiguous modifiers with their clear rewrites",
                "pairs": [
                  {
                    "a": "Driving fast, a dog was hit ❌",
                    "b": "Driving fast, she hit a dog ✔️",
                    "target": "Driving fast, a dog was hit ❌",
                    "my": "Driving fast, she hit a dog ✔️"
                  },
                  {
                    "a": "I saw the man with a telescope ❓",
                    "b": "Using a telescope, I saw the man ✔️",
                    "target": "I saw the man with a telescope ❓",
                    "my": "Using a telescope, I saw the man ✔️"
                  },
                  {
                    "a": "She almost drove for six hours",
                    "b": "She drove for almost six hours ✔️",
                    "target": "She almost drove for six hours",
                    "my": "She drove for almost six hours ✔️"
                  },
                  {
                    "a": "Covered in cream, she ate the cake",
                    "b": "She ate the cake covered in cream ✔️",
                    "target": "Covered in cream, she ate the cake",
                    "my": "She ate the cake covered in cream ✔️"
                  }
                ]
              }
            ]
          },
          {
            "id": "en_u5_l3",
            "title": "Lesson 3: Logical Discourse Connectors (Mahavivo Taxonomy)",
            "desc": "Mastering moreover, nevertheless, consequently, meanwhile",
            "icon": "🔗",
            "xp": 35,
            "questions": [
              {
                "type": "choice",
                "prompt": "Complete the sentence with an addition connector: \"The proposal is financially viable; ______, it aligns with our ethical vision.\"",
                "audioText": "The proposal is financially viable; moreover, it aligns with our vision",
                "audioLang": "en",
                "options": [
                  "moreover (ဒါ့အပြင် / ဖြည့်စွက်၍)",
                  "however (ဆန့်ကျင်ဘက်)",
                  "otherwise (မဟုတ်လျှင်)",
                  "instead (အစား)"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "\"moreover\" သို့မဟုတ် \"furthermore\" သည် ယခင်အချက်ကို ပိုမိုအားကောင်းစေရန် အချက်သစ် ဖြည့်စွက်ရာတွင် သုံးသည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"The team persevered; consequently, they achieved great triumph\"",
                "audioText": "The team persevered; consequently, they achieved great triumph",
                "audioLang": "en",
                "targetSentence": [
                  "The",
                  "team",
                  "persevered",
                  "consequently",
                  "they",
                  "achieved",
                  "great",
                  "triumph"
                ],
                "words": [
                  "The",
                  "team",
                  "persevered",
                  "consequently",
                  "they",
                  "achieved",
                  "great",
                  "triumph",
                  "however",
                  "though"
                ],
                "correct": "The team persevered consequently they achieved great triumph",
                "tip": "\"consequently\" (ရလဒ်အနေဖြင့်) သည် အကြောင်းရင်းကြောင့် ဖြစ်ပေါ်လာသော အောင်မြင်မှုရလဒ်ကို ဖော်ပြသည်။"
              },
              {
                "type": "match",
                "prompt": "Match logical connectors with their Burmese meanings",
                "pairs": [
                  {
                    "a": "furthermore",
                    "b": "ဒါ့အပြင် / ထို့ပြင် (Addition)",
                    "target": "furthermore",
                    "my": "ဒါ့အပြင် / ထို့ပြင် (Addition)"
                  },
                  {
                    "a": "nevertheless",
                    "b": "သို့သော်ငြားလည်း (Contrast)",
                    "target": "nevertheless",
                    "my": "သို့သော်ငြားလည်း (Contrast)"
                  },
                  {
                    "a": "consequently",
                    "b": "အကျိုးဆက်အားဖြင့် (Causality)",
                    "target": "consequently",
                    "my": "အကျိုးဆက်အားဖြင့် (Causality)"
                  },
                  {
                    "a": "meanwhile",
                    "b": "ထိုအချိန်အတောအတွင်း (Temporal)",
                    "target": "meanwhile",
                    "my": "ထိုအချိန်အတောအတွင်း (Temporal)"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "zh": {
    "language": "Chinese",
    "flag": "🇨🇳",
    "units": [
      {
        "id": "zh_u1",
        "title": "Unit 1: Essential Mandarin Greetings",
        "subtitle": "တရုတ်စကားပြော အခြေခံ နှုတ်ဆက်ခြင်း",
        "color": "#f43f5e",
        "icon": "🏮",
        "levels": [
          {
            "id": "zh_u1_l1",
            "title": "Lesson 1: First Mandarin Words",
            "desc": "Nǐ hǎo, Xièxiè, Zàijiàn",
            "icon": "👋",
            "xp": 20,
            "questions": [
              {
                "type": "choice",
                "prompt": "What does \"你好 (Nǐ hǎo)\" mean?",
                "audioText": "你好",
                "audioLang": "zh",
                "options": [
                  "မင်္ဂလာပါ (Hello)",
                  "ကျေးဇူးတင်ပါတယ် (Thank you)",
                  "နှုတ်ဆက်ပါတယ် (Goodbye)",
                  "ဟုတ်တယ် (Yes)"
                ],
                "correctIndex": 0,
                "tip": "\"Nǐ hǎo\" is the universal greeting in Mandarin Chinese."
              },
              {
                "type": "word_bank",
                "prompt": "Translate to Chinese: \"Thank you very much\"",
                "audioText": "非常感谢",
                "audioLang": "zh",
                "targetSentence": [
                  "非常",
                  "感谢"
                ],
                "words": [
                  "非常",
                  "感谢",
                  "你好",
                  "再见",
                  "对不起"
                ],
                "tip": "\"Fēicháng gǎnxiè\" expresses heartfelt thanks."
              },
              {
                "type": "match",
                "prompt": "Match Chinese phrases with meanings",
                "pairs": [
                  {
                    "a": "你好 (Nǐ hǎo)",
                    "b": "မင်္ဂလာပါ"
                  },
                  {
                    "a": "谢谢 (Xièxiè)",
                    "b": "ကျေးဇူးတင်ပါတယ်"
                  },
                  {
                    "a": "再见 (Zàijiàn)",
                    "b": "နောက်မှတွေ့မယ်"
                  },
                  {
                    "a": "对不起 (Duìbuqǐ)",
                    "b": "တောင်းပန်ပါတယ်"
                  }
                ]
              },
              {
                "type": "choice",
                "prompt": "How do you say \"You are welcome\" in Chinese?",
                "audioText": "不客气",
                "audioLang": "zh",
                "options": [
                  "不客气 (Bú kèqi)",
                  "没关系 (Méi guānxi)",
                  "好的 (Hǎo de)",
                  "行 (Xíng)"
                ],
                "correctIndex": 0,
                "tip": "\"Bú kèqi\" literally means \"no need to be so polite/formal\"."
              }
            ]
          },
          {
            "id": "zh_u1_l2",
            "title": "Lesson 2: Shopping & Asking Price",
            "desc": "Duōshǎo qián, Tài guì le, Piàoliang",
            "icon": "🛍️",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "How do you ask \"How much is this?\" in Mandarin?",
                "audioText": "这个多少钱",
                "audioLang": "zh",
                "options": [
                  "这个多少钱 (Zhège duōshǎo qián?)",
                  "在哪里 (Zài nǎlǐ?)",
                  "是什么 (Shì shénme?)",
                  "怎么走 (Zěnme zǒu?)"
                ],
                "correctIndex": 0,
                "tip": "\"Zhège duōshǎo qián\" is essential for markets and shopping."
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"Very beautiful!\" (非常漂亮)",
                "audioText": "非常漂亮",
                "audioLang": "zh",
                "targetSentence": [
                  "非常",
                  "漂亮"
                ],
                "words": [
                  "非常",
                  "漂亮",
                  "多少",
                  "钱",
                  "好的"
                ],
                "tip": "\"Piàoliang\" means pretty, beautiful, or elegant."
              },
              {
                "type": "match",
                "prompt": "Match shopping phrases",
                "pairs": [
                  {
                    "a": "太棒了 (Tài bàng le)",
                    "b": "အရမ်းမိုက်တယ် / အကောင်းဆုံးပဲ"
                  },
                  {
                    "a": "便宜一点 (Piányi yīdiǎn)",
                    "b": "နည်းနည်းလျှော့ပေးပါ"
                  },
                  {
                    "a": "买单 (Mǎidān)",
                    "b": "ငွေရှင်းမယ်"
                  },
                  {
                    "a": "好吃 (Hǎochī)",
                    "b": "အရသာရှိတယ်"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "zh_u2",
        "title": "Unit 2: Traditional Tea Culture & Dining",
        "subtitle": "တရုတ်လက်ဖက်ရည် ယဉ်ကျေးမှုနှင့် စားသောက်ဆိုင်သုံးစကားများ",
        "color": "#e11d48",
        "icon": "🍵",
        "levels": [
          {
            "id": "zh_u2_l1",
            "title": "Lesson 1: Ordering Tea & Dim Sum",
            "desc": "Lǜchá, Bōbà nǎichá, Diǎnxin, Mǎidān",
            "icon": "🥟",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "How do you say \"I would like a cup of green tea, please\" in Mandarin?",
                "audioText": "请给我一杯绿茶",
                "audioLang": "zh",
                "options": [
                  "请给我一杯绿茶 (Qǐng gěi wǒ yībēi lǜchá)",
                  "我要喝水 (Wǒ yào hē shuǐ)",
                  "我不喜欢喝茶 (Wǒ bù xǐhuan hē chá)",
                  "买单 (Mǎidān)"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "「请给我... (Qǐng gěi wǒ...)」= \"ကျေးဇူးပြု၍ ... ပေးပါ\" ဟု စားသောက်ဆိုင်တွင် အသုံးများပါသည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"Excuse me, check the bill please\" (服务员，买单)",
                "audioText": "服务员，买单",
                "audioLang": "zh",
                "targetSentence": [
                  "服务员",
                  "买单"
                ],
                "words": [
                  "服务员",
                  "买单",
                  "你好",
                  "点菜"
                ],
                "correct": "服务员买单",
                "tip": "「买单 (Mǎidān)」ဆိုသည်မှာ \"ငွေရှင်းမယ်\" ဟု အဓိပ္ပာယ်ရပါသည်။"
              },
              {
                "type": "match",
                "prompt": "Match Chinese dining words",
                "pairs": [
                  {
                    "a": "绿茶 (Lǜchá)",
                    "b": "လက်ဖက်ရည်စိမ်း (Green Tea)",
                    "target": "绿茶 (Lǜchá)",
                    "my": "လက်ဖက်ရည်စိမ်း (Green Tea)"
                  },
                  {
                    "a": "奶茶 (Nǎichá)",
                    "b": "လက်ဖက်ရည်နို့ (Milk Tea)",
                    "target": "奶茶 (Nǎichá)",
                    "my": "လက်ဖက်ရည်နို့ (Milk Tea)"
                  },
                  {
                    "a": "点心 (Diǎnxin)",
                    "b": "ဒင်းဆမ်း / မုန့် (Dim Sum)",
                    "target": "点心 (Diǎnxin)",
                    "my": "ဒင်းဆမ်း / မုန့် (Dim Sum)"
                  },
                  {
                    "a": "好吃 (Hǎochī)",
                    "b": "အရသာရှိတယ် (Delicious)",
                    "target": "好吃 (Hǎochī)",
                    "my": "အရသာရှိတယ် (Delicious)"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "zh_u3",
        "title": "Unit 3: Shopping & Asking Prices",
        "subtitle": "ဈေးဝယ်ထွက်ခြင်းနှင့် ဈေးနှုန်းမေးမြန်းခြင်း",
        "color": "#d97706",
        "icon": "🛍️",
        "levels": [
          {
            "id": "zh_u3_l1",
            "title": "Lesson 1: How Much Is This? (这个多少钱)",
            "desc": "Duōshao qián, Tài guì le, Piányi yīdiǎn",
            "icon": "🏷️",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "How do you ask \"How much is this?\" in Mandarin?",
                "audioText": "这个多少钱",
                "audioLang": "zh",
                "options": [
                  "这个多少钱？ (Zhège duōshao qián?)",
                  "你在哪里？ (Nǐ zài nǎlǐ?)",
                  "什么时候？ (Shénme shíhou?)",
                  "你是谁？ (Nǐ shì shéi?)"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "「多少钱 (duōshao qián)」ဆိုသည်မှာ \"ဘယ်လောက်ကျသလဲ\" ဟု ဈေးနှုန်းမေးမြန်းခြင်း ဖြစ်ပါသည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"A little cheaper please\" (便宜一点吧)",
                "audioText": "便宜一点吧",
                "audioLang": "zh",
                "targetSentence": [
                  "便宜",
                  "一点",
                  "吧"
                ],
                "words": [
                  "便宜",
                  "一点",
                  "吧",
                  "太贵",
                  "多少"
                ],
                "correct": "便宜一点吧",
                "tip": "「便宜一点 (Piányi yīdiǎn)」= နည်းနည်းလျှော့ပေးပါ။"
              },
              {
                "type": "match",
                "prompt": "Match Mandarin market phrases",
                "pairs": [
                  {
                    "a": "太贵了 (Tài guì le)",
                    "b": "အရမ်းဈေးကြီးတယ် (Too expensive)",
                    "target": "太贵了 (Tài guì le)",
                    "my": "အရမ်းဈေးကြီးတယ် (Too expensive)"
                  },
                  {
                    "a": "便宜 (Piányi)",
                    "b": "ဈေးသက်သာသော (Cheap)",
                    "target": "便宜 (Piányi)",
                    "my": "ဈေးသက်သာသော (Cheap)"
                  },
                  {
                    "a": "现金 (Xiànjīn)",
                    "b": "ငွေသား (Cash)",
                    "target": "现金 (Xiànjīn)",
                    "my": "ငွေသား (Cash)"
                  },
                  {
                    "a": "刷卡 (Shuākǎ)",
                    "b": "ကတ်ဖြင့်ရှင်းမည် (Pay by card)",
                    "target": "刷卡 (Shuākǎ)",
                    "my": "ကတ်ဖြင့်ရှင်းမည် (Pay by card)"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "th": {
    "language": "Thai",
    "flag": "🇹🇭",
    "units": [
      {
        "id": "th_u1",
        "title": "Unit 1: Polite Thai Everyday Phrases",
        "subtitle": "ထိုင်းစကားပြော အခြေခံနှင့် ယဉ်ကျေးသော စကားလုံးများ",
        "color": "#f43f5e",
        "icon": "🌺",
        "levels": [
          {
            "id": "th_u1_l1",
            "title": "Lesson 1: Greetings & Politeness",
            "desc": "Sawatdee kha, Khob khun kha",
            "icon": "🙏",
            "xp": 20,
            "questions": [
              {
                "type": "choice",
                "prompt": "What does \"สวัสดีค่ะ (Sawatdee kha)\" mean when spoken by a female?",
                "audioText": "สวัสดีค่ะ",
                "audioLang": "th",
                "options": [
                  "မင်္ဂလာပါ (Hello / Greetings)",
                  "ကျေးဇူးတင်ပါတယ် (Thank you)",
                  "စားပြီးပြီလား (Have you eaten?)",
                  "သွားပါဦးမယ် (Goodbye)"
                ],
                "correctIndex": 0,
                "tip": "Females end polite sentences with \"kha\" (ค่ะ), while males use \"khrap\" (ครับ)."
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"Thank you very much\" (ขอบคุณ มาก ค่ะ)",
                "audioText": "ขอบคุณมากค่ะ",
                "audioLang": "th",
                "targetSentence": [
                  "ขอบคุณ",
                  "มาก",
                  "ค่ะ"
                ],
                "words": [
                  "ขอบคุณ",
                  "มาก",
                  "ค่ะ",
                  "สวัสดี",
                  "ไม่เป็นไร"
                ],
                "tip": "\"Khob khun mak kha\" means thank you very much."
              },
              {
                "type": "match",
                "prompt": "Match Thai expressions with Burmese",
                "pairs": [
                  {
                    "a": "สวัสดีค่ะ (Sawatdee kha)",
                    "b": "မင်္ဂလာပါ"
                  },
                  {
                    "a": "ขอบคุณค่ะ (Khob khun kha)",
                    "b": "ကျေးဇူးတင်ပါတယ်"
                  },
                  {
                    "a": "ไม่เป็นไรค่ะ (Mai pen rai kha)",
                    "b": "ကိစ္စမရှိပါဘူး / ရပါတယ်"
                  },
                  {
                    "a": "อร่อยมาก (Aroy mak)",
                    "b": "အရမ်းအရသာရှိတယ်"
                  }
                ]
              },
              {
                "type": "choice",
                "prompt": "How do you ask \"How much is this?\" in Thai?",
                "audioText": "อันนี้เท่าไหร่คะ",
                "audioLang": "th",
                "options": [
                  "อันนี้เท่าไหร่คะ (An nee tao rai kha?)",
                  "อยู่ที่ไหนคะ (Yoo tee nai kha?)",
                  "ชื่ออะไรคะ (Cheu arai kha?)",
                  "ไปไหนคะ (Pai nai kha?)"
                ],
                "correctIndex": 0,
                "tip": "\"Tao rai\" means how much."
              }
            ]
          }
        ]
      },
      {
        "id": "th_u2",
        "title": "Unit 2: Bangkok Night Markets & Street Food",
        "subtitle": "ဘန်ကောက် ညဈေးတန်းနှင့် လမ်းဘေးအစားအသောက်များ",
        "color": "#059669",
        "icon": "🍜",
        "levels": [
          {
            "id": "th_u2_l1",
            "title": "Lesson 1: Pad Thai & Mango Sticky Rice",
            "desc": "Pad Thai, Khao Niew Mamuang, Aroy mak",
            "icon": "🥭",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "How do you say \"Not spicy, please\" in Thai?",
                "audioText": "ไม่เผ็ดค่ะ",
                "audioLang": "th",
                "options": [
                  "ไม่เผ็ดค่ะ (Mai phed kha)",
                  "เผ็ดมากค่ะ (Phed mak kha)",
                  "อร่อยมากค่ะ (Aroy mak kha)",
                  "หิวข้าวค่ะ (Hiw khao kha)"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "「ไม่เผ็ด (Mai phed)」= မစပ်ပါနဲ့။ မိန်းကလေးများ အဆုံးတွင် \"ค่ะ (kha)\" ထည့်ပြောရပါမည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"Very delicious!\" (อร่อย มาก ค่ะ)",
                "audioText": "อร่อยมากค่ะ",
                "audioLang": "th",
                "targetSentence": [
                  "อร่อย",
                  "มาก",
                  "ค่ะ"
                ],
                "words": [
                  "อร่อย",
                  "มาก",
                  "ค่ะ",
                  "เผ็ด",
                  "ไม่"
                ],
                "correct": "อร่อยมากค่ะ",
                "tip": "「อร่อยมาก (Aroy mak)」ဆိုသည်မှာ \"အရမ်း အရသာရှိတယ်\" ဟု ချီးကျူးစကား ဖြစ်ပါသည်။"
              },
              {
                "type": "match",
                "prompt": "Match Thai street food words",
                "pairs": [
                  {
                    "a": "ผัดไทย (Pad Thai)",
                    "b": "ဖတ်ထိုင်းခေါက်ဆွဲကြော်",
                    "target": "ผัดไทย (Pad Thai)",
                    "my": "ဖတ်ထိုင်းခေါက်ဆွဲကြော်"
                  },
                  {
                    "a": "ต้มยำกุ้ง (Tom Yum Goong)",
                    "b": "ပုဇွန်တုန်ယမ်းဟင်းချို",
                    "target": "ต้มยำกุ้ง (Tom Yum Goong)",
                    "my": "ပုဇွန်တုန်ယမ်းဟင်းချို"
                  },
                  {
                    "a": "ข้าวเหนียวมะม่วง",
                    "b": "သရက်သီးကောက်ညှင်းမုန့်",
                    "target": "ข้าวเหนียวมะม่วง",
                    "my": "သရက်သီးကောက်ညှင်းမုန့်"
                  },
                  {
                    "a": "เช็คบิลด้วยค่ะ (Check bin)",
                    "b": "ဘေလ်ရှင်းပေးပါရှင်",
                    "target": "เช็คบิลด้วยค่ะ (Check bin)",
                    "my": "ဘေလ်ရှင်းပေးပါရှင်"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "th_u3",
        "title": "Unit 3: Friendly Transit & Getting Around",
        "subtitle": "ခရီးသွားလာခြင်းနှင့် လမ်းညွှန်မေးမြန်းခြင်း",
        "color": "#0284c7",
        "icon": "🚖",
        "levels": [
          {
            "id": "th_u3_l1",
            "title": "Lesson 1: Taxi, BTS & Directions",
            "desc": "Pai Siam, Liaw sai, Liaw khwa, Thao rai",
            "icon": "🗺️",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "How do you say \"Please turn left\" in Thai?",
                "audioText": "เลี้ยวซ้ายค่ะ",
                "audioLang": "th",
                "options": [
                  "เลี้ยวซ้ายค่ะ (Liaw sai kha)",
                  "เลี้ยวขวาค่ะ (Liaw khwa kha)",
                  "ตรงไปค่ะ (Trong pai kha)",
                  "หยุดที่นี่ค่ะ (Yut thee nee kha)"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "「ซ้าย (sai)」= ဘယ်ဘက်၊ 「ขวา (khwa)」= ညာဘက် ဖြစ်ပါသည်။"
              },
              {
                "type": "match",
                "prompt": "Match Thai navigation terms",
                "pairs": [
                  {
                    "a": "เลี้ยวซ้าย (Liaw sai)",
                    "b": "ဘယ်ဘက်ကွေ့ပါ",
                    "target": "เลี้ยวซ้าย (Liaw sai)",
                    "my": "ဘယ်ဘက်ကွေ့ပါ"
                  },
                  {
                    "a": "เลี้ยวขวา (Liaw khwa)",
                    "b": "ညာဘက်ကွေ့ပါ",
                    "target": "เลี้ยวขวา (Liaw khwa)",
                    "my": "ညာဘက်ကွေ့ပါ"
                  },
                  {
                    "a": "ตรงไป (Trong pai)",
                    "b": "တည့်တည့်သွားပါ",
                    "target": "ตรงไป (Trong pai)",
                    "my": "တည့်တည့်သွားပါ"
                  },
                  {
                    "a": "เท่าไหร่คะ (Thao rai kha)",
                    "b": "ဘယ်လောက်ကျပါသလဲရှင်",
                    "target": "เท่าไหร่คะ (Thao rai kha)",
                    "my": "ဘယ်လောက်ကျပါသလဲရှင်"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "my": {
    "language": "Burmese",
    "flag": "🇲🇲",
    "units": [
      {
        "id": "my_u1",
        "title": "Unit 1: Essential Myanmar Greetings",
        "subtitle": "မြန်မာဘာသာ နှုတ်ဆက်ခြင်းနှင့် နေ့စဉ်အသုံးအနှုန်းများ",
        "color": "#f43f5e",
        "icon": "🌸",
        "levels": [
          {
            "id": "my_u1_l1",
            "title": "Lesson 1: Greetings & Warmth",
            "desc": "Mingalaba, Kyei-zu-tin-ba-de, Ne-kaung-la",
            "icon": "🙏",
            "xp": 20,
            "questions": [
              {
                "type": "choice",
                "prompt": "What does \"မင်္ဂလာပါ (Mingalaba)\" mean?",
                "audioText": "မင်္ဂလာပါ",
                "audioLang": "my",
                "options": [
                  "Hello / Blessings upon you",
                  "Thank you",
                  "Goodbye",
                  "Good night"
                ],
                "correctIndex": 0,
                "tip": "\"Mingalaba\" is the auspicious traditional greeting of Myanmar, meaning \"auspicious blessings to you\"."
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"Thank you very much\" (ကျေးဇူး အများကြီး တင်ပါတယ်)",
                "audioText": "ကျေးဇူးအများကြီးတင်ပါတယ်",
                "audioLang": "my",
                "targetSentence": [
                  "ကျေးဇူး",
                  "အများကြီး",
                  "တင်ပါတယ်"
                ],
                "words": [
                  "ကျေးဇူး",
                  "အများကြီး",
                  "တင်ပါတယ်",
                  "မင်္ဂလာပါ",
                  "ဟုတ်ကဲ့"
                ],
                "tip": "\"Kyei-zu tin-ba-de\" expresses sincere gratitude in Burmese."
              },
              {
                "type": "match",
                "prompt": "Match Myanmar phrases with English",
                "pairs": [
                  {
                    "a": "မင်္ဂလာပါ",
                    "b": "Hello (Mingalaba)"
                  },
                  {
                    "a": "ကျေးဇူးတင်ပါတယ်",
                    "b": "Thank you"
                  },
                  {
                    "a": "နေကောင်းလား",
                    "b": "How are you?"
                  },
                  {
                    "a": "ကောင်းပါတယ်",
                    "b": "I am fine / Good"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "my_heritage_names",
        "title": "Unit 2: Myanmar Female Names & Heritage (L16H7 Dataset)",
        "subtitle": "မြန်မာအမျိုးသမီး နာမည်များ၊ အဓိပ္ပာယ်များနှင့် ယဉ်ကျေးမှု",
        "color": "#ec4899",
        "icon": "🌸",
        "levels": [
          {
            "id": "my_name_l1",
            "title": "Lesson 1: Royal Flowers & Cherished Daughters",
            "desc": "သဇင် (Thazin), မေ (May), ထက် (Htet)",
            "icon": "🌺",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "What is the cultural symbolism of the Myanmar name \"သဇင် (Thazin)\"?",
                "audioText": "သဇင်",
                "audioLang": "my",
                "options": [
                  "တော်ဝင်သဇင်ပန်း / ဖြူစင်မြင့်မြတ်ခြင်း (Royal Orchid)",
                  "နေမင်းကြီး (Sun)",
                  "ပင်လယ် (Ocean)",
                  "မိုးကြိုး (Thunder)"
                ],
                "correctIndex": 0,
                "tip": "သဇင်ပန်းသည် သန့်စင်ဖြူစင်မှု၊ ကျက်သရေနှင့် မာန်မာနရှိသော တော်ဝင်ပန်း ဖြစ်ပါသည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble the female name meaning: \"မေ သည် ချစ်ခင်မြတ်နိုးဖွယ်ကောင်းသော သမီးငယ်\"",
                "audioText": "မေသည် ချစ်ခင်မြတ်နိုးဖွယ်ကောင်းသော သမီးငယ်",
                "audioLang": "my",
                "targetSentence": [
                  "မေ",
                  "သည်",
                  "ချစ်ခင်မြတ်နိုးဖွယ်ကောင်းသော",
                  "သမီးငယ်"
                ],
                "words": [
                  "မေ",
                  "သည်",
                  "ချစ်ခင်မြတ်နိုးဖွယ်ကောင်းသော",
                  "သမီးငယ်",
                  "ရန်သူ",
                  "မကောင်းသော"
                ],
                "tip": "\"မေ\" ဆိုသည်မှာ မိဘဆွေမျိုးတို့ ချစ်ခင်မြတ်နိုးရသော သမီးမိန်းကလေး ဖြစ်ပါသည်။"
              },
              {
                "type": "match",
                "prompt": "Match Myanmar female names with meanings from dataset",
                "pairs": [
                  {
                    "a": "သဇင် (Thazin)",
                    "b": "တော်ဝင်သဇင်ပန်း၊ ဖြူစင်ခြင်း"
                  },
                  {
                    "a": "မေ (May)",
                    "b": "ချစ်မြတ်နိုးဖွယ် သမီးငယ်"
                  },
                  {
                    "a": "ထက် (Htet)",
                    "b": "ထက်မြက်ခြင်း၊ ထူးချွန်ခြင်း"
                  },
                  {
                    "a": "ခင် (Khin)",
                    "b": "မေတ္တာရှိခြင်း၊ ခင်မင်တတ်ခြင်း"
                  }
                ]
              }
            ]
          },
          {
            "id": "my_karen_l1",
            "title": "Lesson 2: Karen Ethnic Language Greetings (Karen Dataset)",
            "desc": "မုဂ့ၤ (Mu-ge), တာဘလူး (Ta-blu)",
            "icon": "🌿",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "In Sgaw Karen language, what does \"တာဘလူး (Ta-blu)\" mean?",
                "audioText": "တာဘလူး",
                "audioLang": "my",
                "options": [
                  "ကျေးဇူးတင်ပါတယ် (Thank you)",
                  "နှုတ်ဆက်ပါတယ် (Goodbye)",
                  "သွားတော့ (Go away)",
                  "မသိပါ (Don't know)"
                ],
                "correctIndex": 0,
                "tip": "\"တာဘလူး\" (Ta-blu) သည် ကရင်ဘာသာစကားဖြင့် \"ကျေးဇူးတင်ပါတယ်\" ဟု အဓိပ္ပာယ်ရပါသည်။"
              },
              {
                "type": "match",
                "prompt": "Match Karen words with Burmese meanings",
                "pairs": [
                  {
                    "a": "တာဘလူး",
                    "b": "ကျေးဇူးတင်ပါတယ်"
                  },
                  {
                    "a": "မုဂ့ၤ",
                    "b": "မင်္ဂလာပါ / နှုတ်ခွန်းဆက်"
                  },
                  {
                    "a": "ကညီ",
                    "b": "ကရင်လူမျိုး"
                  },
                  {
                    "a": "ဆိုး",
                    "b": "ချစ်သည်"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "my_u2",
        "title": "Unit 2: Traditional Tea Shop & Hospitality Culture",
        "subtitle": "ရိုးရာလက်ဖက်ရည်ဆိုင်ယဉ်ကျေးမှုနှင့် ဧည့်ဝတ်ကျေပွန်ခြင်း",
        "color": "#ca8a04",
        "icon": "☕",
        "levels": [
          {
            "id": "my_u2_l1",
            "title": "Lesson 1: Ordering Laphet Yay & Snacks",
            "desc": "လက်ဖက်ရည်၊ ချိုစိမ့်၊ ပေါက်စီ၊ အီကြာကွေး",
            "icon": "🫖",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "မြန်မာ့လက်ဖက်ရည်ဆိုင်တွင် \"ချိုစိမ့်\" မှာယူလိုပါက မည်သို့ပြောဆိုရမည်နည်း။",
                "audioText": "လက်ဖက်ရည် ချိုစိမ့်တစ်ခွက် ပေးပါခင်ဗျာ",
                "audioLang": "my",
                "options": [
                  "လက်ဖက်ရည် ချိုစိမ့်တစ်ခွက် ပေးပါ (Sweet & Creamy Tea)",
                  "ရေနွေးကြမ်း ပေးပါ",
                  "ကော်ဖီ ပေါ့ကျ ပေးပါ",
                  "အချိုရည် ပေးပါ"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "\"ချိုစိမ့်\" သည် မြန်မာလက်ဖက်ရည်တွင် နို့ဆီနှင့် နို့စိမ်း အချိုးညီ ရောစပ်ထားသော အရသာဖြစ်ပါသည်။"
              },
              {
                "type": "word_bank",
                "prompt": "Assemble: \"လက်ဖက်ရည်ဆိုင် ထိုင်ကြရအောင်\"",
                "audioText": "လက်ဖက်ရည်ဆိုင် ထိုင်ကြရအောင်",
                "audioLang": "my",
                "targetSentence": [
                  "လက်ဖက်ရည်ဆိုင်",
                  "ထိုင်ကြရအောင်"
                ],
                "words": [
                  "လက်ဖက်ရည်ဆိုင်",
                  "ထိုင်ကြရအောင်",
                  "သွားမယ်",
                  "စားမယ်"
                ],
                "correct": "လက်ဖက်ရည်ဆိုင် ထိုင်ကြရအောင်",
                "tip": "လက်ဖက်ရည်ဆိုင်သည် မြန်မာလူမှုဘဝတွင် ခင်မင်ရင်းနှီးစွာ စကားပြောဆိုရာ အဓိကနေရာဖြစ်ပါသည်။"
              },
              {
                "type": "match",
                "prompt": "Match Myanmar tea shop drinks and snacks",
                "pairs": [
                  {
                    "a": "ချိုစိမ့်",
                    "b": "ချို၍ စိမ့်သော လက်ဖက်ရည်",
                    "target": "ချိုစိမ့်",
                    "my": "ချို၍ စိမ့်သော လက်ဖက်ရည်"
                  },
                  {
                    "a": "ပေါ့ကျ",
                    "b": "ဖန်ခါးပြီး အချိုနည်းသော လက်ဖက်ရည်",
                    "target": "ပေါ့ကျ",
                    "my": "ဖန်ခါးပြီး အချိုနည်းသော လက်ဖက်ရည်"
                  },
                  {
                    "a": "အီကြာကွေး",
                    "b": "ရိုးရာဆီကြော်မုန့် (Fried dough)",
                    "target": "အီကြာကွေး",
                    "my": "ရိုးရာဆီကြော်မုန့် (Fried dough)"
                  },
                  {
                    "a": "ရေနွေးကြမ်း",
                    "b": "အခမဲ့ တည်ခင်းသော လက်ဖက်ရည်ကြမ်း",
                    "target": "ရေနွေးကြမ်း",
                    "my": "အခမဲ့ တည်ခင်းသော လက်ဖက်ရည်ကြမ်း"
                  }
                ]
              }
            ]
          }
        ]
      },
      {
        "id": "my_u3",
        "title": "Unit 3: Festivals, Seasons & Golden Heritage",
        "subtitle": "ရိုးရာပွဲတော်များ၊ ရာသီဥတုနှင့် ယဉ်ကျေးမှုအမွေအနှစ်",
        "color": "#16a34a",
        "icon": "🏮",
        "levels": [
          {
            "id": "my_u3_l1",
            "title": "Lesson 1: Thingyan & Thadingyut Traditions",
            "desc": "သင်္ကြန်၊ သီတင်းကျွတ်၊ မီးထွန်းပွဲ၊ ကန်တော့ခြင်း",
            "icon": "💦",
            "xp": 25,
            "questions": [
              {
                "type": "choice",
                "prompt": "သီတင်းကျွတ် မီးထွန်းပွဲတော်တွင် လူကြီးမိဘများကို အဘယ်ကြောင့် ကန်တော့ကြသနည်း။",
                "audioText": "ဂါရဝတရားဖြင့် ကန်တော့ကြပါသည်",
                "audioLang": "my",
                "options": [
                  "ဂါရဝတရားထားရှိခြင်းနှင့် မေတ္တာတုံ့ပြန်ခြင်း (Respect & Gratitude)",
                  "ပျော်ပွဲရွှင်ပွဲသက်သက်ကြောင့်",
                  "မုန့်ဖိုးရလိုသောကြောင့်သာ",
                  "အလေ့အထ မဟုတ်ပါ"
                ],
                "correct": 0,
                "correctIndex": 0,
                "tip": "သီတင်းကျွတ်လပြည့်နေ့သည် မြတ်စွာဘုရား တာဝတိံသာမှ ဆင်းသက်တော်မူသော နေ့ထူးနေ့မြတ်ဖြစ်ပြီး လူကြီးမိဘများကို ရိုသေစွာ ကန်တော့ကြပါသည်။"
              },
              {
                "type": "match",
                "prompt": "Match Myanmar seasonal festivals",
                "pairs": [
                  {
                    "a": "သင်္ကြန်ပွဲတော်",
                    "b": "နှစ်သစ်ကူး ရေကစားပွဲ (Water Festival)",
                    "target": "သင်္ကြန်ပွဲတော်",
                    "my": "နှစ်သစ်ကူး ရေကစားပွဲ (Water Festival)"
                  },
                  {
                    "a": "သီတင်းကျွတ်ပွဲတော်",
                    "b": "မီးထွန်းပွဲတော်နှင့် ဂါရဝပြုပွဲ (Lighting Festival)",
                    "target": "သီတင်းကျွတ်ပွဲတော်",
                    "my": "မီးထွန်းပွဲတော်နှင့် ဂါရဝပြုပွဲ (Lighting Festival)"
                  },
                  {
                    "a": "တန်ဆောင်တိုင်ပွဲတော်",
                    "b": "မသိုးသင်္ကန်းရက်လုပ်ပွဲနှင့် မီးပုံးပျံပွဲ",
                    "target": "တန်ဆောင်တိုင်ပွဲတော်",
                    "my": "မသိုးသင်္ကန်းရက်လုပ်ပွဲနှင့် မီးပုံးပျံပွဲ"
                  },
                  {
                    "a": "ဝါဆိုပွဲတော်",
                    "b": "ဝါဆိုသင်္ကန်းကပ်လှူပွဲ",
                    "target": "ဝါဆိုပွဲတော်",
                    "my": "ဝါဆိုသင်္ကန်းကပ်လှူပွဲ"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  }
};

if (typeof window !== 'undefined') {
  window.HTET_CURRICULUM = HTET_CURRICULUM;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = HTET_CURRICULUM;
}
