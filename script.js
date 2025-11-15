document.addEventListener('DOMContentLoaded', function() {
    
    // --- KÓD PRE POPUP ZAČIATOK ---
    const popupOverlay = document.getElementById('popup-overlay');
    const popupCloseBtn = document.getElementById('popup-close');
    
    // Nájde VŠETKY tlačidlá (okrem tých v pop-upe), ktoré scrollujú na kontakt
    // a priradí im zatvorenie pop-upu, ak by bol náhodou otvorený.
    const contactScrollButtons = document.querySelectorAll('[data-scroll-to="contact"]');

    let popupVisible = false; // Sledovanie stavu

    const openPopup = () => {
        if (popupVisible || !popupOverlay) return;
        popupVisible = true;
        
        popupOverlay.style.display = 'flex'; // Vynútené zobrazenie pred animáciou
        popupOverlay.classList.add('popup-show');
        popupOverlay.classList.remove('popup-hide');
    };

    const closePopup = () => {
        if (!popupVisible || !popupOverlay) return;
        popupVisible = false;
        
        popupOverlay.classList.remove('popup-show');
        popupOverlay.classList.add('popup-hide');
        
        // Po skončení animácie (300ms) skryjeme overlay úplne
        setTimeout(() => {
            if (!popupVisible) { 
                popupOverlay.style.display = 'none';
            }
        }, 300); 
    };
    
    // Zobraziť popup po 2 sekundách (2000ms)
    setTimeout(openPopup, 2000);

    // Priradenie udalostí
    if (popupCloseBtn) popupCloseBtn.addEventListener('click', closePopup);
    
    // Pridáme zatvorenie pre VŠETKY contact-scroll tlačidlá
    contactScrollButtons.forEach(btn => {
        btn.addEventListener('click', closePopup);
    });
    
    // Kód pre zatvorenie kliknutím na pozadie (overlay)
    if (popupOverlay) {
        popupOverlay.addEventListener('click', function(event) {
            if (event.target === popupOverlay) {
                closePopup();
            }
        });
    }
    // --- KÓD PRE POPUP KONIEC ---


    // --- KÓD PRE FAQ SEKCIA ---
    const faqOtazky = document.querySelectorAll('.faq-otazka');

    faqOtazky.forEach(otazka => {
      otazka.addEventListener('click', () => {
        const faqItem = otazka.closest('.faq-item'); // Nájdeme rodičovský .faq-item
        faqItem.classList.toggle('aktivni');
        
        // Bonus: Zavrie ostatné otvorené otázky
        faqOtazky.forEach(ostatnaOtazka => {
            const ostatnyItem = ostatnaOtazka.closest('.faq-item');
            if (ostatnyItem !== faqItem && ostatnyItem.classList.contains('aktivni')) {
                ostatnyItem.classList.remove('aktivni');
            }
        });

      });
    });
    // --- KÓD PRE FAQ KONIEC ---


    // --- Plynulé scrollovanie ---
    const scrollButtons = document.querySelectorAll('[data-scroll-to]');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileMenuButton = document.getElementById('mobile-menu-button');

    scrollButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('data-scroll-to');
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const headerOffset = document.querySelector('header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
                
                // Ak je mobilné menu otvorené, zatvoríme ho
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }
            }
        });
    });
    // --- SCROLLOVANIE KONIEC ---

    
    // --- Funkcionalita pre mobilné menu ---
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }
    // --- MOBILNÉ MENU KONIEC ---
    
});