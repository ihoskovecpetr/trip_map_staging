/** @jsx jsx */
import React, { useEffect } from "react";
import { jsx } from "theme-ui";

import styled from "styled-components";
import { color } from "utils";
// import odstoupeni_od_smlouvy from "assets/docs/Odstoupeni_od_smlouvy.pdf";

export default function Objection({ name }) {
  return (
    <Container>
      <div class="tab-pane pt-4 active" id="trade">
        <h1>{name}</h1>
        <ol type="I">
          <li>
            <h2>Základní ustanovení</h2>
            <p></p>
            <ol>
              <li>
                Tyto všeobecné obchodní podmínky (dále jen „obchodní podmínky“)
                jsou vydané dle § 1751 a násl. zákona č. 89/2012 Sb., občanský
                zákoník (dále jen „občanský zákoník“)
              </li>
              <li>
                Kontaktní údaje:
                <br />
                <br />
                Ing. Petr Hoskovec
                <br />
                IČO: 07271387
                <br />
                se sídlem : Riegrova 237, 53862 Hrochův Týnec
                <br />
                <br />
                email: ihoskovecpetr@gmail.com
                <br />
                telefon: +420 704 206 828
                <br />
                tripmap.shop
                <br />
                (dále jen „prodávající“)
                <br />
                <br />
              </li>
              <li>
                Tyto obchodní podmínky upravují vzájemná práva a povinnosti
                prodávajícího a fyzické osoby, která uzavírá kupní smlouvu mimo
                svou podnikatelskou činnost jako spotřebitel, nebo v rámci své
                podnikatelské činnosti (dále jen: „kupující“) prostřednictvím
                webového rozhraní umístěného na webové stránce dostupné na
                internetové adrese www.tripmap.shop (dále jen „internetový
                obchod“).
              </li>
              <li>
                Ustanovení obchodních podmínek jsou nedílnou součástí kupní
                smlouvy. Odchylná ujednání v kupní smlouvě mají přednost před
                ustanoveními těchto obchodních podmínek.
              </li>
              <li>
                Tyto obchodní podmínky a kupní smlouva se uzavírají v českém
                jazyce.
              </li>
            </ol>
            <br />
            <p></p>
          </li>
          <li>
            <h2>Informace o zboží a cenách</h2>
            <ol>
              <li>
                Informace o zboží, včetně uvedení cen jednotlivého zboží a jeho
                hlavních vlastností, jsou uvedeny v konfigurátoru map a v sekci
                Dotazy. Ceny zboží jsou uvedeny včetně daně z přidané hodnoty,
                všech souvisejících poplatků a nákladů za vrácení zboží,
                jestliže toto zboží ze své podstaty nemůže být vráceno obvyklou
                poštovní cestou. Ceny zboží zůstávají v platnosti po dobu, po
                kterou jsou zobrazovány v internetovém obchodě. Toto ustanovení
                nevylučuje sjednání kupní smlouvy za individuálně sjednaných
                podmínek.
              </li>
              <li>
                Veškerá prezentace zboží umístěná v internetového obchodu je
                informativního charakteru a prodávající není povinen uzavřít
                kupní smlouvu ohledně tohoto zboží.
              </li>
              <li>
                V internetovém obchodě jsou zveřejněny informace o nákladech
                spojených s balením a dodáním zboží. Informace o nákladech
                spojených s balením a dodáním zboží uvedené v internetovém
                obchodě platí pouze v případech, kdy je zboží doručováno v rámci
                území České republiky.
              </li>
              <li>
                Případné slevy z kupní ceny zboží nelze navzájem kombinovat,
                nedohodne-li se prodávající s kupujícím jinak.
              </li>
            </ol>
            <br />
          </li>
          <li>
            <h2>Objednávka a uzavření kupní smlouvy</h2>
            <ol>
              <li>
                Náklady vzniklé kupujícímu při použití komunikačních prostředků
                na dálku v souvislosti s uzavřením kupní smlouvy (náklady na
                internetové připojení, náklady na telefonní hovory), hradí
                kupující sám. Tyto náklady se neliší od základní sazby.
              </li>
              <li>
                Kupující provádí objednávku zboží těmito způsoby:
                <ul>
                  <li>
                    vyplněním objednávkového formuláře a konfigurátoru map bez
                    registrace.
                  </li>
                </ul>
              </li>
              <li>
                Při zadávání objednávky si kupující vybere zboží, počet kusů
                zboží, způsob platby a doručení.
              </li>
              <li>
                Před odesláním objednávky je kupujícímu umožněno kontrolovat a
                měnit údaje, které do objednávky vložil. Objednávku kupující
                odešle prodávajícímu kliknutím na tlačítko "zaplatit [částka k
                zaplacení]”. Údaje uvedené v objednávce jsou prodávajícím
                považovány za správné.
              </li>
              <li>
                Podmínkou platnosti objednávky je vyplnění všech povinných údajů
                v objednávkovém formuláři.
                {/* a potvrzení kupujícího o tom, že se s
                těmito obchodními podmínkami seznámil. */}
              </li>
              <li>
                Neprodleně po obdržení objednávky zašle prodávající kupujícímu
                potvrzení o obdržení objednávky a přijetí objednávky na
                e-mailovou adresu, kterou kupující při objednání zadal.
                {/* Toto potvrzení je automatické a
                nepovažuje se za uzavření smlouvy.  */}
                {/* Přílohou potvrzení jsou
                aktuální obchodní podmínky prodávajícího. Kupní smlouva je
                uzavřena až po přijetí objednávky prodávajícím. */}
              </li>
              {/* <li>
                Oznámení o přijetí objednávky je doručeno na e-mailovou adresu
                kupujícího.
              </li> */}
              <li>
                V případě, že některý z požadavků uvedených v objednávce nemůže
                prodávající splnit, zašle kupujícímu na jeho e-mailovou adresu
                pozměněnou nabídku. Pozměněná nabídka se považuje za nový návrh
                kupní smlouvy a kupní smlouva je v takovém případě uzavřena
                potvrzením kupujícího o přijetí této nabídky prodávajícímu na
                jeho e-mailovou adresu uvedenou v těchto obchodních podmínkách.
              </li>
              <li>
                Všechny objednávky přijaté prodávajícím jsou závazné. Kupující
                může zrušit objednávku, dokud není kupujícímu doručeno oznámení
                o přijetí objednávky prodávajícím. Kupující může zrušit
                objednávku telefonicky na telefonní číslo nebo e-mail
                prodávajícího uvedený v těchto obchodních podmínkách.
              </li>
              <li>
                V případě, že došlo ke zjevné technické chybě na straně
                prodávajícího při uvedení ceny zboží v internetovém obchodě nebo
                v průběhu objednávání, není prodávající povinen dodat kupujícímu
                zboží za tuto zcela zjevně chybnou cenu ani v případě, že
                kupujícímu bylo zasláno automatické potvrzení o obdržení
                objednávky podle těchto obchodních podmínek. Prodávající
                informuje kupujícího o chybě bez zbytečného odkladu a zašle
                kupujícímu na jeho e-mailovou adresu pozměněnou nabídku.
                Pozměněná nabídka se považuje za nový návrh kupní smlouvy a
                kupní smlouva je v takovém případě uzavřena potvrzením o přijetí
                kupujícím na e-mailovou adresu prodávajícího.
              </li>
            </ol>
            <br />
          </li>
          <li>
            <h2>Platební podmínky a dodání zboží</h2>
            <ol>
              <li>
                Cenu zboží a případné náklady spojené s dodáním zboží dle kupní
                smlouvy může kupující uhradit následujícími způsoby:
                <ul>
                  <li>bezhotovostně platební kartou</li>
                  <li>bezhotovostně pomocí Apple pay či Google pay</li>
                </ul>
              </li>
              <li>
                Společně s kupní cenou je kupující povinen uhradit prodávajícímu
                náklady spojené s balením a dodáním zboží ve smluvené výši.
                Není-li dále uvedeno výslovně jinak, rozumí se dále kupní cenou
                i náklady spojené s dodáním zboží.
              </li>
              <li>
                V případě platby v hotovosti je kupní cena splatná při převzetí
                zboží. V případě bezhotovostní platby je kupní cena splatná do
                14 dnů od uzavření kupní smlouvy.
              </li>
              <li>
                V případě platby prostřednictvím platební brány postupuje
                kupující podle pokynů příslušného poskytovatele elektronických
                plateb.
              </li>
              <li>
                V případě bezhotovostní platby je závazek kupujícího uhradit
                kupní cenu splněn okamžikem připsání příslušné částky na
                bankovní účet prodávajícího.
              </li>
              <li>
                Prodávající nepožaduje od kupujícího předem žádnou zálohu či
                jinou obdobnou platbu. Úhrada kupní ceny před odesláním zboží
                není zálohou.
              </li>
              <li>
                Zboží je kupujícímu dodáno:
                <ul>
                  <li>na adresu určenou kupujícím objednávce</li>
                  {/* <li>
                    prostřednictvím výdejny zásilek na adresu výdejny, kterou
                    kupující určil,
                  </li>
                  <li>osobním odběrem v provozovně prodávajícího.</li> */}
                </ul>
              </li>
              <li>Volba způsobu dodání zboží v současné době není umožněna.</li>
              {/* <li>Volba způsobu dodání se provádí během objednávání zboží.</li> */}
              <li>
                Náklady na dodání zboží v závislosti na způsobu odeslání a
                převzetí zboží jsou uvedeny v objednávce kupujícího a v
                potvrzení objednávky prodávajícím. V případě, že je způsob
                dopravy smluven na základě zvláštního požadavku kupujícího, nese
                kupující riziko a případné dodatečné náklady spojené s tímto
                způsobem dopravy.
              </li>
              <li>
                Je-li prodávající podle kupní smlouvy povinen dodat zboží na
                místo určené kupujícím v objednávce, je kupující povinen převzít
                zboží při dodání. V případě, že je z důvodů na straně kupujícího
                nutno zboží doručovat opakovaně nebo jiným způsobem, než bylo
                uvedeno v objednávce, je kupující povinen uhradit náklady
                spojené s opakovaným doručováním zboží, resp. náklady spojené s
                jiným způsobem doručení.
              </li>
              <li>
                Při převzetí zboží od přepravce je kupující povinen zkontrolovat
                neporušenost obalů zboží a v případě jakýchkoliv závad toto
                neprodleně oznámit přepravci. V případě shledání porušení obalu
                svědčícího o neoprávněném vniknutí do zásilky nemusí kupující
                zásilku od přepravce převzít.
              </li>
              <li>
                Prodávající vystaví kupujícímu daňový doklad – fakturu. Daňový
                doklad je odeslán na e-mailovou adresu kupujícího. Kupující
                nabývá vlastnické právo ke zboží zaplacením celé kupní ceny za
                zboží včetně nákladů na dodání, nejdříve však převzetím zboží.
              </li>
              <li>
                Odpovědnost za nahodilou zkázu, poškození či ztrátu zboží
                přechází na kupujícího okamžikem převzetí zboží nebo okamžikem,
                kdy měl kupující povinnost zboží převzít, ale v rozporu s kupní
                smlouvou tak neučinil.
              </li>
            </ol>
            <br />
          </li>
          <li>
            <h2>Odstoupení od smlouvy</h2>
            <ol>
              <li>
                Kupující, který uzavřel kupní smlouvu mimo svou podnikatelskou
                činnost jako spotřebitel, má právo od kupní smlouvy odstoupit.
              </li>
              <li>
                Lhůta pro odstoupení od smlouvy činí 14 dnů
                <ul>
                  <li>ode dne převzetí zboží,</li>
                  <li>
                    ode dne převzetí poslední dodávky zboží, je-li předmětem
                    smlouvy několik druhů zboží nebo dodání několika částí,
                  </li>
                  <li>
                    ode dne převzetí první dodávky zboží, je-li předmětem
                    smlouvy pravidelná opakovaná dodávka zboží.
                  </li>
                </ul>
              </li>
              <li>
                Kupující nemůže mimo jiné odstoupit od kupní smlouvy:
                <ul>
                  <li>
                    poskytování služeb, jestliže byly splněny s jeho předchozím
                    výslovným souhlasem před uplynutím lhůty pro odstoupení od
                    smlouvy a prodávající před uzavřením smlouvy sdělil
                    kupujícímu, že v takovém případě nemá právo na odstoupení od
                    smlouvy,
                  </li>
                  <li>
                    o dodávce zboží nebo služby, jejichž cena závisí na
                    výchylkách finančního trhu nezávisle na vůli prodávajícího a
                    k němuž může dojít během lhůty pro odstoupení od smlouvy,
                  </li>
                  <li>
                    o dodání alkoholických nápojů, které mohou být dodány až po
                    uplynutí třiceti dnů a jejichž cena závisí na výchylkách
                    finančního trhu nezávislých na vůli prodávajícího,
                  </li>
                  <li>
                    o dodávce zboží, které bylo upraveno podle přání kupujícího
                    nebo pro jeho osobu, dodávce zboží, které podléhá rychlé
                    zkáze, jakož i zboží, které bylo po dodání nenávratně
                    smíseno s jiným zbožím,
                  </li>
                  <li>
                    dodávce zboží v uzavřeném obalu, které kupující z obalu
                    vyňal a z hygienických důvodů jej není možné vrátit,
                  </li>
                  <li>
                    dodávce zvukové nebo obrazové nahrávky nebo počítačového
                    programu, pokud porušil jejich původní obal,
                  </li>
                  <li>dodávce novin, periodik nebo časopisů,</li>
                  <li>
                    dodání digitálního obsahu, pokud nebyl dodán na hmotném
                    nosiči a byl dodán s předchozím výslovným souhlasem
                    kupujícího před uplynutím lhůty pro odstoupení od smlouvy a
                    prodávající před uzavřením smlouvy sdělil kupujícímu, že v
                    takovém případě nemá právo na odstoupení od smlouvy,
                  </li>
                  <li>
                    v dalších případech uvedených v § 1837 občanského zákoníku.
                  </li>
                </ul>
              </li>
              <li>
                Pro dodržení lhůty pro odstoupení od smlouvy musí kupující
                odeslat prohlášení o odstoupení ve lhůtě pro odstoupení od
                smlouvy.
              </li>
              <li>
                Pro odstoupení od kupní smlouvy může kupující využít vzorový
                formulář k odstoupení od smlouvy poskytovaný prodávajícím.
                Odstoupení od kupní smlouvy zašle kupující na e-mailovou nebo
                doručovací adresu prodávajícího uvedenou v těchto obchodních
                podmínkách. Prodávající potvrdí kupujícímu bezodkladně přijetí
                formuláře.
              </li>
              <li>
                Kupující, který odstoupil od smlouvy, je povinen vrátit
                prodávajícímu zboží do 14 dnů od odstoupení od smlouvy
                prodávajícímu. Kupující nese náklady spojené s navrácením zboží
                prodávajícímu, a to i v tom případě, kdy zboží nemůže být
                vráceno pro svou povahu obvyklou poštovní cestou.
              </li>
              <li>
                Odstoupí-li kupující od smlouvy, vrátí mu prodávající
                bezodkladně, nejpozději však do 14 dnů od odstoupení od smlouvy
                všechny peněžní prostředky včetně nákladů na dodání, které od
                něho přijal, a to stejným způsobem. Prodávající vrátí kupujícímu
                přijaté peněžení prostředky jiným způsobem jen tehdy, pokud s
                tím kupující souhlasí a pokud mu tím nevzniknou další náklady.
              </li>
              <li>
                Jestliže kupující zvolil jiný než nejlevnější způsob dodání
                zboží, který prodávající nabízí, vrátí prodávající kupujícímu
                náklady na dodání zboží ve výši odpovídající nejlevnějšímu
                nabízenému způsobu dodání zboží.
              </li>
              <li>
                Odstoupí-li kupující od kupní smlouvy, není prodávající povinen
                vrátit přijaté peněžní prostředky kupujícímu dříve, než mu
                kupující zboží předá nebo prokáže, že zboží prodávajícímu
                odeslal.
              </li>
              <li>
                Zboží musí vrátit kupující prodávajícímu nepoškozené,
                neopotřebené a neznečištěné a je-li to možné, v původním obalu.
                Nárok na náhradu škody vzniklé na zboží je prodávající oprávněn
                jednostranně započíst proti nároku kupujícího na vrácení kupní
                ceny.
              </li>
              <li>
                Prodávající je oprávněn odstoupit od kupní smlouvy z důvodu
                vyprodání zásob, nedostupnosti zboží, nebo když výrobce, dovozce
                nebo dodavatel zboží přerušil výrobu nebo dovoz zboží.
              </li>
              <li>
                Prodávající bezodkladně informuje kupujícího prostřednictvím
                e-mailové adresy uvedené v objednávce a vrátí ve lhůtě 14 dnů od
                oznámení o odstoupení od kupní smlouvy všechny peněžní
                prostředky včetně nákladů na dodání, které od něho na základě
                smlouvy přijal, a to stejným způsobem, popřípadě způsobem
                určeným kupujícím.
              </li>
            </ol>
            <br />
          </li>
          <li>
            <h2>Práva z vadného plnění</h2>
            <ol>
              <li>
                Prodávající zodpovídá kupujícímu, že zboží při převzetí nemá
                vady. Zejména prodávající odpovídá kupujícímu, že v době, kdy
                kupující zboží převzal :
                <ul>
                  <li>
                    má zboží vlastnosti, které si strany ujednaly, a chybí-li
                    ujednání, má takové vlastnosti, které prodávající nebo
                    výrobce popsal nebo které kupující očekával s ohledem na
                    povahu zboží a na základě reklamy jimi prováděné,
                  </li>
                  <li>
                    se zboží hodí k účelu, který pro jeho použití prodávající
                    uvádí nebo ke kterému se zboží tohoto druhu obvykle používá,
                  </li>
                  <li>
                    zboží odpovídá jakostí nebo provedením smluvenému vzorku
                    nebo předloze, byla-li jakost nebo provedení určeno podle
                    smluveného vzorku nebo předlohy,
                  </li>
                  <li>
                    je zboží v odpovídajícím množství, míře nebo hmotnosti a
                  </li>
                  <li>zboží vyhovuje požadavkům právních předpisů.</li>
                </ul>
              </li>
              <li>
                Povinnosti z vadného plnění má prodávající nejméně v takovém
                rozsahu, v jakém trvají povinnosti z vadného plnění výrobce.
                Kupující je jinak oprávněn uplatnit právo z vady, která se
                vyskytne u spotřebního zboží v době dvaceti čtyř měsíců od
                převzetí.
              </li>
              <li>
                Je-li na prodávaném zboží, na jeho obalu, v návodu připojenému
                ke zboží nebo v reklamě v souladu s jinými právními předpisy
                uvedena doba, po kterou lze zboží použít, použijí se ustanovení
                o záruce za jakost. Zárukou za jakost se prodávající zavazuje,
                že zboží bude po určitou dobu způsobilé k použití pro obvyklý
                účel nebo že si zachová obvyklé vlastnosti. Vytkl-li kupující
                prodávajícímu vadu zboží oprávněně, neběží lhůta pro uplatnění
                práv z vadného plnění ani záruční doba po dobu, po kterou nemůže
                kupující vadné zboží užívat.
              </li>
              <li>
                Ustanovení uvedená v předchozím odstavci obchodních podmínek se
                nepoužijí u zboží prodávaného za nižší cenu na vadu, pro kterou
                byla nižší cena ujednána, na opotřebení zboží způsobené jeho
                obvyklým užíváním, u použitého zboží na vadu odpovídající míře
                používání nebo opotřebení, kterou zboží mělo při převzetí
                kupujícím, nebo vyplývá-li to z povahy zboží.
              </li>
              <li>
                Právo z vadného plnění kupujícímu nenáleží, pokud před převzetím
                zboží věděl, že zboží má vadu, anebo pokud vadu sám kupující
                způsobil.
              </li>
              <li>
                V případě výskytu vady může kupující prodávajícímu předložit
                reklamaci a požadovat :
                <ul>
                  <li>výměnu za nové zboží,</li>
                  <li>opravu zboží,</li>
                  <li>přiměřenou slevu z kupní ceny,</li>
                  <li>odstoupení od smlouvy.</li>
                </ul>
              </li>
              <li>
                Kupující má právo odstoupit od smlouvy,
                <ul>
                  <li>pokud má zboží podstatnou vadu,</li>
                  <li>
                    pokud nemůže věc řádně užívat pro opakovaný výskyt vady nebo
                    vad po opravě, při větším počtu vad zboží.
                  </li>
                </ul>
              </li>
              <li>
                Podstatné je takové porušení smlouvy, o němž strana porušující
                smlouvu již při uzavření smlouvy věděla nebo musela vědět, že by
                druhá strana smlouvu neuzavřela, pokud by toto porušení
                předvídala.
              </li>
              <li>
                U vady, která znamená nepodstatné porušení smlouvy (bez ohledu
                na to, jde-li o vadu odstranitelnou či neodstranitelnou), má
                kupující nárok na odstranění vady nebo přiměřenou slevu z kupní
                ceny.U vady, která znamená nepodstatné porušení smlouvy (bez
                ohledu na to, jde-li o vadu odstranitelnou či neodstranitelnou),
                má kupující nárok na odstranění vady nebo přiměřenou slevu z
                kupní ceny.
              </li>
              <li>
                Vyskytla-li se odstranitelná vada po opravě opakovaně (obvykle
                třetí reklamace pro stejnou závadu nebo čtvrtá pro odlišné
                závady) nebo má zboží větší počet vad (zpravidla nejméně tři
                vady současně), má kupující právo uplatnit požadavek na slevu z
                kupní ceny, výměnu zboží nebo odstoupit od smlouvy.
              </li>
              <li>
                Při uplatnění reklamace je kupující povinen prodávajícímu
                sdělit, jaké právo si zvolil. Změna volby bez souhlasu
                prodávajícího je možná jen tehdy, žádal-li kupující opravu vady,
                která se ukáže být neodstranitelná. Nezvolí-li kupující si své
                právo z podstatného porušení smlouvy včas, má práva stejná jako
                při nepodstatném porušení smlouvy.
              </li>
              <li>
                Není-li oprava nebo výměna zboží možná, na základě odstoupení od
                smlouvy může kupující požadovat vrácení kupní ceny v plné výši.
              </li>
              <li>
                Pokud prodávající prokáže, že kupující před převzetím o vadě
                zboží věděl nebo ji sám způsobil, není prodávající povinen
                nároku kupujícího vyhovět.
              </li>
              <li>
                Kupující nemůže reklamovat zlevněné zboží z důvodu, pro který je
                dané zboží zlevněno.
              </li>
              <li>
                Prodávající je povinen přijmout reklamaci v kterékoli
                provozovně, v níž je přijetí reklamace možné, případně i v sídle
                nebo místě podnikání. Prodávající je povinen kupujícímu vydat
                písemné potvrzení o tom, kdy kupující právo uplatnil, co je
                obsahem reklamace a jaký způsob vyřízení reklamace kupující
                požaduje, jakož i potvrzení o datu a způsobu vyřízení reklamace,
                včetně potvrzení o provedení opravy a době jejího trvání,
                případně písemné odůvodnění zamítnutí reklamace.
              </li>
              <li>
                Prodávající nebo jím pověřený pracovník rozhodne o reklamaci
                ihned, ve složitých případech do tří pracovních dnů. Do této
                lhůty se nezapočítává doba přiměřená podle druhu výrobku či
                služby potřebná k odbornému posouzení vady. Reklamace včetně
                odstranění vady musí být vyřízena bezodkladně, nejpozději do 30
                dnů ode dne uplatnění reklamace, pokud se prodávající s
                kupujícím nedohodne na delší lhůtě. Marné uplynutí této lhůty se
                považuje za podstatné porušení smlouvy a kupující má právo od
                kupní smlouvy odstoupit. Za okamžik uplatnění reklamace se
                považuje okamžik, kdy dojde projev vůle kupujícího (uplatnění
                práva z vadného plnění) prodávajícímu.
              </li>
              <li>
                Prodávající písemně informuje kupujícího o výsledku reklamace.
              </li>
              <li>
                Právo z vadného plnění kupujícímu nenáleží, pokud kupující před
                převzetím věci věděl, že věc má vadu, anebo pokud kupující vadu
                sám způsobil.
              </li>
              <li>
                V případě oprávněné reklamace má kupující právo na náhradu
                účelně vynaložených nákladů vzniklých v souvislosti s uplatněním
                reklamace. Toto právo může kupující u prodávajícího uplatnit ve
                lhůtě do jednoho měsíce po uplynutí záruční doby, v opačném
                případě ho soud nemusí přiznat.
              </li>
              <li>Volbu způsobu reklamace má kupující.</li>
              <li>
                Práva a povinnosti smluvních stran ohledně práv z vadného plnění
                se řídí § 1914 až 1925, § 2099 až 2117 a § 2161 až 2174
                občanského zákoníku a zákonem č. 634/1992 Sb., o ochraně
                spotřebitele.
              </li>
            </ol>
            <br />
          </li>
          <li>
            <h2>Doručování</h2>
            <ol>
              <li>
                Smluvní strany si mohou veškerou písemnou korespondenci vzájemně
                doručovat prostřednictvím elektronické pošty.
              </li>
              <li>
                Kupující doručuje prodávajícímu korespondenci na e-mailovou
                adresu uvedenou v těchto obchodních podmínkách. Prodávající
                doručuje kupujícímu korespondenci na e-mailovou adresu uvedenou
                v jeho zákaznickém účtu nebo v objednávce.
              </li>
            </ol>
            <br />
          </li>
          <li>
            <h2>Mimosoudní řešení sporů</h2>
            <ol>
              <li>
                K mimosoudnímu řešení spotřebitelských sporů z kupní smlouvy je
                příslušná Česká obchodní inspekce se sídlem Štěpánská 567/15,
                120 00 Praha 2, IČ: 000 20 869, internetová adresa:
                https://adr.coi.cz/cs. Platformu pro řešení sporů on-line
                nacházející se na internetové adrese
                http://ec.europa.eu/consumers/odr je možné využít při řešení
                sporů mezi prodávajícím a kupujícím z kupní smlouvy.
              </li>
              <li>
                Evropské spotřebitelské centrum Česká republika se sídlem
                Štěpánská 567/15, 120 00 Praha 2, internetová adresa:
                http://www.evropskyspotrebitel.cz je kontaktním místem podle
                Nařízení Evropského parlamentu a Rady (EU) č. 524/2013 ze dne
                21. května 2013 o řešení spotřebitelských sporů on-line a o
                změně nařízení (ES) č. 2006/2004 a směrnice 2009/22/ES (nařízení
                o řešení spotřebitelských sporů on-line).
              </li>
              <li>
                Prodávající je oprávněn k prodeji zboží na základě
                živnostenského oprávnění. Živnostenskou kontrolu provádí v rámci
                své působnosti příslušný živnostenský úřad. Česká obchodní
                inspekce vykonává ve vymezeném rozsahu mimo jiné dozor nad
                dodržováním zákona č. 634/1992 Sb., o ochraně spotřebitele.
              </li>
            </ol>
            <br />
          </li>
          <li>
            <h2>Závěrečná ustanovení</h2>
            <ol>
              <li>
                Veškerá ujednání mezi prodávajícím a kupujícím se řídí právním
                řádem České republiky. Pokud vztah založený kupní smlouvou
                obsahuje mezinárodní prvek, pak strany sjednávají, že vztah se
                řídí právem České republiky. Tímto nejsou dotčena práva
                spotřebitele vyplývající z obecně závazných právních předpisů.
              </li>
              <li>
                Prodávající není ve vztahu ke kupujícímu vázán žádnými kodexy
                chování ve smyslu ustanovení § 1826 odst. 1 písm. e) občanského
                zákoníku.
              </li>
              <li>
                Všechna práva k webovým stránkám prodávajícího, zejména autorská
                práva k obsahu, včetně rozvržení stránky, fotek, filmů, grafik,
                ochranných známek, loga a dalšího obsahu a prvků, náleží
                prodávajícímu. Je zakázáno kopírovat, upravovat nebo jinak
                používat webové stránky nebo jejich část bez souhlasu
                prodávajícího.
              </li>
              <li>
                Prodávající nenese odpovědnost za chyby vzniklé v důsledku
                zásahů třetích osob do internetového obchodu nebo v důsledku
                jeho užití v rozporu s jeho určením. Kupující nesmí při
                využívání internetového obchodu používat postupy, které by mohly
                mít negativní vliv na jeho provoz a nesmí vykonávat žádnou
                činnost, která by mohla jemu nebo třetím osobám umožnit
                neoprávněně zasahovat či neoprávněně užít programové vybavení
                nebo další součásti tvořící internetový obchod a užívat
                internetový obchod nebo jeho části či softwarové vybavení
                takovým způsobem, který by byl v rozporu s jeho určením či
                účelem.
              </li>
              <li>
                Kupující tímto přebírá na sebe nebezpečí změny okolností ve
                smyslu § 1765 odst. 2 občanského zákoníku.
              </li>
              <li>
                Kupní smlouva včetně obchodních podmínek je archivována
                prodávajícím v elektronické podobě a není přístupná.
              </li>
              <li>
                Znění obchodních podmínek může prodávající měnit či doplňovat.
                Tímto ustanovením nejsou dotčena práva a povinnosti vzniklé po
                dobu účinnosti předchozího znění obchodních podmínek.
              </li>
              <li>
                Přílohou obchodních podmínek je vzorový formulář pro odstoupení
                od smlouvy.
              </li>
              <li>Tyto obchodní podmínky nabývají účinnosti 8.8.2021.</li>
            </ol>
            <br />
          </li>
        </ol>
      </div>
    </Container>
  );
}

const Container = styled.p`
  width: 100%;
`;

const HeadingText = styled.p`
  font-weight: 600;
  color: black;
  text-align: left;
  margin-top: 20px;
  letter-spacing: 1.1px;
`;
