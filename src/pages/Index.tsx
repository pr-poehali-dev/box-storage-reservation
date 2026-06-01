import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const HERO_IMAGE = "https://cdn.poehali.dev/projects/0b562073-4296-43cc-a0fe-c24f3ec51a75/files/81c724c4-e9e4-40ce-bd90-f3e7539e8cc0.jpg";

const SIZES = [
  { id: "standard", label: "📦", name: "Стандартный", desc: "1 коробка 60×40", pricePerDay: 50 },
];

const MONTHS = [1, 2, 3, 6, 12];

const PRICES = [
  {
    title: "Подённо",
    size: "1 коробка 60×40",
    perMonth: "50 ₽/день",
    perDay: "50",
    features: ["Коробка 60×40 см", "Стандартный тариф", "Видеонаблюдение", "Страховка включена"],
  },
  {
    title: "Абонемент",
    size: "30 дней",
    perMonth: "1 200",
    perDay: "40",
    popular: true,
    features: ["1 коробка 60×40 см", "Фиксированная цена", "Видеонаблюдение", "Страховка включена", "Выгода 300 ₽ vs подённо"],
  },
];

const DELIVERY_PRICES = [
  { title: "1 коробка", price: "1 000 ₽", desc: "Забираем у вас дома" },
  { title: "2 коробки", price: "700 ₽", desc: "За каждую при заказе от 2 шт." },
  { title: "3+ коробки", price: "от 200 ₽", desc: "Каждая следующая коробка" },
  { title: "Срочный выезд", price: "3 500 ₽", desc: "Выезд в день обращения" },
  { title: "Доставка со склада", price: "от 1 000 ₽", desc: "Возврат вещей к вам" },
];

const STEPS = [
  { num: "01", icon: "Calculator", title: "Рассчитайте стоимость", desc: "Укажите размер и срок хранения — получите точную цену без скрытых платежей." },
  { num: "02", icon: "ClipboardList", title: "Оформите заявку", desc: "Заполните форму бронирования онлайн. Это займёт 2 минуты." },
  { num: "03", icon: "Truck", title: "Мы заберём вещи", desc: "Наша команда приедет в удобное время и аккуратно упакует всё для транспортировки." },
  { num: "04", icon: "PackageCheck", title: "Храним и возвращаем", desc: "Вещи хранятся в безопасном складе. Вернём по предварительному звонку!" },
];

const ADVANTAGES = [
  { icon: "Shield", title: "Полная страховка", desc: "Все вещи застрахованы на 100% стоимости. Никаких рисков." },
  { icon: "Thermometer", title: "Климат-контроль", desc: "Постоянная температура и влажность. Одежда, техника, документы в сохранности." },
  { icon: "Camera", title: "Видеонаблюдение 24/7", desc: "Охрана и камеры на каждом квадратном метре склада." },
  { icon: "Truck", title: "Забираем от двери", desc: "Приедем, упакуем и доставим на склад. Вам не нужно никуда ехать." },
  { icon: "Key", title: "Доступ в любое время", desc: "Круглосуточный доступ к вашим вещам без записи и ожидания." },
  { icon: "Banknote", title: "Без скрытых платежей", desc: "Цена фиксирована. Никаких доплат за въезд, упаковку или охрану." },
];

const FAQ = [
  { q: "Как быстро можно получить свои вещи обратно?", a: "Вы можете забрать вещи в любой рабочий день без предварительной записи. При тарифе «Стандарт» и выше — круглосуточно. Или мы доставим их к вам домой в течение суток." },
  { q: "Что нельзя хранить на складе?", a: "Запрещено хранение продуктов питания, легковоспламеняющихся веществ, оружия и живых организмов. Всё остальное — одежда, мебель, техника, документы, коробки — принимаем без ограничений." },
  { q: "Нужен ли договор?", a: "Да, мы заключаем официальный договор хранения с каждым клиентом. Это защищает и нас, и вас. Договор подписывается при первой передаче вещей." },
  { q: "Как происходит оплата?", a: "Оплата производится за выбранный период вперёд — наличными, картой или переводом. При продлении срока хранения предоставляем скидку от 5% до 15%." },
  { q: "Что если мне нужно хранить вещи дольше оплаченного срока?", a: "Просто сообщите нам за 3 дня до окончания срока. Мы автоматически продлим хранение по текущему тарифу или предложим более выгодный план." },
  { q: "Занимаетесь ли вы упаковкой вещей?", a: "Да. Наши специалисты профессионально упакуют мебель, технику и хрупкие предметы. Упаковочные материалы — пузырчатая плёнка, стрейч, короба — предоставляются бесплатно при заказе выезда." },
];

