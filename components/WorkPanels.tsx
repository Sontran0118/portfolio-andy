import { Action, Panel, PanelActions, PanelHeading } from "@/components/Panel";
import { panels } from "@/lib/content";

export function WorkPanels() {
  return (
    <>
      {panels.map((panel) => (
        <Panel key={panel.id} id={panel.id}>
          <PanelHeading
            eyebrow={panel.eyebrow}
            title={panel.title}
            body={panel.body}
          />
          <PanelActions details={panel.details}>
            {panel.links.map((link, index) => (
              <Action
                key={link.href}
                href={link.href}
                variant={index === 0 ? "primary" : "secondary"}
                external={link.href.startsWith("http")}
              >
                {link.label}
              </Action>
            ))}
          </PanelActions>
        </Panel>
      ))}
    </>
  );
}
