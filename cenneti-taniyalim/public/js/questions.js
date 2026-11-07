/**
 * "Biraz da Seni Tanıyalım, Prenses" — Soru ve Profil Veri Seti
 * Kolayca düzenlenebilir, modüler yapı.
 */

window.QUIZ_CONFIG = {
  recipientName: "Cennet",
  appTitle: "Biraz da Seni Tanıyalım, Prenses",
  welcomeQuotes: [
    "Merak etme, bu bir sınav değil; doğru ya da yanlış cevap hiç yok ✨",
    "Sadece senin dünyanı, sevdiğin küçük detayları ve enerjini biraz daha yakından tanımak için hazırlandı 🌸",
    "İçinden geldiği gibi işaretle, dilersen her soruya kendi küçük notunu da bırakabilirsin 💫"
  ]
};

window.QUESTIONS = [
  {
    id: 1,
    category: "Güne Başlangıç & Keyif",
    badgeIcon: "☕",
    question: "Günün en güzel molasında masanda hangisi olmalı, Prenses?",
    subtitle: "Seni bir anda keyiflendiren o meşhur eşlikçiyi seçelim.",
    customNotePlaceholder: "Özel bir siparişin varsa (ör. 'Yulaf sütlü buzlu latte') buraya yazabilirsin...",
    options: [
      {
        id: "coffee_lover",
        emoji: "🧋",
        label: "Bol köpüklü veya buzlu bir kahve",
        detail: "Kokusu bile modumu yükseltmeye yetiyor.",
        reaction: "Kahve kokusuyla başlayan ya da tazelenen bir günün enerjisi gerçekten bambaşka oluyor! ☕✨",
        vibeTag: "estetik"
      },
      {
        id: "tea_serenity",
        emoji: "🫖",
        label: "Sıcacık demleme çay ya da bitki çayı",
        detail: "Huzurlu, dingin ve samimi sohbetlerin vazgeçilmezi.",
        reaction: "İnce belli bardak ya da şık bir fincan... Çayın verdiği o sıcak samimiyetin yeri ayrı! 🌿",
        vibeTag: "huzur"
      },
      {
        id: "sweet_fresh",
        emoji: "🍓",
        label: "Taze meyveli soğuk bir içecek veya smoothie",
        detail: "Renkli, ferah ve enerjik tatları severim.",
        reaction: "Tam senin gibi taze, canlı ve enerjik bir seçim! 🍓✨",
        vibeTag: "enerjik"
      },
      {
        id: "mood_dependent",
        emoji: "🍫",
        label: "Sıcak çikolata ya da o anki ruh halime göre sürpriz",
        detail: "Rutinlere bağlı kalmam, anın tadına bakarım.",
        reaction: "Sürprizlere açık olmak ve anın ruhuna göre seçim yapmak çok tatlı bir özellik! 🍫💫",
        vibeTag: "kesifci"
      }
    ]
  },
  {
    id: 2,
    category: "Hafta Sonu Modu",
    badgeIcon: "🌤️",
    question: "Hiçbir sorumluluğun olmadığı ideal bir pazar günü nasıl geçmeli?",
    subtitle: "Saatin alarm çalmadığı o özgür günü hayal et...",
    customNotePlaceholder: "Senin ideal pazar gününde başka neler var?",
    options: [
      {
        id: "cozy_home",
        emoji: "🛋️",
        label: "Evde miskinlik, güzel bir dizi/film ve rahat kıyafetler",
        detail: "Dışarıdaki kalabalıktan uzak, kendi küçük kozamda.",
        reaction: "Kendi alanında huzurla dinlenmek gibisi yok; tam bir 'kaliteli zaman' uzmanı! 🕯️",
        vibeTag: "huzur"
      },
      {
        id: "city_explore",
        emoji: "🥐",
        label: "Güzel bir kahvaltı, sokaklarda yürüyüş ve yeni mekan keşfi",
        detail: "Güneşi kaçırmadan şehrin tadını çıkarmalıyım.",
        reaction: "Keşfetmeyi seven, enerjisiyle günü güzelleştiren harika bir rota! 🥐🌸",
        vibeTag: "kesifci"
      },
      {
        id: "nature_escape",
        emoji: "🌊",
        label: "Deniz kenarı, doğa yürüyüşü veya temiz hava kaçamağı",
        detail: "Biraz rüzgar, biraz manzara ruhumu sıfırlıyor.",
        reaction: "Deniz havası veya yeşillik... Doğayla buluşunca parlayan bir ruhun var! 🌊✨",
        vibeTag: "huzur"
      },
      {
        id: "spontaneous_fun",
        emoji: "🎈",
        label: "Plansız, anda gelişen eğlenceli bir program",
        detail: "Nereye gideceğimize yolda karar verelim!",
        reaction: "En unutulmaz anılar hep o plansız çıkılan yollarda birikiyor zaten! 🎈",
        vibeTag: "enerjik"
      }
    ]
  },
  {
    id: 3,
    category: "Mevsim & Atmosfer",
    badgeIcon: "🍂",
    question: "Hangi hava ve atmosferde kendini çok daha 'sen' gibi hissedersin?",
    subtitle: "Gökyüzünün rengi bazen insanın iç dünyasının aynasıdır.",
    customNotePlaceholder: "En sevdiğin mevsim veya saat dilimi hangisi?",
    options: [
      {
        id: "spring_breeze",
        emoji: "🌸",
        label: "Ilık bir ilkbahar akşamüstü",
        detail: "Ne çok sıcak ne soğuk; çiçek kokuları ve tatlı bir esinti.",
        reaction: "İlkbahar zarafeti... Tıpkı ismin gibi ferah ve iç açıcı bir tercih! 🌸",
        vibeTag: "estetik"
      },
      {
        id: "autumn_rain",
        emoji: "🌧️",
        label: "Sonbahar, hafif yağmur sesi ve toprak kokusu",
        detail: "Biraz romantik, biraz derin ve çok huzurlu.",
        reaction: "Cama vuran yağmur sesi ve toprak kokusu... Duygusal derinliği olan insanların favorisi! 🍂🌧️",
        vibeTag: "huzur"
      },
      {
        id: "summer_sunset",
        emoji: "🌅",
        label: "Uzun yaz akşamları ve altın saatler (Golden Hour)",
        detail: "Güneşin batışını izlerken zaman dursun isterim.",
        reaction: "Gün batımının o kehribar ışığı ve bitmesini istemediğin tatlı yaz akşamları... Şahane! 🌅",
        vibeTag: "enerjik"
      },
      {
        id: "winter_snow",
        emoji: "❄️",
        label: "Bembeyaz bir kış günü ve içerideki sıcaklık",
        detail: "Kalın kazaklar, ışıklar ve sıcacık bir atmosfer.",
        reaction: "Kışın o masalsı sessizliği ve sıcacık ortamları gerçekten çok büyüleyici! ❄️✨",
        vibeTag: "estetik"
      }
    ]
  },
  {
    id: 4,
    category: "Bu mu, Şu mu?",
    badgeIcon: "✨",
    question: "Tatlı bir ikilem: Zamanın nasıl geçtiğini anlamadığın an hangisi?",
    subtitle: "İkisi de güzel ama kalbin hangisine bir adım daha yakın?",
    customNotePlaceholder: "İkisini birleştiren özel bir tercihin varsa yazabilirsin...",
    options: [
      {
        id: "night_talks",
        emoji: "🌙",
        label: "Gece yarısı uzayıp giden derin ve samimi sohbetler",
        detail: "Herkes uyurken konuşulan konular bir başka olur.",
        reaction: "Gece sessizliğinde kurulan samimi cümlelerin büyüsü gerçekten unutulmaz oluyor! 🌙💫",
        vibeTag: "huzur"
      },
      {
        id: "day_adventures",
        emoji: "☀️",
        label: "Gündüz gözüyle kahkaha dolu, hareketli aktiviteler",
        detail: "Güneş tepedeyken gezip görmek ve eğlenmek gibisi yok.",
        reaction: "Günün enerjisini sonuna kadar yaşayan, neşesiyle etrafı aydınlatan bir ruh! ☀️✨",
        vibeTag: "enerjik"
      },
      {
        id: "sunset_view",
        emoji: "🌇",
        label: "Güzel bir manzaraya karşı sessizliği bile paylaşabilmek",
        detail: "Bazen çok konuşmadan da aynı frekansta buluşmak güzeldir.",
        reaction: "Manzaraya karşı huzurlu bir anı paylaşabilmek, en zarif iletişim biçimlerinden biri! 🌇",
        vibeTag: "estetik"
      },
      {
        id: "road_trip_vibe",
        emoji: "🚗",
        label: "Yol boyu müzik dinleyip yeni yerlere doğru gitmek",
        detail: "Varacağımız yerden çok yolun kendisi keyifli olmalı.",
        reaction: "Yolların verdiği o özgürlük hissi ve akıp giden manzaralar... Harika bir seçim! 🚗🎶",
        vibeTag: "kesifci"
      }
    ]
  },
  {
    id: 5,
    category: "Küçük Mutluluklar",
    badgeIcon: "🌷",
    question: "Gün içinde modun biraz düştüğünde seni anında gülümsetecek detay nedir?",
    subtitle: "Not alıyoruz demeyelim ama... belki biraz ilham alırız :)",
    customNotePlaceholder: "Seni mutlu eden başka küçük bir sırrın var mı?",
    options: [
      {
        id: "thoughtful_gesture",
        emoji: "💌",
        label: "Beklenmedik anda gelen tatlı bir mesaj veya ince düşünce",
        detail: "'Aklıma sen geldin' denmesi bile günümü güzelleştirir.",
        reaction: "İnce düşünülmüş küçük detayların değerini bilen zarif bir kalp! 💌✨",
        vibeTag: "estetik"
      },
      {
        id: "favorite_snack",
        emoji: "🍰",
        label: "En sevdiğim tatlı veya güzel bir yemek sürprizi",
        detail: "Lezzetli bir şeylerin çözemeyeceği çok az sorun vardır.",
        reaction: "Kesinlikle katılıyorum! Güzel bir tatlının getirdiği mutluluk bilimsel olarak kanıtlanmalı 🍰😄",
        vibeTag: "enerjik"
      },
      {
        id: "music_walk",
        emoji: "🎧",
        label: "Kulaklığımı takıp sevdiğim şarkılarla biraz yürümek",
        detail: "Müziğin ritmiyle kafamı dağıtmayı severim.",
        reaction: "Müzik ve yürüyüş ikilisi, ruhu en hızlı tazeleyen terapi gibi! 🎧🌿",
        vibeTag: "huzur"
      },
      {
        id: "funny_moment",
        emoji: "😸",
        label: "İçten bir kahkaha, tatlı bir kedi/köpek veya espri",
        detail: "Samimi bir neşe her türlü stresi unutturur.",
        reaction: "Gülümsemesiyle ortamın havasını değiştiren o tatlı enerji! 😸🌸",
        vibeTag: "enerjik"
      }
    ]
  },
  {
    id: 6,
    category: "Müzik & Frekans",
    badgeIcon: "🎶",
    question: "Uzun bir yolculukta DJ koltuğunu sana devretsek, listede ne çalar?",
    subtitle: "Arka planda akacak o melodiyi seçelim.",
    customNotePlaceholder: "Favori şarkını veya sanatçını yazmak istersen...",
    options: [
      {
        id: "indie_acoustic",
        emoji: "🎸",
        label: "Akustik, Indie veya ruhu dinlendiren yumuşak parçalar",
        detail: "Yol akarken huzur veren melodiler.",
        reaction: "Yol manzarasına en çok yakışan, film sahnesi tadında bir müzik zevki! 🎸✨",
        vibeTag: "huzur"
      },
      {
        id: "pop_upbeat",
        emoji: "🎤",
        label: "Eşlik etmelik Türkçe/Yabancı Pop ve enerjik hitler",
        detail: "Yolculuk dediğin biraz neşeli ve ritimli geçmeli!",
        reaction: "Yol boyu enerjinin hiç düşmeyeceği, çok eğlenceli bir liste olacağı kesin! 🎤🌟",
        vibeTag: "enerjik"
      },
      {
        id: "nostalgia_classic",
        emoji: "📻",
        label: "Zamansız klasikler, 90'lar/2000'ler veya nostaljik şarkılar",
        detail: "Eskimeyen şarkıların ruhu her zaman başkadır.",
        reaction: "Kaliteli ve zamansız müziklerden anlayan çok özel bir kulak! 📻💫",
        vibeTag: "estetik"
      },
      {
        id: "eclectic_mix",
        emoji: "🔀",
        label: "Tamamen o anki moduma göre karışık bir sürpriz liste",
        detail: "Bir şarkı duygusal, bir sonraki kıpır kıpır olabilir.",
        reaction: "Tek bir kalıba sığmayan, rengarenk bir müzik listesi! En güzeli de bu 🔀🎶",
        vibeTag: "kesifci"
      }
    ]
  },
  {
    id: 7,
    category: "Tatlı Krizler",
    badgeIcon: "🧁",
    question: "Menüde tatlı sayfasına geldik... Gözün ilk hangisini arar?",
    subtitle: "Prenses'in damak tadını öğrenmeden geçmek olmazdı.",
    customNotePlaceholder: "En favori tatlının adını buraya not düşebilirsin...",
    options: [
      {
        id: "chocolate_dream",
        emoji: "🍫",
        label: "Yoğun çikolatalı bir tatlı (Sufle, Brownie, Profiterol)",
        detail: "Çikolata söz konusuysa akan sular durur.",
        reaction: "Klasik ama vazgeçilmez! Akışkan bir çikolataya hayır demek imkansız 🍫✨",
        vibeTag: "enerjik"
      },
      {
        id: "fruity_light",
        emoji: "🍰",
        label: "Meyveli, hafif ve ferah tatlar (Cheesecake, Magnolia, Tart)",
        detail: "Hem şık görünsün hem de içimi ferahlatsın.",
        reaction: "Zarif, hafif ve çok şık bir tercih! Meyveli tatların ferahlığı bir başka 🍓🍰",
        vibeTag: "estetik"
      },
      {
        id: "traditional_warm",
        emoji: "🍨",
        label: "Geleneksel lezzetler veya dondurmalı sıcak tatlılar",
        detail: "Künefe, baklava ya da sütlü tatlıların yeri ayrıdır.",
        reaction: "Ağız tadını çok iyi bilen, gerçek bir lezzet gurmesi! 🍨💫",
        vibeTag: "huzur"
      },
      {
        id: "salty_over_sweet",
        emoji: "🥨",
        label: "Ben aslında tatlıdan çok tuzlu / atıştırmalık insanıyım",
        detail: "Tatlıyı tadımlık severim, asıl favorim tuzlulardır.",
        reaction: "Tuzlu lezzetleri tek geçenlerden! Ezber bozan ve net bir damak tadı 🥨✨",
        vibeTag: "kesifci"
      }
    ]
  },
  {
    id: 8,
    category: "Hayal Gücü & Sihir",
    badgeIcon: "🪄",
    question: "Bugün sana sihirli bir yetenek hediye edilse hangisini seçerdin?",
    subtitle: "Hayal kurmakta sınır yok!",
    customNotePlaceholder: "Bu gücü ilk nerede veya nasıl kullanırdın?",
    options: [
      {
        id: "teleportation",
        emoji: "🌍",
        label: "Gözümü kapatıp istediğim ülkeye/şehre ışınlanmak",
        detail: "Trafik yok, bavul toplamak yok; anında yeni bir manzara!",
        reaction: "Sabah Paris'te kahve, akşam İtalya'da yürüyüş... Tam bir gezgin ruh! 🌍✨",
        vibeTag: "kesifci"
      },
      {
        id: "pause_time",
        emoji: "⏳",
        label: "Güzel anlarda zamanı durdurabilmek (ya da ekstra uyku saati!)",
        detail: "Bazı anlar hiç bitmesin, bazı sabahlar da hiç aceleye gelmesin.",
        reaction: "Hem güzel anların kıymetini bilen hem de konforuna düşkün harika bir seçim! ⏳🌸",
        vibeTag: "huzur"
      },
      {
        id: "read_vibes",
        emoji: "🔮",
        label: "İnsanların gerçek niyetini ve samimiyetini ilk bakışta anlamak",
        detail: "Hayatımda sadece içten ve gerçek enerjiler olsun isterim.",
        reaction: "Samimiyete ve güvene değer veren, sezgileri güçlü bir duruş! 🔮💫",
        vibeTag: "estetik"
      },
      {
        id: "instant_mastery",
        emoji: "🎨",
        label: "Herhangi bir dili, enstrümanı veya sanatı anında öğrenmek",
        detail: "Üretmek, konuşmak ve yeni şeyler başarmak çok heyecanlı.",
        reaction: "Estetiğe, sanata ve gelişime meraklı, ilham verici bir zihin! 🎨✨",
        vibeTag: "estetik"
      }
    ]
  },
  {
    id: 9,
    category: "İletişim & Samimiyet",
    badgeIcon: "💫",
    question: "Bir insanda ya da arkadaşlıkta seni en çok etkileyen özellik hangisidir?",
    subtitle: "Senin dünyanda en değerli anahtar hangisi?",
    customNotePlaceholder: "Senin için olmazsa olmaz bir başka değer varsa...",
    options: [
      {
        id: "genuine_respect",
        emoji: "🤍",
        label: "Saygı, nezaket ve insanın sınırlarına özen gösterilmesi",
        detail: "Zarif bir üslup ve saygılı bir yaklaşım her şeyin temelidir.",
        reaction: "Kesinlikle! Zarafet ve saygı, en güzel iletişimin temel taşıdır 🤍✨",
        vibeTag: "estetik"
      },
      {
        id: "humor_warmth",
        emoji: "😊",
        label: "Doğallık, içtenlik ve birlikte rahatça gülebilmek",
        detail: "Yapmacıklıktan uzak, samimi ve neşeli bir enerji.",
        reaction: "Kasmadan, içtenlikle gülebildiğin ortamlar her zaman en kıymetlisidir! 😊🌸",
        vibeTag: "enerjik"
      },
      {
        id: "attentive_listener",
        emoji: "🌿",
        label: "İyi bir dinleyici olması ve küçük detayları unutmaması",
        detail: "Anlattıklarımın gerçekten duyulduğunu hissetmek güzeldir.",
        reaction: "Detayları hatırlamak ve gerçekten dinlemek, verilen değerin en güzel kanıtıdır 🌿",
        vibeTag: "huzur"
      },
      {
        id: "inspiring_mind",
        emoji: "🌟",
        label: "Yeni bakış açıları katması ve ufuk açıcı sohbetler",
        detail: "Konuştukça yeni şeyler keşfettiğim insanları severim.",
        reaction: "Birlikte gelişebileceğin, ufuk açan sohbetlerin tadı hiçbir şeyde yok! 🌟",
        vibeTag: "kesifci"
      }
    ]
  },
  {
    id: 10,
    type: "open_ended",
    isSpecialQuestion: true,
    category: "Özel Soru",
    badgeIcon: "🌷",
    question: "Umut'un en çok hangi özelliğini beğeniyorsun? 🌷",
    subtitle: "İçinden geldiği gibi, dilediğin kadar özgürce yazabilirsin...",
    placeholder: "Aklından geçenleri merak ediyorum... 💭",
    options: []
  }
];

