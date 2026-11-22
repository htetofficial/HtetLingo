// HtetLingo AI Tutoring System (HtetAI Tutor)
// Empowered, Sisterhood & Feminist Conversational Practice for Women & Girls

class HtetAITutor {
  constructor() {
    this.scenarios = [
      {
        id: 'sisterhood_cafe',
        title: '🌸 Sisterhood Safe Space',
        description: 'A cozy, supportive space to chat about your dreams, daily life, and celebrate each other.',
        starter: {
          en: "Welcome to our Sisterhood Safe Space, lovely! 🌸 How has your day been treating you? What is on your mind?",
          ja: "シスターフッド・カフェへようこそ！🌸 今日もお疲れ様でした。何か素敵なことはありましたか？ (Konnichiwa! O-tsukaresama deshita...)",
          zh: "欢迎来到姐妹温暖角！🌸 今天过得开心吗？有什么想和我聊聊的心事吗？",
          my: "ညီအစ်မတွေရဲ့ နွေးထွေးတဲ့ စကားဝိုင်းက ကြိုဆိုပါတယ်ရှင်! 🌸 ဒီနေ့ ဘာတွေလုပ်ဖြစ်လဲ၊ စိတ်ထဲမှာ ဘာတွေရှိနေလဲ လွတ်လွတ်လပ်လပ် ပြောပြပါဦးနော်။",
          th: "ยินดีต้อนรับสู่พื้นที่ปลอดภัยของพวกเราค่ะ! 🌸 วันนี้เป็นอย่างไรบ้างคะ มีเรื่องอะไรอยากเล่าให้ฟังไหมคะ?",
          fr: "Bienvenue dans notre espace de sororité ! 🌸 Comment s'est passée ta journée ? Raconte-moi !",
          de: "Willkommen in unserem geschützten Raum für Schwestern! 🌸 Wie war dein Tag heute? Erzähl mir davon!",
          ko: "우리들의 따뜻한 쉼터에 오신 걸 환영해요! 🌸 오늘 하루는 어떠셨나요? 편하게 이야기 나눠요!"
        }
      },
      {
        id: 'leadership',
        title: '💼 Confident Female Leader',
        description: 'Practice speaking assertively in job interviews, meetings, and salary negotiations.',
        starter: {
          en: "Hello leader! ✨ I am thrilled to hear your vision. How do you plan to steer this project forward and empower your team?",
          ja: "リーダー、本日はお会いできて光栄です！✨ あなたの素晴らしいビジョンについて、ぜひお聞かせいただけますか？",
          zh: "领导者你好！✨ 很高兴能听取您的观点。请谈谈您将如何带领团队创新突破？",
          my: "မင်္ဂလာပါ ခေါင်းဆောင်ရှင်! ✨ သင့်ရဲ့ အဖိုးတန် အမြင်တွေကို ကြားချင်ပါတယ်။ ဒီပရောဂျက်ကို ဘယ်လို စိတ်ကူးသစ်တွေနဲ့ ဦးဆောင်သွားမလဲရှင်။",
          th: "สวัสดีค่ะผู้นำหญิงคนเก่ง! ✨ ยินดีที่ได้คุยกันนะคะ ช่วยเล่าวิสัยทัศน์ในการทำงานให้ฟังหน่อยค่ะ",
          fr: "Bonjour chère leader ! ✨ Pouvez-vous nous présenter votre vision stratégique pour cette initiative ?",
          de: "Guten Tag, liebe Führungskraft! ✨ Bitte teilen Sie Ihre Vision und Herangehensweise mit uns.",
          ko: "리더님, 안녕하세요! ✨ 팀을 이끌어갈 멋진 비전과 전략에 대해 말씀해 주시겠어요?"
        }
      },
      {
        id: 'solo_travel',
        title: '✈️ Solo Female Traveler & Safety',
        description: 'Practice navigating transit, asking for safe women-only cars, and setting boundaries.',
        starter: {
          en: "Welcome fellow adventurer! 🌍 Where are you exploring today? Let me help you navigate safely and confidently.",
          ja: "一人旅へようこそ！🌍 今日はどこを巡りますか？女性専用車両や安全なルートをご案内しますよ。",
          zh: "欢迎勇敢的独自旅行者！🌍 今天打算探索哪座城市？让我为您提供安心的安全指引。",
          my: "တစ်ဦးတည်း ခရီးသွား မိန်းကလေးရှင် မင်္ဂလာပါ! 🌍 ဒီနေ့ ဘယ်နေရာတွေကို သွားရောက်လေ့လာမှာလဲ၊ ဘေးကင်းလုံခြုံတဲ့ လမ်းကြောင်းတွေ ကူညီပေးပါရစေ။",
          th: "สวัสดีนักเดินทางเดี่ยวคนเก่ง! 🌍 วันนี้จะไปเที่ยวที่ไหนคะ ขอให้เดินทางอย่างปลอดภัยนะคะ",
          fr: "Bienvenue, voyageuse intrépide ! 🌍 Où t'emmènent tes pas aujourd'hui ? Je suis là pour t'accompagner en sécurité.",
          de: "Willkommen, mutige Alleinreisende! 🌍 Wohin geht deine Reise heute? Lass uns sichere Routen planen.",
          ko: "용기 있는 나홀로 여행자님, 환영합니다! 🌍 오늘 목적지는 어디인가요? 안전한 길로 안내해 드릴게요."
        }
      },
      {
        id: 'boundaries',
        title: '🌷 Setting Boundaries Gracefully',
        description: 'Practice saying no firmly, setting personal space boundaries, and speaking your truth.',
        starter: {
          en: "Setting healthy boundaries is an act of self-love. 🌷 Tell me about a situation where you need to speak up for yourself.",
          ja: "自分の心地よい境界線を引くことは、自分を大切にすることです。🌷 どのような気持ちを伝えたいですか？",
          zh: "学会温和而坚定地拒绝，是爱自己的第一步。🌷 有什么场景是您想练习表达界限的吗？",
          my: "ကိုယ်ပိုင် နယ်နိမိတ်သတ်မှတ်ခြင်းဟာ ကိုယ့်ကိုယ်ကို တန်ဖိုးထားတဲ့ နည်းလမ်းဖြစ်ပါတယ်။ 🌷 ဘယ်လို အခြေအနေမျိုးမှာ ပြတ်ပြတ်သားသား ငြင်းဆိုချင်တာလဲရှင်။",
          th: "การตั้งขอบเขตที่ชัดเจนคือการรักตัวเองค่ะ 🌷 อยากฝึกปฏิเสธอย่างสุภาพแต่มั่นคงในสถานการณ์ไหนคะ?",
          fr: "Poser des limites saines est un geste d'amour-propre. 🌷 Quelle situation aimerais-tu pratiquer aujourd'hui ?",
          de: "Gesunde Grenzen zu setzen ist gelebte Selbstfürsorge. 🌷 In welcher Situation möchtest du dich klarer positionieren?",
          ko: "자신만의 건강한 경계를 세우는 것은 스스로를 아끼는 일이에요. 🌷 어떤 상황에서 당당히 의견을 내고 싶으신가요?"
        }
      }
    ];

    this.activeScenario = 'sisterhood_cafe';
  }

