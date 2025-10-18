import Header from '@/components/Header';
import PageHero from '@/components/PageHero';
import Experiences from '@/components/Experiences';

export default function ExperiencesPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          title="Parcours Professionnel"
          subtitle="Expériences, formations et compétences clés"
          ctaHref="/Bedi_Tshitsho_CV.pdf"
          ctaLabel="Télécharger mon CV"
        />
        <Experiences />
      </main>
    </>
  );
}