/**
 * Cennet'in seçimlerine göre hesaplanan zarif karakter/frekans profilleri
 */
window.VIBE_PROFILES = {
  estetik: {
    title: "Zarif Detayların & İnceliğin Prensesi",
    badge: "✨ Estetik & Zarif Ruh",
    description:
      "Senin dünyanda nezaket, özen ve küçük detaylar çok özel bir yere sahip, Cennet. İlk bakışta fark edilmeyen güzellikleri yakalayan, samimiyete ve zarif bir iletişime değer veren çok asil bir enerjin var.",
    highlights: ["İnce Düşünceli", "Estetik Bakış", "Zarif İletişim", "Detay Gurmesi"],
    closingGiftNote:
      "Seninle yapılacak en güzel plan; özenle seçilmiş şık ama samimi bir mekanda, güzel bir kahve veya tatlı eşliğinde zamanın nasıl geçtiğini unutturan keyifli bir sohbet!"
  },
  huzur: {
    title: "Dinginliğin & Samimi Sohbetlerin Prensesi",
    badge: "🌿 Huzur & Derinlik Frekansı",
    description:
      "Kalabalık ve yapmacık ortamlardansa, gerçek samimiyeti ve iç huzuru seçen çok özel bir doğan var, Cennet. Yanındaki insana da sakinlik ve güven veren, derin sohbetlerin ve huzurlu anların insanısın.",
    highlights: ["İçten & Doğal", "Huzur Veren Enerji", "Derin Sohbetler", "Dingin Ruh"],
    closingGiftNote:
      "Seninle yapılacak en güzel plan; gürültüden uzak, belki hafif bir rüzgar veya güzel bir manzara eşliğinde, hiç acele etmeden akıp giden samimi bir yürüyüş ve sıcak bir içecek!"
  },
  enerjik: {
    title: "Neşenin & Işıltılı Anların Prensesi",
    badge: "☀️ Pozitif & Canlı Enerji",
    description:
      "Girdiği ortama neşe katan, gülümsemesiyle havayı anında güzelleştiren harika bir enerjin var, Cennet! Hayatı ertelemeden yaşamayı, küçük şeylerden büyük mutluluklar çıkarmayı çok iyi biliyorsun.",
    highlights: ["Neşeli & İçten", "Yüksek Enerji", "Anın Tadını Çıkaran", "Işıltılı Gülüş"],
    closingGiftNote:
      "Seninle yapılacak en güzel plan; bol kahkahalı, güzel müziklerin ve en sevdiğin lezzetlerin eşlik ettiği, enerjisi yüksek ve unutulmaz bir gün!"
  },
  kesifci: {
    title: "Özgür Ruhlu & Meraklı Keşiflerin Prensesi",
    badge: "🧭 Keşifçi & Özgün Ruh",
    description:
      "Sıradan rutinlere sıkışıp kalmayan, yeni yerler, yeni tatlar ve yeni hikayeler keşfetmeyi seven çok özgün bir dünyan var, Cennet. Sürprizlere açık olman ve merak duygun seni çok etkileyici kılıyor.",
    highlights: ["Özgün & Meraklı", "Sürprizlere Açık", "Gezgin Ruhu", "İlham Verici"],
    closingGiftNote:
      "Seninle yapılacak en güzel plan; daha önce hiç gidilmemiş bir rotayı keşfetmek, yolda güzel müzikler dinlemek ve spontane gelişen tatlı sürprizlere kapı açmak!"
  }
};

