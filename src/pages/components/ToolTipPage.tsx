import { Button } from "@/components/Button/Button";
import { Tooltip } from "@/components/ToolTip/Tooltip";
import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";

const TooltipPage = () => {
  const basicUsageCode = `
import { Tooltip } from "@/components/Tooltip/Tooltip"
import { Button } from "@/components/Button/Button"

<Tooltip content="Save your changes">
  <Button>Save</Button>
</Tooltip>`;

  const positionsCode = `
<Tooltip content="Top" position="top"><Button variant="outline">Top</Button></Tooltip>
<Tooltip content="Bottom" position="bottom"><Button variant="outline">Bottom</Button></Tooltip>
<Tooltip content="Left" position="left"><Button variant="outline">Left</Button></Tooltip>
<Tooltip content="Right" position="right"><Button variant="outline">Right</Button></Tooltip>`;

  const variantsCode = `
<Tooltip content="Dark tooltip" variant="dark"><Button variant="outline">Dark</Button></Tooltip>
<Tooltip content="Light tooltip" variant="light"><Button variant="outline">Light</Button></Tooltip>
<Tooltip content="Primary tooltip" variant="primary"><Button variant="outline">Primary</Button></Tooltip>
<Tooltip content="This can't be undone" variant="destructive"><Button variant="outline">Destructive</Button></Tooltip>`;

  const animationsCode = `
<Tooltip content="Fade in" animation="fadeIn"><Button variant="secondary">fadeIn</Button></Tooltip>
<Tooltip content="Scale in" animation="scaleIn"><Button variant="secondary">scaleIn</Button></Tooltip>
<Tooltip content="Slide up" animation="slideUp"><Button variant="secondary">slideUp</Button></Tooltip>
<Tooltip content="No animation" animation="none"><Button variant="secondary">none</Button></Tooltip>`;

  const optionsCode = `
<Tooltip content="No arrow" arrow={false}><Button variant="ghost">No arrow</Button></Tooltip>
<Tooltip content="Shows after 800ms" delay={800}><Button variant="ghost">Slow</Button></Tooltip>
<Tooltip content="You won't see me" disabled><Button variant="ghost">Disabled</Button></Tooltip>`;

  const propsData = [
    {
      prop: "content",
      type: "ReactNode",
      default: "none",
      description: "The text or content shown inside the tooltip",
    },
    {
      prop: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description:
        "Where the tooltip appears relative to the trigger. Flips automatically if there is no room",
    },
    {
      prop: "variant",
      type: '"dark" | "light" | "primary" | "destructive"',
      default: '"dark"',
      description: "The visual style variant of the tooltip",
    },
    {
      prop: "delay",
      type: "number",
      default: "200",
      description: "Delay in ms before the tooltip shows",
    },
    {
      prop: "animation",
      type: '"fadeIn" | "scaleIn" | "slideUp" | "none"',
      default: '"fadeIn"',
      description: "Animation when the tooltip appears",
    },
    {
      prop: "arrow",
      type: "boolean",
      default: "true",
      description: "Shows a small arrow pointing to the trigger",
    },
    {
      prop: "disabled",
      type: "boolean",
      default: "false",
      description: "Prevents the tooltip from showing",
    },
    {
      prop: "children",
      type: "ReactNode",
      default: "none",
      description: "The element that triggers the tooltip",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-12">
      <header className="space-y-2">
        <p
          className="text-4xl font-bold tracking-tight"
          style={{ color: "var(--text-color)" }}
          
        >
          Tooltip
        </p>
        <p className="text-lg text-gray-600">
          A small popup that displays information related to an element when the
          user hovers or focuses on it.
        </p>
      </header>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={basicUsageCode}>
          <div className="flex gap-4 flex-wrap py-8">
            <Tooltip content="Save your changes">
              <Button>Save</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Positions</h2>
        <ComponentDemo code={positionsCode}>
          <div className="flex gap-4 flex-wrap py-12 px-16">
            <Tooltip content="Top" position="top">
              <Button variant="outline">Top</Button>
            </Tooltip>
            <Tooltip content="Bottom" position="bottom">
              <Button variant="outline">Bottom</Button>
            </Tooltip>
            <Tooltip content="Left" position="left">
              <Button variant="outline">Left</Button>
            </Tooltip>
            <Tooltip content="Right" position="right">
              <Button variant="outline">Right</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Variants</h2>
        <ComponentDemo code={variantsCode}>
          <div className="flex gap-4 flex-wrap py-8">
            <Tooltip content="Dark tooltip" variant="dark">
              <Button variant="outline">Dark</Button>
            </Tooltip>
            <Tooltip content="Light tooltip" variant="light">
              <Button variant="outline">Light</Button>
            </Tooltip>
            <Tooltip content="Primary tooltip" variant="primary">
              <Button variant="outline">Primary</Button>
            </Tooltip>
            <Tooltip content="This can't be undone" variant="destructive">
              <Button variant="outline">Destructive</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Animations</h2>
        <ComponentDemo code={animationsCode}>
          <div className="flex gap-4 flex-wrap py-8">
            <Tooltip content="Fade in" animation="fadeIn">
              <Button variant="secondary">fadeIn</Button>
            </Tooltip>
            <Tooltip content="Scale in" animation="scaleIn">
              <Button variant="secondary">scaleIn</Button>
            </Tooltip>
            <Tooltip content="Slide up" animation="slideUp">
              <Button variant="secondary">slideUp</Button>
            </Tooltip>
            <Tooltip content="No animation" animation="none">
              <Button variant="secondary">none</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Arrow, delay and disabled</h2>
        <ComponentDemo code={optionsCode}>
          <div className="flex gap-4 flex-wrap py-8">
            <Tooltip content="No arrow" arrow={false}>
              <Button variant="ghost">No arrow</Button>
            </Tooltip>
            <Tooltip content="Shows after 800ms" delay={800}>
              <Button variant="ghost">Slow</Button>
            </Tooltip>
            <Tooltip content="You won't see me" disabled>
              <Button variant="ghost">Disabled</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default TooltipPage;