import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

// Animation wrapper component
function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: 'easeOut' }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// Particle background for hero
function ParticleBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="particle absolute rounded-full"
          style={{
            width: `${Math.random() * 4 + 2}px`,
            height: `${Math.random() * 4 + 2}px`,
            background: '#D4AF37',
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: 0.3,
          }}
        />
      ))}
    </div>
  );
}

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      <ParticleBackground />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-[Playfair_Display] text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Не просто реклама.{' '}
          <span className="gold-text">Экосистема захвата спроса.</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-[Manrope]"
        >
          Объединяем Яндекс Директ, Яндекс Карты и управление репутацией в единую систему,
          которая заполняет даты вашего банкетного зала и ресторана.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a href="#contact" className="gold-button inline-block text-lg">
            Получить бесплатный аудит
          </a>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
          className="mt-16"
        >
          <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
            <span>↓</span>
            <span>Листайте вниз</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Problem Section
function ProblemSection() {
  const problems = [
    {
      icon: '🔍',
      title: 'Невидимость в поиске',
      description: 'Ваш зал на 4-й странице выдачи. Клиенты не видят вас — они видят конкурентов, которые инвестировали в продвижение.',
      stat: 'Позиция #4-10 = 0% кликов',
    },
    {
      icon: '⭐',
      title: 'Разрыв доверия',
      description: 'У конкурентов 150+ отзывов с фото, а у вас — 3 отзыва без картинок. Клиент выбирает глазами.',
      stat: '92% читают отзывы перед бронированием',
    },
    {
      icon: '💸',
      title: 'Слитый бюджет',
      description: 'Реклама есть, но leads некачественные: свадьбы на 5 человек, корпоративы без бюджета. Деньги уходят в пустоту.',
      stat: 'Средний CAC без оптимизации: 8000+₽',
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-[Playfair_Display] text-3xl md:text-5xl font-bold mb-4">
            Почему ваш зал <span className="gold-text">пустует?</span>
          </h2>
          <p className="text-gray-400 text-lg font-[Manrope]">Три причины, которые стоят вам миллионов</p>
        </AnimatedSection>

        <div className="space-y-6 md:space-y-8">
          {problems.map((problem, index) => (
            <AnimatedSection key={index} delay={index * 0.15}>
              <div className="glass-card p-8 md:p-10 hover:border-[rgba(212,175,55,0.4)] transition-all duration-300">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="text-4xl md:text-5xl">{problem.icon}</div>
                  <div className="flex-1">
                    <h3 className="font-[Playfair_Display] text-xl md:text-2xl font-semibold mb-3 text-white">
                      {problem.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed font-[Manrope] mb-4">
                      {problem.description}
                    </p>
                    <div className="inline-block px-4 py-2 rounded-full bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)]">
                      <span className="text-gold text-sm font-semibold font-[Manrope]">{problem.stat}</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={0.5} className="mt-16 text-center">
          <div className="glass-card-strong p-10 glow-gold">
            <div className="text-5xl md:text-7xl font-bold gold-text font-[Playfair_Display] mb-3">73%</div>
            <p className="text-gray-300 text-lg font-[Manrope]">
              клиентов выбирают только из <span className="text-white font-semibold">топ-3 результатов</span> поиска
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Solution Section
function SolutionSection() {
  const features = [
    {
      icon: '🎯',
      title: 'Яндекс Директ',
      description: 'Перехват горячего спроса. Настраиваем кампании так, чтобы ваш зал показывался именно тем, кто ищет площадку прямо сейчас.',
    },
    {
      icon: '📍',
      title: 'Яндекс Карты & Бизнес',
      description: 'Упаковка точек доверия. Фото, описание, часы работы, меню — всё, что превращает карточку в магнит для клиентов.',
    },
    {
      icon: '💬',
      title: 'Управление репутацией',
      description: 'Системная работа с отзывами и рейтингами. Превращаем каждого гостя в амбассадора вашего заведения.',
    },
    {
      icon: '📊',
      title: 'Аналитика и ROI',
      description: 'Отслеживаем реальные показатели: звонки, брони, средний чек. Не лайки и показы, а деньги в кассе.',
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(212,175,55,0.02)] to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-[Playfair_Display] text-3xl md:text-5xl font-bold mb-4">
            Архитектура <span className="gold-text">Единого Потока</span>
          </h2>
          <p className="text-gray-400 text-lg font-[Manrope] max-w-2xl mx-auto">
            Я не продаю клики. Я строю системы, которые работают на результат.
          </p>
        </AnimatedSection>

        <div className="space-y-6">
          {features.map((feature, index) => (
            <AnimatedSection key={index} delay={index * 0.12}>
              <div className="glass-card p-8 hover:border-[rgba(212,175,55,0.4)] transition-all duration-300 group">
                <div className="flex items-start gap-5">
                  <div className="text-3xl md:text-4xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-[Playfair_Display] text-xl md:text-2xl font-semibold mb-2 text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed font-[Manrope]">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}

// Customer Journey Section
function JourneySection() {
  const steps = [
    {
      number: '01',
      title: 'Поисковый запрос',
      description: 'Клиент вводит «банкетный зал Москва» или «ресторан для свадьбы». Ваш зал должен быть в топ-3.',
      icon: '🔍',
    },
    {
      number: '02',
      title: 'Сравнение на картах',
      description: 'Клиент открывает Яндекс Карты и сравнивает 3-5 вариантов. Фото, рейтинг, расстояние решают всё.',
      icon: '📍',
    },
    {
      number: '03',
      title: 'Проверка отзывов',
      description: 'Клиент читает отзывы. 150+ отзывов с фото = доверие. 3 отзыва без фото = сомнение.',
      icon: '⭐',
    },
    {
      number: '04',
      title: 'Звонок и бронирование',
      description: 'Клиент звонит или оставляет заявку. Если на каждом шаге всё идеально — дата ваша.',
      icon: '📞',
    },
  ];

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-[Playfair_Display] text-3xl md:text-5xl font-bold mb-4">
            Путь гостя: <span className="gold-text">От поиска до брони</span>
          </h2>
          <p className="text-gray-400 text-lg font-[Manrope]">
            Пропустите любой шаг — и клиент уйдёт к конкуренту
          </p>
        </AnimatedSection>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#D4AF37] via-[rgba(212,175,55,0.5)] to-[rgba(212,175,55,0.1)]" />

          <div className="space-y-12">
            {steps.map((step, index) => (
              <AnimatedSection key={index} delay={index * 0.15}>
                <div className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <div className="absolute left-6 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-[#D4AF37] border-4 border-[#050505] z-10 shadow-[0_0_10px_rgba(212,175,55,0.5)]" />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                    <div className="glass-card p-6 md:p-8">
                      <div className="flex items-center gap-3 mb-3">
                        <span className="text-2xl">{step.icon}</span>
                        <span className="text-[#D4AF37] font-bold text-sm font-[Manrope] tracking-wider">ШАГ {step.number}</span>
                      </div>
                      <h3 className="font-[Playfair_Display] text-xl font-semibold mb-2 text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 font-[Manrope] leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Offer Section
function OfferSection() {
  const benefits = [
    'Аудит текущих позиций в поиске и на картах',
    'Настройка рекламных кампаний (Директ + ретаргетинг)',
    'Оптимизация карточки на Яндекс Картах',
    'Еженедельная отчётность с конкретными метриками',
  ];

  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[rgba(212,175,55,0.03)] to-transparent pointer-events-none" />
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-[Playfair_Display] text-3xl md:text-5xl font-bold mb-4">
            Пилотный проект: <span className="gold-text">14 дней тест-драйва</span>
          </h2>
          <p className="text-gray-400 text-lg font-[Manrope]">
            Попробуйте без рисков — убедитесь в результате
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Benefits */}
          <AnimatedSection delay={0.1}>
            <div className="glass-card p-8 md:p-10 h-full">
              <h3 className="font-[Playfair_Display] text-2xl font-semibold mb-6 text-white">
                Что входит:
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="text-[#D4AF37] text-xl flex-shrink-0 mt-0.5">✓</span>
                    <span className="text-gray-300 font-[Manrope] leading-relaxed">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Pricing */}
          <AnimatedSection delay={0.2}>
            <div className="glass-card-strong p-8 md:p-10 h-full glow-gold">
              <h3 className="font-[Playfair_Display] text-2xl font-semibold mb-6 text-white">
                Инвестиции:
              </h3>
              <div className="space-y-6">
                <div className="border-b border-[rgba(255,255,255,0.1)] pb-4">
                  <div className="text-sm text-gray-500 font-[Manrope] mb-1">Стоимость работы</div>
                  <div className="text-2xl md:text-3xl font-bold text-white font-[Playfair_Display]">
                    15 000 – 25 000 ₽
                  </div>
                </div>
                <div className="border-b border-[rgba(255,255,255,0.1)] pb-4">
                  <div className="text-sm text-gray-500 font-[Manrope] mb-1">Рекламный бюджет</div>
                  <div className="text-2xl md:text-3xl font-bold text-white font-[Playfair_Display]">
                    от 20 000 ₽
                  </div>
                  <div className="text-sm text-gray-500 mt-1 font-[Manrope]">оплачивается напрямую в Яндекс</div>
                </div>
                <div className="p-4 rounded-xl bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.2)]">
                  <div className="flex items-start gap-3">
                    <span className="text-[#D4AF37] text-xl">🛡️</span>
                    <div>
                      <div className="text-white font-semibold font-[Manrope] mb-1">Гарантия</div>
                      <div className="text-gray-400 text-sm font-[Manrope]">
                        Нет квалифицированных лидов — продолжаем работать бесплатно до достижения KPI.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// Trust Section
function TrustSection() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-[Playfair_Display] text-3xl md:text-5xl font-bold mb-4">
            Почему мне можно <span className="gold-text">доверить тест?</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2}>
          <div className="glass-card p-8 md:p-12">
            <div className="space-y-6 text-gray-300 font-[Manrope] leading-relaxed text-lg">
              <p>
                Мой опыт — это работа с локальными бизнес-экосистемами в сферах <span className="text-white font-semibold">Beauty и HoReCa</span> через Яндекс Бизнес.
              </p>
              <p>
                Я вижу картину целиком: как реклама в Директе влияет на позиции на картах, как отзывы конвертируют трафик в заявки, как единая система даёт результат, недоступный при точечных улучшениях.
              </p>
              <p>
                <span className="text-[#D4AF37] font-semibold">Честно:</span> я открыто говорю, что наращиваю новые кейсы именно в Директе для банкетной ниши. Но именно поэтому вы получаете максимальную вовлечённость, внимание к деталям и работу на результат — а не «ещё один клиент в потоке».
              </p>
              <div className="pt-4 border-t border-[rgba(255,255,255,0.1)]">
                <p className="text-gray-400 text-base italic">
                  «Я не обещаю золотые горы. Я обещаю прозрачность, системность и работу до результата.»
                </p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Final CTA Section
function CTASection() {
  return (
    <section id="contact" className="py-24 md:py-32 px-6 relative">
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection className="text-center">
          <h2 className="font-[Playfair_Display] text-3xl md:text-5xl font-bold mb-4">
            Готовы заполнить даты <span className="gold-text">на следующий сезон?</span>
          </h2>
          <p className="text-gray-400 text-lg font-[Manrope] mb-10 max-w-xl mx-auto">
            Давайте проведём быстрый 15-минутный аудит вашей текущей позиции и покажем точки роста.
          </p>

          <a href="#contact" className="gold-button inline-block text-lg mb-12">
            Записаться на разбор
          </a>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass-card p-6 text-center">
              <div className="text-2xl mb-2">📱</div>
              <div className="text-sm text-gray-500 font-[Manrope] mb-1">Телефон</div>
              <a href="tel:+79001234567" className="text-white hover:text-[#D4AF37] transition-colors font-[Manrope]">
                +7 (900) 123-45-67
              </a>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-2xl mb-2">✈️</div>
              <div className="text-sm text-gray-500 font-[Manrope] mb-1">Telegram</div>
              <a href="https://t.me/example" className="text-white hover:text-[#D4AF37] transition-colors font-[Manrope]">
                @marketing_expert
              </a>
            </div>
            <div className="glass-card p-6 text-center">
              <div className="text-2xl mb-2">✉️</div>
              <div className="text-sm text-gray-500 font-[Manrope] mb-1">Email</div>
              <a href="mailto:hello@example.ru" className="text-white hover:text-[#D4AF37] transition-colors font-[Manrope]">
                hello@example.ru
              </a>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// Footer
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-5xl mx-auto text-center">
        <p className="text-gray-600 text-sm font-[Manrope]">
          © 2024 Экосистема захвата спроса. Все права защищены.
        </p>
      </div>
    </footer>
  );
}

// Main App
export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <JourneySection />
      <OfferSection />
      <TrustSection />
      <CTASection />
      <Footer />
    </div>
  );
}
