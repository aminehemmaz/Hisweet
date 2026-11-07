import Link from "next/link";
import { siteConfig, whatsappLink } from "@/lib/site";
import styles from "./Footer.module.css";

export default function Footer() {
  const whatsapp = whatsappLink();

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <p className={styles.brand}>
          {siteConfig.name}
          {siteConfig.city ? ` · ${siteConfig.city}` : ""}
        </p>

        <ul className={styles.links}>
          {siteConfig.instagram && (
            <li>
              <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
            </li>
          )}
          {siteConfig.facebook && (
            <li>
              <a href={siteConfig.facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </li>
          )}
          {whatsapp && (
            <li>
              <a href={whatsapp} target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </li>
          )}
          <li>
            <Link href="/contact">Contact</Link>
          </li>
        </ul>

        <ul className={styles.links}>
          <li>
            <Link href="/mentions-legales">Mentions légales</Link>
          </li>
          <li>
            <Link href="/cgv">CGV</Link>
          </li>
          <li>
            <Link href="/confidentialite">Confidentialité</Link>
          </li>
        </ul>

        <p className={styles.copy}>
          © {siteConfig.name}. Tous droits réservés.
        </p>
      </div>
    </footer>
  );
}
