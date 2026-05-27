import { useState, useEffect } from "react";

const PHASES = [
  {
    id: "legal", phase: "01", label: "Statut juridique", emoji: "⚖️",
    color: "#6366F1", light: "#EEF2FF", border: "#C7D2FE",
    steps: [
      {
        id: "statut", label: "Choisir le statut", sub: "AE, SASU, EURL",
        instructions: "En France, toute activité commerciale régulière exige un statut juridique avant le premier euro encaissé.\n\n**Auto-entrepreneur (AE)** : simple, rapide, plafond de CA à 188 700 €/an pour la vente. Idéal pour tester.\n\n**SASU** : société par actions, protection du patrimoine personnel, pas de plafond de CA. Recommandé dès que tu génères plus de 3 000 €/mois.\n\n**EURL** : équivalent SASU mais avec un gérant associé unique, fiscalité IS ou IR au choix.",
        links: [{ label: "Créer son AE — INPI officiel", url: "https://www.inpi.fr/guichet-entreprises" }, { label: "Comparer les statuts — Bpifrance", url: "https://bpifrance-creation.fr/encyclopedie/structures-juridiques/tableau-comparatif-des-statuts" }],
        tools: ["INPI Guichet Entreprises", "Legalstart", "Dougs"],
        checklist: [
          { task: "Comparer AE / SASU / EURL selon CA prévisionnel", time: "2h" },
          { task: "Créer le compte sur guichet-entreprises.fr", time: "30min" },
          { task: "Obtenir le SIRET (délai : 1-5 jours)", time: "5min" },
          { task: "Ouvrir un compte bancaire pro", time: "45min" }
        ]
      },
      {
        id: "siret", label: "Immatriculation", sub: "SIRET + INPI",
        instructions: "Depuis janvier 2023, toutes les immatriculations passent par le Guichet Unique de l'INPI.\n\n**Auto-entrepreneur** : déclaration en ligne, délai 1 à 5 jours, gratuit.\n\n**Société (SASU/EURL)** : dépôt de capital, statuts rédigés, publication au BODACC, délai 7-15 jours, coût ~250-400€.",
        links: [{ label: "Guichet Unique INPI", url: "https://www.inpi.fr/guichet-entreprises" }, { label: "Vérifier son SIRET — Sirene INSEE", url: "https://www.sirene.fr" }],
        tools: ["guichet-entreprises.fr", "BODACC"],
        checklist: [
          { task: "Se connecter sur guichet-entreprises.fr", time: "10min" },
          { task: "Remplir le formulaire P0 (AE) ou M0 (société)", time: "1h" },
          { task: "Recevoir le certificat SIREN/SIRET", time: "attente 1-5j" },
          { task: "Vérifier l'inscription sur Sirene.fr", time: "5min" }
        ]
      },
      {
        id: "banque", label: "Compte bancaire pro", sub: "Séparé du perso",
        instructions: "En auto-entrepreneur, un compte dédié est obligatoire au-delà de 10 000 € de CA annuel. Pour une société, le compte pro est obligatoire dès la création.\n\n**Options recommandées :**\n• Shine (9€/mois) — interface adaptée aux e-commerçants\n• Qonto (9€/mois) — robuste pour les sociétés\n• Revolut Business (0€ starter) — pratique pour les paiements multi-devises",
        links: [{ label: "Shine", url: "https://www.shine.fr" }, { label: "Qonto", url: "https://qonto.com/fr" }],
        tools: ["Shine", "Qonto", "Revolut Business", "Blank"],
        checklist: [
          { task: "Ouvrir un compte séparé du perso", time: "45min" },
          { task: "Connecter le compte à Shopify Payments", time: "20min" },
          { task: "Paramétrer les virements automatiques", time: "15min" },
          { task: "Activer les notifications de paiement", time: "5min" }
        ]
      }
    ]
  },
  {
    id: "produit", phase: "02", label: "Recherche produit", emoji: "🔍",
    color: "#8B5CF6", light: "#F5F3FF", border: "#DDD6FE",
    steps: [
      {
        id: "demande", label: "Analyse demande", sub: "Trends, Amazon",
        instructions: "Un bon produit dropshipping avec avatars IA doit réunir 3 critères :\n\n**1. Démonstrable en 30 secondes** : l'avatar doit montrer un bénéfice visible.\n\n**2. En tendance ou evergreen** : vérifier Google Trends sur 12 mois. Une courbe qui monte = opportunité.\n\n**3. Prix de vente 3-5x le prix fournisseur** : marge suffisante sans pub payée.\n\nOutils : Google Trends (gratuit), Amazon Best Sellers, TikTok Creative Center (gratuit), Minea (49$/mois).",
        links: [{ label: "Google Trends", url: "https://trends.google.fr" }, { label: "Amazon Best Sellers", url: "https://www.amazon.fr/Best-Sellers/zgbs" }, { label: "TikTok Creative Center", url: "https://ads.tiktok.com/business/creativecenter/inspiration/popular/hashtag/pc/fr" }],
        tools: ["Google Trends", "Amazon BSR", "TikTok Creative Center", "Minea", "Dropispy"],
        checklist: [
          { task: "Lister 10 produits candidats", time: "3h" },
          { task: "Vérifier la tendance Google Trends (12 mois)", time: "1h" },
          { task: "Calculer la marge brute", time: "1h" },
          { task: "Éliminer les produits non filmables par avatar", time: "30min" },
          { task: "Choisir le produit final", time: "30min" }
        ]
      },
      {
        id: "marges", label: "Calcul des marges", sub: "Prix, frais, 0 ads",
        instructions: "Sans pub payée, ta structure de coûts est plus légère.\n\n**Exemple concret :**\n• Prix fournisseur AliExpress : 8€\n• Livraison : 3€\n• Frais Shopify Basic : ~2%\n• Frais Stripe/Shopify Payments : 1.5-2%\n• Retours estimés : 5-10% du CA\n• **Prix de vente minimum viable : 38-42€**\n\nSans ads, le coût d'acquisition = 0 mais le volume est plus lent. Les marges doivent être plus élevées.",
        links: [{ label: "Tarifs Shopify", url: "https://www.shopify.com/fr/tarifs" }, { label: "Frais Stripe", url: "https://stripe.com/fr/pricing" }],
        tools: ["Google Sheets", "Shopify Profit Margin Calculator"],
        checklist: [
          { task: "Calculer le prix fournisseur tout inclus", time: "30min" },
          { task: "Ajouter les frais Shopify et paiement", time: "20min" },
          { task: "Provisionner 8% pour les retours", time: "15min" },
          { task: "Vérifier la compétitivité vs Amazon", time: "30min" }
        ]
      },
      {
        id: "filmable", label: "Produit filmable IA", sub: "Visuel, démo facile",
        instructions: "**Bon produit pour avatar IA :**\n• Gadget avec effet visuel fort\n• Accessoire beauté avec résultat avant/après\n• Outil de cuisine avec démonstration simple\n• Produit avec témoignage\n\n**Mauvais produit pour avatar IA :**\n• Vêtement (nécessite de le porter)\n• Produit nécessitant manipulation précise\n• Produit sans bénéfice visible immédiat\n\nLa vidéo B-roll (images réelles du produit) doit être filmée depuis l'échantillon reçu.",
        links: [{ label: "HeyGen — avatars IA", url: "https://www.heygen.com" }],
        tools: ["HeyGen", "Synthesia", "D-ID", "CapCut"],
        checklist: [
          { task: "Vérifier que le produit est démontrable sans contact avatar", time: "30min" },
          { task: "Filmer 2-3 min de B-roll de l'échantillon", time: "1h" },
          { task: "Préparer 3 angles de démonstration", time: "45min" },
          { task: "Valider que le bénéfice est visible en moins de 5 secondes", time: "20min" }
        ]
      }
    ]
  },
  {
    id: "fournisseur", phase: "03", label: "Fournisseur", emoji: "📦",
    color: "#0EA5E9", light: "#F0F9FF", border: "#BAE6FD",
    steps: [
      {
        id: "choix", label: "Choix fournisseur", sub: "AliEx, CJ, Zendrop",
        instructions: "**AliExpress**\n• Pour : énorme catalogue, 0 abonnement\n• Contre : délais 15-45j, qualité variable\n• Utiliser avec : DSers\n\n**CJ Dropshipping**\n• Pour : entrepôts Europe/USA, délais 7-15j, branding personnalisé\n• Utiliser avec : app CJ officielle Shopify\n\n**Zendrop**\n• Pour : délais 5-10j USA, interface propre\n• Contre : abonnement 49$/mois Pro",
        links: [{ label: "CJ Dropshipping", url: "https://cjdropshipping.com" }, { label: "DSers", url: "https://www.dsers.com" }, { label: "Zendrop", url: "https://zendrop.com" }],
        tools: ["CJ Dropshipping", "DSers", "Zendrop", "AutoDS"],
        checklist: [
          { task: "Comparer les délais pour la France/Europe", time: "1h" },
          { task: "Vérifier la disponibilité produit sur CJ et AliExpress", time: "45min" },
          { task: "Tester la réactivité du support", time: "30min" },
          { task: "Choisir fournisseur principal + 1 backup", time: "30min" }
        ]
      },
      {
        id: "echantillon", label: "Echantillon produit", sub: "Filmer pour avatars",
        instructions: "Commander l'échantillon est OBLIGATOIRE. Deux raisons :\n\n**1. Qualité réelle** : les photos AliExpress sont souvent trompeuses.\n\n**2. Contenu vidéo** : tu as besoin de vraies images/vidéos du produit comme B-roll pour tes vidéos avatar IA.\n\n**Protocole filmage :**\n• Filmer sur fond blanc et fond naturel\n• Capturer 3-5 angles différents\n• Filmer une démonstration d'utilisation\n• Durée totale visée : 3-5 minutes de rushes bruts",
        links: [{ label: "CapCut Web", url: "https://www.capcut.com" }],
        tools: ["iPhone", "CapCut", "Fond blanc ou tissu uni"],
        checklist: [
          { task: "Commander l'échantillon", time: "20min" },
          { task: "Réceptionner et tester le produit", time: "1h" },
          { task: "Filmer 3-5 min de B-roll qualité", time: "2h" },
          { task: "Classer les rushes par angle", time: "30min" },
          { task: "Valider la qualité pour la vente", time: "30min" }
        ]
      },
      {
        id: "retours-four", label: "Accord retours", sub: "Par écrit",
        instructions: "En France, la loi impose un délai de rétractation de **14 jours** pour tout achat en ligne (Art. L221-18 Code de la Consommation). C'est toi qui es responsable vis-à-vis du client.\n\nIl faut définir par écrit avec le fournisseur :\n• Qui prend en charge le retour défectueux ?\n• Délai de remboursement ou renvoi ?\n• Seuil minimum pour justifier un retour physique\n• Option 'remboursement sans retour' pour petits montants",
        links: [{ label: "Politique retours CJ Dropshipping", url: "https://cjdropshipping.com/blog/cj-dispute-policy.html" }, { label: "Art. L221-18 — droit de rétractation", url: "https://www.legifrance.gouv.fr/codes/article_lc/LEGIARTI000032226842" }],
        tools: ["Template politique de retour Shopify"],
        checklist: [
          { task: "Négocier les conditions de retour avec le fournisseur", time: "1h" },
          { task: "Rédiger la politique de retour sur Shopify (14j obligatoire)", time: "45min" },
          { task: "Définir le seuil remboursement sans retour physique", time: "20min" },
          { task: "Tester le process de dispute CJ/AliExpress", time: "30min" }
        ]
      }
    ]
  },
  {
    id: "boutique", phase: "04", label: "Boutique Shopify + SEO", emoji: "🏪",
    color: "#10B981", light: "#ECFDF5", border: "#A7F3D0",
    steps: [
      {
        id: "shopify-setup", label: "Compte Shopify", sub: "Plan, domaine, taxes",
        instructions: "**Plan recommandé : Basic (32€/mois)**\nInclut : 2 comptes staff, Shopify Payments, frais transaction 0% avec Shopify Payments.\n\n**Domaine** : acheter via Shopify (15-20€/an) ou OVH/Namecheap. Éviter le .myshopify.com en production.\n\n**Taxes France :**\n• En AE sans TVA : cocher 'Prix TTC' + mention légale art. 293 B CGI\n• En société avec TVA : configurer les taux dans Paramètres > Taxes\n\n**Shopify Payments** : disponible en France, paiement en 3 jours ouvrés.",
        links: [{ label: "Tarifs Shopify officiels", url: "https://www.shopify.com/fr/tarifs" }, { label: "Configurer les taxes France", url: "https://help.shopify.com/fr/manual/taxes/eu/france" }, { label: "Shopify Payments France", url: "https://help.shopify.com/fr/manual/payments/shopify-payments/shopify-payments-france" }],
        tools: ["Shopify Basic", "OVH (domaine)", "Shopify Payments"],
        checklist: [
          { task: "S'inscrire sur Shopify (essai 3 jours gratuit)", time: "10min" },
          { task: "Choisir le plan Basic", time: "5min" },
          { task: "Acheter et connecter le domaine", time: "30min" },
          { task: "Activer Shopify Payments", time: "30min" },
          { task: "Configurer les taxes France", time: "45min" },
          { task: "Remplir les informations légales", time: "30min" }
        ]
      },
      {
        id: "fiches-seo", label: "Fiches produits SEO", sub: "Titre, meta, images",
        instructions: "**Règles SEO pour fiches produits :**\n• Titre : 50-60 caractères, mot-clé principal en premier\n• Description : 150-300 mots minimum, mot-clé dans les 100 premiers mots\n• Alt text images : décrire l'image avec le mot-clé\n• URL : courte, en minuscules, tirets\n\n**Problème spécifique Shopify :** un produit dans plusieurs collections génère 2 URLs. Shopify ajoute automatiquement une balise canonical — vérifier qu'elle pointe vers /products/.",
        links: [{ label: "Guide SEO Shopify officiel", url: "https://help.shopify.com/fr/manual/promoting-marketing/seo" }, { label: "Shopify SEO blog 2026", url: "https://www.shopify.com/blog/shopify-seo" }],
        tools: ["Shopify SEO (natif)", "Plug In SEO", "Google Search Console"],
        checklist: [
          { task: "Rédiger un titre SEO optimisé (50-60 car.)", time: "20min" },
          { task: "Écrire une description 200+ mots", time: "1h" },
          { task: "Ajouter alt text sur toutes les images", time: "30min" },
          { task: "Vérifier l'URL produit (courte, lisible)", time: "10min" },
          { task: "Configurer la meta description", time: "15min" }
        ]
      },
      {
        id: "gsc-setup", label: "Google Search Console", sub: "Sitemap, indexation",
        instructions: "**Setup en 4 étapes :**\n1. Créer un compte sur search.google.com/search-console\n2. Ajouter ta propriété (Préfixe URL)\n3. Vérifier via meta tag dans theme.liquid du thème Shopify\n4. Soumettre le sitemap : ton-domaine.com/sitemap.xml\n\nShopify génère automatiquement le sitemap.xml et le met à jour à chaque nouveau produit.",
        links: [{ label: "Google Search Console", url: "https://search.google.com/search-console" }, { label: "Vérifier site Shopify dans GSC", url: "https://help.shopify.com/fr/manual/promoting-marketing/seo/adding-site-to-google" }],
        tools: ["Google Search Console (gratuit)", "Google Analytics 4 (gratuit)"],
        checklist: [
          { task: "Créer compte Google Search Console", time: "15min" },
          { task: "Vérifier la propriété du domaine", time: "20min" },
          { task: "Soumettre le sitemap.xml", time: "10min" },
          { task: "Installer Google Analytics 4", time: "30min" },
          { task: "Vérifier les erreurs d'indexation après 48h", time: "20min" }
        ]
      },
      {
        id: "legal-pages", label: "Pages légales + RGPD", sub: "CGV, retours 14j",
        instructions: "**Pages obligatoires en France :**\n1. Mentions légales : nom, SIRET, adresse, contact, hébergeur\n2. CGV : conditions de vente, délai livraison, droit de rétractation 14j\n3. Politique de retour : procédure explicite\n4. Politique de confidentialité : données collectées, droits RGPD\n5. Bandeau cookies : consentement avant tout tracking\n\nShopify propose des templates en français dans Paramètres > Politiques.",
        links: [{ label: "Générateur politiques Shopify", url: "https://help.shopify.com/fr/manual/checkout-settings/refund-privacy-tos" }, { label: "RGPD e-commerce — CNIL", url: "https://www.cnil.fr/fr/commerce-electronique-et-rgpd" }],
        tools: ["Shopify Policies Generator", "Cookiebot", "Iubenda"],
        checklist: [
          { task: "Rédiger les mentions légales", time: "1h30" },
          { task: "Générer et adapter les CGV Shopify", time: "1h" },
          { task: "Configurer la politique de retour (14j minimum)", time: "30min" },
          { task: "Installer un bandeau cookies RGPD", time: "45min" },
          { task: "Ajouter toutes les pages dans le footer", time: "20min" }
        ]
      }
    ]
  },
  {
    id: "paiement", phase: "05", label: "Paiement & Automatisation", emoji: "⚡",
    color: "#F59E0B", light: "#FFFBEB", border: "#FDE68A",
    steps: [
      {
        id: "paiement-setup", label: "Paiement en ligne", sub: "Stripe, PayPal",
        instructions: "**Shopify Payments (recommandé)**\n• Frais : 1.5% + 0.25€ par transaction\n• Paiement en 3 jours ouvrés\n• Compatible Visa, Mastercard, Apple Pay, Google Pay\n• Nécessite une vérification d'identité (KYC)\n\n**Stripe (alternative)**\n• +0.5% frais de transaction Shopify en plus\n\n**PayPal**\n• Toujours ajouter : certains clients refusent de payer sans\n• Frais : 2.99%\n• Risque de gel si trop de litiges",
        links: [{ label: "Shopify Payments France", url: "https://help.shopify.com/fr/manual/payments/shopify-payments" }, { label: "Tarifs Stripe Europe", url: "https://stripe.com/fr/pricing" }],
        tools: ["Shopify Payments", "Stripe", "PayPal Business"],
        checklist: [
          { task: "Activer Shopify Payments (vérification KYC)", time: "1h" },
          { task: "Ajouter PayPal comme option secondaire", time: "30min" },
          { task: "Tester un paiement de bout en bout", time: "20min" },
          { task: "Configurer les notifications de paiement", time: "15min" }
        ]
      },
      {
        id: "apps-drop", label: "App dropshipping", sub: "DSers, AutoDS, CJ",
        instructions: "**DSers (recommandé pour AliExpress)**\n• Gratuit jusqu'à 3 000 commandes/mois\n• Transmission automatique commande à AliExpress\n• Suivi tracking automatique\n\n**App CJ Dropshipping**\n• Si tu utilises CJ comme fournisseur\n• Gratuit, synchronisation en temps réel\n\n**AutoDS (multi-fournisseurs)**\n• 24.90$/mois, supporte AliExpress, CJ, Amazon\n• Repricing automatique",
        links: [{ label: "DSers sur App Store Shopify", url: "https://apps.shopify.com/dsers" }, { label: "CJ Dropshipping App", url: "https://apps.shopify.com/cjdropshipping" }],
        tools: ["DSers", "CJ App", "AutoDS"],
        checklist: [
          { task: "Installer l'app dropshipping", time: "20min" },
          { task: "Importer le produit depuis le fournisseur", time: "30min" },
          { task: "Configurer la transmission automatique", time: "45min" },
          { task: "Tester une commande fictive bout en bout", time: "1h" },
          { task: "Vérifier que le tracking est bien transmis", time: "20min" }
        ]
      },
      {
        id: "emails-auto", label: "Emails automatiques", sub: "Confirmation, suivi",
        instructions: "Personnaliser TOUS les templates dans Paramètres > Notifications :\n\n• **Confirmation de commande** : ajouter délai de livraison réaliste\n• **Email d'expédition** : inclure le lien de tracking\n• **Email de remboursement** : personnaliser pour rassurer\n\n**Séquence email recommandée :**\n1. Confirmation immédiate\n2. J+2 : email 'en préparation'\n3. J+X expédition : tracking\n4. J+livraison+3 : demande d'avis",
        links: [{ label: "Personnaliser notifications Shopify", url: "https://help.shopify.com/fr/manual/sell-online/notifications/edit-template" }],
        tools: ["Shopify Email (gratuit jusqu'à 10 000/mois)", "Klaviyo"],
        checklist: [
          { task: "Personnaliser l'email de confirmation", time: "45min" },
          { task: "Vérifier l'email d'expédition avec tracking", time: "20min" },
          { task: "Créer l'email J+2 'en préparation'", time: "30min" },
          { task: "Configurer l'email de demande d'avis", time: "30min" }
        ]
      }
    ]
  },
  {
    id: "avatars", phase: "06", label: "Avatars IA — Organique", emoji: "🎬",
    color: "#EC4899", light: "#FDF2F8", border: "#FBCFE8",
    highlight: true,
    steps: [
      {
        id: "avatar-creation", label: "Création avatar IA", sub: "HeyGen, Synthesia",
        instructions: "**HeyGen (recommandé)**\n• Plan Creator : 29$/mois, 15 min vidéo/mois\n• Avatars pré-faits + créer son propre avatar\n• Qualité lip-sync très bonne, voix naturelles\n• Export en 1080p\n\n**Synthesia**\n• Plan Starter : 22$/mois, 10 min/mois\n• 160+ avatars disponibles\n• Interface simple, idéal pour débuter\n\n**Workflow :**\n1. Choisir l'avatar (look qui correspond à ta cible)\n2. Coller le script\n3. Choisir la voix française\n4. Générer (5-10 min)\n5. Télécharger + monter avec B-roll dans CapCut",
        links: [{ label: "HeyGen", url: "https://www.heygen.com" }, { label: "Synthesia", url: "https://www.synthesia.io" }, { label: "D-ID", url: "https://www.d-id.com" }],
        tools: ["HeyGen", "Synthesia", "D-ID", "CapCut"],
        checklist: [
          { task: "Créer un compte HeyGen ou Synthesia", time: "15min" },
          { task: "Choisir un avatar adapté à ta cible", time: "30min" },
          { task: "Générer une vidéo test de 30 secondes", time: "45min" },
          { task: "Vérifier la qualité lip-sync et voix", time: "20min" },
          { task: "Monter avec le B-roll produit", time: "1h30" }
        ]
      },
      {
        id: "script-prod", label: "Script produit", sub: "IA (Claude, GPT)",
        instructions: "**Structure en 4 parties (30-60 secondes) :**\n\n1. **Hook (0-3s)** : question ou affirmation choc\n2. **Problème (3-10s)** : amplifier la douleur\n3. **Solution (10-40s)** : 2-3 bénéfices principaux\n4. **CTA (40-60s)** : 'Lien en bio, livraison en 7 jours'\n\n**Adapter par plateforme :**\n• TikTok : 15-30s, punch immédiat\n• Instagram Reels : 30-60s, esthétique soignée\n• YouTube Shorts : 30-60s, titre fort\n• Facebook Reels : 30-90s, ton rassurant",
        links: [{ label: "Claude AI", url: "https://claude.ai" }],
        tools: ["Claude", "ChatGPT", "Notion"],
        checklist: [
          { task: "Générer 5 scripts avec différents hooks", time: "2h" },
          { task: "Adapter la durée par plateforme", time: "1h" },
          { task: "Faire relire (ton naturel ?)", time: "30min" },
          { task: "Créer une bibliothèque de scripts réutilisables", time: "1h" }
        ]
      },
      {
        id: "montage-subs", label: "Montage + sous-titres", sub: "CapCut, Opus Clip",
        instructions: "**Process CapCut (gratuit) :**\n1. Importer la vidéo avatar\n2. Ajouter le B-roll produit en fond ou split-screen\n3. Ajouter les sous-titres automatiques (80% des vidéos vues sans son)\n4. Ajouter musique trending\n5. Exporter en 1080×1920 (format vertical)\n\n**Règles sous-titres :**\n• Max 4-5 mots par ligne\n• Police grande et lisible\n• Changer de couleur sur le mot-clé hook",
        links: [{ label: "CapCut Web", url: "https://www.capcut.com" }, { label: "Opus Clip", url: "https://www.opus.pro" }],
        tools: ["CapCut (gratuit)", "Opus Clip", "InShot"],
        checklist: [
          { task: "Monter la vidéo avatar + B-roll", time: "2h" },
          { task: "Ajouter les sous-titres automatiques", time: "30min" },
          { task: "Vérifier que le CTA est visible", time: "10min" },
          { task: "Exporter en 1080×1920", time: "10min" },
          { task: "Vérifier le rendu sans le son", time: "10min" }
        ]
      },
      {
        id: "tiktok-org", label: "TikTok", sub: "1-3 vidéos/jour",
        instructions: "TikTok est la plateforme prioritaire : algorithme favorable aux nouveaux comptes.\n\n**Règles de publication :**\n• Fréquence : 1-3 vidéos/jour en phase lancement\n• Horaires FR : 12h-13h30, 17h-19h, 21h-23h\n• Hashtags : 3-5 max\n• Lien en bio : après 1 000 abonnés — utiliser Linktree en attendant\n\n**KPIs :**\n• Taux de complétion (objectif >40%)\n• Taux de partage\n• Ratio clics profil / vues",
        links: [{ label: "TikTok Creator Center", url: "https://www.tiktok.com/creator-academy" }],
        tools: ["TikTok Studio", "CapCut", "Metricool"],
        checklist: [
          { task: "Créer le compte TikTok business", time: "15min" },
          { task: "Configurer le profil (nom, bio, lien)", time: "20min" },
          { task: "Publier la première vidéo", time: "15min" },
          { task: "Analyser les stats après 48h", time: "30min" },
          { task: "Atteindre 1 000 abonnés pour le lien bio", time: "continu" }
        ]
      },
      {
        id: "instagram-org", label: "Instagram", sub: "Reels, Stories",
        instructions: "Instagram est complémentaire à TikTok. Démographie légèrement plus âgée (25-35 ans).\n\n**Stratégie :**\n• Reels : même vidéo que TikTok SANS watermark TikTok\n• Stories : montrer les coulisses, sticker lien direct\n• Bio : lien Shopify direct (pas de restriction d'abonnés)\n\n**Règle clé :** ne JAMAIS poster une vidéo avec le watermark TikTok sur Instagram.",
        links: [{ label: "Instagram for Business", url: "https://business.instagram.com" }],
        tools: ["Instagram Business", "CapCut (export sans watermark)", "Later"],
        checklist: [
          { task: "Créer compte Instagram Business", time: "15min" },
          { task: "Ajouter le lien Shopify en bio", time: "5min" },
          { task: "Poster les Reels sans watermark TikTok", time: "15min" },
          { task: "Utiliser les Stories avec sticker lien", time: "15min" }
        ]
      },
      {
        id: "youtube-org", label: "YouTube", sub: "Shorts + longform",
        instructions: "YouTube = levier SEO long terme. Les vidéos ont une durée de vie quasi-illimitée.\n\n**Double stratégie :**\n\n**Shorts (0-60s)** : même contenu que TikTok/IG. Les Shorts se retrouvent dans la recherche YouTube.\n\n**Longform (5-15 min)** :\n• Titre SEO : '[Produit] — Test et Avis [Année]'\n• Ces vidéos capturent le trafic de recherche Google\n• 1 longform = 5-10 Shorts découpés\n\nLe lien en description YouTube est cliquable dès le premier abonné.",
        links: [{ label: "YouTube Studio", url: "https://studio.youtube.com" }],
        tools: ["YouTube Studio", "TubeBuddy", "VidIQ"],
        checklist: [
          { task: "Créer une chaîne YouTube dédiée", time: "20min" },
          { task: "Optimiser le nom et la description", time: "30min" },
          { task: "Ajouter le lien Shopify en description", time: "5min" },
          { task: "Publier les Shorts", time: "15min" },
          { task: "Créer 1 vidéo longform mensuelle", time: "4h" }
        ]
      },
      {
        id: "facebook-org", label: "Facebook", sub: "Reels, Groupes",
        instructions: "Facebook reste pertinent pour la tranche 35-55 ans.\n\n**Stratégie double :**\n\n**Reels Facebook** : même contenu que TikTok/IG. Algorithme récent et moins saturé.\n\n**Groupes Facebook** : identifier les groupes liés à ta niche et y partager le contenu de manière utile.\n\n**Page Facebook** : ajouter le lien boutique, créer un bouton CTA 'Acheter maintenant'.",
        links: [{ label: "Meta Business Suite", url: "https://business.facebook.com" }],
        tools: ["Meta Business Suite", "Buffer"],
        checklist: [
          { task: "Créer une Page Facebook Business", time: "20min" },
          { task: "Ajouter le lien Shopify et bouton CTA", time: "10min" },
          { task: "Identifier 5-10 groupes de ta niche", time: "1h" },
          { task: "Publier les Reels 3-5x/semaine", time: "30min/vidéo" },
          { task: "Rejoindre et contribuer aux groupes", time: "continu" }
        ]
      }
    ]
  },
  {
    id: "commande", phase: "07", label: "Gestion commandes", emoji: "🛒",
    color: "#14B8A6", light: "#F0FDFA", border: "#99F6E4",
    steps: [
      {
        id: "commande-recue", label: "Commande reçue", sub: "Paiement encaissé",
        instructions: "À réception d'une commande, Shopify :\n1. Encaisse le paiement\n2. Envoie l'email de confirmation au client\n3. Notifie DSers/CJ de la nouvelle commande\n\n**Ce que tu dois faire :** surveiller le tableau de bord Shopify quotidiennement. Vérifier les commandes en statut 'Non exécutée'.\n\n**Temps de traitement fournisseur :**\n• AliExpress : 1-3 jours avant expédition\n• CJ Dropshipping : 1-2 jours",
        links: [{ label: "Gérer les commandes Shopify", url: "https://help.shopify.com/fr/manual/orders" }],
        tools: ["Tableau de bord Shopify", "App Shopify mobile"],
        checklist: [
          { task: "Vérifier les commandes chaque matin", time: "10min/jour" },
          { task: "Confirmer que DSers a transmis au fournisseur", time: "5min/jour" },
          { task: "Vérifier les stocks fournisseur", time: "15min/sem." },
          { task: "Gérer les commandes en erreur manuellement", time: "variable" }
        ]
      },
      {
        id: "transfert-four", label: "Transfert fournisseur", sub: "Auto via DSers",
        instructions: "Avec DSers configuré, le transfert est automatique :\n\n1. Client commande sur ta boutique\n2. DSers détecte la commande\n3. DSers passe la commande sur AliExpress avec ta carte liée\n4. AliExpress expédie au client final\n\n**Points de vigilance :**\n• Garder de la trésorerie (tu paies le fournisseur avant d'être remboursé)\n• Vérifier que les adresses sont bien transmises\n• Configurer DSers en mode 'Auto Sync Tracking'",
        links: [{ label: "Guide DSers auto fulfill", url: "https://help.dsers.com/fr/en/basic-package/auto-fulfill-orders/" }],
        tools: ["DSers", "CJ App"],
        checklist: [
          { task: "Activer l'auto-fulfill dans DSers", time: "20min" },
          { task: "Lier une CB avec suffisamment de provision", time: "15min" },
          { task: "Activer la synchronisation automatique du tracking", time: "15min" },
          { task: "Vérifier les commandes en erreur chaque semaine", time: "30min/sem." }
        ]
      },
      {
        id: "tracking-liv", label: "Suivi livraison", sub: "Tracking client",
        instructions: "Le suivi est crucial : un client qui peut suivre sa commande est 60-70% moins susceptible d'ouvrir un litige.\n\n**Automatisation :**\n• DSers met à jour automatiquement le numéro de tracking\n• Shopify envoie l'email d'expédition avec le lien\n• Aftership : page de tracking brandée\n\n**Délais réalistes :**\n• AliExpress Standard : 15-30 jours (mentionner EN GRAS)\n• CJ Dropshipping EU : 7-15 jours",
        links: [{ label: "Aftership sur App Store Shopify", url: "https://apps.shopify.com/aftership" }],
        tools: ["Aftership", "17Track", "DSers tracking sync"],
        checklist: [
          { task: "Vérifier que DSers synchronise bien les trackings", time: "20min" },
          { task: "Installer Aftership pour page branded", time: "30min" },
          { task: "Tester l'email d'expédition (lien fonctionnel ?)", time: "15min" },
          { task: "Afficher les délais réalistes sur la fiche produit", time: "15min" }
        ]
      },
      {
        id: "sav-retours", label: "Retours et SAV", sub: "Remboursement, litige",
        instructions: "**Seuils pratiques :**\n• Commande <30€ : remboursement immédiat sans retour\n• Commande 30-100€ : photos du problème demandées\n• Commande >100€ : retour physique si défaut avéré\n\n**Litiges PayPal/Stripe :**\n• Répondre dans les 7 jours\n• Fournir la preuve de livraison\n• Taux de litige >1% = risque de suspension\n\n**Outils SAV :**\n• Shopify Inbox (chat gratuit)\n• Email dédié support",
        links: [{ label: "Gérer les remboursements Shopify", url: "https://help.shopify.com/fr/manual/orders/refunds" }, { label: "Shopify Inbox", url: "https://apps.shopify.com/inbox" }],
        tools: ["Shopify Inbox", "Gorgias", "Tidio"],
        checklist: [
          { task: "Configurer l'email de support", time: "20min" },
          { task: "Installer Shopify Inbox", time: "15min" },
          { task: "Rédiger des réponses type pour les 5 cas fréquents", time: "1h" },
          { task: "Définir la politique de seuil de remboursement", time: "20min" },
          { task: "Surveiller le taux de litige (<1%)", time: "10min/sem." }
        ]
      }
    ]
  },
  {
    id: "fidelisation", phase: "∞", label: "Fidélisation & Boucle contenu", emoji: "🔄",
    color: "#6366F1", light: "#EEF2FF", border: "#C7D2FE",
    steps: [
      {
        id: "avis-scripts", label: "Avis → scripts avatar", sub: "Témoignage IA",
        instructions: "Les avis clients = carburant de ta machine à contenu avatar IA.\n\n**Process :**\n1. Email automatique J+livraison+3\n2. Demander une phrase sur le bénéfice ressenti\n3. Transformer l'avis en script d'avatar (l'avatar joue le rôle d'un client)\n\n**Apps de collecte :**\n• Loox (avis photo, 9$/mois)\n• Judge.me (gratuit)\n\n**Contenu généré :**\n• Vidéo avatar 'témoignage client'\n• Réponse aux questions fréquentes\n• Contenu 'avant/après'",
        links: [{ label: "Loox", url: "https://apps.shopify.com/loox" }, { label: "Judge.me", url: "https://apps.shopify.com/judgeme" }],
        tools: ["Loox", "Judge.me", "Klaviyo"],
        checklist: [
          { task: "Installer une app d'avis (Loox ou Judge.me)", time: "30min" },
          { task: "Configurer l'email automatique de demande d'avis", time: "30min" },
          { task: "Transformer les 3 meilleurs avis en scripts avatar", time: "1h30" },
          { task: "Publier les vidéos témoignages sur toutes les plateformes", time: "1h" }
        ]
      }
    ]
  }
];

