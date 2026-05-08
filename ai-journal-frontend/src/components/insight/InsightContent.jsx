// src/components/insight/InsightContent.jsx
import InsightImage from "./InsightImage";
import InsightPanel from "./InsightPanel";

export default function InsightContent({ insightType, title, content, timeline }) {
  return (
    <>
      {/* Left Side: Image + Symbols */}
      <div className="col-span-1 md:col-span-5 flex flex-col gap-8 order-2 md:order-1 self-stretch">
        <InsightImage insightType={insightType} />
      </div>
      
      {/* Right Side: Text in Glass Panel */}
      <div className="col-span-1 md:col-span-7 order-1 md:order-2 self-stretch">
        <InsightPanel title={title} content={content} timeline={timeline} />
      </div>
    </>
  );
}