export default function Index() {
  const [selectedSize, setSelectedSize] = useState(SIZES[0]);
  const [selectedMonths, setSelectedMonths] = useState(1);
  const [form, setForm] = useState({ name: "", phone: "", email: "", size: "S", date: "", comment: "" });
  const [consent, setConsent] = useState(false);
  const [formSent, setFormSent] = useState(false);

  const [boxCount, setBoxCount] = useState(1);
  const [days, setDays] = useState(7);
  const pricePerDay = 50;
  const abonnPrice = 1200;
  const isAbonn = days >= 30;
  const abonnMonths = Math.ceil(days / 30);
  const totalPrice = isAbonn ? abonnPrice * abonnMonths * boxCount : pricePerDay * days * boxCount;

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tariff = `${boxCount} ${boxCount === 1 ? "коробка" : boxCount < 5 ? "коробки" : "коробок"} · ${isAbonn ? `абонемент (${abonnMonths} мес.)` : `${days} дн. подённо`} · ${totalPrice.toLocaleString("ru-RU")} ₽`;
    await fetch('https://functions.poehali.dev/7dc3a7d2-834f-4874-a423-9aebd5e2c7e8', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...form, tariff }),
    });
    setFormSent(true);
  };

  return (
    <div className="min-h-screen bg-white font-body">

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-900 border-b border-navy-700">
        <div className="container-custom flex items-center justify-between h-16 px-4 md:px-8">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-amber-DEFAULT flex items-center justify-center">
              <Icon name="Package" size={18} className="text-navy-900" />
            </div>
            <span className="font-heading text-xl text-white tracking-wider uppercase">Хлам Нам</span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            {[["Как работает", "#how"], ["Цены", "#prices"], ["Калькулятор", "#calc"], ["Контакты", "#contacts"]].map(([label, href]) => (
              <a key={href} href={href} className="text-gray-300 hover:text-amber-DEFAULT transition-colors text-sm font-body tracking-wide">
                {label}
              </a>
            ))}
          </nav>
          <a href="#booking" className="bg-amber-DEFAULT hover:bg-amber-dark text-navy-900 font-heading font-semibold text-sm px-5 py-2.5 uppercase tracking-wider transition-colors">
            Забронировать
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen flex items-center overflow-hidden pt-16">
        <div className="absolute inset-0">
          <img src={HERO_IMAGE} alt="Склад хранения" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-navy-950/80" />
          <div className="absolute inset-0 bg-gradient-to-r from-navy-950/95 via-navy-950/70 to-transparent" />
        </div>
        <div className="relative container-custom px-4 md:px-8 py-32">
          <div className="max-w-2xl animate-fade-in" style={{ animationDelay: "0.1s", opacity: 0 }}>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-12 bg-amber-DEFAULT" />
              <span className="text-amber-DEFAULT font-body text-sm tracking-widest uppercase">Профессиональное хранение</span>
            </div>
            <h1 className="font-heading text-5xl md:text-7xl text-white uppercase leading-none mb-6">
              У Вас есть <span className="text-amber-DEFAULT">Хлам</span> —<br />
              отдайте его <span className="text-amber-DEFAULT">Нам!</span>
            </h1>
            <p className="text-gray-200 text-lg md:text-xl mb-10 leading-relaxed max-w-lg">
              Безопасное хранение вещей и коробок с доставкой от двери. Климат-контроль, страховка и круглосуточный доступ.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#booking" className="border-2 border-white hover:bg-white text-white hover:text-navy-900 font-heading font-bold text-base px-8 py-4 uppercase tracking-wider transition-colors text-center">
                Забронировать место
              </a>
              <a href="#calc" className="border border-white/30 hover:border-amber-DEFAULT text-white hover:text-amber-DEFAULT font-heading text-base px-8 py-4 uppercase tracking-wider transition-colors text-center">
                Рассчитать цену
              </a>
            </div>
          </div>
          <div className="absolute bottom-8 right-8 hidden lg:grid grid-cols-3 gap-4 text-center animate-fade-in" style={{ animationDelay: "0.5s", opacity: 0 }}>
            {[["500+", "Клиентов"], ["2", "Склада в Туле"], ["24/7", "Доступ"]].map(([num, label]) => (
              <div key={label} className="bg-white/10 backdrop-blur-sm border border-white/10 px-6 py-4">
                <div className="font-heading text-3xl text-amber-DEFAULT font-bold">{num}</div>
                <div className="text-gray-200 text-xs mt-1 tracking-wide">{label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-amber-DEFAULT" />
              <span className="text-amber-dark font-body text-sm tracking-widest uppercase">Просто и понятно</span>
              <div className="h-px w-12 bg-amber-DEFAULT" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy-900 uppercase">Как это работает</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
            {STEPS.map((step, i) => (
              <div key={step.num} className="relative bg-white p-8 group hover:bg-navy-900 transition-colors duration-300">
                <div className="font-heading text-6xl text-gray-100 group-hover:text-navy-800 transition-colors absolute top-4 right-6 leading-none select-none">
                  {step.num}
                </div>
                <div className="w-12 h-12 bg-amber-DEFAULT flex items-center justify-center mb-6">
                  <Icon name={step.icon} fallback="Box" size={22} className="text-navy-900" />
                </div>
                <h3 className="font-heading text-lg text-navy-900 group-hover:text-white uppercase mb-3 transition-colors">{step.title}</h3>
                <p className="text-gray-500 group-hover:text-navy-200 text-sm leading-relaxed transition-colors">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CALCULATOR */}
      <section id="calc" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-amber-DEFAULT" />
              <span className="text-amber-dark font-body text-sm tracking-widest uppercase">Без скрытых платежей</span>
              <div className="h-px w-12 bg-amber-DEFAULT" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy-900 uppercase">Рассчитайте стоимость</h2>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              {/* Количество коробок */}
              <div className="mb-10">
                <p className="text-navy-900 font-body text-sm uppercase tracking-widest mb-5 font-semibold">Количество коробок (60×40 см)</p>
                <div className="flex items-center gap-5">
                  <button
                    onClick={() => setBoxCount(Math.max(1, boxCount - 1))}
                    className="w-12 h-12 border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-heading text-2xl transition-all"
                  >−</button>
                  <div className="text-center min-w-[80px]">
                    <div className="font-heading text-5xl text-navy-900 font-bold">{boxCount}</div>
                    <div className="text-navy-700 text-xs mt-1 font-semibold">{boxCount === 1 ? "коробка" : boxCount < 5 ? "коробки" : "коробок"}</div>
                  </div>
                  <button
                    onClick={() => setBoxCount(boxCount + 1)}
                    className="w-12 h-12 border-2 border-navy-900 text-navy-900 hover:bg-navy-900 hover:text-white font-heading text-2xl transition-all"
                  >+</button>
                </div>
              </div>

              {/* Срок в днях */}
              <div>
                <div className="flex items-center justify-between mb-5">
                  <p className="text-navy-900 font-body text-sm uppercase tracking-widest font-semibold">Срок хранения</p>
                  <span className={`font-heading text-sm px-3 py-1 uppercase tracking-wider ${isAbonn ? "bg-amber-DEFAULT text-navy-900" : "bg-navy-900 text-white"}`}>
                    {isAbonn ? "Абонемент" : "Подённо"}
                  </span>
                </div>
                <div className="flex items-center gap-4 mb-4">
                  <span className="font-heading text-5xl text-navy-900 font-bold min-w-[80px]">{days}</span>
                  <span className="text-navy-700 text-sm font-semibold">{days === 1 ? "день" : days < 5 ? "дня" : "дней"}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={90}
                  value={days}
                  onChange={(e) => setDays(Number(e.target.value))}
                  className="w-full accent-amber-DEFAULT h-2 cursor-pointer"
                />
                <div className="flex justify-between text-xs text-navy-700 mt-2 font-medium">
                  <span>1 день</span>
                  <span className="text-amber-dark font-bold">← до 29 дней подённо · от 30 дней абонемент →</span>
                  <span>90 дней</span>
                </div>
                {isAbonn && (
                  <div className="mt-4 p-3 bg-amber-DEFAULT border border-amber-dark">
                    <p className="text-navy-900 text-sm font-semibold">
                      <span className="font-heading uppercase">Автоматически абонемент</span> — выгоднее подённого тарифа
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Итог */}
            <div className="bg-navy-900 border border-navy-700 p-10">
              <p className="text-gray-300 text-sm uppercase tracking-widest mb-4 font-semibold">Итого к оплате</p>
              <div className="border border-white/20 px-6 py-5 mb-4 inline-block w-full text-center">
                <div className="font-heading text-7xl text-white font-bold leading-none">
                  {totalPrice.toLocaleString("ru-RU")} ₽
                </div>
              </div>
              <p className="text-gray-300 text-sm mb-8">
                {days} {days === 1 ? "день" : days < 5 ? "дня" : "дней"} · {boxCount} {boxCount === 1 ? "коробка" : boxCount < 5 ? "коробки" : "коробок"} · {isAbonn ? "абонемент" : "подённо"}
              </p>
              <div className="border-t border-navy-600 pt-6 space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Коробок</span>
                  <span className="text-white font-semibold">{boxCount} шт.</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">Тариф</span>
                  <span className="text-white font-semibold">{isAbonn ? `${abonnPrice} ₽/мес × ${abonnMonths} мес.` : `${pricePerDay} ₽/день × ${days} дн.`}</span>
                </div>
                {!isAbonn && days >= 20 && (
                  <div className="flex justify-between text-sm border-t border-navy-600 pt-3">
                    <span className="text-gray-300">Совет</span>
                    <span className="text-amber-DEFAULT text-xs font-bold">Абонемент выгоднее с 30 дня!</span>
                  </div>
                )}
              </div>
              <a href="#booking" className="block w-full bg-amber-DEFAULT hover:bg-amber-dark text-navy-900 font-heading font-bold uppercase tracking-wider text-center py-4 transition-colors">
                Забронировать
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* PRICES */}
      <section id="prices" className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-amber-DEFAULT" />
              <span className="text-amber-dark font-body text-sm tracking-widest uppercase">Тарифные планы</span>
              <div className="h-px w-12 bg-amber-DEFAULT" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy-900 uppercase">Цены и тарифы</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-gray-100 border border-gray-100">
            {PRICES.map((plan) => (
              <div key={plan.title} className={`relative p-8 flex flex-col ${plan.popular ? "bg-navy-900" : "bg-white"}`}>
                {plan.popular && (
                  <div className="absolute top-0 left-0 right-0 h-1 bg-amber-DEFAULT" />
                )}
                {plan.popular && (
                  <div className="inline-block bg-amber-DEFAULT text-navy-900 font-heading text-xs uppercase tracking-widest px-3 py-1 mb-4 self-start">
                    Популярный
                  </div>
                )}
                <h3 className={`font-heading text-2xl uppercase mb-1 ${plan.popular ? "text-white" : "text-navy-900"}`}>{plan.title}</h3>
                <p className={`text-sm mb-6 ${plan.popular ? "text-gray-300" : "text-gray-500"}`}>{plan.size}</p>
                <div className={`font-heading font-bold mb-1 ${plan.popular ? "text-5xl" : "text-4xl"} ${plan.popular ? "text-amber-DEFAULT" : "text-navy-900"}`}>
                  {plan.popular && <span className="block text-xs text-gray-300 font-body font-normal tracking-widest uppercase mb-1">Цена</span>}
                  {plan.perMonth}
                </div>
                {plan.popular && (
                  <div className="inline-block border border-amber-DEFAULT/40 bg-amber-DEFAULT/10 px-3 py-1 mb-3 self-start">
                    <span className="text-amber-DEFAULT text-xs font-heading uppercase tracking-wider">Экономия 300 ₽/мес</span>
                  </div>
                )}
                <p className={`text-sm mb-8 ${plan.popular ? "text-gray-300" : "text-gray-500"}`}>{plan.perDay} ₽/день</p>
                <ul className="space-y-2.5 flex-1 mb-8">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Icon name="Check" size={15} className={`mt-0.5 flex-shrink-0 ${plan.popular ? "text-amber-DEFAULT" : "text-amber-dark"}`} />
                      <span className={`text-sm ${plan.popular ? "text-gray-200" : "text-gray-600"}`}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="#booking"
                  className={`block w-full text-center font-heading uppercase tracking-wider text-sm py-3.5 transition-colors ${
                    plan.popular
                      ? "bg-amber-DEFAULT hover:bg-amber-dark text-navy-900 font-bold"
                      : "border-2 border-navy-900 hover:bg-navy-900 hover:text-white text-navy-900"
                  }`}
                >
                  Выбрать
                </a>
              </div>
            ))}
          </div>

          {/* DELIVERY PRICES */}
          <div className="mt-12">
            <h3 className="font-heading text-2xl text-navy-900 uppercase mb-6 text-center">Доставка и выезд</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px bg-gray-100 border border-gray-100">
              {DELIVERY_PRICES.map((d) => (
                <div key={d.title} className="bg-white p-6 text-center hover:bg-navy-900 group transition-colors duration-300">
                  <div className="font-heading text-2xl text-amber-dark group-hover:text-amber-DEFAULT font-bold mb-1 transition-colors">{d.price}</div>
                  <div className="font-heading text-base text-navy-900 group-hover:text-white uppercase mb-2 transition-colors">{d.title}</div>
                  <div className="text-gray-500 group-hover:text-gray-300 text-xs leading-relaxed transition-colors">{d.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* BOOKING FORM */}
      <section id="booking" className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-amber-DEFAULT" />
                <span className="text-amber-dark font-body text-sm tracking-widest uppercase">Онлайн бронирование</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl text-navy-900 uppercase mb-6">Забронируйте<br />место прямо сейчас</h2>
              <p className="text-gray-500 leading-relaxed mb-10">
                Оставьте заявку — наш менеджер свяжется с вами в течение 15 минут и уточнит все детали. Без обязательств.
              </p>
              <div className="space-y-6">
                {[
                  ["Быстро", "Ответим в течение 15 минут в рабочее время"],
                  ["Удобно", "Заберём вещи в любом объёме с любой части города"],
                  ["Надёжно", "Официальный договор и страховка каждого клиента"],
                ].map(([title, desc]) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-1 h-12 bg-amber-DEFAULT flex-shrink-0 mt-1" />
                    <div>
                      <p className="font-heading text-navy-900 uppercase tracking-wide">{title}</p>
                      <p className="text-gray-500 text-sm mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-white border border-gray-100 p-10 shadow-sm">
              {formSent ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-amber-DEFAULT flex items-center justify-center mx-auto mb-6">
                    <Icon name="CheckCheck" size={28} className="text-navy-900" />
                  </div>
                  <h3 className="font-heading text-2xl text-navy-900 uppercase mb-3">Заявка принята!</h3>
                  <p className="text-gray-500">Мы свяжемся с вами в течение 15 минут. Спасибо!</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div>
                    <label className="block text-navy-900 font-body text-xs uppercase tracking-widest mb-2">Ваше имя *</label>
                    <input
                      name="name"
                      value={form.name}
                      onChange={handleFormChange}
                      required
                      placeholder="Иван Иванов"
                      className="w-full border border-gray-200 focus:border-navy-900 outline-none px-4 py-3 text-sm transition-colors bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-navy-900 font-body text-xs uppercase tracking-widest mb-2">Телефон *</label>
                    <input
                      name="phone"
                      value={form.phone}
                      onChange={handleFormChange}
                      required
                      placeholder="+7 (___) ___-__-__"
                      className="w-full border border-gray-200 focus:border-navy-900 outline-none px-4 py-3 text-sm transition-colors bg-white"
                    />
                  </div>
                  <div>
                    <label className="block text-navy-900 font-body text-xs uppercase tracking-widest mb-2">Email</label>
                    <input
                      name="email"
                      type="email"
                      value={form.email}
                      onChange={handleFormChange}
                      placeholder="ivan@mail.ru"
                      className="w-full border border-gray-200 focus:border-navy-900 outline-none px-4 py-3 text-sm transition-colors bg-white"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-navy-900 font-body text-xs uppercase tracking-widest mb-2">Тариф</label>
                      <div className="w-full border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-navy-900 font-semibold">
                        {boxCount} {boxCount === 1 ? "коробка" : boxCount < 5 ? "коробки" : "коробок"} · {isAbonn ? "абонемент" : `${days} дн.`}
                      </div>
                    </div>
                    <div>
                      <label className="block text-navy-900 font-body text-xs uppercase tracking-widest mb-2">Дата начала</label>
                      <input
                        name="date"
                        type="date"
                        value={form.date}
                        onChange={handleFormChange}
                        className="w-full border border-gray-200 focus:border-navy-900 outline-none px-4 py-3 text-sm transition-colors bg-white"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-navy-900 font-body text-xs uppercase tracking-widest mb-2">Комментарий</label>
                    <textarea
                      name="comment"
                      value={form.comment}
                      onChange={handleFormChange}
                      placeholder="Расскажите, что нужно хранить..."
                      rows={3}
                      className="w-full border border-gray-200 focus:border-navy-900 outline-none px-4 py-3 text-sm transition-colors bg-white resize-none"
                    />
                  </div>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      required
                      className="mt-0.5 w-4 h-4 accent-navy-900 flex-shrink-0 cursor-pointer"
                    />
                    <span className="text-gray-500 text-xs leading-relaxed group-hover:text-gray-700 transition-colors">
                      Я даю согласие на обработку персональных данных и принимаю условия{" "}
                      <a href="#" className="text-navy-900 underline hover:text-amber-dark transition-colors">
                        политики конфиденциальности
                      </a>
                    </span>
                  </label>
                  <button
                    type="submit"
                    disabled={!consent}
                    className="w-full bg-navy-900 hover:bg-navy-800 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-heading uppercase tracking-wider py-4 text-sm transition-colors"
                  >
                    Отправить заявку
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ADVANTAGES */}
      <section className="section-padding bg-white">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-amber-DEFAULT" />
              <span className="text-amber-dark font-body text-sm tracking-widest uppercase">Почему мы</span>
              <div className="h-px w-12 bg-amber-DEFAULT" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-navy-900 uppercase">Наши преимущества</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-gray-100 border border-gray-100">
            {ADVANTAGES.map((adv) => (
              <div key={adv.title} className="bg-white p-8 group hover:bg-navy-900 transition-colors duration-300">
                <div className="w-12 h-12 border-2 border-navy-900 group-hover:border-amber-DEFAULT flex items-center justify-center mb-6 transition-colors">
                  <Icon name={adv.icon} fallback="Star" size={20} className="text-navy-900 group-hover:text-amber-DEFAULT transition-colors" />
                </div>
                <h3 className="font-heading text-lg text-navy-900 group-hover:text-white uppercase mb-3 transition-colors">{adv.title}</h3>
                <p className="text-gray-500 group-hover:text-navy-300 text-sm leading-relaxed transition-colors">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-gray-50">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div className="lg:sticky lg:top-24">
              <div className="flex items-center gap-3 mb-4">
                <div className="h-px w-12 bg-amber-DEFAULT" />
                <span className="text-amber-dark font-body text-sm tracking-widest uppercase">Частые вопросы</span>
              </div>
              <h2 className="font-heading text-4xl md:text-5xl text-navy-900 uppercase mb-6">Всё, что<br />нужно знать</h2>
              <p className="text-gray-500 leading-relaxed">
                Собрали ответы на самые популярные вопросы. Если не нашли нужного — напишите нам напрямую.
              </p>
              <a href="#contacts" className="inline-flex items-center gap-2 mt-8 text-navy-900 font-heading uppercase text-sm tracking-wider border-b-2 border-amber-DEFAULT pb-0.5 hover:border-navy-900 transition-colors">
                Задать вопрос
                <Icon name="ArrowRight" size={16} />
              </a>
            </div>
            <div>
              <Accordion type="single" collapsible className="space-y-2">
                {FAQ.map((item, i) => (
                  <AccordionItem key={i} value={`item-${i}`} className="bg-white border border-gray-100 px-6">
                    <AccordionTrigger className="font-heading text-navy-900 uppercase text-sm tracking-wide py-5 hover:no-underline text-left">
                      {item.q}
                    </AccordionTrigger>
                    <AccordionContent className="text-gray-500 text-sm leading-relaxed pb-5">
                      {item.a}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        </div>
      </section>

      {/* CONTACTS */}
      <section id="contacts" className="section-padding bg-navy-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="h-px w-12 bg-amber-DEFAULT" />
              <span className="text-amber-DEFAULT font-body text-sm tracking-widest uppercase">Свяжитесь с нами</span>
              <div className="h-px w-12 bg-amber-DEFAULT" />
            </div>
            <h2 className="font-heading text-4xl md:text-5xl text-white uppercase">Контакты</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-navy-700">
            {[
              { icon: "Phone", title: "Телефон", lines: ["+7 (495) 123-45-67", "Пн–Вс: 08:00–22:00"] },
              { icon: "Mail", title: "Email", lines: ["info@hlamnam.ru", "Ответим за 2 часа"] },
              { icon: "MapPin", title: "Адреса складов", lines: ["Тула, ул. Пролетарская 12", "Тула, ул. Металлургов 34"] },
            ].map((c) => (
              <div key={c.title} className="bg-navy-900 p-10 text-center">
                <div className="w-14 h-14 bg-amber-DEFAULT flex items-center justify-center mx-auto mb-5">
                  <Icon name={c.icon} fallback="Info" size={24} className="text-navy-900" />
                </div>
                <h3 className="font-heading text-white uppercase tracking-wider mb-3">{c.title}</h3>
                {c.lines.map((l) => (
                  <p key={l} className="text-gray-300 text-sm mt-1">{l}</p>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-12 bg-navy-800 border border-navy-700 h-64 flex items-center justify-center">
            <div className="text-center">
              <Icon name="Map" size={32} className="text-gray-500 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Карта появится после подключения</p>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-navy-950 py-10 px-4 md:px-8">
        <div className="container-custom flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-amber-DEFAULT flex items-center justify-center">
              <Icon name="Package" size={15} className="text-navy-900" />
            </div>
            <span className="font-heading text-lg text-white tracking-wider uppercase">Хлам Нам</span>
          </div>
          <p className="text-gray-400 text-sm text-center">
            © 2024 Хлам Нам. Профессиональное хранение вещей в Туле.
          </p>
          <div className="flex items-center gap-6">
            {["Политика конфиденциальности", "Договор оферты"].map((link) => (
              <a key={link} href="#" className="text-gray-500 hover:text-gray-300 text-xs transition-colors">
                {link}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}