const TIME_COLOR = (t) => {
  if (!t || t === "attente 1-5j" || t === "continu" || t === "variable") return { bg: "#F3F4F6", text: "#6B7280" };
  const val = parseFloat(t);
  if (t.includes("min") && val <= 15) return { bg: "#ECFDF5", text: "#059669" };
  if (t.includes("min") && val <= 30) return { bg: "#F0FDF4", text: "#16A34A" };
  if (t.includes("min")) return { bg: "#FFFBEB", text: "#D97706" };
  if (t.includes("h") && val <= 1) return { bg: "#FFFBEB", text: "#D97706" };
  if (t.includes("h") && val <= 2) return { bg: "#FFF7ED", text: "#EA580C" };
  return { bg: "#FFF1F2", text: "#E11D48" };
};

export default function App() {
  const [activeStep, setActiveStep] = useState(null);
  const [expandedPhases, setExpandedPhases] = useState(Object.fromEntries(PHASES.map(p => [p.id, true])));
  const [notes, setNotes] = useState({});
  const [checkedItems, setCheckedItems] = useState({});
  const [panelOpen, setPanelOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("instructions");
  const [searchQuery, setSearchQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [timeFilter, setTimeFilter] = useState("all");

  useEffect(() => {
    (async () => {
      try { const r = await window.storage.get("ds-notes-v2"); if (r) setNotes(JSON.parse(r.value)); } catch {}
      try { const r = await window.storage.get("ds-checks-v2"); if (r) setCheckedItems(JSON.parse(r.value)); } catch {}
    })();
  }, []);

  const saveNote = async (id, text) => {
    const n = { ...notes, [id]: text };
    setNotes(n);
    try { await window.storage.set("ds-notes-v2", JSON.stringify(n)); } catch {}
  };

  const toggleCheck = async (stepId, idx) => {
    const key = `${stepId}-${idx}`;
    const c = { ...checkedItems, [key]: !checkedItems[key] };
    setCheckedItems(c);
    try { await window.storage.set("ds-checks-v2", JSON.stringify(c)); } catch {}
  };

  const openStep = (step) => { setActiveStep(step); setPanelOpen(true); setActiveTab("instructions"); };
  const closePanel = () => { setPanelOpen(false); setTimeout(() => setActiveStep(null), 300); };
  const togglePhase = (id) => setExpandedPhases(p => ({ ...p, [id]: !p[id] }));

  const allSteps = PHASES.flatMap(p => p.steps);
  const totalChecked = Object.values(checkedItems).filter(Boolean).length;
  const totalItems = allSteps.reduce((a, s) => a + s.checklist.length, 0);
  const progress = totalItems > 0 ? (totalChecked / totalItems) * 100 : 0;

  // Estimation temps total restant
  const parseMinutes = (t) => {
    if (!t || t === "attente 1-5j" || t === "continu" || t === "variable" || t.includes("/")) return 0;
    if (t.includes("h30")) return parseFloat(t) * 60 + 30;
    if (t.includes("h")) return parseFloat(t) * 60;
    if (t.includes("min")) return parseFloat(t);
    return 0;
  };
  const totalMinRemaining = allSteps.flatMap(s =>
    s.checklist.map((item, i) => checkedItems[`${s.id}-${i}`] ? 0 : parseMinutes(item.time))
  ).reduce((a, b) => a + b, 0);
  const hoursRem = Math.floor(totalMinRemaining / 60);
  const minsRem = totalMinRemaining % 60;

  const searchResults = searchQuery.length > 1
    ? allSteps.filter(s => s.label.toLowerCase().includes(searchQuery.toLowerCase()) || s.instructions.toLowerCase().includes(searchQuery.toLowerCase()))
    : [];

  const getPhaseFor = (stepId) => PHASES.find(p => p.steps.some(s => s.id === stepId));
  const activePhase = activeStep ? getPhaseFor(activeStep.id) : null;

  const renderInstr = (text) => text.split("**").map((p, i) =>
    i % 2 === 1 ? <strong key={i} style={{ color: "#111827", fontWeight: 600 }}>{p}</strong> : <span key={i}>{p}</span>
  );

  return (
    <div style={{ minHeight: "100vh", background: "#F8F7F4", fontFamily: "'DM Sans', 'Segoe UI', sans-serif", color: "#374151" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=DM+Sans:ital,wght@0,400;0,500;1,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #E5E7EB; border-radius: 3px; }
        .step-card { transition: all 0.18s cubic-bezier(.4,0,.2,1); }
        .step-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.10) !important; }
        .tab-btn { transition: all 0.15s; }
        .check-row { transition: background 0.12s; cursor: pointer; border-radius: 8px; }
        .check-row:hover { background: #F9FAFB; }
        .link-row:hover { background: #F5F3FF !important; }
        .phase-toggle { transition: all 0.2s; }
        .phase-toggle:hover { opacity: 0.9; }
        .search-result:hover { background: #F3F4F6 !important; }
        @keyframes slideIn { from { opacity:0; transform:translateX(18px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(5px); } to { opacity:1; transform:translateY(0); } }
        .panel-content { animation: slideIn 0.22s ease; }
        .step-list { animation: fadeUp 0.18s ease; }
        @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.55} }
        .pulse { animation: pulse 2.5s ease-in-out infinite; }
        .time-badge { font-size: 10px; font-weight: 600; padding: 2px 7px; border-radius: 99px; white-space: nowrap; flex-shrink: 0; }
        .filter-btn { border: 1.5px solid #E5E7EB; background: #fff; padding: 5px 12px; border-radius: 8px; cursor: pointer; font-size: 11px; font-weight: 500; font-family: inherit; transition: all 0.15s; }
        .filter-btn.active { background: #6366F1; border-color: #6366F1; color: #fff; }
        .filter-btn:not(.active):hover { border-color: #6366F1; color: #6366F1; }
      `}</style>

      {/* HEADER */}
      <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "0 24px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60, position: "sticky", top: 0, zIndex: 200, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontSize: 22 }}>🚀</span>
          <div>
            <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 15, fontWeight: 700, color: "#111827", letterSpacing: -0.3 }}>Dropshipping OS</div>
            <div style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>Avatars IA · Organique</div>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          {/* Temps restant */}
          <div style={{ fontSize: 12, color: "#6B7280", display: "flex", alignItems: "center", gap: 6 }}>
            <span>⏱</span>
            <span><strong style={{ color: "#6366F1" }}>{hoursRem}h{minsRem > 0 ? minsRem : ""}</strong> restantes</span>
          </div>
          {/* Progress */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ width: 100, height: 6, background: "#F3F4F6", borderRadius: 99, overflow: "hidden" }}>
              <div style={{ height: "100%", background: "linear-gradient(90deg,#6366F1,#EC4899)", width: `${progress}%`, borderRadius: 99, transition: "width 0.6s ease" }} />
            </div>
            <span style={{ fontSize: 12, color: "#6B7280", fontWeight: 500 }}>
              <span style={{ color: "#6366F1", fontWeight: 700 }}>{totalChecked}</span>/{totalItems}
            </span>
          </div>
          <button onClick={() => setSearchOpen(s => !s)}
            style={{ background: searchOpen ? "#6366F1" : "#F3F4F6", border: "none", color: searchOpen ? "#fff" : "#6B7280", padding: "7px 14px", borderRadius: 8, cursor: "pointer", fontSize: 12, fontWeight: 500, fontFamily: "inherit" }}>
            {searchOpen ? "✕ Fermer" : "🔍 Recherche"}
          </button>
        </div>
      </div>

      {/* SEARCH */}
      {searchOpen && (
        <div style={{ background: "#fff", borderBottom: "1px solid #E5E7EB", padding: "14px 24px" }}>
          <input autoFocus value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
            placeholder="Rechercher une étape, un outil..." style={{ width: "100%", background: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: 10, padding: "9px 14px", fontSize: 13, fontFamily: "inherit", outline: "none", color: "#111827" }} />
          {searchResults.length > 0 && (
            <div style={{ marginTop: 8, display: "flex", flexDirection: "column", gap: 4 }}>
              {searchResults.map(s => {
                const ph = getPhaseFor(s.id);
                return (
                  <button key={s.id} className="search-result" onClick={() => { openStep(s); setSearchOpen(false); setSearchQuery(""); }}
                    style={{ background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 8, padding: "9px 14px", textAlign: "left", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 10 }}>
                    <span style={{ fontSize: 16 }}>{ph?.emoji}</span>
                    <span style={{ fontWeight: 500, color: "#111827", fontSize: 13 }}>{s.label}</span>
                    <span style={{ color: "#9CA3AF", fontSize: 12 }}>{s.sub}</span>
                  </button>
                );
              })}
            </div>
          )}
        </div>
      )}

      <div style={{ display: "flex", minHeight: "calc(100vh - 60px)" }}>
        {/* MAIN */}
        <div style={{ flex: 1, padding: "24px", overflowY: "auto", maxWidth: panelOpen ? "56%" : "100%", transition: "max-width 0.3s ease" }}>

          {/* Progress bar */}
          <div style={{ height: 3, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", marginBottom: 24 }}>
            <div style={{ height: "100%", background: "linear-gradient(90deg,#6366F1,#EC4899)", width: `${progress}%`, borderRadius: 99, transition: "width 0.6s" }} />
          </div>

          {PHASES.map((phase) => {
            const phaseChecked = phase.steps.reduce((a, s) => a + s.checklist.filter((_, i) => checkedItems[`${s.id}-${i}`]).length, 0);
            const phaseTotal = phase.steps.reduce((a, s) => a + s.checklist.length, 0);
            const phaseProgress = phaseTotal > 0 ? (phaseChecked / phaseTotal) * 100 : 0;
            const isExpanded = expandedPhases[phase.id];
            const phaseMins = phase.steps.flatMap(s => s.checklist.map((item, i) => checkedItems[`${s.id}-${i}`] ? 0 : parseMinutes(item.time))).reduce((a,b)=>a+b,0);
            const phaseHr = Math.floor(phaseMins/60), phaseMin = phaseMins%60;

            return (
              <div key={phase.id} style={{ marginBottom: 16 }}>
                <button className="phase-toggle" onClick={() => togglePhase(phase.id)}
                  style={{ width: "100%", background: "#fff", border: `1.5px solid ${isExpanded ? phase.border : "#E5E7EB"}`, borderRadius: 12, padding: "13px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", fontFamily: "inherit", marginBottom: isExpanded ? 10 : 0, boxShadow: isExpanded ? `0 2px 12px ${phase.color}14` : "none" }}>
                  <div style={{ width: 34, height: 34, borderRadius: 9, background: phase.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 17, flexShrink: 0 }}>{phase.emoji}</div>
                  <div style={{ flex: 1, textAlign: "left" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontFamily: "'Sora', sans-serif", fontSize: 14, fontWeight: 600, color: "#111827" }}>{phase.label}</span>
                      {phase.highlight && <span className="pulse" style={{ fontSize: 10, fontWeight: 600, color: phase.color, background: phase.light, border: `1px solid ${phase.border}`, padding: "1px 7px", borderRadius: 99 }}>ORGANIQUE</span>}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 3 }}>
                      <div style={{ flex: 1, height: 3, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", maxWidth: 100 }}>
                        <div style={{ height: "100%", background: phase.color, width: `${phaseProgress}%`, borderRadius: 99, transition: "width 0.5s" }} />
                      </div>
                      <span style={{ fontSize: 11, color: "#9CA3AF" }}>{phaseChecked}/{phaseTotal}</span>
                      {phaseMins > 0 && <span style={{ fontSize: 11, color: "#9CA3AF" }}>· ⏱ {phaseHr > 0 ? `${phaseHr}h` : ""}{phaseMin > 0 ? `${phaseMin}min` : ""} restant</span>}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                    <span style={{ fontSize: 11, color: "#9CA3AF", fontWeight: 500 }}>Phase {phase.phase}</span>
                    <span style={{ color: "#9CA3AF", fontSize: 11, transform: isExpanded ? "rotate(180deg)" : "none", transition: "transform 0.2s", display: "inline-block" }}>▼</span>
                  </div>
                </button>

                {isExpanded && (
                  <div className="step-list" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))", gap: 8 }}>
                    {phase.steps.map(step => {
                      const stepChecked = step.checklist.filter((_, i) => checkedItems[`${step.id}-${i}`]).length;
                      const stepTotal = step.checklist.length;
                      const isDone = stepChecked === stepTotal && stepTotal > 0;
                      const isActive = activeStep?.id === step.id;
                      const hasNote = notes[step.id]?.length > 0;
                      const stepMins = step.checklist.reduce((a, item, i) => a + (checkedItems[`${step.id}-${i}`] ? 0 : parseMinutes(item.time)), 0);
                      const sHr = Math.floor(stepMins/60), sMin = stepMins%60;

                      return (
                        <button key={step.id} className="step-card" onClick={() => openStep(step)}
                          style={{ background: isActive ? phase.light : "#fff", border: `1.5px solid ${isActive ? phase.color : isDone ? "#D1FAE5" : "#E5E7EB"}`, borderRadius: 12, padding: "14px", textAlign: "left", cursor: "pointer", fontFamily: "inherit", boxShadow: isActive ? `0 4px 16px ${phase.color}28` : "0 1px 4px rgba(0,0,0,0.05)" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
                            <span style={{ fontWeight: 600, fontSize: 13, color: "#111827", lineHeight: 1.3, flex: 1 }}>{step.label}</span>
                            {isDone && <span style={{ fontSize: 13, marginLeft: 4, flexShrink: 0 }}>✅</span>}
                          </div>
                          <div style={{ fontSize: 11, color: "#9CA3AF", marginBottom: 10 }}>{step.sub}</div>
                          <div style={{ height: 3, background: "#F3F4F6", borderRadius: 99, overflow: "hidden", marginBottom: 8 }}>
                            <div style={{ height: "100%", background: isDone ? "#10B981" : phase.color, width: `${stepTotal ? (stepChecked/stepTotal)*100 : 0}%`, borderRadius: 99, transition: "width 0.3s" }} />
                          </div>
                          {stepMins > 0 && (
                            <div style={{ fontSize: 10, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 3 }}>
                              <span>⏱</span>
                              <span style={{ color: "#6366F1", fontWeight: 600 }}>{sHr > 0 ? `${sHr}h` : ""}{sMin > 0 ? `${sMin}min` : ""}</span>
                              <span> restant</span>
                            </div>
                          )}
                          {hasNote && (
                            <div style={{ marginTop: 5, fontSize: 10, color: "#9CA3AF", display: "flex", alignItems: "center", gap: 4 }}>
                              <span>📝</span>
                              <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 130 }}>{notes[step.id]}</span>
                            </div>
                          )}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SIDE PANEL */}
        <div style={{ width: panelOpen ? 460 : 0, minWidth: panelOpen ? 360 : 0, overflow: "hidden", borderLeft: panelOpen ? "1px solid #E5E7EB" : "none", background: "#fff", position: "sticky", top: 60, height: "calc(100vh - 60px)", overflowY: "auto", transition: "width 0.3s cubic-bezier(.4,0,.2,1), min-width 0.3s", flexShrink: 0, boxShadow: panelOpen ? "-4px 0 20px rgba(0,0,0,0.05)" : "none" }}>
          {activeStep && activePhase && (
            <div className="panel-content" style={{ padding: "22px" }}>
              {/* Panel header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 18 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 5 }}>
                    <div style={{ width: 28, height: 28, borderRadius: 7, background: activePhase.light, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14 }}>{activePhase.emoji}</div>
                    <span style={{ fontSize: 10, color: activePhase.color, fontWeight: 700, letterSpacing: 0.5, textTransform: "uppercase" }}>{activePhase.label}</span>
                  </div>
                  <div style={{ fontFamily: "'Sora', sans-serif", fontSize: 16, fontWeight: 700, color: "#111827", lineHeight: 1.2 }}>{activeStep.label}</div>
                  <div style={{ fontSize: 12, color: "#9CA3AF", marginTop: 2 }}>{activeStep.sub}</div>
                </div>
                <button onClick={closePanel} style={{ background: "#F3F4F6", border: "none", color: "#6B7280", width: 30, height: 30, borderRadius: 8, cursor: "pointer", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: 3, marginBottom: 18, background: "#F9FAFB", borderRadius: 10, padding: 3 }}>
                {[
                  { id: "instructions", label: "📋 Guide" },
                  { id: "outils", label: "🛠 Outils" },
                  { id: "checklist", label: `✅ (${activeStep.checklist.filter((_,i)=>checkedItems[`${activeStep.id}-${i}`]).length}/${activeStep.checklist.length})` },
                  { id: "notes", label: "📝 Notes" }
                ].map(tab => (
                  <button key={tab.id} className="tab-btn" onClick={() => setActiveTab(tab.id)}
                    style={{ flex: 1, background: activeTab === tab.id ? "#fff" : "transparent", border: "none", borderRadius: 7, padding: "7px 4px", cursor: "pointer", fontSize: 11, fontWeight: activeTab === tab.id ? 600 : 400, color: activeTab === tab.id ? "#111827" : "#9CA3AF", fontFamily: "inherit", boxShadow: activeTab === tab.id ? "0 1px 4px rgba(0,0,0,0.08)" : "none" }}>
                    {tab.label}
                  </button>
                ))}
              </div>

              {/* Instructions */}
              {activeTab === "instructions" && (
                <div>
                  <div style={{ fontSize: 13, lineHeight: 1.85, color: "#374151", whiteSpace: "pre-wrap" }}>{renderInstr(activeStep.instructions)}</div>
                  {activeStep.links?.length > 0 && (
                    <div style={{ marginTop: 20 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", letterSpacing: 0.5, marginBottom: 8, textTransform: "uppercase" }}>Liens officiels</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                        {activeStep.links.map((link, i) => (
                          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="link-row"
                            style={{ color: "#4F46E5", textDecoration: "none", fontSize: 13, padding: "9px 12px", background: "#F5F3FF", border: "1px solid #E0E7FF", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center", fontWeight: 500, transition: "all 0.15s" }}>
                            <span>{link.label}</span><span>↗</span>
                          </a>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Outils */}
              {activeTab === "outils" && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", letterSpacing: 0.5, marginBottom: 10, textTransform: "uppercase" }}>Outils recommandés</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {activeStep.tools?.map((tool, i) => (
                      <div key={i} style={{ padding: "10px 12px", background: "#F9FAFB", border: "1px solid #F3F4F6", borderRadius: 8, display: "flex", alignItems: "center", gap: 10 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: activePhase.color, flexShrink: 0 }} />
                        <span style={{ fontSize: 13, color: "#374151", fontWeight: 500 }}>{tool}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Checklist avec temps */}
              {activeTab === "checklist" && (
                <div>
                  {/* Filtre rapide */}
                  <div style={{ display: "flex", gap: 5, marginBottom: 12, flexWrap: "wrap" }}>
                    {[["all","Tout"], ["quick","< 30min"], ["medium","30min-1h"], ["long","> 1h"]].map(([val, label]) => (
                      <button key={val} className={`filter-btn${timeFilter === val ? " active" : ""}`} onClick={() => setTimeFilter(val)}>{label}</button>
                    ))}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                    <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", letterSpacing: 0.5, textTransform: "uppercase" }}>Checklist</div>
                    <div style={{ fontSize: 11, color: "#9CA3AF" }}>
                      {activeStep.checklist.filter((_,i) => checkedItems[`${activeStep.id}-${i}`]).length}/{activeStep.checklist.length} complétés
                    </div>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
                    {activeStep.checklist.map((item, idx) => {
                      const key = `${activeStep.id}-${idx}`;
                      const done = checkedItems[key];
                      const mins = parseMinutes(item.time);
                      // Filtre
                      if (timeFilter === "quick" && mins > 30) return null;
                      if (timeFilter === "medium" && (mins <= 30 || mins > 60)) return null;
                      if (timeFilter === "long" && mins <= 60 && !["1h30","4h","2h","3h"].includes(item.time)) return null;
                      const tc = TIME_COLOR(item.time);

                      return (
                        <div key={idx} className="check-row" onClick={() => toggleCheck(activeStep.id, idx)}
                          style={{ padding: "10px 12px", background: done ? "#F0FDF4" : "#FAFAFA", border: `1px solid ${done ? "#BBF7D0" : "#F3F4F6"}`, display: "flex", alignItems: "flex-start", gap: 10 }}>
                          <div style={{ width: 17, height: 17, borderRadius: 5, border: `1.5px solid ${done ? "#10B981" : "#D1D5DB"}`, background: done ? "#10B981" : "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, color: "#fff", flexShrink: 0, marginTop: 1 }}>
                            {done ? "✓" : ""}
                          </div>
                          <span style={{ fontSize: 12.5, color: done ? "#6B7280" : "#374151", textDecoration: done ? "line-through" : "none", lineHeight: 1.5, flex: 1 }}>{item.task}</span>
                          <span className="time-badge" style={{ background: done ? "#F3F4F6" : tc.bg, color: done ? "#9CA3AF" : tc.text, marginLeft: 4 }}>
                            {item.time}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  {/* Total temps de l'étape */}
                  <div style={{ marginTop: 14, padding: "10px 12px", background: "#F5F3FF", border: "1px solid #E0E7FF", borderRadius: 8, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <span style={{ fontSize: 12, color: "#4F46E5", fontWeight: 600 }}>⏱ Temps total restant</span>
                    <span style={{ fontSize: 13, color: "#4F46E5", fontWeight: 700 }}>
                      {(() => { const m = activeStep.checklist.reduce((a,item,i) => a + (checkedItems[`${activeStep.id}-${i}`] ? 0 : parseMinutes(item.time)), 0); return m > 0 ? `${Math.floor(m/60) > 0 ? Math.floor(m/60)+"h" : ""}${m%60 > 0 ? m%60+"min" : ""}` : "✅ Terminé"; })()}
                    </span>
                  </div>
                </div>
              )}

              {/* Notes */}
              {activeTab === "notes" && (
                <div>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#9CA3AF", letterSpacing: 0.5, marginBottom: 10, textTransform: "uppercase" }}>Mes notes</div>
                  <textarea value={notes[activeStep.id] || ""} onChange={e => saveNote(activeStep.id, e.target.value)}
                    placeholder="Ajoute tes notes, fournisseurs trouvés, prix négociés, problèmes rencontrés..."
                    style={{ width: "100%", minHeight: 220, background: "#F9FAFB", border: "1.5px solid #E5E7EB", borderRadius: 10, color: "#374151", padding: "12px", fontFamily: "inherit", fontSize: 13, resize: "vertical", outline: "none", lineHeight: 1.7 }} />
                  <div style={{ marginTop: 5, fontSize: 11, color: "#9CA3AF" }}>
                    {notes[activeStep.id] ? `${notes[activeStep.id].length} car. · Sauvegardé ✓` : "Sauvegarde automatique"}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
