'use client';

import { useState, type JSX } from 'react';
import Lightbox from 'yet-another-react-lightbox';
import { Captions, Counter, Fullscreen, Zoom } from 'yet-another-react-lightbox/plugins';
import 'yet-another-react-lightbox/plugins/captions.css';
import 'yet-another-react-lightbox/plugins/counter.css';
import 'yet-another-react-lightbox/styles.css';

const images = [
  {
    file: '01-index-20020310.png',
    alt: 'Úvodní stránka z 10. března 2002',
    description: 'Nejstarší dochovaná úvodní stránka z 10. března 2002.',
  },
  {
    file: '02-index-20021206.png',
    alt: 'Úvodní stránka z 6. prosince 2002',
    description: 'Úvodní stránka z 6. prosince 2002 zmiňující přípravu nového webu.',
  },
  {
    file: '03-index-20030211.png',
    alt: 'Úvodní stránka z 11. února 2003',
    description: 'Úvodní stránka nového webu spuštěného v únoru 2003. Tato „zkušební“ verze moc dlouho nevydržela.',
  },
  {
    file: '04-index-20030731.png',
    alt: 'Úvodní stránka z 31. července 2003',
    description: (
      <>
        V průběhu jara 2003 dostal web nový vzhled, který se udržel po další dva roky.
        <br />
        Stejně jako u všech předchozích verzí, ani zde nesměl chybět obligátní
        {' '}
        <code>marquee</code>
        , a tak text „u kostela Narození sv. Jana Křtitele“ neustále jezdil dokola.
      </>
    ),
  },
  {
    file: '05-index-20050404.png',
    alt: 'Úvodní stránka z 4. dubna 2005',
    description: 'Úvodní stránka z dubna 2005, tedy krátce po spuštění nové verze webu s přepracovaným redakčním systémem v únoru 2005.',
  },
  {
    file: '06-index-20080117.png',
    alt: 'Úvodní stránka z 17. ledna 2008',
    description: (
      <>
        Během tří let – od února 2005 do roku 2008 – prodělal web několik změn. Například z menu zmizelo Forum, které nahradily komentáře pod články, a přibyla sekce o opravě varhan.
        <br />
        Samotná úvodní stránka dostala více prostoru pro pozvánky na akce a zprávy o nedávných událostech.
      </>
    ),
  },
  {
    file: '07-redakce-akce.png',
    alt: 'Redakce - Akce',
    description: 'Administrátorské rozhraní redakčního systému pro přidání nové akce.',
  },
  {
    file: '08-redakce-zpravy.png',
    alt: 'Redakce - Zprávy',
    description: 'Administrátorské rozhraní redakčního systému pro přidání nové zprávy.',
  },
  {
    file: '09-akce-20080306.png',
    alt: 'Stránka Akce z 6. března 2008',
    description: 'Pozvánky na nadcházející akce ve farnosti i okolí z 6. března 2008.',
  },
  {
    file: '10-zpravy-list-2007.png',
    alt: 'Stránka Zprávy z roku 2007',
    description: 'Seznam zpráv zachycený v červenci 2007.',
  },
  {
    file: '11-zpravy-list-2008.png',
    alt: 'Stránka Zprávy z roku 2008',
    description: 'Na podzim 2007 dostal seznam zpráv upravený vzhled, jak zachycuje tato stránka se zprávami z roku 2008.',
  },
  {
    file: '12-zpravy-2007.png',
    alt: 'Zpráva z roku 2007 – Kněžské svěcení Pavla Sandtnera',
    description: 'Takto vypadal detail zprávy v roce 2007 před podzimní drobnou úpravou vzhledu.',
  },
  {
    file: '13-zpravy-2008.png',
    alt: 'Zpráva z roku 2008 – Postní duchovní obnova',
    description: 'V říjnu 2007 přibyla možnost pro návštěvníky stránek přidat ke zprávám komentáře.',
  },
  {
    file: '14-bohosluzby.png',
    alt: 'Stránka Bohoslužby',
    description: 'Stránka se seznamem bohoslužeb.',
  },
  {
    file: '15-pastoracni-plan-2007.png',
    alt: 'Stránka Pastorační plán z roku 2007',
    description: 'Stránka s pastoračním plánem farnosti na rok 2007.',
  },
  {
    file: '16-pravidelne-akce-2008.png',
    alt: 'Stránka Pravidelné akce z roku 2008',
    description: 'Seznam pravidelných akcí ve farnosti v roce 2008.',
  },
  {
    file: '17-svatosti.png',
    alt: 'Stránka Svátosti',
    description: 'Stránka s informacemi o udílení svátostí ve farnosti.',
  },
  {
    file: '18-pastoracni-rada-2008.png',
    alt: 'Stránka Pastorační a Ekonomická rada z roku 2008',
    description: 'Informace o Pastorační a Ekonomické radě z roku 2008.',
  },
  {
    file: '19-knezi-1.png',
    alt: 'Stránka Náš současný duchovní pastýř – P. Zdeněk Kubeš',
    description: 'Stránka o tehdejším duchovním pastýři a administrátorovi farnosti P. Zdeňku Kubešovi.',
  },
  {
    file: '20-knezi-2.png',
    alt: 'Stránka Naši bývalí duchovní pastýři',
    description: 'Stránka s informace o bývalých duchovních pastýřích farnosti.',
  },
  {
    file: '21-historie-list-2007.png',
    alt: 'Stránka Historie – seznam článků',
    description: (
      <>
        Seznam článků o historii farnosti. Obsah je
        {' '}
        <a href="https://www.farnostpribyslav.cz/clanek.php?id=1768" target="_blank" className="underline">dostupný</a>
        {' '}
        na současných farních stránkách.
      </>
    ),
  },
  {
    file: '22-odkazy.png',
    alt: 'Stránka Odkazy',
    description: 'Nesměla chybět ani stránka se seznamem odkazů na další weby.',
  },
  {
    file: '23-varhany-sbirka.png',
    alt: 'Stránka Varhany – Veřejná sbírka na opravu přibyslavských varhan',
    description: 'Později přidaná sekce o opravách varhan se nikdy nedočkala řádného zpracování a zůstalo pouze u tří stránek. Zde je jedna z nich – s oznámením o veřejné sbírce.',
  },
  {
    file: '24-novy-web-2009.png',
    alt: 'Úvodní stránka nového oficiálního webu farnosti na www.farnostpribyslav.cz v roce 2009',
    description: 'Tehdejší podoba nového oficiálního webu farnosti na www.farnostpribyslav.cz, který v průběhu roku 2008 nahradil starý web farnostpribyslav.wz.cz.',
  },
] satisfies { file: string; alt: string; description: string | JSX.Element }[];

const slides = images.map(image => ({
  src: `/images/${image.file}`,
  alt: image.alt,
  description: image.description,
}));

export default function Gallery() {
  const [index, setIndex] = useState(-1);

  return (
    <>
      <div className="flex flex-wrap gap-4 mx-auto my-8 justify-center">
        {images.map((image, idx) => (
          <a
            key={idx}
            href={`/images/${image.file}`}
            onClick={(e) => {
              e.preventDefault();
              setIndex(idx);
            }}
            title={image.alt}
          >
            <img
              src={`/images/previews/${image.file}`}
              alt={image.alt}
              width={180}
              height={135}
              loading="lazy"
            />
          </a>
        ))}
      </div>

      <Lightbox
        index={index}
        slides={slides}
        open={index >= 0}
        close={() => setIndex(-1)}
        labels={{
          Close: 'Zavřít',
          Next: 'Další',
          Previous: 'Předchozí',
        }}
        plugins={[Zoom, Fullscreen, Captions, Counter]}
        zoom={{
          scrollToZoom: true,
        }}
        captions={{
          showToggle: true,
          descriptionTextAlign: 'center',
          descriptionMaxLines: 10,
        }}
      />
    </>
  );
}
