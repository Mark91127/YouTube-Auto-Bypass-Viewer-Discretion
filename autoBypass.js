// ==UserScript==
// @name         YouTube Auto Bypass Viewer Discretion
// @namespace    https://tampermonkey.net/
// @version      1.0
// @description  Automatically clicks YouTube's "I understand and wish to proceed" interstitial.
// @match        https://www.youtube.com/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const BUTTON_TEXT = 'I understand and wish to proceed';

    function normalize(text) {
        return (text || '').replace(/\s+/g, ' ').trim();
    }

    function bypassViewerDiscretion() {
        const dialogs = document.querySelectorAll(
            'yt-player-interstitial-renderer[role="dialog"]'
        );

        for (const dialog of dialogs) {
            const links = dialog.querySelectorAll('a');

            for (const link of links) {
                const text = normalize(link.textContent);

                if (text.includes(BUTTON_TEXT)) {
                    console.log('[YT Auto Bypass] Clicking viewer discretion button');
                    link.click();
                    return true;
                }
            }
        }

        return false;
    }

    // Try immediately
    bypassViewerDiscretion();
})();