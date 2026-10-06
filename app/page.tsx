import { Capabilities } from "@/components/Capabilities";
import { Contact } from "@/components/Contact";
import { Hero } from "@/components/Hero";
import { Nav } from "@/components/Nav";
import { SceneCanvas } from "@/components/three/SceneCanvas";
import { WorkIndex } from "@/components/WorkIndex";
import { WorkPanels } from "@/components/WorkPanels";

export default function Home() {
  return (
    <>
      <SceneCanvas />
      <Nav />
      <main className="snap-y snap-proximity">
        <Hero />
        <WorkPanels />
        <Capabilities />
        <WorkIndex />
        <Contact />
      </main>
    </>
  );
}