  generateResponse(userMessage, targetLang = 'en', nativeLang = 'my') {
    const text = userMessage.toLowerCase().trim();

    // Contextual feminist & supportive learning feedback
    const knowledgeBase = {
      en: {
        dream: "That is such a profound dream! Never let anyone make you feel small. When women support each other, extraordinary things happen. What is your very next step?",
        tired: "Take a deep breath, sweet sister. Rest is not a reward; it is a fundamental right. How can you show kindness to yourself tonight?",
        fear: "It is completely normal to feel apprehensive, but remember: you are braver than you believe and stronger than you seem. You've got this!",
        work: "Express your ideas with certainty. Remember to replace 'I might be wrong but...' with 'Based on my analysis, I recommend...'. Your expertise is undeniable!",
        boundary: "Saying 'No, thank you, that does not align with my schedule' is polite, clear, and unassailable. You do not owe an elaborate excuse.",
        default: "You expressed that with such authenticity and eloquence! 💖 Practice repeating it aloud to reinforce your confidence and muscle memory."
      },
      ja: {
        dream: "素晴らしい夢ですね！✨ 女性同士が手を取り合えば、不可能なことはありません。一歩ずつ前へ進みましょう。(Subarashii yume desu ne!)",
        tired: "今日も一日よく頑張りましたね。🌸 温かいお茶でも飲んで、自分自身をたくさん褒めてあげてくださいね。(O-tsukaresama deshita!)",
        work: "自分の専門性と努力を信じてください！自信を持った声は、必ず相手の心に響きます。(Jishin o motte kudasai!)",
        boundary: "「申し訳ありませんが、今回は見送らせてください」と穏やかに、しかし毅然と断るのがとても自然です。",
        default: "心に響くとても自然な表現です！🌸 自分の言葉に自信を持って、声に出して読んでみましょう。(Totemo suteki na hyōgen desu!)"
      },
      zh: {
        dream: "好棒的梦想！✨ 永远不要低估女性的力量。每一个闪闪发光的女孩都在为世界带来光明。(Hǎo bàng de mèngxiǎng!)",
        tired: "今天辛苦了，亲爱的！🌸 记得好好休息，抱抱努力奋斗的自己。你已经做得很棒了！",
        work: "坚定从容地表达你的见解，不需要为自己的优秀感到抱歉。你值得在舞台中央发光！",
        boundary: "温和而有力量地回应：“谢谢您的提议，但这不在我目前的时间安排内。”",
        default: "说得太棒了，语感非常好！💖 试着点击喇叭图标听听发音，大声读出来吧！"
      },
      my: {
        dream: "အလွန်ခမ်းနားတဲ့ အိပ်မက်ပါရှင်! ✨ အမျိုးသမီးအချင်းချင်း ဝန်းရံအားပေးကြတဲ့အခါ မဖြစ်နိုင်တာ ဘာမှမရှိပါဘူး။ ကိုယ့်ခြေလှမ်းတွေကို ယုံကြည်မှုရှိရှိ ရှေ့ဆက်ပါနော်။",
        tired: "ဒီနေ့အတွက် တကယ်ကြိုးစားခဲ့ပါတယ် ညီမလေးရယ်။ 🌸 ပင်ပန်းသမျှ ခဏအနားယူပြီး ကိုယ့်ကိုယ်ကို အနားပေးဖို့ မမေ့နဲ့နော်။ မင်းဟာ အကောင်းဆုံး ကြိုးစားနေသူပါ။",
        work: "ကိုယ့်ရဲ့ အရည်အချင်းနဲ့ စွမ်းရည်အပေါ် ယုံကြည်ပါ။ အစည်းအဝေးတွေမှာ အားနာမနေဘဲ ကိုယ့်အမြင်ကို ရှင်းရှင်းလင်းလင်း ဖော်ထုတ်ပြောဆိုပါခင်ဗျာ။",
        boundary: "တောင်းပန်စကားတွေ အများကြီး မလိုဘဲ \"ကျေးဇူးတင်ပါတယ်၊ ဒါပေမဲ့ ကျွန်မ ဒါကို လက်မခံနိုင်ပါဘူးရှင်\" ဟု ယဉ်ကျေးပြတ်သားစွာ ငြင်းဆိုခြင်းသည် အလွန်စမတ်ကျပါတယ်။",
        default: "ဝါကျတည်ဆောက်ပုံ အရမ်းသဘာဝကျပြီး စိတ်ဓာတ်ခွန်အားဖြစ်စေပါတယ်! 💖 Speaker ခလုတ်ကို နှိပ်ပြီး အသံထွက်ကို လိုက်လံရွတ်ဆိုကြည့်ပါဦးနော်။"
      },
      th: {
        dream: "เป็นความฝันที่งดงามมากค่ะ! ✨ เมื่อผู้หญิงรวมพลังและเชื่อมั่นในกันและกัน อะไรก็เป็นไปได้ค่ะ",
        tired: "วันนี้เก่งมากแล้วนะคะ 🌸 พักผ่อนให้เต็มที่ ดูแลหัวใจตัวเองด้วยนะคะ",
        work: "แสดงความคิดเห็นอย่างมั่นใจในที่ทำงานได้เลยค่ะ เสียงของคุณมีพลังและมีความหมาย",
        boundary: "พูดปฏิเสธอย่างสุภาพ: \"ขอบคุณที่นึกถึงนะคะ แต่ครั้งนี้ไม่สะดวกจริงๆ ค่ะ\"",
        default: "พูดได้ไพเราะและมั่นใจมากค่ะ! 💖 ลองกดฟังเสียงแล้วฝึกพูดตามได้เลยนะคะ"
      }
    };

    const langPack = knowledgeBase[targetLang] || knowledgeBase['en'];

    if (text.includes('dream') || text.includes('goal') || text.includes('hope') || text.includes('အိပ်မက်') || text.includes('夢')) {
      return { reply: langPack.dream, tip: "✨ Feminist Insight: Celebrating women's ambition shatters systemic barriers." };
    }
    if (text.includes('tired') || text.includes('exhaust') || text.includes('stress') || text.includes('ပင်ပန်း') || text.includes('疲れ')) {
      return { reply: langPack.tired, tip: "🌸 Self-Care Affirmation: Radical rest is essential for long-term empowerment." };
    }
    if (text.includes('work') || text.includes('interview') || text.includes('lead') || text.includes('salary') || text.includes('အလုပ်')) {
      return { reply: langPack.work, tip: "💼 Executive Presence: Speak clearly without qualifying your competence." };
    }
    if (text.includes('no') || text.includes('stop') || text.includes('bound') || text.includes('ငြင်း') || text.includes('断')) {
      return { reply: langPack.boundary, tip: "🌷 Boundary Master: 'No' is a complete sentence delivered with grace." };
    }

    return {
      reply: langPack.default,
      tip: "💖 Empowerment Note: Trust your voice. Every sentence you master is another bridge to the world!"
    };
  }
}

window.htetAITutor = new HtetAITutor();
