// HtetLingo AI Tutoring System (HtetAI Tutor)
// Provides interactive conversational practice, grammar feedback, and roleplay

class HtetAITutor {
  constructor() {
    this.scenarios = [
      {
        id: 'cafe',
        title: '☕ Coffee Shop & Dining',
        description: 'Practice ordering drinks, asking for recommendations, and paying the bill.',
        starter: {
          en: "Welcome to Sunrise Cafe! What can I get started for you today?",
          ja: "いらっしゃいませ！何をご注文されますか？ (Irasshaimase! Nani o gochūmon saremasu ka?)",
          zh: "欢迎光临！请问您今天想喝点什么？ (Huānyíng guānglín! Qǐngwèn nín jīntiān xiǎng hē diǎn shénme?)",
          my: "မင်္ဂလာပါရှင်။ ကော်ဖီဆိုင်က ကြိုဆိုပါတယ်။ ဘာများ သုံးဆောင်ပါမလဲရှင်။",
          th: "ยินดีต้อนรับครับ วันนี้รับกาแฟอะไรดีครับ? (Yin-dee dton-rap khrap...)",
          fr: "Bonjour ! Que puis-je vous servir aujourd'hui ?",
          de: "Guten Tag! Was darf ich Ihnen heute bringen?",
          ko: "어서오세요! 무엇을 주문하시겠어요? (Eoseo oseyo! Mueos-eul jumunhasigess-eoyo?)"
        }
      },
      {
        id: 'travel',
        title: '✈️ Airport & Hotel Check-in',
        description: 'Ask for directions, check into your hotel, or confirm flight details.',
        starter: {
          en: "Hello traveler! How may I assist with your booking or departure today?",
          ja: "こんにちは！チェックインのご案内をいたします。お名前をお願いします。(Konnichiwa! Chekku-in no go-annai...)",
          zh: "您好！请出示您的护照和预订确认单。(Nín hǎo! Qǐng chūshì nín de hùzhào...)",
          my: "မင်္ဂလာပါ ခရီးသည်ရှင်။ ဟိုတယ်အခန်း ကြိုတင်စာရင်းသွင်းထားတာ စစ်ဆေးပေးပါမယ်ရှင်။",
          th: "สวัสดีครับ มีอะไรให้ช่วยเกี่ยวกับการเช็คอินไหมครับ?",
          fr: "Bonjour, bienvenue à l'hôtel. Avez-vous une réservation ?",
          de: "Guten Tag, wie kann ich Ihnen mit Ihrer Buchung helfen?",
          ko: "안녕하세요! 체크인을 도와드릴까요? 예약자 성함이 어떻게 되시나요?"
        }
      },
      {
        id: 'interview',
        title: '💼 Professional Job Interview',
        description: 'Practice answering common behavioral and technical interview questions.',
        starter: {
          en: "Thank you for joining us today. Could you briefly introduce yourself and your background?",
          ja: "本日はお時間をいただきありがとうございます。簡単に自己紹介をお願いできますか？",
          zh: "感谢您来参加面试。首先请简单做个自我介绍吧。",
          my: "ဒီနေ့ အင်တာဗျူးကို လာရောက်ပေးတဲ့အတွက် ကျေးဇူးတင်ပါတယ်။ သင့်အကြောင်း အကျဉ်းချုပ် မိတ်ဆက်ပေးပါခင်ဗျာ။",
          th: "ขอบคุณที่มาร่วมสัมภาษณ์ในวันนี้ ช่วยแนะนำตัวเองสั้นๆ หน่อยครับ",
          fr: "Merci de nous rejoindre. Pourriez-vous vous présenter brièvement ?",
          de: "Vielen Dank für Ihr Kommen. Könnten Sie sich bitte kurz vorstellen?",
          ko: "오늘 면접에 와주셔서 감사합니다. 먼저 간단히 자기소개 부탁드립니다."
        }
      }
    ];

    this.activeScenario = 'cafe';
  }

