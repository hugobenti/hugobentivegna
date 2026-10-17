import { notFound } from "@/content/contact";
import { Button } from "@/design-system/ui";
import { notFoundPage } from "./not-found.style";

export default function NotFound() {
  return (
    <main className={notFoundPage.main}>
      <div className={notFoundPage.glow} aria-hidden="true" />
      <div className={notFoundPage.content}>
        <p className={notFoundPage.code}>{notFound.code}</p>
        <h1 className={notFoundPage.title}>{notFound.title}</h1>
        <p className={notFoundPage.body}>{notFound.body}</p>
        <div className={notFoundPage.action}>
          <Button href={notFound.back.href} size="lg">
            {notFound.back.label}
          </Button>
        </div>
      </div>
    </main>
  );
}
