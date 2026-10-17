import { contact } from "@/content/contact";
import { slides } from "@/content/slides";
import { Button, CopyText, cx } from "@/design-system/ui";
import { deck } from "../deck/Deck.style";
import { Slide } from "../deck/Slide";
import { stagger } from "../deck/stagger";
import { contactSlide } from "./ContactSlide.style";

/** Closing slide: the email (click to copy or open in a mail app), profiles and the CV. */
export function ContactSlide() {
  return (
    <Slide slide={slides.contact} className={contactSlide.slide}>
      <div className={contactSlide.glow} aria-hidden="true" />
      <div className={contactSlide.content}>
        <p className={cx(deck.reveal, contactSlide.kicker)} style={stagger(0)}>
          {contact.kicker}
        </p>
        <h2 className={cx(deck.reveal, contactSlide.title)} style={stagger(1)}>
          {contact.title}
        </h2>
        <p className={cx(deck.reveal, contactSlide.intro)} style={stagger(2)}>
          {contact.intro}
        </p>
        <div className={cx(deck.reveal, contactSlide.primaryRow)} style={stagger(3)}>
          <CopyText text={contact.email} className={contactSlide.email} />
          <Button href={contact.emailAction.href} size="lg">
            {contact.emailAction.label}
          </Button>
        </div>
        <div className={cx(deck.reveal, contactSlide.secondaryRow)} style={stagger(4)}>
          {contact.profiles.map((profile) => (
            <Button key={profile.label} href={profile.href} external variant="secondary">
              {profile.label}
            </Button>
          ))}
          <Button href={contact.cv.href} download variant="ghost">
            {contact.cv.label}
          </Button>
        </div>
      </div>
      <footer className={cx(deck.reveal, contactSlide.footer)} style={stagger(5)}>
        <span>{contact.credit}</span>
        <Button href={contact.storybook.href} external variant="ghost">
          {contact.storybook.label}
        </Button>
      </footer>
    </Slide>
  );
}
