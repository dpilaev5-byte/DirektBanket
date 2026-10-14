# 🎯 Экосистема захвата спроса - Лендинг для банкетных залов

Премиум одностраничный сайт для digital-агентства, специализирующегося на продвижении банкетных залов и ресторанов через Яндекс Директ и Яндекс Карты.

## 🚀 Технологии

- **React 18** + **TypeScript**
- **Vite** - сборщик
- **Tailwind CSS** - стилизация
- **Framer Motion** - анимации
- **Google Fonts** - Playfair Display, Inter, Manrope

## ✨ Особенности

- Премиум темный дизайн с золотыми акцентами (#D4AF37)
- Glassmorphism эффекты
- Плавные scroll-анимации
- Параллакс эффекты
- Анимированные счетчики
- Полностью адаптивный дизайн
- Оптимизирован для производительности

## 📦 Деплой на Netlify

### Способ 1: Через Netlify CLI (рекомендуется)

1. Установите Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Войдите в аккаунт:
   ```bash
   netlify login
   ```

3. Задеплойте проект:
   ```bash
   netlify deploy --prod
   ```

### Способ 2: Через GitHub интеграцию

1. Загрузите код в GitHub репозиторий
2. Перейдите на [app.netlify.com](https://app.netlify.com)
3. Нажмите "New site from Git"
4. Выберите ваш репозиторий
5. Настройки деплоя:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - **Node version:** 18
6. Нажмите "Deploy site"

### Способ 3: Drag & Drop

1. Соберите проект локально:
   ```bash
   npm run build
   ```

2. Перетащите папку `dist` на [app.netlify.com/drop](https://app.netlify.com/drop)

## 🛠️ Локальная разработка

```bash
# Установка зависимостей
npm install

# Запуск dev сервера
npm run dev

# Сборка для продакшена
npm run build

# Предпросмотр продакшен сборки
npm run preview
```

## 📁 Структура проекта

```
├── public/              # Статические файлы
│   └── _redirects      # Netlify redirects
├── src/
│   ├── App.tsx         # Главный компонент
│   ├── index.css       # Глобальные стили
│   └── main.tsx        # Точка входа
├── index.html          # HTML шаблон
├── netlify.toml        # Конфигурация Netlify
├── package.json
└── vite.config.js
```

## 🎨 Кастомизация

### Изменение цветов

Отредактируйте `src/index.css`:

```css
@theme {
  --color-gold: #D4AF37;        /* Основной золотой */
  --color-gold-light: #F4D03F;  /* Светлый золотой */
  --color-gold-dark: #B8860B;   /* Темный золотой */
  --color-dark: #050505;        /* Основной фон */
}
```

### Изменение текстов

Все тексты находятся в `src/App.tsx` в соответствующих секциях.

## 📱 Адаптивность

Сайт полностью адаптивен:
- Mobile: 320px+
- Tablet: 768px+
- Desktop: 1024px+
- Large Desktop: 1280px+

## ⚡ Производительность

- Оптимизированные шрифты с preconnect
- Lazy loading для анимаций
- Минимальный bundle size
- Оптимизированные CSS анимации
- Кэширование статических ресурсов

## 📄 Лицензия

MIT

---

Создано с ❤️ для банкетных залов и ресторанов
