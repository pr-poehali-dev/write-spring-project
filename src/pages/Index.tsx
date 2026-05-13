import { useState } from "react";
import Icon from "@/components/ui/icon";

const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "poems", label: "Стихи" },
  { id: "bibliography", label: "Библиография" },
  { id: "blog", label: "Блог" },
  { id: "about", label: "О Авторе" },
  { id: "contacts", label: "Контакты" },
];

const POEMS = [
  {
    title: "Осенний вечер",
    year: "2023",
    excerpt: "Когда осенний вечер гасит свет\nИ золото листвы ложится тихо,\nЯ вспоминаю, что меня здесь нет —\nЛишь эхо строк, рассеянное лихо.",
    collection: "Сборник «Молчание»",
  },
  {
    title: "Белые ночи",
    year: "2022",
    excerpt: "Над городом прозрачен небосвод,\nИ тени нет у каждого прохожего.\nПолночный свет — как призрак, что придёт\nИ растворится в утреннем безбожии.",
    collection: "Сборник «Северный свет»",
  },
  {
    title: "Письмо",
    year: "2021",
    excerpt: "Я написал тебе в конце зимы,\nКогда слова ещё имели вес.\nНо почта — вечность, мы — внутри тюрьмы\nИз собственных молчаний и завес.",
    collection: "Сборник «Голоса»",
  },
];

const BOOKS = [
  {
    title: "Молчание",
    year: "2023",
    genre: "Поэзия",
    desc: "Третий сборник стихотворений. Размышления о тишине, утрате и обретении себя в пространстве языка.",
    pages: "128 стр.",
  },
  {
    title: "Северный свет",
    year: "2021",
    genre: "Поэзия",
    desc: "Лирические стихотворения о природе севера, времени и памяти. Стал лауреатом литературной премии.",
    pages: "96 стр.",
  },
  {
    title: "Голоса",
    year: "2018",
    genre: "Поэзия",
    desc: "Дебютный сборник. Поиск собственного голоса в диалоге с классической традицией русской поэзии.",
    pages: "80 стр.",
  },
  {
    title: "Берег",
    year: "2016",
    genre: "Проза",
    desc: "Повесть о рыбаке и его сыне, об утрате и прощении. Тихая история о море и человеческом достоинстве.",
    pages: "210 стр.",
  },
];

