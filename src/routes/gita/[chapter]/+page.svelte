<script lang="ts">
    import { page } from "$app/stores";

    $: chapterNumber = $page.params.chapter;
    let mobileOpen = false;

    export let data: {
        chapter: string;
        verses: {
            geeta_id: string;
            chapter_no: string;
            shlok_no: string;
            lyrics: string;
            music?: string;
        }[];
    };

    const { verses } = data;

    let showModal = false;
    let selectedVerse: (typeof data.verses)[number] | null = null;

    const BASE_AUDIO_URL = "http://sanskrit.ie/";

    const openVerse = (verse: (typeof data.verses)[number]) => {
        const fullMusic =
            verse.music && verse.music.startsWith("http")
                ? verse.music
                : verse.music
                  ? BASE_AUDIO_URL + verse.music
                  : undefined;

        selectedVerse = fullMusic ? { ...verse, music: fullMusic } : verse;
        showModal = true; 
    };

    const closeModal = () => {
        showModal = false; 
    };
</script>

<svelte:head>
    <title>Chapter {chapterNumber}</title>
</svelte:head>

<div class="page">
    
    <header class="top-nav">
        <div class="top-nav-inner">
            <nav class="nav-bar">
                <div class="logo">
                    <img src="/images/logo.png" alt="logo" />
                </div>

                <div class="nav-right">
                    <button
                        class="nav-search"
                        type="button"
                        aria-label="Open search"
                    >
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>

                    <a href="#" class="nav-link">AYURVEDA</a>
                    <a href="#" class="nav-link">YOGASŪTRAS</a>
                    <a href="#" class="nav-link">BHAGAVAD GĪTĀ</a>
                    <a href="#" class="nav-link">UPANIṢADS</a>
                    <a href="#" class="nav-link">SANSKRIT</a>
                    <a href="#" class="nav-link">CONTACT US</a>
                </div>

                <!-- hamburger button -->
                <button
                    class="nav-toggle"
                    type="button"
                    aria-label="Toggle navigation"
                    on:click={() => (mobileOpen = !mobileOpen)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
            </nav>

            {#if mobileOpen}
                <div class="mobile-menu">
                    <button
                        class="nav-search mobile-search"
                        type="button"
                        aria-label="Open search"
                    >
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <a href="#" class="mobile-link">AYURVEDA</a>
                    <a href="#" class="mobile-link">YOGASŪTRAS</a>
                    <a href="#" class="mobile-link">BHAGAVAD GĪTĀ</a>
                    <a href="#" class="mobile-link">UPANIṢADS</a>
                    <a href="#" class="mobile-link">SANSKRIT</a>
                    <a href="#" class="mobile-link">CONTACT US</a>
                </div>
            {/if}
        </div>
    </header>

    <section class="gita-hero">
        <div class="gita-hero-overlay">
            <h1 class="gita-title">BHAGAVAD GITA</h1>
        </div>

        <div class="gita-hero-book"></div>
    </section>

    <!-- main beige area with title and cards -->

    <main class="content">
        <button class="back-link" on:click={() => (window.location.href = "/")}>
            &lt; Back
        </button>

        <h2 class="section-title">CHAPTER {chapterNumber}</h2>
        <div class="title-underline"></div>

        <div class="verse-header-line1"></div>
        <div class="verse-header">
            <span>Verse</span>
        </div>
        <div class="verse-header-line"></div>

        <section class="scrolls-grid">

            {#each verses as verse, index}
                <article class="scroll-card">
                    <div class="scroll-inner">
                        <div class="scroll-label">
                            {#if verse.shlok_no === "0"}
                                Whole<br />Chapter
                            {:else if index === verses.length - 1}
                                End of<br />Chapter
                            {:else}
                                {verse.shlok_no}
                            {/if}
                        </div>

                        <button
                            class="scroll-play"
                            on:click={() => openVerse(verse)}
                            aria-label={`Play verse ${verse.shlok_no}`}
                        >
                            <span class="play-icon">▶</span>
                        </button>
                    </div>
                </article>
            {/each}
        </section>
    </main>

    {#if showModal && selectedVerse}
        <div class="modal-backdrop" on:click={closeModal}>
            <div class="modal" on:click|stopPropagation>
                <button class="modal-close" on:click={closeModal}>×</button>

                <h3 class="modal-title">
                    Chapter {chapterNumber}, Verse {selectedVerse.shlok_no}
                </h3>

                <!-- lyrics are HTML from API -->
                <div class="modal-lyrics">
                    {@html selectedVerse.lyrics}
                </div>

                {#if selectedVerse.music}
                    <audio
                        class="modal-audio"
                        controls
                        src={selectedVerse.music}
                    ></audio>
                {/if}
            </div>
        </div>
    {/if}

    <!-- FOOTER -->
    <footer class="footer">
        <div class="connect">Connect</div>
        <div class="social-row">
            <a
                class="circle"
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
                    ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                        fill="#ffffff"
                        d="M240 363.3L240 576L356 576L356 363.3L442.5 363.3L460.5 265.5L356 265.5L356 230.9C356 179.2 376.3 159.4 428.7 159.4C445 159.4 458.1 159.8 465.7 160.6L465.7 71.9C451.4 68 416.4 64 396.2 64C289.3 64 240 114.5 240 223.4L240 265.5L174 265.5L174 363.3L240 363.3z"
                    /></svg
                >
            </a>

            <a
                class="circle"
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
                    ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                        fill="#ffffff"
                        d="M523.4 215.7C523.7 220.2 523.7 224.8 523.7 229.3C523.7 368 418.1 527.9 225.1 527.9C165.6 527.9 110.4 510.7 64 480.8C72.4 481.8 80.6 482.1 89.3 482.1C138.4 482.1 183.5 465.5 219.6 437.3C173.5 436.3 134.8 406.1 121.5 364.5C128 365.5 134.5 366.1 141.3 366.1C150.7 366.1 160.1 364.8 168.9 362.5C120.8 352.8 84.8 310.5 84.8 259.5L84.8 258.2C98.8 266 115 270.9 132.2 271.5C103.9 252.7 85.4 220.5 85.4 184.1C85.4 164.6 90.6 146.7 99.7 131.1C151.4 194.8 229 236.4 316.1 240.9C314.5 233.1 313.5 225 313.5 216.9C313.5 159.1 360.3 112 418.4 112C448.6 112 475.9 124.7 495.1 145.1C518.8 140.6 541.6 131.8 561.7 119.8C553.9 144.2 537.3 164.6 515.6 177.6C536.7 175.3 557.2 169.5 576 161.4C561.7 182.2 543.8 200.7 523.4 215.7z"
                    /></svg
                >
            </a>

            <a
                class="circle"
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
                    ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                        fill="#ffffff"
                        d="M581.7 188.1C575.5 164.4 556.9 145.8 533.4 139.5C490.9 128 320.1 128 320.1 128C320.1 128 149.3 128 106.7 139.5C83.2 145.8 64.7 164.4 58.4 188.1C47 231 47 320.4 47 320.4C47 320.4 47 409.8 58.4 452.7C64.7 476.3 83.2 494.2 106.7 500.5C149.3 512 320.1 512 320.1 512C320.1 512 490.9 512 533.5 500.5C557 494.2 575.5 476.3 581.8 452.7C593.2 409.8 593.2 320.4 593.2 320.4C593.2 320.4 593.2 231 581.8 188.1zM264.2 401.6L264.2 239.2L406.9 320.4L264.2 401.6z"
                    /></svg
                >
            </a>
            <a
                class="circle"
                href="http://www.johnscottus.ie/"
                target="_blank"
                rel="noopener noreferrer"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 640"
                    ><!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.--><path
                        fill="#ffffff"
                        d="M448 96C465.7 96 480 110.3 480 128L480 384C480 472.4 408.4 544 320 544C231.6 544 160 472.4 160 384L160 352C160 334.3 174.3 320 192 320C209.7 320 224 334.3 224 352L224 384C224 437 267 480 320 480C373 480 416 437 416 384L416 128C416 110.3 430.3 96 448 96z"
                    /></svg
                >
            </a>
        </div>

        <div class="footerimg">
            <img src="/images/footerimg.png" alt="" />
        </div>
        <div class="brand">WELLBEING~SVASTI</div>
        <div class="copy">
            © 2025 Rutger Kortenhorst. All Rights Reserved | Design and
            Developed by
            <span class="copy-link"> Burning Desire Inclusive</span>
        </div>
    </footer>
</div>

<style>
    :global(body) {
        margin: 0;
        font-family:
            system-ui,
            -apple-system,
            BlinkMacSystemFont,
            "Segoe UI",
            sans-serif;
        background-image: url("/images/bg.jpg");
    }

    .page {
        min-height: 100vh;
        /* background: linear-gradient(
      #f7f1dc 0,
      #f7f1dc 60%,
      #2c4630 60%,
      #2c4630 100%
    ); */
        display: flex;
        flex-direction: column;
    }

    .top-nav {
        background: #ffffff;
        align-items: center;
        position: sticky;
        top: 0;
        z-index: 30;
        box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04);
    }

    .top-nav-inner {
        /* max-width: 1200px; */
        /* margin: 0 auto; */
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 32px;
        min-height: 65px;
    }

    /* logo left, everything else right */
    .nav-bar {
        display: flex;
        justify-content: space-between;
        /* align-items: center; */
        width: 100%;
    }

    /* left logo */
    .logo img {
        width: 120px;
        height: 40px;
    }

    /* right side: search + links in one row */
    .nav-right {
        display: flex;
        align-items: center;
        gap: 32px;
    }

    /* search icon at start of right group */
    .nav-search {
        border: none;
        background: none;
        cursor: pointer;
        font-size: 20px;
        padding: 0;
    }

    

    /* links */
    .nav-link {
        text-decoration: none;
        color: #222222;
        text-transform: uppercase;
        font-size: 12px;
        letter-spacing: 0.14em;
        position: relative;
        padding-bottom: 2px;
    }

    .nav-link::after {
        content: "";
        position: absolute;
        left: 0;
        bottom: 0;
        width: 0;
        height: 1px;
        background: #222222;
        transition: width 130ms ease-out;
    }

    .nav-link:hover::after {
        width: 100%;
    }

    /* small screens */
    @media (max-width: 800px) {
        .nav-right {
            gap: 14px;
        }

        .nav-link {
            display: none;
        }
    }

    .gita-hero {
        position: relative;
        background-image: url("/images/gita-banner.png"); 
        background-size: cover;
        background-position: center;
        min-height: 300px;
    }

    /* soft light band + title area */
    .gita-hero-overlay {
        padding-top: 40px;
        padding-bottom: 80px;
        background: linear-gradient(
            to bottom,
            rgba(255, 255, 255, 0.9) 0,
            rgba(255, 255, 255, 0.7) 35%,
            rgba(255, 255, 255, 0) 100%
        );
        display: flex;
        justify-content: center;
    }

    .gita-title {
        font-size: 64px;
        letter-spacing: 0.18em;
        text-transform: uppercase;
        color: #2c5a20;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.25);
        margin: 0;
    }

    /* small book image at bottom center */
    .gita-hero-book {
        position: absolute;
        left: 50%;
        bottom: -36px;
        transform: translateX(-50%);
        width: 120px;
        height: 80px;
        background-image: url("/images/gita-book.png"); 
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

    /* responsive title size */
    @media (max-width: 768px) {
        .gita-title {
            font-size: 40px;
            letter-spacing: 0.12em;
        }

        .gita-hero {
            min-height: 220px;
        }

        .gita-hero-book {
            width: 90px;
            height: 60px;
        }
    }

    .footer {
        background: #2c4630; 
        color: #f4f0df;
        padding: 40px 16px 32px;
        text-align: center;
        margin-top: auto;
    }

    /* "Connect" text */

    .footer .connect {
        font-size: 16px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        margin-bottom: 12px;
    }

    /* social icons row */

    .social-row {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-bottom: 24px;
    }

    .circle {
        width: 32px;
        height: 32px;
        border-radius: 999px;
        border: 1px solid #f4f0df;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
    }

    

    /* brand wordmark */

    .brand {
        font-family: "Georgia", "Times New Roman", serif;
        font-size: 26px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        margin-bottom: 10px;
    }

    /* copyright line */

    .copy {
        font-size: 12px;
        margin-top: 4px;
    }

    .copy-link {
        color: #f0c58a;
        text-decoration: none;
        cursor: pointer;
    }

    .copy-link:hover {
        text-decoration: underline;
    }

    /* small screens */

    @media (max-width: 600px) {
        .footer {
            padding: 32px 12px 24px;
        }

        .brand {
            font-size: 20px;
            letter-spacing: 0.12em;
        }

        .copy {
            font-size: 11px;
        }
    }

    .content {
        max-width: 1200px;
        margin: 0 auto;
        padding: 40px 16px 0px;
        position: relative;
        z-index: 5;
    }

    .section-title {
        text-align: center;
        font-size: 18px;
        letter-spacing: 2px;
        color: #b2434e;
        margin-bottom: 6px;
    }

    .title-underline {
        width: 160px;
        height: 2px;
        background: #c8575f;
        margin: 0 auto 32px;
    }

    /* "Connect" text */

    .footer .connect {
        font-size: 16px;
        letter-spacing: 0.14em;
        text-transform: uppercase;
        margin-bottom: 12px;
    }

    /* social icons row */

    .social-row {
        display: flex;
        justify-content: center;
        gap: 12px;
        margin-bottom: 24px;
    }

    .circle {
        width: 32px;
        height: 32px;
        border-radius: 999px;
        border: 1px solid #f4f0df;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
    }

    

    /* brand wordmark */

    .brand {
        font-family: "Georgia", "Times New Roman", serif;
        font-size: 26px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        margin-bottom: 10px;
    }

    /* copyright line */

    .copy {
        font-size: 12px;
        margin-top: 4px;
    }

    .copy-link {
        color: #f0c58a;
        text-decoration: none;
        cursor: pointer;
    }

    .copy-link:hover {
        text-decoration: underline;
    }

    /* small screens */

    @media (max-width: 600px) {
        .footer {
            padding: 32px 12px 24px;
        }

        .brand {
            font-size: 20px;
            letter-spacing: 0.12em;
        }

        .copy {
            font-size: 11px;
        }
    }

    .verse-header-line1 {
        height: 2px;
        background: #c8575f;
        margin-bottom: 0px;
    }

    .verse-header {
        font-size: 14px;
        color: #b2434e;
        margin-bottom: 4px;
    }

    .verse-header-line {
        height: 2px;
        background: #c8575f;
        margin-bottom: 32px;
    }

    .scrolls-grid {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 40px 32px;
        justify-items: center;
    }

    @media (max-width: 900px) {
        .scrolls-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
        }
    }

    @media (max-width: 650px) {
        .scrolls-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
        }
    }

    .scroll-card {
        width: 150px;
        height: 230px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .scroll-inner {
        width: 100%;
        height: 100%;
        background-image: url("/images/scroll-card.png");
        background-size: cover;
        background-position: center;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        position: relative;
    }

    .scroll-label {
        color: #ffffff;
        font-size: 14px;
        margin-bottom: 18px;
    }

    .scroll-play {
        width: 40px;
        height: 40px;
        border-radius: 999px;
        border: 2px solid #ffffff;
        background: rgba(0, 0, 0, 0.35);
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
    }

    .play-icon {
        color: #ffffff;
        font-size: 18px;
        margin-left: 2px;
    }

    
    .modal-backdrop {
        position: fixed;
        inset: 0;
        background: rgba(0, 0, 0, 0.55);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 50;
    }

    .modal {
        width: min(640px, 90vw);
        max-height: 80vh;
        background: #ffe2c5;
        border-radius: 24px;
        padding: 24px 24px 16px;
        box-shadow: 0 10px 40px rgba(0, 0, 0, 0.35);
        overflow-y: auto;
        position: relative;
    }

    .modal-close {
        position: absolute;
        top: 12px;
        right: 16px;
        border: none;
        background: none;
        font-size: 24px;
        cursor: pointer;
    }

    .modal-title {
        text-align: center;
        margin-top: 8px;
        margin-bottom: 16px;
        font-size: 18px;
        letter-spacing: 0.16em;
        text-transform: uppercase;
        color: #b2434e;
    }

    .modal-lyrics {
        font-size: 14px;
        line-height: 1.6;
        color: #333333;
    }

    

    .modal-audio {
        width: 100%;
        margin-top: 12px;
    }
    .back-link {
        border: none;
        background: none;
        color: #b2434e;
        font-size: 13px;
        cursor: pointer;
        text-decoration: underline;
        text-underline-offset: 3px;
        margin-bottom: 12px;
        padding: 0;
    }
    .nav-search i {
        color: #000000;
        font-size: 20px;
    }
    /* default = desktop: hide hamburger */
    .nav-toggle {
        display: none;
        width: 44px;
        height: 32px;
        border-radius: 6px;
        border: 2px solid #000;
        background: #fff;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        padding: 4px 0;
        cursor: pointer;
    }

    .nav-toggle span {
        width: 18px;
        height: 2px;
        background: #000;
        border-radius: 999px;
        margin: 2px 0;
    }

    
    .mobile-menu {
        display: none;
    }

    /* breakpoint: when width <= 800px */
    @media (max-width: 800px) {
        .top-nav-inner {
            padding: 0 16px;
            flex-direction: column;
            align-items: stretch;
        }

        .nav-bar {
            width: 100%;
            align-items: center;
        }

        /* hide inline right nav, show hamburger */
        .nav-right {
            display: none;
        }

        .nav-toggle {
            display: inline-flex;
        }

        /* dropdown panel styling */
        .mobile-menu {
            width: 100%;
            background: #ffffff;
            border-top: 1px solid rgba(0, 0, 0, 0.06);
            padding: 16px 0 20px;
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 10px;
        }

        .mobile-search {
            margin-bottom: 6px;
        }

        .mobile-search i {
            font-size: 22px;
            color: #000;
        }

        .mobile-link {
            text-decoration: none;
            color: #222222;
            text-transform: uppercase;
            font-size: 11px;
            letter-spacing: 0.16em;
        }

        .mobile-link:hover {
            text-decoration: underline;
        }
    }
</style>
