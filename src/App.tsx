import { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useInView, useScroll, useTransform } from 'framer-motion';

// ===== SCROLL PROGRESS BAR =====
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (v) => {
      setWidth(v * 100);
    });
    return () => unsubscribe();
  }, [scrollYProgress]);

  return <div className="scroll-progress" style={{ width: `${width}%` }} />;
}

// ===== ANIMATED COUNTER =====
function AnimatedCounter({ target, duration = 2000, suffix = '' }: { target: number; duration?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref} className="counter-glow">
      {count}{suffix}
    </span>
  );
}

// ===== ANIMATED SECTION =====
function AnimatedSection({ 
  children, 
  className = '', 
  delay = 0,
  direction = 'up'
}: { 
  children: React.ReactNode; 
  className?: string; 
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'scale';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const variants = {
    up: { initial: { opacity: 0, y: 50 }, animate: { opacity: 1, y: 0 } },
    left: { initial: { opacity: 0, x: -50 }, animate: { opacity: 1, x: 0 } },
    right: { initial: { opacity: 0, x: 50 }, animate: { opacity: 1, x: 0 } },
    scale: { initial: { opacity: 0, scale: 0.85 }, animate: { opacity: 1, scale: 1 } },
  };

  const v = variants[direction];

  return (
    <motion.div
      ref={ref}
      initial={v.initial}
      animate={isInView ? v.animate : v.initial}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ===== STAGGER CONTAINER =====
function StaggerContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: 0.15 } }
      }}
    >
      {children}
    </motion.div>
  );
}

function StaggerItem({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 30, scale: 0.95 },
        visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] } }
      }}
    >
      {children}
    </motion.div>
  );
}

