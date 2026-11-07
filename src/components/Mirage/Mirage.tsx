import type { ReactNode } from "react";
import styles from "./Mirage.module.css";

// Volée d'étoiles filantes : elles partent ensemble (même cycle de 6 s, décalages de quelques dixièmes).
// Valeurs fixes, sans hasard : rendu identique côté serveur et navigateur.
// y = hauteur de départ ; l = longueur de la traînée ; h = taille de la tête ; a = inclinaison ; d = petit décalage.
const meteors = [
  { y: "8%", l: "190px", h: "10px", a: "7deg", d: "0s" },
  { y: "18%", l: "130px", h: "7px", a: "6deg", d: "0.12s" },
  { y: "28%", l: "230px", h: "12px", a: "8deg", d: "0.05s" },
  { y: "38%", l: "150px", h: "8px", a: "5deg", d: "0.22s" },
  { y: "48%", l: "210px", h: "11px", a: "7deg", d: "0.3s" },
  { y: "58%", l: "120px", h: "7px", a: "6deg", d: "0.16s" },
  { y: "66%", l: "170px", h: "9px", a: "8deg", d: "0.38s" },
  { y: "76%", l: "240px", h: "12px", a: "5deg", d: "0.08s" },
  { y: "86%", l: "140px", h: "8px", a: "7deg", d: "0.26s" },
  { y: "14%", l: "110px", h: "6px", a: "9deg", d: "0.42s" },
  { y: "52%", l: "100px", h: "6px", a: "6deg", d: "0.46s" },
  { y: "92%", l: "180px", h: "9px", a: "6deg", d: "0.34s" },
];

// Bloc doré « mirage » : étoiles filantes, paillettes et reflet de lumière derrière le contenu.
export default function Mirage({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`${styles.mirage} ${className}`}>
      <div className={styles.meteors} aria-hidden="true">
        {meteors.map((m, i) => (
          <span
            key={i}
            className={styles.meteor}
            style={{ "--y": m.y, "--l": m.l, "--h": m.h, "--a": m.a, "--d": m.d } as React.CSSProperties}
          />
        ))}
      </div>
      {children}
    </div>
  );
}
