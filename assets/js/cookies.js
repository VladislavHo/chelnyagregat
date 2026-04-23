// Функция для создания и управления cookie баннером
function createCookieBanner() {
    // Проверяем, существует ли уже такой баннер или были ли куки сохранены
    if (document.cookie.split(';').some((item) => item.trim().startsWith('cookieAccepted='))) {
        return;
    }

    // Создаем HTML элементы для баннера
    const banner = document.createElement('div');
    banner.id = 'cookie-banner';
    banner.innerHTML = `
        <div class="cookie-content">
            <p class="cookie-description">Мы используем Яндекс.Метрику и файлы идентификации пользователей (cookies). Продолжая просмотр сайта или нажимая кнопку «Принять», вы даёте <a href="./assets/docs/3. Согласие на использование файлов идентификации пользователей (cookies).pdf" target="_blank">согласие на обработку</a></p>
            <button class="cookie-accept-btn" id="cookie-accept">Принять</button>
        </div>
    `;

    // Добавляем стили для баннера
    const style = document.createElement('style');
    style.id = 'cookie-banner-styles';
    style.textContent = `
        #cookie-banner {
            position: fixed;
            bottom: 10px;
            left: 20px;
            right: 20px;
            max-width: 1350px;
            margin: 0 auto;
            background-color: #fff;
            border: 1px solid #ddd;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            z-index: 10000;
            font-family: Arial, sans-serif;
            padding: 10px;
            
        }
        
        .cookie-content {
            width: 100%;
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            gap: 20px;
        }
        
        .cookie-title {
            margin-top: 0;
            margin-bottom: 10px;
            color: #333;
            font-size: 18px;
        }
        
        .cookie-description {
            color: #666;
            font-size: 14px;

        }
        
        .cookie-accept-btn {
            background-color: #007cba;
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 14px;
            display: inline-block;
        }
        
        .cookie-accept-btn:hover {
            background-color: #005a87;
        }
        
        .cookie-close {
            position: absolute;
            top: 5px;
            right: 15px;
            font-size: 24px;
            font-weight: bold;
            color: #aaa;
            cursor: pointer;
            z-index: 10001;
        }
        
        .cookie-close:hover {
            color: #333;
        }
        
        @media (max-width: 768px) {
          .cookie-content {
            align-items: flex-start;
            flex-direction: column;
            gap: 5px;
          }
        .cookie-description {
            color: #666;
            font-size: 10px;

            }
        .cookie-accept-btn {
            background-color: #007cba;
            color: white;
            border: none;
            padding: 5px 10px;
            border-radius: 2px;
            cursor: pointer;
            font-size: 10px;
            display: inline-block;
        }
        }
        @media (max-width: 600px) {
            #cookie-banner {
                left: 10px;
                right: 10px;
            }
        }
    `;
    
    // Добавляем стили на страницу
    document.head.appendChild(style);
    
    // Добавляем баннер на страницу
    document.body.appendChild(banner);

    // Обработчики событий
    document.getElementById('cookie-accept').addEventListener('click', acceptCookies);
    document.getElementById('cookie-close').addEventListener('click', closeBanner);
}

// Функция для установки cookie при согласии
function acceptCookies() {
    // Устанавливаем cookie на 30 дней
    const date = new Date();
    date.setTime(date.getTime() + (30 * 24 * 60 * 60 * 1000));
    document.cookie = "cookieAccepted=true; expires=" + date.toUTCString() + "; path=/";
    
    // Удаляем баннер после принятия
    removeBanner();
}

// Функция для закрытия баннера без согласия
function closeBanner() {
    removeBanner();
}

// Функция для удаления баннера со страницы
function removeBanner() {
    const banner = document.getElementById('cookie-banner');
    const styles = document.getElementById('cookie-banner-styles');
    
    if (banner) {
        banner.style.display = 'none';
    }
    
    if (styles) {
        styles.remove();
    }
}

// Запускаем функцию создания баннера когда DOM готов
document.addEventListener('DOMContentLoaded', createCookieBanner);