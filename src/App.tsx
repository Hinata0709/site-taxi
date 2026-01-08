import { useEffect, useState, useRef } from "react"
import { AnimatedText } from "@/components/ui/animated-text"
import { ShaderAnimation } from "@/components/ui/shader-animation"
import {
  Phone, Clock, PhoneCall, Mail, MapPin, ChevronDown,
  ShieldCheck, Car, Receipt, Plane, TrainFront, Route,
  Moon, Check, Star, Languages, Baby, CreditCard, Send
} from "lucide-react"

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const headerRef = useRef<HTMLElement>(null)

  // Scroll Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Smooth Scroll
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault()
    const element = document.getElementById(id)
    if (element && headerRef.current) {
      const headerHeight = headerRef.current.offsetHeight
      const targetPosition = element.offsetTop - headerHeight
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth"
      })
      setIsMenuOpen(false) // Close menu on mobile click
    }
  }

  // Scroll Animations (IntersectionObserver replacement)
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          observer.unobserve(entry.target)
        }
      })
    }, { threshold: 0.1 })

    const elements = document.querySelectorAll('.feature-card, .service-card, .testimonial-card, .contact-card, .zone-stat, .about-feature')
    elements.forEach((el, index) => {
      // Add initial styles for animation via JS to match legacy script behavior
      (el as HTMLElement).style.opacity = '0';
      (el as HTMLElement).style.transform = 'translateY(30px)';
      (el as HTMLElement).style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  // Testimonials Data
  const testimonials = [
    { name: "Marie D.", city: "Enghien-les-Bains", service: "Transfert Aéroport", comment: "Service impeccable, chauffeur très ponctuel." },
    { name: "Pierre L.", city: "Saint-Gratien", service: "Trajet Personnalisé", comment: "Je recommande vivement, voiture très propre." },
    { name: "Sophie M.", city: "Argenteuil", service: "Transfert Gare", comment: "Trajet agréable, merci pour le professionnalisme." },
    { name: "Jean-Claude R.", city: "Ermont", service: "Navette Roissy", comment: "Parfait pour mes déplacements vers Roissy." },
    { name: "Thomas B.", city: "Eaubonne", service: "Trajet Pro", comment: "Chauffeur sympathique et conduite douce." },
    { name: "Chloé R.", city: "Sannois", service: "Sortie de nuit", comment: "Toujours à l'heure, jamais déçu." },
  ]

  return (
    <div className="app-container">
      {/* Header */}
      <header
        ref={headerRef}
        className={`header ${scrolled ? 'scrolled' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
        id="header"
      >
        <div className="container">
          <a href="#" className="logo">
            {/* Integrated AnimatedText for Logo */}
            <AnimatedText
              text="ID TAXI"
              className="flex-row gap-2"
              textClassName="text-2xl font-extrabold text-[#F7B731]"
              underlineHeight="h-[2px]"
              underlineOffset="-bottom-1"
              replay={false}
            />
          </a>

          <nav className={`nav ${isMenuOpen ? 'active' : ''}`} id="nav">
            <a href="#services" className="nav-link" onClick={(e) => scrollToSection(e, 'services')}>Services</a>
            <a href="#zones" className="nav-link" onClick={(e) => scrollToSection(e, 'zones')}>Zones desservies</a>
            <a href="#about" className="nav-link" onClick={(e) => scrollToSection(e, 'about')}>À propos</a>
            <a href="#testimonials" className="nav-link" onClick={(e) => scrollToSection(e, 'testimonials')}>Avis</a>
            <a href="#contact" className="nav-link" onClick={(e) => scrollToSection(e, 'contact')}>Contact</a>
          </nav>

          <div className="header-contact">
            <a href="tel:+33685730339" className="btn btn-call">
              <Phone size={18} />
              <span>06 85 73 03 39</span>
            </a>
          </div>

          <button
            className={`menu-toggle ${isMenuOpen ? 'active' : ''}`}
            id="menuToggle"
            aria-label="Menu"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        {/* Integrated ShaderAnimation Background */}
        <div className="absolute inset-0 z-[-1] overflow-hidden">
          <ShaderAnimation />
          {/* Overlay to ensure text readability over shader */}
          <div className="absolute inset-0 bg-black/50 z-[0]"></div>
        </div>

        <div className="container hero-content relative z-10">
          <div className="hero-badge">
            <Clock size={16} />
            <span>Disponible 24h/24 - 7j/7</span>
          </div>

          <h1 className="hero-title">
            <span className="hero-title-line">Une autre idée</span>
            <span className="hero-title-line highlight">du transport en taxi</span>
          </h1>

          <p className="hero-subtitle">
            Service de taxi professionnel basé à Ermont (95).
            Transferts aéroports, gares et trajets toutes distances en France et Europe.
          </p>

          <div className="hero-cta">
            <a href="tel:+33685730339" className="btn btn-primary btn-lg">
              <PhoneCall size={20} />
              <span>Réserver maintenant</span>
            </a>
            <a href="mailto:idtaxi@gmail.com" className="btn btn-outline btn-lg !text-white !border-white hover:!bg-white hover:!text-black">
              <Mail size={20} />
              <span>Demander un devis</span>
            </a>
          </div>

          <div className="hero-contact-bar">
            <div className="contact-item">
              <Phone size={24} />
              <div>
                <span className="label">Téléphone</span>
                <a href="tel:+33685730339">06 85 73 03 39</a>
              </div>
            </div>
            <div className="contact-item">
              <Mail size={24} />
              <div>
                <span className="label">Email</span>
                <a href="mailto:idtaxi@gmail.com">idtaxi@gmail.com</a>
              </div>
            </div>
            <div className="contact-item">
              <MapPin size={24} />
              <div>
                <span className="label">Base</span>
                <span>Ermont & Val-d'Oise</span>
              </div>
            </div>
          </div>
        </div>

        <div className="hero-scroll">
          <ChevronDown size={32} />
        </div>
      </section>

      {/* Features */}
      <section className="features">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">
                <Clock size={28} />
              </div>
              <h3>24h/24 - 7j/7</h3>
              <p>Service disponible à toute heure, week-ends et jours fériés inclus</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <ShieldCheck size={28} />
              </div>
              <h3>Chauffeur professionnel</h3>
              <p>Expérience, courtoisie et connaissance parfaite de la région</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Car size={28} />
              </div>
              <h3>Véhicules confortables</h3>
              <p>Climatisation, propreté garantie et espace pour vos bagages</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">
                <Receipt size={28} />
              </div>
              <h3>Prix transparents</h3>
              <p>Devis gratuit sur demande, pas de surprise à l'arrivée</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services */}
      <section className="services" id="services">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Nos Services</span>
            <h2 className="section-title">Des solutions pour tous vos déplacements</h2>
            <p className="section-subtitle">Que ce soit pour un transfert aéroport, une navette gare ou un trajet
              personnalisé, ID Taxi s'adapte à vos besoins.</p>
          </div>

          <div className="services-grid">
            <div className="service-card service-card-featured">
              <div className="service-icon">
                <Plane size={28} />
              </div>
              <div className="service-content">
                <h3>Transfert Aéroport</h3>
                <p>Navettes vers Roissy CDG, Orly et Beauvais. Suivi des vols en temps réel, prix fixe annoncé à
                  l'avance.</p>
                <ul className="service-features">
                  <li><Check size={18} /> Roissy Charles de Gaulle (~35 km)</li>
                  <li><Check size={18} /> Orly (~40 km)</li>
                  <li><Check size={18} /> Beauvais (~60 km)</li>
                </ul>
                <a href="tel:+33685730339" className="btn btn-primary">
                  <Phone size={20} /> Réserver
                </a>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <TrainFront size={28} />
              </div>
              <div className="service-content">
                <h3>Transfert Gare</h3>
                <p>Navettes vers toutes les gares parisiennes. Ponctualité garantie, dépose au plus près du
                  quai.</p>
                <ul className="service-features">
                  <li><Check size={18} /> Gare du Nord</li>
                  <li><Check size={18} /> Gare de Lyon</li>
                  <li><Check size={18} /> Gare Montparnasse</li>
                </ul>
                <a href="tel:+33685730339" className="btn btn-secondary">
                  <Phone size={20} /> Réserver
                </a>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Route size={28} />
              </div>
              <div className="service-content">
                <h3>Trajet Personnalisé</h3>
                <p>RDV médicaux, événements, déplacements professionnels... Nous nous adaptons à vos besoins.</p>
                <ul className="service-features">
                  <li><Check size={18} /> Rendez-vous médicaux</li>
                  <li><Check size={18} /> Événements & mariages</li>
                  <li><Check size={18} /> Mise à disposition</li>
                </ul>
                <a href="tel:+33685730339" className="btn btn-secondary">
                  <Phone size={20} /> Réserver
                </a>
              </div>
            </div>

            <div className="service-card">
              <div className="service-icon">
                <Moon size={28} />
              </div>
              <div className="service-content">
                <h3>Service 24h/24</h3>
                <p>Vol tôt le matin ? Retour tardif ? Urgence ? Disponible à toute heure, tous les jours.</p>
                <ul className="service-features">
                  <li><Check size={18} /> Nuit et jour</li>
                  <li><Check size={18} /> Week-ends & jours fériés</li>
                  <li><Check size={18} /> Réservation immédiate</li>
                </ul>
                <a href="tel:+33685730339" className="btn btn-secondary">
                  <Phone size={20} /> Réserver
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Zones */}
      <section className="zones" id="zones">
        <div className="container">
          <div className="zones-content">
            <div className="zones-text">
              <span className="section-badge">Mobilité</span>
              <h2 className="section-title">De l'Île-de-France vers toute l'Europe</h2>
              <div className="zones-highlight">
                <div className="zones-highlight-content">
                  <p className="zones-simple-text" style={{ marginBottom: "1rem" }}>
                    Basée à <strong>Ermont (Val-d'Oise)</strong>, notre flotte dessert toutes les communes
                    alentours (Saint-Gratien, Eaubonne, Sannois...) et vous transporte vers <strong>toute la
                      France</strong>.
                  </p>
                  <p className="zones-subtext" style={{ marginBottom: "1.5rem", color: "var(--color-gray-600)" }}>
                    Pas de limites de distance. Un service premium, où que vous alliez.
                  </p>
                  <a href="tel:+33685730339" className="btn btn-primary">
                    <Phone size={20} /> Appeler pour un trajet
                  </a>
                </div>
              </div>
            </div>

            <div className="zones-visual">
              <div className="zone-card simplified">
                <div className="zone-card-icon">
                  <MapPin size={24} />
                </div>
                <div className="zone-card-content">
                  <span className="zone-card-label">Notre Base</span>
                  <span className="zone-card-value">Ermont (95)</span>
                  <span className="zone-card-sub">Intervention rapide Val-d'Oise</span>
                </div>
              </div>

              <div className="zone-stats simplified-stats">
                <div className="zone-stat">
                  <span className="stat-number">24/7</span>
                  <span className="stat-label">Disponibilité</span>
                </div>
                <div className="zone-stat">
                  <span className="stat-number">∞</span>
                  <span className="stat-label">Toutes distances</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section className="about" id="about">
        <div className="container">
          <div className="about-grid">
            <div className="about-content">
              <span className="section-badge">À propos</span>
              <h2 className="section-title">ID Taxi, une référence du transport en France</h2>
              <p className="about-text">
                ID Taxi, c'est <strong>"Une autre idée du transport en taxi"</strong>. Société de grande
                renommée basée à <strong>Ermont</strong>, forte de <strong>plus de 10 ans d'expérience</strong>,
                notre équipe de chauffeurs qualifiés vous propose un service d'excellence pour tous vos
                déplacements.
              </p>
              <p className="about-text">
                Que vous ayez besoin d'un transfert aéroport, d'une navette gare ou d'un trajet longue distance
                partout en France, <strong>notre flotte est disponible 24 heures sur 24, 7 jours sur 7</strong>.
                Nous ne sommes pas de simples chauffeurs, mais vos partenaires mobilité de confiance.
              </p>

              <div className="about-features">
                <div className="about-feature">
                  <Languages size={24} />
                  <div>
                    <h4>Service multilingue</h4>
                    <p>Français, Anglais, Espagnol</p>
                  </div>
                </div>
                <div className="about-feature">
                  <Baby size={24} />
                  <div>
                    <h4>Siège enfant</h4>
                    <p>Disponible sur demande</p>
                  </div>
                </div>
                <div className="about-feature">
                  <CreditCard size={24} />
                  <div>
                    <h4>Paiement flexible</h4>
                    <p>CB, espèces acceptés</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="about-visual">
              <div className="about-card">
                <div className="about-card-header">
                  <span className="logo-id">ID</span>
                  <span className="logo-taxi">TAXI</span>
                </div>
                <div className="about-card-body">
                  <blockquote>
                    "La satisfaction de nos clients est notre engagement absolu. Nous mobilisons toute notre
                    expérience pour vous offrir un service irréprochable à chaque kilomètre."
                  </blockquote>
                </div>
                <div className="about-card-footer">
                  <div className="rating flex gap-1 text-[#F7B731]">
                    {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                  </div>
                  <span>Avis clients</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="testimonials" id="testimonials">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Témoignages</span>
            <h2 className="section-title">Ce que disent nos clients</h2>
            <p className="section-subtitle">La satisfaction de nos clients est notre meilleure publicité</p>
          </div>

          <div className="testimonials-container">
            <div className="testimonials-track flex gap-6 overflow-x-auto pb-8 snap-x">
              {/* React Map instead of innerHTML injection */}
              {testimonials.map((review, i) => (
                <div key={i} className="testimonial-card min-w-[300px] bg-white p-6 rounded-xl shadow-sm border border-gray-100 snap-center">
                  <div className="testimonial-rating flex gap-1 text-[#F7B731] mb-4">
                    {[...Array(5)].map((_, j) => <Star key={j} size={16} fill="currentColor" />)}
                  </div>
                  <p className="testimonial-text mb-4 text-gray-600 italic">"{review.comment}"</p>
                  <div className="testimonial-author flex items-center gap-3">
                    <div className="author-avatar w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-600">
                      {review.name.substring(0, 2)}
                    </div>
                    <div className="author-info flex flex-col">
                      <span className="author-name font-semibold text-gray-800">{review.name}</span>
                      <span className="author-location text-xs text-gray-500">{review.city}</span>
                    </div>
                  </div>
                  <span className="testimonial-service mt-3 block text-xs text-blue-500 font-medium bg-blue-50 px-2 py-1 rounded w-fit">
                    {review.service}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section py-16 bg-gray-900 border-t border-gray-800">
        <div className="container">
          <div className="cta-content text-center">
            <h2 className="text-3xl font-bold text-white mb-4">Besoin d'un taxi ?</h2>
            <p className="text-gray-400 mb-8">Réservez dès maintenant votre course par téléphone ou email. Devis gratuit sur demande.</p>
            <div className="cta-buttons flex flex-wrap justify-center gap-4">
              <a href="tel:+33685730339" className="btn btn-white btn-lg">
                <PhoneCall size={20} />
                <span>06 85 73 03 39</span>
              </a>
              <a href="mailto:idtaxi@gmail.com" className="btn btn-outline-white btn-lg">
                <Mail size={20} />
                <span>idtaxi@gmail.com</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="contact" id="contact">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">Contact</span>
            <h2 className="section-title">Contactez-nous</h2>
            <p className="section-subtitle">Plusieurs moyens pour nous joindre, choisissez le vôtre</p>
          </div>

          <div className="contact-grid">
            <div className="contact-card contact-card-phone">
              <div className="contact-card-icon">
                <Phone size={24} />
              </div>
              <h3>Par téléphone</h3>
              <p>Le moyen le plus rapide pour réserver</p>
              <a href="tel:+33685730339" className="contact-value">06 85 73 03 39</a>
              <span className="contact-note">Disponible 24h/24</span>
            </div>

            <div className="contact-card contact-card-email">
              <div className="contact-card-icon">
                <Mail size={24} />
              </div>
              <h3>Par email</h3>
              <p>Pour vos demandes de devis</p>
              <a href="mailto:idtaxi@gmail.com" className="contact-value">idtaxi@gmail.com</a>
              <span className="contact-note">Réponse rapide garantie</span>
            </div>

            <div className="contact-card contact-card-location">
              <div className="contact-card-icon">
                <MapPin size={24} />
              </div>
              <h3>Zone d'intervention</h3>
              <p>Départ Ermont (95)</p>
              <span className="contact-value">Toute la France</span>
              <span className="contact-note">Transferts toute destination</span>
            </div>
          </div>

          <div className="contact-form-container">
            <h3>Demande de devis gratuit</h3>
            <form className="contact-form" id="contactForm">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name">Nom complet</label>
                  <input type="text" id="name" name="name" required placeholder="Votre nom" />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Téléphone</label>
                  <input type="tel" id="phone" name="phone" required placeholder="06 00 00 00 00" />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" required placeholder="votre@email.fr" />
                </div>
                <div className="form-group">
                  <label htmlFor="service">Service souhaité</label>
                  <select id="service" name="service" required>
                    <option value="">Sélectionnez un service</option>
                    <option value="airport">Transfert Aéroport</option>
                    <option value="train">Transfert Gare</option>
                    <option value="custom">Trajet Personnalisé</option>
                    <option value="other">Autre</option>
                  </select>
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="message">Votre message</label>
                <textarea id="message" name="message" rows={4}
                  placeholder="Décrivez votre trajet : date, heure, adresse de départ, destination..."></textarea>
              </div>
              <button type="submit" className="btn btn-primary btn-lg btn-full">
                <Send size={20} />
                <span>Envoyer la demande</span>
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-main">
            <div className="footer-brand">
              <a href="#" className="logo">
                <span className="logo-id">ID</span>
                <span className="logo-taxi">TAXI</span>
              </a>
              <p>Une autre idée du transport en taxi</p>
              <p className="footer-tagline">Service de taxi professionnel basé à Ermont (Val-d'Oise), intervenant dans
                toute la France. Disponible 24h/24, 7j/7.</p>
            </div>

            <div className="footer-links">
              <h4>Services</h4>
              <ul>
                <li><a href="#services">Transfert Aéroport</a></li>
                <li><a href="#services">Transfert Gare</a></li>
                <li><a href="#services">Trajet Personnalisé</a></li>
                <li><a href="#services">Service 24h/24</a></li>
              </ul>
            </div>

            <div className="footer-links">
              <h4>Navigation</h4>
              <ul>
                <li><a href="#services">Services</a></li>
                <li><a href="#zones">Zones desservies</a></li>
                <li><a href="#about">À propos</a></li>
                <li><a href="#testimonials">Témoignages</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>

            <div className="footer-contact">
              <h4>Contact</h4>
              <div className="footer-contact-item">
                <Phone size={18} />
                <a href="tel:+33685730339">06 85 73 03 39</a>
              </div>
              <div className="footer-contact-item">
                <Mail size={18} />
                <a href="mailto:idtaxi@gmail.com">idtaxi@gmail.com</a>
              </div>
              <div className="footer-contact-item">
                <MapPin size={18} />
                <span>Ermont (95120)</span>
              </div>
              <div className="footer-contact-item">
                <Clock size={18} />
                <span>24h/24 - 7j/7</span>
              </div>
            </div>
          </div>

          <div className="footer-bottom">
            <p>&copy; 2024 ID Taxi - Tous droits réservés</p>
            <p>Ermont, Val-d'Oise (95)</p>
          </div>
        </div>
      </footer>

      {/* Floating Call Button */}
      <a href="tel:+33685730339" className="floating-call" aria-label="Appeler">
        <Phone size={24} />
      </a>
    </div>
  )
}

export default App
