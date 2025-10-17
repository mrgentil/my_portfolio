// Déclaration globale pour s'assurer que JSX est reconnu par TypeScript
import React from "react";

declare global {
  namespace JSX {
    interface IntrinsicElements {
      // tous les éléments HTML natifs sont déjà couverts par React
      // tu peux ajouter des éléments personnalisés ici si besoin
    }
  }
}