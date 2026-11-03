import { contact } from "@/content/contact";
import { site } from "@/content/site";
import { slides } from "@/content/slides";
import { Button, Card, CopyText, cx } from "@/design-system/ui";
import { deck } from "../deck/Deck.style";
import { Slide } from "../deck/Slide";
import { stagger } from "../deck/stagger";
import { contactSlide } from "./ContactSlide.style";

/** Closing slide: availability, the email (click to copy or open in a mail app), LinkedIn and the CV. */
export function ContactSlide() {
  return (
    <Slide slide={slides.contact} className={contactSlide.slide}>
      <div className={contactSlide.glow} aria-hidden="true" />
      <div className={contactSlide.content}>
        <div className={contactSlide.main}>
          <h2 className={cx(deck.reveal, contactSlide.title)} style={stagger(0)}>
            {contact.title}
          </h2>
          <p className={cx(deck.reveal, contactSlide.status)} style={stagger(1)}>
            <span className={contactSlide.statusDot} aria-hidden="true" />
            {site.availability}
          </p>
          <p className={cx(deck.reveal, contactSlide.intro)} style={stagger(2)}>
            {contact.intro}
          </p>
          <div className={cx(deck.reveal, contactSlide.primaryRow)} style={stagger(3)}>
            <CopyText text={contact.email} className={contactSlide.email} />
            <Button href={contact.emailAction.href} size="lg">
              {contact.emailAction.label}
            </Button>
            {contact.profiles.map((profile) => (
              <Button key={profile.label} href={profile.href} external variant="secondary">
                {profile.label}
              </Button>
            ))}
          </div>
        </div>
        <div className={deck.reveal} style={stagger(4)}>
          <Card className={contactSlide.cvCard}>
            <h3 className={contactSlide.cvTitle}>{contact.cvTitle}</h3>
            <p className={contactSlide.cvMeta}>{contact.cvMeta}</p>
            <Button href={contact.cv.href} download variant="secondary">
              {contact.cv.label}
            </Button>
          </Card>
        </div>
      </div>
      <footer className={cx(deck.reveal, contactSlide.footer)} style={stagger(5)}>
        <span>{contact.credit}</span>
        <div className={contactSlide.footerLinks}>
          {contact.footerLinks.map((link) => (
            <Button key={link.label} href={link.href} external variant="ghost">
              {link.label}
            </Button>
          ))}
        </div>
      </footer>
    </Slide>
  );
}