// ===== HERO SECTION =====
function HeroSection() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.9]);

  const particles = [
    { size: 3, left: '10%', top: '20%', delay: 0 },
    { size: 2, left: '80%', top: '15%', delay: 1.5 },
    { size: 4, left: '25%', top: '70%', delay: 3 },
    { size: 2, left: '70%', top: '60%', delay: 2 },
    { size: 3, left: '50%', top: '30%', delay: 4 },
    { size: 2, left: '90%', top: '80%', delay: 1 },
    { size: 3, left: '15%', top: '50%', delay: 5 },
    { size: 2, left: '60%', top: '85%', delay: 3.5 },
  ];

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center hero-gradient overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-orb-1 absolute w-[300px] h-[300px] rounded-full bg-[rgba(212,175,55,0.03)] blur-[80px] top-[10%] left-[10%]" />
        <div className="floating-orb-2 absolute w-[400px] h-[400px] rounded-full bg-[rgba(212,175,55,0.02)] blur-[100px] top-[50%] right-[5%]" />
        <div className="floating-orb-3 absolute w-[200px] h-[200px] rounded-full bg-[rgba(212,175,55,0.04)] blur-[60px] bottom-[20%] left-[40%]" />
      </div>

      {/* Particles */}
      <div className="absolute inset-0 pointer-events-none">
        {particles.map((p, i) => (
          <div
            key={i}
            className="particle absolute rounded-full"
            style={{
              width: `${p.size}px`,
              height: `${p.size}px`,
              background: '#D4AF37',
              left: p.left,
              top: p.top,
              animationDelay: `${p.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Content with parallax */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 max-w-4xl mx-auto px-6 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6"
        >
          <span className="inline-block px-4 py-2 rounded-full border border-[rgba(212,175,55,0.3)] text-[#D4AF37] text-sm font-[Manrope] tracking-wide">
            ✦ Яндекс Директ & Карты для банкетных залов
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="font-[Playfair_Display] text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6"
        >
          Не просто реклама.{' '}
          <span className="gold-text">Экосистема захвата спроса.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto mb-10 leading-relaxed font-[Manrope]"
        >
          Объединяем Яндекс Директ, Яндекс Карты и управление репутацией в единую систему,
          которая заполняет даты вашего банкетного зала и ресторана.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <a href="#contact" className="gold-button inline-block text-lg">
            Получить бесплатный аудит
          </a>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="mt-20"
        >
          <div className="scroll-indicator flex flex-col items-center gap-2 text-gray-500">
            <span className="text-xs font-[Manrope] tracking-widest uppercase">Scroll</span>
            <svg width="20" height="30" viewBox="0 0 20 30" fill="none" className="text-[#D4AF37]">
              <rect x="1" y="1" width="18" height="28" rx="9" stroke="currentColor" strokeWidth="1.5" />
              <motion.circle
                cx="10"
                cy="10"
                r="3"
                fill="currentColor"
                animate={{ cy: [10, 20, 10] }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

// ===== PROBLEM SECTION =====
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
    <section className="py-24 md:py-32 px-6 relative">
      <div className="section-divider mb-24" />
      <div className="max-w-5xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <motion.h2 
            className="font-[Playfair_Display] text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            Почему ваш зал <span className="gold-text">пустует?</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg font-[Manrope]"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Три причины, которые стоят вам миллионов
          </motion.p>
        </AnimatedSection>

        <StaggerContainer className="space-y-6 md:space-y-8">
          {problems.map((problem, index) => (
            <StaggerItem key={index}>
              <div className="glass-card p-8 md:p-10">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <motion.div 
                    className="text-4xl md:text-5xl icon-hover"
                    whileHover={{ scale: 1.2, rotate: [0, -10, 10, 0] }}
                    transition={{ duration: 0.5 }}
                  >
                    {problem.icon}
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="font-[Playfair_Display] text-xl md:text-2xl font-semibold mb-3 text-white">
                      {problem.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed font-[Manrope] mb-4">
                      {problem.description}
                    </p>
                    <motion.div 
                      className="inline-block px-4 py-2 rounded-full bg-[rgba(212,175,55,0.1)] border border-[rgba(212,175,55,0.2)]"
                      whileHover={{ scale: 1.05, borderColor: 'rgba(212,175,55,0.5)' }}
                    >
                      <span className="text-[#D4AF37] text-sm font-semibold font-[Manrope]">{problem.stat}</span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerContainer>

        <AnimatedSection delay={0.4} className="mt-16 text-center" direction="scale">
          <motion.div 
            className="glass-card-strong p-10 glow-gold"
            whileHover={{ scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
          >
            <div className="text-5xl md:text-7xl font-bold gold-text font-[Playfair_Display] mb-3">
              <AnimatedCounter target={73} suffix="%" />
            </div>
            <p className="text-gray-300 text-lg font-[Manrope]">
              клиентов выбирают только из <span className="text-white font-semibold">топ-3 результатов</span> поиска
            </p>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ===== SOLUTION SECTION =====
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
    <section className="py-24 md:py-32 px-6 relative mesh-bg">
      <div className="section-divider mb-24" />
      <div className="max-w-5xl mx-auto relative z-10">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-[Playfair_Display] text-3xl md:text-5xl font-bold mb-4">
            Архитектура <span className="gold-text">Единого Потока</span>
          </h2>
          <p className="text-gray-400 text-lg font-[Manrope] max-w-2xl mx-auto">
            Я не продаю клики. Я строю системы, которые работают на результат.
          </p>
        </AnimatedSection>

        <StaggerContainer className="space-y-6">
          {features.map((feature, index) => (
            <StaggerItem key={index}>
              <motion.div 
                className="glass-card p-8 group cursor-default"
                whileHover={{ x: 8 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              >
                <div className="flex items-start gap-5">
                  <motion.div 
                    className="text-3xl md:text-4xl flex-shrink-0"
                    whileHover={{ scale: 1.3, rotate: 10 }}
                    transition={{ type: 'spring', stiffness: 400 }}
                  >
                    {feature.icon}
                  </motion.div>
                  <div>
                    <h3 className="font-[Playfair_Display] text-xl md:text-2xl font-semibold mb-2 text-white group-hover:text-[#D4AF37] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 leading-relaxed font-[Manrope]">
                      {feature.description}
                    </p>
                  </div>
                  <motion.div 
                    className="ml-auto text-[#D4AF37] opacity-0 group-hover:opacity-100 transition-opacity self-center"
                  >
                    →
                  </motion.div>
                </div>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  );
}

// ===== CUSTOMER JOURNEY SECTION =====
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

  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: '-100px' });

  return (
    <section className="py-24 md:py-32 px-6">
      <div className="section-divider mb-24" />
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-16">
          <h2 className="font-[Playfair_Display] text-3xl md:text-5xl font-bold mb-4">
            Путь гостя: <span className="gold-text">От поиска до брони</span>
          </h2>
          <p className="text-gray-400 text-lg font-[Manrope]">
            Пропустите любой шаг — и клиент уйдёт к конкуренту
          </p>
        </AnimatedSection>

        <div ref={containerRef} className="relative">
          {/* Animated timeline line */}
          <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] bg-[rgba(212,175,55,0.1)]">
            <motion.div 
              className="w-full bg-gradient-to-b from-[#D4AF37] via-[rgba(212,175,55,0.5)] to-[rgba(212,175,55,0.1)]"
              initial={{ height: '0%' }}
              animate={isInView ? { height: '100%' } : { height: '0%' }}
              transition={{ duration: 1.5, ease: 'easeOut' }}
            />
          </div>

          <div className="space-y-12">
            {steps.map((step, index) => (
              <AnimatedSection 
                key={index} 
                delay={index * 0.2}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <div className={`relative flex flex-col md:flex-row items-start md:items-center gap-6 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                  {/* Timeline dot */}
                  <motion.div 
                    className="timeline-dot absolute left-6 md:left-1/2 w-4 h-4 -translate-x-1/2 rounded-full bg-[#D4AF37] border-4 border-[#050505] z-10"
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 0.5 + index * 0.3, type: 'spring', stiffness: 300 }}
                  />

                  {/* Content */}
                  <div className={`ml-14 md:ml-0 md:w-[calc(50%-40px)] ${index % 2 === 0 ? 'md:text-right md:pr-10' : 'md:text-left md:pl-10'}`}>
                    <motion.div 
                      className="glass-card p-6 md:p-8"
                      whileHover={{ scale: 1.02, borderColor: 'rgba(212,175,55,0.4)' }}
                      transition={{ type: 'spring', stiffness: 300 }}
                    >
                      <div className={`flex items-center gap-3 mb-3 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                        <motion.span 
                          className="text-2xl"
                          whileHover={{ scale: 1.3, rotate: [0, -15, 15, 0] }}
                          transition={{ duration: 0.5 }}
                        >
                          {step.icon}
                        </motion.span>
                        <span className="text-[#D4AF37] font-bold text-sm font-[Manrope] tracking-wider">ШАГ {step.number}</span>
                      </div>
                      <h3 className="font-[Playfair_Display] text-xl font-semibold mb-2 text-white">
                        {step.title}
                      </h3>
                      <p className="text-gray-400 font-[Manrope] leading-relaxed">
                        {step.description}
                      </p>
                    </motion.div>
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

// ===== OFFER SECTION =====
function OfferSection() {
  const benefits = [
    'Аудит текущих позиций в поиске и на картах',
    'Настройка рекламных кампаний (Директ + ретаргетинг)',
    'Оптимизация карточки на Яндекс Картах',
    'Еженедельная отчётность с конкретными метриками',
  ];

  return (
    <section className="py-24 md:py-32 px-6 relative">
      <div className="section-divider mb-24" />
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
          <AnimatedSection delay={0.1} direction="left">
            <div className="glass-card p-8 md:p-10 h-full">
              <h3 className="font-[Playfair_Display] text-2xl font-semibold mb-6 text-white">
                Что входит:
              </h3>
              <ul className="space-y-4">
                {benefits.map((benefit, index) => (
                  <motion.li 
                    key={index} 
                    className="flex items-start gap-3"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 + index * 0.1 }}
                    whileHover={{ x: 5 }}
                  >
                    <motion.span 
                      className="text-[#D4AF37] text-xl flex-shrink-0 mt-0.5"
                      whileHover={{ scale: 1.3 }}
                    >
                      ✓
                    </motion.span>
                    <span className="text-gray-300 font-[Manrope] leading-relaxed">{benefit}</span>
                  </motion.li>
                ))}
              </ul>
            </div>
          </AnimatedSection>

          {/* Pricing */}
          <AnimatedSection delay={0.2} direction="right">
            <motion.div 
              className="glass-card-strong p-8 md:p-10 h-full glow-gold"
              whileHover={{ scale: 1.01 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <h3 className="font-[Playfair_Display] text-2xl font-semibold mb-6 text-white">
                Инвестиции:
              </h3>
              <div className="space-y-6">
                <motion.div 
                  className="border-b border-[rgba(255,255,255,0.1)] pb-4"
                  whileHover={{ borderColor: 'rgba(212,175,55,0.3)' }}
                >
                  <div className="text-sm text-gray-500 font-[Manrope] mb-1">Стоимость работы</div>
                  <div className="text-2xl md:text-3xl font-bold text-white font-[Playfair_Display]">
                    15 000 – 25 000 ₽
                  </div>
                </motion.div>
                <motion.div 
                  className="border-b border-[rgba(255,255,255,0.1)] pb-4"
                  whileHover={{ borderColor: 'rgba(212,175,55,0.3)' }}
                >
                  <div className="text-sm text-gray-500 font-[Manrope] mb-1">Рекламный бюджет</div>
                  <div className="text-2xl md:text-3xl font-bold text-white font-[Playfair_Display]">
                    от 20 000 ₽
                  </div>
                  <div className="text-sm text-gray-500 mt-1 font-[Manrope]">оплачивается напрямую в Яндекс</div>
                </motion.div>
                <motion.div 
                  className="p-4 rounded-xl bg-[rgba(212,175,55,0.08)] border border-[rgba(212,175,55,0.2)]"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(212,175,55,0.4)' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                >
                  <div className="flex items-start gap-3">
                    <motion.span 
                      className="text-[#D4AF37] text-xl"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                    >
                      🛡️
                    </motion.span>
                    <div>
                      <div className="text-white font-semibold font-[Manrope] mb-1">Гарантия</div>
                      <div className="text-gray-400 text-sm font-[Manrope]">
                        Нет квалифицированных лидов — продолжаем работать бесплатно до достижения KPI.
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

// ===== TRUST SECTION =====
function TrustSection() {
  return (
    <section className="py-24 md:py-32 px-6">
      <div className="section-divider mb-24" />
      <div className="max-w-4xl mx-auto">
        <AnimatedSection className="text-center mb-12">
          <h2 className="font-[Playfair_Display] text-3xl md:text-5xl font-bold mb-4">
            Почему мне можно <span className="gold-text">доверить тест?</span>
          </h2>
        </AnimatedSection>

        <AnimatedSection delay={0.2} direction="scale">
          <motion.div 
            className="glass-card p-8 md:p-12"
            whileHover={{ borderColor: 'rgba(212,175,55,0.3)' }}
          >
            <div className="space-y-6 text-gray-300 font-[Manrope] leading-relaxed text-lg">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                Мой опыт — это работа с локальными бизнес-экосистемами в сферах <span className="text-white font-semibold">Beauty и HoReCa</span> через Яндекс Бизнес.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                Я вижу картину целиком: как реклама в Директе влияет на позиции на картах, как отзывы конвертируют трафик в заявки, как единая система даёт результат, недоступный при точечных улучшениях.
              </motion.p>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
              >
                <span className="text-[#D4AF37] font-semibold">Честно:</span> я открыто говорю, что наращиваю новые кейсы именно в Директе для банкетной ниши. Но именно поэтому вы получаете максимальную вовлечённость, внимание к деталям и работу на результат — а не «ещё один клиент в потоке».
              </motion.p>
              <motion.div 
                className="pt-4 border-t border-[rgba(255,255,255,0.1)]"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
              >
                <p className="text-gray-400 text-base italic">
                  «Я не обещаю золотые горы. Я обещаю прозрачность, системность и работу до результата.»
                </p>
              </motion.div>
            </div>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ===== FINAL CTA SECTION =====
function CTASection() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLAnchorElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setMousePos({ x: x * 0.15, y: y * 0.15 });
  }, []);

  const handleMouseLeave = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <section id="contact" className="py-24 md:py-32 px-6 relative">
      <div className="section-divider mb-24" />
      <div className="absolute inset-0 hero-gradient pointer-events-none" />
      
      {/* Extra floating elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-orb-1 absolute w-[200px] h-[200px] rounded-full bg-[rgba(212,175,55,0.04)] blur-[60px] top-[20%] right-[10%]" />
        <div className="floating-orb-2 absolute w-[150px] h-[150px] rounded-full bg-[rgba(212,175,55,0.03)] blur-[50px] bottom-[30%] left-[5%]" />
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        <AnimatedSection className="text-center">
          <motion.h2 
            className="font-[Playfair_Display] text-3xl md:text-5xl font-bold mb-4"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            Готовы заполнить даты <span className="gold-text">на следующий сезон?</span>
          </motion.h2>
          <motion.p 
            className="text-gray-400 text-lg font-[Manrope] mb-10 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            Давайте проведём быстрый 15-минутный аудит вашей текущей позиции и покажем точки роста.
          </motion.p>

          {/* Magnetic button */}
          <motion.div
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="mb-12 inline-block"
          >
            <motion.a
              ref={buttonRef}
              href="#contact"
              className="gold-button inline-block text-lg"
              animate={{ x: mousePos.x, y: mousePos.y }}
              transition={{ type: 'spring', stiffness: 150, damping: 15, mass: 0.1 }}
              whileTap={{ scale: 0.95 }}
            >
              Записаться на разбор
            </motion.a>
          </motion.div>

          <StaggerContainer className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <motion.div 
                className="glass-card p-6 text-center"
                whileHover={{ scale: 1.05, borderColor: 'rgba(212,175,55,0.4)' }}
              >
                <motion.div 
                  className="text-2xl mb-2"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                >
                  📱
                </motion.div>
                <div className="text-sm text-gray-500 font-[Manrope] mb-1">Телефон</div>
                <a href="tel:+79001234567" className="text-white hover:text-[#D4AF37] transition-colors font-[Manrope]">
                  +7 (900) 123-45-67
                </a>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div 
                className="glass-card p-6 text-center"
                whileHover={{ scale: 1.05, borderColor: 'rgba(212,175,55,0.4)' }}
              >
                <motion.div 
                  className="text-2xl mb-2"
                  whileHover={{ scale: 1.3, rotate: -10 }}
                >
                  ✈️
                </motion.div>
                <div className="text-sm text-gray-500 font-[Manrope] mb-1">Telegram</div>
                <a href="https://t.me/example" className="text-white hover:text-[#D4AF37] transition-colors font-[Manrope]">
                  @marketing_expert
                </a>
              </motion.div>
            </StaggerItem>
            <StaggerItem>
              <motion.div 
                className="glass-card p-6 text-center"
                whileHover={{ scale: 1.05, borderColor: 'rgba(212,175,55,0.4)' }}
              >
                <motion.div 
                  className="text-2xl mb-2"
                  whileHover={{ scale: 1.3, rotate: 10 }}
                >
                  ✉️
                </motion.div>
                <div className="text-sm text-gray-500 font-[Manrope] mb-1">Email</div>
                <a href="mailto:hello@example.ru" className="text-white hover:text-[#D4AF37] transition-colors font-[Manrope]">
                  hello@example.ru
                </a>
              </motion.div>
            </StaggerItem>
          </StaggerContainer>
        </AnimatedSection>
      </div>
    </section>
  );
}

// ===== FOOTER =====
function Footer() {
  return (
    <footer className="py-8 px-6 border-t border-[rgba(255,255,255,0.05)]">
      <div className="max-w-5xl mx-auto text-center">
        <motion.p 
          className="text-gray-600 text-sm font-[Manrope]"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © 2024 Экосистема захвата спроса. Все права защищены.
        </motion.p>
      </div>
    </footer>
  );
}

// ===== MAIN APP =====
export default function App() {
  return (
    <div className="min-h-screen bg-[#050505] text-white overflow-x-hidden">
      <ScrollProgress />
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