const BLOG_POSTS = [
  {
    date: "12 мая 2026",
    title: "О природе поэтического молчания",
    excerpt: "Молчание в поэзии — не отсутствие слов, но особое их состояние. Я давно думаю о том, как пауза формирует смысл...",
    tag: "Эссе",
  },
  {
    date: "3 апреля 2026",
    title: "Читая Мандельштама в апреле",
    excerpt: "Возвращаться к Мандельштаму каждую весну стало для меня ритуалом. В этом году — «Tristia» и ощущение необратимости...",
    tag: "Чтение",
  },
  {
    date: "18 марта 2026",
    title: "Новый сборник: первые страницы",
    excerpt: "Работа над четвёртым сборником идёт медленно. Это хорошо. Торопиться некуда — слова сами приходят в своё время...",
    tag: "Творчество",
  },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [subscribeEmail, setSubscribeEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [selectedPoem, setSelectedPoem] = useState<number | null>(null);

  const scrollTo = (id: string) => {
    setActiveSection(id);
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!subscribeEmail) return;
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setSubscribed(true);
      setSubscribeEmail("");
    }, 1200);
  };

  const handleContact = (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <div className="min-h-screen font-body" style={{ backgroundColor: "var(--ivory)", color: "var(--charcoal)" }}>

      {/* NAVIGATION */}
      <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: "rgba(245,240,232,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid var(--gold-light)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <button onClick={() => scrollTo("home")} className="flex flex-col items-start group">
            <span className="font-caps text-xs tracking-widest" style={{ color: "var(--gold)" }}>ЛИТЕРАТУРНЫЙ САЙТ</span>
            <span className="font-display text-xl font-light" style={{ color: "var(--charcoal)" }}>Имя Автора</span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-8">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link">
                {item.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} style={{ color: "var(--charcoal)" }}>
            <Icon name={menuOpen ? "X" : "Menu"} size={20} />
          </button>
        </div>

        {menuOpen && (
          <div className="md:hidden px-6 pb-6 flex flex-col gap-5" style={{ borderTop: "1px solid var(--border)" }}>
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)} className="nav-link text-left">
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(184,150,106,0.08) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 20%, rgba(184,150,106,0.06) 0%, transparent 50%)`,
        }} />

        {/* Decorative vertical lines */}
        <div className="absolute left-16 top-0 bottom-0 w-px hidden lg:block" style={{ background: "linear-gradient(to bottom, transparent, var(--gold-light), transparent)" }} />
        <div className="absolute right-16 top-0 bottom-0 w-px hidden lg:block" style={{ background: "linear-gradient(to bottom, transparent, var(--gold-light), transparent)" }} />

        <div className="relative z-10 text-center max-w-4xl mx-auto px-6 pt-24 pb-16">
          <div className="animate-fade-up opacity-0" style={{ animationFillMode: "forwards" }}>
            <span className="section-label block mb-6">Поэт · Прозаик · Эссеист</span>
          </div>

          <div className="animate-fade-up opacity-0 delay-200" style={{ animationFillMode: "forwards" }}>
            <h1 className="font-display text-7xl md:text-9xl font-light leading-none mb-6" style={{ color: "var(--charcoal)", letterSpacing: "-0.02em" }}>
              Имя<br />
              <span style={{ color: "var(--gold)" }}>Автора</span>
            </h1>
          </div>

          <div className="animate-fade-up opacity-0 delay-400" style={{ animationFillMode: "forwards" }}>
            <span className="gold-line mx-auto mb-8 block" />
          </div>

          <div className="animate-fade-up opacity-0 delay-500" style={{ animationFillMode: "forwards" }}>
            <p className="font-body text-lg md:text-xl font-light max-w-lg mx-auto leading-relaxed mb-12" style={{ color: "var(--warm-gray)" }}>
              «Слово — единственное место, где время останавливается и позволяет нам взглянуть на себя»
            </p>
          </div>

          <div className="animate-fade-up opacity-0 delay-700" style={{ animationFillMode: "forwards" }}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="btn-dark" onClick={() => scrollTo("poems")}>Стихи</button>
              <button className="btn-gold" onClick={() => scrollTo("bibliography")}>Книги</button>
              <button className="btn-gold" onClick={() => scrollTo("about")}>Об авторе</button>
            </div>
          </div>

          {/* Scroll indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0 delay-700" style={{ animationFillMode: "forwards" }}>
            <span className="font-caps text-xs tracking-widest" style={{ color: "var(--gold)" }}>ПРОКРУТИТЬ</span>
            <Icon name="ChevronDown" size={16} style={{ color: "var(--gold)" }} />
          </div>
        </div>
      </section>

      {/* POEMS + BIBLIOGRAPHY combined */}
      <section id="poems" className="py-24 md:py-32" style={{ backgroundColor: "var(--parchment)" }}>
        <div id="bibliography" className="max-w-7xl mx-auto px-6">

          {/* Section header */}
          <div className="mb-16 text-center">
            <span className="section-label block mb-4">Творчество</span>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "var(--charcoal)" }}>Стихи &amp; Книги</h2>
            <span className="gold-line mx-auto mt-6 block" />
          </div>

          {/* Two-column layout */}
          <div className="grid lg:grid-cols-2 gap-0" style={{ border: "1px solid var(--border)" }}>

            {/* LEFT — Стихи */}
            <div className="p-8 md:p-12" style={{ borderRight: "1px solid var(--border)", backgroundColor: "var(--ivory)" }}>
              <div className="flex items-center gap-4 mb-10">
                <span className="font-display text-3xl font-light" style={{ color: "var(--charcoal)" }}>Стихи</span>
                <span className="gold-line block" />
                <span className="section-label">Избранное</span>
              </div>

              <div className="space-y-8">
                {POEMS.map((poem, i) => (
                  <div
                    key={i}
                    className="poem-card cursor-pointer group"
                    onClick={() => setSelectedPoem(selectedPoem === i ? null : i)}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="font-caps text-xs tracking-widest" style={{ color: "var(--gold)" }}>{poem.year}</span>
                      <span className="font-body text-xs" style={{ color: "var(--warm-gray)" }}>{poem.collection}</span>
                    </div>
                    <h3 className="font-display text-2xl font-light mb-3" style={{ color: "var(--charcoal)" }}>
                      {poem.title}
                    </h3>
                    <div
                      className="overflow-hidden transition-all duration-500"
                      style={{ maxHeight: selectedPoem === i ? "200px" : "60px" }}
                    >
                      <p className="font-body text-sm leading-7 whitespace-pre-line" style={{ color: "var(--warm-gray)" }}>
                        {poem.excerpt}
                      </p>
                    </div>
                    <button className="mt-3 font-caps text-xs tracking-widest flex items-center gap-2 transition-colors" style={{ color: "var(--gold)" }}>
                      {selectedPoem === i ? "СВЕРНУТЬ" : "ЧИТАТЬ ПОЛНОСТЬЮ"}
                      <Icon name={selectedPoem === i ? "ChevronUp" : "ChevronDown"} size={12} />
                    </button>
                  </div>
                ))}
              </div>

              <div className="mt-10">
                <button className="btn-gold">Все стихотворения</button>
              </div>
            </div>

            {/* RIGHT — Книги */}
            <div className="p-8 md:p-12" style={{ backgroundColor: "var(--parchment)" }}>
              <div className="flex items-center gap-4 mb-10">
                <span className="font-display text-3xl font-light" style={{ color: "var(--charcoal)" }}>Книги</span>
                <span className="gold-line block" />
                <span className="section-label">Библиография</span>
              </div>

              <div className="space-y-0">
                {BOOKS.map((book, i) => (
                  <div key={i} className="group py-6 cursor-pointer" style={{ borderBottom: "1px solid var(--border)" }}>
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <span className="section-label block mb-1">{book.year} · {book.genre}</span>
                        <h3 className="font-display text-2xl font-light" style={{ color: "var(--charcoal)" }}>{book.title}</h3>
                      </div>
                      <span className="font-body text-xs mt-1 flex-shrink-0 ml-4" style={{ color: "var(--warm-gray)" }}>{book.pages}</span>
                    </div>
                    <p className="font-body text-sm leading-6 mt-2" style={{ color: "var(--warm-gray)" }}>{book.desc}</p>
                    <button className="mt-3 font-caps text-xs tracking-widest flex items-center gap-2 transition-all group-hover:gap-3" style={{ color: "var(--gold)" }}>
                      ПОДРОБНЕЕ <Icon name="ArrowRight" size={12} />
                    </button>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* BLOG */}
      <section id="blog" className="py-24 md:py-32" style={{ backgroundColor: "var(--charcoal)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="font-caps text-xs tracking-widest block mb-4" style={{ color: "var(--gold)" }}>МЫСЛИ И ЗАМЕТКИ</span>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "var(--ivory)" }}>Блог</h2>
            <span className="gold-line mx-auto mt-6 block" />
          </div>

          <div className="space-y-0">
            {BLOG_POSTS.map((post, i) => (
              <div key={i} className="group cursor-pointer" style={{ borderTop: "1px solid rgba(184,150,106,0.2)" }}>
                <div className="py-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex items-start gap-8">
                    <div className="flex-shrink-0">
                      <span className="font-caps text-xs tracking-widest" style={{ color: "var(--gold)" }}>{post.date}</span>
                    </div>
                    <div>
                      <span className="inline-block mb-2 px-2 py-0.5 font-caps text-xs tracking-wider" style={{ border: "1px solid rgba(184,150,106,0.4)", color: "var(--gold-light)" }}>{post.tag}</span>
                      <h3 className="font-display text-2xl font-light mb-2 group-hover:text-gold transition-colors" style={{ color: "var(--ivory)" }}>{post.title}</h3>
                      <p className="font-body text-sm leading-6" style={{ color: "rgba(245,240,232,0.5)" }}>{post.excerpt}</p>
                    </div>
                  </div>
                  <div className="flex-shrink-0 ml-auto">
                    <Icon name="ArrowRight" size={18} style={{ color: "var(--gold)", transition: "transform 0.3s" }} className="group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: "1px solid rgba(184,150,106,0.2)" }} />
          </div>

          <div className="mt-12 text-center">
            <button className="btn-gold">Все записи блога</button>
          </div>
        </div>
      </section>

      {/* SUBSCRIBE */}
      <section className="py-20 md:py-28" style={{ backgroundColor: "var(--parchment)" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <span className="ornament block mb-4">✦</span>
          <span className="section-label block mb-4">Будьте в курсе</span>
          <h2 className="font-display text-4xl md:text-5xl font-light mb-4" style={{ color: "var(--charcoal)" }}>
            Подписка на новости
          </h2>
          <p className="font-body text-base mb-10 leading-relaxed" style={{ color: "var(--warm-gray)" }}>
            Новые стихи, эссе и анонсы книг — прямо на вашу почту.<br />Только самое важное, без лишнего.
          </p>

          {subscribed ? (
            <div className="flex flex-col items-center gap-4 animate-fade-up">
              <Icon name="CheckCircle" size={32} style={{ color: "var(--gold)" }} />
              <p className="font-display text-2xl font-light" style={{ color: "var(--charcoal)" }}>Вы подписаны</p>
              <p className="font-body text-sm" style={{ color: "var(--warm-gray)" }}>Спасибо! Первое письмо придёт с ближайшей публикацией.</p>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-0 max-w-md mx-auto" style={{ border: "1px solid var(--gold)" }}>
              <input
                type="email"
                value={subscribeEmail}
                onChange={(e) => setSubscribeEmail(e.target.value)}
                placeholder="Ваш адрес электронной почты"
                required
                className="flex-1 px-5 py-3 font-body text-sm outline-none"
                style={{ backgroundColor: "var(--ivory)", color: "var(--charcoal)", border: "none" }}
              />
              <button
                type="submit"
                disabled={subscribing}
                className="btn-dark whitespace-nowrap"
                style={{ borderLeft: "1px solid var(--gold)" }}
              >
                {subscribing ? "..." : "Подписаться"}
              </button>
            </form>
          )}
        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="py-24 md:py-32" style={{ backgroundColor: "var(--ivory)" }}>
        <div className="max-w-5xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <span className="section-label block mb-4">История</span>
              <h2 className="font-display text-5xl md:text-6xl font-light mb-6" style={{ color: "var(--charcoal)" }}>Об авторе</h2>
              <span className="gold-line mb-8 block" />
              <div className="space-y-5 font-body text-base leading-8" style={{ color: "var(--warm-gray)" }}>
                <p>
                  Родился в 1978 году. Поэт, прозаик, эссеист. Автор четырёх книг стихотворений и одной повести.
                </p>
                <p>
                  Публиковался в журналах «Новый мир», «Знамя», «Октябрь». Лауреат литературных премий. Живёт и работает в Санкт-Петербурге.
                </p>
                <p>
                  «Я пишу, чтобы понять — что случилось, что происходит и что могло бы быть. Поэзия — это не украшение, а необходимость.»
                </p>
              </div>
              <div className="mt-10 flex gap-6">
                <button className="btn-dark">Полная биография</button>
              </div>
            </div>

            <div className="relative">
              {/* Portrait placeholder */}
              <div
                className="relative overflow-hidden"
                style={{
                  aspectRatio: "3/4",
                  backgroundColor: "var(--parchment)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="absolute inset-0 flex flex-col items-center justify-center" style={{ color: "var(--warm-gray)" }}>
                  <Icon name="User" size={64} style={{ color: "var(--gold-light)" }} />
                  <span className="font-caps text-xs tracking-widest mt-4" style={{ color: "var(--gold)" }}>ФОТО АВТОРА</span>
                </div>
                {/* Gold corner accents */}
                <div className="absolute top-4 left-4 w-8 h-8" style={{ borderTop: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)" }} />
                <div className="absolute top-4 right-4 w-8 h-8" style={{ borderTop: "1px solid var(--gold)", borderRight: "1px solid var(--gold)" }} />
                <div className="absolute bottom-4 left-4 w-8 h-8" style={{ borderBottom: "1px solid var(--gold)", borderLeft: "1px solid var(--gold)" }} />
                <div className="absolute bottom-4 right-4 w-8 h-8" style={{ borderBottom: "1px solid var(--gold)", borderRight: "1px solid var(--gold)" }} />
              </div>
            </div>
          </div>

          {/* Awards */}
          <div className="mt-20 pt-16" style={{ borderTop: "1px solid var(--border)" }}>
            <span className="section-label block mb-8 text-center">Признание</span>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              {[
                { year: "2023", award: "Премия «Поэт года»" },
                { year: "2021", award: "Лауреат «Северной пальмиры»" },
                { year: "2019", award: "Премия журнала «Знамя»" },
                { year: "2016", award: "Дебют года" },
              ].map((a, i) => (
                <div key={i} className="flex flex-col items-center">
                  <span className="font-display text-4xl font-light" style={{ color: "var(--gold)" }}>{a.year}</span>
                  <span className="font-body text-xs mt-2 leading-5" style={{ color: "var(--warm-gray)" }}>{a.award}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="py-24 md:py-32" style={{ backgroundColor: "var(--parchment)" }}>
        <div className="max-w-4xl mx-auto px-6">
          <div className="mb-16 text-center">
            <span className="section-label block mb-4">Напишите мне</span>
            <h2 className="font-display text-5xl md:text-6xl font-light" style={{ color: "var(--charcoal)" }}>Контакты</h2>
            <span className="gold-line mx-auto mt-6 block" />
          </div>

          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <p className="font-body text-base leading-8 mb-10" style={{ color: "var(--warm-gray)" }}>
                По вопросам публикаций, выступлений, интервью и сотрудничества — пишите через форму или напрямую.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <Icon name="Mail" size={18} style={{ color: "var(--gold)" }} />
                  <span className="font-body text-sm" style={{ color: "var(--charcoal)" }}>author@example.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <Icon name="MapPin" size={18} style={{ color: "var(--gold)" }} />
                  <span className="font-body text-sm" style={{ color: "var(--charcoal)" }}>Санкт-Петербург, Россия</span>
                </div>
                <div className="flex items-center gap-4">
                  <Icon name="Globe" size={18} style={{ color: "var(--gold)" }} />
                  <span className="font-body text-sm" style={{ color: "var(--charcoal)" }}>@author_name</span>
                </div>
              </div>
            </div>

            <form onSubmit={handleContact} className="space-y-4">
              <div>
                <input
                  type="text"
                  placeholder="Ваше имя"
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 font-body text-sm outline-none transition-colors"
                  style={{ backgroundColor: "var(--ivory)", border: "1px solid var(--border)", color: "var(--charcoal)" }}
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-3 font-body text-sm outline-none"
                  style={{ backgroundColor: "var(--ivory)", border: "1px solid var(--border)", color: "var(--charcoal)" }}
                />
              </div>
              <div>
                <textarea
                  placeholder="Ваше сообщение"
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-3 font-body text-sm outline-none resize-none"
                  style={{ backgroundColor: "var(--ivory)", border: "1px solid var(--border)", color: "var(--charcoal)" }}
                />
              </div>
              <button type="submit" className="btn-dark w-full">Отправить сообщение</button>
            </form>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: "var(--charcoal)", borderTop: "1px solid rgba(184,150,106,0.3)" }}>
        <div className="max-w-5xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="text-center md:text-left">
              <span className="font-caps text-xs tracking-widest block mb-1" style={{ color: "var(--gold)" }}>ЛИТЕРАТУРНЫЙ САЙТ</span>
              <span className="font-display text-2xl font-light" style={{ color: "var(--ivory)" }}>Имя Автора</span>
            </div>

            <span className="gold-line-full hidden md:block flex-1 mx-8" />

            <nav className="flex gap-6 flex-wrap justify-center">
              {NAV_ITEMS.map((item) => (
                <button key={item.id} onClick={() => scrollTo(item.id)} className="font-caps text-xs tracking-widest transition-colors hover:text-gold-light" style={{ color: "rgba(245,240,232,0.5)" }}>
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3" style={{ borderTop: "1px solid rgba(184,150,106,0.15)" }}>
            <span className="font-body text-xs" style={{ color: "rgba(245,240,232,0.3)" }}>
              © 2026 Имя Автора. Все права защищены.
            </span>
            <span className="ornament text-sm" style={{ color: "var(--gold)", opacity: 0.5 }}>✦ ✦ ✦</span>
          </div>
        </div>
      </footer>
    </div>
  );
}