  generateResponse(userMessage, targetLang = 'en', nativeLang = 'my') {
    const text = userMessage.toLowerCase().trim();

    // Smart contextual learning rulebook
    const knowledgeBase = {
      en: {
        coffee: "Great choice! Would you like that hot or iced? Also, whole milk, oat milk, or almond milk?",
        order: "Certainly! I've added that to your order. Would you like a fresh croissant or muffin with that?",
        price: "That comes out to $4.50. You can pay by card or cash right here.",
        thanks: "You're very welcome! Here is your order. Have an incredible day ahead!",
        default: "That's very natural! To make it sound even more native, you could also say: 'Could I get that to go?'. What would you like to say next?"
      },
      ja: {
        coffee: "かしこまりました。ホットとアイス、どちらになさいますか？ (Kashikomarimashita. Hotto to aisu, dochira ni nasaimasu ka?)",
        order: "ありがとうございます！他にご注文はございますか？ (Arigatō gozaimasu! Hoka ni go-chūmon wa gozaimasu ka?)",
        price: "お会計は500円になります。(O-kaikei wa gohyaku-en ni narimasu.)",
        thanks: "どういたしまして！ごゆっくりお過ごしください。(Dōitashimashite! Go-yukkuri osugoshi kudasai.)",
        default: "素晴らしい表現ですね！(Subarashii hyōgen desu ne! Great sentence!) 文法も自然です。続けて話してみましょう。"
      },
      zh: {
        coffee: "好的，请问是要热的还是冰的？甜度需要调整吗？ (Hǎo de, qǐngwèn shì yào rè de háishì bīng de?)",
        order: "没问题！还需要加一份点心吗？ (Méi wèntí! Hái xūyào jiā yī fèn diǎnxin ma?)",
        price: "一共是二十五元人民币，支持微信或支付宝。(Yīgòng shì èrshíwǔ yuán.)",
        thanks: "不客气！祝您度过愉快的一天！(Bù kèqì! Zhù nín dùguò yúkuài de yītiān!)",
        default: "说得很地道！(Shuō de hěn dìdao! Very authentic!) 发音和语序都很准确。我们继续吧！"
      },
      my: {
        coffee: "ဟုတ်ကဲ့ရပါမယ်ရှင်။ အပူလား အအေးလား သောက်မှာလဲရှင်။",
        order: "ဟုတ်ကဲ့ စာရင်းမှတ်ထားပေးပါပြီရှင်။ တခြား ဘာများ လိုအပ်ပါသေးလဲရှင်။",
        price: "စုစုပေါင်း ၄၅၀၀ ကျပ် ကျသင့်ပါတယ်ရှင်။",
        thanks: "ကျေးဇူးတင်ပါတယ်ရှင်။ နောက်လည်း လာအားပေးပါဦးနော်။",
        default: "ဝါကျတည်ဆောက်ပုံ အလွန်သဘာဝကျပြီး သပ်ရပ်ပါတယ်ခင်ဗျာ။ နောက်ထပ် စကားပြော ဆက်လက်လေ့ကျင့်ကြည့်ရအောင်!"
      },
      th: {
        coffee: "ได้ครับ รับแบบร้อนหรือแบบเย็นดีครับ? (Dai khrap, rap baep rawn reu yen?)",
        order: "บันทึกเรียบร้อยครับ รับของว่างเพิ่มด้วยไหมครับ?",
        price: "ทั้งหมดหกสิบบาทครับ (Tang mot hok sip baht khrap)",
        thanks: "ยินดีบริการครับ ทานให้อร่อยนะครับ!",
        default: "พูดได้เป็นธรรมชาติมากครับ! (Great expression!) ฝึกประโยคต่อไปกันเลยครับ"
      }
    };

    const langPack = knowledgeBase[targetLang] || knowledgeBase['en'];

    if (text.includes('coffee') || text.includes('tea') || text.includes('latte') || text.includes('drink') || text.includes('ကော်ဖီ') || text.includes('コーヒー')) {
      return { reply: langPack.coffee, tip: "💡 Tip: Specifying 'hot' (熱/ホット/အပူ) or 'iced' (冰/アイス/အအေး) is common when ordering." };
    }
    if (text.includes('how much') || text.includes('bill') || text.includes('check') || text.includes('pay') || text.includes('ဈေး') || text.includes('いくら')) {
      return { reply: langPack.price, tip: "💡 Cultural Note: In Asia, digital QR payments (WeChat/Alipay/KPay/PromptPay) are widely accepted." };
    }
    if (text.includes('thank') || text.includes('arigato') || text.includes('xie') || text.includes('ကျေးဇူး')) {
      return { reply: langPack.thanks, tip: "💡 Politeness: Saying thank you with a slight bow or respectful tone creates great connection." };
    }
    if (text.includes('want') || text.includes('please') || text.includes('give me') || text.includes('လိုချင်') || text.includes('ください')) {
      return { reply: langPack.order, tip: "💡 Vocabulary Boost: In formal contexts, using polite markers softens the sentence." };
    }

    return {
      reply: langPack.default,
      tip: "💡 AI Grammar Insight: Practice repeating the response aloud using the speaker button to perfect your muscle memory!"
    };
  }
}

window.htetAITutor = new HtetAITutor();
